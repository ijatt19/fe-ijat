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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

function UpdateKeyFooter({
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
      reset();
      resetField("items");
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
            {fields.map((field, index) => {
              if (field.key.includes("day")) {
                return (
                  <Field key={index}>
                    <FieldLabel htmlFor={`items.${index}.value`}>
                      {field.key.replace(/-footer/, "").replace("-", " ")}
                    </FieldLabel>

                    <Controller
                      control={control}
                      name={`items.${index}.value`}
                      render={({ field }) => (
                        <Select
                          disabled={mutation.isPending}
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Hari" />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Hari</SelectLabel>
                              <SelectItem value="Senin">Senin</SelectItem>
                              <SelectItem value="Selasa">Selasa</SelectItem>
                              <SelectItem value="Rabu">Rabu</SelectItem>
                              <SelectItem value="Kamis">Kamis</SelectItem>
                              <SelectItem value="Jumat">Jumat</SelectItem>
                              <SelectItem value="Sabtu">Sabtu</SelectItem>
                              <SelectItem value="Minggu">Minggu</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />

                    {errors.items?.message && (
                      <FieldError>{errors.items?.message}</FieldError>
                    )}
                  </Field>
                );
              }
              if (field.key.includes("time")) {
                return (
                  <Field key={index}>
                    <FieldLabel htmlFor={`items.${index}.value`}>
                      {field.key.replace(/-footer/, "").replace("-", " ")}
                    </FieldLabel>

                    <Input
                      id={`items.${index}.value`}
                      disabled={mutation.isPending}
                      autoComplete="off"
                      type="time"
                      {...register(`items.${index}.value`)}
                    />
                    {errors.items?.message && (
                      <FieldError>{errors.items?.message}</FieldError>
                    )}
                  </Field>
                );
              }
              return (
                <Field key={index}>
                  <FieldLabel htmlFor={`items.${index}.value`}>
                    {field.key.replace(/-footer/, "").replace("-", " ")}
                  </FieldLabel>

                  <Input
                    id={`items.${index}.value`}
                    disabled={mutation.isPending}
                    autoComplete="off"
                    {...register(`items.${index}.value`)}
                  />
                  {errors.items?.message && (
                    <FieldError>{errors.items?.message}</FieldError>
                  )}
                </Field>
              );
            })}
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

export default UpdateKeyFooter;
