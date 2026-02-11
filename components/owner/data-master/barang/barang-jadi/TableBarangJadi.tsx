"use client";

import ForceClose from "@/components/ForceClose";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllBarangJadi } from "@/services/barang-jadi.service";
import { BarangJadi, ErrorResponse } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import LihatBarangJadi from "./LihatBarangJadi";
import UpdateBarangJadi from "./UpdateBarangJadi";
import DeleteBarangJadi from "./DeleteBarangJadi";
import { useDebounce } from "@/hooks/useDebounce";
import { useMemo, useState } from "react";
import { SortIcon } from "@/components/sort-icon";

type SortField = "kode" | "name";
type SortOrder = "asc" | "desc";

function TableBarangJadi({
  token,
  keyword,
}: {
  token: string;
  keyword: string;
}) {
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  
  const debouncedKeyword = useDebounce(keyword, 300);
  const { data, isLoading, error } = useQuery<BarangJadi[], ErrorResponse>({
    queryKey: ["barang-jadi", debouncedKeyword],
    queryFn: async () => {
      const res = await getAllBarangJadi(token, debouncedKeyword);

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
              <div className="h-4 bg-slate-200 rounded w-20" />
              <div className="h-4 bg-slate-200 rounded w-40" />
              <div className="h-4 bg-slate-200 rounded w-16" />
              <div className="h-4 bg-slate-200 rounded w-20 ml-auto" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!data) return null;

  // Calculate total
  const totalTerjual = 0; // Placeholder - should be calculated from data

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
                Kode Barang
                <SortIcon isActive={sortField === "kode"} sortOrder={sortOrder} />
              </div>
            </TableHead>
            <TableHead 
              className="font-semibold text-slate-700 cursor-pointer select-none hover:bg-slate-100 transition-colors"
              onClick={() => handleSort("name")}
            >
              <div className="flex items-center gap-2">
                Nama Barang
                <SortIcon isActive={sortField === "name"} sortOrder={sortOrder} />
              </div>
            </TableHead>
            <TableHead className="font-semibold text-slate-700">Total Terjual</TableHead>
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
                <TableCell className="font-medium text-slate-900 max-w-[200px] truncate">
                  {item.name}
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                    0 terjual
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-1">
                    <LihatBarangJadi data={item} />
                    <UpdateBarangJadi
                      data={item}
                      token={token}
                      query="barang-jadi"
                    />
                    <DeleteBarangJadi data={item} token={token} />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 mb-4">
                    <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <p className="text-slate-500 font-medium">Belum ada data</p>
                  <p className="text-slate-400 text-sm mt-1">Klik tombol &quot;Tambah&quot; untuk menambahkan barang jadi baru</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        {sortedData && sortedData.length > 0 && (
          <TableFooter>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              <TableCell colSpan={2} className="font-semibold text-slate-700">
                Total Keseluruhan
              </TableCell>
              <TableCell className="font-semibold text-emerald-700">
                {totalTerjual} terjual
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
      </div>
    </div>
  );
}

export default TableBarangJadi;
