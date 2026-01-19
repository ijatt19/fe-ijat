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

function UpdateNavbar({
  dataNavbar,
  token,
}: {
  dataNavbar: Konten[];
  token: string;
}) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    resetField,
    formState: { errors, isDirty },
  } = useForm<UpdateKontenWebsiteValues>({
    resolver: zodResolver(updateKontenWebsiteSchema),
    defaultValues: {
      items: dataNavbar.map((item) => ({
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
    if (!dataNavbar) return;
    reset({
      items: dataNavbar.map((item) => ({
        id: item.id,
        key: item.key,
        value: item.value,
      })),
    });
  }, [dataNavbar]);

  const mutation = useMutation({
    mutationFn: async (values: UpdateKontenWebsiteValues) => {
      return await updateKontenWebsite(values.items, token);
    },
    onSuccess: (response) => {
      if (!response.success) throw response;

      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: ["header-konten"],
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
    <div className="shadow rounded p-2">
      <h2 className="text-xl mb-4">Navbar</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldSet>
          <FieldGroup>
            {fields.map((field, index) => (
              <Field key={field.id}>
                <FieldLabel htmlFor={`items.${index}.value`}>
                  {field.key.replace(/^nav-/, "").replace(/-(\d+)$/, " $1")}
                </FieldLabel>

                <Input
                  id={`items.${index}.value`}
                  disabled={mutation.isPending}
                  autoComplete="false"
                  {...register(`items.${index}.value`)}
                />
                {errors.items?.message && (
                  <FieldError>{errors.items?.message}</FieldError>
                )}
              </Field>
            ))}
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

export default UpdateNavbar;
