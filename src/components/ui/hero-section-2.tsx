import { forwardRef, type ReactNode } from "react";
import { motion, useReducedMotion, type HTMLMotionProps, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import "./hero-section-2.css";

interface HeroSectionProps extends Omit<HTMLMotionProps<"section">, "title" | "children"> {
  slogan?: string;
  title: ReactNode;
  subtitle: string;
  callToAction: { text: string; href: string };
  backgroundImage: string;
  imageAlt: string;
  actions?: ReactNode;
  footer?: ReactNode;
}

const HeroSection = forwardRef<HTMLElement, HeroSectionProps>(function HeroSection(
  { className, slogan, title, subtitle, callToAction, backgroundImage, imageAlt, actions, footer, ...props }, ref,
) {
  const reducedMotion = useReducedMotion();
  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 18 },
    visible: { opacity: 1, y: 0, transition: { duration: reducedMotion ? 0 : 0.6, ease: "easeOut" } },
  };

  return (
    <motion.section
      ref={ref}
      className={cn("portfolio-hero", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={container}
      {...props}
    >
      <div className="portfolio-hero__content">
        <motion.div className="portfolio-hero__eyebrow" variants={item}>
          <span className="portfolio-hero__status"><span aria-hidden="true" /> Available for work</span>
          {slogan && <span className="portfolio-hero__discipline">{slogan}</span>}
        </motion.div>
        <div className="portfolio-hero__intro">
          <motion.p className="portfolio-hero__kicker" variants={item}>Portfolio / 01</motion.p>
          <motion.h1 id="hero-title" className="portfolio-hero__title" variants={item}>{title}</motion.h1>
          <motion.div className="portfolio-hero__rule" variants={item} aria-hidden="true" />
          <motion.p className="portfolio-hero__subtitle" variants={item}>{subtitle}</motion.p>
          <motion.div className="portfolio-hero__actions" variants={item}>
            <a className="portfolio-hero__primary" href={callToAction.href}>
              {callToAction.text} <ArrowUpRight size={19} aria-hidden="true" />
            </a>
            {actions}
          </motion.div>
        </div>
        {footer && <motion.div className="portfolio-hero__footer" variants={item}>{footer}</motion.div>}
      </div>
      <div className="portfolio-hero__visual">
        <motion.div
          className="portfolio-hero__image-reveal"
          initial={reducedMotion ? false : { clipPath: "inset(0 0 0 100%)" }}
          whileInView={{ clipPath: "inset(0 0 0 0%)" }}
          viewport={{ once: true }}
          transition={{ duration: reducedMotion ? 0 : 1.1, ease: "circOut" }}
        >
          <img src={backgroundImage} alt={imageAlt} fetchPriority="high" className="portfolio-hero__image" />
          <div className="portfolio-hero__image-shade" aria-hidden="true" />
          <div className="portfolio-hero__image-caption" aria-hidden="true">
            <span>A personal perspective.</span><span>NICOS / PORTFOLIO</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
});

export { HeroSection };
