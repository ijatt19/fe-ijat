import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { User } from "@/types/api";
import UpdateForm from "./UpdateForm";
import GantiPassword from "./GantiPassword";

function ProfilDetail({ dataUser, token }: { dataUser: User; token: string }) {
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
              readOnly
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="nama-belakang">Nama Belakang</FieldLabel>
            <Input
              id="nama-belakang"
              className="border border-black disabled:opacity-100"
              disabled
              value={dataUser.namaBelakang}
              readOnly
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input
              id="username"
              className="border border-black disabled:opacity-100"
              disabled
              value={dataUser.username}
              readOnly
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
              readOnly
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="no-hp">No Hp</FieldLabel>
            <Input
              id="no-hp"
              className="border border-black disabled:opacity-100"
              disabled
              value={dataUser.noHp}
              readOnly
            />
          </Field>
        </div>
      </div>
      <div className="flex flex-col w-full gap-y-3 xl:gap-y-0 xl:flex-row xl:gap-x-4">
        <UpdateForm token={token} dataUser={dataUser} />
        <GantiPassword token={token} />
        <Button className="rounded bg-primary-red border border-primary-red hover:bg-inherit hover:text-primary-red">
          Logout
        </Button>
      </div>
    </div>
  );
}

export default ProfilDetail;
