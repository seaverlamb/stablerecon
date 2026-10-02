"use client";

import { usePathname } from "next/navigation";
import AppNav from "@/components/AppNav";

export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isProductRoute =
    pathname === "/reconcile" ||
    pathname === "/runs" ||
    pathname.startsWith("/runs/");

  return (
    <>
      {isProductRoute && <AppNav />}
      {children}
    </>
  );
}