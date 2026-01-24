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
import { Supplier } from "@/types/api";

function LihatSupplier({ data }: { data: Supplier }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary-green">Lihat</Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto">
        <form className="flex flex-col gap-y-4">
          <DialogHeader>
            <DialogTitle>Supplier {data.nama}</DialogTitle>
          </DialogHeader>
          <FieldSet>
            <FieldGroup>
              <Field>
                <div className="flex items-center w-full text-xs">
                  <FieldLabel
                    htmlFor="nama"
                    className="w-2/3 md:w-1/3 font-normal"
                  >
                    Kode :
                  </FieldLabel>
                  <Input
                    autoComplete="off"
                    id="nama"
                    className="w-full"
                    type="text"
                    readOnly
                    value={data.kode}
                  />
                </div>
              </Field>
              <Field>
                <div className="flex items-center w-full text-xs">
                  <FieldLabel
                    htmlFor="nama"
                    className="w-2/3 md:w-1/3 font-normal"
                  >
                    Nama :
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
                    htmlFor="kategori"
                    className="w-2/3 md:w-1/3 font-normal"
                  >
                    Kategori :
                  </FieldLabel>
                  <Input
                    autoComplete="off"
                    id="kategori"
                    className="w-full"
                    type="text"
                    readOnly
                    value={data.kategori}
                  />
                </div>
              </Field>
              <Field>
                <div className="flex items-center w-full text-xs">
                  <FieldLabel
                    htmlFor="contact"
                    className="w-2/3 md:w-1/3 font-normal"
                  >
                    Contact Person :
                  </FieldLabel>
                  <Input
                    autoComplete="off"
                    id="contact"
                    className="w-full"
                    type="text"
                    readOnly
                    value={data.contactPerson}
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

export default LihatSupplier;
