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

function TableKaryawan({ keyword, token }: { keyword: string; token: string }) {
  const debouncedKeyword = useDebounce(keyword, 300);
  const { data, isLoading, error } = useQuery<Karyawan[], ErrorResponse>({
    queryKey: ["bahan-mentah", debouncedKeyword],
    queryFn: async () => {
      const res = await getAllKaryawan(token, debouncedKeyword);

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
            <TableHead>ID</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>No Hp</TableHead>
            <TableHead>Alamat</TableHead>
            <TableHead>Jabatan</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{`${item.namaDepan} ${item.namaBelakang}`}</TableCell>
                <TableCell>{item.noHp}</TableCell>
                <TableCell>{item.alamat}</TableCell>
                <TableCell>{item.jabatan}</TableCell>
                <TableCell className="flex items-center gap-x-4">
                  {/* <LihatBahanMentah data={item} /> */}
                  {/* <UpdateBahanMentah
                    data={item}
                    token={token}
                    query="bahan-mentah"
                  /> */}
                  {/* <DeleteBahanMentah data={item} token={token} /> */}
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

export default TableKaryawan;
