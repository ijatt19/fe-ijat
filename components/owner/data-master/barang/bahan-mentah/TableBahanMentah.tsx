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
import { getAllBahanMentah } from "@/services/bahan-mentah.service";
import { BahanMentah, ErrorResponse } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import LihatBahanMentah from "./LihatBahanMentah";
import UpdateBahanMentah from "./UpdateBahanMentah";
import DeleteBahanMentah from "./DeleteBahanMentah";

function TableBahanMentah({
  keyword,
  token,
}: {
  keyword: string;
  token: string;
}) {
  const debouncedKeyword = useDebounce(keyword, 300);
  const { data, isLoading, error } = useQuery<BahanMentah[], ErrorResponse>({
    queryKey: ["bahan-mentah", debouncedKeyword],
    queryFn: async () => {
      const res = await getAllBahanMentah(token, debouncedKeyword);

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
            <TableHead>Kode Bahan</TableHead>
            <TableHead>Nama Bahan</TableHead>
            <TableHead>Satuan Stok</TableHead>
            <TableHead>Batas Minimum</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.kode}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.satuan}</TableCell>
                <TableCell>{`${item.batasMinimum} ${item.satuan}`}</TableCell>
                <TableCell className="flex items-center gap-x-4">
                  <LihatBahanMentah data={item} />
                  <UpdateBahanMentah
                    data={item}
                    token={token}
                    query="bahan-mentah"
                  />
                  <DeleteBahanMentah data={item} token={token} />
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

export default TableBahanMentah;
