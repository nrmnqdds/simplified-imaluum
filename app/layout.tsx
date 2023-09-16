import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./context/theme-provider";
import { CookiesProvider } from "./context/cookies-provider";
import ScheduleProvider from "./context/schedule-provider";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simplified i-Ma'luum",
  description: "A simplified version of i-Ma'luum for students.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
}
