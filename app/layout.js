import localFont from "next/font/local";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import "./globals.css";
import connectDB from "@/libs/mongoose";
import config from "@/config";
import { NextAuthProvider } from "@/components/NextAuthProvider";
import { Toaster } from "react-hot-toast";

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

export const metadata = {
	title: config.siteTitle,
	description: config.siteDescription,
};

export default async function RootLayout({ children }) {
	try {
		await connectDB();
		console.info("MongoDB connected successfully!");
	} catch (error) {
		console.error("MongoDB connection error:", error);
	}

	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<NextAuthProvider>
					<Header />
					{children}
					<Footer />
					<Toaster
						position="top-right"
						toastOptions={{
							duration: 3000,
							style: {
								background: "#FFFFFF",
								color: "#374151",
								border: "1px solid #FDE68A",
							},
							success: {
								iconTheme: {
									primary: "#10B981",
									secondary: "#FFFFFF",
								},
							},
							error: {
								iconTheme: {
									primary: "#EF4444",
									secondary: "#FFFFFF",
								},
							},
						}}
					/>
				</NextAuthProvider>
			</body>
		</html>
	);
}
