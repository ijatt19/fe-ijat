"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { BarangJadi, BarangJadiVarian } from "@/types/api";

function LihatBarangJadi({ data }: { data: BarangJadi }) {
  const { curah, susun } = data.varians.reduce(
    (acc, item) => {
      acc[item.jenisPacking] = item;
      return acc;
    },
    {} as Record<string, BarangJadiVarian>,
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary-green">Lihat</Button>
      </DialogTrigger>
      <DialogContent>
        <form className="flex flex-col gap-y-4">
          <DialogHeader>
            <DialogTitle>{data.name}</DialogTitle>
          </DialogHeader>
          <FieldSet>
            <FieldGroup>
              <Field>
                <div className="flex items-center w-full text-xs">
                  <FieldLabel
                    htmlFor="name"
                    className="w-1/2 md:w-1/3 font-normal"
                  >
                    Nama Barang :
                  </FieldLabel>
                  <Input
                    autoComplete="off"
                    id="name"
                    className="w-full"
                    type="text"
                    value={data.name}
                    readOnly
                  />
                </div>
              </Field>
              <Field>
                <div className="flex w-full gap-x-4 text-xs items-center">
                  <FieldLabel htmlFor="kode" className="font-normal">
                    Kode Barang :
                  </FieldLabel>
                  <p className="underline text-slate-500">{data.kode}</p>
                </div>
              </Field>
              <p className="text-base font-semibold">Detail Selengkapnya</p>
              <div className="flex flex-col gap-y-4 md:flex-row md:w-full md:gap-x-4">
                <div className="flex flex-col gap-y-4 md:w-full">
                  <p>Packing Curah</p>
                  <Field>
                    <FieldLabel htmlFor="modal-curah" className="font-normal">
                      Modal HPP (RP)
                    </FieldLabel>
                    <Input
                      autoComplete="off"
                      id="modal-curah"
                      type="number"
                      value={curah?.hargaModal ?? 0}
                      readOnly
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="jual-curah" className="font-normal">
                      Harga Jual (RP)
                    </FieldLabel>
                    <Input
                      autoComplete="off"
                      id="jual-curah"
                      type="number"
                      value={curah?.hargaJual ?? 0}
                      readOnly
                    />
                  </Field>
                </div>
                <div className="flex flex-col gap-y-4 md:w-full">
                  <p>Packing Susun</p>
                  <Field>
                    <FieldLabel htmlFor="modal-susun" className="font-normal">
                      Modal HPP (RP)
                    </FieldLabel>
                    <Input
                      autoComplete="off"
                      id="modal-susun"
                      type="number"
                      value={susun?.hargaModal ?? 0}
                      readOnly
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="jual-susun" className="font-normal">
                      Harga Jual (RP)
                    </FieldLabel>
                    <Input
                      autoComplete="off"
                      id="jual-susun"
                      value={susun?.hargaJual ?? 0}
                      type="number"
                      readOnly
                    />
                  </Field>
                </div>
              </div>
            </FieldGroup>
          </FieldSet>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="bg-primary-orange">Kembali</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default LihatBarangJadi;
