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
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function TambahBarang({ token }: { token: string }) {
  const {
    register,
    handleSubmit,
    reset,
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
      // queryClient.invalidateQueries({
      //   queryKey: ["header-konten"],
      // });
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
        <Button className="bg-primary-green">Tambah</Button>
      </DialogTrigger>
      <DialogContent className="w-[90%] h-[90%] max-w-none md:h-auto md:max-w-lg overflow-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          <DialogHeader>
            <DialogTitle>Tambah Barang Baru</DialogTitle>
          </DialogHeader>
          <FieldSet>
            <FieldGroup>
              <Field>
                <div className="flex items-center w-full text-xs">
                  <FieldLabel
                    htmlFor="name"
                    className="w-1/2 md:w-1/3 font-normal"
                  >
                    Nama Barang :
                  </FieldLabel>
                  <Input
                    autoComplete="off"
                    disabled={mutation.isPending}
                    id="name"
                    className="w-full"
                    type="text"
                    {...register("name")}
                  />
                </div>
                {errors.name && <FieldError>{errors.name.message}</FieldError>}
              </Field>
              <Field>
                <div className="flex w-full gap-x-4 text-xs items-center">
                  <FieldLabel htmlFor="kode" className="font-normal">
                    Kode Barang :
                  </FieldLabel>
                  <p className="underline text-slate-500">Otomatis</p>
                </div>
              </Field>
              <p className="text-base font-semibold">Detail Selengkapnya</p>
              <div className="flex flex-col gap-y-4 md:flex-row md:w-full md:gap-x-4">
                <div className="flex flex-col gap-y-4 md:w-full">
                  <p>Packing Curah</p>
                  <Field>
                    <FieldLabel htmlFor="modal-curah" className="font-normal">
                      Modal HPP (RP)
                    </FieldLabel>
                    <Input
                      autoComplete="off"
                      disabled={mutation.isPending}
                      id="modal-curah"
                      type="number"
                      {...register("varians.0.hargaModal", {
                        valueAsNumber: true,
                      })}
                    />
                    {errors.varians !== undefined &&
                      errors.varians[0]?.hargaModal !== undefined && (
                        <FieldError>
                          {errors.varians[0].hargaModal.message}
                        </FieldError>
                      )}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="jual-curah" className="font-normal">
                      Harga Jual (RP)
                    </FieldLabel>
                    <Input
                      autoComplete="off"
                      disabled={mutation.isPending}
                      id="jual-curah"
                      type="number"
                      {...register("varians.0.hargaJual", {
                        valueAsNumber: true,
                      })}
                    />
                    {errors.varians !== undefined &&
                      errors.varians[0]?.hargaJual !== undefined && (
                        <FieldError>
                          {errors.varians[0].hargaJual.message}
                        </FieldError>
                      )}
                  </Field>
                </div>
                <div className="flex flex-col gap-y-4 md:w-full">
                  <p>Packing Susun</p>
                  <Field>
                    <FieldLabel htmlFor="modal-susun" className="font-normal">
                      Modal HPP (RP)
                    </FieldLabel>
                    <Input
                      autoComplete="off"
                      disabled={mutation.isPending}
                      id="modal-susun"
                      type="number"
                      {...register("varians.1.hargaModal", {
                        valueAsNumber: true,
                      })}
                    />
                    {errors.varians !== undefined &&
                      errors.varians[1]?.hargaModal !== undefined && (
                        <FieldError>
                          {errors.varians[1].hargaModal.message}
                        </FieldError>
                      )}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="jual-susun" className="font-normal">
                      Harga Jual (RP)
                    </FieldLabel>
                    <Input
                      autoComplete="off"
                      disabled={mutation.isPending}
                      id="jual-susun"
                      type="number"
                      {...register("varians.1.hargaJual", {
                        valueAsNumber: true,
                      })}
                    />
                    {errors.varians !== undefined &&
                      errors.varians[1]?.hargaJual !== undefined && (
                        <FieldError>
                          {errors.varians[1].hargaJual.message}
                        </FieldError>
                      )}
                  </Field>
                </div>
              </div>
            </FieldGroup>
          </FieldSet>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                disabled={mutation.isPending}
                className="bg-primary-orange"
              >
                Batal
              </Button>
            </DialogClose>
            <Button
              disabled={mutation.isPending}
              type="submit"
              className="bg-primary-green"
            >
              {mutation.isPending ? "Menyimpan" : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default TambahBarang;
