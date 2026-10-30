import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext.jsx";
import { useActiveSection } from "../hooks/useActiveSection.js";

const LINKS = [
  { href: "#proyek", label: "Karya" },
  { href: "#keahlian", label: "Keahlian" },
  { href: "#tentang", label: "Tentang" },
  { href: "#pengalaman", label: "Pengalaman" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { toggleTheme } = useTheme();
  const active = useActiveSection();

  const hrefToId = (href) => href.slice(1);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="container nav__inner">
        {/* --- brand: kotak logo AP + nama --- */}
        <a href="#" className="nav__brand">
          <span className="nav__logo-mark">AP</span>
          <span className="nav__brand-text">
            <b>Agung Pandu</b>
            <small>Fullstack Developer &amp; UI Engineer</small>
          </span>
        </a>

        {/* --- link tengah --- */}
        <nav>
          <ul className="nav__links">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={active === hrefToId(l.href) ? "active" : ""}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* --- kanan: badge status, toggle tema, tombol kontak --- */}
        <div className="nav__right">
          <span className="nav__badge">
            <i className="nav__badge-dot" />
            Terbuka untuk proyek
          </span>

          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Ganti mode gelap / terang"
            title="Ganti mode gelap / terang"
          >
            <svg className="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="12" cy="12" r="4.2" />
              <path d="M12 2v2.6M12 19.4V22M2 12h2.6M19.4 12H22M4.9 4.9l1.9 1.9M17.2 17.2l1.9 1.9M4.9 19.1l1.9-1.9M17.2 6.8l1.9-1.9" strokeLinecap="round" />
            </svg>
            <svg className="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M20 13.2A8.2 8.2 0 1 1 10.8 4 6.6 6.6 0 0 0 20 13.2Z" strokeLinejoin="round" />
            </svg>
          </button>

          <a href="#kontak" className="nav__cta">
            Kontak
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
