import Reveal from "./Reveal.jsx";

const EXPERIENCES = [
  {
    period: "2024 — Sekarang",
    role: "Freelance Fullstack Developer",
    place: "Mandiri / Remote",
    desc: "Mengerjakan proyek web untuk klien startup & UMKM: dari desain UI, frontend React, hingga API Node.js.",
  },
  {
    period: "2022 — 2024",
    role: "Frontend Developer",
    place: "PT Kreatif Digital",
    desc: "Membangun dan merawat 8+ aplikasi web internal, memimpin migrasi codebase lama ke React + TypeScript.",
  },
  {
    period: "2021 — 2022",
    role: "Junior Web Developer",
    place: "Studio Narasi",
    desc: "Membuat landing page dan CMS mini untuk klien agensi; mulai mendalami animasi dan aksesibilitas.",
  },
  {
    period: "2020 — 2021",
    role: "Magang UI/UX Design",
    place: "Lokalab",
    desc: "Merancang wireframe & prototipe Figma, sistem desain internal, dan riset usability sederhana.",
  },
];

export default function Experience() {
  return (
    <section id="pengalaman" className="section">
      <div className="container">
        <Reveal>
          <div className="section__head">
            <span className="section__num">04</span>
            <h2 className="section__title">Pengalaman</h2>
          </div>
        </Reveal>

        <div className="exp-list">
          {EXPERIENCES.map((e, i) => (
            <Reveal key={e.role} delay={i * 80}>
              <div className="exp-row">
                <span className="exp-period">{e.period}</span>
                <div>
                  <div className="exp-role">
                    {e.role} <span className="exp-place">— {e.place}</span>
                  </div>
                  <p className="exp-desc">{e.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
