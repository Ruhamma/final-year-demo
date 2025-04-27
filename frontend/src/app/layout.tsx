import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import RootStyleRegistry from "./mantine";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const playfairDisplay =Playfair_Display({
  variable: "--font-Playfair_Display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kuru",
  description: "Kuru - A local artist online marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} antialiased`}
      >
        <RootStyleRegistry>{children}</RootStyleRegistry>
      </body>
    </html>
  );
}
