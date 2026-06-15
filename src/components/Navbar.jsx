import { useState } from "react";
import { motion } from "framer-motion";

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
      {/* --- 3D Animated Toggle Button --- */}
      <motion.button 
        initial={false}
        animate={open ? "open" : "closed"}
        whileHover="hover"
        whileTap={{ scale: 0.9, rotateX: 20 }}
        onClick={() => setOpen(!open)}
        className="fixed top-8 left-8 z-[100] w-16 h-16 flex flex-col items-center justify-center bg-transparent rounded-2xl transition-all group overflow-hidden"
        style={{ perspective: "1000px" }}
      >
        {/* Subtle 3D Depth Layer */}
        <motion.div
          variants={{
            hover: { rotateY: 25, rotateX: -15, x: 5, y: -2 },
            closed: { rotateY: 0, rotateX: 0, x: 0, y: 0 }
          }}
          className="relative flex flex-col items-center justify-center gap-1.5 pointer-events-none"
        >
          {/* Top Line */}
          <motion.span 
            variants={{
              closed: { rotate: 0, y: 0 },
              open: { rotate: 45, y: 8 },
            }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-8 h-0.5 bg-snow group-hover:bg-accent block rounded-full"
          />
          {/* Middle Line */}
          <motion.span 
            variants={{
              closed: { opacity: 1, scaleX: 1 },
              open: { opacity: 0, scaleX: 0 },
            }}
            className="w-8 h-0.5 bg-snow group-hover:bg-accent block rounded-full"
          />
          {/* Bottom Line */}
          <motion.span 
            variants={{
              closed: { rotate: 0, y: 0 },
              open: { rotate: -45, y: -8 },
            }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-8 h-0.5 bg-snow group-hover:bg-accent block rounded-full"
          />
        </motion.div>
      </motion.button>

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