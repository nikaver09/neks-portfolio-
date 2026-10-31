import { useState } from "react";
import { ArrowUpRight, GitBranch, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { CircularCarousel } from "./ui/circular-carousel";
import ScrollAnimation from "./ui/scroll-animation";

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

export default function Projects() {
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);

  const carouselItems = projects.map((p) => ({
    id: p.number,
    title: p.title,
    description: p.desc,
    tag: p.type,
    year: p.year,
    live: p.live,
    repo: p.repo,
    image: p.image,
    tags: p.tags,
  }));

  const activeProject = projects[activeCarouselIndex] || projects[0];

  return (
    <section id="projects" className="section section--paper work-section">
      <div className="section-shell">
        <ScrollAnimation direction="down" viewport={{ amount: 0.2, margin: "0px 0px -50px 0px" }}>
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
        </ScrollAnimation>

        <div className="work-heading">
          <ScrollAnimation direction="left" viewport={{ amount: 0.2, margin: "0px 0px -50px 0px" }}>
            <h2 className="section-display section-display--dark">
              MADE TO<br />
              <em>MOVE.</em>
            </h2>
          </ScrollAnimation>
          <ScrollAnimation direction="right" delay={0.15} viewport={{ amount: 0.2, margin: "0px 0px -50px 0px" }}>
            <p>Selected work across products, platforms, and useful digital experiments.</p>
          </ScrollAnimation>
        </div>

        {/* Carousel Showcase View */}
        <ScrollAnimation
          direction="down"
          delay={0.15}
          viewport={{ amount: 0.15, margin: "0px 0px -50px 0px" }}
          className="mt-8 rounded-3xl bg-[#0f0f11] text-white p-6 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden"
        >
          {/* Ambient subtle backlights */}
          <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

          <div className="relative z-10">
            <CircularCarousel
              items={carouselItems}
              activeIndex={activeCarouselIndex}
              onActiveChange={setActiveCarouselIndex}
              autoPlay={false}
              className="py-4"
            />

            {/* Active Project Spotlight Detail Card */}
            {activeProject && (
              <motion.div
                key={activeProject.number}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="mt-10 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
              >
                {/* Preview Thumbnail */}
                <div className="md:col-span-5 relative group overflow-hidden rounded-2xl border border-white/10 bg-black/50 aspect-video flex items-center justify-center">
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-mono tracking-widest text-white/90 border border-white/10">
                    {activeProject.number} / {activeProject.type}
                  </span>
                </div>

                {/* Info and links */}
                <div className="md:col-span-7 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono uppercase tracking-widest text-white/50">
                        {activeProject.year}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                      <span className="text-xs font-mono uppercase tracking-widest text-white/80">
                        {activeProject.type}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold mt-2 text-white">
                      {activeProject.title}
                    </h3>
                    <p className="text-sm sm:text-base text-white/70 mt-3 leading-relaxed">
                      {activeProject.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {activeProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-mono px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-6 pt-4 border-t border-white/5">
                    {activeProject.live && (
                      <a
                        href={activeProject.live}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-bold text-xs tracking-wider uppercase hover:bg-white/90 transition-all duration-200 hover:scale-105 cursor-pointer shadow-sm"
                      >
                        <ExternalLink size={14} />
                        Live Demo
                      </a>
                    )}
                    {activeProject.repo && (
                      <a
                        href={activeProject.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-white font-semibold text-xs tracking-wider uppercase hover:bg-white/20 border border-white/10 transition-all duration-200 hover:scale-105 cursor-pointer"
                      >
                        <GitBranch size={14} />
                        Source Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
