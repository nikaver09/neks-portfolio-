import { motion } from "framer-motion";

const principles = [
  ["01", "Clarity over clutter", "Every screen should make the next decision feel obvious."],
  ["02", "Built to perform", "Thoughtful code and small details create fast, dependable products."],
  ["03", "Collaboration matters", "The strongest work comes from asking better questions together."],
];

export default function About() {
  return (
    <section id="about" className="section section--paper about-section">
      <div className="section-shell">
        <div className="section-marker"><span>01</span><span>PROFILE</span></div>
        <div className="about-layout">
          <motion.h2
            className="section-display section-display--dark"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7 }}
          >
            CODE WITH<br />
            <em>INTENT.</em>
          </motion.h2>
          <div className="about-copy">
            <p className="about-copy__lead">I&apos;m NK, a full-stack developer who turns ambitious ideas into focused, human-centred software.</p>
            <p>I work across product thinking, interface design, and implementation—bringing the same care to the first wireframe and the final production detail.</p>
            <a className="inline-link" href="mailto:nkavs777@gmail.com?subject=CV%20request">REQUEST CV <span>↗</span></a>
          </div>
        </div>
        <div className="principles-grid">
          {principles.map(([number, title, copy]) => (
            <article key={number} className="principle">
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
