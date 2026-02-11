"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function NavDataMaster() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  
  const tabs = [
    {
      label: "Barang Jadi",
      href: "/data-master/barang-jadi",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      label: "Bahan Mentah",
      href: "/data-master/bahan-mentah",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="inline-flex p-1 bg-slate-100 rounded-xl gap-1">
      {tabs.map((item, index) => {
        const active = isActive(item.href);
        return (
          <Link
            key={index}
            href={item.href}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
              ${active 
                ? "bg-white text-slate-900 shadow-sm" 
                : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
              }
            `}
          >
            <span className={active ? "text-blue-600" : "text-slate-400"}>
              {item.icon}
            </span>
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}

export default NavDataMaster;
