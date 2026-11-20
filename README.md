<div align="center">

# AP — Portofolio Agung Pandu

**Fullstack Developer & UI Engineer**

Portofolio personal dengan karakter hitam · putih · krem: tipografi tegas, animasi yang
tidak berlebihan, dan satu interaksi khas berupa **kartu lanyard 3D** di halaman utama.

[![React](https://img.shields.io/badge/React-18-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r160-000000?logo=threedotjs&logoColor=white)](https://threejs.org/)
[![CSS](https://img.shields.io/badge/CSS-Murni-663399?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

</div>

---

## Tentang proyek

Situs ini dibangun sebagai ruang pamer karya: profil singkat, keahlian, daftar proyek,
perjalanan pendidikan dan karier, playlist Spotify, serta halaman kontak. Setiap proyek
punya halaman detail sendiri dengan transisi glitch singkat saat berpindah.

Seluruh tampilan memakai palet monokrom yang sama di mode terang dan gelap. Pilihan mode
tersimpan di browser, sehingga tetap bertahan setelah halaman di-refresh.

---

## Sorotan

### Pengalaman halaman

- **Preloader persentase** — angka yang bertambah, garis progres tipis, dan keterangan
  "Memuat assets..." sebelum halaman dibuka.
- **Hero dengan kartu lanyard 3D** — kartu ID berbahan kaca menggantung dari tali,
  bisa diseret dan dilepas supaya berayun; ketuk cepat untuk membaliknya.
- **Glitch terukur** — pada judul, pergantian tema, dan transisi antarhalaman proyek.
  Efeknya sengaja dibuat singkat agar tidak mengganggu membaca.
- **Mode terang / gelap** — disimpan otomatis dan diterapkan sebelum halaman selesai
  dimuat agar tidak terjadi kedip saat refresh.
- **Navigasi responsif** — progress bar, indikator section, menu hamburger, dan
  pintasan scroll yang konsisten di semua ukuran layar.
- **Halaman detail proyek** — deskripsi, spesifikasi, tautan, dan navigasi ke proyek
  sebelumnya / berikutnya lewat `?project=<id>`.

### Lanyard 3D

Dibangun langsung dengan Three.js tanpa library fisika tambahan:

- Simulasi tali elastis 4 joint dengan solver iteratif, plus kartu *rigid-body*
  yang punya inersia dan redaman.
- Bahan kartu glossy dengan clearcoat; cincin, klem logam, dan lubang tali.
- Tali dengan tekstur anyaman dan jahitan tepi mengikuti kurva fisika.
- Wajah kartu digambar ke canvas — foto, nama, peran, barcode — dan digambar ulang
  otomatis mengikuti tema yang aktif.
- Berhenti merender saat kartu keluar dari layar, dan ukurannya disesuaikan di mobile.

### Konten

Hero · Tentang · Keahlian · Proyek · Journey (Pendidikan & Pengalaman) · Playlist
Spotify · Kontak. Gambar proyek dan aset lainnya sudah dioptimalkan untuk web.

---

## Teknologi

| Teknologi | Peran |
|---|---|
| [React 18](https://react.dev/) | UI dan state |
| [Vite 5](https://vitejs.dev/) | Dev server dan bundler |
| [Three.js](https://threejs.org/) | Lanyard 3D dan lingkungan pencahayaan |
| CSS murni | Tema, tata letak, dan animasi — tanpa framework CSS |
| [Syne](https://fonts.google.com/specimen/Syne) · [Space Grotesk](https://fonts.google.com/specimen/Space_Grotesk) · [JetBrains Mono](https://fonts.google.com/specimen/JetBrains_Mono) | Tipografi display, teks, dan kode |

Bundle utama sekitar 183 KB, dengan chunk lanyard sekitar 511 KB yang dimuat
malas hanya saat dibutuhkan.

---

## Menjalankan proyek

```bash
# pasang dependensi
npm install

# mode pengembangan → http://localhost:5173
npm run dev

# build produksi (keluaran di folder dist/)
npm run build

# pratinjau hasil build
npm run preview
```

Setelah mengubah logika canvas atau tema, lakukan *hard refresh* agar perubahan
benar-benar termuat.

---

## Struktur proyek

```
portfolio/
├── public/
│   ├── favicon.svg
│   └── images/                 # foto profil, gambar proyek, cover playlist
├── src/
│   ├── components/
│   │   ├── Badge3D.jsx          # lanyard 3D + fisika tali
│   │   ├── Preloader.jsx        # layar loading persentase
│   │   ├── GlitchOverlay.jsx    # overlay pergantian tema
│   │   ├── Navbar.jsx           # navbar, menu responsive, scroll-spy
│   │   ├── Hero.jsx             # judul hero + lanyard lazy-loaded
│   │   ├── Marquee.jsx
│   │   ├── About.jsx / Skills.jsx
│   │   ├── Projects.jsx / ProjectDetail.jsx
│   │   ├── Experience.jsx
│   │   ├── Playlist.jsx
│   │   ├── Contact.jsx
│   │   ├── SectionIndicator.jsx / SocialIcons.jsx / Reveal.jsx
│   ├── context/
│   │   └── ThemeContext.jsx     # tema + preferensi tersimpan
│   ├── data/
│   │   └── projects.js          # daftar proyek
│   ├── hooks/
│   │   ├── useScramble.js
│   │   ├── useInView.js
│   │   ├── useActiveSection.js
│   │   └── useGoToSection.js
│   ├── App.jsx                  # komposisi halaman + transisi proyek
│   └── index.css                # seluruh gaya, tema, dan animasi
├── PANDUAN.md                   # panduan mengganti konten
└── index.html
```

---

## Kustomisasi

### Foto profil

Letakkan foto di `public/images/portrait.jpg`. Foto itu dipakai baik oleh wajah kartu
lanyard maupun bagian Tentang; `portrait.svg` hanya dipakai sebagai cadangan.

### Isi dan data

Teks profil ada di masing-masing komponen `src/components/*.jsx`, sementara daftar
proyek ada di `src/data/projects.js`. Langkah lengkap penggantian konten ada di
[PANDUAN.md](PANDUAN.md).

### Warna

Variabel tema didefinisikan di bagian awal `src/index.css` melalui atribut
`data-theme` pada `<html>`:

```css
:root[data-theme="light"] { --bg: ...; --ink: ...; }
:root[data-theme="dark"]  { --bg: ...; --ink: ...; }
```

Warna kartu dan tali lanyard diatur terpisah lewat objek `PALETTES` di `Badge3D.jsx`.

### Perilaku lanyard

Tuning ada di `settingsRef.current` (`Badge3D.jsx`):

| Parameter | Fungsi |
|---|---|
| `elasticity` | kekakuan tali (0–1) |
| `damping` | kecepatan gerakan tenang (0–1) |
| `breeze` | kekuatan angin saat idle (0–1) |
| `gravity` | berat ayunan (0–3) |
| `strapLength` | jarak gantung kartu |
| `size` | skala kartu dalam area pandang |
| `strapWidth` | lebar tali |
| `metal` | `silver` / `gold` / `graphite` |

### Playlist Spotify

Ganti `PLAYLIST_ID` di `src/components/Playlist.jsx` dengan ID playlist yang diinginkan
— string setelah `/playlist/` pada URL Spotify.

---

## Deploy

<details>
<summary><b>GitHub Pages</b></summary>

1. Tambahkan `base: "/<nama-repo>/"` pada `vite.config.js`.
2. Jalankan `npm run build`, lalu unggah folder `dist/`, misalnya dengan `gh-pages`:

   ```bash
   npm install -D gh-pages
   npx gh-pages -d dist
   ```

3. Di GitHub, buka Settings → Pages dan pilih branch `gh-pages`.

</details>

<details>
<summary><b>Vercel / Netlify</b></summary>

1. Push repositori ke GitHub.
2. Impor repositori di dashboard Vercel atau Netlify.
3. Build command: `npm run build` · Output directory: `dist`.

</details>

---

## Catatan

- Palet sengaja dibatasi pada hitam, putih, dan krem agar fokus tetap pada konten.
- Tampilan widget Spotify diwarnai ulang lewat filter CSS pada `<iframe>`; embed
  lintas-domain tidak bisa diberi gaya langsung dari sisi situs.
- Preferensi tema disimpan di `localStorage` dengan kunci `agung-pandu-theme`.

---

## Lisensi

MIT © 2026 Agung Pandu
