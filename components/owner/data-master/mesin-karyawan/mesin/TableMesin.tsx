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
import { getAllMesin } from "@/services/mesin.service";
import { ErrorResponse, Mesin, StatusMesin } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import LihatMesin from "./LihatMesin";
import UpdateMesin from "./UpdateMesin";
import DeleteMesin from "./DeleteMesin";
import { SortIcon } from "@/components/sort-icon";
import { useMemo, useState } from "react";

type SortField = "kode" | "nama" | "merk" | "status";
type SortOrder = "asc" | "desc";

function TableMesin({ keyword, token }: { keyword: string; token: string }) {
  const [sortField, setSortField] = useState<SortField>("nama");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  
  const debouncedKeyword = useDebounce(keyword, 300);
  const { data, isLoading, error } = useQuery<Mesin[], ErrorResponse>({
    queryKey: ["mesin", debouncedKeyword],
    queryFn: async () => {
      const res = await getAllMesin(token, debouncedKeyword);

      if (!res.success || !("data" in res)) throw res;

      return res.data;
    },
    retry: false,
  });

  // Sort data
  const sortedData = useMemo(() => {
    if (!data) return [];
    
    return [...data].sort((a, b) => {
      const aVal = a[sortField].toLowerCase();
      const bVal = b[sortField].toLowerCase();
      
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

  const getStatusBadge = (status: StatusMesin) => {
    const statusMap: Record<StatusMesin, { color: string; label: string }> = {
      [StatusMesin.AKTIF]: { color: 'bg-emerald-50 text-emerald-700', label: 'Aktif' },
      [StatusMesin.MAINTENANCE]: { color: 'bg-amber-50 text-amber-700', label: 'Maintenance' },
      [StatusMesin.RUSAK]: { color: 'bg-red-50 text-red-700', label: 'Rusak' },
    };
    const config = statusMap[status] || { color: 'bg-slate-100 text-slate-700', label: status };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${config.color}`}>
        {config.label}
      </span>
    );
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
              <div className="h-4 bg-slate-200 rounded w-16" />
              <div className="h-4 bg-slate-200 rounded w-32" />
              <div className="h-4 bg-slate-200 rounded w-24" />
              <div className="h-4 bg-slate-200 rounded w-20" />
              <div className="h-4 bg-slate-200 rounded w-20 ml-auto" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 hover:bg-slate-50">
            <TableHead 
              className="font-semibold text-slate-700 cursor-pointer select-none hover:bg-slate-100 transition-colors"
              onClick={() => handleSort("kode")}
            >
              <div className="flex items-center gap-2">
                Kode
                <SortIcon isActive={sortField === "kode"} sortOrder={sortOrder} />
              </div>
            </TableHead>
            <TableHead 
              className="font-semibold text-slate-700 cursor-pointer select-none hover:bg-slate-100 transition-colors"
              onClick={() => handleSort("nama")}
            >
              <div className="flex items-center gap-2">
                Nama Mesin
                <SortIcon isActive={sortField === "nama"} sortOrder={sortOrder} />
              </div>
            </TableHead>
            <TableHead 
              className="font-semibold text-slate-700 cursor-pointer select-none hover:bg-slate-100 transition-colors"
              onClick={() => handleSort("merk")}
            >
              <div className="flex items-center gap-2">
                Merk
                <SortIcon isActive={sortField === "merk"} sortOrder={sortOrder} />
              </div>
            </TableHead>
            <TableHead className="font-semibold text-slate-700">Kapasitas</TableHead>
            <TableHead 
              className="font-semibold text-slate-700 cursor-pointer select-none hover:bg-slate-100 transition-colors"
              onClick={() => handleSort("status")}
            >
              <div className="flex items-center gap-2">
                Status
                <SortIcon isActive={sortField === "status"} sortOrder={sortOrder} />
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
                <TableCell className="font-mono text-sm text-slate-600">
                  {item.kode}
                </TableCell>
                <TableCell className="max-w-[180px]">
                  <span className="font-medium text-slate-900 block truncate">{item.nama}</span>
                </TableCell>
                <TableCell className="text-slate-600 max-w-[140px] truncate">
                  {item.merk}
                </TableCell>
                <TableCell className="text-slate-600">
                  {item.kapasitasCetak}
                </TableCell>
                <TableCell>
                  {getStatusBadge(item.status)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-1">
                    <LihatMesin data={item} />
                    <UpdateMesin data={item} token={token} query="mesin" />
                    <DeleteMesin data={item} token={token} />
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="text-slate-500 font-medium">Belum ada data mesin</p>
                  <p className="text-slate-400 text-sm mt-1">Klik tombol &quot;Tambah&quot; untuk menambahkan mesin baru</p>
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

export default TableMesin;