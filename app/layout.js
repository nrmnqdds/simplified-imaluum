import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./context/theme-provider";
import { CookiesProvider } from "./context/cookies-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Login | Simplified i-Ma'luum",
  description: "A simplified version of i-Ma'luum for students.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CookiesProvider>{children}</CookiesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
