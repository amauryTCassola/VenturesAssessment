import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ventures Assessment",
  description: "Techinal test for the Ventures job offer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
