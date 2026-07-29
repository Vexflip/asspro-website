// Site-wide fuzzy search engine.
// Operates over a generic list of SearchEntry so any content (pages,
// formations, guides, team members, partners…) can be indexed and searched
// with the same accent-insensitive, typo-tolerant matching.

export type SearchType = "page" | "formation" | "guide" | "team" | "partner";

export interface SearchEntry {
  id: string;
  type: SearchType;
  title: string;
  description?: string;
  href: string; // where clicking the result should navigate
  keywords?: string; // extra searchable text (category label, location, role, page copy…)
}

function getLevenshteinDistance(a: string, b: string): number {
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const arr: number[][] = [];
  for (let i = 0; i <= b.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= a.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (a[j - 1] === b[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[b.length][a.length];
}

// Lowercase and strip diacritics so "adhésion" and "adhesion" match.
export function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

// True when `word` appears in `text`, allowing a small edit distance so that
// typos ("formatoin") still match. `text` is expected to be normalized.
function isFuzzyMatch(word: string, text: string): boolean {
  if (text.includes(word)) return true;
  let maxDist = 1;
  if (word.length >= 7) maxDist = 3;
  else if (word.length >= 4) maxDist = 2;

  const textWords = text.split(/[\s,.'"-]+/);
  return textWords.some((tw) => {
    if (Math.abs(tw.length - word.length) > maxDist) return false;
    return getLevenshteinDistance(word, tw) <= maxDist;
  });
}

// Score a single entry against the query words.
// Returns null when the entry does not qualify, otherwise a relevance score
// (higher = better). Title hits weigh more than body hits, exact/substring
// hits weigh more than fuzzy hits.
function scoreEntry(
  entry: SearchEntry,
  queryWords: string[],
  requireAll: boolean
): number | null {
  const title = normalize(entry.title);
  const haystack = normalize(
    `${entry.title} ${entry.description ?? ""} ${entry.keywords ?? ""}`
  );

  let total = 0;
  let matched = 0;
  for (const word of queryWords) {
    let wordScore = 0;
    if (title.includes(word)) wordScore = 3;
    else if (haystack.includes(word)) wordScore = 2;
    else if (isFuzzyMatch(word, haystack)) wordScore = 1;

    if (wordScore > 0) matched++;
    total += wordScore;
  }

  if (requireAll ? matched < queryWords.length : matched === 0) return null;
  return total;
}

// Search the given entries for `query`, returning matches ranked by relevance.
// Primary pass requires every query word to match (AND); if that finds nothing
// and the query has multiple words, a looser OR pass is used as a fallback.
export function searchEntries(
  query: string,
  entries: SearchEntry[]
): SearchEntry[] {
  const queryWords = normalize(query)
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 1);

  if (queryWords.length === 0) return [];

  const run = (requireAll: boolean) =>
    entries
      .map((entry) => ({ entry, score: scoreEntry(entry, queryWords, requireAll) }))
      .filter((r): r is { entry: SearchEntry; score: number } => r.score !== null);

  let scored = run(true);
  if (scored.length === 0 && queryWords.length > 1) {
    scored = run(false);
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.map((r) => r.entry);
}

// ---------------------------------------------------------------------------
// Snippet highlighting — "Ctrl+Shift+F" style excerpts with the matched terms
// marked. The UI renders each segment, bolding the ones with `match: true`.
// ---------------------------------------------------------------------------

export interface HighlightSegment {
  text: string;
  match: boolean;
}

function toQueryWords(query: string): string[] {
  return normalize(query)
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 1);
}

// Normalize while keeping a 1:1 map from each normalized character back to its
// index in the original string, so match positions found in normalized space
// can be projected onto the original (accented) text for display.
function normalizeWithMap(str: string): { normalized: string; map: number[] } {
  let normalized = "";
  const map: number[] = [];
  for (let i = 0; i < str.length; i++) {
    const n = normalize(str[i]);
    for (let k = 0; k < n.length; k++) {
      normalized += n[k];
      map.push(i);
    }
  }
  return { normalized, map };
}

// Ranges (in original-string indices) where a query word occurs as a substring
// of the accent-insensitive text.
function findMatchRanges(text: string, queryWords: string[]): Array<[number, number]> {
  const { normalized, map } = normalizeWithMap(text);
  const ranges: Array<[number, number]> = [];
  for (const word of queryWords) {
    let idx = normalized.indexOf(word);
    while (idx !== -1) {
      ranges.push([map[idx], map[idx + word.length - 1] + 1]);
      idx = normalized.indexOf(word, idx + word.length);
    }
  }
  return ranges;
}

function hasSubstringMatch(text: string, queryWords: string[]): boolean {
  const normalized = normalize(text);
  return queryWords.some((w) => normalized.includes(w));
}

// Build an excerpt of `text` centered on the first match, with the matched
// terms returned as `match: true` segments. Adds leading/trailing ellipses when
// the excerpt is trimmed.
export function buildSnippet(
  text: string,
  query: string,
  maxLength = 160
): HighlightSegment[] {
  if (!text) return [];
  const queryWords = toQueryWords(query);

  const raw = findMatchRanges(text, queryWords).sort((a, b) => a[0] - b[0]);
  const merged: Array<[number, number]> = [];
  for (const r of raw) {
    const last = merged[merged.length - 1];
    if (last && r[0] <= last[1]) last[1] = Math.max(last[1], r[1]);
    else merged.push([r[0], r[1]]);
  }

  // Window: start a little before the first match, span up to maxLength.
  let start = 0;
  if (merged.length) {
    const pad = 40;
    start = Math.max(0, merged[0][0] - pad);
    if (start > 0) {
      const space = text.lastIndexOf(" ", start);
      if (space !== -1 && space >= merged[0][0] - pad - 20) start = space + 1;
    }
  }
  const end = Math.min(text.length, start + maxLength);

  const segments: HighlightSegment[] = [];
  let cursor = start;
  for (const [ms, me] of merged) {
    if (me <= start || ms >= end) continue;
    const s = Math.max(ms, start);
    const e = Math.min(me, end);
    if (s > cursor) segments.push({ text: text.slice(cursor, s), match: false });
    segments.push({ text: text.slice(s, e), match: true });
    cursor = e;
  }
  if (cursor < end) segments.push({ text: text.slice(cursor, end), match: false });

  if (start > 0) segments.unshift({ text: "… ", match: false });
  if (end < text.length) segments.push({ text: " …", match: false });
  return segments;
}

// Choose the best text to excerpt for a result: prefer the description when it
// actually contains the term, otherwise the keywords (so the user sees *why* it
// matched), falling back to whichever text exists.
export function entrySnippet(
  entry: SearchEntry,
  query: string,
  maxLength = 160
): HighlightSegment[] {
  const queryWords = toQueryWords(query);
  if (entry.description && hasSubstringMatch(entry.description, queryWords)) {
    return buildSnippet(entry.description, query, maxLength);
  }
  if (entry.keywords && hasSubstringMatch(entry.keywords, queryWords)) {
    return buildSnippet(entry.keywords, query, maxLength);
  }
  return buildSnippet(entry.description || entry.keywords || "", query, maxLength);
}
