import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const interactiveSelector = "a, button, input, textarea, select, [role='button'], [data-cursor]";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState("OPEN");
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailX = useSpring(cursorX, { damping: 28, stiffness: 380, mass: 0.45 });
  const trailY = useSpring(cursorY, { damping: 28, stiffness: 380, mass: 0.45 });

  useEffect(() => {
    const pointerQuery = window.matchMedia("(pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateEnabled = () => setEnabled(pointerQuery.matches && !motionQuery.matches);

    updateEnabled();
    pointerQuery.addEventListener("change", updateEnabled);
    motionQuery.addEventListener("change", updateEnabled);

    return () => {
      pointerQuery.removeEventListener("change", updateEnabled);
      motionQuery.removeEventListener("change", updateEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove("has-custom-cursor");
      return undefined;
    }

    document.documentElement.classList.add("has-custom-cursor");

    const handleMove = (event) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      setVisible(true);

      const target = event.target instanceof Element ? event.target.closest(interactiveSelector) : null;
      setActive(Boolean(target));
      setLabel(target?.getAttribute("data-cursor") || "OPEN");
    };

    const hideCursor = () => setVisible(false);
    const showCursor = () => setVisible(true);

    window.addEventListener("pointermove", handleMove);
    document.addEventListener("mouseleave", hideCursor);
    document.addEventListener("mouseenter", showCursor);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("mouseleave", hideCursor);
      document.removeEventListener("mouseenter", showCursor);
    };
  }, [cursorX, cursorY, enabled]);

  if (!enabled) return null;

  return (
    <div className={`custom-cursor ${visible ? "custom-cursor--visible" : ""} ${active ? "custom-cursor--active" : ""}`} aria-hidden="true">
      <motion.div className="custom-cursor__trail" style={{ x: trailX, y: trailY }}>
        <div className="custom-cursor__ring"><span>{label}</span></div>
      </motion.div>
      <motion.div className="custom-cursor__point" style={{ x: cursorX, y: cursorY }} />
    </div>
  );
}
