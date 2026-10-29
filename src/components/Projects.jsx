import { useState } from "react";
import { ArrowUpRight, GitBranch, ExternalLink } from "lucide-react";
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
            <motion.article
              key={project.number}
              variants={cardVariants}
              className="project-card"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="project-card__image-wrap">
                <img
                  src={project.image}
                  alt={project.title + " screenshot"}
                  className="project-card__image"
                  draggable={false}
                />
                <AnimatePresence>
                  {hovered === i && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="project-card__overlay"
                    >
                      <div className="project-card__overlay-links">
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noreferrer"
                            className="project-card__overlay-btn"
                            aria-label={"Open " + project.title + " live demo"}
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
                          >
                            <GitBranch size={15} />
                            Code
                          </a>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <span className="project-card__badge">{project.number}</span>
              </div>

              <div className="project-card__body">
                <div className="project-card__meta">
                  <span className="project-card__type">{project.type}</span>
                  <span className="project-card__year">{project.year}</span>
                </div>
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__desc">{project.desc}</p>
                <div className="project-card__footer">
                  <div className="project-card__tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="project-card__tag">{tag}</span>
                    ))}
                  </div>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="project-card__link"
                    aria-label={"Open " + project.title}
                  >
                    <ArrowUpRight size={18} />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
