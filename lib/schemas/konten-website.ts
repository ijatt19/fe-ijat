import z from "zod";

export const logoSchema = z.object({
  value: z.instanceof(File).refine((file) => file.size > 0),
});

export type LogoSchemaValues = z.infer<typeof logoSchema>;

export const imageSchema = z.object({
  value: z.instanceof(File).refine((file) => file.size > 0),
});

export type ImageSchemaValues = z.infer<typeof imageSchema>;

export const updateKontenWebsiteSchema = z.object({
  items: z.array(
    z.object({
      id: z.number().min(1, "Id tidak boleh kosong"),
      key: z.string().min(1, "Key tidak boleh kosong"),
      value: z.string().min(1, "Value tidak boleh kosong"),
    }),
  ),
});

export type UpdateKontenWebsiteValues = z.infer<
  typeof updateKontenWebsiteSchema
>;

export const updateFiturUnggulanSchema = z.object({
  id: z.number().min(1, "Id tidak boleh kosong"),
  deskripsi: z.string().min(1, "Deskripsi tidak boleh kosong"),
  tampilan: z.boolean(),
});

export type UpdateFiturUnggulanValues = z.infer<
  typeof updateFiturUnggulanSchema
>;

export const updateImageFiturUnggulanSchema = z.object({
  idIkon: z.string().min(1, "Id Ikon tidak boleh kosong"),
  ikon: z.instanceof(File).refine((file) => file.size > 0),
  name: z.string().min(1, "Nama tidak boleh kosong"),
});

export type UpdateImageFiturUnggulanValues = z.infer<
  typeof updateImageFiturUnggulanSchema
>;
