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
import { Akun, AkunRole, ErrorResponse } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import LihatAkun from "./LihatAkun";
import UpdateAkun from "./UpdateAkun";
import DeleteAkun from "./DeleteAkun";
import { Users, ShieldCheck } from "lucide-react";

function TableAkun({ keyword, token, currentUserId }: { keyword: string; token: string; currentUserId: string }) {
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

  const getRoleBadge = (role: AkunRole) => {
    const roleMap: Record<AkunRole, { color: string; label: string }> = {
      [AkunRole.OWNER]: { color: 'bg-violet-50 text-violet-700', label: 'Owner' },
      [AkunRole.STAFF]: { color: 'bg-blue-50 text-blue-700', label: 'Staff' },
    };
    const config = roleMap[role] || { color: 'bg-slate-100 text-slate-700', label: role };
    
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <ShieldCheck className="w-3 h-3" />
        {config.label}
      </span>
    );
  };

  if (error) {
    if (error.statusCode === 401) return <ForceClose />;

    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-3">
          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <p className="text-sm text-slate-500">{error.message}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="animate-pulse">
          <div className="h-12 bg-slate-100 border-b border-slate-200" />
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4 border-b border-slate-100">
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-200 rounded w-1/3" />
                <div className="h-3 bg-slate-100 rounded w-1/4" />
              </div>
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
            <TableRow className="bg-slate-50/80 hover:bg-slate-50/80">
              <TableHead className="w-[60px] text-slate-600 font-semibold">No</TableHead>
              <TableHead className="text-slate-600 font-semibold">Nama Lengkap</TableHead>
              <TableHead className="text-slate-600 font-semibold">Username</TableHead>
              <TableHead className="text-slate-600 font-semibold">Role</TableHead>
              <TableHead className="text-right text-slate-600 font-semibold">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <TableRow key={index} className="hover:bg-slate-50/50 transition-colors">
                  <TableCell className="text-slate-500 font-medium">{index + 1}</TableCell>
                  <TableCell className="max-w-[200px]">
                    <span className="font-medium text-slate-900 truncate block">
                      {item.namaDepan} {item.namaBelakang}
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-600 font-mono text-sm max-w-[150px] truncate">
                    {item.username}
                  </TableCell>
                  <TableCell>
                    {getRoleBadge(item.role)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <LihatAkun data={item} />
                      <UpdateAkun data={item} token={token} query="akun" />
                      <DeleteAkun data={item} token={token} currentUserId={currentUserId} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-32">
                  <div className="flex flex-col items-center justify-center text-slate-400">
                    <Users className="w-8 h-8 mb-2" />
                    <p className="text-sm font-medium">Belum ada data akun</p>
                    <p className="text-xs text-slate-400">Tambahkan akun baru untuk memulai</p>
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

export default TableAkun;
