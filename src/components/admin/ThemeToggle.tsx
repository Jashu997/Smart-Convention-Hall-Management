"use client";

import { Moon, Sun } from "lucide-react";

type ThemeToggleProps = {
  theme: "dark" | "light";
  onToggle: () => void;
};

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`flex h-11 w-11 items-center justify-center rounded-2xl border transition hover:-translate-y-0.5 ${
        theme === "dark"
          ? "border-white/10 bg-slate-800/80 text-slate-100"
          : "border-slate-200 bg-slate-50 text-slate-700"
      }`}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
