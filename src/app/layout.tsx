import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import HeaderBar from "./ui/headerbar/header_bar";
import Providers from "./providers";


const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Recipe Corner",
	description: "Christina's Corner: Recipes",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${montserrat.className}`} id="corner_root">
				<Providers>
					<HeaderBar />
					{children}
				</Providers>
			</body>
		</html>
	);
}