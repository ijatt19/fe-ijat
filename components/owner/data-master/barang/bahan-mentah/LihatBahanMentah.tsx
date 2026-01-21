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
import { BahanMentah } from "@/types/api";

function LihatBahanMentah({ data }: { data: BahanMentah }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary-green">Lihat</Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto">
        <form className="flex flex-col gap-y-4">
          <DialogHeader>
            <DialogTitle>{data.name}</DialogTitle>
          </DialogHeader>
          <FieldSet>
            <FieldGroup>
              <Field>
                <div className="flex w-full gap-x-4 text-xs items-center">
                  <FieldLabel htmlFor="kode" className="font-normal">
                    Kode Bahan :
                  </FieldLabel>
                  <p className="underline text-slate-500">{data.kode}</p>
                </div>
              </Field>
              <Field>
                <div className="flex items-center w-full text-xs">
                  <FieldLabel
                    htmlFor="name"
                    className="w-2/3 md:w-1/3 font-normal"
                  >
                    Nama Bahan :
                  </FieldLabel>
                  <Input
                    autoComplete="off"
                    id="name"
                    className="w-full"
                    type="text"
                    readOnly
                    value={data.name}
                  />
                </div>
              </Field>
              <Field>
                <div className="flex items-center w-full text-xs">
                  <FieldLabel
                    htmlFor="satuan"
                    className="w-2/3 md:w-1/3 font-normal"
                  >
                    Satuan Stok :
                  </FieldLabel>
                  <Input
                    autoComplete="off"
                    id="satuan"
                    className="w-full"
                    type="text"
                    readOnly
                    value={data.satuan}
                  />
                </div>
              </Field>
              <Field>
                <div className="flex items-center w-full text-xs">
                  <FieldLabel
                    htmlFor="batas"
                    className="w-2/3 md:w-1/3 font-normal"
                  >
                    Batas Minimum :
                  </FieldLabel>
                  <Input
                    autoComplete="off"
                    id="batas"
                    className="w-full"
                    type="number"
                    readOnly
                    value={data.batasMinimum}
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

export default LihatBahanMentah;
