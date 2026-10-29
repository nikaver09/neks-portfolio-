import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
];

export default function Navbar({ onNavigateToCertificates }) {
  const [open, setOpen] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const scrollTo = useCallback((id) => {
    setOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 200);
  }, []);

  return (
    <>
      {/* --- 3D Animated Hamburger Toggle Button (Top-Left) --- */}
      <motion.button
        type="button"
        initial={false}
        animate={open ? "open" : "closed"}
        whileHover="hover"
        whileTap={{ scale: 0.9, rotateX: 20 }}
        onClick={() => setOpen((prev) => !prev)}
        className="fixed top-8 left-8 z-[100] w-14 h-14 sm:w-16 sm:h-16 flex flex-col items-center justify-center bg-transparent rounded-2xl transition-all group overflow-hidden focus:outline-none"
        style={{ perspective: "1000px" }}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
      >
        {/* Subtle 3D Depth Layer */}
        <motion.div
          variants={{
            hover: { rotateY: 25, rotateX: -15, x: 5, y: -2 },
            closed: { rotateY: 0, rotateX: 0, x: 0, y: 0 },
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative flex flex-col items-center justify-center gap-1.5 pointer-events-none"
        >
          {/* Top Line */}
          <motion.span
            variants={{
              closed: { rotate: 0, y: 0 },
              open: { rotate: 45, y: 8 },
            }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-8 h-0.5 bg-black group-hover:opacity-60 block rounded-full transition-opacity"
          />
          {/* Middle Line */}
          <motion.span
            variants={{
              closed: { opacity: 1, scaleX: 1 },
              open: { opacity: 0, scaleX: 0 },
            }}
            transition={{ duration: 0.2 }}
            className="w-8 h-0.5 bg-black group-hover:opacity-60 block rounded-full transition-opacity"
          />
          {/* Bottom Line */}
          <motion.span
            variants={{
              closed: { rotate: 0, y: 0 },
              open: { rotate: -45, y: -8 },
            }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-8 h-0.5 bg-black group-hover:opacity-60 block rounded-full transition-opacity"
          />
        </motion.div>
      </motion.button>

      {/* --- Full-Screen Animated Navigation Overlay --- */}
      <div className={`nav-overlay ${open ? "active" : ""}`} aria-hidden={!open}>
        <div className="relative flex flex-col items-center justify-center min-h-screen px-6 py-20 sm:py-24">
          {/* Subtle Ambient Background Glows */}
          <div
            className="pointer-events-none absolute w-[400px] h-[400px] rounded-full opacity-10 blur-[100px]"
            style={{
              background: "radial-gradient(circle, rgba(0,0,0,0.15) 0%, transparent 70%)",
            }}
          />

          <ul className="relative z-10 flex flex-col items-center justify-center gap-3 sm:gap-4 md:gap-5 text-center my-auto">
            {links.map(({ label, id }, index) => (
              <motion.li
                key={id}
                initial={false}
                animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{
                  delay: open ? 0.08 + index * 0.05 : 0,
                  duration: 0.35,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <button
                  type="button"
                  onClick={() => scrollTo(id)}
                  className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase text-black hover:opacity-50 transition-all duration-200 tracking-wider hover:scale-105 transform inline-block focus:outline-none"
                >
                  {label}
                </button>
              </motion.li>
            ))}

            {onNavigateToCertificates && (
              <motion.li
                initial={false}
                animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{
                  delay: open ? 0.38 : 0,
                  duration: 0.35,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onNavigateToCertificates();
                  }}
                  className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase text-black hover:opacity-50 transition-all duration-200 tracking-wider hover:scale-105 transform inline-block focus:outline-none"
                >
                  Certificates
                </button>
              </motion.li>
            )}

            <motion.li
              initial={false}
              animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{
                delay: open ? 0.44 : 0,
                duration: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-3 sm:mt-4"
            >
              <button
                type="button"
                onClick={() => scrollTo("contact")}
                className="inline-block border-2 border-black text-black bg-white/70 font-heading font-bold text-xs sm:text-sm px-7 sm:px-9 py-2.5 sm:py-3 rounded-full uppercase tracking-widest hover:bg-black hover:text-[#EDEDED] transition-all duration-300 hover:scale-105 shadow-sm focus:outline-none"
              >
                HIRE ME
              </button>
            </motion.li>
          </ul>
        </div>
      </div>
    </>
  );
}
