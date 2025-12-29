import z from "zod";

export const logoSchema = z.object({
  value: z.string().min(1, "Value logo wajib di isi"),
});

export type LogoSchemaValues = z.infer<typeof logoSchema>;
