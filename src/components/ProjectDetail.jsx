import { useEffect } from "react";
import { useTheme } from "../context/ThemeContext.jsx";
import { PROJECTS } from "../data/projects.js";

export default function ProjectDetail({ project, onBack, onSelectProject }) {
  const { toggleTheme } = useTheme();

  // Scroll to top saat halaman detail dimuat
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [project.id]);

  // Cari proyek sebelumnya dan berikutnya untuk pagination
  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const prevProject =
    currentIndex > 0 ? PROJECTS[currentIndex - 1] : PROJECTS[PROJECTS.length - 1];
  const nextProject =
    currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : PROJECTS[0];

  return (
    <div className="project-detail">
      {/* --- Top Bar Navigasi Khusus Halaman Detail --- */}
      <header className="project-detail__nav">
        <div className="container project-detail__nav-inner">
          <button
            type="button"
            className="project-detail__back-btn"
            onClick={onBack}
            aria-label="Kembali ke semua proyek"
          >
            <span className="arrow">←</span>
            <span>Semua Proyek</span>
          </button>

          <div className="project-detail__breadcrumb">
            <span>Portofolio</span>
            <span className="sep">/</span>
            <span>Proyek</span>
            <span className="sep">/</span>
            <span className="current">{project.name}</span>
          </div>

          <div className="project-detail__nav-right">
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
          </div>
        </div>
      </header>

      {/* --- Main Content Halaman Detail --- */}
      <main className="project-detail__main">
        <div className="container">
          {/* Header Info Proyek */}
          <div className="project-detail__hero">
            <div className="project-detail__hero-top">
              <span className="project-detail__idx">
                PROYEK {project.idx} <span className="dim">/ 0{PROJECTS.length}</span>
              </span>
              <span className="project-detail__category">{project.category}</span>
            </div>

            <h1 className="project-detail__title">{project.name}</h1>
            <p className="project-detail__subtitle">{project.subtitle}</p>

            <div className="project-detail__badges">
              <span className="project-detail__status-badge">
                <i className="badge-dot" />
                {project.status}
              </span>
              <span className="project-detail__year-badge">{project.year}</span>
            </div>
          </div>

          {/* Gambar Utama / Showcase */}
          <div className="project-detail__preview">
            <div className="project-detail__preview-frame">
              <img
                src={project.img}
                alt={`Screenshot utama proyek ${project.name}`}
                className="project-detail__preview-img"
              />
            </div>
            <div className="project-detail__preview-caption">
              <span>Preview Antarmuka Sistem · {project.name}</span>
              <span className="format">Format: Web Application</span>
            </div>
          </div>

          {/* Grid Informasi & Spesifikasi */}
          <div className="project-detail__content-grid">
            {/* Kolom Kiri: Ulasan Proyek & Fitur */}
            <div className="project-detail__body">
              <section className="project-detail__section">
                <h2 className="project-detail__heading">
                  <span className="num">01.</span> Tentang Proyek
                </h2>
                <p className="project-detail__text">{project.overview}</p>
                <p className="project-detail__text dim">{project.desc}</p>
              </section>

              <section className="project-detail__section">
                <h2 className="project-detail__heading">
                  <span className="num">02.</span> Fitur Utama
                </h2>
                <ul className="project-detail__features-list">
                  {project.features.map((feat, idx) => (
                    <li key={idx} className="project-detail__feature-item">
                      <span className="feature-check">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Kolom Kanan: Spesifikasi, Teknologi, & Aksi */}
            <aside className="project-detail__sidebar">
              <div className="project-detail__card">
                <h3 className="project-detail__card-title">Informasi Proyek</h3>

                <dl className="project-detail__specs">
                  <div className="spec-item">
                    <dt>Peran</dt>
                    <dd>{project.role}</dd>
                  </div>
                  <div className="spec-item">
                    <dt>Kategori</dt>
                    <dd>{project.category}</dd>
                  </div>
                  <div className="spec-item">
                    <dt>Tahun</dt>
                    <dd>{project.year}</dd>
                  </div>
                  <div className="spec-item">
                    <dt>Status</dt>
                    <dd>{project.status}</dd>
                  </div>
                  <div className="spec-item">
                    <dt>Klien</dt>
                    <dd>{project.client}</dd>
                  </div>
                </dl>

                <div className="project-detail__tech-block">
                  <h4 className="tech-title">Teknologi &amp; Tools</h4>
                  <div className="project-detail__tags">
                    {project.tags.map((t) => (
                      <span key={t} className="tag-pill">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="project-detail__actions">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-detail__cta"
                  >
                    <span>Kunjungi Proyek</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>

                  <button
                    type="button"
                    className="project-detail__btn-outline"
                    onClick={onBack}
                  >
                    ← Kembali ke Proyek Lain
                  </button>
                </div>
              </div>
            </aside>
          </div>

          {/* Navigasi Antar Proyek (Sebelumnya / Selanjutnya) */}
          <nav className="project-detail__pagination" aria-label="Navigasi proyek terkait">
            <button
              type="button"
              className="pagination-btn pagination-btn--prev"
              onClick={() => onSelectProject(prevProject)}
            >
              <span className="pagination-sub">← Proyek Sebelumnya</span>
              <span className="pagination-name">{prevProject.name}</span>
            </button>

            <button
              type="button"
              className="pagination-btn pagination-btn--next"
              onClick={() => onSelectProject(nextProject)}
            >
              <span className="pagination-sub">Proyek Berikutnya →</span>
              <span className="pagination-name">{nextProject.name}</span>
            </button>
          </nav>
        </div>
      </main>
    </div>
  );
}

