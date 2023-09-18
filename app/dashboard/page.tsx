"use client";

import { ThemeSwitcher } from "@components/ThemeSwitcher";
import UserID from "@components/UserID";
import HomePanel from "@components/panels/HomePanel";
import SchedulePanel from "@components/panels/SchedulePanel";
import { useState, useEffect, SyntheticEvent } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles"; // Import MUI ThemeProvider and createTheme
import CssBaseline from "@mui/material/CssBaseline";
import { PaletteMode } from "@mui/material";
import { useTheme } from "next-themes";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { BsGithub, BsFillArrowUpCircleFill } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Page = () => {
  const [mounted, setMounted] = useState(false);
  const [value, setValue] = useState(0);
  const [show, handleShow] = useState(false);
  const { theme, setTheme } = useTheme();
  const [theme2, setTheme2] = useState<PaletteMode>(
    theme === "dark" ? "dark" : "light"
  );

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
  });

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

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <div className="min-w-screen min-h-screen bg-slate-100 dark:bg-zinc-900 flex flex-col px-5">
        {show && (
          <div
            className="fixed bottom-10 right-10 z-20 text-zinc-900 dark:text-slate-100 cursor-pointer opacity-30 hover:opacity-80"
            onClick={scrollUp}
          >
            <BsFillArrowUpCircleFill size={50} />
          </div>
        )}
        <header className="flex justify-between items-center mb-0 py-2 border-b border-zinc-500">
          <ThemeSwitcher toggleTheme={toggleTheme} theme={theme2} />
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Home" {...a11yProps(0)} />
            <Tab label="Schedule" {...a11yProps(1)} />
            <Tab label="Coming Soon" {...a11yProps(2)} disabled />
          </Tabs>
          <UserID />
        </header>

        <CustomTabPanel value={value} index={0}>
          <HomePanel />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <SchedulePanel />
        </CustomTabPanel>
        <footer className="h-fit py-5 flex items-center justify-between border-t border-zinc-500 bg-slate-100 dark:bg-zinc-900">
          <div className="flex gap-5">
            <Image
              src="/logo-landing-page.png"
              alt=""
              width={50}
              height={50}
              className="object-contain"
            />
            <div>
              <h1 className="font-bold lg:text-2xl text-zinc-900 dark:text-slate-100">
                Simplified i-Ma&apos;luum
              </h1>
              <p className="text-xs lg:text-sm text-zinc-600 dark:text-zinc-400">
                A simplified version of i-Ma&apos;luum for students
              </p>
            </div>
          </div>

          <Link
            href="https://github.com/qryskalyst20/simplified-imaluum"
            target="_blank"
            className="flex flex-col gap-2 items-center"
          >
            <BsGithub className="text-3xl text-zinc-900 dark:text-slate-200" />
          </Link>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default Page;
