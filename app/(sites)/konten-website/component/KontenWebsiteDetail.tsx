"use client";

import { Konten } from "@/types/api";
import { useMemo } from "react";
import UpdateLogo from "./UpdateLogo";

function KontenWebsiteDetail({
  token,
  dataKonten,
}: {
  token: string;
  dataKonten: Konten[];
}) {
  const logoKonten = useMemo(
    () => dataKonten.find((item) => item.key === "logo"),
    [dataKonten]
  );

  if (!logoKonten) return <div>Logo tidak ada</div>;

  return (
    <div className="flex flex-col gap-y-8">
      <h1 className="font-bold text-2xl">Konten Website</h1>
      <UpdateLogo token={token} logoKonten={logoKonten} />
    </div>
  );
}

export default KontenWebsiteDetail;
