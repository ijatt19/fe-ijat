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
import {
  updateKontenWebsiteSchema,
  UpdateKontenWebsiteValues,
} from "@/lib/schemas/konten-website";
import { updateKontenWebsite } from "@/services/konten-website.service";
import { ErrorResponse, Konten } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

function UpdateKey({
  data,
  query,
  token,
}: {
  data: Konten[];
  query: string;
  token: string;
}) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    resetField,
    watch,
    formState: { errors, isDirty },
  } = useForm<UpdateKontenWebsiteValues>({
    resolver: zodResolver(updateKontenWebsiteSchema),
    defaultValues: {
      items: data.map((item) => ({
        id: item.id,
        key: item.key,
        value: item.value,
      })),
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "items",
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!data) return;
    reset({
      items: data.map((item) => ({
        id: item.id,
        key: item.key,
        value: item.value,
      })),
    });
  }, [data, reset]);

  const findIndexByKey = (key: string) =>
    fields.findIndex((item) => item.key === key);

  const latIndex = findIndexByKey("latitude-footer");
  const lngIndex = findIndexByKey("longitude-footer");

  const latitude = latIndex !== -1 ? watch(`items.${latIndex}.value`) : "";
  const longitude = lngIndex !== -1 ? watch(`items.${lngIndex}.value`) : "";

  const mutation = useMutation({
    mutationFn: async (values: UpdateKontenWebsiteValues) => {
      return await updateKontenWebsite(values.items, token);
    },
    onSuccess: (response) => {
      if (!response.success) throw response;

      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: [query],
      });
    },
    onError: async (error: ErrorResponse) => {
      if (error.statusCode === 401) {
        toast.error(error.message);
        await signOut({ redirect: true, redirectTo: "/" });
      }
      toast.error(error.message);
    },
  });

  const onSubmit = (data: UpdateKontenWebsiteValues) => {
    mutation.mutate(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldSet>
          <FieldGroup>
            {latitude && longitude && (
              <iframe
                src={`https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
                width="100%"
                height="300"
                loading="lazy"
                className="rounded"
              />
            )}
            <Field>
              <FieldLabel htmlFor="koordinat">Koordinat</FieldLabel>

              <Input
                id="koordinat"
                placeholder="Latitude, Longitude"
                defaultValue={
                  latitude && longitude ? `${latitude}, ${longitude}` : ""
                }
                onBlur={(e) => {
                  const [lat, lng] = e.target.value
                    .split(",")
                    .map((v) => v.trim());

                  if (latIndex !== -1 && lat) {
                    setValue(`items.${latIndex}.value`, lat, {
                      shouldDirty: true,
                    });
                  }

                  if (lngIndex !== -1 && lng) {
                    setValue(`items.${lngIndex}.value`, lng, {
                      shouldDirty: true,
                    });
                  }
                }}
              />
            </Field>
            <Button
              type="submit"
              disabled={mutation.isPending || !isDirty}
              className="bg-primary-green"
            >
              {mutation.isPending ? "Menyimpan" : "Update"}
            </Button>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  );
}

export default UpdateKey;
