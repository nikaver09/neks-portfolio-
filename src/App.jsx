import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import EducationalTour from "./components/EducationalTour";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="noise">
      <Navbar />
      <Hero />
      <Ticker />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <EducationalTour /> 
      <Contact />
      <Footer />
    </div>
  );
}