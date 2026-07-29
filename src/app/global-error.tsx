"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

/**
 * Root-layout error boundary. Only renders when the root layout itself fails, so
 * it must define its own <html>/<body> and cannot rely on the app's global CSS
 * or fonts — styles are inlined. In Next 16 the retry handler is `unstable_retry`.
 */
export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="fr">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily:
            "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
          color: "#0f172a",
          background: "#ffffff",
          padding: "1rem",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "32rem" }}>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              margin: "0 0 0.75rem",
            }}
          >
            Une erreur est survenue
          </h1>
          <p style={{ color: "#64748b", margin: "0 0 1.5rem" }}>
            Un problème inattendu s&apos;est produit. Veuillez réessayer dans un
            instant.
          </p>
          <button
            type="button"
            onClick={() => unstable_retry()}
            style={{
              cursor: "pointer",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.5rem",
              border: "none",
              fontWeight: 600,
              color: "#ffffff",
              background: "#1e5b8a",
            }}
          >
            Réessayer
          </button>
        </div>
      </body>
    </html>
  );
}
