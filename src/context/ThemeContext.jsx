import { createContext, useContext, useEffect, useRef, useState } from "react";

const ThemeContext = createContext(null);
const STORAGE_KEY = "agung-pandu-theme";

/* baca preferensi tersimpan sekali saat provider dipasang.
   try/catch menjaga situs tetap jalan bila localStorage diblokir */
function getSavedTheme() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    /* localStorage tidak tersedia → pakai default gelap */
  }
  return "dark";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getSavedTheme);
  const [switching, setSwitching] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* penyimpanan penuh / diblokir — tema tetap berlaku di sesi ini */
    }
  }, [theme]);

  const toggleTheme = () => {
    if (switching) return;
    setSwitching(true);
    // beri kelas "theme-switching" agar transisi warna biasa mati
    document.documentElement.classList.add("theme-switching");

    setTheme((t) => (t === "dark" ? "light" : "dark"));

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setSwitching(false);
      document.documentElement.classList.remove("theme-switching");
    }, 620);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, switching }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
