import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QX-Server-Engine | AI Trading Signals",
  description: "Real-time AI-powered trading signals for 100+ assets across all timeframes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-950 text-white">
        {children}
      </body>
    </html>
  );
}
