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
import { Textarea } from "@/components/ui/textarea";
import {
  updateModalPriveSchema,
  UpdateModalPriveValues,
} from "@/lib/schemas/modal-prive";
import { updateModalPrive } from "@/services/modal-prive.service";
import { ErrorResponse, JenisModalPrive, ModalPrive } from "@/types/api";
import { formatRupiah } from "@/utils/formatRupiah";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Calendar } from "lucide-react";
import { signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

function UpdateModalPrive({
  data,
  token,
  query,
}: {
  data: ModalPrive;
  token: string;
  query: string;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm<UpdateModalPriveValues>({
    resolver: zodResolver(updateModalPriveSchema),
    defaultValues: {
      jenis: data.jenis,
      keterangan: data.keterangan,
      nominal: data.nominal,
    },
  });

  const jenis = watch("jenis");

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!data) return;
    reset({
      jenis: data.jenis,
      keterangan: data.keterangan,
      nominal: data.nominal,
    });
  }, [data, reset]);

  const mutation = useMutation({
    mutationFn: async (value: UpdateModalPriveValues) => {
      return await updateModalPrive(data.id, value, token);
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
  const onSubmit = (data: UpdateModalPriveValues) => {
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
            <DialogTitle>Ubah Transaksi Modal/Prive</DialogTitle>
          </DialogHeader>
          <FieldSet>
            <FieldGroup>
              <Field>
                <div className="flex items-center text-xs gap-x-4">
                  <Select
                    disabled={mutation.isPending}
                    value={jenis}
                    onValueChange={(value) => {
                      setValue("jenis", value as JenisModalPrive, {
                        shouldDirty: true,
                        shouldValidate: true,
                      });
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Jenis Transaksi" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Jenis Transaksi</SelectLabel>
                        <SelectItem value={JenisModalPrive.SETOR_MODAL}>
                          Setor Modal
                        </SelectItem>
                        <SelectItem value={JenisModalPrive.TARIK_PRIVE}>
                          Tarik Prive
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <div className="w-full flex items-center gap-x-2 justify-center rounded border py-1">
                    <p>{data.createdAt}</p>
                    <Calendar className="w-4" />
                  </div>
                </div>
                {errors.jenis && (
                  <FieldError>{errors.jenis.message}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel
                  htmlFor="nominal"
                  className="w-2/3 md:w-1/3 font-normal"
                >
                  Nominal Modal/Prive :
                </FieldLabel>
                <Controller
                  name="nominal"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="nominal"
                      type="text"
                      autoComplete="off"
                      disabled={mutation.isPending}
                      className="w-full"
                      inputMode="numeric"
                      placeholder="Masukkan nominal"
                      value={formatRupiah(field.value)}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/\D/g, "");
                        field.onChange(raw);
                      }}
                    />
                  )}
                />
                {errors.nominal && (
                  <FieldError>{errors.nominal.message}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel
                  htmlFor="keterangan"
                  className="w-2/3 md:w-1/3 font-normal"
                >
                  Keterangan :
                </FieldLabel>
                <Textarea
                  autoComplete="off"
                  disabled={mutation.isPending}
                  id="keterangan"
                  className="w-full"
                  {...register("keterangan")}
                />
                {errors.keterangan && (
                  <FieldError>{errors.keterangan.message}</FieldError>
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

export default UpdateModalPrive;
