import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SocialMediaSection from "@/components/SocialMediaSection";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Day and Night Space Foundation",
  description: "Welcome to Day and Night Space Foundation - Making space exploration accessible to everyone.",
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
