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
import { BahanMentah } from "@/types/api";
import { Eye, Package, Scale, AlertTriangle } from "lucide-react";

function LihatBahanMentah({ data }: { data: BahanMentah }) {
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
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-teal-100 flex-shrink-0">
              <Package className="w-5 h-5 text-teal-600" />
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
          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-3">
            {/* Satuan */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <Scale className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-medium text-slate-500">Satuan Stok</span>
              </div>
              <p className="text-lg font-bold text-slate-900 overflow-hidden">{data.satuan}</p>
            </div>
            
            {/* Batas Minimum */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-medium text-slate-500">Batas Minimum</span>
              </div>
              <p className="text-lg font-bold text-slate-900">
                {data.batasMinimum.toLocaleString("id-ID")} 
                <span className="text-sm font-normal text-slate-500 ml-1">{data.satuan}</span>
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-slate-50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Informasi Detail
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2 border-b border-slate-200">
                <span className="text-sm text-slate-500">Kode Bahan</span>
                <span className="text-sm font-mono font-medium text-slate-900">{data.kode}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-200">
                <span className="text-sm text-slate-500">Nama Bahan</span>
                <span className="text-sm font-medium text-slate-900 break-all overflow-hidden">{data.name}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-200">
                <span className="text-sm text-slate-500">Satuan</span>
                <span className="text-sm font-medium text-slate-900">{data.satuan}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-slate-500">Batas Minimum</span>
                <span className="text-sm font-medium text-slate-900">
                  {data.batasMinimum.toLocaleString("id-ID")} {data.satuan}
                </span>
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

export default LihatBahanMentah;
