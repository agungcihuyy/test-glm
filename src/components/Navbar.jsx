import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext.jsx";
import { useActiveSection } from "../hooks/useActiveSection.js";

/* sinkron dengan Contact.jsx — satu email, dua pintu masuknya */
const EMAIL = "agungpandu36@gmail.com";

/* urutan mengikuti section asli di halaman:
   01 tentang → 02 keahlian → 03 proyek → 04 pengalaman */
const LINKS = [
  { href: "#tentang", label: "Tentang" },
  { href: "#keahlian", label: "Keahlian" },
  { href: "#proyek", label: "Projects" },
  { href: "#pengalaman", label: "Journey" },
];

/* item panel menu: LINKS + Playlist + Kontak (aksi utama) */
const MENU_ITEMS = [
  ...LINKS,
  { href: "#playlist", label: "Playlist" },
  { href: "#kontak", label: "Kontak", cta: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mailCopied, setMailCopied] = useState(false);
  const { toggleTheme } = useTheme();
  const active = useActiveSection();

  const hrefToId = (href) => href.slice(1);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* tutup menu mobile dengan tombol Esc */
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  /* kunci scroll halaman selama menu layar penuh terbuka */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setMailCopied(true);
      setTimeout(() => setMailCopied(false), 2200);
    } catch {
      /* clipboard bisa diblokir browser — diabaikan */
    }
  };

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""} ${menuOpen ? "nav--open" : ""}`}>
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

          {/* tombol hamburger — hanya tampil di responsive */}
          <button
            className={`nav__burger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* panel menu layar penuh — semua section + blok kontak */}
      {menuOpen && (
        <nav className="nav__mobile" aria-label="Menu navigasi mobile">
          <ul className="nav__mobile-list">
            {MENU_ITEMS.map((l, i) => (
              <li
                key={l.href}
                style={{ animationDelay: `${80 + i * 55}ms` }}
              >
                <a
                  href={l.href}
                  className={[
                    l.cta ? "is-cta" : "",
                    active === hrefToId(l.href) ? "active" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="idx">{String(i + 1).padStart(2, "0")}</span>
                  <span className="label">{l.label}</span>
                  <span className="arr">{l.cta ? "↗" : "→"}</span>
                </a>
              </li>
            ))}
          </ul>

          {/* kaki menu — pintasan kontak: email penuh + salin + status */}
          <div className="nav__mobile-foot">
            <span className="foot-label">Kirim email</span>
            <div className="foot-mail">
              <a
                href={`mailto:${EMAIL}`}
                onClick={() => setMenuOpen(false)}
                title="Buka aplikasi email"
              >
                {EMAIL}
              </a>
              <button
                type="button"
                className={`nav__mail-copy${mailCopied ? " copied" : ""}`}
                onClick={copyEmail}
                aria-live="polite"
              >
                {mailCopied ? "Tersalin ✓" : "Salin"}
              </button>
            </div>
            <span className="foot-open">Terbuka untuk proyek · balasan cepat via email</span>
          </div>
        </nav>
      )}
    </header>
  );
}
