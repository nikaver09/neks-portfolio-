import { ExternalLink, Terminal } from "lucide-react";
import { motion } from "framer-motion";

const projects = [
  {
    num: "01",
    title: "CookbotAI",
    desc: "AI-powered recipe generator that creates personalized meal ideas based on user preferences, dietary restrictions, and available ingredients.",
    tags: ["Vite", "TypeScript", "Node.js", "Python", "OpenAI API"],
    live: "https://cookbot-ai.vercel.app/",
    repo: "https://github.com/nikaver09/Cookbot-AI.git",
    featured: true,
    accent: "#f8ffc8ff",
  },
  {
    num: "02",
    title: "E-Jeepney System",
    desc: "A comprehensive E-Jeepney System that integrates both a mobile application and a web application represents the digital backbone of the Philippines' Public Utility Vehicle Modernization Program",
    tags: ["React", "Node.js", "Vite + TypeScript", "Geospatial APIs", "Real-time Tracking"],
    live: "https://e-jeepney-system.vercel.app",
    repo: "https://github.com/nikaver09/E-jeepney-system.git",
    featured: true,
    accent: "#acd7faff",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-xs text-accent uppercase tracking-[0.3em]">03 — Projects</span>
          <div className="flex-1 h-px bg-muted/30" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6"
        >
          <div>
            <h2 className="font-heading font-bold text-4xl lg:text-5xl leading-tight mb-4">
              Selected <span className="text-accent">work</span>
            </h2>
            <p className="font-body text-ghost text-lg max-w-xl">
              A collection of digital products and experiments built with modern technologies.
            </p>
          </div>
          <motion.a
            whileHover={{ x: 5 }}
            href="https://github.com/nikaver09"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-ghost hover:text-accent font-mono text-sm transition-colors uppercase tracking-widest group"
          >
            All projects <ExternalLink size={14} className="group-hover:rotate-45 transition-transform" />
          </motion.a>
        </motion.div>

        {/* Featured projects */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {projects.filter(p => p.featured).map((project, idx) => (
            <motion.div
              key={project.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="card-hover group bg-card border border-muted/30 rounded-3xl p-8 lg:p-10 relative overflow-hidden"
            >
              {/* Glow */}
              <div
                className="absolute top-0 right-0 w-60 h-60 rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle, ${project.accent} 0%, transparent 70%)`, transform: "translate(30%, -30%)" }}
              />

              <div className="relative space-y-6">
                <div className="flex items-start justify-between">
                  <span className="font-display text-5xl opacity-20" style={{ color: project.accent }}>{project.num}</span>
                  <div className="flex gap-3">
                    <a href={project.repo} target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-muted/40 rounded-full flex items-center justify-center text-ghost hover:text-accent hover:border-accent transition-all">
                      <Terminal size={15} />
                    </a>
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-muted/40 rounded-full flex items-center justify-center text-ghost hover:text-accent hover:border-accent transition-all">
                      <ExternalLink size={15} />
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-2xl text-snow mb-3 group-hover:text-accent transition-colors">{project.title}</h3>
                  <p className="font-body text-ghost leading-relaxed">{project.desc}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map(t => (
                    <span key={t} className="font-mono text-xs px-3 py-1 rounded-full bg-muted/20 border border-muted/30" style={{ color: project.accent }}>{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Grid projects */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {projects.filter(p => !p.featured).map((project, idx) => (
            <motion.div
              key={project.num}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + (idx * 0.1) }}
              className="card-hover group bg-card border border-muted/30 rounded-2xl p-6 relative overflow-hidden"
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none"
                style={{ background: `radial-gradient(circle, ${project.accent} 0%, transparent 70%)`, transform: "translate(30%, -30%)" }}
              />
              <div className="relative space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-display text-3xl opacity-30" style={{ color: project.accent }}>{project.num}</span>
                  <div className="flex gap-2">
                    <a href={project.repo} className="text-ghost hover:text-accent transition-colors"><Terminal size={14} /></a>
                    <a href={project.live} className="text-ghost hover:text-accent transition-colors"><ExternalLink size={14} /></a>
                  </div>
                </div>
                <h3 className="font-heading font-semibold text-snow group-hover:text-accent transition-colors">{project.title}</h3>
                <p className="font-body text-ghost text-sm leading-relaxed line-clamp-3">{project.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 2).map(t => (
                    <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-muted/20 border border-muted/30 text-ghost">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
