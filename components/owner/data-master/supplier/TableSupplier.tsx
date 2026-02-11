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
import { getAllSupplier } from "@/services/supplier.service";
import { ErrorResponse, Supplier } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import LihatSupplier from "./LihatSupplier";
import UpdateSupplier from "./UpdateSupplier";
import DeleteSupplier from "./DeleteSupplier";
import { SortIcon } from "@/components/sort-icon";
import { useMemo, useState } from "react";

type SortField = "nama" | "kategori" | "contactPerson" | "noHp";
type SortOrder = "asc" | "desc";

function TableSupplier({ keyword, token }: { keyword: string; token: string }) {
  const [sortField, setSortField] = useState<SortField>("nama");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  
  const debouncedKeyword = useDebounce(keyword, 300);
  const { data, isLoading, error } = useQuery<Supplier[], ErrorResponse>({
    queryKey: ["supplier", debouncedKeyword],
    queryFn: async () => {
      const res = await getAllSupplier(token, debouncedKeyword);

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

  const renderKategoriBadges = (kategoriString: string) => {
    // Split by comma and trim each category
    const categories = kategoriString.split(',').map(k => k.trim()).filter(k => k);
    
    return (
      <div className="flex flex-wrap gap-1 max-w-[150px]">
        {categories.map((kategori, idx) => (
          <span 
            key={idx}
            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700"
          >
            {kategori}
          </span>
        ))}
      </div>
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
              <div className="h-4 bg-slate-200 rounded w-20" />
              <div className="h-4 bg-slate-200 rounded w-40" />
              <div className="h-4 bg-slate-200 rounded w-24" />
              <div className="h-4 bg-slate-200 rounded w-28" />
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
            <TableHead className="font-semibold text-slate-700">Kode</TableHead>
            <TableHead 
              className="font-semibold text-slate-700 cursor-pointer select-none hover:bg-slate-100 transition-colors"
              onClick={() => handleSort("nama")}
            >
              <div className="flex items-center gap-2">
                Nama Supplier
                <SortIcon isActive={sortField === "nama"} sortOrder={sortOrder} />
              </div>
            </TableHead>
            <TableHead 
              className="font-semibold text-slate-700 cursor-pointer select-none hover:bg-slate-100 transition-colors"
              onClick={() => handleSort("kategori")}
            >
              <div className="flex items-center gap-2">
                Kategori
                <SortIcon isActive={sortField === "kategori"} sortOrder={sortOrder} />
              </div>
            </TableHead>
            <TableHead className="font-semibold text-slate-700">Alamat</TableHead>
            <TableHead 
              className="font-semibold text-slate-700 cursor-pointer select-none hover:bg-slate-100 transition-colors"
              onClick={() => handleSort("noHp")}
            >
              <div className="flex items-center gap-2">
                No HP/WA
                <SortIcon isActive={sortField === "noHp"} sortOrder={sortOrder} />
              </div>
            </TableHead>
            <TableHead 
              className="font-semibold text-slate-700 cursor-pointer select-none hover:bg-slate-100 transition-colors"
              onClick={() => handleSort("contactPerson")}
            >
              <div className="flex items-center gap-2">
                Contact Person
                <SortIcon isActive={sortField === "contactPerson"} sortOrder={sortOrder} />
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
                <TableCell>
                  {renderKategoriBadges(item.kategori)}
                </TableCell>
                <TableCell className="text-slate-600 max-w-[180px] truncate">
                  {item.alamat}
                </TableCell>
                <TableCell className="text-slate-600 max-w-[130px] truncate">
                  {item.noHp}
                </TableCell>
                <TableCell className="text-slate-600 max-w-[140px] truncate">
                  {item.contactPerson}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-1">
                    <LihatSupplier data={item} />
                    <UpdateSupplier data={item} token={token} query="supplier" />
                    <DeleteSupplier data={item} token={token} />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7}>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 mb-4">
                    <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <p className="text-slate-500 font-medium">Belum ada data supplier</p>
                  <p className="text-slate-400 text-sm mt-1">Klik tombol &quot;Tambah&quot; untuk menambahkan supplier baru</p>
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

export default TableSupplier;
