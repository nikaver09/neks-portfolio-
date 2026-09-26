import { useTheme } from "../context/ThemeContext";
import { useState } from "react";
import "./ThemeToggle.css";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  const [isPristine, setIsPristine] = useState(true);

  const handleChange = () => {
    setIsPristine(false);
    toggleTheme();
  };

  return (
    <div className="fixed top-8 right-8 z-[100]">
      <input
        type="checkbox"
        className={`theme-checkbox ${isPristine ? "pristine" : ""}`}
        checked={isDark}
        onChange={handleChange}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      />
    </div>
  );
}
