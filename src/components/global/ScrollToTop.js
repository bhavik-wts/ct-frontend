"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Force scroll to top on every route change
    window.scrollTo({ top: 0, behavior: "instant" });

    // Also reset scroll restoration to prevent Next.js from preserving old positions
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
