"use client";

import { useEffect, useRef } from "react";
import { getGsap, prefersReducedMotion } from "@/lib/motion";

type Props = { value: number; prefix?: string; suffix?: string; decimals?: number };

const format = (n: number, decimals: number) =>
  n.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/** Renders the final number on the server (for SEO), then counts up when scrolled into view. */
export default function CountUp({ value, prefix = "", suffix = "", decimals = 0 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;
    const { gsap } = getGsap();
    const el = ref.current;
    const counter = { n: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        n: value,
        duration: 1.6,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onUpdate: () => { el.textContent = format(counter.n, decimals); },
      });
    });
    el.textContent = format(0, decimals);
    return () => { ctx.revert(); el.textContent = format(value, decimals); };
  }, [value, decimals]);

  return (
    <>
      {prefix}
      <span ref={ref}>{format(value, decimals)}</span>
      {suffix}
    </>
  );
}
