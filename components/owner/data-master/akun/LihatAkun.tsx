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
import { Akun, AkunRole } from "@/types/api";
import { Eye, User, Mail, Phone, ShieldCheck } from "lucide-react";

function LihatAkun({ data }: { data: Akun }) {
  const getRoleBadge = (role: AkunRole) => {
    const isOwner = role === AkunRole.OWNER;
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
        isOwner ? 'bg-violet-50 text-violet-700' : 'bg-blue-50 text-blue-700'
      }`}>
        <ShieldCheck className="w-3 h-3" />
        {isOwner ? 'Owner' : 'Staff'}
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
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white text-lg font-semibold shrink-0">
              {data.namaDepan.charAt(0).toUpperCase()}
            </div>
            <div className="max-w-sm">
              <DialogTitle className="text-lg text-left font-semibold text-slate-900 overflow-hidden">
                {data.namaDepan} {data.namaBelakang}
              </DialogTitle>
              <div className="flex items-center gap-2 mt-1">
                {getRoleBadge(data.role)}
              </div>
            </div>
          </div>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          {/* Contact Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-violet-100 shrink-0">
                <User className="w-4 h-4 text-violet-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Username</p>
                <p className="font-medium text-slate-900 font-mono overflow-hidden">{data.username}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-100 shrink-0">
                <Mail className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Email</p>
                <p className="font-medium text-slate-900 overflow-hidden">{data.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-100 shrink-0">
                <Phone className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">No. HP</p>
                <p className="font-medium text-slate-900 overflow-hidden">{data.noHp}</p>
              </div>
            </div>
          </div>

          {/* Detail Info */}
          <div className="bg-slate-50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Informasi Detail
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2 border-b border-slate-200">
                <span className="text-sm text-slate-500">ID Akun</span>
                <span className="text-sm font-mono font-medium text-slate-900">#{data.id}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-200">
                <span className="text-sm text-slate-500">Nama Depan</span>
                <span className="text-sm font-medium text-slate-900 overflow-hidden">{data.namaDepan}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-200">
                <span className="text-sm text-slate-500">Nama Belakang</span>
                <span className="text-sm font-medium text-slate-900 overflow-hidden">{data.namaBelakang}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-slate-500">Level Akses</span>
                <span className="text-sm font-medium text-slate-900 capitalize">{data.role}</span>
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

export default LihatAkun;
