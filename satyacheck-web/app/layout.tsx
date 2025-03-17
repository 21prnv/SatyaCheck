import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Satyacheck AI - Combat Political Misinformation in India",
  description:
    "Real-time political propaganda detection to combat misinformation in India's online landscape",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Script
              defer
              data-domain="satya-check.vercel.app" // Replace with your domain
              src="https://analytics-code.vercel.app/tracking-script.js"
          />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
