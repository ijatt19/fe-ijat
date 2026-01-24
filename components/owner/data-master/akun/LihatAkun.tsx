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
import { Akun } from "@/types/api";

function LihatAkun({ data }: { data: Akun }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary-green">Lihat</Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto">
        <form className="flex flex-col gap-y-4">
          <DialogHeader>
            <DialogTitle>Akun {data.namaDepan}</DialogTitle>
          </DialogHeader>
          <FieldSet>
            <FieldGroup>
              <Field>
                <div className="flex items-center w-full text-xs">
                  <FieldLabel
                    htmlFor="nama"
                    className="w-2/3 md:w-1/3 font-normal"
                  >
                    Nama Depan :
                  </FieldLabel>
                  <Input
                    autoComplete="off"
                    id="nama"
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
                    htmlFor="namaB"
                    className="w-2/3 md:w-1/3 font-normal"
                  >
                    Nama Belakang :
                  </FieldLabel>
                  <Input
                    autoComplete="off"
                    id="namaB"
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
                    htmlFor="user"
                    className="w-2/3 md:w-1/3 font-normal"
                  >
                    Username :
                  </FieldLabel>
                  <Input
                    autoComplete="off"
                    id="user"
                    className="w-full"
                    type="text"
                    readOnly
                    value={data.username}
                  />
                </div>
              </Field>
              <Field>
                <div className="flex items-center w-full text-xs">
                  <FieldLabel
                    htmlFor="email"
                    className="w-2/3 md:w-1/3 font-normal"
                  >
                    Email :
                  </FieldLabel>
                  <Input
                    autoComplete="off"
                    id="email"
                    className="w-full"
                    type="email"
                    readOnly
                    value={data.email}
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
                    htmlFor="role"
                    className="w-2/3 md:w-1/3 font-normal"
                  >
                    Role :
                  </FieldLabel>
                  <Input
                    autoComplete="off"
                    id="noHp"
                    className="w-full"
                    type="text"
                    readOnly
                    value={data.role}
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

export default LihatAkun;
