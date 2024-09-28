import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import Header from "@/components/Header";
import Provider from "./provider";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";

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
  title: "Tasveer AI - Generate Images for FREE",
  description:
    "Generate stunning images from text using AI models for free with Tasveer AI. Turn your ideas into visual art instantly.",
  openGraph: {
    title: "Tasveer AI - Generate Images for FREE",
    description: "Turn your text into images with our free AI-powered tool",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tasveer AI - Generate Images for FREE",
    description: "Turn your text into images with our free AI-powered tool",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Provider>
            <Header />
            {children}
            <Toaster />
            <Footer />
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
