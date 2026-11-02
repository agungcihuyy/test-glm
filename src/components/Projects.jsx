import Reveal from "./Reveal.jsx";

const PROJECTS = [
  {
    idx: "01",
    name: "Tamblingan Lake",
    desc: "Website informasi destinasi wisata Tamblingan Lake dengan peta interaktif dan galeri foto.",
    tags: ["Php", "Tailwind", "Bootstrap"],
    img: "/images/project-1.png",
  },
  {
    idx: "02",
    name: "Rental Ps",
    desc: "Sistem rental PlayStation dengan manajemen stok, pemesanan, dan pemantauan.",
    tags: ["Node.js", "PHP", "Tailwind"],
    img: "/images/project-2.png",
  },
  {
    idx: "03",
    name: "HBD Card",
    desc: "Happy Birthday Card interaktif dengan animasi dan efek suara.",
    tags: ["React", "Tailwind", "HTML"],
    img: "/images/project-3.png",
  },
  {
    idx: "04",
    name: "Under Construction",
    desc: "Sedang dalam pengembangan dan diusahakan hasilnya akan datang.",
    tags: ["Vite", "Laravel"],
    img: "/images/project-4.svg",
  },
];

export default function Projects() {
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
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                <div className="project-card__img">
                  <img src={p.img} alt={`Tampilan desain proyek ${p.name}`} />
                </div>
                <div className="project-card__body">
                  <div className="project-card__top">
                    <span>{p.idx}</span>
                    <span>[ Klik untuk detail ]</span>
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
