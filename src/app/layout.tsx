import type { Metadata } from "next";
import { roboto } from '@/app/ui/fonts';
import "./globals.css";

export const metadata: Metadata = {
  title: "GS find",
  description: "Find your group",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>{children}</body>
    </html>
  );
}
