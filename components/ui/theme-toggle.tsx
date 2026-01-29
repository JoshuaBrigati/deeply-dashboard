"use client";

import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import dynamic from "next/dynamic";

function ThemeToggleContent() {
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2 rounded-full bg-secondary border border-border hover:border-primary/50 transition-colors overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 180 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        {isDark ? (
          <Moon className="w-5 h-5 text-foreground" />
        ) : (
          <Sun className="w-5 h-5 text-foreground" />
        )}
      </motion.div>

      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        initial={false}
        animate={{
          background: isDark
            ? "radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(251, 191, 36, 0.2) 0%, transparent 70%)",
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}

export const ThemeToggle = dynamic(() => Promise.resolve(ThemeToggleContent), {
  ssr: false,
  loading: () => <div className="w-9 h-9" />
});
