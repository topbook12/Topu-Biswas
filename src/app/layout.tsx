import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Topu Biswas | Full Stack Web Developer",
    template: "%s | Topu Biswas",
  },
  description: "Full Stack Web Developer specializing in building modern web experiences with React, Next.js, Node.js, and cutting-edge technologies.",
  keywords: ["Full Stack Developer", "Web Developer", "React", "Next.js", "TypeScript", "Node.js", "Portfolio", "Topu Biswas"],
  authors: [{ name: "Topu Biswas" }],
  creator: "Topu Biswas",
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://topubiswas.dev",
    siteName: "Topu Biswas Portfolio",
    title: "Topu Biswas | Full Stack Web Developer",
    description: "Full Stack Web Developer specializing in building modern web experiences with React, Next.js, Node.js, and cutting-edge technologies.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Topu Biswas | Full Stack Web Developer",
    description: "Full Stack Web Developer specializing in building modern web experiences with React, Next.js, Node.js, and cutting-edge technologies.",
    creator: "@topubiswas",
  },
  robots: {
    index: true,
    follow: true,
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        <ThemeProvider>
          {children}
          <Toaster position="bottom-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
