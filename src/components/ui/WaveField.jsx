import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

export default function WaveField({ className = "" }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isRunning] = useState(true);

  const pointerRef = useRef({
    x: -2000,
    y: -2000,
    targetX: -2000,
    targetY: -2000,
  });
  const isRunningRef = useRef(isRunning);
  isRunningRef.current = isRunning;

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animId = 0;
    let time = 0;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const rect = entry.contentRect;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.floor(rect.width * dpr);
        canvas.height = Math.floor(rect.height * dpr);
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
      }
    });
    resizeObserver.observe(container);

    const render = () => {
      if (isRunningRef.current) {
        time += 0.015;
      }

      const width = container.clientWidth;
      const height = container.clientHeight;
      const pointer = pointerRef.current;

      pointer.x += (pointer.targetX - pointer.x) * 0.1;
      pointer.y += (pointer.targetY - pointer.y) * 0.1;

      // Match the Hero section bg: #EDEDED
      ctx.fillStyle = "#EDEDED";
      ctx.fillRect(0, 0, width, height);

      const lines = 36;
      const stepY = height / (lines + 1);

      for (let i = 0; i < lines; i++) {
        const yBase = stepY * (i + 1);
        ctx.beginPath();
        const points = 120;
        const stepX = width / points;

        for (let p = 0; p <= points; p++) {
          const x = p * stepX;
          const dx = x - pointer.x;
          const dy = yBase - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = dist < 280 ? (1 - dist / 280) * 40 : 0;

          const wave =
            Math.sin(p * 0.1 + time + i * 0.2) * 16 +
            Math.cos(p * 0.05 - time * 0.8) * 10;
          const y = yBase + wave - influence;

          if (p === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        const alpha = 0.06 + (i / lines) * 0.22;
        ctx.strokeStyle = `rgba(0, 0, 0, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={(e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          pointerRef.current.targetX = e.clientX - rect.left;
          pointerRef.current.targetY = e.clientY - rect.top;
        }
      }}
      onMouseLeave={() => {
        pointerRef.current.targetX = -2000;
        pointerRef.current.targetY = -2000;
      }}
      className={cn(
        "absolute inset-0 w-full h-full overflow-hidden",
        className
      )}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block h-full w-full cursor-crosshair"
      />
    </div>
  );
}
