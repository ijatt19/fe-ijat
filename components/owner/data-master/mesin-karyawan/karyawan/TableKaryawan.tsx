"use client";

import ForceClose from "@/components/ForceClose";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDebounce } from "@/hooks/useDebounce";
import { getAllKaryawan } from "@/services/karyawan.service";
import { ErrorResponse, Karyawan } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import LihatKaryawan from "./LihatKaryawan";
import UpdateKaryawan from "./UpdateKaryawan";
import DeleteKaryawan from "./DeleteKaryawan";
import { SortIcon } from "@/components/sort-icon";
import { useMemo, useState } from "react";

type SortField = "nama" | "noHp" | "jabatan";
type SortOrder = "asc" | "desc";

function TableKaryawan({ keyword, token }: { keyword: string; token: string }) {
  const [sortField, setSortField] = useState<SortField>("nama");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  
  const debouncedKeyword = useDebounce(keyword, 300);
  const { data, isLoading, error } = useQuery<Karyawan[], ErrorResponse>({
    queryKey: ["karyawan", debouncedKeyword],
    queryFn: async () => {
      const res = await getAllKaryawan(token, debouncedKeyword);

      if (!res.success || !("data" in res)) throw res;

      return res.data;
    },
    retry: false,
  });

  // Sort data
  const sortedData = useMemo(() => {
    if (!data) return [];
    
    return [...data].sort((a, b) => {
      let aVal: string;
      let bVal: string;
      
      if (sortField === "nama") {
        aVal = `${a.namaDepan} ${a.namaBelakang}`.toLowerCase();
        bVal = `${b.namaDepan} ${b.namaBelakang}`.toLowerCase();
      } else if (sortField === "noHp") {
        aVal = a.noHp.toLowerCase();
        bVal = b.noHp.toLowerCase();
      } else {
        aVal = a.jabatan.toLowerCase();
        bVal = b.jabatan.toLowerCase();
      }
      
      if (sortOrder === "asc") {
        return aVal.localeCompare(bVal);
      } else {
        return bVal.localeCompare(aVal);
      }
    });
  }, [data, sortField, sortOrder]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  if (error) {
    if (error.statusCode === 401) return <ForceClose />;

    return (
      <div className="flex items-center justify-center py-12 px-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-slate-600">{error.message}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="animate-pulse">
          <div className="h-12 bg-slate-100" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 p-4 border-t border-slate-100">
              <div className="h-4 bg-slate-200 rounded w-12" />
              <div className="h-4 bg-slate-200 rounded w-32" />
              <div className="h-4 bg-slate-200 rounded w-28" />
              <div className="h-4 bg-slate-200 rounded w-40" />
              <div className="h-4 bg-slate-200 rounded w-20" />
              <div className="h-4 bg-slate-200 rounded w-20 ml-auto" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!data) return null;

  const getJabatanBadge = (jabatan: string) => {
    const colorMap: Record<string, string> = {
      'operator': 'bg-blue-50 text-blue-700',
      'supervisor': 'bg-purple-50 text-purple-700',
      'admin': 'bg-emerald-50 text-emerald-700',
      'manager': 'bg-amber-50 text-amber-700',
    };
    const colorClass = colorMap[jabatan.toLowerCase()] || 'bg-slate-100 text-slate-700';
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${colorClass}`}>
        {jabatan}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 hover:bg-slate-50">
            <TableHead className="font-semibold text-slate-700 w-16">ID</TableHead>
            <TableHead 
              className="font-semibold text-slate-700 cursor-pointer select-none hover:bg-slate-100 transition-colors"
              onClick={() => handleSort("nama")}
            >
              <div className="flex items-center gap-2">
                Nama
                <SortIcon isActive={sortField === "nama"} sortOrder={sortOrder} />
              </div>
            </TableHead>
            <TableHead 
              className="font-semibold text-slate-700 cursor-pointer select-none hover:bg-slate-100 transition-colors"
              onClick={() => handleSort("noHp")}
            >
              <div className="flex items-center gap-2">
                No HP
                <SortIcon isActive={sortField === "noHp"} sortOrder={sortOrder} />
              </div>
            </TableHead>
            <TableHead className="font-semibold text-slate-700">Alamat</TableHead>
            <TableHead 
              className="font-semibold text-slate-700 cursor-pointer select-none hover:bg-slate-100 transition-colors"
              onClick={() => handleSort("jabatan")}
            >
              <div className="flex items-center gap-2">
                Jabatan
                <SortIcon isActive={sortField === "jabatan"} sortOrder={sortOrder} />
              </div>
            </TableHead>
            <TableHead className="font-semibold text-slate-700 text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData && sortedData.length > 0 ? (
            sortedData.map((item, index) => (
              <TableRow 
                key={index}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <TableCell className="font-mono text-sm text-slate-500">
                  #{item.id}
                </TableCell>
                <TableCell className="max-w-[200px]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                      {item.namaDepan.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-slate-900 truncate">
                      {item.namaDepan} {item.namaBelakang}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-slate-600 max-w-[130px] truncate">
                  {item.noHp}
                </TableCell>
                <TableCell className="text-slate-600 max-w-[200px] truncate">
                  {item.alamat}
                </TableCell>
                <TableCell>
                  {getJabatanBadge(item.jabatan)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-1">
                    <LihatKaryawan data={item} />
                    <UpdateKaryawan data={item} token={token} query="karyawan" />
                    <DeleteKaryawan data={item} token={token} />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6}>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 mb-4">
                    <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="text-slate-500 font-medium">Belum ada data karyawan</p>
                  <p className="text-slate-400 text-sm mt-1">Klik tombol &quot;Tambah&quot; untuk menambahkan karyawan baru</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      </div>
    </div>
  );
}

export default TableKaryawan;
