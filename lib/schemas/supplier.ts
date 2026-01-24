import z from "zod";

export const createSupplierSchema = z.object({
  nama: z.string().min(1, "Nama harus di isi"),

  kategori: z.string().min(1, "Kategori harus di isi"),

  contactPerson: z.string().min(1, "Contact person harus di isi"),

  noHp: z
    .string()
    .min(1, "Nama belakang harus di isi")
    .regex(
      /^(?:\+62|08)[1-9][0-9]{7,11}$/,
      "No HP harus format 08xxxxxxxxxx atau +628xxxxxxxxx",
    ),

  alamat: z.string().min(1, "Alamat harus di isi"),
});

export type CreateSupplierValues = z.infer<typeof createSupplierSchema>;
