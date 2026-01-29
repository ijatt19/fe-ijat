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
  createModalPriveSchema,
  CreateModalPriveValues,
} from "@/lib/schemas/modal-prive";
import { createModalPrive } from "@/services/modal-prive.service";
import { ErrorResponse, JenisModalPrive } from "@/types/api";
import { formatRupiah } from "@/utils/formatRupiah";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Calendar } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

function TambahModalPrive({ token }: { token: string }) {
  const [openDialog, setOpenDialog] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateModalPriveValues>({
    resolver: zodResolver(createModalPriveSchema),
  });

  const jenis = watch("jenis");

  const mutation = useMutation({
    mutationFn: async (values: CreateModalPriveValues) => {
      return await createModalPrive(values, token);
    },
    onSuccess: (response) => {
      if (!response.success) throw response;

      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: ["modal-prive"],
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

  const onSubmit = (data: CreateModalPriveValues) => {
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
        <Button className="bg-primary-green">Tambah +</Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          <DialogHeader>
            <DialogTitle>Tambah Transaksi Modal/Prive</DialogTitle>
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
                    <p>
                      {new Date().toLocaleString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
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
                      value={formatRupiah(field.value ?? "")}
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

export default TambahModalPrive;
