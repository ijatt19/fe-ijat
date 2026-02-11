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
import { Supplier } from "@/types/api";
import { Eye, Phone, MapPin, User } from "lucide-react";

function LihatSupplier({ data }: { data: Supplier }) {
  const renderKategoriBadges = (kategoriString: string) => {
    const categories = kategoriString.split(',').map(k => k.trim()).filter(k => k);
    
    return (
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((kategori, idx) => (
          <span 
            key={idx}
            className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-slate-100 text-slate-700 border border-slate-200"
          >
            {kategori}
          </span>
        ))}
      </div>
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
          <DialogTitle className="text-lg font-semibold text-slate-900 overflow-hidden">
            {data.nama}
          </DialogTitle>
          <p className="text-sm font-mono text-slate-500">{data.kode}</p>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          {/* Kategori */}
          <div>
            {renderKategoriBadges(data.kategori)}
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-medium text-slate-500">Contact Person</span>
              </div>
              <p className="text-sm font-bold text-slate-900 break-all overflow-hidden">{data.contactPerson}</p>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100">
              <div className="flex items-center gap-2 mb-2">
                <Phone className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-medium text-slate-500">No HP/WA</span>
              </div>
              <p className="text-sm font-bold text-slate-900 break-all overflow-hidden">{data.noHp}</p>
            </div>
          </div>

          {/* Alamat */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-semibold text-slate-700">Alamat</span>
            </div>
            <p className="text-sm text-slate-600 break-all overflow-hidden">{data.alamat || "-"}</p>
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

export default LihatSupplier;
