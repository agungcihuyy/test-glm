import { useEffect, useState } from "react";

const ids = ["beranda", "tentang", "keahlian", "proyek", "pengalaman", "kontak"];

/** Mendeteksi section yang sedang berada di layar (scroll-spy) */
export function useActiveSection() {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    let raf = null;
    const handler = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const mid = window.scrollY + window.innerHeight * 0.4;
        let current = ids[0];
        for (const id of ids) {
          const el = document.getElementById(id);
          if (el && el.offsetTop <= mid) current = id;
        }
        // di dasar halaman → section terakhir
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
          current = ids[ids.length - 1];
        }
        setActive(current);
      });
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, []);

  return active;
}
