import { useMemo } from "react";

/**
 * Overlay glitch layar penuh yang muncul SETIAP kali tema berganti.
 * Isinya: flash RGB-split, glitch bars acak, scanline, dan chroma shift.
 */
export default function GlitchOverlay({ active }) {
  // posisi bar acak — dibuat ulang setiap kali overlay aktif
  const bars = useMemo(() => {
    if (!active) return [];
    return Array.from({ length: 14 }, (_, i) => {
      const height = 2 + Math.random() * 7; // vh
      const top = Math.random() * (100 - height);
      const width = 20 + Math.random() * 70; // vw
      const left = Math.random() * (100 - width);
      const light = Math.random() > 0.5;
      return { height, top, width, left, light, key: i, delay: Math.random() * 0.15 };
    });
  }, [active]);

  if (!active) return null;

  return (
    <div className="glitch-overlay" aria-hidden="true">
      <div className="glitch-overlay__chroma" />
      <div className="glitch-overlay__bars">
        {bars.map((b) => (
          <i
            key={b.key}
            style={{
              top: `${b.top}vh`,
              left: `${b.left}vw`,
              width: `${b.width}vw`,
              height: `${b.height}vh`,
              background: b.light ? "var(--ink)" : "var(--bg)",
              outline: "1px solid var(--accent-2)",
              animationDelay: `${b.delay}s`,
            }}
          />
        ))}
      </div>
      <div className="glitch-overlay__flash" />
      <div className="glitch-overlay__scan" />
    </div>
  );
}
