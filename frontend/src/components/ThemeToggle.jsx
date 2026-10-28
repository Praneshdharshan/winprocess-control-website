import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";
  return (
    <button
      data-testid="theme-toggle"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className={`relative flex h-9 w-16 items-center rounded-full border border-border bg-muted p-1 transition-colors hover:border-primary/60 ${className}`}
    >
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full bg-card shadow-sm transition-transform duration-300 ${dark ? "translate-x-7" : "translate-x-0"}`}
      >
        {dark ? <Moon className="h-4 w-4 text-primary" /> : <Sun className="h-4 w-4 text-amber-500" />}
      </span>
    </button>
  );
}
