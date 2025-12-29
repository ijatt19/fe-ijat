"use client";

import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { logoSchema, LogoSchemaValues } from "@/lib/schemas/konten-website";
import { Konten } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

function KontenWebsiteDetail({
  token,
  dataKonten,
}: {
  token: string;
  dataKonten: Konten[];
}) {
  const {} = useForm<LogoSchemaValues>({
    resolver: zodResolver(logoSchema),
  });

  return (
    <div className="flex flex-col gap-y-8">
      <h1 className="font-bold text-2xl">Konten Website</h1>
      <div className="shadow rounded p-2">
        <h2 className="text-xl">Navbar</h2>
        <form>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="logo">Logo</FieldLabel>
                <Input type="file" id="logo" />
              </Field>
            </FieldGroup>
          </FieldSet>
        </form>
      </div>
    </div>
  );
}

export default KontenWebsiteDetail;
