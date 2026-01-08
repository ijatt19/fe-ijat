"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function KontenWebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const tab = [
    {
      label: "Header",
      href: "/konten-website/header",
    },
    {
      label: "Body",
      href: "/konten-website/body",
    },
    {
      label: "Footer",
      href: "/konten-website/footer",
    },
  ];
  return (
    <div className="flex flex-col gap-y-8">
      <h1 className="text-2xl font-bold">Konten Website</h1>
      <div className="flex shadow rounded-full items-center justify-between gap-x-2">
        {tab.map((item, index) => {
          return (
            <Link
              key={index}
              href={item.href}
              className={`p-2 text-center w-full rounded-full ${
                isActive(item.href) && "bg-gray-200"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
      {children}
    </div>
  );
}
