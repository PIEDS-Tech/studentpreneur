"use client";

import { useEffect, useRef } from "react";
import { activities } from "@/content/site";
import { getGsap, prefersReducedMotion } from "@/lib/motion";

/** A pin-board of activity cards: draggable and shuffleable on desktop, a simple stack on mobile. */
export default function ActivityBoard() {
  const board = useRef<HTMLDivElement>(null);
  const shuffleRef = useRef<() => void>(() => {});

  useEffect(() => {
    const { gsap, Draggable } = getGsap();
    const mm = gsap.matchMedia();
    mm.add("(min-width: 901px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(".act", board.current);
      const drags = Draggable.create(cards, {
        bounds: board.current,
        zIndexBoost: true,
        onPress() {
          this.target.classList.add("is-dragging");
          gsap.to(this.target, { rotate: 0, scale: 1.04, duration: 0.25 });
        },
        onRelease() {
          this.target.classList.remove("is-dragging");
          gsap.to(this.target, { rotate: gsap.utils.random(-6, 6), scale: 1, duration: 0.6, ease: "elastic.out(1, .45)" });
        },
      });

      shuffleRef.current = () => {
        const b = board.current!;
        cards.forEach((c) => {
          gsap.to(c, {
            x: gsap.utils.random(0, b.clientWidth - c.offsetWidth) - c.offsetLeft,
            y: gsap.utils.random(0, b.clientHeight - c.offsetHeight) - c.offsetTop,
            rotate: gsap.utils.random(-8, 8),
            duration: prefersReducedMotion() ? 0 : 0.8,
            ease: "back.out(1.4)",
            onComplete: () => drags.forEach((d) => d.update()),
          });
        });
      };

      if (!prefersReducedMotion()) {
        gsap.from(cards, {
          y: -200, rotate: () => gsap.utils.random(-30, 30), opacity: 0,
          stagger: 0.08, duration: 0.9, ease: "bounce.out",
          scrollTrigger: { trigger: board.current, start: "top 75%", once: true },
        });
      }
      return () => drags.forEach((d) => d.kill());
    });
    return () => mm.revert();
  }, []);

  return (
    <>
      <button className="btn btn--ghost board__shuffle" onClick={() => shuffleRef.current()}>
        Shuffle the board
      </button>
      <div className="board" ref={board}>
        {activities.map((a) => (
          <article
            key={a.title}
            className={`act act--${a.tone}`}
            style={{ "--x": `${a.x}%`, "--y": `${a.y}%`, "--r": `${a.r}deg` } as React.CSSProperties}
          >
            <h3>{a.title}</h3>
            <p>{a.text}</p>
          </article>
        ))}
      </div>
      <p className="board__hint" aria-hidden="true">Drag a card to pin it somewhere else.</p>
    </>
  );
}
