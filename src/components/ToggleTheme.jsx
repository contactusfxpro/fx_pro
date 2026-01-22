import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
const trackEvent = (name, params = {}) => {
  if (window.gtag) {
    window.gtag("event", name, params);
  }
};
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
       onClick={() => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    trackEvent("theme_toggled", {
      mode: nextTheme
    });

    toggleTheme();
  }}
      aria-label="Toggle theme"
      className="text-gray-700 border border-gray-300 dark:border-none bg-white dark:text-white  p-2 rounded-full dark:bg-gray-700 cursor-pointer"
    >
      {theme === "dark" ? (
        <Sun size={22} />
      ) : (
        <Moon size={22} />
      )}
    </button>
  );
};

export default ThemeToggle;
