import Reveal from "./Reveal.jsx";

const PROJECTS = [
  {
    idx: "01",
    name: "Nara Store",
    desc: "E-commerce storefront dengan katalog dinamis, keranjang belanja, dan pembayaran terintegrasi.",
    tags: ["React", "Tailwind", "Midtrans"],
    img: "/images/project-1.svg",
  },
  {
    idx: "02",
    name: "Lembarkertas",
    desc: "Landing page perpustakaan digital — tipografi editorial dengan akses buku berlangganan.",
    tags: ["Next.js", "CMS Headless"],
    img: "/images/project-2.svg",
  },
  {
    idx: "03",
    name: "TataKota",
    desc: "Dashboard pemantauan data kota: grafik real-time, peta interaktif, dan ekspor laporan PDF.",
    tags: ["React", "Chart.js", "MapBox"],
    img: "/images/project-3.svg",
  },
  {
    idx: "04",
    name: "Studio Halus",
    desc: "Website portofolio studio arsitektur dengan animasi scroll halus dan galeri proyek imersif.",
    tags: ["JS Vanilla", "GSAP"],
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
            <h2 className="section__title">Proyek Pilihan</h2>
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
