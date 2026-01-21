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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  updateBarangJadiSchema,
  UpdateBarangJadiValues,
} from "@/lib/schemas/barang-jadi";
import { updateBarangJadi } from "@/services/barang-jadi.service";
import { BarangJadi, ErrorResponse } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function UpdateBarangJadi({
  data,
  token,
  query,
}: {
  data: BarangJadi;
  token: string;
  query: string;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<UpdateBarangJadiValues>({
    resolver: zodResolver(updateBarangJadiSchema),
    defaultValues: {
      name: data.name,
      varians: data.varians.map((item) => ({
        id: item.id,
        hargaJual: item.hargaJual,
        hargaModal: item.hargaModal,
        jenisPacking: item.jenisPacking,
      })),
    },
  });

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!data) return;
    reset({
      name: data.name,
      varians: data.varians.map((item) => ({
        id: item.id,
        hargaJual: item.hargaJual,
        hargaModal: item.hargaModal,
        jenisPacking: item.jenisPacking,
      })),
    });
  }, [data, reset]);

  const mutation = useMutation({
    mutationFn: async (value: UpdateBarangJadiValues) => {
      return await updateBarangJadi(data.id, value, token);
    },
    onSuccess: (response) => {
      if (!response.success) throw response;

      toast.success(response.message);
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

  const onSubmit = (data: UpdateBarangJadiValues) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button className="bg-primary-orange">Ubah</Button>
      </DialogTrigger>
      <DialogContent className="w-[90%] h-[90%] max-w-none md:h-auto md:max-w-lg overflow-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          <DialogHeader>
            <DialogTitle>Ubah {data.name}</DialogTitle>
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
                  <p className="underline text-slate-500">{data.kode}</p>
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
              disabled={mutation.isPending || !isDirty}
              type="submit"
              className="bg-primary-orange"
            >
              {mutation.isPending ? "Menyimpan" : "Ubah"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateBarangJadi;
