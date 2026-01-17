import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  updateImageFiturUnggulanSchema,
  UpdateImageFiturUnggulanValues,
} from "@/lib/schemas/konten-website";
import { updateImageFitur } from "@/services/konten-website.service";
import { ErrorResponse, FiturUnggulan } from "@/types/api";
import { compressToWebp } from "@/utils/compressWebp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

function UpdateImageFitur({
  fileName,
  maxWidth = 1000,
  query,
  image,
  token,
}: {
  fileName: string;
  maxWidth: number;
  query: string;
  image: FiturUnggulan;
  token: string;
}) {
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateImageFiturUnggulanValues>({
    resolver: zodResolver(updateImageFiturUnggulanSchema),
    defaultValues: {
      idIkon: image.idIkon,
      name: fileName,
    },
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);

  const file = watch("ikon");

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
    mutationFn: async (value: UpdateImageFiturUnggulanValues) => {
      return await updateImageFitur(token, {
        idIkon: image.idIkon,
        name: value.name,
        file: value.ikon,
      });
    },
    onSuccess: (response) => {
      if (!response.success) throw response;

      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: [query],
      });
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

  const onSubmit = (data: UpdateImageFiturUnggulanValues) => {
    mutation.mutate(data);
  };

  return (
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
                  src={image.ikon}
                  alt={image.deskripsi}
                  fill
                  objectFit="contain"
                  loading="lazy"
                />
              </div>
            )}
            <Controller
              name="ikon"
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
            {errors.ikon && <FieldError>{errors.ikon.message}</FieldError>}
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
  );
}

export default UpdateImageFitur;
