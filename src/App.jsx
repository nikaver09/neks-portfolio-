import { useState, useCallback } from "react";
import SmoothScroll from "./components/SmoothScroll";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import EducationalTourPage from "./components/EducationalTourPage";
import CertificatesPage from "./components/CertificatesPage";
import Loader from "./components/Loader";

export default function App() {
  const [currentPage, setCurrentPage] = useState("portfolio");
  const [isLoading, setIsLoading] = useState(true);

  const handlePageChange = (pageName) => {
    setCurrentPage(pageName);
    window.scrollTo(0, 0);
  };

  const handleLoaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <SmoothScroll>
      {/* Loader overlay */}
      {isLoading && <Loader onComplete={handleLoaderComplete} />}

      <div className={`noise min-h-screen bg-neutral-950 text-white selection:bg-[#e8ff47] selection:text-black ${isLoading ? "overflow-hidden h-screen" : ""}`}>
        {currentPage === "portfolio" ? (
          <>
            <Navbar />
            <Hero 
              onNavigateToTour={() => handlePageChange("tour")} 
              onNavigateToCertificates={() => handlePageChange("certificates")}
            />
            <Ticker />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
            <Footer />
          </>
        ) : currentPage === "tour" ? (
          <EducationalTourPage onBack={() => handlePageChange("portfolio")} />
        ) : (
          <CertificatesPage onBack={() => handlePageChange("portfolio")} />
        )}
      </div>
    </SmoothScroll>
  );
}
