import { useState } from "react";
import { ArrowUpRight, GitBranch, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CircularCarousel } from "./ui/circular-carousel";
import ScrollAnimation from "./ui/scroll-animation";
import TextScrollAnimation from "./ui/text-scroll-animation";

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
        <ScrollAnimation direction="down">
          <div className="section-marker flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3 sm:gap-6">
              <span>03</span>
              <span>SELECTED WORK</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 ml-auto">
              <a
                href="https://github.com/nikaver09"
                target="_blank"
                rel="noreferrer"
                aria-label="View all projects on GitHub"
                className="hidden sm:inline-flex items-center gap-1 font-mono text-xs uppercase no-underline hover:underline"
              >
                ALL PROJECTS <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </ScrollAnimation>

        <div className="work-heading">
          <div>
            <TextScrollAnimation className="section-display section-display--dark"
              lines={[{ text: "MADE TO" }, { text: "MOVE.", accent: true }]} />
          </div>
          <ScrollAnimation direction="right" delay={0.1}>
            <p>Selected work across products, platforms, and useful digital experiments.</p>
          </ScrollAnimation>
        </div>

        {/* 3D Orbit Carousel */}
          <ScrollAnimation
            direction="down"
            delay={0.1}
            className="mt-8 rounded-3xl bg-[#0c0c0f] text-white p-5 sm:p-8 md:p-10 border border-white/10 shadow-2xl relative overflow-hidden"
          >
            {/* Ambient subtle backlights */}
            <div className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 bg-white/[0.04] rounded-full blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 bg-white/[0.04] rounded-full blur-3xl" />

            <div className="relative z-10 w-full">
              {/* Responsive Stutter-Free 3D Circular Orbit Carousel */}
              <CircularCarousel
                items={carouselItems}
                activeIndex={activeCarouselIndex}
                onActiveChange={setActiveCarouselIndex}
                autoPlay={true}
                autoPlayInterval={4200}
                className="py-2"
              />

              {/* Active Project Spotlight Detail Card */}
              {activeProject && (
                <div className="mt-8 pt-7 border-t border-white/10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeProject.number}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center"
                    >
                      {/* Preview Thumbnail */}
                      <div className="md:col-span-6 relative group overflow-hidden rounded-2xl border border-white/15 bg-black/60 aspect-video shadow-xl flex items-center justify-center">
                        <img
                          src={activeProject.image}
                          alt={activeProject.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="eager"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                        <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-mono tracking-widest text-white/90 border border-white/10 shadow-sm">
                          {activeProject.number} / {activeProject.type}
                        </span>
                      </div>

                      {/* Info and links */}
                      <div className="md:col-span-6 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-mono uppercase tracking-widest text-white/50">
                              {activeProject.year}
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                            <span className="text-xs font-mono uppercase tracking-widest text-white/80">
                              {activeProject.type}
                            </span>
                          </div>

                          <h3 className="text-2xl sm:text-3xl font-bold mt-2 text-white tracking-tight">
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

                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-6 pt-5 border-t border-white/10">
                          {activeProject.live && (
                            <a
                              href={activeProject.live}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-bold text-xs tracking-wider uppercase hover:bg-white/90 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
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
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-white font-semibold text-xs tracking-wider uppercase hover:bg-white/20 border border-white/10 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                            >
                              <GitBranch size={14} />
                              Source Code
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}
            </div>
          </ScrollAnimation>

      </div>
    </section>
  );
}
