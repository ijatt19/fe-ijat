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
        <Button className="bg-primary-green">Tambah</Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          <DialogHeader>
            <DialogTitle>Tambah Karyawan</DialogTitle>
          </DialogHeader>
          <FieldSet>
            <FieldGroup>
              <Field>
                <div className="flex items-center w-full text-xs">
                  <FieldLabel
                    htmlFor="namaDepan"
                    className="w-2/3 md:w-1/3 font-normal"
                  >
                    Nama Depan :
                  </FieldLabel>
                  <Input
                    autoComplete="off"
                    disabled={mutation.isPending}
                    id="namaDepan"
                    className="w-full"
                    type="text"
                    {...register("namaDepan")}
                  />
                </div>
                {errors.namaDepan && (
                  <FieldError>{errors.namaDepan.message}</FieldError>
                )}
              </Field>
              <Field>
                <div className="flex items-center w-full text-xs">
                  <FieldLabel
                    htmlFor="namaBelakang"
                    className="w-2/3 md:w-1/3 font-normal"
                  >
                    Nama Belakang :
                  </FieldLabel>
                  <Input
                    autoComplete="off"
                    disabled={mutation.isPending}
                    id="namaBelakang"
                    className="w-full"
                    type="text"
                    {...register("namaBelakang")}
                  />
                </div>
                {errors.namaBelakang && (
                  <FieldError>{errors.namaBelakang.message}</FieldError>
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
              <Field>
                <div className="flex items-center w-full text-xs">
                  <FieldLabel
                    htmlFor="jabatan"
                    className="w-2/3 md:w-1/3 font-normal"
                  >
                    Jabatan :
                  </FieldLabel>
                  <Input
                    autoComplete="off"
                    disabled={mutation.isPending}
                    id="jabatan"
                    className="w-full"
                    type="text"
                    {...register("jabatan")}
                  />
                </div>
                {errors.jabatan && (
                  <FieldError>{errors.jabatan.message}</FieldError>
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

export default TambahKaryawan;
