"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import Link from "next/link";
import { Home, RotateCcw } from "lucide-react";

/**
 * Route-level error boundary. Catches uncaught render errors within the app and
 * shows a branded fallback instead of Next's default screen. In Next 16 the
 * retry handler is passed as `unstable_retry` (replacing the former `reset`).
 */
export default function Error({
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
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-primary/20 mb-4">Oups</h1>
        <h2 className="text-2xl font-bold font-serif text-dark mb-4">
          Une erreur est survenue
        </h2>
        <p className="text-muted mb-8 max-w-md mx-auto">
          Un problème inattendu s&apos;est produit. Vous pouvez réessayer ou
          revenir à l&apos;accueil.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-light transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Réessayer
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
          >
            <Home className="w-4 h-4" />
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
