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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createMesinSchema, CreateMesinValues } from "@/lib/schemas/mesin";
import { createMesin } from "@/services/mesin.service";
import { ErrorResponse, StatusMesin } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Plus, Settings } from "lucide-react";

function TambahMesin({ token }: { token: string }) {
  const [openDialog, setOpenDialog] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateMesinValues>({
    resolver: zodResolver(createMesinSchema),
    defaultValues: {
      status: StatusMesin.AKTIF,
    },
  });

  const status = watch("status");

  const mutation = useMutation({
    mutationFn: async (values: CreateMesinValues) => {
      return await createMesin(values, token);
    },
    onSuccess: (response) => {
      if (!response.success) throw response;

      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: ["mesin"],
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

  const onSubmit = (data: CreateMesinValues) => {
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
        <Button className="h-10 bg-amber-600 hover:bg-amber-700 text-white shadow-sm gap-2">
          <Plus className="w-4 h-4" />
          Tambah Mesin
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          <DialogHeader className="pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <DialogTitle className="text-lg font-semibold text-slate-900">
                  Tambah Mesin Baru
                </DialogTitle>
                <p className="text-sm text-slate-500">
                  Isi data mesin dengan lengkap
                </p>
              </div>
            </div>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Nama & Merk */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="nama" className="block text-sm font-medium text-slate-700">
                  Nama Mesin <span className="text-red-500">*</span>
                </label>
                <Input
                  autoComplete="off"
                  disabled={mutation.isPending}
                  id="nama"
                  className="h-11 bg-slate-50 border-slate-200 rounded-lg focus:bg-white focus:border-amber-500 focus:ring-amber-500/20 transition-all"
                  placeholder="Nama mesin"
                  {...register("nama")}
                />
                {errors.nama && (
                  <p className="text-xs text-red-500">{errors.nama.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="merk" className="block text-sm font-medium text-slate-700">
                  Merk <span className="text-red-500">*</span>
                </label>
                <Input
                  autoComplete="off"
                  disabled={mutation.isPending}
                  id="merk"
                  className="h-11 bg-slate-50 border-slate-200 rounded-lg focus:bg-white focus:border-amber-500 focus:ring-amber-500/20 transition-all"
                  placeholder="Merk mesin"
                  {...register("merk")}
                />
                {errors.merk && (
                  <p className="text-xs text-red-500">{errors.merk.message}</p>
                )}
              </div>
            </div>

            {/* Kapasitas & Status */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="kapasitas" className="block text-sm font-medium text-slate-700">
                  Kapasitas Cetak <span className="text-red-500">*</span>
                </label>
                <Input
                  autoComplete="off"
                  inputMode="decimal"
                  disabled={mutation.isPending}
                  id="kapasitas"
                  className="h-11 bg-slate-50 border-slate-200 rounded-lg focus:bg-white focus:border-amber-500 focus:ring-amber-500/20 transition-all"
                  placeholder="Contoh: 1000"
                  {...register("kapasitasCetak", {
                    setValueAs: (v) =>
                      typeof v === "string" ? v.replace(",", ".") : v,
                  })}
                />
                {errors.kapasitasCetak && (
                  <p className="text-xs text-red-500">{errors.kapasitasCetak.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="status" className="block text-sm font-medium text-slate-700">
                  Status <span className="text-red-500">*</span>
                </label>
                <Select
                  disabled={mutation.isPending}
                  value={status}
                  onValueChange={(value) => {
                    setValue("status", value as StatusMesin, {
                      shouldValidate: true,
                    });
                  }}
                >
                  <SelectTrigger className="h-11 bg-slate-50 border-slate-200 rounded-lg focus:bg-white focus:border-amber-500 focus:ring-amber-500/20">
                    <SelectValue placeholder="Pilih Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status Mesin</SelectLabel>
                      <SelectItem value={StatusMesin.AKTIF}>
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          Aktif
                        </span>
                      </SelectItem>
                      <SelectItem value={StatusMesin.MAINTENANCE}>
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                          Maintenance
                        </span>
                      </SelectItem>
                      <SelectItem value={StatusMesin.RUSAK}>
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-red-500"></span>
                          Rusak
                        </span>
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.status && (
                  <p className="text-xs text-red-500">{errors.status.message}</p>
                )}
              </div>
            </div>

            {/* Spesifikasi */}
            <div className="space-y-2">
              <label htmlFor="spek" className="block text-sm font-medium text-slate-700">
                Spesifikasi <span className="text-red-500">*</span>
              </label>
              <Textarea
                autoComplete="off"
                disabled={mutation.isPending}
                id="spek"
                className="min-h-[100px] bg-slate-50 border-slate-200 rounded-lg focus:bg-white focus:border-amber-500 focus:ring-amber-500/20 transition-all resize-none"
                placeholder="Deskripsi spesifikasi mesin..."
                {...register("spesifikasi")}
              />
              {errors.spesifikasi && (
                <p className="text-xs text-red-500">{errors.spesifikasi.message}</p>
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
              className="flex-1 sm:flex-none bg-amber-600 hover:bg-amber-700 text-white"
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
                  Simpan Mesin
                </span>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default TambahMesin;
