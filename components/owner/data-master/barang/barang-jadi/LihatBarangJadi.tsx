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
import { BarangJadi, BarangJadiVarian } from "@/types/api";
import { Eye } from "lucide-react";

function LihatBarangJadi({ data }: { data: BarangJadi }) {
  const { curah, susun } = data.varians.reduce(
    (acc, item) => {
      acc[item.jenisPacking] = item;
      return acc;
    },
    {} as Record<string, BarangJadiVarian>,
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
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
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="pb-4 border-b border-slate-100">
          <div className="flex gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-100 flex-shrink-0">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div className="max-w-sm">
              <DialogTitle className="text-lg text-left font-semibold text-slate-900 overflow-hidden">
                {data.name}
              </DialogTitle>
              <p className="text-sm text-slate-500 font-mono">{data.kode}</p>
            </div>
          </div>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          {/* Packing Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Packing Curah */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <h3 className="text-sm font-semibold text-slate-700">Packing Curah</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Modal HPP</p>
                  <p className="text-lg font-bold text-slate-900">
                    {formatCurrency(curah?.hargaModal ?? 0)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Harga Jual</p>
                  <p className="text-lg font-bold text-blue-600">
                    {formatCurrency(curah?.hargaJual ?? 0)}
                  </p>
                </div>
                {curah && curah.hargaJual > 0 && curah.hargaModal > 0 && (
                  <div className="pt-2 border-t border-blue-200">
                    <p className="text-xs text-slate-500 mb-1">Margin</p>
                    <p className="text-sm font-semibold text-emerald-600">
                      {formatCurrency(curah.hargaJual - curah.hargaModal)}
                      <span className="text-xs text-slate-400 ml-1">
                        ({(((curah.hargaJual - curah.hargaModal) / curah.hargaModal) * 100).toFixed(1)}%)
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Packing Susun */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <h3 className="text-sm font-semibold text-slate-700">Packing Susun</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Modal HPP</p>
                  <p className="text-lg font-bold text-slate-900">
                    {formatCurrency(susun?.hargaModal ?? 0)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Harga Jual</p>
                  <p className="text-lg font-bold text-amber-600">
                    {formatCurrency(susun?.hargaJual ?? 0)}
                  </p>
                </div>
                {susun && susun.hargaJual > 0 && susun.hargaModal > 0 && (
                  <div className="pt-2 border-t border-amber-200">
                    <p className="text-xs text-slate-500 mb-1">Margin</p>
                    <p className="text-sm font-semibold text-emerald-600">
                      {formatCurrency(susun.hargaJual - susun.hargaModal)}
                      <span className="text-xs text-slate-400 ml-1">
                        ({(((susun.hargaJual - susun.hargaModal) / susun.hargaModal) * 100).toFixed(1)}%)
                      </span>
                    </p>
                  </div>
                )}
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

export default LihatBarangJadi;
