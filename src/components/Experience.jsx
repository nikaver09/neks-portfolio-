import GithubContributions from "./GithubContributions";
import ScrollAnimation from "./ui/scroll-animation";
import TextScrollAnimation from "./ui/text-scroll-animation";

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
        <ScrollAnimation direction="down" viewport={{ amount: 0.2, margin: "0px 0px -50px 0px" }}>
          <div className="section-marker"><span>04</span><span>EXPERIENCE</span></div>
        </ScrollAnimation>

        <div className="experience-heading">
          <div>
            <TextScrollAnimation className="section-display section-display--dark"
              lines={[{ text: "WORK IN" }, { text: "PROGRESS.", accent: true }]} />
          </div>
          <ScrollAnimation direction="right" delay={0.15} viewport={{ amount: 0.2, margin: "0px 0px -50px 0px" }}>
            <p>A few roles and environments that have shaped how I make things.</p>
          </ScrollAnimation>
        </div>

        <div className="experience-list">
          {experiences.map(([role, company, period, tools], index) => (
            <ScrollAnimation
              key={`${company}-${role}`}
              className="experience-row"
              direction="down"
              delay={index * 0.08}
              viewport={{ amount: 0.2, margin: "0px 0px -50px 0px" }}
            >
              <span className="experience-row__number">0{index + 1}</span>
              <h3>{role}<small>{company}</small></h3>
              <p>{tools}</p>
              <time>{period}</time>
            </ScrollAnimation>
          ))}
        </div>

        {/* GitHub Contribution Activity Heatmap right next to experience */}
        <ScrollAnimation direction="down" delay={0.2} viewport={{ amount: 0.2, margin: "0px 0px -50px 0px" }}>
          <GithubContributions />
        </ScrollAnimation>
      </div>
    </section>
  );
}
