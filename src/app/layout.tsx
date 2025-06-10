import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import HeaderBar from "./_ui/headerbar/header_bar_new";
import Providers from "./providers";
import FooterBar from "./_ui/footerbar/footer_bar";
import { Analytics } from "@vercel/analytics/next"



const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Christina's Corner",
	description: "App for recipe management and product labeling",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {


	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/app/favicon.ico" type="image/x-icon" />
				{/* Add other meta tags or links here if needed */}
			</head>
			<body className={`${montserrat.className}`} id="corner_root">
				{/* <AppRouterCacheProvider options={{ enableCssLayer: true }}> */}
				<AppRouterCacheProvider >
					<Providers>
						<HeaderBar />
						{children}
						<FooterBar />
						<Analytics />
					</Providers>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
}