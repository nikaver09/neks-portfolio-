import { useEffect, useRef } from "react";
import { ArrowDownRight, Terminal, Link, Globe, GraduationCap, Award } from "lucide-react";
import { motion } from "framer-motion";

const socials = [
  { icon: Terminal, href: "https://github.com/nikaver09", label: "GitHub" },
  { icon: Link, href: "https://www.linkedin.com/in/nkewi-undefined-1096ba413/", label: "LinkedIn" },
  { icon: Globe, href: "https://www.facebook.com/neysoo900/", label: "Twitter" },
];

const image = "/images2/neku.jfif";

export default function Hero({ onNavigateToTour, onNavigateToCertificates }) {
  const cursorRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" id="hero">
      {/* Custom Cursor Spotlight — hidden on touch devices */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed w-[400px] h-[400px] rounded-full opacity-10 transition-transform duration-700 ease-out hidden md:block"
        style={{ background: "radial-gradient(circle, #D1D5D0 0%, transparent 70%)", zIndex: 0 }}
      />

      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "linear-gradient(#D1D5D0 1px, transparent 1px), linear-gradient(90deg, #D1D5D0 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Background Abstract Rings — hidden on small screens to avoid overflow */}
      <div className="absolute top-32 right-12 w-72 h-72 border border-muted/20 rounded-full animate-spin-slow opacity-30 hidden sm:block" />
      <div className="absolute top-48 right-24 w-44 h-44 border border-accent/20 rounded-full animate-spin-slow opacity-40 hidden sm:block" style={{ animationDirection: "reverse", animationDuration: "12s" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 w-full z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">

          {/* Left Column: Text & CTAs */}
          <div className="space-y-6 sm:space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">

            {/* Status badge */}
            <div className="inline-flex items-center gap-2 bg-card border border-muted/40 rounded-full px-4 py-2 animate-fade-in w-fit">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-xs text-ghost uppercase tracking-widest">Available for work</span>
            </div>

            {/* Name & Tagline */}
            <div className="space-y-3 animate-fade-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
              <h1
                className="font-display leading-[1.05] tracking-tight"
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(2.4rem, 10vw, 6rem)",
                }}
              >
                <span className="text-gradient block">NICOS</span>
                <span className="text-gradient block ml-2 sm:ml-6 lg:ml-10">AVERGONZADO</span>
              </h1>
              <h2 className="font-heading font-semibold text-lg sm:text-xl lg:text-3xl text-snow/80 leading-snug">
                I craft digital experiences<br className="hidden xs:block" /> that{" "}
                <span className="text-accent">actually work.</span>
              </h2>
            </div>

            {/* CTA Buttons */}
            <div
              className="flex flex-wrap justify-center lg:justify-start gap-3 animate-fade-up w-full"
              style={{ animationDelay: "0.3s", opacity: 0 }}
            >
              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="group flex items-center gap-2 bg-accent text-ink font-heading font-bold px-6 py-3 sm:px-8 sm:py-4 rounded-full hover:bg-white transition-all duration-200 uppercase tracking-wider text-xs sm:text-sm"
              >
                View Work
                <ArrowDownRight size={16} className="group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
              </button>

              <button
                onClick={onNavigateToTour}
                className="flex items-center gap-2 border border-muted/50 text-snow font-heading font-medium px-5 py-3 sm:px-8 sm:py-4 rounded-full hover:border-accent hover:text-accent transition-all duration-200 uppercase tracking-wider text-xs sm:text-sm"
              >
                <GraduationCap size={16} />
                <span className="hidden xs:inline">Educational Tour</span>
                <span className="xs:hidden">Edu Tour</span>
              </button>

              <button
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2 border border-muted/50 text-snow font-heading font-medium px-5 py-3 sm:px-8 sm:py-4 rounded-full hover:border-accent hover:text-accent transition-all duration-200 uppercase tracking-wider text-xs sm:text-sm"
              >
                About Me
              </button>

              <button
                onClick={onNavigateToCertificates}
                className="flex items-center gap-2 border border-muted/50 text-snow font-heading font-medium px-5 py-3 sm:px-8 sm:py-4 rounded-full hover:border-accent hover:text-accent transition-all duration-200 uppercase tracking-wider text-xs sm:text-sm"
              >
                <Award size={16} />
                Certificates
              </button>
            </div>

            {/* Social Links */}
            <div
              className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 animate-fade-up"
              style={{ animationDelay: "0.4s", opacity: 0 }}
            >
              <span className="font-mono text-xs text-ghost uppercase tracking-widest">Follow</span>
              <div className="w-6 sm:w-8 h-px bg-muted" />
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 sm:w-10 sm:h-10 border border-muted/40 rounded-full flex items-center justify-center text-ghost hover:text-accent hover:border-accent transition-all duration-200 hover:scale-110"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Image Card */}
          <div
            className="flex justify-center lg:justify-end animate-fade-in order-1 lg:order-2"
            style={{ animationDelay: "0.5s", opacity: 0 }}
          >
            <div className="relative">
              {/* Spinning gradient ring */}
              <div
                className="absolute -inset-3 rounded-2xl animate-spin-slow"
                style={{ background: "conic-gradient(from 0deg, transparent 60%, #D1D5D0 80%, transparent 100%)", opacity: 0.4 }}
              />
              {/* Static accent ring */}
              <div className="absolute -inset-1.5 rounded-2xl border border-accent/30" />

              {/* Responsive image container: small on mobile, large on desktop */}
              <div className="relative w-56 h-56 xs:w-64 xs:h-64 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px]">
                <div className="relative w-full h-full rounded-2xl bg-card border-4 border-muted/60 overflow-hidden glow group flex items-center justify-center shadow-2xl">
                  <motion.img
                    src={image}
                    alt="Developer Portrait"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                </div>
                <div className="absolute inset-0 rounded-2xl border-2 border-accent/10 scale-105 pointer-events-none" />
              </div>
            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div
          className="mt-12 sm:mt-20 flex items-center justify-center lg:justify-start gap-4 animate-fade-in"
          style={{ animationDelay: "0.8s", opacity: 0 }}
        >
          <div className="flex flex-col items-center gap-1">
            <div className="w-px h-8 bg-gradient-to-b from-accent to-transparent" />
            <div className="w-px h-8 animate-bounce" style={{ background: "linear-gradient(to bottom, transparent, #D1D5D0, transparent)" }} />
          </div>
          <span className="font-mono text-xs text-ghost uppercase tracking-[0.3em]">Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}