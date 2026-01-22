"use client";
import { ChevronDown, LogOut } from "lucide-react";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { User } from "next-auth";
import { logout } from "@/services/logout.service";

interface SidebarOwnerProps {
  user?: User;
}

function SidebarOwner({ user }: SidebarOwnerProps) {
  const [loading, setLoading] = useState(false);
  const navList = [
    { location: "/dashboard", name: "Dashboard", imagePath: "/dashboard.svg" },
    {
      name: "Penjualan",
      imagePath: "/penjualan.svg",
      children: [
        { name: "Input Pesan baru", location: "/" },
        { name: "Riwayat Penjualan", location: "/" },
        { name: "Jadwal Pengiriman", location: "/" },
      ],
    },
    {
      name: "Produksi",
      imagePath: "/produksi.svg",
      children: [
        { name: "Laporan Produksi", location: "/" },
        { name: "Antrian SPK", location: "/" },
      ],
    },
    { location: "/", name: "Stok Gudang", imagePath: "/stock.svg" },
    { location: "/", name: "Pelanggan", imagePath: "/pelanggan.svg" },
    { location: "/", name: "Pesan Email", imagePath: "/email.svg" },
    {
      name: "Keuangan",
      imagePath: "/keuangan.svg",
      children: [
        { name: "Biaya Operasional", location: "/" },
        { name: "Arus Kas", location: "/" },
        { name: "Modal & Prive", location: "/" },
        { name: "Laporan Keuangan", location: "/" },
      ],
    },
    {
      name: "Data Master",
      imagePath: "/data-master.svg",
      children: [
        { name: "Barang", location: "/data-master/barang-jadi" },
        {
          name: "Mesin & Karyawan",
          location: "/data-master/karyawan",
        },
        { name: "Supplier", location: "/data-master/supplier" },
        { name: "Akun", location: "/data-master/akun" },
      ],
    },
    {
      location: "/konten-website",
      name: "Konten Website",
      imagePath: "/konten.svg",
    },
    { location: "/pengaturan", name: "Pengaturan", imagePath: "/setting.svg" },
  ];
  const logoutHandler = async () => {
    if (user?.token) {
      try {
        setLoading(true);
        const response = await logout(user.token);
        toast.success(response?.message);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    await signOut({ redirect: true, redirectTo: "/" });
  };
  return (
    <div className="hidden xl:block xl:fixed xl:top-0 xl:left-0 xl:w-1/5 xl:min-h-screen">
      <div className="overflow-y-auto flex flex-col justify-between h-screen w-full">
        <div>
          <div className="flex justify-center items-center p-4">
            <img src="/logo.svg" alt="logo" className="w-12" />
            <div className="text-center">
              <p>Sistem</p>
              <p>Operasional</p>
            </div>
          </div>
          {navList.map((item, index) => {
            if (item.children) {
              return (
                <Collapsible key={index} className="group/collapsible border-b">
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-gray-50 text-left">
                    <div className="flex items-center gap-3">
                      <img src={item.imagePath} alt="" className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <div className="bg-gray-50 flex flex-col">
                      {item.children.map((child, childIndex) => (
                        <Link
                          key={childIndex}
                          href={child.location}
                          className="pl-12 pr-4 py-3 text-sm text-gray-600 hover:text-black border-t border-gray-100"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              );
            }
            if (item.location) {
              return (
                <Link
                  key={index}
                  href={item.location}
                  className="flex items-center justify-between w-full p-4 border-b hover:bg-gray-50"
                >
                  <div className="flex items-center gap-2">
                    <img src={item.imagePath} alt="" className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                </Link>
              );
            }
          })}
        </div>

        <button
          onClick={logoutHandler}
          className="p-4 flex gap-x-2 items-center border-b w-full cursor-pointer hover:bg-gray-100"
          disabled={loading}
        >
          <LogOut className="w-5" />
          {loading ? "..." : "Keluar"}
        </button>
      </div>
    </div>
  );
}

export default SidebarOwner;
