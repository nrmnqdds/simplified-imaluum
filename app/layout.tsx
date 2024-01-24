import { QueryProvider } from "@/context/QueryProvider";
import { ThemeProvider } from "@/context/ThemeProvider";
import { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: "400", display: "swap" });

export const metadata: Metadata = {
  title: "Simplified i-Ma'luum",
  description: "A simplified version of i-Ma'luum for students.",
  metadataBase: new URL("https://imaluum.nrmnqdds.com/"),
  openGraph: {
    type: "website",
    url: "https://imaluum.nrmnqdds.com",
    title: "Simplified i-Ma'luum",
    description: "A simplified version of i-Ma'luum for students.",
    siteName: "Simplified i-Ma'luum",
    images: [
      {
        url: "https://opengraph.b-cdn.net/production/documents/48b8d2e9-05b8-4031-a6df-d9f67c593a12.png?token=FYcQmGL_FJVfTNVPl0p3ZLE_BIL6mV2ov1UcB79F1yg&height=591&width=1200&expires=33242072632",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@nrmnqdds",
    creator: "@nrmnqdds",
    title: "Simplified i-Ma'luum",
    description: "A simplified version of i-Ma'luum for students.",
    images:
      "https://opengraph.b-cdn.net/production/documents/48b8d2e9-05b8-4031-a6df-d9f67c593a12.png?token=FYcQmGL_FJVfTNVPl0p3ZLE_BIL6mV2ov1UcB79F1yg&height=591&width=1200&expires=33242072632",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`scroll-smooth scrollbar-hide ${poppins.className}`}>
        <Script
          src="https://beamanalytics.b-cdn.net/beam.min.js"
          data-token="09a05d6b-9ccf-4902-8ad0-e623689d586a"
          async
        />
        <Script src="https://webkeyz.github.io/stand-with-palestine/dist/stand-with-palestine-widget.js" />
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            {children}
            <Toaster />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
