import z from "zod";

export const tambahBarangJadiSchema = z.object({
  name: z.string().min(1, "Nama Barang harus di isi"),
  varians: z.array(
    z.object({
      jenisPacking: z.enum(["curah", "susun"]),
      hargaModal: z.number().min(1, "Harga modal harus di isi"),
      hargaJual: z.number().min(1, "Harga jual harus di isi"),
    }),
  ),
});

export type TambahBarangJadiValues = z.infer<typeof tambahBarangJadiSchema>;

export const updateBarangJadiSchema = z.object({
  name: z.string().min(1, "Nama Barang harus di isi").optional(),
  varians: z
    .array(
      z
        .object({
          id: z.number().min(1, "Id varian harus di isi").optional(),
          jenisPacking: z.enum(["curah", "susun"]).optional(),
          hargaModal: z.number().optional(),
          hargaJual: z.number().optional(),
        })
        .optional(),
    )
    .optional(),
});

export type UpdateBarangJadiValues = z.infer<typeof updateBarangJadiSchema>;
