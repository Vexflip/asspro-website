# ── Stage 1: Install dependencies ──────────────────────────
FROM node:22-alpine AS deps

WORKDIR /app

# Copy only package files first (cached layer)
COPY package.json package-lock.json ./

# Install all dependencies (need devDeps for the build step)
RUN npm ci

# ── Stage 2: Build the app ─────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Build the Next.js production bundle
RUN npm run build

# ── Stage 3: Production image ──────────────────────────────
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy only what's needed to run
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/server.js ./server.js
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/tsconfig.json ./tsconfig.json

EXPOSE 3000

# Start using your custom server
CMD ["node", "server.js"]
