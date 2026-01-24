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
import { getAllAkun } from "@/services/akun.service";
import { Akun, ErrorResponse } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

function TableAkun({ keyword, token }: { keyword: string; token: string }) {
  const debouncedKeyword = useDebounce(keyword, 300);
  const { data, isLoading, error } = useQuery<Akun[], ErrorResponse>({
    queryKey: ["akun", debouncedKeyword],
    queryFn: async () => {
      const res = await getAllAkun(token, debouncedKeyword);

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
            <TableHead>No</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Nama Lengkap</TableHead>
            <TableHead>Level Akses (Role)</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.username}</TableCell>
                <TableCell>{`${item.namaDepan} ${item.namaBelakang}`}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell className="flex items-center gap-x-4">
                  {/* <LihatSupplier data={item} /> */}
                  {/* <UpdateSupplier data={item} token={token} query="supplier" /> */}
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

export default TableAkun;
