import { useState } from "react";
import Reveal from "./Reveal.jsx";

const STATS = [
  { b: "3+", s: "Tahun Pengalaman" },
  { b: "24", s: "Proyek Selesai" },
  { b: "12", s: "Klien Puas" },
];

function Portrait() {
  const [failed, setFailed] = useState(false);
  return (
    <figure className="about__photo">
      <img
        src="/images/portrait.jpg"
        alt="Foto Agung Pandu"
        onError={(e) => {
          // fallback ke placeholder bila foto belum disediakan
          if (!e.currentTarget.dataset.fb) {
            e.currentTarget.dataset.fb = "1";
            e.currentTarget.src = "/images/portrait.svg";
          } else {
            setFailed(true);
          }
        }}
        style={failed ? { display: "none" } : undefined}
      />
      {failed && <div className="about__photo-empty">Foto profil</div>}
      <figcaption className="about__photo-tag">
        Agung Pandu
        <span>— Jakarta, Indonesia</span>
      </figcaption>
    </figure>
  );
}

export default function About() {
  return (
    <section id="tentang" className="section">
      <div className="container">
        <Reveal>
          <div className="section__head">
            <span className="section__num">01</span>
            <h2 className="section__title">Tentang Saya</h2>
          </div>
        </Reveal>

        <div className="about__grid">
          <Reveal className="about__photo-wrap">
            <Portrait />
          </Reveal>

          <div>
            <Reveal>
              <div className="about__text">
                <p>
                  Halo! Saya <strong>Agung Pandu</strong>, seorang web developer
                  yang percaya bahwa desain terbaik lahir dari kesederhanaan.
                  Saya fokus membangun antarmuka yang rapi, responsif, dan
                  nyaman digunakan — tanpa ornamen yang tidak perlu.
                </p>
                <p>
                  Keseharian saya berputar di sekitar JavaScript dan React:
                  merancang komponen, menata tipografi, mengoptimalkan performa,
                  dan memastikan setiap detail animasi punya tujuan. Bagi saya,
                  <strong>
                    {" "}
                    kode yang baik itu terasa seperti desain yang baik
                  </strong>{" "}
                  — tenang, jelas, dan konsisten.
                </p>
                <p>
                  Di luar coding, saya senang mengeksplorasi tipografi, film
                  analog, dan berkendi-kendi di kota sambil memotret
                  arsitektur.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="about__stats">
                {STATS.map((st) => (
                  <div className="about__stat" key={st.s}>
                    <b>{st.b}</b>
                    <span>{st.s}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
