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
import { api } from "@/lib/axios";
import {
  gantiPasswordSchema,
  GantiPasswordValues,
} from "@/lib/schemas/pengaturan";
import { gantiPassword } from "@/services/user.service";
import { ErrorResponse } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function GantiPassword({ token }: { token: string }) {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GantiPasswordValues>({
    resolver: zodResolver(gantiPasswordSchema),
    defaultValues: {
      passwordLama: "",
      passwordBaru: "",
      konfirmasiPasswordBaru: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: GantiPasswordValues) => {
      return await gantiPassword(token, values);
    },
    onSuccess: (response) => {
      if (!response.success) throw response;
      reset();
      toast.success(response.message);
      setOpenDialog(false);
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

  const submitHandler = (data: GantiPasswordValues) => {
    mutation.mutate(data);
  };
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button className="rounded bg-primary-orange border border-primary-orange hover:bg-inherit hover:text-primary-orange">
          Ganti Password
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Ganti Password</DialogTitle>
        <form onSubmit={handleSubmit(submitHandler)}>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="lama">Password Lama</FieldLabel>
                <Input
                  type="password"
                  id="lama"
                  {...register("passwordLama")}
                />
                {errors.passwordLama && (
                  <FieldError>{errors.passwordLama.message}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="baru">Password Baru</FieldLabel>
                <Input
                  type="password"
                  id="baru"
                  {...register("passwordBaru")}
                />
                {errors.passwordBaru && (
                  <FieldError>{errors.passwordBaru.message}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="konfirmasi">
                  Konfirmasi Password Baru
                </FieldLabel>
                <Input
                  type="password"
                  id="konfirmasi"
                  {...register("konfirmasiPasswordBaru")}
                />
                {errors.konfirmasiPasswordBaru && (
                  <FieldError>
                    {errors.konfirmasiPasswordBaru.message}
                  </FieldError>
                )}
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
                disabled={mutation.isPending}
                className="rounded bg-primary-green border border-primary-green hover:bg-inherit hover:text-primary-green"
                type="submit"
              >
                {mutation.isPending ? "Mengubah ..." : "Ubah"}
              </Button>
            </DialogFooter>
          </FieldSet>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default GantiPassword;
