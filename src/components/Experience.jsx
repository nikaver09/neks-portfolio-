import { motion } from "framer-motion";
import GithubContributions from "./GithubContributions";

const experiences = [
  ["Senior Frontend Developer", "TechCorp Inc.", "2023 — Present", "React · TypeScript · AWS"],
  ["Full-Stack Developer", "StartupXYZ", "2022 — 2023", "Node.js · PostgreSQL · Docker"],
  ["Frontend Developer", "Digital Agency", "2021 — 2022", "React · Tailwind · Figma"],
  ["App Developer", "Independent", "2023 — Present", "React Native · Expo · Firebase"],
];

export default function Experience() {
  return (
    <section id="experience" className="section section--paper experience-section">
      <div className="section-shell">
        <div className="section-marker"><span>04</span><span>EXPERIENCE</span></div>
        <div className="experience-heading"><h2 className="section-display section-display--dark">WORK IN<br /><em>PROGRESS.</em></h2><p>A few roles and environments that have shaped how I make things.</p></div>
        <div className="experience-list">
          {experiences.map(([role, company, period, tools], index) => (
            <motion.article key={`${company}-${role}`} className="experience-row" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: index * 0.06 }}>
              <span className="experience-row__number">0{index + 1}</span>
              <h3>{role}<small>{company}</small></h3>
              <p>{tools}</p>
              <time>{period}</time>
            </motion.article>
          ))}
        </div>

        {/* GitHub Contribution Activity Heatmap right next to experience */}
        <GithubContributions />
      </div>
    </section>
  );
}
