"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CarouselItem {
  id: string;
  title: string;
  description: string;
  tag?: string;
  year?: string;
  image?: string;
  tags?: string[];
  live?: string;
  repo?: string;
  [key: string]: any;
}

export interface CircularCarouselProps {
  items: CarouselItem[];
  activeIndex?: number;
  onActiveChange?: (index: number) => void;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

export function CircularCarousel({
  items,
  activeIndex: controlledIndex,
  onActiveChange,
  autoPlay = true,
  autoPlayInterval = 4200,
  className,
}: CircularCarouselProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isHovered, setIsHovered] = useState(false);
  const [containerWidth, setContainerWidth] = useState(600);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isSwipingHorizontally = useRef<boolean>(false);

  const activeIndex = controlledIndex ?? internalIndex;
  const total = items.length;

  // Responsive container measurement
  useEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateSize();

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const newIndex = ((index % total) + total) % total;
      if (controlledIndex === undefined) {
        setInternalIndex(newIndex);
      }
      onActiveChange?.(newIndex);
    },
    [total, controlledIndex, onActiveChange]
  );

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  // Smooth auto-play timer
  useEffect(() => {
    if (!isPlaying || isHovered || total <= 1) return;
    const timer = setInterval(() => {
      next();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, autoPlayInterval, next, total]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    };
    const el = containerRef.current;
    el?.addEventListener("keydown", handler);
    return () => el?.removeEventListener("keydown", handler);
  }, [next, prev]);

  // Touch gesture handling for mobile / web app
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isSwipingHorizontally.current = false;
    setIsHovered(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = Math.abs(e.touches[0].clientX - touchStartX.current);
    const deltaY = Math.abs(e.touches[0].clientY - touchStartY.current);

    if (deltaX > deltaY && deltaX > 10) {
      isSwipingHorizontally.current = true;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current !== null && isSwipingHorizontally.current) {
      const diff = e.changedTouches[0].clientX - touchStartX.current;
      if (diff > 35) {
        prev();
      } else if (diff < -35) {
        next();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
    isSwipingHorizontally.current = false;
    setIsHovered(false);
  };

  // Screen adaptive dimensions
  const isMobile = containerWidth < 480;
  const isTablet = containerWidth >= 480 && containerWidth < 768;

  const cardW = isMobile ? 154 : isTablet ? 184 : 218;
  const cardH = isMobile ? 98 : isTablet ? 112 : 124;

  const radiusX = isMobile
    ? Math.min(115, Math.max(82, (containerWidth - cardW) / 2 - 8))
    : isTablet
    ? 168
    : 228;

  const radiusY = isMobile ? 38 : isTablet ? 56 : 72;
  const stageHeight = isMobile ? 210 : isTablet ? 236 : 260;

  // Orbit 3D calculations for each card
  const getCardTransform = (index: number) => {
    if (total === 0) return { x: 0, y: 0, scale: 1, opacity: 1, zIndex: 1 };

    let diff = ((index - activeIndex) % total + total) % total;
    if (diff > total / 2) diff -= total;

    // Angle in radians (0 is front center)
    const theta = (diff / Math.max(total, 4)) * (Math.PI * 2);

    const x = Math.sin(theta) * radiusX;
    // cos(0) = 1 (front, +radiusY), cos(PI) = -1 (back, -radiusY)
    const y = Math.cos(theta) * radiusY;

    const absDiff = Math.abs(diff);
    const isActive = absDiff < 0.1;
    const isSide = absDiff >= 0.5 && absDiff <= 1.5;

    const scale = isActive ? 1.04 : isSide ? (isMobile ? 0.84 : 0.88) : 0.72;
    const opacity = isActive ? 1 : isSide ? (isMobile ? 0.6 : 0.7) : 0.28;
    const zIndex = isActive ? 30 : isSide ? 20 : 10;

    return { x, y, scale, opacity, zIndex, isActive, diff };
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label="Interactive project showcase"
      aria-roledescription="carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative flex flex-col items-center justify-center w-full select-none outline-none",
        className
      )}
    >
      {/* 3D Circular Orbit Track */}
      <div
        ref={trackRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ height: `${stageHeight}px` }}
        className="relative w-full max-w-2xl overflow-visible flex items-center justify-center"
      >
        {/* Subtle Ambient Orbit Ring Backdrop */}
        <div
          style={{
            width: `${radiusX * 2 + 40}px`,
            height: `${radiusY * 2 + 30}px`,
            borderRadius: "50%",
          }}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-white/[0.04] bg-radial from-white/[0.02] to-transparent"
        />

        {/* Ambient Project Watermark in the orbit center */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center opacity-15">
          <span className="font-mono text-4xl sm:text-5xl font-black tracking-tighter text-white">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <span className="text-[10px] font-mono tracking-widest text-white/80 uppercase">
            / {String(total).padStart(2, "0")}
          </span>
        </div>

        {/* Carousel Items */}
        {items.map((item, i) => {
          const { x, y, scale, opacity, zIndex, isActive } = getCardTransform(i);

          return (
            <motion.div
              key={item.id}
              initial={false}
              animate={{
                x,
                y,
                scale,
                opacity,
                zIndex,
              }}
              transition={{
                duration: 0.52,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: `${cardW}px`,
                height: `${cardH}px`,
                marginLeft: `-${cardW / 2}px`,
                marginTop: `-${cardH / 2}px`,
                transformOrigin: "center center",
                zIndex,
              }}
              onClick={() => goTo(i)}
              className={cn(
                "group flex flex-col justify-between rounded-2xl border p-3.5 sm:p-4 text-left transition-all duration-300",
                "cursor-pointer backdrop-blur-md",
                isActive
                  ? "border-white/30 bg-gradient-to-b from-zinc-800/95 to-zinc-900/95 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.7)] ring-1 ring-white/20"
                  : "border-white/10 bg-zinc-900/80 hover:border-white/20 hover:bg-zinc-800/80 shadow-[0_8px_20px_-6px_rgba(0,0,0,0.4)]"
              )}
              aria-label={`${item.title} (${item.tag || "Project"})`}
              role="option"
              aria-selected={isActive}
            >
              {/* Header: Tag & Number */}
              <div className="flex items-center justify-between w-full gap-2">
                {item.tag && (
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[9px] sm:text-[10px] font-mono font-medium tracking-wider uppercase truncate",
                      isActive
                        ? "bg-white/15 text-white"
                        : "bg-white/5 text-white/60 group-hover:text-white/80"
                    )}
                  >
                    {item.tag}
                  </span>
                )}
                <span className="font-mono text-[9px] sm:text-[10px] text-white/40 ml-auto">
                  {item.id}
                </span>
              </div>

              {/* Title & Description */}
              <div className="w-full">
                <h3
                  className={cn(
                    "font-bold leading-snug truncate transition-colors duration-200",
                    isMobile ? "text-xs" : "text-sm",
                    isActive ? "text-white" : "text-white/80 group-hover:text-white"
                  )}
                >
                  {item.title}
                </h3>
                <p
                  className={cn(
                    "mt-0.5 line-clamp-1 leading-normal transition-colors duration-200",
                    isMobile ? "text-[10px]" : "text-xs",
                    isActive ? "text-white/70" : "text-white/40"
                  )}
                >
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Sleek Carousel Controls & Progress Bar */}
      <div className="flex items-center justify-between w-full max-w-sm px-4 pt-1">
        {/* Previous Button */}
        <button
          onClick={prev}
          aria-label="Previous project"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 backdrop-blur-sm transition-all duration-200 hover:bg-white/15 hover:text-white hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-white/40 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Dots & Play/Pause */}
        <div className="flex items-center gap-3">
          {/* Dot indicators */}
          <div className="flex items-center gap-1.5" role="tablist">
            {items.map((item, i) => {
              const isCurrent = i === activeIndex;
              return (
                <button
                  key={item.id || i}
                  role="tab"
                  aria-selected={isCurrent}
                  onClick={() => goTo(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                    isCurrent
                      ? "w-6 bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                      : "w-1.5 bg-white/20 hover:bg-white/50"
                  )}
                  aria-label={`Go to slide ${i + 1}: ${item.title}`}
                />
              );
            })}
          </div>

          {/* Play / Pause Toggle Button */}
          <button
            onClick={() => setIsPlaying((p) => !p)}
            aria-label={isPlaying ? "Pause auto-rotation" : "Play auto-rotation"}
            title={isPlaying ? "Pause auto-rotation" : "Play auto-rotation"}
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-200 cursor-pointer",
              isPlaying
                ? "border-white/20 bg-white/10 text-white/90 hover:bg-white/20"
                : "border-white/10 bg-transparent text-white/50 hover:text-white hover:border-white/30"
            )}
          >
            {isPlaying ? (
              <Pause className="w-3 h-3" />
            ) : (
              <Play className="w-3 h-3 ml-0.5" />
            )}
          </button>
        </div>

        {/* Next Button */}
        <button
          onClick={next}
          aria-label="Next project"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 backdrop-blur-sm transition-all duration-200 hover:bg-white/15 hover:text-white hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-white/40 cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default CircularCarousel;
