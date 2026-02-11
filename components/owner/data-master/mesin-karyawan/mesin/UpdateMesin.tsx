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
import { updateMesinSchema, UpdateMesinValues } from "@/lib/schemas/mesin";
import { updateMesin } from "@/services/mesin.service";
import { ErrorResponse, Mesin, StatusMesin } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Pencil, Settings } from "lucide-react";

function UpdateMesin({
  data,
  token,
  query,
}: {
  data: Mesin;
  token: string;
  query: string;
}) {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<UpdateMesinValues>({
    resolver: zodResolver(updateMesinSchema),
    defaultValues: {
      kapasitasCetak: data.kapasitasCetak.replace(/\.?0+$/, ""),
      merk: data.merk,
      nama: data.nama,
      spesifikasi: data.spesifikasi,
      status: data.status,
    },
  });

  const status = watch("status");

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!data) return;
    reset({
      kapasitasCetak: data.kapasitasCetak.replace(/\.?0+$/, ""),
      merk: data.merk,
      nama: data.nama,
      spesifikasi: data.spesifikasi,
      status: data.status,
    });
  }, [data, reset]);

  const mutation = useMutation({
    mutationFn: async (value: UpdateMesinValues) => {
      return await updateMesin(data.id, value, token);
    },
    onSuccess: (response) => {
      if (!response.success) throw response;

      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: [query],
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

  const onSubmit = (data: UpdateMesinValues) => {
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
        <Button 
          variant="ghost" 
          size="icon"
          className="h-8 w-8 text-slate-500 hover:text-amber-600 hover:bg-amber-50"
        >
          <Pencil className="w-4 h-4" />
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
                  Edit Mesin
                </DialogTitle>
                <p className="text-sm font-mono text-slate-500">{data.kode}</p>
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
                  placeholder="0"
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
                      shouldDirty: true,
                      shouldValidate: true,
                    });
                  }}
                >
                  <SelectTrigger className="h-11 bg-slate-50 border-slate-200 rounded-lg focus:bg-white focus:border-amber-500 focus:ring-amber-500/20">
                    <SelectValue placeholder="Pilih Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
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
                Spesifikasi
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
              disabled={mutation.isPending || !isDirty}
              type="submit"
              className="flex-1 sm:flex-none bg-amber-500 hover:bg-amber-600 text-white"
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
                "Simpan Perubahan"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateMesin;
