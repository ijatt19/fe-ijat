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
  createSupplierSchema,
  CreateSupplierValues,
} from "@/lib/schemas/supplier";
import { createSupplier } from "@/services/supplier.service";
import { ErrorResponse } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function TambahSupplier({ token }: { token: string }) {
  const [openDialog, setOpenDialog] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateSupplierValues>({
    resolver: zodResolver(createSupplierSchema),
  });

  const mutation = useMutation({
    mutationFn: async (values: CreateSupplierValues) => {
      return await createSupplier(values, token);
    },
    onSuccess: (response) => {
      if (!response.success) throw response;

      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: ["supplier"],
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

  const onSubmit = (data: CreateSupplierValues) => {
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
        <Button className="bg-primary-green">Tambah</Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          <DialogHeader>
            <DialogTitle>Tambah Supplier</DialogTitle>
          </DialogHeader>
          <FieldSet>
            <FieldGroup>
              <Field>
                <div className="flex items-center w-full text-xs">
                  <FieldLabel
                    htmlFor="nama"
                    className="w-2/3 md:w-1/3 font-normal"
                  >
                    Nama :
                  </FieldLabel>
                  <Input
                    autoComplete="off"
                    disabled={mutation.isPending}
                    id="nama"
                    className="w-full"
                    type="text"
                    {...register("nama")}
                  />
                </div>
                {errors.nama && <FieldError>{errors.nama.message}</FieldError>}
              </Field>
              <Field>
                <div className="flex items-center w-full text-xs">
                  <FieldLabel
                    htmlFor="kategori"
                    className="w-2/3 md:w-1/3 font-normal"
                  >
                    Kategori :
                  </FieldLabel>
                  <Input
                    autoComplete="off"
                    disabled={mutation.isPending}
                    id="kategori"
                    className="w-full"
                    type="text"
                    {...register("kategori")}
                  />
                </div>
                {errors.kategori && (
                  <FieldError>{errors.kategori.message}</FieldError>
                )}
              </Field>
              <Field>
                <div className="flex items-center w-full text-xs">
                  <FieldLabel
                    htmlFor="contact"
                    className="w-2/3 md:w-1/3 font-normal"
                  >
                    Contact Person :
                  </FieldLabel>
                  <Input
                    autoComplete="off"
                    disabled={mutation.isPending}
                    id="contact"
                    className="w-full"
                    type="text"
                    {...register("contactPerson")}
                  />
                </div>
                {errors.contactPerson && (
                  <FieldError>{errors.contactPerson.message}</FieldError>
                )}
              </Field>
              <Field>
                <div className="flex items-center w-full text-xs">
                  <FieldLabel
                    htmlFor="noHp"
                    className="w-2/3 md:w-1/3 font-normal"
                  >
                    No Hp :
                  </FieldLabel>
                  <Input
                    autoComplete="off"
                    disabled={mutation.isPending}
                    id="noHp"
                    className="w-full"
                    type="text"
                    {...register("noHp")}
                  />
                </div>
                {errors.noHp && <FieldError>{errors.noHp.message}</FieldError>}
              </Field>
              <Field>
                <div className="flex items-center w-full text-xs">
                  <FieldLabel
                    htmlFor="alamat"
                    className="w-2/3 md:w-1/3 font-normal"
                  >
                    Alamat :
                  </FieldLabel>
                  <Input
                    autoComplete="off"
                    disabled={mutation.isPending}
                    id="alamat"
                    className="w-full"
                    type="text"
                    {...register("alamat")}
                  />
                </div>
                {errors.alamat && (
                  <FieldError>{errors.alamat.message}</FieldError>
                )}
              </Field>
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

export default TambahSupplier;
