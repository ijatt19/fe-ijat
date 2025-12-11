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
import {
  gantiPasswordSchema,
  GantiPasswordValues,
} from "@/lib/schemas/pengaturan";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

function GantiPassword() {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GantiPasswordValues>({
    resolver: zodResolver(gantiPasswordSchema),
    defaultValues: {
      passwordLama: "",
      passwordBaru: "",
      konfirmasiPasswordBaru: "",
    },
  });

  const submitHandler = () => {};
  return (
    <Dialog>
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
                className="rounded bg-primary-green border border-primary-green hover:bg-inherit hover:text-primary-green"
                type="submit"
              >
                Ganti
              </Button>
            </DialogFooter>
          </FieldSet>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default GantiPassword;
