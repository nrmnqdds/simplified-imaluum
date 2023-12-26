import "./globals.css";
import { Poppins } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/context/ThemeProvider";
import { QueryProvider } from "@/context/QueryProvider";
import { Metadata } from "next";

const poppins = Poppins({ subsets: ["latin"], weight: "400", display: "swap" });

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
      <body className={poppins.className}>
        <Script
          src="https://beamanalytics.b-cdn.net/beam.min.js"
          data-token="09a05d6b-9ccf-4902-8ad0-e623689d586a"
          async
        />
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
