import { useState } from "react";
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
import EducationalTourPage from "./components/EducationalTourPage"; // Imported the new sub-page

export default function App() {
  // Track whether the user is viewing the main portfolio stack or the dedicated tour page
  const [currentPage, setCurrentPage] = useState("portfolio");

  // Multi-page navigation function that forces the browser window back to the top
  const handlePageChange = (pageName) => {
    setCurrentPage(pageName);
    window.scrollTo(0, 0);
  };

  return (
    <SmoothScroll>
      <div className="noise min-h-screen bg-neutral-950 text-white selection:bg-[#e8ff47] selection:text-black">
        {currentPage === "portfolio" ? (
          /* Render your standard single-page portfolio view layout */
          <>
            <Navbar />
            <Hero onNavigateToTour={() => handlePageChange("tour")} />
            <Ticker />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
            <Footer />
          </>
        ) : (
          /* Render the full-screen Educational Tour layout instead */
          <EducationalTourPage onBack={() => handlePageChange("portfolio")} />
        )}
      </div>
    </SmoothScroll>
  );
}