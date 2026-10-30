import Reveal from "./Reveal.jsx";

const TESTIMONIALS = [
  {
    text: "Agung menerjemahkan brief yang berantakan menjadi desain yang bersih dan justru melebihi ekspektasi kami. Komunikasinya rapi dan tenggat selalu aman.",
    name: "Sinta Maharani",
    role: "Founder, Nara Store",
  },
  {
    text: "Kode yang ia seringkan mudah dirawat tim lain — itu kelangkaan. Performa website kami naik signifikan setelah rework-nya.",
    name: "Bayu Pratama",
    role: "Product Manager, TataKota",
  },
  {
    text: "Detail animasi dan tipografi yang ia buat terasa mahal tapi tidak berlebihan. Persis gaya yang kami cari.",
    name: "Raras Ayu",
    role: "Creative Director, Studio Halus",
  },
];

export default function Testimonials() {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="section__head">
            <span className="section__num">05</span>
            <h2 className="section__title">Kata Klien</h2>
          </div>
        </Reveal>

        <div className="testi__grid">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 110}>
              <figure className="testi-card">
                <span className="testi-mark">“</span>
                <p className="testi-text">{t.text}</p>
                <figcaption className="testi-author">
                  <b>{t.name}</b>
                  <span>{t.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
