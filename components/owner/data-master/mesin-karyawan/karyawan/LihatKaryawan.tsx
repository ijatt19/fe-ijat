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
import { Karyawan } from "@/types/api";
import { Eye, User, Phone, MapPin, CheckCircle } from "lucide-react";

function LihatKaryawan({ data }: { data: Karyawan }) {
  const getStatusBadge = (status: string) => {
    const isActive = status.toLowerCase() === "aktif";
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
        isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
      }`}>
        <CheckCircle className="w-3 h-3" />
        {status}
      </span>
    );
  };

  const getJabatanBadge = (jabatan: string) => {
    const colorMap: Record<string, string> = {
      'operator': 'bg-blue-50 text-blue-700',
      'supervisor': 'bg-purple-50 text-purple-700',
      'admin': 'bg-emerald-50 text-emerald-700',
      'manager': 'bg-amber-50 text-amber-700',
    };
    const colorClass = colorMap[jabatan.toLowerCase()] || 'bg-slate-100 text-slate-700';
    
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${colorClass}`}>
        {jabatan}
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
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-lg font-semibold flex-shrink-0">
              {data.namaDepan.charAt(0).toUpperCase()}
            </div>
            <div className="max-w-sm">
              <DialogTitle className="text-lg font-semibold text-slate-900 overflow-hidden">
                {data.namaDepan} {data.namaBelakang}
              </DialogTitle>
              <div className="flex items-center gap-2 mt-1">
                {getJabatanBadge(data.jabatan)}
                {getStatusBadge(data.status)}
              </div>
            </div>
          </div>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          {/* Contact Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-100">
                <Phone className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">No. HP</p>
                <p className="font-medium text-slate-900 break-all overflow-hidden">{data.noHp}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-100 flex-shrink-0">
                <MapPin className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Alamat</p>
                <p className="font-medium text-slate-900 break-all overflow-hidden">{data.alamat}</p>
              </div>
            </div>
          </div>

          {/* Detail Info */}
          <div className="bg-slate-50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-slate-400" />
              Informasi Detail
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2 border-b border-slate-200">
                <span className="text-sm text-slate-500">ID Karyawan</span>
                <span className="text-sm font-mono font-medium text-slate-900">#{data.id}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-200">
                <span className="text-sm text-slate-500">Nama Depan</span>
                <span className="text-sm font-medium text-slate-900 break-all overflow-hidden">{data.namaDepan}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-200">
                <span className="text-sm text-slate-500">Nama Belakang</span>
                <span className="text-sm font-medium text-slate-900 break-all overflow-hidden">{data.namaBelakang}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-slate-500">Jabatan</span>
                <span className="text-sm font-medium text-slate-900 capitalize">{data.jabatan}</span>
              </div>
            </div>
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

export default LihatKaryawan;
