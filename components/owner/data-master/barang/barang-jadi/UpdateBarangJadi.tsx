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
import { CurrencyInput } from "@/components/currency-input";
import { updateBarangJadi } from "@/services/barang-jadi.service";
import { BarangJadi, ErrorResponse } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useEffect, useState, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { Pencil } from "lucide-react";
import z from "zod";

// Schema dengan validasi margin (hargaJual >= hargaModal)
const varianObjectSchema = z.object({
  id: z.number().optional(),
  hargaModal: z.number().min(0, "Harga tidak boleh negatif"),
  hargaJual: z.number().min(0, "Harga tidak boleh negatif"),
}).refine(
  (data) => {
    if (data.hargaModal === 0 && data.hargaJual === 0) return true;
    return data.hargaJual >= data.hargaModal;
  },
  {
    message: "Harga jual tidak boleh lebih kecil dari modal",
    path: ["hargaJual"],
  }
);

const updateFormSchema = z.object({
  name: z.string().min(1, "Nama Barang harus di isi"),
  curah: varianObjectSchema,
  susun: varianObjectSchema,
});

type UpdateFormValues = z.infer<typeof updateFormSchema>;

function UpdateBarangJadi({
  data,
  token,
  query,
}: {
  data: BarangJadi;
  token: string;
  query: string;
}) {
  // Extract curah dan susun data berdasarkan jenisPacking, bukan index
  const { curahData, susunData } = useMemo(() => {
    const curah = data.varians.find(v => v.jenisPacking === "curah");
    const susun = data.varians.find(v => v.jenisPacking === "susun");
    return { curahData: curah, susunData: susun };
  }, [data.varians]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isDirty },
  } = useForm<UpdateFormValues>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: {
      name: data.name,
      curah: {
        id: curahData?.id,
        hargaModal: curahData?.hargaModal ?? 0,
        hargaJual: curahData?.hargaJual ?? 0,
      },
      susun: {
        id: susunData?.id,
        hargaModal: susunData?.hargaModal ?? 0,
        hargaJual: susunData?.hargaJual ?? 0,
      },
    },
  });

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!data) return;
    
    const curah = data.varians.find(v => v.jenisPacking === "curah");
    const susun = data.varians.find(v => v.jenisPacking === "susun");
    
    reset({
      name: data.name,
      curah: {
        id: curah?.id,
        hargaModal: curah?.hargaModal ?? 0,
        hargaJual: curah?.hargaJual ?? 0,
      },
      susun: {
        id: susun?.id,
        hargaModal: susun?.hargaModal ?? 0,
        hargaJual: susun?.hargaJual ?? 0,
      },
    });
  }, [data, reset]);

  const mutation = useMutation({
    mutationFn: async (formData: UpdateFormValues) => {
      // Transform form data ke format API
      const varians = [];
      
      if (formData.curah.id) {
        varians.push({
          id: formData.curah.id,
          jenisPacking: "curah" as const,
          hargaModal: formData.curah.hargaModal,
          hargaJual: formData.curah.hargaJual,
        });
      }
      
      if (formData.susun.id) {
        varians.push({
          id: formData.susun.id,
          jenisPacking: "susun" as const,
          hargaModal: formData.susun.hargaModal,
          hargaJual: formData.susun.hargaJual,
        });
      }
      
      return await updateBarangJadi(data.id, {
        name: formData.name,
        varians: varians.length > 0 ? varians : undefined,
      }, token);
    },
    onSuccess: (response) => {
      if (!response.success) throw response;

      toast.success(response.message);
      setOpenDialog(false);
      queryClient.invalidateQueries({
        queryKey: [query],
      });
    },
    onError: async (error: ErrorResponse) => {
      if (error.statusCode === 401) {
        toast.error(error.message);
        await signOut({ redirect: true, redirectTo: "/" });
      }
      toast.error(error.message);
    },
  });

  const onSubmit = (formData: UpdateFormValues) => {
    mutation.mutate(formData);
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="h-8 w-8 text-slate-500 hover:text-amber-600 hover:bg-amber-50"
        >
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
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
                  Edit Barang
                </DialogTitle>
                <p className="text-sm text-slate-500 font-mono">{data.kode}</p>
              </div>
            </div>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Nama Barang */}
            <div className="space-y-2">
              <label 
                htmlFor="name" 
                className="block text-sm font-medium text-slate-700"
              >
                Nama Barang
              </label>
              <Input
                autoComplete="off"
                disabled={mutation.isPending}
                id="name"
                className="h-11 bg-slate-50 border-slate-200 rounded-lg focus:bg-white focus:border-amber-500 focus:ring-amber-500/20 transition-all"
                type="text"
                placeholder="Masukkan nama barang"
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

            {/* Packing Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Packing Curah */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <h3 className="text-sm font-semibold text-slate-700">Packing Curah</h3>
                  {!curahData && (
                    <span className="text-xs text-slate-400">(tidak ada)</span>
                  )}
                </div>
                <div className="space-y-3">
                  <div>
                    <label htmlFor="modal-curah" className="block text-xs text-slate-500 mb-1">
                      Modal HPP (Rp)
                    </label>
                    <Controller
                      name="curah.hargaModal"
                      control={control}
                      render={({ field }) => (
                        <CurrencyInput
                          id="modal-curah"
                          disabled={mutation.isPending || !curahData}
                          className="h-10 bg-white/80 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-blue-500/20 disabled:opacity-50"
                          placeholder="0"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label htmlFor="jual-curah" className="block text-xs text-slate-500 mb-1">
                      Harga Jual (Rp)
                    </label>
                    <Controller
                      name="curah.hargaJual"
                      control={control}
                      render={({ field }) => (
                        <CurrencyInput
                          id="jual-curah"
                          disabled={mutation.isPending || !curahData}
                          className="h-10 bg-white/80 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-blue-500/20 disabled:opacity-50"
                          placeholder="0"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                    {errors.curah?.hargaJual && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.curah.hargaJual.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Packing Susun */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <h3 className="text-sm font-semibold text-slate-700">Packing Susun</h3>
                  {!susunData && (
                    <span className="text-xs text-slate-400">(tidak ada)</span>
                  )}
                </div>
                <div className="space-y-3">
                  <div>
                    <label htmlFor="modal-susun" className="block text-xs text-slate-500 mb-1">
                      Modal HPP (Rp)
                    </label>
                    <Controller
                      name="susun.hargaModal"
                      control={control}
                      render={({ field }) => (
                        <CurrencyInput
                          id="modal-susun"
                          disabled={mutation.isPending || !susunData}
                          className="h-10 bg-white/80 border-amber-200 rounded-lg focus:border-amber-500 focus:ring-amber-500/20 disabled:opacity-50"
                          placeholder="0"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label htmlFor="jual-susun" className="block text-xs text-slate-500 mb-1">
                      Harga Jual (Rp)
                    </label>
                    <Controller
                      name="susun.hargaJual"
                      control={control}
                      render={({ field }) => (
                        <CurrencyInput
                          id="jual-susun"
                          disabled={mutation.isPending || !susunData}
                          className="h-10 bg-white/80 border-amber-200 rounded-lg focus:border-amber-500 focus:ring-amber-500/20 disabled:opacity-50"
                          placeholder="0"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                    {errors.susun?.hargaJual && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.susun.hargaJual.message}
                      </p>
                    )}
                  </div>
                </div>
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

export default UpdateBarangJadi;
