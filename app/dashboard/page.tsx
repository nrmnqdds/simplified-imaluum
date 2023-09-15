"use client";

import Advertisement from "../../components/Advertisements";
import Disciplinary from "../../components/Disciplinary";
import { ThemeSwitcher } from "../../components/ThemeSwitcher";
import TimeTable from "../../components/TimeTable";
import UserID from "../../components/UserID";
import { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles"; // Import MUI ThemeProvider and createTheme
import CssBaseline from "@mui/material/CssBaseline";
import { PaletteMode } from "@mui/material";
import { useTheme } from "next-themes";

const Page = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [theme2, setTheme2] = useState<PaletteMode>(
    theme === "dark" ? "dark" : "light"
  );
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const muiTheme = createTheme({
    palette: {
      mode: theme2,
    },
  });

  const toggleTheme = () => {
    setTheme2((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <div className="min-w-screen min-h-screen bg-slate-100 dark:bg-zinc-900 flex">
        {/* <div className="flex justify-end">
          
        </div> */}
        <div className="w-full flex flex-col p-5  gap-5">
          <div className="flex flex-row justify-between items-center">
            <ThemeSwitcher toggleTheme={toggleTheme} theme={theme2} />
            <h1 className="font-bold text-4xl text-zinc-600 dark:text-zinc-400">
              Dashboard
            </h1>
            <UserID />
          </div>

          <div className="h-full grid grid-cols-2 grid-rows-2 gap-2">
            <Disciplinary className={"bg-yellow-500 rounded-2xl"} />
            <Disciplinary className={"bg-yellow-500 rounded-2xl"} />
            <Disciplinary className={"bg-yellow-500 rounded-2xl"} />
            <Disciplinary className={"bg-yellow-500 rounded-2xl"} />
          </div>
          <Advertisement className={"w-full h-[35%] flex flex-col"} />
        </div>
        {/* <div className="w-[40%] dark:bg-zinc-950 bg-slate-50 p-5">
          
          <TimeTable />
        </div> */}
      </div>
    </ThemeProvider>
  );
};

export default Page;
