# 👤 PANDUAN — untuk Pengguna (Agung Pandu)

Dokumen ini khusus **Anda** pemilik website. Bukan README publik (untuk pengunjung
GitHub, lihat [README.md](README.md)). Isinya: apa yang harus Anda ganti, cara
menjalankan, cara deploy, dan kunci-kunci penyetel halus.

---

## 📋 Daftar Isi

1. [Yang harus Anda ganti (checklist)](#1-yang-harus-anda-ganti-checklist)
2. [Menjalankan website](#2-menjalankan-website)
3. [Mengganti konten satu per satu](#3-mengganti-konten-satu-per-satu)
4. [Deploy ke internet](#4-deploy-ke-internet)
5. [Kunci penyetel halus](#5-kunci-penyetel-halus)
6. [Kalau terjadi masalah (troubleshooting)](#6-kalau-terjadi-masalah-troubleshooting)

---

## 1) Yang HARUS Anda Ganti (checklist)

Isi website saat ini **masih placeholder**. Berurutan dari yang paling penting:

| ✔ | Apa | Di file mana | Jangan lupa |
|---|-----|--------------|-------------|
| ☐ | **Foto profil** | taruh sebagai `public/images/portrait.jpg` | Nama file harus persis ini; wajah kartu lanyard & section About otomatis memakainya |
| ☐ | **Email** | `src/components/Contact.jsx` → `mailto:halo@agungpandu.id` | Ganti dengan email asli (muncul 2× di file itu) |
| ☐ | **Sosial media** | `src/components/Contact.jsx` → array `SOCIALS` | Ganti URL `github.com`/`linkedin.com`/dst. dengan profil asli |
| ☐ | **Data proyek** | `src/components/Projects.jsx` | 4 proyek: judul, deskripsi, teknologi, link demo/repo |
| ☐ | **Gambar proyek** | `public/images/project-1..4.svg` | Ganti screenshot proyek asli (jpg/png ok, ubah path di Projects.jsx) |
| ☐ | **Data pengalaman** | `src/components/Experience.jsx` | Riwayat kerja/organisasi |
| ☐ | **Tentang saya** | `src/components/About.jsx` + statistik | Paragraf perkenalan & angka (proyek, tahun, dst) |
| ☐ | **Keahlian** | `src/components/Skills.jsx` | Nama skill + tingkat (%) |
| ☐ | **Playlist Spotify** | `src/components/Playlist.jsx` → `PLAYLIST_ID` | ID playlist "Code" Anda: `0EwzZUUpmX29j1zlBDQziO` (sudah terpasang) |
| ☐ | **Cover playlist krem** | unggah `public/images/spotify-cover.png` sebagai cover playlist di Spotify (aplikasi desktop/web) | Opsional — membuat header widget bernada netral |

> ✅ Yang **sudah jadi memakai data asli**: playlist ID, favicon logo AP, favicon/theme-color, seluruh teks & animasi.

---

## 2) Menjalankan Website

```bash
npm install      # sekali saja di awal (atau setelah clone di komputer baru)
npm run dev      # → buka http://localhost:5173
```

**Di PowerShell komputer ini:** npm dipanggil sebagai `npm.cmd` — contoh:
`npm.cmd run dev`. Kalau pakai terminal lain (cmd/Git Bash), biasa `npm run dev`.

- **Hard refresh** (`Ctrl + Shift + R`) setelah mengubah canvas/kartu/iframe —
  konten semacam ini bisa di-cache browser.
- `npm run build` → hasil itu ada di folder `dist/` (itulah yang di-deploy).
- `npm run preview` → melihat hasil build secara lokal sebelum dipublikasikan.

---

## 3) Mengganti Konten Satu per Satu

### 📸 Foto profil
```
public/images/portrait.jpg   ← simpan foto di sini
```
Format apa pun yang rapi (persegi, mis. 800×800). Kalau tidak ada,
yang dipakai adalah `portrait.svg` (fallback abu-abu).

### ✉️ Email & sosial media
Buka `src/components/Contact.jsx`:

```jsx
<a href="mailto:halo@agungpandu.id">   ← ganti email yang 2× muncul

const SOCIALS = [
  { label: "GitHub", href: "https://github.com", Icon: GitHubIcon },
  ...
];                                       ← ganti tiap href dengan profil asli
```

### 💼 Proyek
Buka `src/components/Projects.jsx` — setiap proyek ada judul, deskripsi, tag
teknologi, dan link. Ganti 4 blok datanya. Untuk gambar: simpan screenshot ke
`public/images/`, lalu ubah path di data proyek.

### 🎵 Playlist Spotify
`src/components/Playlist.jsx` paling atas:

```jsx
const PLAYLIST_ID = "0EwzZUUpmX29j1zlBDQziO";
```
Ambil ID dari URL Spotify: `spotify.com/playlist/`**`<ID inilah>`**

**Bonus supaya header widget cocok bg website:** buka Spotify, Edit Detail
playlist → galeri → unggah `public/images/spotify-cover.png` sebagai cover
(oleh-oleh sudah disiapkan — kotak krem bermonogram AP). Setelah itu tampilan
player otomatis netral dan kecocokan warnanya jadi lebih bebas.

### ✏️ Teks & teks marquee
- Kalimat hero, taglist keahlian → `src/components/Hero.jsx`
- Teks berjalan `Agung Pandu · Web Developer ...` → `src/components/Marquee.jsx`
→ array `ITEMS`

---

## 4) Deploy ke Internet

### Pilihan A — GitHub Pages (gratis, cukup sekali set)
1. Di `vite.config.js` tambahkan `base: "/<nama-repo>/"`.
2. Jalankan perintah:

   ```bash
   npm install -D gh-pages
   npm run build
   npx gh-pages -d dist
   ```
3. Buka GitHub repo → **Settings → Pages** → pilih branch `gh-pages`.
4. Cukup ulangi langkah 2 setiap kali ingin memperbarui.

### Pilihan B — Vercel / Netlify (otomatis tiap commit)
1. Push repo ke GitHub.
2. Impor repo di dashboard mereka.
3. Build command `npm run build`, output `dist` → selesai.

---

## 5) Kunci Penyetel Halus

Semua angka ini di `src/index.css` kecuali disebut lain — **satu angka, efek
terfokus**:

| Mau mengatur apa? | Kunci |
|---|---|
| Kepekaan kecocokan warna widget Spotify | `.spotify-card::before` → `opacity: 0.78` (naik = lebih menyatu & pudar; turun = lebih kaya warna) |
| Tinggi kartu lanyard di HP/tablet | `@media (max-width: 1023.98px)` → `.lanyard` `height: clamp(440px, 58svh, 660px)` |
| Seberapa rendah kartu menggantung di responsive | `Badge3D.jsx` → `strapLength: compact ? 0.8 : 0.55` |
| Rasa fisika (elastis, damping, angin) | `Badge3D.jsx` → `settingsRef.current` (`elasticity`, `damping`, `breeze`, ... ) |
| Warna theme | awal `src/index.css` → blok `:root[data-theme]` |
| Warna kartu & tali lanyard | `Badge3D.jsx` → `PALETTES` (gelap & terang terpisah) |
| Jarak bawah footer di responsive | `@media (max-width: 860px)` → `.contact { padding-bottom: 1.25rem }` |

---

## 6) Kalau Terjadi Masalah (troubleshooting)

| Gejala | Penyebab umum & solusi |
|---|---|
| Developer server gagal jalan di PowerShell | Panggil sebagai `npm.cmd run dev` |
| Perubahan kartu/iframe "tidak terpakai" | Cache — **hard refresh** `Ctrl+Shift+R` alias abaikan cache |
| Kartu lanyard kosong / gelap | Foto `portrait.jpg` belum ada — fallback harusnya tampil; cek konsol browser (F12) |
| Widget Spotify terlalu pudar / masih warna asli | Setel `opacity` di `.spotify-card::before` (naik/turun 0.78-nya) |
| Anchor `#tentang` dll. tertutup navbar | Sudah dikunci `scroll-margin-top: 90px` — kalau enggan cocok, itu yang diatur |
| Build gagal `Some chunks are larger than 500 kB` | Bukan error — hanya catatan; chunk besar itu lanyard 3D yang di-*lazy-load* |

---

*Terakhir disesuaikan: Nov 2026 — struktur cocok dengan kode yang ada di repo.*
