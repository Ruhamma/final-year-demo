import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import RootStyleRegistry from "./mantine";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const playfairDisplay = Playfair_Display({
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
        <Script
          id="mailchimp"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,h,i,m,p){
                m=c.createElement(h),
                p=c.getElementsByTagName(h)[0],
                m.async=1;
                m.src=i;
                p.parentNode.insertBefore(m,p);
              })(document,"script","https://chimpstatic.com/mcjs-connected/js/users/d312bde540fcea78419b5f39e/a2a4a819eaa3cc2feddf97b19.js");
            `,
          }}
        />
        <RootStyleRegistry>{children}</RootStyleRegistry>
      </body>
    </html>
  );
}
