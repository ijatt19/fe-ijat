import z from "zod";

export const profilSchema = z.object({
  namaDepan: z.string().min(1, "Nama depan wajib diisi"),
  namaBelakang: z.string().optional(),
  username: z.string().min(3, "Username minimal 4 karakter"),
  email: z.string().email("Format email salah"),
  noHp: z
    .string()
    .min(10, "No HP tidak valid")
    .regex(/^(?:\+62|08)[0-9]{8,13}$/, "Hanya angka"),
});

export type ProfilFormValues = z.infer<typeof profilSchema>;

export const gantiPasswordSchema = z
  .object({
    passwordLama: z.string().min(1, "Password lama wajib diisi"),
    passwordBaru: z.string().min(8, "Password minimal 8 character"),
    konfirmasiPasswordBaru: z.string().min(1, "Konfirmasi wajib diisi"),
  })
  .refine((data) => data.passwordBaru === data.konfirmasiPasswordBaru, {
    message: "Konfirmasi password tidak cocok",
    path: ["konfirmasiPasswordBaru"],
  });

export type GantiPasswordValues = z.infer<typeof gantiPasswordSchema>;
