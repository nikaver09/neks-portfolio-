import { useEffect, useRef } from "react";
import { ArrowDownRight, Terminal, Link, Globe, GraduationCap } from "lucide-react";

const socials = [
  { icon: Terminal, href: "https://github.com/nikaver09", label: "GitHub" },
  { icon: Link, href: "https://www.linkedin.com/in/nkewi-undefined-1096ba413/", label: "LinkedIn" },
  { icon: Globe, href: "https://www.facebook.com/neysoo900/", label: "Twitter" },
];

export default function Hero({ onNavigateToTour }) {
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
      {/* Custom Cursor Spotlight */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed w-[400px] h-[400px] rounded-full opacity-10 transition-transform duration-700 ease-out"
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
      
      {/* Background Abstract Rings */}
      <div className="absolute top-32 right-12 w-72 h-72 border border-muted/20 rounded-full animate-spin-slow opacity-30" />
      <div className="absolute top-48 right-24 w-44 h-44 border border-accent/20 rounded-full animate-spin-slow opacity-40" style={{ animationDirection: "reverse", animationDuration: "12s" }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-16 w-full z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-card border border-muted/40 rounded-full px-4 py-2 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-xs text-ghost uppercase tracking-widest">Available for work</span>
            </div>

            <div className="space-y-2 animate-fade-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
              <p className="font-heading font-medium text-ghost tracking-[0.3em] uppercase text-sm">Full-Stack Developer</p>
              <h1 className="font-display text-[clamp(4rem,12vw,9rem)] leading-none tracking-wider">
                <span className="text-gradient">NICOS.  AVERGONZADO</span>
              </h1>
              <h2 className="font-heading font-semibold text-2xl lg:text-3xl text-snow/80 leading-snug">
                I craft digital experiences<br />that <span className="text-accent">actually work.</span>
              </h2>
            </div>

            {/* CTA Button Group Container */}
            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.3s", opacity: 0 }}>
              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="group flex items-center gap-2 bg-accent text-ink font-heading font-bold px-8 py-4 rounded-full hover:bg-white transition-all duration-200 uppercase tracking-wider text-sm"
              >
                View Work
                <ArrowDownRight size={18} className="group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
              </button>

              {/* Educational Tour Button linked to callback state hook */}
              <button
                onClick={onNavigateToTour}
                className="flex items-center gap-2 border border-muted/50 text-snow font-heading font-medium px-8 py-4 rounded-full hover:border-accent hover:text-accent transition-all duration-200 uppercase tracking-wider text-sm"
              >
                <GraduationCap size={18} />
                Educational Tour
              </button>

              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2 border border-muted/50 text-snow font-heading font-medium px-8 py-4 rounded-full hover:border-accent hover:text-accent transition-all duration-200 uppercase tracking-wider text-sm"
              >
                Get in touch
              </button>
            </div>

            <div className="flex items-center gap-4 animate-fade-up" style={{ animationDelay: "0.4s", opacity: 0 }}>
              <span className="font-mono text-xs text-ghost uppercase tracking-widest">Follow</span>
              <div className="w-8 h-px bg-muted" />
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-10 h-10 border border-muted/40 rounded-full flex items-center justify-center text-ghost hover:text-accent hover:border-accent transition-all duration-200 hover:scale-110">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Image Card */}
          <div className="flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: "0.5s", opacity: 0 }}>
            <div className="relative">
              <div className="relative w-72 h-72 lg:w-96 lg:h-96">
                <div className="relative w-full h-full rounded-3xl bg-card border border-muted/30 overflow-hidden glow group">
                  <img 
                    src="/images2/profs1.jpg" 
                    alt="Developer Portrait" 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-ink/80 via-transparent to-ink/60 pointer-events-none"></div>
                </div>

                <div className="absolute -bottom-4 -left-6 bg-accent text-ink px-5 py-3 rounded-2xl shadow-xl animate-float">
                  <p className="font-display text-3xl leading-none">3+</p>
                  <p className="font-body text-xs font-semibold uppercase tracking-wider">Years exp.</p>
                </div>

                <div className="absolute inset-0 rounded-3xl border-2 border-accent/10 scale-105 pointer-events-none" />
              </div>
            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="mt-20 flex items-center gap-4 animate-fade-in" style={{ animationDelay: "0.8s", opacity: 0 }}>
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