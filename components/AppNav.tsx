"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppNav() {
  const pathname = usePathname();

  const items = [
    {
      label: "Reconcile",
      href: "/reconcile",
      active:
        pathname === "/reconcile" ||
        pathname === "/",
    },
    {
      label: "Runs",
      href: "/runs",
      active:
        pathname === "/runs" ||
        pathname.startsWith("/runs/"),
    },
  ];

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-4">
        <Link
          href="/reconcile"
          className="text-lg font-bold tracking-tight text-gray-900"
        >
          StableRecon
        </Link>

        <nav className="flex items-center gap-1">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-150 ${
                item.active
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}