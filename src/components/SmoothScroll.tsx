"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { getGsap, prefersReducedMotion, scrollToId, setLenis } from "@/lib/motion";

/**
 * Page-wide motion: Lenis smooth scrolling, in-page link handling,
 * and the scroll-linked effects driven by data attributes:
 *   data-parallax  – image drifts slightly as it scrolls past
 *   data-reveal    – clip-path opens like a curtain
 *   data-drift     – decorative element drifts upward
 */
export default function SmoothScroll() {
  useEffect(() => {
    const { gsap, ScrollTrigger } = getGsap();
    const reduce = prefersReducedMotion();
    let lenis: Lenis | null = null;
    const tick = (t: number) => lenis?.raf(t * 1000);

    if (!reduce) {
      lenis = new Lenis({ lerp: 0.1 });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      setLenis(lenis);
    }

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      const id = link?.getAttribute("href")?.slice(1);
      if (!id) return;
      e.preventDefault();
      scrollToId(id);
    };
    document.addEventListener("click", onClick);

    const ctx = gsap.context(() => {
      if (reduce) return;
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const img = el.querySelector("img") ?? el;
        gsap.fromTo(img, { yPercent: -6, scale: 1.12 }, {
          yPercent: 6, ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(el, { clipPath: "inset(16% 20% 16% 20% round 28px)" }, {
          clipPath: "inset(0% 0% 0% 0% round 28px)", ease: "none",
          scrollTrigger: { trigger: el, start: "top 90%", end: "top 25%", scrub: true },
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-drift]").forEach((el) => {
        gsap.to(el, {
          yPercent: -25, ease: "none",
          scrollTrigger: { trigger: el.parentElement, start: "top top", end: "bottom top", scrub: true },
        });
      });
      gsap.utils.toArray<HTMLElement>(".marquee").forEach((m) => {
        gsap.fromTo(m, { xPercent: 2 }, {
          xPercent: -2, ease: "none",
          scrollTrigger: { trigger: m, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis?.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
