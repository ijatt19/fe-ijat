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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { NumericInput } from "@/components/numeric-input";
import {
  createBahanMentahSchema,
  CreateBahanMentahValues,
} from "@/lib/schemas/bahan-mentah";
import { createBahanMentah } from "@/services/bahan-mentah.service";
import { ErrorResponse } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function TambahBahan({ token }: { token: string }) {
  const [openDialog, setOpenDialog] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateBahanMentahValues>({
    resolver: zodResolver(createBahanMentahSchema),
  });

  const mutation = useMutation({
    mutationFn: async (values: CreateBahanMentahValues) => {
      return await createBahanMentah(values, token);
    },
    onSuccess: (response) => {
      if (!response.success) throw response;

      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: ["bahan-mentah"],
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

  const onSubmit = (data: CreateBahanMentahValues) => {
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
        <Button className="h-10 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Tambah Bahan
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-6"
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-lg">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-100">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              Tambah Bahan Mentah
            </DialogTitle>
          </DialogHeader>
          
          <FieldSet>
            <FieldGroup className="space-y-4">
              {/* Kode Bahan - Auto */}
              <Field>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <FieldLabel htmlFor="kode" className="text-sm text-slate-600 font-medium">
                    Kode Bahan
                  </FieldLabel>
                  <span className="text-sm text-slate-400 italic">Otomatis</span>
                </div>
              </Field>
              
              {/* Nama Bahan */}
              <Field>
                <FieldLabel htmlFor="name" className="text-sm font-medium text-slate-700 mb-1.5 block">
                  Nama Bahan <span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  autoComplete="off"
                  disabled={mutation.isPending}
                  id="name"
                  placeholder="Masukkan nama bahan"
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
              
              {/* Satuan Stok */}
              <Field>
                <FieldLabel htmlFor="satuan" className="text-sm font-medium text-slate-700 mb-1.5 block">
                  Satuan Stok <span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  autoComplete="off"
                  disabled={mutation.isPending}
                  id="satuan"
                  placeholder="cth: kg, pcs, meter"
                  className="h-10"
                  type="text"
                  {...register("satuan")}
                />
                {errors.satuan && (
                  <FieldError className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.satuan.message}
                  </FieldError>
                )}
              </Field>
              
              {/* Batas Minimum */}
              <Field>
                <FieldLabel htmlFor="batas" className="text-sm font-medium text-slate-700 mb-1.5 block">
                  Batas Minimum <span className="text-red-500">*</span>
                </FieldLabel>
                <NumericInput
                  autoComplete="off"
                  disabled={mutation.isPending}
                  id="batas"
                  placeholder="0"
                  className="h-10"
                  {...register("batasMinimum", {
                    valueAsNumber: true,
                  })}
                />
                {errors.batasMinimum && (
                  <FieldError className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.batasMinimum.message}
                  </FieldError>
                )}
              </Field>
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

export default TambahBahan;
