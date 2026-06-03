import { Code2, Palette, Zap, Users } from "lucide-react";
import { motion } from "framer-motion";

const traits = [
  { icon: Code2, title: "Clean Code", desc: "Writing readable, maintainable, and scalable code is not optional — it's the standard." },
  { icon: Palette, title: "Eye for Design", desc: "Beautiful interfaces that balance aesthetics with usability and accessibility." },
  { icon: Zap, title: "Performance First", desc: "Optimized builds, fast load times, and smooth interactions across all devices." },
  { icon: Users, title: "Collaborative", desc: "Clear communication and teamwork to deliver on time, every time." },
];

export default function About() {
  return (
    <section id="about" className="py-28 lg:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section label */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-xs text-accent uppercase tracking-[0.3em]">01 — About</span>
          <div className="flex-1 h-px bg-muted/30" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Side Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="font-heading font-bold text-4xl lg:text-5xl leading-tight">
              Building the web,<br />
              <span className="text-accent">one pixel</span> at a time.
            </h2>

            <div className="space-y-5 font-body text-ghost text-lg leading-relaxed">
              <p>
                Hey! I'm <strong className="text-snow">NK</strong> — a full-stack developer who loves turning complex problems into elegant, user-friendly digital experiences.
              </p>
              <p>
                With over 3 years of experience, I've worked across the entire stack — from crafting pixel-perfect frontends with React and Next.js, to building robust APIs and databases on the backend.
              </p>
              <p>
                When I'm not shipping code, you'll find me exploring new technologies, contributing to open-source, or sketching UI concepts on paper.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-4">
              {[["3+", "Years Exp."], ["20+", "Projects"],].map(([num, label]) => (
                <div key={label} className="space-y-1">
                  <p className="font-display text-4xl text-accent">{num}</p>
                  <p className="font-mono text-xs text-ghost uppercase tracking-widest">{label}</p>
                </div>
              ))}
            </div>

            <a
              href="/resume.pdf"
              className="inline-flex items-center gap-2 border border-accent/50 text-accent font-heading font-medium px-6 py-3 rounded-full hover:bg-accent hover:text-ink transition-all duration-200 uppercase tracking-wider text-sm"
            >
              Download CV
            </a>
          </motion.div>

          {/* Right — trait cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {traits.map(({ icon: Icon, title, desc }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="card-hover bg-card border border-muted/30 rounded-2xl p-6 space-y-4"
              >
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                  <Icon size={20} className="text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-snow">{title}</h3>
                <p className="font-body text-ghost text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}