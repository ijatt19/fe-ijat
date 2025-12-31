import z from "zod";

export const logoSchema = z.object({
  value: z.instanceof(File).refine((file) => file.size > 0),
});

export type LogoSchemaValues = z.infer<typeof logoSchema>;
