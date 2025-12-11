import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { User } from "@/types/api";

function ProfilDetail({ dataUser }: { dataUser: User }) {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-4 xl:flex-row xl:w-full xl:gap-y-0 xl:gap-x-4">
        <div className="flex flex-col gap-y-4 xl:w-1/2">
          <Field>
            <FieldLabel htmlFor="nama-depan">Nama Depan</FieldLabel>
            <Input
              id="nama-depan"
              className="border border-black disabled:opacity-100"
              disabled
              value={dataUser.namaDepan}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="nama-belakang">Nama Belakang</FieldLabel>
            <Input
              id="nama-belakang"
              className="border border-black disabled:opacity-100"
              disabled
              value={dataUser.namaBelakang}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input
              id="username"
              className="border border-black disabled:opacity-100"
              disabled
              value={dataUser.username}
            />
          </Field>
        </div>
        <div className="flex flex-col gap-y-4 xl:w-1/2">
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              className="border border-black disabled:opacity-100"
              disabled
              value={dataUser.email}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="no-hp">No Hp</FieldLabel>
            <Input
              id="no-hp"
              className="border border-black disabled:opacity-100"
              disabled
              value={dataUser.noHp}
            />
          </Field>
        </div>
      </div>
      <div className="flex flex-col w-full gap-y-3 xl:gap-y-0 xl:flex-row xl:gap-x-4">
        <Button className="rounded bg-primary-blue border border-primary-blue hover:bg-inherit hover:text-primary-blue">
          Ubah
        </Button>
        <Button className="rounded bg-primary-orange border border-primary-orange hover:bg-inherit hover:text-primary-red">
          Ganti Password
        </Button>
        <Button className="rounded bg-primary-red border border-primary-red hover:bg-inherit hover:text-primary-red">
          Logout
        </Button>
      </div>
    </div>
  );
}

export default ProfilDetail;
