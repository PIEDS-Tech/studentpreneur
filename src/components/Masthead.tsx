"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { chapters } from "@/content/site";
import { getGsap, getLenis, prefersReducedMotion, scrollToId } from "@/lib/motion";

/** Fixed masthead, full-screen contents overlay and side chapter tabs. */
export default function Masthead() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string>("cover");
  const progressRef = useRef<HTMLSpanElement>(null);
  const tocRef = useRef<HTMLDivElement>(null);
  const openBtnRef = useRef<HTMLButtonElement>(null);

  // Which chapter is in view
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-chapter]");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setCurrent(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Reading progress
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    };
    update();
    addEventListener("scroll", update, { passive: true });
    return () => removeEventListener("scroll", update);
  }, []);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) openBtnRef.current?.focus();
  }, []);

  // Overlay side-effects: lock scroll, focus, Esc, entrance animation
  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const first = tocRef.current?.querySelector<HTMLElement>("a");
    first?.focus();
    if (!prefersReducedMotion()) {
      const { gsap } = getGsap();
      gsap.from(tocRef.current!.querySelectorAll("li"), { y: 40, opacity: 0, stagger: 0.035, duration: 0.5, ease: "power3.out" });
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      lenis?.start();
    };
  }, [open, close]);

  const currentLabel = current === "cover" ? "Teachers’ edition" : chapters.find((c) => c.id === current)?.label;

  return (
    <>
      <header className="masthead">
        <a href="#cover" className="masthead__logo" aria-label="Studentpreneur, back to the cover">
          <span className="wordmark wordmark--small" />
        </a>
        <p className="masthead__now" aria-live="polite">{currentLabel}</p>
        <a href="#interest" className="masthead__cta">Register interest</a>
        <button
          ref={openBtnRef}
          className="masthead__menu"
          aria-expanded={open}
          aria-controls="toc"
          onClick={() => setOpen(true)}
        >
          <span className="masthead__menu-icon" aria-hidden="true"><i /><i /></span>
          Contents
        </button>
        <div className="masthead__progress" aria-hidden="true"><span ref={progressRef} /></div>
      </header>

      <nav className="tabs" aria-label="Chapters">
        {chapters.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            style={{ "--c": c.color } as React.CSSProperties}
            className={current === c.id ? "is-active" : undefined}
            aria-current={current === c.id ? "true" : undefined}
          >
            <span>{c.label}</span>
          </a>
        ))}
      </nav>

      <div
        className="toc"
        id="toc"
        role="dialog"
        aria-modal="true"
        aria-label="Contents"
        hidden={!open}
        ref={tocRef}
        onClick={(e) => {
          const id = (e.target as HTMLElement).closest("a")?.getAttribute("href")?.slice(1);
          if (!id) return;
          e.preventDefault();
          close(false);
          // wait for the overlay to unmount and scrolling to unlock
          requestAnimationFrame(() => requestAnimationFrame(() => scrollToId(id)));
        }}
      >
        <div className="toc__inner">
          <p className="toc__kicker">In this issue</p>
          <ol className="toc__list">
            {chapters.map((c) => (
              <li key={c.id}>
                <a href={`#${c.id}`} style={{ "--c": c.color } as React.CSSProperties}>
                  <i aria-hidden="true" />
                  {c.label}
                </a>
              </li>
            ))}
          </ol>
          <button className="toc__close" onClick={() => close()}>Close contents</button>
        </div>
      </div>
    </>
  );
}
