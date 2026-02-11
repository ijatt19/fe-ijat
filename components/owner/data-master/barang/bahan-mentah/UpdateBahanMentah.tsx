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
  updateBahanMentahSchema,
  UpdateBahanMentahValues,
} from "@/lib/schemas/bahan-mentah";
import { updateBahanMentah } from "@/services/bahan-mentah.service";
import { BahanMentah, ErrorResponse } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { Pencil, Package, Eye } from "lucide-react";

function UpdateBahanMentah({
  data,
  token,
  query,
}: {
  data: BahanMentah;
  token: string;
  query: string;
}) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isDirty },
  } = useForm<UpdateBahanMentahValues>({
    resolver: zodResolver(updateBahanMentahSchema),
    defaultValues: {
      name: data.name,
      batasMinimum: data.batasMinimum,
      satuan: data.satuan,
    },
  });

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!data) return;
    reset({
      name: data.name,
      batasMinimum: data.batasMinimum,
      satuan: data.satuan,
    });
  }, [data, reset]);

  const mutation = useMutation({
    mutationFn: async (value: UpdateBahanMentahValues) => {
      return await updateBahanMentah(data.id, value, token);
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

  const onSubmit = (data: UpdateBahanMentahValues) => {
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
      <DialogContent className="sm:max-w-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          <DialogHeader className="pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-amber-100">
                <Pencil className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <DialogTitle className="text-lg font-semibold text-slate-900">
                  Edit Bahan Mentah
                </DialogTitle>
                <p className="text-sm text-slate-500 font-mono">{data.kode}</p>
              </div>
            </div>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Kode Bahan - Read Only */}
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-600 font-medium">Kode Bahan</span>
              </div>
              <span className="text-sm font-mono text-slate-900">{data.kode}</span>
            </div>

            {/* Nama Bahan */}
            <div className="space-y-2">
              <label 
                htmlFor="name" 
                className="block text-sm font-medium text-slate-700"
              >
                Nama Bahan <span className="text-red-500">*</span>
              </label>
              <Input
                autoComplete="off"
                disabled={mutation.isPending}
                id="name"
                className="h-11 bg-slate-50 border-slate-200 rounded-lg focus:bg-white focus:border-teal-500 focus:ring-teal-500/20 transition-all"
                type="text"
                placeholder="Masukkan nama bahan"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-red-500 flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-2 gap-4">
              {/* Satuan */}
              <div className="space-y-2">
                <label 
                  htmlFor="satuan" 
                  className="block text-sm font-medium text-slate-700"
                >
                  Satuan Stok <span className="text-red-500">*</span>
                </label>
                <Input
                  autoComplete="off"
                  disabled={mutation.isPending}
                  id="satuan"
                  className="h-11 bg-slate-50 border-slate-200 rounded-lg focus:bg-white focus:border-teal-500 focus:ring-teal-500/20 transition-all"
                  type="text"
                  placeholder="Kg, Liter, Pcs"
                  {...register("satuan")}
                />
                {errors.satuan && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.satuan.message}
                  </p>
                )}
              </div>

              {/* Batas Minimum */}
              <div className="space-y-2">
                <label 
                  htmlFor="batas" 
                  className="block text-sm font-medium text-slate-700"
                >
                  Batas Minimum <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="batasMinimum"
                  control={control}
                  render={({ field }) => (
                    <NumericInput
                      id="batas"
                      disabled={mutation.isPending}
                      className="h-11 bg-slate-50 border-slate-200 rounded-lg focus:bg-white focus:border-teal-500 focus:ring-teal-500/20 transition-all"
                      placeholder="0"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.batasMinimum && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.batasMinimum.message}
                  </p>
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
              className="flex-1 sm:flex-none bg-teal-500 hover:bg-teal-600 text-white"
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

export default UpdateBahanMentah;
