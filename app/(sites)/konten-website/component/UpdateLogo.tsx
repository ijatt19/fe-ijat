"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { logoSchema, LogoSchemaValues } from "@/lib/schemas/konten-website";
import { updateLogo } from "@/services/konten-website.service";
import { ErrorResponse, Konten } from "@/types/api";
import { compressToWebp } from "@/utils/compressWebp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

function UpdateLogo({
  token,
  logoKonten,
}: {
  token: string;
  logoKonten: Konten;
}) {
  if (!logoKonten) return <div>Logo tidak ada</div>;

  const {
    watch,
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<LogoSchemaValues>({
    resolver: zodResolver(logoSchema),
  });
  const [preview, setPreview] = useState<string | null>(null);

  const file = watch("value");

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  const mutation = useMutation({
    mutationFn: async (values: LogoSchemaValues) => {
      return await updateLogo(token, {
        idImage: logoKonten.idImage,
        name: values.value.name,
        file: values.value,
      });
    },
    onSuccess: (response) => {
      if (!response.success) throw response;

      toast.success(response.message);
    },
    onError: async (error: ErrorResponse) => {
      if (error.statusCode === 401) {
        toast.error(error.message);
        await signOut({ redirect: true, redirectTo: "/" });
      }
      toast.error(error.message);
    },
  });

  const onSubmit = (data: LogoSchemaValues) => {
    mutation.mutate(data);
  };
  return (
    <div className="shadow rounded p-2">
      <h2 className="text-xl">Navbar</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="logo">Logo</FieldLabel>
              {preview ? (
                <div className="relative w-9 h-9">
                  <Image
                    src={preview}
                    alt="Preview logo"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="relative w-9 h-9">
                  <Image
                    src={logoKonten.value}
                    alt={logoKonten.key}
                    fill
                    objectFit="contain"
                    loading="lazy"
                  />
                </div>
              )}
              <Controller
                name="value"
                control={control}
                render={({ field }) => (
                  <Input
                    disabled={mutation.isPending}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={async (e) => {
                      const rawFile = e.target.files?.[0];
                      if (!rawFile) return;

                      const compressed = await compressToWebp(rawFile, {
                        maxWidth: 36,
                        quality: 0.75,
                        fileName: "logo.webp",
                      });

                      field.onChange(compressed);
                    }}
                  />
                )}
              />
              {errors.value && <FieldError>{errors.value.message}</FieldError>}
              <Button
                type="submit"
                disabled={!isDirty || mutation.isPending}
                className="bg-primary-green"
              >
                {mutation.isPending ? "Loading" : "Update"}
              </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  );
}

export default UpdateLogo;
