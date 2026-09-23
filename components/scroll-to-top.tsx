"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

export function ScrollToTop() {
  const pathname = usePathname();
  const isFirst = useRef(true);
  const skipHistory = useRef(false);

  useEffect(() => {
    const onPopState = () => {
      skipHistory.current = true;
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useLayoutEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    if (skipHistory.current) {
      skipHistory.current = false;
      return;
    }
    if (window.location.hash.length > 1) return;

    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    root.style.scrollBehavior = previous;
  }, [pathname]);

  return null;
}
