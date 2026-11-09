import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AbstractCubeIsometricLoader } from "./ui/abstract-cube-isometric-loader";

export default function Loader({ onComplete }) {
  const [leaving, setLeaving] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    let completionTimeout;
    const exitTimeout = window.setTimeout(() => {
      setLeaving(true);
      completionTimeout = window.setTimeout(() => onComplete?.(), 780);
    }, 1450);

    return () => {
      window.clearTimeout(exitTimeout);
      window.clearTimeout(completionTimeout);
    };
  }, [onComplete]);

  return (
    <div className={`site-loader ${leaving ? "site-loader--leaving" : ""}`} aria-label="Loading portfolio">
      <div className="site-loader__panel site-loader__panel--top" aria-hidden="true" />
      <div className="site-loader__panel site-loader__panel--bottom" aria-hidden="true" />
      <div className="site-loader__glow" aria-hidden="true" />
      <motion.div
        className="site-loader__center"
        animate={leaving ? { opacity: 0, scale: reducedMotion ? 1 : 1.06 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
      >
        <AbstractCubeIsometricLoader dotSize={6} gap={4} speed={1.2} />
      </motion.div>
    </div>
  );
}
