"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function NavDataMaster() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const tab = [
    {
      label: "Barang Jadi",
      href: "/data-master/barang-jadi",
    },
    {
      label: "Bahan Mentah",
      href: "/data-master/bahan-mentah",
    },
  ];
  return (
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
  );
}

export default NavDataMaster;
