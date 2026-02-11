"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Mesin, StatusMesin } from "@/types/api";
import { Eye, Settings, Gauge, FileText } from "lucide-react";

function LihatMesin({ data }: { data: Mesin }) {
  const getStatusBadge = (status: StatusMesin) => {
    const statusMap: Record<StatusMesin, { color: string; icon: string; label: string }> = {
      [StatusMesin.AKTIF]: { color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: '🟢', label: 'Aktif' },
      [StatusMesin.MAINTENANCE]: { color: 'bg-amber-50 text-amber-700 border-amber-200', icon: '🟡', label: 'Maintenance' },
      [StatusMesin.RUSAK]: { color: 'bg-red-50 text-red-700 border-red-200', icon: '🔴', label: 'Rusak' },
    };
    const config = statusMap[status] || { color: 'bg-slate-100 text-slate-700 border-slate-200', icon: '⚪', label: status };
    
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${config.color}`}>
        <span>{config.icon}</span>
        {config.label}
      </span>
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="h-8 w-8 text-slate-500 hover:text-blue-600 hover:bg-blue-50"
        >
          <Eye className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white flex-shrink-0">
              <Settings className="w-6 h-6" />
            </div>
            <div className="max-w-sm">
              <DialogTitle className="text-lg font-semibold text-slate-900 overflow-hidden">
                {data.nama}
              </DialogTitle>
              <p className="text-sm font-mono text-slate-500">{data.kode}</p>
            </div>
          </div>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          {/* Status */}
          <div className="flex justify-center">
            {getStatusBadge(data.status)}
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <Settings className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-medium text-slate-500">Merk</span>
              </div>
              <p className="text-base font-bold text-slate-900 overflow-hidden">{data.merk}</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
              <div className="flex items-center gap-2 mb-2">
                <Gauge className="w-4 h-4 text-purple-500" />
                <span className="text-xs font-medium text-slate-500">Kapasitas Cetak</span>
              </div>
              <p className="text-base font-bold text-slate-900 overflow-hidden">{data.kapasitasCetak.replace(/\.?0+$/, "")}</p>
            </div>
          </div>

          {/* Spesifikasi */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-semibold text-slate-700">Spesifikasi</span>
            </div>
            <p className="text-sm text-slate-600 whitespace-pre-wrap break-all overflow-hidden">{data.spesifikasi || "-"}</p>
          </div>
        </div>
        
        <DialogFooter className="pt-4 border-t border-slate-100">
          <DialogClose asChild>
            <Button 
              variant="outline" 
              className="w-full sm:w-auto"
            >
              Tutup
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default LihatMesin;
