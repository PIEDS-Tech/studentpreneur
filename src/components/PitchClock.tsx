"use client";

import { useEffect, useRef, useState } from "react";
import { pitchStages } from "@/content/site";
import { getGsap, prefersReducedMotion } from "@/lib/motion";

const CIRC = 2 * Math.PI * 52;

/** Scrub through the 72-hour pitch competition from Edition 1.0. */
export default function PitchClock() {
  const [hours, setHours] = useState(0);
  const stageIndex = pitchStages.findIndex((s) => hours < s.until || s.until === 72);
  const stage = pitchStages[stageIndex];
  const stageRef = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (prefersReducedMotion() || !stageRef.current) return;
    const { gsap } = getGsap();
    gsap.fromTo(stageRef.current, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "back.out(2)" });
  }, [stageIndex]);

  return (
    <div className="clock">
      <svg className="clock__ring" viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r="52" className="clock__track" />
        <circle
          cx="60" cy="60" r="52" className="clock__fill"
          style={{ strokeDasharray: CIRC, strokeDashoffset: CIRC * (1 - hours / 72) }}
        />
      </svg>
      <div className="clock__face">
        <output className="clock__hours" htmlFor="hours">{hours}</output>
        <span className="clock__unit">hours in</span>
      </div>
      <div className="clock__stage" ref={stageRef}>
        <h3>{stage.title}</h3>
        <p>{stage.text}</p>
      </div>
      <label className="clock__label" htmlFor="hours">Drag through the 72 hours</label>
      <input
        className="clock__range" id="hours" type="range" min={0} max={72} step={1}
        value={hours} aria-valuetext={`${hours} of 72 hours`}
        onChange={(e) => setHours(Number(e.target.value))}
      />
    </div>
  );
}
