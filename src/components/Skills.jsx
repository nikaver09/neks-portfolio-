import { motion } from "framer-motion";

const capabilities = [
  {
    id: "A",
    title: "INTERFACE SYSTEMS",
    copy: "Responsive React interfaces that look intentional and remain easy to use.",
    items: ["React / Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "B",
    title: "PRODUCT ENGINEERING",
    copy: "Solid application foundations for features that can grow beyond a first release.",
    items: ["Node.js", "Python / FastAPI", "PostgreSQL", "REST APIs"],
  },
  {
    id: "C",
    title: "SHIP & IMPROVE",
    copy: "A practical delivery workflow that keeps performance, quality, and iteration in view.",
    items: ["Git / GitHub", "Vercel", "Docker", "Figma"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section capabilities-section">
      <div className="section-shell">
        <div className="section-marker"><span>02</span><span>CAPABILITIES</span></div>
        <div className="capabilities-heading">
          <h2 className="section-display">DESIGNED TO<br /><em>DELIVER.</em></h2>
          <p>From the interface people touch to the systems that keep it reliable, I build the full experience.</p>
        </div>
        <div className="capabilities-grid">
          {capabilities.map((capability, index) => (
            <motion.article
              className="capability"
              key={capability.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <header><span>{capability.id}</span><span>0{index + 1} / 03</span></header>
              <h3>{capability.title}</h3>
              <p>{capability.copy}</p>
              <ul>
                {capability.items.map((item) => <li key={item}>{item}<b>↗</b></li>)}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
