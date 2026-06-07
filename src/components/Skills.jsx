import { motion } from "framer-motion";

const categories = [
  {
    label: "Frontend",
    skills: [
      { name: "React / Next.js", level: 92 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Framer Motion", level: 75 },
    ],
  },
  {
    label: "Backend",
    skills: [
      { name: "Node.js / Express", level: 88 },
      { name: "Python / FastAPI", level: 78 },
      { name: "PostgreSQL", level: 82 },
      { name: "MongoDB", level: 80 },
    ],
  },
  {
    label: "Tools & Cloud",
    skills: [
      { name: "Docker / CI-CD", level: 72 },
      { name: "AWS / Vercel", level: 76 },
      { name: "Git / GitHub", level: 93 },
      { name: "Figma", level: 80 },
    ],
  },
];

function SkillBar({ name, level }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-body text-snow text-sm">{name}</span>
        <span className="font-mono text-xs text-accent">{level}%</span>
      </div>
      <div className="h-1.5 bg-muted/40 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          className="h-full bg-gradient-to-r from-accent to-white rounded-full"
        />
      </div>
    </div>
  );
}

const tools = ["VS Code", "Postman", "Linear", "Notion", "Vercel", "GitHub Actions", "Storybook", "Jest", "Playwright", "Prisma"];

export default function Skills() {
  return (
    <section id="skills" className="py-28 lg:py-36 bg-surface/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-xs text-accent uppercase tracking-[0.3em]">02 — Skills</span>
          <div className="flex-1 h-px bg-muted/30" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="font-heading font-bold text-4xl lg:text-5xl leading-tight mb-4">
            My <span className="text-accent">toolkit</span> & expertise
          </h2>
          <p className="font-body text-ghost text-lg max-w-xl">
            Technologies I use to bring ideas to life — from rapid prototyping to production-grade applications.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {categories.map(({ label, skills }, idx) => (
            <motion.div 
              key={label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-card border border-muted/30 rounded-2xl p-8 space-y-6 card-hover"
            >
              <h3 className="font-heading font-bold text-lg text-snow">{label}</h3>
              <div className="space-y-5">
                {skills.map((s) => (
                  <SkillBar key={s.name} {...s} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tool badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p className="font-mono text-xs text-ghost uppercase tracking-[0.2em] mb-5">Also proficient in:</p>
          <div className="flex flex-wrap gap-3">
            {tools.map((t) => (
              <span key={t} className="bg-card border border-muted/30 text-ghost font-mono text-xs px-4 py-2 rounded-full hover:border-accent/50 hover:text-accent transition-all duration-200 cursor-default">{t}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
