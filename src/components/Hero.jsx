import { ArrowDownRight, Award } from "lucide-react";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import WaveField from "./ui/WaveField";

function GithubIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function LinkedinIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const socials = [
  { href: "https://github.com/nikaver09", label: "GitHub", icon: GithubIcon },
  { href: "https://www.linkedin.com/in/nkewi-undefined-1096ba413/", label: "LinkedIn", icon: LinkedinIcon },
];

const image = "/images2/neku.jfif";

export default function Hero({ onNavigateToCertificates }) {
  const cursorRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
      }
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#EDEDED]" id="hero">
      {/* Animated Wave Field Background */}
      <WaveField className="z-0" />

      {/* Custom Cursor Spotlight */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed w-[400px] h-[400px] rounded-full opacity-10 transition-transform duration-700 ease-out z-[1] hero-cursor-glow"
      />

      {/* Background Abstract Rotating Rings */}
      <div className="absolute top-32 right-12 w-72 h-72 border border-black/10 rounded-full animate-spin-slow opacity-40 pointer-events-none" />
      <div
        className="absolute top-48 right-24 w-44 h-44 border border-black/15 rounded-full animate-spin-slow opacity-40 pointer-events-none"
        style={{ animationDirection: "reverse", animationDuration: "12s" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-16 w-full z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Column: Text & CTAs */}
          <div className="space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
            {/* Status Pill Badge with sci-fi tech branding and slashed zero */}
            <div className="inline-flex items-center gap-2.5 bg-white/80 backdrop-blur-md border border-black/15 rounded-full px-4 py-2 animate-fade-in w-fit shadow-sm">
              <span className="w-2 h-2 rounded-full bg-black animate-pulse shadow-[0_0_8px_rgba(0,0,0,0.3)]" />
              <span className="font-tech text-xs text-black tracking-[0.25em] font-light uppercase slashed-zeros">
                <span className="text-black font-semibold">SYS.01</span> // AVAILABLE FOR WORK
              </span>
            </div>

            {/* Display Titles: Ultra-thin geometric octagonal wireframe tech typography */}
            <div className="space-y-4 animate-fade-up">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-black/70 font-tech text-xs tracking-[0.3em] uppercase slashed-zeros">
                <span className="text-black font-semibold">SEC // 00</span>
                <span className="w-6 h-px bg-black/25" />
                <span className="text-black">INTERFACE & ARCHITECTURE</span>
              </div>

              <h1 className="font-tech text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4.25rem] 2xl:text-8xl leading-[1.02] tracking-[0.02em] sm:tracking-[0.04em] font-extralight uppercase select-none">
                <span className="wireframe-outline block hover:text-black hover:[-webkit-text-stroke-width:0px] transition-all duration-300 cursor-default">
                  NICOS
                </span>
                <span className="wireframe-outline-muted block ml-2 sm:ml-4 lg:ml-6 hover:text-black hover:[-webkit-text-stroke:1.35px_#000000] transition-all duration-300 cursor-default">
                  AVERGONZADO
                </span>
              </h1>

              <h2 className="font-tech font-extralight text-xl sm:text-2xl text-black tracking-[0.08em] uppercase leading-relaxed pt-2 max-w-xl">
                CRAFTING DIGITAL EXPERIENCES THAT{" "}
                <span className="font-normal text-black underline decoration-black/50 underline-offset-4">
                  ACTUALLY WORK
                </span>
                .
              </h2>
            </div>

            {/* CTA Button Group Container */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 animate-fade-up">
              <button
                type="button"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="group flex items-center gap-2 bg-white border-2 border-black text-black font-tech font-bold px-8 py-4 rounded-full hover:bg-black hover:text-[#EDEDED] hover:scale-105 transition-all duration-300 uppercase tracking-[0.16em] text-xs sm:text-sm shadow-sm"
              >
                <span>VIEW WORK</span>
                <ArrowDownRight size={18} className="group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2 border border-black/30 bg-white/70 backdrop-blur-sm text-black font-tech font-medium px-8 py-4 rounded-full hover:border-black hover:bg-white hover:scale-105 transition-all duration-300 uppercase tracking-[0.16em] text-xs sm:text-sm shadow-sm"
              >
                ABOUT ME
              </button>

              {onNavigateToCertificates && (
                <button
                  type="button"
                  onClick={onNavigateToCertificates}
                  className="flex items-center gap-2 border border-black/30 bg-white/70 backdrop-blur-sm text-black font-tech font-medium px-8 py-4 rounded-full hover:border-black hover:bg-white hover:scale-105 transition-all duration-300 uppercase tracking-[0.16em] text-xs sm:text-sm shadow-sm"
                >
                  <Award size={18} />
                  <span>CERTIFICATES</span>
                </button>
              )}
            </div>

            {/* Social Links Row */}
            <div className="flex items-center justify-center lg:justify-start gap-4 animate-fade-up pt-2">
              <span className="font-tech text-xs text-black uppercase tracking-[0.25em] font-medium">Follow</span>
              <div className="w-8 h-px bg-black/25" />
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 border border-black/25 rounded-full flex items-center justify-center text-black hover:border-black hover:bg-black/5 hover:scale-110 transition-all duration-200 bg-white/70 shadow-sm"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Framed Image Card */}
          <div className="flex justify-center lg:justify-end animate-fade-in order-1 lg:order-2">
            <div className="relative">
              {/* Spinning gradient ring */}
              <div
                className="absolute -inset-3 rounded-3xl animate-spin-slow pointer-events-none"
                style={{
                  background: "conic-gradient(from 0deg, transparent 60%, rgba(0,0,0,0.3) 80%, transparent 100%)",
                  opacity: 0.35,
                }}
              />
              {/* Static accent ring */}
              <div className="absolute -inset-1.5 rounded-3xl border border-black/20 pointer-events-none" />

              {/* Floating decorative ring like on nicavs.tech */}
              <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full border border-black/25 pointer-events-none flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-black/60" />
              </div>

              {/* Card Container */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[440px] lg:h-[440px]">
                <div className="relative w-full h-full rounded-3xl bg-white border-4 border-black/20 overflow-hidden glow group flex items-center justify-center shadow-2xl">
                  <motion.img
                    src={image}
                    alt="Nicos Avergonzado Portrait"
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-110 group-hover:scale-105 group-hover:filter-none transition-all duration-700 ease-out"
                  />
                  {/* Subtle inner gradient shadow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="absolute inset-0 rounded-3xl border-2 border-black/10 scale-105 pointer-events-none" />
              </div>
            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 sm:mt-20 flex items-center justify-center lg:justify-start gap-4 animate-fade-in">
          <div className="flex flex-col items-center gap-1">
            <div className="w-px h-8 bg-gradient-to-b from-black to-transparent" />
            <div
              className="w-px h-8 animate-bounce"
              style={{ background: "linear-gradient(to bottom, transparent, #000000, transparent)" }}
            />
          </div>
          <span className="font-tech text-xs text-black uppercase tracking-[0.3em] font-light slashed-zeros">
            SCROLL // 00 TO EXPLORE
          </span>
        </div>
      </div>
    </section>
  );
}
