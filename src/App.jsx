import { useEffect, useState, useCallback } from "react";
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
import ProjectDetail from "./components/ProjectDetail.jsx";
import { PROJECTS } from "./data/projects.js";

function Layout() {
  const { switching } = useTheme();
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isGlitching, setIsGlitching] = useState(false);

  // Inisialisasi dari URL query param saat pertama kali dibuka
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get("project");
    if (projectId) {
      const match = PROJECTS.find((p) => p.id === projectId);
      if (match) setSelectedProject(match);
    }
  }, []);

  // Tangani navigasi tombol Back / Forward browser dengan micro-glitch halus
  useEffect(() => {
    const onPopState = () => {
      const params = new URLSearchParams(window.location.search);
      const projectId = params.get("project");
        setIsGlitching(true);

      setTimeout(() => {
        if (projectId) {
          const match = PROJECTS.find((p) => p.id === projectId);
          setSelectedProject(match || null);
        } else {
          setSelectedProject(null);
        }
        window.scrollTo({ top: 0, behavior: "instant" });
      }, 170);

      setTimeout(() => {
        setIsGlitching(false);
      }, 340);
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Kunci scroll saat preloader tampil
  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    if (!loading && !selectedProject) window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading, selectedProject]);

  // Handler perpindahan ke halaman detail: glitch terasa tapi smooth
  const TRANSITION = 340; // sinkron dengan keyframes CSS glitch

  const handleSelectProject = useCallback((project) => {
    setIsGlitching(true);

    setTimeout(() => {
      setSelectedProject(project);
      window.history.pushState({ projectId: project.id }, "", `?project=${project.id}`);
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 170);

    setTimeout(() => {
      setIsGlitching(false);
    }, TRANSITION);
  }, []);

  // Handler kembali ke halaman awal: glitch terasa tapi smooth
  const handleBack = useCallback(() => {
    setIsGlitching(true);

    setTimeout(() => {
      setSelectedProject(null);
      window.history.pushState({}, "", window.location.pathname);
      // pendaratan di paling atas halaman awal: efek
      // [loading, selectedProject] men-scroll ke 0 saat state null
    }, 170);

    setTimeout(() => {
      setIsGlitching(false);
    }, TRANSITION);
  }, [TRANSITION]);

  return (
    <>
      <div className="grain" aria-hidden="true" />

      {/* Glitch overlay hanya untuk pergantian tema */}
      <GlitchOverlay active={switching} />

      {/* Garis scanline laser halus saat perpindahan halaman */}
      {isGlitching && <div className="page-glitch-line" aria-hidden="true" />}

      {loading && <Preloader onDone={() => setLoading(false)} />}

      <div
        className={`page-wrapper ${isGlitching ? "page--glitch" : "page--ready"}`}
      >
        {selectedProject ? (
          <ProjectDetail
            project={selectedProject}
            onBack={handleBack}
            onSelectProject={handleSelectProject}
          />
        ) : (
          <>
            <SectionIndicator />
            <Navbar />
            <main>
              <Hero ready={!loading} />
              <Marquee />
              <About />
              <Skills />
              <Projects onSelectProject={handleSelectProject} />
              <Experience />
              <Playlist />
              <Contact />
            </main>
          </>
        )}
      </div>
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
