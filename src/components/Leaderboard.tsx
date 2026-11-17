"use client";

import { useEffect, useRef, useState } from "react";
import { sampleLeaderboard } from "@/content/site";
import { getGsap, prefersReducedMotion } from "@/lib/motion";

type Row = { team: string; points: number; delta: number };

const ROW_HEIGHT = 46; // px, row height + gap (matches CSS)
const initialRows: Row[] = sampleLeaderboard.map((r) => ({ ...r, delta: 0 }));

/**
 * Sample leaderboard. Rows keep a stable DOM order and slide to their rank
 * with a CSS transform transition, so re-ranking never re-orders the DOM.
 */
export default function Leaderboard() {
  const [rows, setRows] = useState<Row[]>(initialRows);
  const [day, setDay] = useState(0);
  const pointsRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const prevPoints = useRef<Record<string, number>>(
    Object.fromEntries(initialRows.map((r) => [r.team, r.points])),
  );

  const ranked = [...rows].sort((a, b) => b.points - a.points);
  const rankOf = (team: string) => ranked.findIndex((r) => r.team === team);

  const runDay = () => {
    setRows((prev) => prev.map((r) => {
      const delta = Math.round(20 + Math.random() * 90);
      return { ...r, points: r.points + delta, delta };
    }));
    setDay((d) => d + 1);
  };

  const reset = () => { setRows(initialRows); setDay(0); };

  // Count the points up smoothly
  useEffect(() => {
    const { gsap } = getGsap();
    const tweens = rows.map((r) => {
      const el = pointsRefs.current[r.team];
      const from = prevPoints.current[r.team] ?? r.points;
      prevPoints.current[r.team] = r.points;
      if (!el) return null;
      if (prefersReducedMotion() || from === r.points) { el.textContent = String(r.points); return null; }
      const counter = { n: from };
      return gsap.to(counter, {
        n: r.points, duration: 0.7, ease: "power2.out",
        onUpdate: () => { el.textContent = String(Math.round(counter.n)); },
      });
    });
    return () => tweens.forEach((t) => t?.kill());
  }, [rows]);

  return (
    <div className="leaderboard">
      <div className="leaderboard__head">
        <p className="leaderboard__title">Leaderboard</p>
        <p className="leaderboard__day" aria-live="polite">
          {day === 0 ? "Start of online week" : `After day ${day}: ${ranked[0].team} leads`}
        </p>
      </div>

      <ol className="leaderboard__list" style={{ height: rows.length * ROW_HEIGHT }} aria-label="Ranking">
        {rows.map((r) => {
          const rank = rankOf(r.team);
          return (
            <li
              key={r.team}
              data-rank={rank + 1}
              style={{ transform: `translateY(${rank * ROW_HEIGHT}px)` }}
              aria-setsize={rows.length}
              aria-posinset={rank + 1}
            >
              <span className="leaderboard__rank">{rank + 1}</span>
              <span className="leaderboard__team">{r.team}</span>
              {r.delta > 0 && <span className="leaderboard__delta" key={`${r.team}-${day}`}>+{r.delta}</span>}
              <span className="leaderboard__pts">
                <span ref={(el) => { pointsRefs.current[r.team] = el; }}>{r.points}</span> pts
              </span>
            </li>
          );
        })}
      </ol>

      <div className="leaderboard__actions">
        <button className="btn btn--ink" onClick={runDay} disabled={day >= 7}>
          {day >= 7 ? "Week complete" : "Run a day of assignments"}
        </button>
        {day > 0 && <button className="btn btn--ghost-ink" onClick={reset}>Reset</button>}
      </div>
      <p className="leaderboard__note">Sample teams and scores, for illustration.</p>
    </div>
  );
}
