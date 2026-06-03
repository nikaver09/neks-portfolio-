import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

// Added "Educational Tour" to the links array
const links = ["About", "Skills", "Projects", "Experience", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    // Formats the string to a valid HTML ID (e.g., "Educational Tour" becomes "educational-tour")
    const targetId = id.toLowerCase().replace(/\s+/g, '-');
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-ink/90 backdrop-blur-xl border-b border-muted/30" : ""}`}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between h-24">
        
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="font-display text-3xl font-bold text-accent tracking-widest hover:scale-105 transition-transform">
          nic.dev
        </button>
        
        <ul className="hidden md:flex gap-10 font-heading font-medium text-sm tracking-wide">
          {links.map((l) => (
            <li key={l}>
              <button onClick={() => scrollTo(l)} className="text-ghost hover:text-white transition-colors duration-200 relative group">
                {l}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
              </button>
            </li>
          ))}
        </ul>

        <a href="mailto:hello@neks.dev" className="hidden md:flex items-center gap-2 bg-accent text-ink font-heading font-bold text-sm px-7 py-3 rounded-full hover:bg-white transition-colors duration-200 uppercase tracking-widest">
          HIRE ME
        </a>
        
        <button className="md:hidden text-snow" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${open ? "max-h-[400px] border-b border-muted/30 bg-surface/95 backdrop-blur-xl" : "max-h-0"}`}>
        <ul className="flex flex-col px-6 py-8 gap-6 items-center">
          {links.map((l) => (
            <li key={l}>
              <button onClick={() => scrollTo(l)} className="font-heading font-semibold text-lg text-ghost hover:text-accent transition-colors tracking-widest">
                {l}
              </button>
            </li>
          ))}
          <li>
            <a href="mailto:hello@neks.dev" className="inline-block bg-accent text-ink font-heading font-bold text-sm px-8 py-3 mt-2 rounded-full uppercase tracking-widest">
              HIRE ME
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}