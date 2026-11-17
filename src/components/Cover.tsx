"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { photos } from "@/content/site";
import { getGsap, prefersReducedMotion } from "@/lib/motion";
import Rocket from "./Rocket";

const stickers = [
  { label: "🚀 Founder", tone: "lemon", x: 56, y: 12, r: -8 },
  { label: "💡 Idea", tone: "cyan", x: 82, y: 64, r: 6 },
  { label: "💵 Capital", tone: "orange", x: 46, y: 60, r: -4 },
  { label: "📈 Growth", tone: "violet", x: 86, y: 16, r: 10 },
  { label: "Grades 8–12", tone: "round", x: 52, y: 40, r: 12 },
];

export default function Cover() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const { gsap, Draggable } = getGsap();
    const ctx = gsap.context(() => {
      const drags = Draggable.create(".sticker", {
        bounds: root.current,
        zIndexBoost: true,
        onPress() { gsap.to(this.target, { scale: 1.12, duration: 0.2 }); },
        onRelease() { gsap.to(this.target, { scale: 1, duration: 0.5, ease: "elastic.out(1, .4)" }); },
      });

      if (!prefersReducedMotion()) {
        gsap.timeline({ defaults: { ease: "power4.out" } })
          .from(".cover__issue span", { y: -30, opacity: 0, stagger: 0.08, duration: 0.6 })
          .from(".wordmark--cover", { yPercent: 40, scale: 0.7, rotate: -12, opacity: 0, duration: 1.1, ease: "back.out(1.6)" }, "-=0.3")
          .from(".cover__tagline", { y: 20, opacity: 0, duration: 0.6 }, "-=0.6")
          .from(".cover__photo", { xPercent: 30, rotate: 14, opacity: 0, duration: 1 }, "-=0.8")
          .from(".cover__lines li", { x: -40, opacity: 0, stagger: 0.1, duration: 0.6 }, "-=0.6")
          .from(".sticker", { scale: 0, rotate: () => gsap.utils.random(-90, 90), stagger: 0.07, duration: 0.7, ease: "back.out(2.5)" }, "-=0.4")
          .from(".cover__hint", { opacity: 0, duration: 0.5 });
      }
      return () => drags.forEach((d) => d.kill());
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="cover" id="cover" ref={root}>
      <Rocket className="cover__rocket" data-drift />

      <div className="cover__issue">
        <span>Teachers’ edition</span>
        <span>Issue 2.0</span>
        <span>PIEDS, BITS Pilani presents</span>
      </div>

      <div className="cover__head">
        <h1 className="cover__title">
          <span className="visually-hidden">Studentpreneur: turning school students into founders</span>
          <span className="wordmark wordmark--cover" aria-hidden="true" />
        </h1>
        <p className="cover__tagline" aria-hidden="true">Turning school students into founders.</p>
      </div>

      <figure className="cover__photo">
        <Image
          src={photos.coverPitch.src}
          alt={photos.coverPitch.alt}
          sizes="(max-width: 900px) 78vw, 36vw"
          placeholder="blur"
          preload
        />
        <figcaption>Students pitching at our previous edition, Birla Balika Vidyapeeth, Pilani</figcaption>
      </figure>

      <ul className="cover__lines">
        <li><a href="#bitsians"><strong>17 unicorns and a decacorn:</strong> what BITS founders built</a></li>
        <li><a href="#journey"><strong>Learn, build, present:</strong> how the programme runs at your school</a></li>
        <li><a href="#demoday"><strong>Demo Day at BITS Pilani:</strong> students pitch to a jury, with parents in the audience</a></li>
      </ul>

      <div className="stickers" aria-hidden="true">
        {stickers.map((s) => (
          <span
            key={s.label}
            className={`sticker sticker--${s.tone}`}
            style={{ "--x": `${s.x}%`, "--y": `${s.y}%`, "--r": `${s.r}deg` } as React.CSSProperties}
          >
            {s.label}
          </span>
        ))}
      </div>
      <p className="cover__hint" aria-hidden="true">Psst, the stickers move. Drag them around.</p>
    </section>
  );
}
