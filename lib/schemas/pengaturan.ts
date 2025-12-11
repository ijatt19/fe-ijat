import z from "zod";

export const profilSchema = z.object({
  namaDepan: z.string().min(1, "Nama depan wajib diisi"),
  namaBelakang: z.string().min(1, "Nama belakang wajib diisi"),
  username: z.string().min(3, "Username minimal 4 karakter"),
  email: z.string().email("Format email salah"),
  noHp: z
    .string()
    .min(10, "No HP tidak valid")
    .regex(/^[0-9]+$/, "Hanya angka"),
});

export type ProfilFormValues = z.infer<typeof profilSchema>;
