"use client";

import { BsSun, BsMoon } from "react-icons/bs";

export const ThemeSwitcher = ({ className = "", toggleTheme, theme }) => {
  return (
    <button
      className={`w-fit p-2 rounded-md hover:scale-110 active:scale-100 duration-200 text-zinc-900 dark:text-slate-200 text-2xl font-bold ${className}`}
      onClick={toggleTheme} // Use the toggleTheme function
    >
      {theme === "light" ? <BsMoon /> : <BsSun />}
    </button>
  );
};
