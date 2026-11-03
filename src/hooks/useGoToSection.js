/**
 * Navigasi pintasan yang deterministik.
 *
 * Anchor bawaan (#proyek dll.) bisa "stuck" di posisi sekarang apabila
 * scroll halaman sempat dikunci (tautan body dikunci overflow saat menu
 * mobile atau preloader aktif) — klik terasa macet di halaman awal.
 * Karena itu semua pintasan navbar / dot-nav mengambil alih scroll
 * lewat JS: hasilnya selalu mulus, apa pun keadaan halaman.
 */
export function goToSection(href) {
  /* buka kunci scroll segera jika ada yang masih terkunci */
  document.body.style.overflow = "";

  if (href === "#") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.replaceState(null, "", window.location.pathname);
    return;
  }

  const el = document.getElementById(href.slice(1));
  const nav = document.querySelector(".nav");
  const gap = nav ? nav.offsetHeight : 72;

  if (el) {
    window.scrollTo({
      top: Math.max(0, el.offsetTop - gap + 2),
      behavior: "smooth",
    });
  } else {
    /* target tidak ada (mis. #beranda) → pulang ke paling atas */
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  history.replaceState(null, "", href);
}
