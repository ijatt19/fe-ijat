import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JenisModalPrive } from "@/types/api";
import React from "react";

function FilterModalPrive({
  bulan,
  setBulan,
  tahun,
  setTahun,
  jenis,
  setJenis,
}: {
  bulan: string;
  setBulan: (v: string) => void;
  tahun: string;
  setTahun: (v: string) => void;
  jenis: string;
  setJenis: (v: string) => void;
}) {
  const BULAN = [
    { label: "Januari", value: "01" },
    { label: "Februari", value: "02" },
    { label: "Maret", value: "03" },
    { label: "April", value: "04" },
    { label: "Mei", value: "05" },
    { label: "Juni", value: "06" },
    { label: "Juli", value: "07" },
    { label: "Agustus", value: "08" },
    { label: "September", value: "09" },
    { label: "Oktober", value: "10" },
    { label: "November", value: "11" },
    { label: "Desember", value: "12" },
  ];

  const TAHUN = Array.from({ length: 6 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return { label: String(year), value: String(year) };
  });
  return (
    <div className="flex flex-col gap-y-2 md:gap-y-0 md:flex-row md:gap-x-4">
      <div className="flex gap-x-2 w-full md:w-2/3 md:gap-x-4">
        <Field className="flex-1 min-w-0">
          <FieldLabel>Bulan</FieldLabel>
          <Select value={bulan} onValueChange={setBulan}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih Bulan" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {BULAN.map((b) => (
                  <SelectItem key={b.value} value={b.value}>
                    {b.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <Field className="flex-1 min-w-0">
          <FieldLabel>Tahun</FieldLabel>
          <Select value={tahun} onValueChange={setTahun}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih Tahun" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {TAHUN.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <Field className="flex-1 min-w-0">
          <FieldLabel>Jenis Transaksi</FieldLabel>
          <Select
            value={jenis}
            onValueChange={(v) => setJenis(v as JenisModalPrive)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih Jenis" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={JenisModalPrive.SETOR_MODAL}>
                  Setor Modal
                </SelectItem>
                <SelectItem value={JenisModalPrive.TARIK_PRIVE}>
                  Tarik Prive
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
      </div>
      <Button className="bg-primary-blue md:self-end">Tampilkan</Button>
    </div>
  );
}

export default FilterModalPrive;
