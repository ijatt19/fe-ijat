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
