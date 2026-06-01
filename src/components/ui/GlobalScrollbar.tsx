"use client";

import { useEffect } from "react";
import { useOverlayScrollbars } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";

export default function GlobalScrollbar() {
  const [initialize] = useOverlayScrollbars({
    defer: true,
    options: {
      scrollbars: {
        theme: "os-theme-asspro",
        autoHide: "leave",
        autoHideDelay: 800,
      },
    },
  });

  useEffect(() => {
    // Initialize OverlayScrollbars globally on the body element
    // Only on desktop, as mobile native scrollbars are already optimized and overlay plugins often break mobile viewports
    const isTouchDevice =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0);

    if (!isTouchDevice) {
      initialize(document.body);
    }
  }, [initialize]);

  return null;
}
