import { motion } from "framer-motion";

const experiences = [
  {
    role: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    period: "2023 — Present",
    type: "Full-time",
    desc: "Lead the frontend architecture for a SaaS platform serving 50k+ users. Migrated legacy codebase to React + TypeScript, reducing bundle size by 40%.",
    highlights: ["React", "TypeScript", "AWS", "GraphQL"],
  },
  {
    role: "Full-Stack Developer",
    company: "StartupXYZ",
    period: "2022 — 2023",
    type: "Full-time",
    desc: "Built and shipped 3 core product features from scratch. Designed REST APIs, integrated third-party services, and set up CI/CD pipelines on GitHub Actions.",
    highlights: ["Node.js", "PostgreSQL", "Docker", "Next.js"],
  },
  {
    role: "Frontend Developer",
    company: "Digital Agency",
    period: "2021 — 2022",
    type: "Contract",
    desc: "Delivered 10+ client websites with performance scores above 95 on Lighthouse. Worked directly with designers to translate Figma designs into code.",
    highlights: ["React", "Tailwind CSS", "Figma", "Webflow"],
  },
  {
    role: "Junior Developer",
    company: "Freelance",
    period: "2020 — 2021",
    type: "Freelance",
    desc: "Started my journey building websites for local businesses, learning the full web development lifecycle from client briefing to deployment.",
    highlights: ["HTML/CSS", "JavaScript", "WordPress", "PHP"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-28 lg:py-36 bg-surface/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-xs text-accent uppercase tracking-[0.3em]">04 — Experience</span>
          <div className="flex-1 h-px bg-muted/30" />
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-heading font-bold text-4xl lg:text-5xl leading-tight mb-12"
        >
          Where I've <span className="text-accent">worked</span>
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <motion.div 
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "circOut" }}
            style={{ originY: 0, left: "1px" }}
            className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-muted/40 to-transparent hidden md:block" 
          />

          <div className="space-y-2">
            {experiences.map((exp, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="md:pl-12 relative group"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-8 w-2.5 h-2.5 rounded-full bg-accent hidden md:block -translate-x-[4px] group-hover:scale-150 transition-transform">
                  {/* Looping pulse animation */}
                  <motion.div 
                    animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full bg-accent/60"
                  />
                </div>

                <div className="card-hover bg-card border border-muted/30 rounded-2xl p-8 hover:border-accent/30">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-heading font-bold text-xl text-snow">{exp.role}</h3>
                      <p className="font-heading text-accent font-medium">{exp.company}</p>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-1.5 shrink-0">
                      <span className="font-mono text-sm text-ghost">{exp.period}</span>
                      <span className="font-mono text-xs text-ink bg-accent px-2.5 py-0.5 rounded-full">{exp.type}</span>
                    </div>
                  </div>

                  <p className="font-body text-ghost leading-relaxed mb-5">{exp.desc}</p>

                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map(h => (
                      <span key={h} className="font-mono text-xs px-3 py-1 rounded-full bg-muted/20 border border-muted/30 text-ghost">{h}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
