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
import { Textarea } from "@/components/ui/textarea";
import { Mesin } from "@/types/api";

function LihatMesin({ data }: { data: Mesin }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary-green">Lihat</Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto">
        <form className="flex flex-col gap-y-4">
          <DialogHeader>
            <DialogTitle>{data.nama}</DialogTitle>
          </DialogHeader>
          <FieldSet>
            <FieldGroup>
              <Field>
                <div className="flex items-center w-full text-xs">
                  <FieldLabel
                    htmlFor="nama"
                    className="w-2/3 md:w-1/3 font-normal"
                  >
                    Nama Mesin :
                  </FieldLabel>
                  <Input
                    autoComplete="off"
                    id="nama"
                    className="w-full"
                    type="text"
                    readOnly
                    value={data.nama}
                  />
                </div>
              </Field>
              <Field>
                <div className="flex items-center w-full text-xs">
                  <FieldLabel
                    htmlFor="merk"
                    className="w-2/3 md:w-1/3 font-normal"
                  >
                    Merk Mesin :
                  </FieldLabel>
                  <Input
                    autoComplete="off"
                    id="merk"
                    className="w-full"
                    type="text"
                    readOnly
                    value={data.merk}
                  />
                </div>
              </Field>
              <Field>
                <div className="flex items-center w-full text-xs">
                  <FieldLabel
                    htmlFor="kapasitas"
                    className="w-2/3 md:w-1/3 font-normal"
                  >
                    Kapasitas Cetak :
                  </FieldLabel>
                  <Input
                    autoComplete="off"
                    inputMode="decimal"
                    id="kapasitas"
                    className="w-full"
                    type="text"
                    readOnly
                    value={data.kapasitasCetak.replace(/\.?0+$/, "")}
                  />
                </div>
              </Field>
              <Field>
                <div className="flex items-center w-full text-xs">
                  <FieldLabel
                    htmlFor="spek"
                    className="w-2/3 md:w-1/3 font-normal"
                  >
                    Spesifikasi :
                  </FieldLabel>
                  <Textarea
                    autoComplete="off"
                    id="spek"
                    className="w-full"
                    readOnly
                    value={data.spesifikasi}
                  />
                </div>
              </Field>
              <Field>
                <div className="flex items-center w-full text-xs">
                  <FieldLabel
                    htmlFor="status"
                    className="w-2/3 md:w-1/3 font-normal"
                  >
                    Status :
                  </FieldLabel>
                  <Input
                    autoComplete="off"
                    id="status"
                    className="w-full"
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

export default LihatMesin;
