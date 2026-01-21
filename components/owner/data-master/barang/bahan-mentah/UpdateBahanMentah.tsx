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
  updateBahanMentahSchema,
  UpdateBahanMentahValues,
} from "@/lib/schemas/bahan-mentah";
import { updateBahanMentah } from "@/services/bahan-mentah.service";
import { BahanMentah, ErrorResponse } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function UpdateBahanMentah({
  data,
  token,
  query,
}: {
  data: BahanMentah;
  token: string;
  query: string;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<UpdateBahanMentahValues>({
    resolver: zodResolver(updateBahanMentahSchema),
    defaultValues: {
      name: data.name,
      batasMinimum: data.batasMinimum,
      satuan: data.satuan,
    },
  });

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!data) return;
    reset({
      name: data.name,
      batasMinimum: data.batasMinimum,
      satuan: data.satuan,
    });
  }, [data, reset]);

  const mutation = useMutation({
    mutationFn: async (value: UpdateBahanMentahValues) => {
      return await updateBahanMentah(data.id, value, token);
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

  const onSubmit = (data: UpdateBahanMentahValues) => {
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
            <DialogTitle>Tambah Bahan Mentah</DialogTitle>
          </DialogHeader>
          <FieldSet>
            <FieldGroup>
              <Field>
                <div className="flex w-full gap-x-4 text-xs items-center">
                  <FieldLabel htmlFor="kode" className="font-normal">
                    Kode Bahan :
                  </FieldLabel>
                  <p className="underline text-slate-500">Otomatis</p>
                </div>
              </Field>
              <Field>
                <div className="flex items-center w-full text-xs">
                  <FieldLabel
                    htmlFor="name"
                    className="w-2/3 md:w-1/3 font-normal"
                  >
                    Nama Bahan :
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
                <div className="flex items-center w-full text-xs">
                  <FieldLabel
                    htmlFor="satuan"
                    className="w-2/3 md:w-1/3 font-normal"
                  >
                    Satuan Stok :
                  </FieldLabel>
                  <Input
                    autoComplete="off"
                    disabled={mutation.isPending}
                    id="satuan"
                    className="w-full"
                    type="text"
                    {...register("satuan")}
                  />
                </div>
                {errors.satuan && (
                  <FieldError>{errors.satuan.message}</FieldError>
                )}
              </Field>
              <Field>
                <div className="flex items-center w-full text-xs">
                  <FieldLabel
                    htmlFor="batas"
                    className="w-2/3 md:w-1/3 font-normal"
                  >
                    Batas Minimum :
                  </FieldLabel>
                  <Input
                    autoComplete="off"
                    disabled={mutation.isPending}
                    id="batas"
                    className="w-full"
                    type="number"
                    {...register("batasMinimum", {
                      valueAsNumber: true,
                    })}
                  />
                </div>
                {errors.batasMinimum && (
                  <FieldError>{errors.batasMinimum.message}</FieldError>
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

export default UpdateBahanMentah;
