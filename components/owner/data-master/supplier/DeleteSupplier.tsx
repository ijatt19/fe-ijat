"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteSupplier } from "@/services/supplier.service";
import { ErrorResponse, Supplier } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { Trash2, AlertTriangle, User } from "lucide-react";

function DeleteSupplier({ data, token }: { data: Supplier; token: string }) {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      return await deleteSupplier(data.id, token);
    },
    onSuccess: (response) => {
      if (!response.success) throw response;

      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: ["supplier"],
      });
      setOpenDialog(false);
    },
    onError: async (error: ErrorResponse) => {
      if (error.statusCode === 401) {
        toast.error(error.message);
        await signOut({ redirect: true, redirectTo: "/" });
      }
      toast.error(error.message);
    },
  });

  const onSubmit = () => {
    mutation.mutate();
  };

  const getKategoriBadge = (kategori: string) => {
    const colorMap: Record<string, string> = {
      'bahan baku': 'bg-blue-50 text-blue-700',
      'plastik': 'bg-emerald-50 text-emerald-700',
      'kimia': 'bg-amber-50 text-amber-700',
      'packaging': 'bg-purple-50 text-purple-700',
    };
    const lowerKategori = kategori.toLowerCase();
    const colorClass = Object.entries(colorMap).find(([key]) => 
      lowerKategori.includes(key)
    )?.[1] || 'bg-slate-100 text-slate-700';
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${colorClass}`}>
        {kategori}
      </span>
    );
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="h-8 w-8 text-slate-500 hover:text-red-600 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold text-slate-900">
                Hapus Supplier
              </DialogTitle>
              <DialogDescription className="text-sm text-slate-500">
                Tindakan ini tidak dapat dibatalkan
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        {/* Supplier Details */}
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 max-w-sm">
          <p className="font-semibold text-slate-900 overflow-hidden">{data.nama}</p>
          <p className="text-sm font-mono text-slate-500">{data.kode}</p>
          
          {/* Info badges */}
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            {getKategoriBadge(data.kategori)}
            <div className="flex items-center gap-1 bg-slate-100 rounded px-2 py-1">
              <User className="w-3 h-3 text-slate-500" />
              <span className="text-slate-700">{data.contactPerson}</span>
            </div>
          </div>
        </div>

        {/* Warning */}
        <div className="flex items-start gap-2 p-3 bg-red-50 rounded-lg border border-red-100 max-w-sm">
          <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p className="text-sm text-red-700 overflow-hidden">
            Data supplier <span className="font-semibold">{data.nama}</span> akan dihapus secara permanen.
          </p>
        </div>
        
        <DialogFooter className="gap-2 sm:gap-2">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              disabled={mutation.isPending}
              className="flex-1 sm:flex-none"
            >
              Batal
            </Button>
          </DialogClose>
          <Button
            onClick={onSubmit}
            disabled={mutation.isPending}
            className="flex-1 sm:flex-none bg-red-600 hover:bg-red-700 text-white"
          >
            {mutation.isPending ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Menghapus...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                Hapus Supplier
              </span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteSupplier;
