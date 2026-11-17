"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/motion";

/** Pins the workshop section and turns its pages sideways on desktop. */
export default function WorkshopTrack({ children }: { children: React.ReactNode }) {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap } = getGsap();
    const mm = gsap.matchMedia();
    mm.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
      const el = track.current!;
      const distance = () => el.scrollWidth - window.innerWidth;
      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          pin: true,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      el.querySelectorAll(".pillar").forEach((p) => {
        gsap.from(p, {
          rotate: 6, y: 60, ease: "none",
          scrollTrigger: { trigger: p, containerAnimation: tween, start: "left right", end: "left 55%", scrub: true },
        });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <div className="workshop__pin" ref={section}>
      <div className="workshop__track" ref={track}>{children}</div>
    </div>
  );
}
