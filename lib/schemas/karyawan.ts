import z from "zod";

export const createKaryawanSchema = z.object({
  namaDepan: z.string().min(1, "Nama depan harus di isi"),
  namaBelakang: z.string().min(1, "Nama belakang harus di isi"),
  noHp: z
    .string()
    .min(1, "Nama belakang harus di isi")
    .regex(
      /^(?:\+62|08)[1-9][0-9]{7,11}$/,
      "No HP harus format 08xxxxxxxxxx atau +628xxxxxxxxx",
    ),
  alamat: z.string().min(1, "Alamat harus di isi"),
  jabatan: z.string().min(1, "Jabatan harus di isi"),
});

export type CreateKaryawanValues = z.infer<typeof createKaryawanSchema>;
