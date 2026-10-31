import ScrollAnimation from "./ui/scroll-animation";

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
        <ScrollAnimation direction="down" viewport={{ amount: 0.2, margin: "0px 0px -50px 0px" }}>
          <div className="section-marker"><span>02</span><span>CAPABILITIES</span></div>
        </ScrollAnimation>

        <div className="capabilities-heading">
          <ScrollAnimation direction="left" viewport={{ amount: 0.2, margin: "0px 0px -50px 0px" }}>
            <h2 className="section-display">DESIGNED TO<br /><em>DELIVER.</em></h2>
          </ScrollAnimation>
          <ScrollAnimation direction="right" delay={0.15} viewport={{ amount: 0.2, margin: "0px 0px -50px 0px" }}>
            <p>From the interface people touch to the systems that keep it reliable, I build the full experience.</p>
          </ScrollAnimation>
        </div>

        <div className="capabilities-grid">
          {capabilities.map((capability, index) => (
            <ScrollAnimation
              key={capability.id}
              className="capability"
              direction="down"
              delay={index * 0.1}
              viewport={{ amount: 0.2, margin: "0px 0px -50px 0px" }}
            >
              <header><span>{capability.id}</span><span>0{index + 1} / 03</span></header>
              <h3>{capability.title}</h3>
              <p>{capability.copy}</p>
              <ul>
                {capability.items.map((item) => <li key={item}>{item}<b>↗</b></li>)}
              </ul>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
