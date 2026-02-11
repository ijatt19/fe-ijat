"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { User, Globe } from "lucide-react";

export default function PengaturanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const tab = [
    {
      label: "Profil",
      href: "/pengaturan/profil",
      icon: User,
    },
    {
      label: "Global",
      href: "/pengaturan/global",
      icon: Globe,
    },
  ];
  return (
    <div className="flex flex-col gap-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Pengaturan</h1>
        <p className="text-sm text-slate-500 mt-1">Kelola profil dan preferensi akun Anda</p>
      </div>
      <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
        {tab.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center justify-center gap-2 p-2.5 text-sm font-medium text-center w-full rounded-lg transition-all ${
                isActive(item.href)
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </div>
      {children}
    </div>
  );
}
