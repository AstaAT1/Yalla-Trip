import React from "react";
import { motion } from "motion/react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className={`p-2.5 rounded-2xl bg-(--bg-secondary)/50 border border-(--border-color) backdrop-blur-md text-(--text-primary) shadow-sm hover:border-logo-sky hover:text-logo-sky transition-all duration-300 ${className}`}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun size={20} className="text-yellow-400" />
      ) : (
        <Moon size={20} />
      )}
    </motion.button>
  );
}
