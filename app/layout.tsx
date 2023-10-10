import "./globals.css";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "./context/theme-provider";
import { CookiesProvider } from "./context/cookies-provider";
import ScheduleProvider from "./context/schedule-provider";
import { Metadata } from "next";
const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Login | Simplified i-Ma'luum",
  description: "A simplified version of i-Ma'luum for students.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <ScheduleProvider>
            <CookiesProvider>{children}</CookiesProvider>
          </ScheduleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
