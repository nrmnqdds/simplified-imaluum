import { ThemeProvider } from "../context/theme-provider";
import { CookiesProvider } from "../context/cookies-provider";
import ScheduleProvider from "../context/schedule-provider";
import { Inter } from "next/font/google";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard | Simplified i-Ma'luum",
  description: "Personal dashboard, only what you need to know.",
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ScheduleProvider>
            <CookiesProvider>{children}</CookiesProvider>
          </ScheduleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default DashboardLayout;
