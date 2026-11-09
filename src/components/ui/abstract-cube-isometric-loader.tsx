import { useMemo, type CSSProperties } from "react";

export interface GradientConfig {
  from: string;
  via?: string;
  to: string;
  direction?: "diagonal" | "horizontal" | "vertical";
}

export interface AbstractCubeIsometricLoaderProps {
  dotSize?: number;
  gap?: number;
  speed?: number;
  color?: string;
  gradient?: GradientConfig;
  bloom?: boolean;
  opacity?: number;
  className?: string;
}

type LoaderStyle = CSSProperties & Record<`--${string}`, string | number>;

const MATRIX = ["00100", "01110", "10101", "11011", "01110"];

// CSS color-mix keeps gradients compatible with CSS variables and currentColor.
function getDotColor(gradient: GradientConfig, row: number, col: number) {
  const progress = gradient.direction === "horizontal"
    ? col / 4
    : gradient.direction === "vertical" ? row / 4 : (row + col) / 8;
  let from = gradient.from;
  let to = gradient.to;
  let amount = progress;

  if (gradient.via) {
    from = progress < 0.5 ? gradient.from : gradient.via;
    to = progress < 0.5 ? gradient.via : gradient.to;
    amount = progress < 0.5 ? progress * 2 : (progress - 0.5) * 2;
  }

  return `color-mix(in srgb, ${from} ${(1 - amount) * 100}%, ${to})`;
}

export function AbstractCubeIsometricLoader({
  dotSize = 5,
  gap = 4,
  speed = 1.2,
  color = "currentColor",
  gradient,
  bloom = false,
  opacity = 0.08,
  className = "",
}: AbstractCubeIsometricLoaderProps) {
  const dots = useMemo(() => MATRIX.flatMap((row, rowIndex) =>
    [...row].map((value, colIndex) => ({
      key: `${rowIndex}-${colIndex}`,
      active: value === "1",
      delay: (rowIndex * 5 + colIndex) * -0.04,
      color: gradient ? getDotColor(gradient, rowIndex, colIndex) : color,
    })),
  ), [color, gradient]);

  return (
    <div
      className={`cube-loader${bloom ? " cube-loader--bloom" : ""} ${className}`.trim()}
      style={{
        "--dot-size": `${Math.max(1, dotSize)}px`,
        "--dot-gap": `${Math.max(0, gap)}px`,
        "--dot-speed": `${Math.max(0.1, speed)}s`,
        "--idle-opacity": Math.max(0, Math.min(1, opacity)),
        color,
      } as LoaderStyle}
      role="status"
      aria-label="Loading"
    >
      {dots.map((dot) => (
        <span
          key={dot.key}
          className={`cube-loader__dot${dot.active ? " cube-loader__dot--active" : ""}`}
          aria-hidden="true"
          style={{
            "--dot-delay": `${dot.delay}s`,
            backgroundColor: dot.color,
            color: dot.color,
          } as LoaderStyle}
        />
      ))}
    </div>
  );
}

export default AbstractCubeIsometricLoader;
