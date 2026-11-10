import ScrollAnimation from "./ui/scroll-animation";
import TextScrollAnimation from "./ui/text-scroll-animation";

const principles = [
  ["01", "Clarity over clutter", "Every screen should make the next decision feel obvious."],
  ["02", "Built to perform", "Thoughtful code and small details create fast, dependable products."],
  ["03", "Collaboration matters", "The strongest work comes from asking better questions together."],
];

export default function About() {
  return (
    <section id="about" className="section section--paper about-section">
      <div className="section-shell">
        <ScrollAnimation direction="down" viewport={{ amount: 0.2, margin: "0px 0px -50px 0px" }}>
          <div className="section-marker"><span>01</span><span>PROFILE</span></div>
        </ScrollAnimation>

        <div className="about-layout">
          <div>
            <TextScrollAnimation className="section-display section-display--dark"
              lines={[{ text: "CODE WITH" }, { text: "INTENT.", accent: true }]} />
          </div>

          <ScrollAnimation
            direction="right"
            delay={0.15}
            viewport={{ amount: 0.2, margin: "0px 0px -50px 0px" }}
            className="about-copy"
          >
            <p className="about-copy__lead">I&apos;m NK, a full-stack developer who turns ambitious ideas into focused, human-centred software.</p>
            <p>I work across product thinking, interface design, and implementation—bringing the same care to the first wireframe and the final production detail.</p>
            <a className="inline-link" href="mailto:nkavs777@gmail.com?subject=CV%20request">REQUEST CV <span>↗</span></a>
          </ScrollAnimation>
        </div>

        <div className="principles-grid">
          {principles.map(([number, title, copy], index) => (
            <ScrollAnimation
              key={number}
              className="principle"
              direction="down"
              delay={index * 0.1}
              viewport={{ amount: 0.2, margin: "0px 0px -50px 0px" }}
            >
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
