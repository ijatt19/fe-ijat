import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import {
  updateFiturUnggulanSchema,
  UpdateFiturUnggulanValues,
} from "@/lib/schemas/konten-website";
import { updateFiturUnggulan } from "@/services/konten-website.service";
import { ErrorResponse, FiturUnggulan } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SquareCheck } from "lucide-react";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import UpdateImageFitur from "./UpdateImageFitur";

function FiturUpdateItem({
  dataItem,
  index,
  query,
  token,
}: {
  dataItem: FiturUnggulan;
  index: number;
  query: string;
  token: string;
}) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<UpdateFiturUnggulanValues>({
    resolver: zodResolver(updateFiturUnggulanSchema),
    defaultValues: {
      id: dataItem.id,
      deskripsi: dataItem.deskripsi,
      tampilan: dataItem.tampilan,
    },
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!dataItem) return;
    reset({
      id: dataItem.id,
      deskripsi: dataItem.deskripsi,
      tampilan: dataItem.tampilan,
    });
  }, [dataItem, reset]);

  const mutation = useMutation({
    mutationFn: async (values: UpdateFiturUnggulanValues) => {
      return await updateFiturUnggulan(values, token);
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

  const onSubmit = (data: UpdateFiturUnggulanValues) => {
    mutation.mutate(data);
  };

  return (
    <>
      <h3 className="text-xl mb-4">Fitur ke {index + 1}</h3>
      <UpdateImageFitur
        fileName={`Fitur-${index + 1}`}
        image={dataItem}
        maxWidth={67}
        query="fitur-unggulan"
        token={token}
        key={index}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor={`deskripsi-${index}`}>Deskripsi</FieldLabel>
              <Input
                type="text"
                disabled={mutation.isPending}
                id={`deskripsi-${index}`}
                {...register("deskripsi")}
              />
            </Field>
            <Field className="flex items-center">
              <FieldLabel htmlFor={`deskripsi-${index}`}>Tampilan</FieldLabel>
              <Controller
                name="tampilan"
                control={control}
                render={({ field }) => (
                  <Toggle
                    size="sm"
                    disabled={mutation.isPending}
                    variant="outline"
                    pressed={field.value}
                    onPressedChange={field.onChange}
                    className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-black data-[state=on]:*:[svg]:stroke-white"
                  >
                    <SquareCheck />
                    {field.value ? "tampil" : "tidak tampil"}
                  </Toggle>
                )}
              />
            </Field>
            <Button
              type="submit"
              className="bg-primary-green"
              disabled={!isDirty || mutation.isPending}
            >
              {mutation.isPending ? "Menyimpan..." : "Update"}
            </Button>
          </FieldGroup>
        </FieldSet>
      </form>
    </>
  );
}

export default FiturUpdateItem;
