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
import { Karyawan } from "@/types/api";
import React from "react";

function LihatKaryawan({ data }: { data: Karyawan }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary-green">Lihat</Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto">
        <form className="flex flex-col gap-y-4">
          <DialogHeader>
            <DialogTitle>Data {data.namaDepan}</DialogTitle>
          </DialogHeader>
          <FieldSet>
            <FieldGroup>
              <Field>
                <div className="flex items-center w-full text-xs">
                  <FieldLabel
                    htmlFor="namaDepan"
                    className="w-2/3 md:w-1/3 font-normal"
                  >
                    Nama Depan :
                  </FieldLabel>
                  <Input
                    autoComplete="off"
                    id="namaDepan"
                    className="w-full"
                    type="text"
                    readOnly
                    value={data.namaDepan}
                  />
                </div>
              </Field>
              <Field>
                <div className="flex items-center w-full text-xs">
                  <FieldLabel
                    htmlFor="namaBelakang"
                    className="w-2/3 md:w-1/3 font-normal"
                  >
                    Nama Belakang :
                  </FieldLabel>
                  <Input
                    autoComplete="off"
                    id="namaBelakang"
                    className="w-full"
                    type="text"
                    readOnly
                    value={data.namaBelakang}
                  />
                </div>
              </Field>
              <Field>
                <div className="flex items-center w-full text-xs">
                  <FieldLabel
                    htmlFor="noHp"
                    className="w-2/3 md:w-1/3 font-normal"
                  >
                    No Hp :
                  </FieldLabel>
                  <Input
                    autoComplete="off"
                    id="noHp"
                    className="w-full"
                    type="text"
                    readOnly
                    value={data.noHp}
                  />
                </div>
              </Field>
              <Field>
                <div className="flex items-center w-full text-xs">
                  <FieldLabel
                    htmlFor="alamat"
                    className="w-2/3 md:w-1/3 font-normal"
                  >
                    Alamat :
                  </FieldLabel>
                  <Input
                    autoComplete="off"
                    id="alamat"
                    className="w-full"
                    type="text"
                    readOnly
                    value={data.alamat}
                  />
                </div>
              </Field>
              <Field>
                <div className="flex items-center w-full text-xs">
                  <FieldLabel
                    htmlFor="jabatan"
                    className="w-2/3 md:w-1/3 font-normal"
                  >
                    Jabatan :
                  </FieldLabel>
                  <Input
                    autoComplete="off"
                    id="jabatan"
                    className="w-full"
                    type="text"
                    readOnly
                    value={data.jabatan}
                  />
                </div>
              </Field>
              <Field>
                <div className="flex items-center w-full text-xs">
                  <FieldLabel
                    htmlFor="status"
                    className="w-2/3 md:w-1/3 font-normal"
                  >
                    Jabatan :
                  </FieldLabel>
                  <Input
                    autoComplete="off"
                    id="status"
                    className="w-full"
                    type="text"
                    readOnly
                    value={data.status}
                  />
                </div>
              </Field>
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

export default LihatKaryawan;
