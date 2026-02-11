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
              <div className="h-4 bg-slate-200 rounded w-32" />
              <div className="h-4 bg-slate-200 rounded w-16" />
              <div className="h-4 bg-slate-200 rounded w-24" />
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
            <TableHead className="font-semibold text-slate-700">Kode Bahan</TableHead>
            <TableHead className="font-semibold text-slate-700">Nama Bahan</TableHead>
            <TableHead className="font-semibold text-slate-700">Satuan Stok</TableHead>
            <TableHead className="font-semibold text-slate-700">Batas Minimum</TableHead>
            <TableHead className="font-semibold text-slate-700 text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data.map((item, index) => (
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
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                    {item.satuan}
                  </span>
                </TableCell>
                <TableCell className="text-slate-600">
                  {item.batasMinimum} {item.satuan}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-1">
                    <LihatBahanMentah data={item} />
                    <UpdateBahanMentah
                      data={item}
                      token={token}
                      query="bahan-mentah"
                    />
                    <DeleteBahanMentah data={item} token={token} />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5}>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 mb-4">
                    <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <p className="text-slate-500 font-medium">Belum ada data</p>
                  <p className="text-slate-400 text-sm mt-1">Klik tombol &quot;Tambah&quot; untuk menambahkan bahan mentah baru</p>
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

export default TableBahanMentah;
