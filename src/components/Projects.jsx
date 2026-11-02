import Reveal from "./Reveal.jsx";
import { PROJECTS } from "../data/projects.js";

export default function Projects({ onSelectProject }) {
  return (
    <section id="proyek" className="section">
      <div className="container">
        <Reveal>
          <div className="section__head">
            <span className="section__num">03</span>
            <h2 className="section__title">Projects</h2>
          </div>
        </Reveal>

        <div className="projects__grid">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.idx} delay={(i % 2) * 120}>
              <a
                className="project-card"
                href={`#project-${p.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (onSelectProject) onSelectProject(p);
                }}
              >
                <div className="project-card__img">
                  <img src={p.img} alt={`Tampilan desain proyek ${p.name}`} />
                </div>
                <div className="project-card__body">
                  <div className="project-card__top">
                    <span>{p.idx}</span>
                    <span className="project-card__cta-label">[ Detail Proyek → ]</span>
                  </div>
                  <h3 className="project-card__name">{p.name}</h3>
                  <p className="project-card__desc">{p.desc}</p>
                  <div className="project-card__tags">
                    {p.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
