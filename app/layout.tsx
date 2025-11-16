import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import NextTopLoader from "nextjs-toploader"
import DesignerContextProvider from "@/components/context/DesignerContext";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Graphos",
  description: "Create and distribute your forms for replies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>

    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextTopLoader/>
        <DesignerContextProvider>

        <ThemeProvider attribute={"class"} defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
        </ThemeProvider>
              
        </DesignerContextProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
