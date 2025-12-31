"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
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
import { ProfilFormValues, profilSchema } from "@/lib/schemas/pengaturan";
import { updateUserProfile } from "@/services/user.service";
import { ErrorResponse, User } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function UpdateForm({ dataUser, token }: { dataUser: User; token: string }) {
  const router = useRouter();
  const [openUbahDialog, setOpenUbahDialog] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ProfilFormValues>({
    resolver: zodResolver(profilSchema),
    defaultValues: {
      namaDepan: dataUser.namaDepan,
      namaBelakang: dataUser.namaBelakang,
      username: dataUser.username,
      email: dataUser.email,
      noHp: dataUser.noHp,
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: ProfilFormValues) => {
      return await updateUserProfile(token, dataUser.id, values);
    },
    onSuccess: (response) => {
      if (!response.success) throw response;

      toast.success(response.message);
      setOpenUbahDialog(false);
      router.refresh();
    },
    onError: async (error: ErrorResponse) => {
      if (error.statusCode === 401) {
        toast.error(error.message);
        await signOut({ redirect: true, redirectTo: "/" });
      }
      toast.error(error.message);
    },
  });

  const ubahSubmitHandler = (data: ProfilFormValues) => {
    mutation.mutate(data);
  };
  return (
    <Dialog open={openUbahDialog} onOpenChange={setOpenUbahDialog}>
      <DialogTrigger asChild>
        <Button className="rounded bg-primary-blue border border-primary-blue hover:bg-inherit hover:text-primary-blue">
          Ubah
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Ubah Profil</DialogTitle>
        <form onSubmit={handleSubmit(ubahSubmitHandler)}>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="n-depan">Nama Depan</FieldLabel>
                <Input
                  type="text"
                  id="n-depan"
                  {...register("namaDepan")}
                  disabled={mutation.isPending}
                />
                {errors.namaDepan && (
                  <FieldError>{errors.namaDepan.message}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="n-belakang">Nama Belakang</FieldLabel>
                <Input
                  type="text"
                  id="n-belakang"
                  {...register("namaBelakang")}
                  disabled={mutation.isPending}
                />
                {errors.namaBelakang && (
                  <FieldError>{errors.namaBelakang.message}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="user">Username</FieldLabel>
                <Input
                  type="text"
                  id="user"
                  {...register("username")}
                  disabled={mutation.isPending}
                />
                {errors.username && (
                  <FieldError>{errors.username.message}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="mail">Email</FieldLabel>
                <Input
                  type="email"
                  id="mail"
                  {...register("email")}
                  disabled={mutation.isPending}
                />
                {errors.email && (
                  <FieldError>{errors.email.message}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="no">No HP</FieldLabel>
                <Input
                  type="text"
                  id="no"
                  {...register("noHp")}
                  disabled={mutation.isPending}
                />
                {errors.noHp && <FieldError>{errors.noHp.message}</FieldError>}
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  className="rounded bg-primary-orange border border-primary-orange hover:bg-inherit hover:text-primary-orange"
                >
                  Kembali
                </Button>
              </DialogClose>
              <Button
                disabled={mutation.isPending || !isDirty}
                className="rounded bg-primary-green border border-primary-green hover:bg-inherit hover:text-primary-green"
                type="submit"
              >
                {mutation.isPending ? "Mennyimpan ..." : "Ubah"}
              </Button>
            </DialogFooter>
          </FieldSet>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateForm;
