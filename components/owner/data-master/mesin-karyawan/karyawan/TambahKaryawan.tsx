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
  createKaryawanSchema,
  CreateKaryawanValues,
} from "@/lib/schemas/karyawan";
import { createKaryawan } from "@/services/karyawan.service";
import { ErrorResponse } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function TambahKaryawan({ token }: { token: string }) {
  const [openDialog, setOpenDialog] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateKaryawanValues>({
    resolver: zodResolver(createKaryawanSchema),
  });

  const mutation = useMutation({
    mutationFn: async (values: CreateKaryawanValues) => {
      return await createKaryawan(values, token);
    },
    onSuccess: (response) => {
      if (!response.success) throw response;

      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: ["karyawan"],
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

  const onSubmit = (data: CreateKaryawanValues) => {
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
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Tambah Karyawan
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-6"
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-lg">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-amber-100">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              Tambah Karyawan Baru
            </DialogTitle>
          </DialogHeader>
          
          <FieldSet>
            <FieldGroup className="space-y-4">
              {/* Nama Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="namaDepan" className="text-sm font-medium text-slate-700 mb-1.5 block">
                    Nama Depan <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    autoComplete="off"
                    disabled={mutation.isPending}
                    id="namaDepan"
                    placeholder="Nama depan"
                    className="h-10"
                    type="text"
                    {...register("namaDepan")}
                  />
                  {errors.namaDepan && (
                    <FieldError className="mt-1 text-xs text-red-500">
                      {errors.namaDepan.message}
                    </FieldError>
                  )}
                </Field>
                
                <Field>
                  <FieldLabel htmlFor="namaBelakang" className="text-sm font-medium text-slate-700 mb-1.5 block">
                    Nama Belakang
                  </FieldLabel>
                  <Input
                    autoComplete="off"
                    disabled={mutation.isPending}
                    id="namaBelakang"
                    placeholder="Nama belakang"
                    className="h-10"
                    type="text"
                    {...register("namaBelakang")}
                  />
                  {errors.namaBelakang && (
                    <FieldError className="mt-1 text-xs text-red-500">
                      {errors.namaBelakang.message}
                    </FieldError>
                  )}
                </Field>
              </div>
              
              {/* No HP */}
              <Field>
                <FieldLabel htmlFor="noHp" className="text-sm font-medium text-slate-700 mb-1.5 block">
                  No HP <span className="text-red-500">*</span>
                </FieldLabel>
                <NumericInput
                  autoComplete="off"
                  disabled={mutation.isPending}
                  id="noHp"
                  placeholder="08xxxxxxxxxx"
                  className="h-10"
                  {...register("noHp")}
                />
                {errors.noHp && (
                  <FieldError className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.noHp.message}
                  </FieldError>
                )}
              </Field>
              
              {/* Alamat */}
              <Field>
                <FieldLabel htmlFor="alamat" className="text-sm font-medium text-slate-700 mb-1.5 block">
                  Alamat <span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  autoComplete="off"
                  disabled={mutation.isPending}
                  id="alamat"
                  placeholder="Alamat lengkap"
                  className="h-10"
                  type="text"
                  {...register("alamat")}
                />
                {errors.alamat && (
                  <FieldError className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.alamat.message}
                  </FieldError>
                )}
              </Field>
              
              {/* Jabatan */}
              <Field>
                <FieldLabel htmlFor="jabatan" className="text-sm font-medium text-slate-700 mb-1.5 block">
                  Jabatan <span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  autoComplete="off"
                  disabled={mutation.isPending}
                  id="jabatan"
                  placeholder="cth: Operator, Supervisor, Admin"
                  className="h-10"
                  type="text"
                  {...register("jabatan")}
                />
                {errors.jabatan && (
                  <FieldError className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.jabatan.message}
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
                "Simpan"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default TambahKaryawan;
