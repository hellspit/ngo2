import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SocialMediaSection from "@/components/SocialMediaSection";
import Script from 'next/script';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Space Website",
  description: "Explore the wonders of space",
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      </head>
      <body className={inter.className}>
       
        <main className="main-content">
          {children}
        </main>
        <SocialMediaSection />
      </body>
    </html>
  );
}
