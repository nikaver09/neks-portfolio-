import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-all duration-[1000ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        phase === "reveal" || phase === "done"
          ? "opacity-0 pointer-events-none scale-[1.1]"
          : "opacity-100"
      }`}
    >
      {/* Main content */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="relative z-10 flex flex-col items-center gap-10 cursor-default group"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-heading font-bold text-6xl lg:text-5xl text-accent tracking-tighter uppercase transition-all duration-500 group-hover:tracking-widest"
        >
          NICDEV
        </motion.h1>

        {/* Progress bar */}
        <div className="w-80 md:w-[450px] space-y-4">
          <div className="relative h-1 bg-white/5 border border-accent/20 overflow-hidden group-hover:border-accent/40 transition-colors">
            <div
              className="absolute inset-y-0 left-0 transition-all duration-100 ease-out bg-accent shadow-[0_0_15px_rgba(161,161,161,0.5)] group-hover:shadow-[0_0_25px_rgba(161,161,161,0.8)]"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>
      </motion.div>    
    </div>
  );
}
