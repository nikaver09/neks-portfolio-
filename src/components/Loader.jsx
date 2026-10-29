import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const mark = ["N", "K"];

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const startedAt = performance.now();
    const duration = 1450;
    let frameId;

    const update = (now) => {
      const elapsed = Math.min(1, (now - startedAt) / duration);
      const next = (1 - ((1 - elapsed) ** 3)) * 100;
      setProgress(next);

      if (next < 100) {
        frameId = requestAnimationFrame(update);
        return;
      }

      setLeaving(true);
      window.setTimeout(onComplete, 780);
    };

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [onComplete]);

  return (
    <div className={`site-loader ${leaving ? "site-loader--leaving" : ""}`} aria-label="Loading portfolio" aria-live="polite">
      <div className="site-loader__panel site-loader__panel--top" aria-hidden="true" />
      <div className="site-loader__panel site-loader__panel--bottom" aria-hidden="true" />
      <div className="site-loader__glow" aria-hidden="true" />
      <div className="site-loader__topline">
      </div>
      <motion.div
        className="site-loader__center"
        animate={leaving ? { opacity: 0, scale: 1.06, filter: "blur(12px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
      >
        <p className="site-loader__word" aria-label="NK">
          {mark.map((letter, index) => (
            <span className="site-loader__letter-wrap" key={letter}>
              <motion.span
                className="site-loader__letter"
                initial={{ y: "112%", rotate: 8 }}
                animate={{ y: 0, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.1 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {letter}
              </motion.span>
            </span>
          ))}
        </p>
        <div className="site-loader__progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
        <p className="site-loader__count">{String(Math.round(progress)).padStart(3, "0")}%</p>
      </motion.div>
    </div>
  );
}
