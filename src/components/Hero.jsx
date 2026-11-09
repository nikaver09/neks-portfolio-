import { ArrowDownRight, ArrowUpRight, Award } from "lucide-react";
import { HeroSection } from "./ui/hero-section-2";

const socials = [
  { href: "https://github.com/nikaver09", label: "GitHub" },
  { href: "https://www.linkedin.com/in/nkewi-undefined-1096ba413/", label: "LinkedIn" },
];

export default function Hero({ onNavigateToCertificates }) {
  return (
    <HeroSection
      id="hero"
      aria-labelledby="hero-title"
      slogan="Interface & architecture"
      title={<>Nicos<br /><span>Avergonzado.</span></>}
      subtitle="Crafting digital experiences that actually work."
      backgroundImage="/images2/neku.jfif"
      imageAlt="Nicos Avergonzado portrait"
      callToAction={{ text: "View work", href: "#projects" }}
      actions={
        <>
          <a className="portfolio-hero__secondary" href="#about">
            About me <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          {onNavigateToCertificates && (
            <button className="portfolio-hero__secondary" type="button" onClick={onNavigateToCertificates}>
              <Award size={16} aria-hidden="true" /> Certificates
            </button>
          )}
        </>
      }
      footer={
        <>
          <div className="portfolio-hero__socials">
            <span>Find me on</span>
            {socials.map(({ href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer">
                {label}
                <ArrowUpRight size={12} aria-hidden="true" />
              </a>
            ))}
          </div>
          <a className="portfolio-hero__explore" href="#about">
            Scroll to explore <ArrowDownRight size={17} aria-hidden="true" />
          </a>
        </>
      }
    />
  );
}
