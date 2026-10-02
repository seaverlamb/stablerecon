import type { Metadata } from "next";
import "./globals.css";

import SiteChrome from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "StableRecon | Stablecoin Settlement Reconciliation",
  description:
    "Reconcile stablecoin settlement with internal financial records, investigate exceptions, and maintain an audit-ready resolution workflow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-950">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}