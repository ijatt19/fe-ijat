import { AkunRole } from "@/types/api";
import z from "zod";

export const createAkunSchema = z.object({
  namaDepan: z.string().min(1, "Nama depan harus di isi"),

  namaBelakang: z.string().min(1, "Nama belakang harus di isi"),

  username: z.string().min(1, "Username harus di isi"),

  email: z.email("Format tidak valid").min(1, "Email harus di isi"),

  noHp: z
    .string()
    .min(1, "Nama belakang harus di isi")
    .regex(
      /^(?:\+62|08)[1-9][0-9]{7,11}$/,
      "No HP harus format 08xxxxxxxxxx atau +628xxxxxxxxx",
    ),

  password: z.string().min(1, "Password harus di isi"),

  role: z.nativeEnum(AkunRole, "Role tidak valid"),
});

export type CreateAkunValues = z.infer<typeof createAkunSchema>;
