import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bhanu — Software Engineer",
  description:
    "Software engineer building cloud platforms, slick interfaces, and the wiring in between.",
  icons: { icon: "/assets/monogram.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} density-roomy`}>
      <body>{children}</body>
    </html>
  );
}
