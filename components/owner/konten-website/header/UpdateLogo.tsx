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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

function UpdateLogo({ dataLogo, token }: { dataLogo: Konten; token: string }) {
  const {
    watch,
    control,
    handleSubmit,
    reset,
    resetField,
    formState: { errors },
  } = useForm<LogoSchemaValues>({
    resolver: zodResolver(logoSchema),
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);

  const file = watch("value");

  const queryClient = useQueryClient();

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
        idImage: dataLogo.idImage,
        name: values.value.name,
        file: values.value,
      });
    },
    onSuccess: (response) => {
      if (!response.success) throw response;

      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: ["header-konten"],
      });
      reset();
      resetField("value");
      setFileInputKey((k) => k + 1);
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
      <h2 className="text-xl mb-4">Navbar</h2>
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
                    src={dataLogo.value}
                    alt={dataLogo.key}
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
                    key={fileInputKey}
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
                disabled={mutation.isPending}
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
