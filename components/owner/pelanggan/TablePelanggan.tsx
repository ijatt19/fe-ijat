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
import { getAllPelanggan } from "@/services/pelanggan.service";
import { ErrorResponse, Pelanggan } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import LihatPelanggan from "./LihatPelanggan";
import UpdatePelanggan from "./UpdatePelanggan";

function TablePelanggan({
  keyword,
  token,
}: {
  keyword: string;
  token: string;
}) {
  const debouncedKeyword = useDebounce(keyword, 300);
  const { data, isLoading, error } = useQuery<Pelanggan[], ErrorResponse>({
    queryKey: ["pelanggan", debouncedKeyword],
    queryFn: async () => {
      const res = await getAllPelanggan(token, debouncedKeyword);

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
            <TableHead>No</TableHead>
            <TableHead>Nama Pelanggan</TableHead>
            <TableHead>No. Hp / WA</TableHead>
            <TableHead>Alamat</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{`${item.namaDepan} ${item.namaBelakang}`}</TableCell>
                <TableCell>{item.noHp}</TableCell>
                <TableCell>{item.alamat}</TableCell>
                <TableCell className="flex items-center gap-x-4">
                  <LihatPelanggan data={item} />
                  <UpdatePelanggan
                    data={item}
                    token={token}
                    query="pelanggan"
                  />
                  {/* <DeleteSupplier data={item} token={token} /> */}
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

export default TablePelanggan;
