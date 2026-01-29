import { JenisModalPrive } from "@/types/api";
import z from "zod";

export const createModalPriveSchema = z.object({
  jenis: z.nativeEnum(JenisModalPrive, "Jenis tidak valid"),
  nominal: z
    .string()
    .min(1, "Nominal wajib di isi")
    .regex(/^\d+$/, "Nominal harus angka"),
  keterangan: z.string().min(1, "Keterangan harus di isi"),
});

export type CreateModalPriveValues = z.infer<typeof createModalPriveSchema>;
