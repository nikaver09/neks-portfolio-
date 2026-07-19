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
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-all duration-[1000ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${phase === "reveal" || phase === "done"
          ? "opacity-0 pointer-events-none scale-[1.1]"
          : "opacity-100"
        }`}
    >
      <style>{`
        .perspective-container {
          perspective: 1000px;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 250px;
          width: 100%;
        }

        .base {
          --box-width: 50px;
          --box-height: 50px;
          --box-depth: 100px;
          width: 110px;
          height: 110px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          transform-style: preserve-3d;
          transform: rotateX(60deg) rotateZ(45deg) rotateY(0deg);
          animation: rotate 6s linear infinite;
        }

        .cube {
          position: relative;
          width: var(--box-width);
          height: var(--box-height);
          transform-style: preserve-3d;
          animation: grow 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite alternate-reverse;
        }

        .cube:nth-of-type(1) {
          animation-delay: 0s;
        }
        .cube:nth-of-type(2) {
          animation-delay: 0.2s;
        }
        .cube:nth-of-type(3) {
          animation-delay: 0.4s;
        }
        .cube:nth-of-type(4) {
          animation-delay: 0.6s;
        }

        .face {
          position: absolute;
          top: 0;
          left: 0;
          transform-style: preserve-3d;
        }

        .side-front,
        .side-back {
          width: var(--box-width);
          height: var(--box-height);
          background-color: #FFFEFD; /* snow */
        }

        .side-front {
          transform: translateZ(50px);
        }

        .side-back {
          transform: translateZ(-50px);
        }

        .side-left,
        .side-right {
          width: var(--box-depth);
          height: var(--box-height);
          background-color: #EDEFDF; /* accent */
          left: 50%;
          top: 50%;
        }

        .side-left {
          transform: translate(-50%, -50%) rotateY(-90deg) translateZ(25px);
        }

        .side-right {
          transform: translate(-50%, -50%) rotateY(90deg) translateZ(25px);
        }

        .side-top,
        .side-bottom {
          width: var(--box-width);
          height: var(--box-depth);
          background-color: #C1C3B4; /* shaded accent shadow */
          left: 50%;
          top: 50%;
        }

        .side-top {
          transform: translate(-50%, -50%) rotateX(-90deg) translateZ(25px);
        }

        .side-bottom {
          transform: translate(-50%, -50%) rotateX(90deg) translateZ(25px);
        }

        @keyframes rotate {
          from {
            transform: rotateX(60deg) rotateZ(45deg) rotateY(0deg);
          }
          to {
            transform: rotateX(60deg) rotateZ(405deg) rotateY(0deg);
          }
        }

        @keyframes grow {
          0% {
            transform: scaleZ(0.2);
          }
          100% {
            transform: scaleZ(1.8);
          }
        }
      `}</style>

      {/* Main content */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-8 cursor-default"
      >
        {/* 3D Columns Loader Grid */}
        <div className="perspective-container">
          <div className="base">
            {/* Cube 1 */}
            <div className="cube">
              <div className="face side-front" />
              <div className="face side-back" />
              <div className="face side-left" />
              <div className="face side-right" />
              <div className="face side-top" />
              <div className="face side-bottom" />
            </div>
            {/* Cube 2 */}
            <div className="cube">
              <div className="face side-front" />
              <div className="face side-back" />
              <div className="face side-left" />
              <div className="face side-right" />
              <div className="face side-top" />
              <div className="face side-bottom" />
            </div>
            {/* Cube 3 */}
            <div className="cube">
              <div className="face side-front" />
              <div className="face side-back" />
              <div className="face side-left" />
              <div className="face side-right" />
              <div className="face side-top" />
              <div className="face side-bottom" />
            </div>
            {/* Cube 4 */}
            <div className="cube">
              <div className="face side-front" />
              <div className="face side-back" />
              <div className="face side-left" />
              <div className="face side-right" />
              <div className="face side-top" />
              <div className="face side-bottom" />
            </div>
          </div>
        </div>



      </motion.div>
    </div>
  );
}
