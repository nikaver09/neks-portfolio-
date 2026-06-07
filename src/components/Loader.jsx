import { useState, useEffect } from "react";

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("loading"); // loading -> reveal -> done

  // Simulate loading progress
  useEffect(() => {
    const duration = 2500; // total loading time in ms
    const interval = 20;   // refresh interval
    const step = 100 / (duration / interval);
    let current = 0;

    const timer = setInterval(() => {
      current += step + Math.random() * step * 0.3;
      if (current >= 100) {
        current = 100;
        clearInterval(timer);
        // Start reveal phase after a brief pause
        setTimeout(() => setPhase("reveal"), 600);
      }
      setProgress(Math.min(current, 100));
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // After reveal animation completes, notify parent
  useEffect(() => {
    if (phase === "reveal") {
      const timer = setTimeout(() => {
        setPhase("done");
        onComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  const displayProgress = Math.round(progress);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-ink transition-all duration-[1000ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        phase === "reveal" || phase === "done"
          ? "opacity-0 pointer-events-none scale-[1.05]"
          : "opacity-100"
      }`}
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#EDEFDF 1px, transparent 1px), linear-gradient(90deg, #EDEFDF 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Animated gradient orb */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.07] blur-[120px] animate-pulse"
        style={{
          background: "radial-gradient(circle, #212121, transparent 70%)",
          animationDuration: "3s",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-10">
        {/* Main centered content area */}
        <div className="text-center">
          <h1 
            className="font-display text-5xl md:text-7xl italic text-snow tracking-tighter"
            style={{
              animation: "loaderSlideUp 0.8s ease forwards",
              animationDelay: "0.2s",
              opacity: 0,
            }}
          >
            NIC.DEV
          </h1>
        </div>

        {/* Progress bar */}
        <div className="w-80 md:w-[450px] space-y-4">
          <div className="relative h-2 bg-muted/20 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 rounded-full transition-all duration-100 ease-out"
              style={{
                width: `${progress}%`,
                background:
                  "linear-gradient(90deg, #E6BEA5, #EDEFDF)",
              }}
            />
            {/* Glowing tip */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full blur-md transition-all duration-100"
              style={{
                left: `${progress}%`,
                background: "#EDEFDF",
                opacity: progress > 0 && progress < 100 ? 1 : 0,
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <span
              className="font-mono text-[10px] text-ghost/40 uppercase tracking-widest"
              style={{
                animation: "loaderSlideUp 0.5s ease forwards",
                animationDelay: "0.2s",
                opacity: 0,
              }}
            >
              System Initialization
            </span>
            <span
              className="font-mono text-sm text-accent tabular-nums font-bold"
              style={{
                animation: "loaderSlideUp 0.5s ease forwards",
                animationDelay: "0.2s",
                opacity: 0,
              }}
            >
              {displayProgress}%
            </span>
          </div>
        </div>

        {/* Decorative spinning ring */}
        <div
          className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] border border-muted/10 rounded-full animate-spin-slow pointer-events-none"
          style={{ animationDuration: "25s" }}
        />
        <div
          className="absolute w-[220px] h-[220px] md:w-[300px] md:h-[300px] border border-accent/5 rounded-full animate-spin-slow pointer-events-none"
          style={{ animationDuration: "18s", animationDirection: "reverse" }}
        />
      </div>

      {/* Corner marks */}
      <div className="absolute top-6 left-6 w-6 h-6 border-l border-t border-muted/20" />
      <div className="absolute top-6 right-6 w-6 h-6 border-r border-t border-muted/20" />
      <div className="absolute bottom-6 left-6 w-6 h-6 border-l border-b border-muted/20" />
      <div className="absolute bottom-6 right-6 w-6 h-6 border-r border-b border-muted/20" />

      {/* Bottom status line */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-accent/60 animate-pulse" />
        <span
          className="font-mono text-[10px] text-ghost/30 uppercase tracking-[0.3em]"
          style={{
            animation: "loaderSlideUp 0.5s ease forwards",
            animationDelay: "1.4s",
            opacity: 0,
          }}
        >
          Initializing
        </span>
      </div>
    </div>
  );
}
