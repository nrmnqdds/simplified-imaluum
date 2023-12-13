import "./globals.css";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "../context/ThemeProvider";
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
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
