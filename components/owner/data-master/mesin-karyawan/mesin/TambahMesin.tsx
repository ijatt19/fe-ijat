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
import { Textarea } from "@/components/ui/textarea";
import { createMesinSchema, CreateMesinValues } from "@/lib/schemas/mesin";
import { createMesin } from "@/services/mesin.service";
import { ErrorResponse } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function TambahMesin({ token }: { token: string }) {
  const [openDialog, setOpenDialog] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateMesinValues>({
    resolver: zodResolver(createMesinSchema),
  });

  const mutation = useMutation({
    mutationFn: async (values: CreateMesinValues) => {
      return await createMesin(values, token);
    },
    onSuccess: (response) => {
      if (!response.success) throw response;

      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: ["mesin"],
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

  const onSubmit = (data: CreateMesinValues) => {
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
            <DialogTitle>Tambah Mesin</DialogTitle>
          </DialogHeader>
          <FieldSet>
            <FieldGroup>
              <Field>
                <div className="flex items-center w-full text-xs">
                  <FieldLabel
                    htmlFor="nama"
                    className="w-2/3 md:w-1/3 font-normal"
                  >
                    Nama Mesin :
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
                    htmlFor="merk"
                    className="w-2/3 md:w-1/3 font-normal"
                  >
                    Merk Mesin :
                  </FieldLabel>
                  <Input
                    autoComplete="off"
                    disabled={mutation.isPending}
                    id="merk"
                    className="w-full"
                    type="text"
                    {...register("merk")}
                  />
                </div>
                {errors.merk && <FieldError>{errors.merk.message}</FieldError>}
              </Field>
              <Field>
                <div className="flex items-center w-full text-xs">
                  <FieldLabel
                    htmlFor="kapasitas"
                    className="w-2/3 md:w-1/3 font-normal"
                  >
                    Kapasitas Cetak :
                  </FieldLabel>
                  <Input
                    autoComplete="off"
                    inputMode="decimal"
                    disabled={mutation.isPending}
                    id="kapasitas"
                    className="w-full"
                    type="text"
                    {...register("kapasitasCetak", {
                      setValueAs: (v) =>
                        typeof v === "string" ? v.replace(",", ".") : v,
                    })}
                  />
                </div>
                {errors.kapasitasCetak && (
                  <FieldError>{errors.kapasitasCetak.message}</FieldError>
                )}
              </Field>
              <Field>
                <div className="flex items-center w-full text-xs">
                  <FieldLabel
                    htmlFor="spek"
                    className="w-2/3 md:w-1/3 font-normal"
                  >
                    Spesifikasi :
                  </FieldLabel>
                  <Textarea
                    autoComplete="off"
                    disabled={mutation.isPending}
                    id="spek"
                    className="w-full"
                    {...register("spesifikasi")}
                  />
                </div>
                {errors.merk && <FieldError>{errors.merk.message}</FieldError>}
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

export default TambahMesin;
