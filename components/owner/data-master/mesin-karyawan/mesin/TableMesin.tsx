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
import { ErrorResponse, Mesin } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import LihatMesin from "./LihatMesin";
import UpdateMesin from "./UpdateMesin";
import DeleteMesin from "./DeleteMesin";

function TableMesin({ keyword, token }: { keyword: string; token: string }) {
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
            <TableHead>Nama Mesin</TableHead>
            <TableHead>Merk</TableHead>
            <TableHead>Spesifikasi</TableHead>
            <TableHead>Kapasitas (Sekali Cetak)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.kode}</TableCell>
                <TableCell>{item.nama}</TableCell>
                <TableCell>{item.merk}</TableCell>
                <TableCell>{item.spesifikasi}</TableCell>
                <TableCell>
                  {item.kapasitasCetak.replace(/\.?0+$/, "")}
                </TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell className="flex items-center gap-x-4">
                  <LihatMesin data={item} />
                  <UpdateMesin data={item} token={token} query="mesin" />
                  <DeleteMesin data={item} token={token} />
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

export default TableMesin;
