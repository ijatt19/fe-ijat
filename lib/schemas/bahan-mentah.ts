import z from "zod";

export const createBahanMentahSchema = z.object({
  name: z.string().min(1, "Nama harus di isi"),
  satuan: z.string().min(1, "Satuan harus di isi"),
  batasMinimum: z.number().min(1, "Batas minimum harus di isi"),
});

export type CreateBahanMentahValues = z.infer<typeof createBahanMentahSchema>;

export const updateBahanMentahSchema = z.object({
  name: z.string().min(1, "Nama harus di isi").optional(),
  satuan: z.string().min(1, "Satuan harus di isi").optional(),
  batasMinimum: z.number().min(1, "Batas minimum harus di isi").optional(),
});

export type UpdateBahanMentahValues = z.infer<typeof updateBahanMentahSchema>;
