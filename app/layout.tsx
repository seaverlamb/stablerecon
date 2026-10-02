import type { Metadata } from "next";
import "./globals.css";

import AppNav from "@/components/AppNav";

export const metadata: Metadata = {
  title: "StableRecon",
  description:
    "Stablecoin reconciliation and exception management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <AppNav />

        {children}
      </body>
    </html>
  );
}