import { useEffect, useState } from "react";
import { ThemeProvider, useTheme } from "./context/ThemeContext.jsx";
import Preloader from "./components/Preloader.jsx";
import GlitchOverlay from "./components/GlitchOverlay.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Experience from "./components/Experience.jsx";
import Playlist from "./components/Playlist.jsx";
import Contact from "./components/Contact.jsx";
import SectionIndicator from "./components/SectionIndicator.jsx";

function Layout() {
  const { switching } = useTheme();
  const [loading, setLoading] = useState(true);

  // kunci scroll saat preloader tampil
  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    if (!loading) window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <GlitchOverlay active={switching} />
      <SectionIndicator />
      {loading && <Preloader onDone={() => setLoading(false)} />}
      <Navbar />
      <main>
        <Hero ready={!loading} />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Playlist />
        <Contact />
      </main>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Layout />
    </ThemeProvider>
  );
}
