"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import React from "react";
import { BsMoon, BsSun } from "react-icons/bs";

export const ThemeSwitcher = ({ className = "" }) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <button
      name="theme-switcher"
      type="button"
      className={`w-fit p-2 rounded-md hover:scale-110 active:scale-100 duration-200 text-zinc-900 dark:text-slate-200 text-2xl font-bold ${className}`}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" ? <BsMoon /> : <BsSun />}
    </button>
  );
};
