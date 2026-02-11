import z from "zod";

// Schema dengan validasi margin (hargaJual >= hargaModal)
const varianSchema = z.object({
  jenisPacking: z.enum(["curah", "susun"]).optional(),
  hargaModal: z.number().min(0, "Harga tidak boleh negatif").optional(),
  hargaJual: z.number().min(0, "Harga tidak boleh negatif").optional(),
}).refine(
  (data) => {
    // Skip jika salah satu kosong
    if (data.hargaModal === undefined || data.hargaJual === undefined) return true;
    if (data.hargaModal === 0 && data.hargaJual === 0) return true;
    // Validasi margin tidak negatif
    return data.hargaJual >= data.hargaModal;
  },
  {
    message: "Harga jual tidak boleh lebih kecil dari modal (margin negatif)",
    path: ["hargaJual"],
  }
);

export const tambahBarangJadiSchema = z.object({
  name: z.string().min(1, "Nama Barang harus di isi"),
  varians: z.array(varianSchema),
});

export type TambahBarangJadiValues = z.infer<typeof tambahBarangJadiSchema>;

export const updateBarangJadiSchema = z.object({
  name: z.string().min(1, "Nama Barang harus di isi").optional(),
  varians: z
    .array(
      z
        .object({
          id: z.number().optional(),
          jenisPacking: z.enum(["curah", "susun"]).optional(),
          hargaModal: z.number().min(0).optional(),
          hargaJual: z.number().min(0).optional(),
        })
        .refine(
          (data) => {
            if (data.hargaModal === undefined || data.hargaJual === undefined) return true;
            if (data.hargaModal === 0 && data.hargaJual === 0) return true;
            return data.hargaJual >= data.hargaModal;
          },
          {
            message: "Harga jual tidak boleh lebih kecil dari modal",
            path: ["hargaJual"],
          }
        )
        .optional()
    )
    .optional(),
});

export type UpdateBarangJadiValues = z.infer<typeof updateBarangJadiSchema>;
