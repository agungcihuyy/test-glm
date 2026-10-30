import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useScramble } from "../hooks/useScramble.js";

const TECH_TAGS = ["React", "TypeScript", "Node.js", "Tailwind", "Figma"];

// three.js dimuat terpisah (lazy) agar halaman awal tetap ringan
const Badge3D = lazy(() => import("./Badge3D.jsx"));

export default function Hero({ ready }) {
  const [glitchTarget, setGlitchTarget] = useState(null);
  const [offset, setOffset] = useState(0);
  const [settled, setSettled] = useState(false);
  const titleRef = useRef(null);

  // ==== AUTO-FIT judul: pastikan tiap baris muat penuh, tidak pernah terpotong ====
  useEffect(() => {
    const fit = () => {
      const h1 = titleRef.current;
      const main = h1?.parentElement;
      if (!h1 || !main) return;

      const cs = getComputedStyle(main);
      const avail =
        main.clientWidth -
        parseFloat(cs.paddingLeft || "0") -
        parseFloat(cs.paddingRight || "0");
      if (avail <= 0) return;

      // ukur lebar asli tiap baris pada baseline 100px
      const baseline = 100;
      h1.style.fontSize = baseline + "px";
      const lines = h1.querySelectorAll(".hero__line > span");
      let maxW = 0;
      lines.forEach((el) => {
        maxW = Math.max(maxW, el.scrollWidth);
      });
      if (!maxW) return;

      // faktor 0.97 — sama seperti versi yang sebelumnya enak dilihat;
      // clipping juga sudah dilepas setelah intro, jadi aman
      const size = Math.min((baseline * avail * 0.97) / maxW, 110);
      h1.style.fontSize = size.toFixed(2) + "px";
    };

    fit();
    window.addEventListener("resize", fit);
    document.fonts?.ready?.then(() => fit());
    // re-fit beberapa kali: teks scramble & font web mengubah lebar di awal
    const timers = [250, 600, 1000, 1500, 2100, 2800].map((d) => setTimeout(fit, d));
    return () => {
      window.removeEventListener("resize", fit);
      timers.forEach(clearTimeout);
    };
  }, [ready]);

  // setelah animasi masuk selesai, bebaskan clipping agar glitch juga tak terpotong
  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(() => setSettled(true), 1700);
    return () => clearTimeout(t);
  }, [ready]);

  // glitch berkala pada judul
  useEffect(() => {
    if (!ready) return;
    let alive = true;

    const scheduleGlitch = () => {
      const wait = 2200 + Math.random() * 3500;
      return setTimeout(() => {
        if (!alive) return;
        setGlitchTarget(0);
        setTimeout(() => alive && setGlitchTarget(null), 420);
        timeout = setTimeout(scheduleGlitch, 450);
      }, wait);
    };

    let timeout = setTimeout(scheduleGlitch, 1800);
    return () => {
      alive = false;
      clearTimeout(timeout);
    };
  }, [ready]);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrambled = useScramble("DEVELOPER", { start: ready, duration: 1300 });

  return (
    <section
      id="beranda"
      className={`hero ${ready ? "ready" : ""} ${settled ? "settled" : ""}`}
    >
      <div className="hero__bg-word">AP</div>
      <div className="hero__blob hero__blob--1" />
      <div className="hero__blob hero__blob--2" />

      {ready && (
        <Suspense fallback={null}>
          <div className="lanyard">
            <Badge3D />
            <span className="lanyard__hint">
              Seret / ketuk kartunya — fisika 3D real-time
            </span>
          </div>
        </Suspense>
      )}

      {/* parallax hanya pada konten — section tetap di alur normal */}
      <div
        className="container hero__grid"
        style={{
          transform: `translate3d(0, ${Math.min(offset * 0.18, 150)}px, 0)`,
          opacity: Math.max(0, 1 - offset / 950),
        }}
      >
        <div className="hero__toprow">
          <p className="hero__eyebrow">
            <span>Halo, saya —</span>
          </p>
          <span className="hero__toprow-meta">Portfolio — Edisi 2026</span>
          <span className="hero__spin" aria-hidden="true">
            ✳
          </span>
        </div>

        <div className="hero__bottom">
          <div className="hero__main">
            <h1 className="hero__title" ref={titleRef}>
              <span className="hero__line">
                <span
                  className={`glitchable ${glitchTarget === 0 ? "glitching" : ""}`}
                  data-text="AGUNG PANDU"
                >
                  AGUNG PANDU
                </span>
              </span>
              <span className="hero__line">
                <span className="outline">{scrambled}</span>
              </span>
            </h1>

            <p className="hero__sub">
              Saya merancang dan membangun pengalaman web yang bersih, cepat,
              dan fungsional — dengan detail desain yang rapi dan kode yang
              terstruktur.
            </p>

            <div className="hero__tags">
              {TECH_TAGS.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>

            <div className="hero__cta">
              <a href="#proyek" className="btn">
                Lihat Proyek
              </a>
              <a href="#kontak" className="btn btn--ghost">
                Hubungi Saya
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__scroll">Scroll</div>
    </section>
  );
}
