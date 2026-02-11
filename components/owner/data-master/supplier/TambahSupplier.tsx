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
import { Input } from "@/components/ui/input";
import { NumericInput } from "@/components/numeric-input";
import {
  createSupplierSchema,
  CreateSupplierValues,
} from "@/lib/schemas/supplier";
import { createSupplier } from "@/services/supplier.service";
import { ErrorResponse } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Plus, Building2 } from "lucide-react";

function TambahSupplier({ token }: { token: string }) {
  const [openDialog, setOpenDialog] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateSupplierValues>({
    resolver: zodResolver(createSupplierSchema),
  });

  const mutation = useMutation({
    mutationFn: async (values: CreateSupplierValues) => {
      return await createSupplier(values, token);
    },
    onSuccess: (response) => {
      if (!response.success) throw response;

      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: ["supplier"],
      });
      reset();
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

  const onSubmit = (data: CreateSupplierValues) => {
    mutation.mutate(data);
  };

  return (
    <Dialog
      open={openDialog}
      onOpenChange={(v) => {
        reset();
        setOpenDialog(v);
      }}
    >
      <DialogTrigger asChild>
        <Button className="h-10 bg-violet-600 hover:bg-violet-700 text-white shadow-sm gap-2">
          <Plus className="w-4 h-4" />
          Tambah Supplier
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          <DialogHeader className="pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <DialogTitle className="text-lg font-semibold text-slate-900">
                  Tambah Supplier Baru
                </DialogTitle>
                <p className="text-sm text-slate-500">
                  Isi data supplier dengan lengkap
                </p>
              </div>
            </div>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Nama & Kategori */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="nama" className="block text-sm font-medium text-slate-700">
                  Nama Supplier <span className="text-red-500">*</span>
                </label>
                <Input
                  autoComplete="off"
                  disabled={mutation.isPending}
                  id="nama"
                  className="h-11 bg-slate-50 border-slate-200 rounded-lg focus:bg-white focus:border-violet-500 focus:ring-violet-500/20 transition-all"
                  placeholder="Nama supplier"
                  {...register("nama")}
                />
                {errors.nama && (
                  <p className="text-xs text-red-500">{errors.nama.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="kategori" className="block text-sm font-medium text-slate-700">
                  Kategori <span className="text-red-500">*</span>
                </label>
                <Input
                  autoComplete="off"
                  disabled={mutation.isPending}
                  id="kategori"
                  className="h-11 bg-slate-50 border-slate-200 rounded-lg focus:bg-white focus:border-violet-500 focus:ring-violet-500/20 transition-all"
                  placeholder="cth: Bahan Baku, Plastik"
                  {...register("kategori")}
                />
                {errors.kategori && (
                  <p className="text-xs text-red-500">{errors.kategori.message}</p>
                )}
              </div>
            </div>

            {/* Contact Person & No HP */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="contact" className="block text-sm font-medium text-slate-700">
                  Contact Person <span className="text-red-500">*</span>
                </label>
                <Input
                  autoComplete="off"
                  disabled={mutation.isPending}
                  id="contact"
                  className="h-11 bg-slate-50 border-slate-200 rounded-lg focus:bg-white focus:border-violet-500 focus:ring-violet-500/20 transition-all"
                  placeholder="Nama contact person"
                  {...register("contactPerson")}
                />
                {errors.contactPerson && (
                  <p className="text-xs text-red-500">{errors.contactPerson.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="noHp" className="block text-sm font-medium text-slate-700">
                  No HP/WA <span className="text-red-500">*</span>
                </label>
                <NumericInput
                  autoComplete="off"
                  disabled={mutation.isPending}
                  id="noHp"
                  className="h-11 bg-slate-50 border-slate-200 rounded-lg focus:bg-white focus:border-violet-500 focus:ring-violet-500/20 transition-all"
                  placeholder="08xxxxxxxxxx"
                  {...register("noHp")}
                />
                {errors.noHp && (
                  <p className="text-xs text-red-500">{errors.noHp.message}</p>
                )}
              </div>
            </div>

            {/* Alamat */}
            <div className="space-y-2">
              <label htmlFor="alamat" className="block text-sm font-medium text-slate-700">
                Alamat <span className="text-red-500">*</span>
              </label>
              <Input
                autoComplete="off"
                disabled={mutation.isPending}
                id="alamat"
                className="h-11 bg-slate-50 border-slate-200 rounded-lg focus:bg-white focus:border-violet-500 focus:ring-violet-500/20 transition-all"
                placeholder="Alamat lengkap supplier"
                {...register("alamat")}
              />
              {errors.alamat && (
                <p className="text-xs text-red-500">{errors.alamat.message}</p>
              )}
            </div>
          </div>
          
          <DialogFooter className="pt-4 border-t border-slate-100 gap-2">
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
              disabled={mutation.isPending}
              type="submit"
              className="flex-1 sm:flex-none bg-violet-600 hover:bg-violet-700 text-white"
            >
              {mutation.isPending ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Menyimpan...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Simpan Supplier
                </span>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default TambahSupplier;
