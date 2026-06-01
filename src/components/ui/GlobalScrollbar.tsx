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
    initialize(document.body);
  }, [initialize]);

  return null;
}
