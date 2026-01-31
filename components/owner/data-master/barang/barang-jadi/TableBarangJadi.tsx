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

function TableBarangJadi({
  token,
  keyword,
}: {
  token: string;
  keyword: string;
}) {
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

  if (error) {
    if (error.statusCode === 401) return <ForceClose />;

    return <div>{error.message}</div>;
  }

  if (isLoading)
    return <div className="text-sm text-gray-500">Data tidak ditemukan</div>;

  if (!data) return null;

  console.log(data);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Kode Barang</TableHead>
            <TableHead>Nama Barang</TableHead>
            <TableHead>Total Terjual</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.kode}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>0</TableCell>
                <TableCell className="flex items-center gap-x-4">
                  <LihatBarangJadi data={item} />
                  <UpdateBarangJadi
                    data={item}
                    token={token}
                    query="barang-jadi"
                  />
                  <DeleteBarangJadi data={item} token={token} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>Data Kosong</TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell>0</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export default TableBarangJadi;
