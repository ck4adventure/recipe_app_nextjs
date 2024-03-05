import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HeaderBar from "./ui/headerbar/header_bar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Christina's Corner",
  description: "Christina's Corner: Recipes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
		<HeaderBar />
		{children}
	  </body>
    </html>
  );
}
