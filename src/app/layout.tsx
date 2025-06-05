import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  metadataBase: new URL('https://localhost'),
  title: "MindMuscle.AI | AI-Powered Fitness",
  description: "AI-driven workout generator and progress tracker—launching Summer 2025.",
  openGraph: {
    title: "MindMuscle.AI | AI-Powered Fitness",
    description: "AI-driven workout generator and progress tracker—launching Summer 2025.",
    url: "https://localhost",
    siteName: "MindMuscle.AI",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "MindMuscle.AI - AI-Powered Fitness",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MindMuscle.AI | AI-Powered Fitness",
    description: "AI-driven workout generator and progress tracker—launching Summer 2025.",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-dark-bg text-white antialiased`} suppressHydrationWarning={true}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
