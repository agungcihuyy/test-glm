# AP — Portofolio Agung Pandu

Website portofolio personal untuk **Agung Pandu** — Fullstack Developer & UI Engineer.
Dibangun dengan **React + Vite**, desain minimalis bertema **hitam / putih / krem**, lengkap dengan animasi loading, mode gelap–terang dengan transisi *glitch*, dan **kartu lanyard 3D interaktif** ala [ReactBits Lanyard](https://reactbits.dev/) (yang juga dipakai di [alfari.my.id](https://www.alfari.my.id/)).

---

## ✨ Fitur

### Pengalaman & Animasi
- **Preloader** — logo "AP" dengan efek glitch + loading bar persentase
- **Judul hero animasi** — teks *scramble/glitch* dengan **auto-fit** (ukuran font dihitung via JS agar "AGUNG PANDU" / "DEVELOPER" selalu pas satu layar, tidak pernah terpotong)
- **Marquee** berjalan yang aman dari tumpang tindih tombol
- **Parallax** ringan pada konten hero
- **Mode gelap / terang** — toggle di navbar dengan **transisi glitch layar penuh** setiap pergantian tema (bunyi saat tema baru siap, transisinya dibungkus class `.theme-switching` agar tidak flicker)
- **Indikator posisi section** — scroll progress bar di atas, dot-nav di sisi kanan, dan *scroll-spy* pada link navbar

### Lanyard 3D (signature interaction)
Kartu ID 3D di sisi kanan hero yang diimplementasikan seperti komponen Lanyard ReactBits — vanilla Three.js **tanpa** library fisika eksternal:
- Simulasi **tali elastis kustom** (4 joint + iterative solver, substep hingga 960 Hz) plus **kartu rigid-body** dengan inersia, drag udara, dan damping
- Kartu glossy (`MeshPhysicalMaterial` + clearcoat + grain), lengkap dengan cincin & klem logam *silver*, slot lubang di atas kartu
- **Tali berdesain** — strip penuh dengan normal-map anyaman (weave) + jahitan tepi, mengikuti lengkung fisika 72 sampel
- **Seret** kartunya (grab & pin), **lepas** akan berayun kembali, **ketuk cepat** untuk membalik 360°
- **Breeze** halus membuat tali bergoyang sendiri; *intro* masuk dari samping
- Wajah kartu dirender ke canvas: foto (opsional), nama, peran, barcode — **otomatis repaint mengikuti tema**
- Nge-*pause* otomatis saat keluar viewport / tab tidak aktif (hemat baterai)

### Konten
- Hero, Tentang, Keahlian, Proyek (4 mockup), Pengalaman, **Playlist Spotify** (embed bergaya mengikuti tema), & Kontak dengan ikon merek SVG (GitHub, LinkedIn, Instagram, Dribbble)
- Footer + navigasi lengkap

---

## 🛠️ Teknologi

| Teknologi | Peran |
|---|---|
| [React 18](https://react.dev/) | UI & state |
| [Vite 5](https://vitejs.dev/) | Dev server & bundler |
| [Three.js r160](https://threejs.org/) | Lanyard 3D + lingkungan PMREM |
| CSS murni | Tema, animasi, tata letak (tanpa Tailwind) |
| Font | [Syne](https://fonts.google.com/specimen/Syne) · [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) · [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) |

> Bundle utama ±167 KB, chunk lanyard ±511 KB (**lazy-loaded** — hanya dimuat saat dibutuhkan), gzip total ±192 KB.

---

## 🚦 Menjalankan Proyek

```bash
# 1. install dependensi
npm install

# 2. mode pengembangan (http://localhost:5173)
npm run dev

# 3. build produksi
npm run build

# 4. pratinjau hasil build
npm run preview
```

---

## 📁 Struktur

```
portoAI2/
├── public/
│   └── images/
│       ├── portrait.svg      # fallback avatar (ganti dengan portrait.jpg milikmu)
│       └── project-1..4.svg  # gambar mockup proyek
├── src/
│   ├── components/
│   │   ├── Badge3D.jsx        # Lanyard 3D (fisika custom, vanilla three.js)
│   │   ├── Preloader.jsx      # layar loading AP + persentase
│   │   ├── GlitchOverlay.jsx  # overlay glitch saat ganti tema
│   │   ├── Navbar.jsx         # navbar + scroll-spy active link
│   │   ├── Hero.jsx           # judul auto-fit + glitch + lazy lanyard
│   │   ├── Marquee.jsx        # teks berjalan
│   │   ├── About.jsx / Skills.jsx
│   │   ├── Projects.jsx / Experience.jsx
│   │   ├── Playlist.jsx        # sengatan playlist Spotify (embed + tema ikut)
│   │   ├── Contact.jsx
│   │   ├── SocialIcons.jsx / Reveal.jsx
│   │   ├── SectionIndicator.jsx # progress bar + dot nav
│   │   └── Footer.jsx
│   ├── context/
│   │   └── ThemeContext.jsx   # state tema + flag switching (untuk glitch overlay)
│   ├── hooks/
│   │   ├── useScramble.js     # efek teks scramble
│   │   ├── useInView.js       # animasi masuk saat terlihat
│   │   └── useActiveSection.js# scroll-spy
│   ├── App.jsx                # komposisi + gate preloader
│   └── index.css              # seluruh style, tema, & animasi
└── .gitignore
```

---

## 🎨 Kustomisasi Cepat

### Foto pas
Jatuhkan foto pas-mu ke:

```
public/images/portrait.jpg
```

Foto ini otomatis dipakai oleh wajah kartu lanyard & section Tentang. Kalau tidak ada, sistem memakai fallback `portrait.svg`.

### Isi konten
Data teks (proyek, pengalaman, testimoni, kontak, media sosial) ada sebagai placeholder di masing-masing file `src/components/*.jsx` — cukup sunting array/string-nya.

### Palet warna
Tema dikelola lewat atribut `data-theme` pada `<html>` (lihat `src/context/ThemeContext.jsx`). Blok CSS variabel di awal `src/index.css`:

```css
:root[data-theme="light"] { --bg: ...; --ink: ...; }
:root[data-theme="dark"]  { --bg: ...; --ink: ...; }
```

Palet kartu/tali lanyard diatur di `PALETTES` pada `src/components/Badge3D.jsx`.

### Rasa fisika lanyard
Tuning di `settingsRef.current` (`Badge3D.jsx`) atau langsung di fungsi `physics()`:

- `elasticity` (0–1) — kekakuan tali
- `damping` (0–1) — seberapa cepat gerakan tenang
- `breeze` (0–1) — kekuatan angin idle
- `gravity` (0–3) — berat ayunan
- `strapLength` — jarak gantung kartu ke bawah
- `size` — skala kartu dalam area pandang
- `strapWidth` — lebar tali
- `metal` — `silver` / `gold` / `graphite`

---

## 📝 Catatan

- Font & warna mengikuti misi **monokrom + krem** — sengaja tidak ada aksen warna pelangi agar desain tetap *muted*.
- Komponen `Badge3D.jsx` berbeda dari implementasi umum ReactBits di hal foto wajah kartu yang digambar-kan lewat canvas & terhubung tema global (bukan properti `frontImage`).

## 🪪 Lisensi

MIT © 2026 Agung Pandu
