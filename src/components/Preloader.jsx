import { useEffect, useState } from "react";

/**
 * Preloader: angka persenan besar dengan glitch acak,
 * di bawahnya tulisan "Memuat assets" — lalu ditutup tirai.
 */
export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    let alive = true;
    const timers = [];
    let raf;
    const start = performance.now();
    const DURATION = 2600; // loading awal dirasakan lebih lama

    // glitch acak pada angka persenan
    const scheduleGlitch = () => {
      if (!alive) return;
      const next = 140 + Math.random() * 360;
      timers.push(
        setTimeout(() => {
          if (!alive) return;
          setGlitching(true);
          timers.push(
            setTimeout(
              () => alive && setGlitching(false),
              70 + Math.random() * 110
            )
          );
          scheduleGlitch();
        }, next)
      );
    };
    scheduleGlitch();

    // counter loading (easing biar terasa organik)
    const tick = (t) => {
      if (!alive) return;
      const p = Math.min((t - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * 100));

      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        timers.push(setTimeout(() => alive && setExiting(true), 250));
        timers.push(setTimeout(() => alive && onDone(), 250 + 900));
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, [onDone]);

  const pct = `${count}%`;

  return (
    <div className={`preloader ${exiting ? "preloader--exit" : ""}`}>
      <div
        className={`preloader__pct ${glitching ? "preloader__pct--glitch" : ""}`}
        data-text={`${count}%`}
      >
        {count}
        <span className="preloader__pct-mark">%</span>
      </div>
      <div className="preloader__load">
        <div className="preloader__load-bar">
          <i style={{ width: `${count}%` }} />
        </div>
        <span className="preloader__label">Memuat assets...</span>
      </div>
    </div>
  );
}
