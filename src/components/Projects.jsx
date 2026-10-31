import { useState, useRef, useEffect, useCallback } from "react";
import { ArrowUpRight, GitBranch, ExternalLink, Move } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    number: "01",
    title: "Cookbot AI",
    type: "AI PRODUCT",
    year: "2025",
    desc: "An AI-powered recipe generator that turns ingredients, preferences, and dietary needs into useful meal ideas.",
    tags: ["Vite", "TypeScript", "Node.js", "OpenAI API"],
    live: "https://cookbot-ai.vercel.app/",
    repo: "https://github.com/nikaver09/Cookbot-AI.git",
    image: "/images2/cookbot_preview.png",
  },
  {
    number: "02",
    title: "E-Jeepney System",
    type: "MOBILITY",
    year: "2025",
    desc: "A digital backbone for public transport — combining route information, real-time tracking, and rider-facing tools.",
    tags: ["React", "Node.js", "Geospatial APIs", "Real-time"],
    live: "https://e-jeepney-system.vercel.app",
    repo: "https://github.com/nikaver09/E-jeepney-system.git",
    image: "/images2/ejeepney_preview.png",
  },
  {
    number: "03",
    title: "Soundscape IoT",
    type: "IOT SYSTEM",
    year: "2025",
    desc: "A telemetry and soundscape-control system built to monitor environmental conditions and respond in real time.",
    tags: ["Next.js", "IoT", "Telemetry", "Python"],
    live: "https://soundscape-iotsystem.vercel.app/",
    repo: "https://github.com/nikaver09/soundscape-Iotsystem.git",
    image: "/images2/soundscape_preview.png",
  },
  {
    number: "04",
    title: "Stock Logger",
    type: "OPERATIONS",
    year: "2025",
    desc: "A streamlined inventory workspace for logging movements, tracking stock levels, and reducing manual errors.",
    tags: ["Next.js", "TypeScript", "Inventory"],
    live: "https://stock-logger.vercel.app/",
    repo: "https://github.com/nikaver09/Stock-logger.git",
    image: "/images2/stocklogger_preview.png",
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

// Physics parameters matching the Wallhack SP-005 interactive viewer
const DRAG_THRESHOLD = 6;     // px movement before drag activates
const PEEK_MAX_PITCH = 16;    // max pitch tilt in degrees
const PEEK_MAX_YAW = 22;      // max yaw tilt in degrees
const PEEK_SENS = 0.15;       // degrees per pixel dragged
const PEEK_DAMPING = 7.0;     // Wallhack exponential damping constant
const HOVER_MAX_PITCH = 6;    // subtle tilt on hover
const HOVER_MAX_YAW = 8;      // subtle yaw on hover

// Exact hyperbolic tangent rubber-band function from Wallhack SP-005:
// rubber = (v, max) => max * Math.tanh(v / max)
const rubber = (v, max) => max * Math.tanh(v / max);

function ProjectCard3D({ project, index, hovered, setHovered }) {
  const cardRef = useRef(null);
  const sheenRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // Physics animation variables kept in refs for 60/120fps direct DOM manipulation
  const pointerActiveRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const pointerStartRef = useRef({ x: 0, y: 0 });
  const targetRotRef = useRef({ x: 0, y: 0 });
  const currentRotRef = useRef({ x: 0, y: 0 });
  const targetLiftRef = useRef(0);
  const currentLiftRef = useRef(0);
  const rafIdRef = useRef(null);
  const lastTimeRef = useRef(0);

  const startAnimationLoop = useCallback(() => {
    if (rafIdRef.current) return;
    lastTimeRef.current = performance.now();

    const loop = (time) => {
      const dt = Math.min((time - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = time;

      // Wallhack exponential damping: 1 - Math.exp(-PEEK_DAMPING * delta)
      const alpha = 1 - Math.exp(-PEEK_DAMPING * dt);
      currentRotRef.current.x += (targetRotRef.current.x - currentRotRef.current.x) * alpha;
      currentRotRef.current.y += (targetRotRef.current.y - currentRotRef.current.y) * alpha;
      currentLiftRef.current += (targetLiftRef.current - currentLiftRef.current) * alpha;

      const rx = currentRotRef.current.x;
      const ry = currentRotRef.current.y;
      const lift = currentLiftRef.current;

      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(1200px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateZ(${lift.toFixed(1)}px)`;

        const shadowX = (-ry * 1.5).toFixed(1);
        const shadowY = (rx * 1.5 + 16 + lift * 1.2).toFixed(1);
        const shadowBlur = (32 + lift * 2.5).toFixed(1);
        cardRef.current.style.boxShadow = `${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0,0,0,0.13), 0 3px 10px rgba(0,0,0,0.05)`;
      }

      if (sheenRef.current) {
        // Wallhack tempered glass specular reflection shifting with the 3D angle
        const sheenX = (50 + ry * 2.5).toFixed(1);
        const sheenY = (50 - rx * 2.5).toFixed(1);
        const intensity = (0.16 + Math.hypot(rx, ry) * 0.012).toFixed(3);
        sheenRef.current.style.background = `radial-gradient(circle at ${sheenX}% ${sheenY}%, rgba(255, 255, 255, ${intensity}) 0%, rgba(255, 255, 255, 0) 65%)`;
      }

      // Check if settled back to rest position
      const isResting =
        !pointerActiveRef.current &&
        Math.abs(currentRotRef.current.x) < 0.01 &&
        Math.abs(currentRotRef.current.y) < 0.01 &&
        Math.abs(currentLiftRef.current) < 0.01;

      if (isResting) {
        currentRotRef.current.x = 0;
        currentRotRef.current.y = 0;
        currentLiftRef.current = 0;
        if (cardRef.current) {
          cardRef.current.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
          cardRef.current.style.boxShadow = "0 12px 32px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)";
        }
        rafIdRef.current = null;
        return;
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);
  }, []);

  useEffect(() => {
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  const handlePointerDown = (e) => {
    if (e.button !== 0) return;
    pointerActiveRef.current = true;
    hasDraggedRef.current = false;
    pointerStartRef.current = { x: e.clientX, y: e.clientY };
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    startAnimationLoop();
  };

  const handlePointerMove = (e) => {
    if (pointerActiveRef.current) {
      const dx = e.clientX - pointerStartRef.current.x;
      const dy = e.clientY - pointerStartRef.current.y;

      if (!hasDraggedRef.current && Math.hypot(dx, dy) > DRAG_THRESHOLD) {
        hasDraggedRef.current = true;
        setIsDragging(true);
      }

      if (hasDraggedRef.current) {
        // Wallhack drag formula: horizontal dx maps to yaw, vertical dy maps to pitch
        targetRotRef.current.x = rubber(-dy * PEEK_SENS, PEEK_MAX_PITCH);
        targetRotRef.current.y = rubber(dx * PEEK_SENS, PEEK_MAX_YAW);
        targetLiftRef.current = 16;
      }
    } else {
      // Subtle reactive tilt when mouse hovers over the card
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const normX = (e.clientX - rect.left) / rect.width - 0.5;
        const normY = (e.clientY - rect.top) / rect.height - 0.5;
        targetRotRef.current.x = -normY * HOVER_MAX_PITCH;
        targetRotRef.current.y = normX * HOVER_MAX_YAW;
        targetLiftRef.current = 4;
        startAnimationLoop();
      }
    }
  };

  const handlePointerUp = (e) => {
    if (pointerActiveRef.current) {
      pointerActiveRef.current = false;
      setIsDragging(false);
      targetRotRef.current.x = 0;
      targetRotRef.current.y = 0;
      targetLiftRef.current = 0;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  const handlePointerLeave = () => {
    if (!pointerActiveRef.current) {
      targetRotRef.current.x = 0;
      targetRotRef.current.y = 0;
      targetLiftRef.current = 0;
    }
  };

  const handleClickCapture = (e) => {
    // Suppress accidental navigation/clicks if user dragged the card in 3D
    if (hasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      hasDraggedRef.current = false;
    }
  };

  return (
    <article
      ref={cardRef}
      className={`project-card ${isDragging ? "is-dragging" : ""}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      onClickCapture={handleClickCapture}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => {
        handlePointerLeave();
        setHovered(null);
      }}
      data-cursor="DRAG"
    >
      {/* Specular glass reflection layer (Wallhack SP-005 signature) */}
      <div ref={sheenRef} className="project-card__sheen" />

      {/* Subtle 3D drag hint badge */}
      <div className="project-card__hint">
        <Move size={10} />
        <span>DRAG 3D</span>
      </div>

      <div className="project-card__image-wrap" style={{ transform: "translateZ(10px)" }}>
        <img
          src={project.image}
          alt={project.title + " screenshot"}
          className="project-card__image"
          draggable={false}
        />
        <AnimatePresence>
          {hovered === index && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="project-card__overlay"
              style={{ transform: "translateZ(20px)" }}
            >
              <div className="project-card__overlay-links" style={{ transform: "translateZ(30px)" }}>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="project-card__overlay-btn"
                    aria-label={"Open " + project.title + " live demo"}
                    data-cursor="OPEN"
                  >
                    <ExternalLink size={15} />
                    Live
                  </a>
                )}
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="project-card__overlay-btn project-card__overlay-btn--ghost"
                    aria-label={"View " + project.title + " source code"}
                    data-cursor="CODE"
                  >
                    <GitBranch size={15} />
                    Code
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <span className="project-card__badge" style={{ transform: "translateZ(24px)" }}>
          {project.number}
        </span>
      </div>

      <div className="project-card__body" style={{ transform: "translateZ(12px)" }}>
        <div className="project-card__meta">
          <span className="project-card__type">{project.type}</span>
          <span className="project-card__year">{project.year}</span>
        </div>
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__desc">{project.desc}</p>
        <div className="project-card__footer">
          <div className="project-card__tags">
            {project.tags.map((tag) => (
              <span key={tag} className="project-card__tag">
                {tag}
              </span>
            ))}
          </div>
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="project-card__link"
            aria-label={"Open " + project.title}
            data-cursor="OPEN"
          >
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="projects" className="section section--paper work-section">
      <div className="section-shell">
        <div className="section-marker">
          <span>03</span>
          <span>SELECTED WORK</span>
          <a
            href="https://github.com/nikaver09"
            target="_blank"
            rel="noreferrer"
            aria-label="View all projects on GitHub"
          >
            ALL PROJECTS <ArrowUpRight size={14} />
          </a>
        </div>

        <div className="work-heading">
          <h2 className="section-display section-display--dark">
            MADE TO<br />
            <em>MOVE.</em>
          </h2>
          <p>Selected work across products, platforms, and useful digital experiments.</p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="projects-grid"
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.number}
              variants={cardVariants}
              className="project-card-wrap"
            >
              <ProjectCard3D
                project={project}
                index={i}
                hovered={hovered}
                setHovered={setHovered}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
