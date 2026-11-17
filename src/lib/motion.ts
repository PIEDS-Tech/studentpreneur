"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { Flip } from "gsap/Flip";
import type Lenis from "lenis";

let registered = false;
export function getGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, Draggable, Flip);
    registered = true;
  }
  return { gsap, ScrollTrigger, Draggable, Flip };
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* A single Lenis instance shared by the page (set by <SmoothScroll />). */
let lenisRef: Lenis | null = null;
export const setLenis = (l: Lenis | null) => { lenisRef = l; };
export const getLenis = () => lenisRef;

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenisRef) lenisRef.scrollTo(el, { duration: 1.4 });
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
  history.replaceState(null, "", `#${id}`);
}
