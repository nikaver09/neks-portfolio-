import { useRef, type ComponentPropsWithoutRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import "./text-scroll-animation.css";

type TextLine = { text: string; accent?: boolean };

interface TextScrollAnimationProps extends ComponentPropsWithoutRef<"h2"> {
  lines: TextLine[];
}

function Character({ char, index, centerIndex, progress }: {
  char: string;
  index: number;
  centerIndex: number;
  progress: MotionValue<number>;
}) {
  const distance = index - centerIndex;
  // The reference's outward spread and 3D rotation, tied directly to scrolling.
  const x = useTransform(progress, [0, 1], [distance * 50, 0]);
  const rotateX = useTransform(progress, [0, 1], [distance * 50, 0]);

  return <motion.span className="text-scroll__character" style={{ x, rotateX }}>{char}</motion.span>;
}

function AnimatedLines({ lines }: { lines: TextLine[] }) {
  const target = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target,
    // Finish before the heading reaches the header; no extra scroll height.
    offset: ["start 95%", "start 55%"],
  });

  return (
    <span ref={target} className="text-scroll__lines" aria-hidden="true">
      {lines.map(({ text, accent }, lineIndex) => {
        const characters = Array.from(text);
        const content = characters.map((char, index) => (
          <Character key={index} char={char} index={index}
            centerIndex={Math.floor(characters.length / 2)} progress={scrollYProgress} />
        ));

        return (
          <span key={lineIndex} className="text-scroll__line">
            {accent ? <em>{content}</em> : content}
          </span>
        );
      })}
    </span>
  );
}

export default function TextScrollAnimation({ lines, className, ...props }: TextScrollAnimationProps) {
  const reducedMotion = useReducedMotion();

  return (
    <h2 className={cn("text-scroll", className)} aria-label={lines.map(({ text }) => text).join(" ")} {...props}>
      {reducedMotion ? (
        <span className="text-scroll__lines" aria-hidden="true">
          {lines.map(({ text, accent }, index) => (
            <span key={index} className="text-scroll__line">{accent ? <em>{text}</em> : text}</span>
          ))}
        </span>
      ) : <AnimatedLines lines={lines} />}
    </h2>
  );
}
