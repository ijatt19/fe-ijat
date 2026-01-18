import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";

function TambahBarang() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="bg-primary-green">Tambah</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Barang Baru</DialogTitle>
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
                  <Input id="name" className="w-full" />
                </div>
              </Field>
              <Field>
                <div className="flex w-full gap-x-4 text-xs items-center">
                  <FieldLabel htmlFor="kode" className="font-normal">
                    Kode Barang :
                  </FieldLabel>
                  <p className="underline text-slate-500">Otomatis</p>
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
                    <Input id="modal-curah" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="jual-curah" className="font-normal">
                      Harga Jual (RP)
                    </FieldLabel>
                    <Input id="jual-curah" />
                  </Field>
                </div>
                <div className="flex flex-col gap-y-4 md:w-full">
                  <p>Packing Susun</p>
                  <Field>
                    <FieldLabel htmlFor="modal-susun" className="font-normal">
                      Modal HPP (RP)
                    </FieldLabel>
                    <Input id="modal-susun" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="jual-susun" className="font-normal">
                      Harga Jual (RP)
                    </FieldLabel>
                    <Input id="jual-susun" />
                  </Field>
                </div>
              </div>
            </FieldGroup>
          </FieldSet>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="bg-primary-orange">Batal</Button>
            </DialogClose>
            <Button type="submit" className="bg-primary-green">
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default TambahBarang;
