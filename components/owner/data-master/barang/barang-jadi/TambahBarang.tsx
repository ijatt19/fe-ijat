"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { CurrencyInput } from "@/components/currency-input";
import {
  tambahBarangJadiSchema,
  TambahBarangJadiValues,
} from "@/lib/schemas/barang-jadi";
import { createBarangJadi } from "@/services/barang-jadi.service";
import { ErrorResponse } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";

function TambahBarang({ token }: { token: string }) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<TambahBarangJadiValues>({
    resolver: zodResolver(tambahBarangJadiSchema),
    defaultValues: {
      name: "",
      varians: [
        {
          jenisPacking: "curah",
          hargaModal: 0,
          hargaJual: 0,
        },
        {
          jenisPacking: "susun",
          hargaModal: 0,
          hargaJual: 0,
        },
      ],
    },
  });

  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);

  const mutation = useMutation({
    mutationFn: async (values: TambahBarangJadiValues) => {
      return await createBarangJadi(values, token);
    },
    onSuccess: (response) => {
      if (!response.success) throw response;

      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: ["barang-jadi"],
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

  const onSubmit = (data: TambahBarangJadiValues) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button className="h-10 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Tambah Barang
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-6"
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-lg">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-100">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              Tambah Barang Jadi
            </DialogTitle>
          </DialogHeader>
          
          <FieldSet>
            <FieldGroup className="space-y-5">
              {/* Kode Barang - Auto */}
              <Field>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <FieldLabel htmlFor="kode" className="text-sm text-slate-600 font-medium">
                    Kode Barang
                  </FieldLabel>
                  <span className="text-sm text-slate-400 italic">Otomatis</span>
                </div>
              </Field>
              
              {/* Nama Barang */}
              <Field>
                <FieldLabel htmlFor="name" className="text-sm font-medium text-slate-700 mb-1.5 block">
                  Nama Barang <span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  autoComplete="off"
                  disabled={mutation.isPending}
                  id="name"
                  placeholder="Masukkan nama barang"
                  className="h-10"
                  type="text"
                  {...register("name")}
                />
                {errors.name && (
                  <FieldError className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.name.message}
                  </FieldError>
                )}
              </Field>
              
              {/* Variant Sections */}
              <div className="space-y-4">
                <p className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Detail Varian Packing
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Packing Curah */}
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="font-medium text-slate-700 text-sm">Packing Curah</span>
                    </div>
                    
                    <Field>
                      <FieldLabel htmlFor="modal-curah" className="text-xs font-medium text-slate-600 mb-1 block">
                        Modal HPP (Rp) <span className="text-red-500">*</span>
                      </FieldLabel>
                      <Controller
                        name="varians.0.hargaModal"
                        control={control}
                        render={({ field }) => (
                          <CurrencyInput
                            id="modal-curah"
                            placeholder="0"
                            className="h-9 text-sm"
                            disabled={mutation.isPending}
                            value={field.value}
                            onChange={field.onChange}
                          />
                        )}
                      />
                      {errors.varians !== undefined &&
                        errors.varians[0]?.hargaModal !== undefined && (
                          <FieldError className="mt-1 text-xs text-red-500">
                            {errors.varians[0].hargaModal.message}
                          </FieldError>
                        )}
                    </Field>
                    
                    <Field>
                      <FieldLabel htmlFor="jual-curah" className="text-xs font-medium text-slate-600 mb-1 block">
                        Harga Jual (Rp) <span className="text-red-500">*</span>
                      </FieldLabel>
                      <Controller
                        name="varians.0.hargaJual"
                        control={control}
                        render={({ field }) => (
                          <CurrencyInput
                            id="jual-curah"
                            placeholder="0"
                            className="h-9 text-sm"
                            disabled={mutation.isPending}
                            value={field.value}
                            onChange={field.onChange}
                          />
                        )}
                      />
                      {errors.varians !== undefined &&
                        errors.varians[0]?.hargaJual !== undefined && (
                          <FieldError className="mt-1 text-xs text-red-500">
                            {errors.varians[0].hargaJual.message}
                          </FieldError>
                        )}
                    </Field>
                  </div>
                  
                  {/* Packing Susun */}
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="font-medium text-slate-700 text-sm">Packing Susun</span>
                    </div>
                    
                    <Field>
                      <FieldLabel htmlFor="modal-susun" className="text-xs font-medium text-slate-600 mb-1 block">
                        Modal HPP (Rp) <span className="text-red-500">*</span>
                      </FieldLabel>
                      <Controller
                        name="varians.1.hargaModal"
                        control={control}
                        render={({ field }) => (
                          <CurrencyInput
                            id="modal-susun"
                            placeholder="0"
                            className="h-9 text-sm"
                            disabled={mutation.isPending}
                            value={field.value}
                            onChange={field.onChange}
                          />
                        )}
                      />
                      {errors.varians !== undefined &&
                        errors.varians[1]?.hargaModal !== undefined && (
                          <FieldError className="mt-1 text-xs text-red-500">
                            {errors.varians[1].hargaModal.message}
                          </FieldError>
                        )}
                    </Field>
                    
                    <Field>
                      <FieldLabel htmlFor="jual-susun" className="text-xs font-medium text-slate-600 mb-1 block">
                        Harga Jual (Rp) <span className="text-red-500">*</span>
                      </FieldLabel>
                      <Controller
                        name="varians.1.hargaJual"
                        control={control}
                        render={({ field }) => (
                          <CurrencyInput
                            id="jual-susun"
                            placeholder="0"
                            className="h-9 text-sm"
                            disabled={mutation.isPending}
                            value={field.value}
                            onChange={field.onChange}
                          />
                        )}
                      />
                      {errors.varians !== undefined &&
                        errors.varians[1]?.hargaJual !== undefined && (
                          <FieldError className="mt-1 text-xs text-red-500">
                            {errors.varians[1].hargaJual.message}
                          </FieldError>
                        )}
                    </Field>
                  </div>
                </div>
              </div>
            </FieldGroup>
          </FieldSet>
          
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
              disabled={mutation.isPending}
              type="submit"
              className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-white"
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
                "Simpan"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default TambahBarang;
