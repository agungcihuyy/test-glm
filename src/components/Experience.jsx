import Reveal from "./Reveal.jsx";

/* === pendidikan: kolom kiri (terbaru di atas) === */
const EDUCATION = [
  {
    logo: "/images/logo-kampus.png",
    alt: "Logo Universitas Teknologi Nusantara",
    period: "2025 — Sekarang",
    role: "S1 Teknik Informatika",
    place: "Institut Bisnis dan Teknologi Indonesia",
    desc: "Fokus pengembangan web, struktur data, dan rekayasa perangkat lunak.",
  },
  {
    logo: "/images/logo-sekolah1.png",
    alt: "Logo SMA Negeri 2 Tabanan",
    period: "2022 — 2025",
    role: "SMA Negeri 2 Tabanan",
    place: "SMA Negeri 2 Tabanan",
    desc: "Jurusan IPA; Tertarik dengan dunia kesehatan dan teknologi.",
  },
  {
    logo: "/images/logo-sekolah2.png",
    alt: "Logo SMP Negeri 2 Tabanan",
    period: "2019 — 2022",
    role: "SMP Negeri 2 Tabanan",
    place: "SMP Negeri 2 Tabanan",
    desc: "Mengetahui perkembangan teknologi dan kesehatan.",
  },
  {
    logo: "/images/logo-sekolah3.png",
    alt: "Logo SD Negeri 6 Delod Peken",
    period: "2013 — 2019",
    role: "SD Negeri 6 Delod Peken",
    place: "SD Negeri 6 Delod Peken",
    desc: "Mulai mengetahui teknologi.",
  },
];

/* === pengalaman kerja: kolom kanan (terbaru di atas) === */
const EXPERIENCES = [
  {
    period: "2025 — Sekarang",
    role: "Learning and Development",
    place: "Mandiri / Remote",
    desc: "Belajar dan mengembangkan kemampuan teknis untuk masa depan.",
  },
  {
    period: "2024 — Sekarang",
    role: "Cleaning Laptop",
    place: "Mandiri / Remote",
    desc: "Membersihkan dan merawat laptop untuk meningkatkan performa dan daya tahan.",
  },
  // {
  //   period: "2021 — 2022",
  //   role: "Junior Web Developer",
  //   place: "Studio Narasi",
  //   desc: "Membuat landing page dan CMS mini untuk klien agensi; mulai mendalami animasi dan aksesibilitas.",
  // },
  // {
  //   period: "2020 — 2021",
  //   role: "Magang UI/UX Design",
  //   place: "Lokalab",
  //   desc: "Merancang wireframe & prototipe Figma, sistem desain internal, dan riset usability sederhana.",
  // },
];

/* baris pendidikan — pola baris pengalaman, tapi tanpa nomor:
   lubang kiri dipakai logo institusi (segrid dengan lingkaran) */
const EduRow = ({ item, delay = 0 }) => (
  <Reveal delay={delay}>
    <article className="exp-row">
      <img className="edu-badge" src={item.logo} alt={item.alt} loading="lazy" />
      <div>
        <div className="exp-role">{item.role}</div>
        <div className="exp-metaline">
          <span className="exp-place">{item.place}</span>
          <i className="exp-dot" />
          <span className="exp-period">{item.period}</span>
        </div>
        <p className="exp-desc">{item.desc}</p>
      </div>
    </article>
  </Reveal>
);

/* baris pengalaman — nomor lingkaran + metaline tempat · periode */
const ExpRow = ({ item, index, delay = 0 }) => (
  <Reveal delay={delay}>
    <article className="exp-row">
      <span className="exp-index">{String(index + 1).padStart(2, "0")}</span>
      <div>
        <div className="exp-role">{item.role}</div>
        <div className="exp-metaline">
          <span className="exp-place">{item.place}</span>
          <i className="exp-dot" />
          <span className="exp-period">{item.period}</span>
        </div>
        <p className="exp-desc">{item.desc}</p>
      </div>
    </article>
  </Reveal>
);

export default function Experience() {
  return (
    <section id="pengalaman" className="section">
      <div className="container">
        <Reveal>
          <div className="section__head">
            <span className="section__num">04</span>
            <h2 className="section__title">Journey</h2>
          </div>
        </Reveal>

        <div className="exp-grid">
          {/* --- kiri: pendidikan, baris bernomor + logo --- */}
          <div className="exp-col exp-col--edu">
            <Reveal>
              <h3 className="exp-sub">Pendidikan</h3>
            </Reveal>
            {EDUCATION.map((e, i) => (
              <EduRow key={e.role} item={e} delay={i * 90} />
            ))}
          </div>

          {/* --- kanan: pengalaman, baris bernomor --- */}
          <div className="exp-col exp-col--exp">
            <Reveal>
              <h3 className="exp-sub">Pengalaman</h3>
            </Reveal>
            {EXPERIENCES.map((e, i) => (
              <ExpRow key={e.role} item={e} index={i} delay={i * 80} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
