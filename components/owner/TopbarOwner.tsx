"use client";

import { ChevronDown, LogOut } from "lucide-react";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { api } from "@/lib/axios";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

function TopbarOwner() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const navList = [
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
        { name: "Barang", location: "/" },
        { name: "Mesin & Karyawan", location: "/" },
        { name: "Supplier", location: "/" },
        { name: "Akun", location: "/" },
      ],
    },
    { location: "/", name: "Konten Website", imagePath: "/konten.svg" },
    { location: "/", name: "Pengaturan", imagePath: "/setting.svg" },
  ];

  const logoutHandler = async () => {
    try {
      const response = await api.patch("/auth/logout", null, {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      });

      toast.success(response.data.message);
      await signOut({ redirect: true, redirectTo: "/" });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);

        toast.error(error?.response?.data?.message);
        return;
      }
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }
    }
  };

  return (
    <>
      {/* Header Tetap */}
      <div className=" xl:hidden fixed top-0 w-full shadow flex items-center justify-between p-4 z-50 bg-white">
        <div className="flex items-center">
          <img src="/logo.svg" alt="logo" className="w-8 h-8 md:w-12 md:h-12" />
        </div>
        <div className="font-semibold text-lg">Sistem Operasional</div>
        <div
          className="flex flex-col gap-y-1 w-6 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="w-full h-0.5 bg-black rounded-full"></span>
          <span className="w-full h-0.5 bg-black rounded-full"></span>
          <span className="w-full h-0.5 bg-black rounded-full"></span>
        </div>
      </div>

      {isOpen && (
        <div className=" xl:hidden z-40 fixed top-16 md:top-20 right-0 left-0 bottom-0 w-full max-h-screen flex animate-in fade-in slide-in-from-right-10 duration-200">
          <div
            className="w-1/2 bg-black/40"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="w-1/2 bg-white overflow-y-auto flex flex-col justify-between">
            <div>
              {navList.map((item, index) => {
                if (item.children) {
                  return (
                    <Collapsible
                      key={index}
                      className="group/collapsible border-b"
                    >
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-gray-50 text-left">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.imagePath}
                            alt=""
                            className="w-5 h-5"
                          />
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <div className="bg-gray-50 flex flex-col">
                          {item.children.map((child, childIndex) => (
                            <Link
                              onClick={() => setIsOpen(false)}
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
                      onClick={() => setIsOpen(false)}
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
              disabled={status === "loading"}
            >
              <LogOut className="w-5" />
              {status === "loading" ? "..." : "Keluar"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default TopbarOwner;
