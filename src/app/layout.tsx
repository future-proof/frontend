import type { Metadata } from "next";
import localFont from "next/font/local";
import "./app.css";
import "./globals.css";
import "@coinbase/onchainkit/styles.css";

import Providers from "@/components/providers";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});

const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#141414]`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
