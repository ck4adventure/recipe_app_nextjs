import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import HeaderBar from "./ui/headerbar/header_bar";
import { UserProvider } from '@auth0/nextjs-auth0/client';
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
			{/* The authentication state exposed by UserProvider can be accessed in any Client Component using the useUser() hook. */}
			<UserProvider>
				<body className={`${montserrat.className}`} id="corner_root">
					<HeaderBar />
					{children}
				</body>
			</UserProvider>
    </html >
  );
}
