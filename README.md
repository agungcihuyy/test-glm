<div align="center">

# ⬛ AP — Portofolio Agung Pandu

**Fullstack Developer & UI Engineer**

Website portofolio personal bertema **hitam · putih · krem** — dengan preloader glitch,
mode gelap–terang beranimasi, dan **kartu lanyard 3D interaktif** berbasis fisika,
diadaptasi langsung dari komponen [ReactBits Lanyard](https://reactbits.dev/).

[![React](https://img.shields.io/badge/React-18-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r160-000000?logo=threedotjs&logoColor=white)](https://threejs.org/)
[![License](https://img.shields.io/badge/Lisensi-MIT-8B7355)](#-lisensi)

</div>

---

## 👀 Sekilas Tampilan

| Desktop | Mobile |
| :---: | :---: |
| <!-- TODO: simpan screenshot ke docs/screenshots/desktop.png lalu aktifkan baris di bawah --><!-- ![Desktop](docs/screenshots/desktop.png) --> | <!-- TODO: simpan screenshot ke docs/screenshots/mobile.png lalu aktifkan baris di bawah --><!-- ![Mobile](docs/screenshots/mobile.png) --> |

> 💡 Pemilik repositori: letakkan screenshot di `docs/screenshots/` dan hapus komentar `<-- -->`
> pada tabel di atas agar gambar terpasang di GitHub.

---

## ✨ Fitur

### 🎬 Pengalaman & Animasi
- **Preloader** — logo "AP" dengan efek glitch + loading bar berpersentase
- **Judul hero auto-fit** — teks scramble/glitch yang ukuran fontnya dihitung via JS,
  jadi "AGUNG PANDU" / "DEVELOPER" selalu pas satu layar, tidak pernah terpotong
- **Marquee** dua arah berlawanan, aman dari tumpang tindih tombol
- **Parallax** ringan pada konten hero di desktop
- **Mode gelap / terang** — toggle di navbar dengan **transisi glitch layar penuh**
  setiap pergantian tema
- **Scroll-spy lengkap** — progress bar di atas, dot-nav di sisi kanan (desktop),
  link strategis menjadi aktif, dan menu hamburger berisi semua section di responsive

### 🪪 Lanyard 3D (signature interaction)
Kartu ID 3D yang menggantung dari tali di hero — vanilla Three.js **tanpa** library
fisika eksternal:
- Simulasi **tali elastis kustom** (4 joint + iterative solver, substep hingga 960 Hz)
  plus **kartu rigid-body** dengan inersia, drag udara & damping
- Kartu *glossy* (`MeshPhysicalMaterial` + clearcoat + grain), cincin & klem logam,
  slot lubang di wajah kartu
- **Tali berdesain** — strip dengan normal-map anyaman + jahitan tepi, mengikuti
  kurva fisika 72 sampel
- **Seret** kartunya (grab & pin), **lepas** akan berayun balik, **ketuk cepat**
  untuk membalik 360°
- **Breeze** halus membuat tali bergoyang sendiri; *intro* masuk dari samping
- Wajah kartu dirender ke canvas (foto, nama, peran, barcode) dan
  **otomatis di-repaint mengikuti tema**
- Responsif: di ≤1023px kartu menggantung **di atas teks nama** dengan tali
  melekat dari puncak halaman — nge-*pause* otomatis saat keluar viewport

### 🧩 Konten
- Hero · Tentang · Keahlian · Proyek (4 mockup SVG) · Pengalaman ·
  **Playlist Spotify** (duotone mengikuti tema) · Kontak + sosial media
- Navbar responsif + panel menu hamburger, indikator section & progress bar

---

## 🛠️ Teknologi

| Teknologi | Peran |
|---|---|
| [React 18](https://react.dev/) | UI & state (tanpa UI framework) |
| [Vite 5](https://vitejs.dev/) | Dev server & bundler |
| [Three.js r160](https://threejs.org/) | Lanyard 3D + lingkungan PMREM |
| CSS murni | Tema, animasi, tata letak — tanpa Tailwind/Bootstrap |
| [Syne](https://fonts.google.com/specimen/Syne) · [Space Grotesk](https://fonts.google.com/specimen/Space_Grotesk) · [JetBrains Mono](https://fonts.google.com/specimen/JetBrains_Mono) | Tipografi display · teks · mono |

> ⚡ **Performa:** bundle utama ±167 KB, chunk lanyard ±511 KB — di-*lazy-load*
> hanya saat dibutuhkan. Total gzip ±192 KB.

---

## 🚦 Mulai Cepat

```bash
# 1) clone & masuk
git clone https://github.com/<username>/<repo>.git
cd <repo>

# 2) pasang dependensi
npm install

# 3) mode pengembangan → http://localhost:5173
npm run dev

# 4) build produksi (keluaran ke dist/)
npm run build

# 5) pratinjau hasil build
npm run preview
```

---

## 📁 Struktur Proyek

```
portoAI2/
├── public/
│   ├── favicon.svg              # logo AP (favicon + theme-color)
│   └── images/
│       ├── portrait.svg         # fallback avatar (letakkan portrait.jpg milikmu)
│       ├── project-1..4.svg     # mockup gambar proyek
│       └── spotify-cover.png    # cover krem untuk playlist Spotify
├── src/
│   ├── components/
│   │   ├── Badge3D.jsx          # Lanyard 3D (fisika custom, vanilla three.js)
│   │   ├── Preloader.jsx        # layar loading AP + persentase
│   │   ├── GlitchOverlay.jsx    # overlay glitch saat ganti tema
│   │   ├── Navbar.jsx           # navbar + scroll-spy + menu hamburger
│   │   ├── Hero.jsx             # judul auto-fit + glitch + lazy lanyard
│   │   ├── Marquee.jsx          # teks berjalan dua arah
│   │   ├── About.jsx / Skills.jsx
│   │   ├── Projects.jsx / Experience.jsx
│   │   ├── Playlist.jsx         # section embed playlist Spotify
│   │   ├── Contact.jsx          # kontak + bar footer (© + sosial media)
│   │   ├── SocialIcons.jsx / Reveal.jsx
│   │   └── SectionIndicator.jsx # progress bar + dot nav
│   ├── context/
│   │   └── ThemeContext.jsx     # state tema + flag switching (glitch overlay)
│   ├── hooks/
│   │   ├── useScramble.js       # efek teks scramble
│   │   ├── useInView.js         # animasi masuk saat terlihat
│   │   └── useActiveSection.js  # scroll-spy
│   ├── App.jsx                  # komposisi semua section + gate preloader
│   └── index.css                # seluruh style, tema, responsive & animasi
├── PANDUAN.md                   # 👤 panduan pemakaian & penggantian konten
└── .gitignore
```

---

## 🎨 Kustomisasi

### 📸 Foto profil
Letakkan foto di `public/images/portrait.jpg` — otomatis dipakai oleh wajah kartu
lanyard & section Tentang. Tanpa file itu, sistem memakai fallback `portrait.svg`.

### ✏️ Isi konten
Semua data (proyek, pengalaman, kontak, sosial media) adalah placeholder di
masing-masing `src/components/*.jsx` — cukup sunting array/string-nya.
**Panduan lengkap langkah-demi-langkah: lihat [PANDUAN.md](PANDUAN.md).**

### 🎨 Palet warna
Tema dikelola lewat atribut `data-theme` pada `<html>` (`ThemeContext.jsx`).
Sunting blok variabel di awal `src/index.css`:

```css
:root[data-theme="light"] { --bg: ...; --ink: ...; }
:root[data-theme="dark"]  { --bg: ...; --ink: ...; }
```

Palet kartu & tali lanyard ada di objek `PALETTES` pada `Badge3D.jsx`.

### 🪀 Rasa fisika lanyard
Tuning di `settingsRef.current` (`Badge3D.jsx`):

| Param | Fungsi |
|---|---|
| `elasticity` | kekakuan tali (0–1) |
| `damping` | seberapa cepat gerakan tenang (0–1) |
| `breeze` | kekuatan angin idle (0–1) |
| `gravity` | berat ayunan (0–3) |
| `strapLength` | jarak gantung kartu ke bawah |
| `size` | skala kartu dalam area pandang |
| `strapWidth` | lebar tali |
| `metal` | `silver` / `gold` / `graphite` |

### 🎵 Playlist Spotify
Ganti konstanta `PLAYLIST_ID` di `src/components/Playlist.jsx` dengan ID playlist
milikmu (string setelah `playlist/` pada URL Spotify).

---

## 🚀 Deploy

<details>
<summary><b>GitHub Pages</b> (klik untuk melangkah)</summary>

1. Pada `vite.config.js`, tambahkan `base: "/<nama-repo>/"`.
2. `npm run build`, lalu push folder `dist/` dengan package `gh-pages`

   ```bash
   npm install -D gh-pages
   npx gh-pages -d dist
   ```
3. Di GitHub → Settings → Pages → pilih branch `gh-pages`.
</details>

<details>
<summary><b>Vercel / Netlify</b></summary>

1. Push repo ke GitHub.
2. Impor repo di dashboard Vercel/Netlify.
3. Build command: `npm run build` · Output directory: `dist` — selesai, otomatis
   men-deploy tiap commit.
</details>

---

## 📝 Catatan

- Palet sengaja monokrom + krem — tanpa aksen warna agar desain tetap *muted*.
- Widget Spotify diefekkan lewat CSS filter + lapisan wash di elemen `<iframe>`
  (lintas-domain, tidak bisa distyle langsung dari sisi web).
- `Badge3D.jsx` membedakan diri dari ReactBits versi umum: wajah kartu digambar
  lewat canvas & terhubung tema global (bukan prop `frontImage`).

## 🪪 Lisensi

MIT © 2026 [Agung Pandu](#kontak)
