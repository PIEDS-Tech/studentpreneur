"use client";

import Image, { getImageProps } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { photobook } from "@/content/site";
import { prefersReducedMotion } from "@/lib/motion";
import type { PageFlip } from "page-flip/dist/js/page-flip.module.js";

/**
 * A page-turning photobook (StPageFlip). The book's DOM is built imperatively
 * inside an empty host element because PageFlip moves and removes nodes itself;
 * the thumbnail strip below is regular React and doubles as the accessible
 * (and crawlable) version of the gallery.
 */
export default function Photobook() {
  const hostRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<PageFlip | null>(null);
  const [page, setPage] = useState(0);
  const total = photobook.length + 2; // front cover + photos + back cover

  useEffect(() => {
    let cancelled = false;
    const host = hostRef.current!;
    const block = document.createElement("div");
    block.className = "book";
    host.appendChild(block);

    block.appendChild(makeCover("front"));
    photobook.forEach((p, i) => block.appendChild(makePhotoPage(p, i)));
    block.appendChild(makeCover("back"));

    import("page-flip/dist/js/page-flip.module.js").then(({ PageFlip }) => {
      if (cancelled) return;
      const book = new PageFlip(block, {
        width: 440,
        height: 580,
        size: "stretch",
        minWidth: 240,
        maxWidth: 600,
        minHeight: 320,
        maxHeight: 790,
        showCover: true,
        usePortrait: true,
        mobileScrollSupport: true,
        maxShadowOpacity: 0.45,
        flippingTime: prefersReducedMotion() ? 1 : 900,
      });
      book.loadFromHTML(block.querySelectorAll<HTMLElement>(".book-page"));
      book.on("flip", (e) => setPage(Number(e.data)));
      bookRef.current = book;
    });

    return () => {
      cancelled = true;
      bookRef.current?.destroy();
      bookRef.current = null;
      block.remove();
    };
  }, []);

  const go = useCallback((index: number) => bookRef.current?.flip(index), []);
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); bookRef.current?.flipNext(); }
    if (e.key === "ArrowLeft") { e.preventDefault(); bookRef.current?.flipPrev(); }
  };

  const photoIndex = page - 1;
  const caption = photoIndex >= 0 && photoIndex < photobook.length ? photobook[photoIndex].caption : page === 0 ? "Open the book" : "The end. For now.";

  return (
    <div className="photobook">
      <div
        className="photobook__stage"
        ref={hostRef}
        tabIndex={0}
        role="group"
        aria-roledescription="photobook"
        aria-label="Studentpreneur 1.0 photobook. Use the left and right arrow keys to turn pages."
        onKeyDown={onKey}
      />

      <div className="photobook__controls">
        <button className="btn btn--ghost" onClick={() => bookRef.current?.flipPrev()} disabled={page === 0}>Previous page</button>
        <p className="photobook__caption" aria-live="polite">{caption}</p>
        <button className="btn btn--lemon" onClick={() => bookRef.current?.flipNext()} disabled={page >= total - 1}>Next page</button>
      </div>
      <div className="photobook__progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${(page + 1) / total})` }} />
      </div>

      <ul className="photobook__thumbs" aria-label="All photos">
        {photobook.map((p, i) => (
          <li key={p.caption}>
            <button
              onClick={() => go(i + 1)}
              aria-label={`Show “${p.caption}”`}
              className={photoIndex === i ? "is-current" : undefined}
            >
              <Image src={p.src} alt={p.alt} sizes="120px" placeholder="blur" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- imperative page builders ---------- */

function makeCover(side: "front" | "back") {
  const page = document.createElement("div");
  page.className = `book-page book-cover book-cover--${side}`;
  page.dataset.density = "hard";
  page.innerHTML =
    side === "front"
      ? `<div class="book-cover__inner">
           <span class="book-cover__kicker">The photobook</span>
           <span class="wordmark wordmark--book"></span>
           <span class="book-cover__edition">Edition 1.0<br/>Birla Balika Vidyapeeth, Pilani<br/>April 2025</span>
           <span class="book-cover__hint">Click, drag or swipe the corner to turn the page</span>
         </div>`
      : `<div class="book-cover__inner">
           <span class="book-cover__big">Your school<br/>could be next.</span>
           <a class="btn btn--ink" href="#interest">Register interest</a>
         </div>`;
  return page;
}

function makePhotoPage(photo: (typeof photobook)[number], i: number) {
  const { props } = getImageProps({ src: photo.src, alt: photo.alt, sizes: "(max-width: 700px) 90vw, 600px" });
  const page = document.createElement("div");
  page.className = `book-page book-photo ${i % 2 ? "book-photo--right" : "book-photo--left"}`;
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  img.src = props.src;
  if (props.srcSet) img.srcset = props.srcSet;
  if (props.sizes) img.sizes = props.sizes;
  img.alt = photo.alt;
  img.loading = "lazy";
  img.decoding = "async";
  img.draggable = false;
  const cap = document.createElement("figcaption");
  cap.textContent = photo.caption ?? "";
  figure.append(img, cap);
  page.append(figure);
  return page;
}
