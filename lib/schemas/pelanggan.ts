import z from "zod";

export const createPelangganSchema = z.object({
  namaDepan: z.string().min(1, "Nama depan harus di isi"),
  namaBelakang: z.string().optional(),
  noHp: z
    .string()
    .regex(
      /^(?:\+62|08)[1-9][0-9]{7,11}$/,
      "No HP harus format 08xxxxxxxxxx atau +628xxxxxxxxx",
    ),
  alamat: z.string().min(1, "Alamat harus di isi"),
});

export type CreatePelangganValues = z.infer<typeof createPelangganSchema>;

export const updatePelangganSchema = z.object({
  namaDepan: z.string().min(1, "Nama depan harus di isi").optional(),
  namaBelakang: z.string().optional(),
  noHp: z
    .string()
    .regex(
      /^(?:\+62|08)[1-9][0-9]{7,11}$/,
      "No HP harus format 08xxxxxxxxxx atau +628xxxxxxxxx",
    )
    .optional(),
  alamat: z.string().min(1, "Alamat harus di isi").optional(),
});

export type UpdatePelangganValues = z.infer<typeof updatePelangganSchema>;
