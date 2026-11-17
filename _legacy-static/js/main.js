/* Studentpreneur — Teachers' Edition
   GSAP (ScrollTrigger + Draggable) for motion, Lenis for smooth scroll. */

(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasGsap = typeof window.gsap !== "undefined";

  if (hasGsap) gsap.registerPlugin(ScrollTrigger, Draggable);

  /* ---------- smooth scroll ---------- */
  let lenis = null;
  if (!reduceMotion && typeof window.Lenis !== "undefined") {
    lenis = new Lenis({ lerp: 0.1 });
    if (hasGsap) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }

  const scrollToHash = (hash) => {
    const target = $(hash);
    if (!target) return;
    if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.4 });
    else target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    history.replaceState(null, "", hash);
  };

  /* ---------- contents overlay ---------- */
  const toc = $("#toc");
  const openBtn = $("[data-menu-open]");

  const setToc = (open) => {
    toc.hidden = !open;
    openBtn.setAttribute("aria-expanded", String(open));
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (lenis) open ? lenis.stop() : lenis.start();
    if (open) {
      $("a", toc).focus();
      if (hasGsap && !reduceMotion) {
        gsap.from($$(".toc__list li", toc), { y: 40, opacity: 0, stagger: 0.04, duration: 0.5, ease: "power3.out" });
      }
    } else {
      openBtn.focus();
    }
  };

  openBtn.addEventListener("click", () => setToc(true));
  $("[data-menu-close]").addEventListener("click", () => setToc(false));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !toc.hidden) setToc(false);
  });

  // every in-page link scrolls smoothly (and closes the overlay if open)
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link || link.getAttribute("href").length < 2) return;
    e.preventDefault();
    if (!toc.hidden) {
      toc.hidden = true;
      openBtn.setAttribute("aria-expanded", "false");
      document.documentElement.style.overflow = "";
      if (lenis) lenis.start();
    }
    scrollToHash(link.getAttribute("href"));
  });

  /* ---------- masthead: current chapter + progress ---------- */
  const nowEl = $("[data-now]");
  const pageEl = $("[data-page]");
  const tabs = $$("[data-tab]");
  const chapters = $$("[data-chapter]");

  const chapterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const s = entry.target;
      nowEl.textContent = s.dataset.chapter;
      pageEl.textContent = `p. ${s.dataset.page}`;
      tabs.forEach((t) => t.classList.toggle("is-active", t.dataset.tab === s.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  chapters.forEach((s) => chapterObserver.observe(s));

  const progress = $("[data-progress]");
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  };
  addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  /* ---------- 72-hour clock ---------- */
  const STAGES = [
    { until: 12, title: "Pick a problem", text: "Teams choose a problem statement that came up in the workshop activities." },
    { until: 36, title: "Meet your mentor", text: "A dedicated mentor guides the team, offers suggestions and helps them past blockers." },
    { until: 60, title: "Build the deck", text: "The idea becomes a pitch deck: problem, solution, market, money." },
    { until: 72, title: "Rehearse the pitch", text: "Teams polish the story and get ready for demo day." },
  ];
  const range = $("[data-clock-range]");
  const fill = $("[data-clock-fill]");
  const hoursOut = $("[data-clock-hours]");
  const stageEl = $("[data-clock-stage]");
  const CIRC = 2 * Math.PI * 52;
  let currentStage = 0;

  const renderClock = (h) => {
    hoursOut.textContent = h;
    fill.style.strokeDashoffset = String(CIRC * (1 - h / 72));
    range.setAttribute("aria-valuetext", `${h} of 72 hours`);
    const idx = STAGES.findIndex((s) => h < s.until || s.until === 72);
    if (idx === currentStage) return;
    currentStage = idx;
    const s = STAGES[idx];
    const swap = () => { stageEl.innerHTML = `<h3>${s.title}</h3><p>${s.text}</p>`; };
    if (hasGsap && !reduceMotion) {
      gsap.to(stageEl, { y: -10, opacity: 0, duration: 0.15, onComplete: () => {
        swap();
        gsap.fromTo(stageEl, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: "back.out(2)" });
      } });
    } else swap();
  };
  range.addEventListener("input", () => renderClock(Number(range.value)));
  renderClock(0);

  /* ---------- budget calculator ---------- */
  const FEE = 1250;
  const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
  const calcRange = $("[data-calc-range]");
  const calcCount = $("[data-calc-count]");
  const calcTotal = $("[data-calc-total]");
  const renderCalc = () => {
    const n = Number(calcRange.value);
    calcCount.textContent = n;
    calcTotal.textContent = inr.format(n * FEE);
  };
  calcRange.addEventListener("input", renderCalc);
  renderCalc();

  if (!hasGsap) return;

  /* ---------- draggable stickers (cover) ---------- */
  Draggable.create(".sticker", {
    bounds: ".cover",
    zIndexBoost: true,
    onPress() { gsap.to(this.target, { scale: 1.12, duration: 0.2 }); },
    onRelease() { gsap.to(this.target, { scale: 1, duration: 0.5, ease: "elastic.out(1, .4)" }); },
  });

  const mm = gsap.matchMedia();

  /* ---------- cover intro: the one orchestrated moment ---------- */
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.from(".cover__issue span", { y: -30, opacity: 0, stagger: 0.08, duration: 0.6 })
      .from(".wordmark--cover", { yPercent: 40, scale: 0.7, rotate: -12, opacity: 0, duration: 1.1, ease: "back.out(1.6)" }, "-=0.3")
      .from("[data-intro-photo]", { xPercent: 30, rotate: 14, opacity: 0, duration: 1 }, "-=0.8")
      .from(".cover__lines li", { x: -40, opacity: 0, stagger: 0.1, duration: 0.6 }, "-=0.6")
      .from(".sticker", { scale: 0, rotate: () => gsap.utils.random(-90, 90), stagger: 0.07, duration: 0.7, ease: "back.out(2.5)" }, "-=0.4")
      .from(".cover__hint", { opacity: 0, duration: 0.5 });

    // rocket drifts upward as the cover scrolls away
    gsap.to(".cover__rocket", {
      yPercent: -25, ease: "none",
      scrollTrigger: { trigger: ".cover", start: "top top", end: "bottom top", scrub: true },
    });

    // marquees speed up with scroll velocity
    $$(".marquee").forEach((m) => {
      gsap.fromTo(m, { xPercent: 2 }, {
        xPercent: -2, ease: "none",
        scrollTrigger: { trigger: m, start: "top bottom", end: "bottom top", scrub: true },
      });
    });

    // gentle parallax on photos
    $$("[data-parallax]").forEach((el) => {
      const img = el.tagName === "IMG" ? el : $("img", el);
      gsap.fromTo(img, { yPercent: -6, scale: 1.12 }, {
        yPercent: 6, ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      });
    });

    // demo day photo opens like a curtain
    gsap.fromTo("[data-reveal]", { clipPath: "inset(18% 22% 18% 22% round 28px)" }, {
      clipPath: "inset(0% 0% 0% 0% round 28px)", ease: "none",
      scrollTrigger: { trigger: ".demoday", start: "top 85%", end: "top 20%", scrub: true },
    });
  });

  /* ---------- workshop: pages turn sideways (desktop) ---------- */
  mm.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
    const track = $(".workshop__track");
    const distance = () => track.scrollWidth - innerWidth;
    const tween = gsap.to(track, {
      x: () => -distance(), ease: "none",
      scrollTrigger: {
        trigger: ".workshop", pin: ".workshop__pin", start: "top top",
        end: () => `+=${distance()}`, scrub: 0.6, invalidateOnRefresh: true,
      },
    });
    $$(".pillar").forEach((p) => {
      gsap.from(p, {
        rotate: 6, y: 60, ease: "none",
        scrollTrigger: { trigger: p, containerAnimation: tween, start: "left right", end: "left 55%", scrub: true },
      });
    });
  });

  /* ---------- activities board (desktop) ---------- */
  mm.add("(min-width: 901px)", () => {
    const cards = $$(".act");
    const drags = Draggable.create(cards, {
      bounds: "[data-board]",
      zIndexBoost: true,
      onPress() { this.target.classList.add("is-dragging"); gsap.to(this.target, { rotate: 0, scale: 1.04, duration: 0.25 }); },
      onRelease() {
        this.target.classList.remove("is-dragging");
        gsap.to(this.target, { rotate: gsap.utils.random(-6, 6), scale: 1, duration: 0.6, ease: "elastic.out(1, .45)" });
      },
    });

    const board = $("[data-board]");
    $("[data-shuffle]").addEventListener("click", shuffle);
    function shuffle() {
      const bw = board.clientWidth, bh = board.clientHeight;
      cards.forEach((c) => {
        const maxX = bw - c.offsetWidth, maxY = bh - c.offsetHeight;
        gsap.to(c, {
          x: gsap.utils.random(0, maxX) - c.offsetLeft,
          y: gsap.utils.random(0, maxY) - c.offsetTop,
          rotate: gsap.utils.random(-8, 8),
          duration: reduceMotion ? 0 : 0.8, ease: "back.out(1.4)",
          onComplete: () => drags.forEach((d) => d.update()),
        });
      });
    }

    if (!reduceMotion) {
      gsap.from(cards, {
        y: -200, rotate: () => gsap.utils.random(-30, 30), opacity: 0,
        stagger: 0.08, duration: 0.9, ease: "bounce.out",
        scrollTrigger: { trigger: board, start: "top 75%", once: true },
      });
    }
    return () => drags.forEach((d) => d.kill());
  });

  addEventListener("load", () => ScrollTrigger.refresh());
})();
