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
        <Button className="bg-primary-orange">Ubah</Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          <DialogHeader>
            <DialogTitle>Ubah Data {data.namaDepan}</DialogTitle>
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
              <Field>
                <div className="flex items-center w-full text-xs">
                  <FieldLabel
                    htmlFor="status"
                    className="w-2/3 md:w-1/3 font-normal"
                  >
                    Status :
                  </FieldLabel>
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
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih Status" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="aktif">Aktif</SelectItem>
                        <SelectItem value="nonaktif">Nonaktif</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                {errors.status && (
                  <FieldError>{errors.status.message}</FieldError>
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
              disabled={mutation.isPending || !isDirty}
              type="submit"
              className="bg-primary-green"
            >
              {mutation.isPending ? "Menyimpan" : "Ubah"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateKaryawan;
