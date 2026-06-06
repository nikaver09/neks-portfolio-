import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = ["About", "Skills", "Projects", "Experience", "Contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollTo = (id) => {
    const targetId = id.toLowerCase().replace(/\s+/g, '-');
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false); 
  };

  return (
    <>
      {/* --- Floating Menu Toggle Button (Standalone) --- */}
      <button 
        className="fixed top-8 left-8 z-50 text-snow hover:text-accent transition-colors" 
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={40} /> : <Menu size={40} />}
      </button>

      {/* --- Full-Screen Animated Overlay --- */}
      <div className={`nav-overlay ${open ? "active" : ""}`}>
        <ul className="flex flex-col items-center justify-center h-full gap-8">
          {links.map((l) => (
            <li key={l}>
              <button onClick={() => scrollTo(l)} 
                      className="font-display text-5xl md:text-7xl text-snow hover:text-accent transition-colors duration-300 tracking-widest">
                {l}
              </button>
            </li>
          ))}
          <li>
            <a href="mailto:hello@neks.dev" 
               className="inline-block border border-accent text-accent font-heading font-bold text-lg px-12 py-4 mt-8 rounded-full uppercase tracking-widest hover:bg-accent hover:text-ink transition-all">
              HIRE ME
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}