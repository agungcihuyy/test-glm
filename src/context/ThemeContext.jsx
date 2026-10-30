import { createContext, useContext, useEffect, useRef, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  const [switching, setSwitching] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
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
