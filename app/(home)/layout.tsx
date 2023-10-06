import { Poppins } from "next/font/google";
// import { ThemeProvider } from "./context/theme-provider";
// import { CookiesProvider } from "./context/cookies-provider";
// import ScheduleProvider from "./context/schedule-provider";
import { Metadata } from "next";
import SideNavbar from "@components/SideBar";
const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Dashboard | Simplified i-Ma'luum",
  description: "A simplified version of i-Ma'luum for students.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`flex min-h-screen bg-dotted-spacing-4 bg-dotted-slate-300 dark:bg-dotted-zinc-800 bg-slate-100 dark:bg-zinc-900 ${poppins.className}`}
      >
        <div>
          <SideNavbar />
        </div>

        <main className="w-full">{children}</main>
      </body>
    </html>
  );
}
