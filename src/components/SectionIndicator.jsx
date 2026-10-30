import { useEffect, useState } from "react";
import { useActiveSection } from "../hooks/useActiveSection.js";

const SECTIONS = [
  { id: "beranda", label: "Beranda" },
  { id: "tentang", label: "Tentang" },
  { id: "keahlian", label: "Keahlian" },
  { id: "proyek", label: "Karya" },
  { id: "pengalaman", label: "Pengalaman" },
  { id: "kontak", label: "Kontak" },
];

/**
 * Indikator posisi halaman:
 * 1. progress bar tipis di atas
 * 2. navigasi titik vertikal di tepi kanan (klik untuk pindah section)
 */
export default function SectionIndicator() {
  const active = useActiveSection();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? window.scrollY / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <div className="progress" aria-hidden="true">
        <i style={{ transform: `scaleX(${progress})` }} />
      </div>

      <nav className="side-nav" aria-label="Navigasi bagian halaman">
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={active === s.id ? "active" : ""}
            aria-label={s.label}
          >
            <span className="side-nav__label">{s.label}</span>
            <i />
          </a>
        ))}
      </nav>
    </>
  );
}
