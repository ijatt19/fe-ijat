import { StatusMesin } from "@/types/api";
import z from "zod";

export const createMesinSchema = z.object({
  nama: z.string().min(1, "Nama harus di isi"),
  merk: z.string().min(1, "Merk harus di isi"),
  spesifikasi: z.string().min(1, "Spesifikasi harus di isi"),
  kapasitasCetak: z
    .string()
    .min(1, "Kapasitas cetak harus di isi")
    .regex(/^\d+(\.\d{1,2})?$/, "Format angka tidak valid (maks 2 desimal)"),
});

export type CreateMesinValues = z.infer<typeof createMesinSchema>;

export const updateMesinSchema = z.object({
  nama: z.string().min(1, "Nama harus di isi").optional(),
  merk: z.string().min(1, "Merk harus di isi").optional(),
  spesifikasi: z.string().min(1, "Spesifikasi harus di isi"),
  kapasitasCetak: z
    .string()
    .min(1, "Kapasitas cetak harus di isi")
    .regex(/^\d+(\.\d{1,2})?$/, "Format angka tidak valid (maks 2 desimal)")
    .optional(),
  status: z.nativeEnum(StatusMesin).optional(),
});

export type UpdateMesinValues = z.infer<typeof updateMesinSchema>;
