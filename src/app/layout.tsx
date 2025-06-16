import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SocialMediaSection from "@/components/SocialMediaSection";

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
      <body className={inter.className}>
       
        <main className="main-content">
          {children}
        </main>
        <SocialMediaSection />
      </body>
    </html>
  );
}
