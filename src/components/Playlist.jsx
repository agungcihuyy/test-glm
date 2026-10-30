import Reveal from "./Reveal.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

const PLAYLIST_URL =
  "https://open.spotify.com/playlist/0EwzZUUpmX29j1zlBDQziO?si=0439f7b4b98b4c70";
const PLAYLIST_ID = "0EwzZUUpmX29j1zlBDQziO";

export default function Playlist() {
  const { theme } = useTheme();
  const embedSrc = `https://open.spotify.com/embed/playlist/${PLAYLIST_ID}?utm_source=generator&theme=${
    theme === "dark" ? 1 : 0
  }`;

  return (
    <section id="playlist" className="section">
      <div className="container">
        <Reveal>
          <div className="section__head">
            <span className="section__num">05</span>
            <h2 className="section__title">Playlist Spotify</h2>
          </div>
        </Reveal>

        <div className="spotify__grid">
          <Reveal>
            <div className="spotify__intro">
              <p className="spotify__lead">
                Musik menemani hampir semua sesi ngoding — dari refactor di
                tengah malam sampai merapikan halaman ini. Playlist berikut
                adalah campuran yang kuputar; setengah fokus, setengah rejeh.
                Kalau kamu penasaran suasana di balik kode, tinggal tekan play.
              </p>
              <a
                className="spotify__link"
                href={PLAYLIST_URL}
                target="_blank"
                rel="noreferrer"
              >
                ▶ Buka di Spotify ↗
              </a>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="spotify-card">
              <iframe
                key={theme}
                title="Playlist Spotify — Agung Pandu"
                src={embedSrc}
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
