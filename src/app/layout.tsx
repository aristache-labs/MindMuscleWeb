import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DefaultSeo } from "next-seo";
import seoConfig from "./seo.config";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "YourAppName | AI-Powered Fitness",
  description: "AI-driven workout generator and progress tracker—launching Summer 2025.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-dark-bg text-white antialiased`}>
        <DefaultSeo {...seoConfig} />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
