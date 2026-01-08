"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { imageSchema, ImageSchemaValues } from "@/lib/schemas/konten-website";
import { updateImage } from "@/services/konten-website.service";
import { ErrorResponse, Konten } from "@/types/api";
import { compressToWebp } from "@/utils/compressWebp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

function UpdateImage({
  label,
  fileName,
  maxWidth = 1000,
  query,
  image,
  token,
}: {
  label: string;
  fileName: string;
  maxWidth: number;
  query: string;
  image: Konten;
  token: string;
}) {
  const {
    watch,
    control,
    handleSubmit,
    reset,
    resetField,
    formState: { errors },
  } = useForm<ImageSchemaValues>({
    resolver: zodResolver(imageSchema),
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
    mutationFn: async (values: ImageSchemaValues) => {
      return await updateImage(token, {
        idImage: image.idImage,
        name: values.value.name,
        file: values.value,
      });
    },
    onSuccess: (response) => {
      if (!response.success) throw response;

      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: [query],
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

  const onSubmit = (data: ImageSchemaValues) => {
    mutation.mutate(data);
  };

  return (
    <div>
      <h2 className="text-xl mb-4">{label}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldSet>
          <FieldGroup>
            <Field>
              {preview ? (
                <div className={`relative w-[${maxWidth}px] min-h-[200px]`}>
                  <Image
                    src={preview}
                    alt="Preview logo"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              ) : (
                <div className={`relative w-[${maxWidth}px] min-h-[200px]`}>
                  <Image
                    src={image.value}
                    alt={image.key}
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
                        maxWidth,
                        quality: 0.75,
                        fileName,
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

export default UpdateImage;
