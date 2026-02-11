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
import {
  updateKaryawanSchema,
  UpdateKaryawanValues,
} from "@/lib/schemas/karyawan";
import { updateKaryawan } from "@/services/karyawan.service";
import { ErrorResponse, Karyawan } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Pencil } from "lucide-react";

function UpdateKaryawan({
  data,
  token,
  query,
}: {
  data: Karyawan;
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
  } = useForm<UpdateKaryawanValues>({
    resolver: zodResolver(updateKaryawanSchema),
    defaultValues: {
      alamat: data.alamat,
      jabatan: data.jabatan,
      namaBelakang: data.namaBelakang,
      namaDepan: data.namaDepan,
      noHp: data.noHp,
      status: data.status,
    },
  });

  const status = watch("status");

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!data) return;
    reset({
      alamat: data.alamat,
      jabatan: data.jabatan,
      namaBelakang: data.namaBelakang,
      namaDepan: data.namaDepan,
      noHp: data.noHp,
      status: data.status,
    });
  }, [data, reset]);

  const mutation = useMutation({
    mutationFn: async (value: UpdateKaryawanValues) => {
      return await updateKaryawan(data.id, value, token);
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

  const onSubmit = (data: UpdateKaryawanValues) => {
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
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-sm font-semibold">
                {data.namaDepan.charAt(0).toUpperCase()}
              </div>
              <div>
                <DialogTitle className="text-lg font-semibold text-slate-900">
                  Edit Karyawan
                </DialogTitle>
                <p className="text-sm text-slate-500">
                  {data.namaDepan} {data.namaBelakang}
                </p>
              </div>
            </div>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Nama */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="namaDepan" className="block text-sm font-medium text-slate-700">
                  Nama Depan <span className="text-red-500">*</span>
                </label>
                <Input
                  autoComplete="off"
                  disabled={mutation.isPending}
                  id="namaDepan"
                  className="h-11 bg-slate-50 border-slate-200 rounded-lg focus:bg-white focus:border-amber-500 focus:ring-amber-500/20 transition-all"
                  placeholder="Nama depan"
                  {...register("namaDepan")}
                />
                {errors.namaDepan && (
                  <p className="text-xs text-red-500">{errors.namaDepan.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="namaBelakang" className="block text-sm font-medium text-slate-700">
                  Nama Belakang
                </label>
                <Input
                  autoComplete="off"
                  disabled={mutation.isPending}
                  id="namaBelakang"
                  className="h-11 bg-slate-50 border-slate-200 rounded-lg focus:bg-white focus:border-amber-500 focus:ring-amber-500/20 transition-all"
                  placeholder="Nama belakang"
                  {...register("namaBelakang")}
                />
                {errors.namaBelakang && (
                  <p className="text-xs text-red-500">{errors.namaBelakang.message}</p>
                )}
              </div>
            </div>

            {/* No HP */}
            <div className="space-y-2">
              <label htmlFor="noHp" className="block text-sm font-medium text-slate-700">
                No. HP <span className="text-red-500">*</span>
              </label>
              <Input
                autoComplete="off"
                disabled={mutation.isPending}
                id="noHp"
                className="h-11 bg-slate-50 border-slate-200 rounded-lg focus:bg-white focus:border-amber-500 focus:ring-amber-500/20 transition-all"
                placeholder="08xxxxxxxxxx"
                {...register("noHp")}
              />
              {errors.noHp && (
                <p className="text-xs text-red-500">{errors.noHp.message}</p>
              )}
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
                className="h-11 bg-slate-50 border-slate-200 rounded-lg focus:bg-white focus:border-amber-500 focus:ring-amber-500/20 transition-all"
                placeholder="Alamat lengkap"
                {...register("alamat")}
              />
              {errors.alamat && (
                <p className="text-xs text-red-500">{errors.alamat.message}</p>
              )}
            </div>

            {/* Jabatan & Status */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="jabatan" className="block text-sm font-medium text-slate-700">
                  Jabatan <span className="text-red-500">*</span>
                </label>
                <Input
                  autoComplete="off"
                  disabled={mutation.isPending}
                  id="jabatan"
                  className="h-11 bg-slate-50 border-slate-200 rounded-lg focus:bg-white focus:border-amber-500 focus:ring-amber-500/20 transition-all"
                  placeholder="Jabatan"
                  {...register("jabatan")}
                />
                {errors.jabatan && (
                  <p className="text-xs text-red-500">{errors.jabatan.message}</p>
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
                    setValue("status", value as "aktif" | "nonaktif", {
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
                      <SelectItem value="aktif">
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          Aktif
                        </span>
                      </SelectItem>
                      <SelectItem value="nonaktif">
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                          Nonaktif
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

export default UpdateKaryawan;
