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
import React from "react";
import LihatSupplier from "./LihatSupplier";

function TableSupplier({ keyword, token }: { keyword: string; token: string }) {
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

  if (error) {
    if (error.statusCode === 401) return <ForceClose />;

    return <div>{error.message}</div>;
  }

  if (isLoading)
    return <div className="text-sm text-gray-500">Data tidak ditemukan</div>;

  if (!data) return null;
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Kode</TableHead>
            <TableHead>Nama Supplier</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead>Alamat</TableHead>
            <TableHead>No. Hp / WA</TableHead>
            <TableHead>Contact Person</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.kode}</TableCell>
                <TableCell>{item.nama}</TableCell>
                <TableCell>{item.kategori}</TableCell>
                <TableCell>{item.alamat}</TableCell>
                <TableCell>{item.noHp}</TableCell>
                <TableCell>{item.contactPerson}</TableCell>
                <TableCell className="flex items-center gap-x-4">
                  <LihatSupplier data={item} />
                  {/* <UpdateKaryawan data={item} token={token} query="karyawan" /> */}
                  {/* <DeleteKaryawan data={item} token={token} /> */}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>Data Kosong</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default TableSupplier;
