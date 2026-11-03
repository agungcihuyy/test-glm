import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext.jsx";
import { useActiveSection } from "../hooks/useActiveSection.js";
import { goToSection } from "../hooks/useGoToSection.js";

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

  /* tutup menu mobile jika viewport diperlebar ke layar desktop */
  useEffect(() => {
    if (!menuOpen) return;
    const onResize = () => {
      if (window.innerWidth > 1024) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [menuOpen]);

  /* kunci scroll halaman selama menu layar penuh terbuka */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className={`nav ${scrolled ? "nav--scrolled" : ""} ${menuOpen ? "nav--open" : ""}`}>
        <div className="container nav__inner">
          {/* --- brand: kotak logo AP + nama --- */}
          <a
            href="#"
            className="nav__brand"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              goToSection("#");
            }}
          >
            <span className="nav__logo-mark">AP</span>
            <span className="nav__brand-text">
              <b>Agung Pandu</b>
              <small>Dengveloper</small>
            </span>
          </a>

          {/* --- link tengah --- */}
          <nav className="nav__links-wrapper" aria-label="Navigasi desktop">
            <ul className="nav__links">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={active === hrefToId(l.href) ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      setMenuOpen(false);
                      goToSection(l.href);
                    }}
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

            <a
              href="#kontak"
              className="nav__cta"
              onClick={(e) => {
                e.preventDefault();
                goToSection("#kontak");
              }}
            >
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
              aria-controls="mobile-nav"
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* panel dropdown menu di responsive — tidak memenuhi layar */}
      {menuOpen && (
        <>
          <div
            className="nav__backdrop"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <nav
            id="mobile-nav"
            className="nav__mobile"
            aria-label="Menu navigasi mobile"
          >
            <div className="container nav__mobile-inner">
              <ul className="nav__mobile-list">
                {MENU_ITEMS.map((l, i) => (
                  <li
                    key={l.href}
                    style={{ animationDelay: `${40 + i * 35}ms` }}
                  >
                    <a
                      href={l.href}
                      className={[
                        l.cta ? "is-cta" : "",
                        active === hrefToId(l.href) ? "active" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      onClick={(e) => {
                        e.preventDefault();
                        setMenuOpen(false);
                        goToSection(l.href);
                      }}
                    >
                      <span className="idx">{String(i + 1).padStart(2, "0")}</span>
                      <span className="label">{l.label}</span>
                      <span className="arr">{l.cta ? "↗" : "→"}</span>
                    </a>
                  </li>
                ))}
              </ul>

              {/* kaki menu — status ketersediaan ringkas */}
              <div className="nav__mobile-foot">
                <span className="foot-open">
                  <i className="nav__badge-dot" />
                  Terbuka untuk proyek &amp; kolaborasi
                </span>
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  );
}
