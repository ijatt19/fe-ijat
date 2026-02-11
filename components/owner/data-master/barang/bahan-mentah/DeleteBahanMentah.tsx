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
import { deleteOneBahanMentah } from "@/services/bahan-mentah.service";
import { BahanMentah, ErrorResponse } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { Trash2, AlertTriangle, Package, Scale } from "lucide-react";

function DeleteBahanMentah({
  data,
  token,
}: {
  data: BahanMentah;
  token: string;
}) {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      return await deleteOneBahanMentah(data.id, token);
    },
    onSuccess: (response) => {
      if (!response.success) throw response;

      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: ["bahan-mentah"],
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
                Hapus Bahan Mentah
              </DialogTitle>
              <DialogDescription className="text-sm text-slate-500">
                Tindakan ini tidak dapat dibatalkan
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        {/* Item Details */}
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 max-w-sm">
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-slate-200">
              <Package className="w-5 h-5 text-slate-400" />
            </div>
            <div className="flex-1 max-w-sm overflow-hidden">
              <p className="font-semibold text-slate-900">{data.name}</p>
              <p className="text-sm text-slate-500 font-mono">{data.kode}</p>
              
              {/* Additional info */}
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <div className="bg-blue-50 rounded px-2 py-1.5 flex items-center gap-1">
                  <Scale className="w-3 h-3 text-blue-500" />
                  <span className="font-medium text-blue-700">{data.satuan}</span>
                </div>
                <div className="bg-amber-50 rounded px-2 py-1.5">
                  <span className="text-slate-500">Min: </span>
                  <span className="font-medium text-amber-700">
                    {data.batasMinimum.toLocaleString("id-ID")} {data.satuan}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Warning */}
        <div className="flex items-start gap-2 p-3 bg-red-50 rounded-lg border border-red-100 max-w-sm">
          <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p className="text-sm text-red-700 overflow-hidden">
            Data bahan <span className="font-semibold">{data.name}</span> akan dihapus secara permanen dari sistem.
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
                Hapus Bahan
              </span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteBahanMentah;
