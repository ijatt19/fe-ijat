import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

function SearchBarangJadi() {
  return (
    <div className="w-full">
      <form className="w-full">
        <FieldSet>
          <FieldGroup>
            <div className="flex items-end gap-x-5 w-full">
              <Field>
                <FieldLabel htmlFor="search" className="text-xl">
                  Cari Barang
                </FieldLabel>
                <Input id="search" className="w-full" />
              </Field>
              <Button type="submit">Cari</Button>
            </div>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  );
}

export default SearchBarangJadi;
