import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RootStyleRegistry from "./mantine";
import { AuthProvider } from "@/context/AuthProvider";
import { Providers } from "@/store/provider";
import { routing } from "@/i18n/routing";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kuru",
  description: "Kuru - A local artist online marketplace",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
 params: { locale: string };
}>) {
    const locale = await params.locale; // 
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  await setRequestLocale(locale);

  const messages = await getMessages({ locale });
  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <NextIntlClientProvider
          messages={messages}
          timeZone="Africa/Addis_Ababa"
          locale={locale}
        >
        <Providers>
        <RootStyleRegistry>
          <AuthProvider>
            {children}
          </AuthProvider>
        </RootStyleRegistry>
        </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
