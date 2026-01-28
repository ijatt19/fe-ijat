"use client";

import { useState } from "react";
import FilterModalPrive from "./FilterModalPrive";
import { JenisModalPrive } from "@/types/api";
import CardModalPrive from "./CardModalPrive";

function ContainerModalPrive({ token }: { token: string }) {
  const [bulan, setBulan] = useState<string>("");
  const [tahun, setTahun] = useState<string>("");
  const [jenis, setJenis] = useState<string>("");
  return (
    <div className="flex flex-col gap-y-8 w-full">
      <FilterModalPrive
        bulan={bulan}
        setBulan={setBulan}
        tahun={tahun}
        setTahun={setTahun}
        jenis={jenis}
        setJenis={setJenis}
      />
      <div className="flex flex-col gap-y-8 w-full md:gap-y-0 md:flex-row md:items-center md:justify-between md:max-w-2/3 xl:max-w-[40%]">
        <CardModalPrive nominal="12.500.000" title="TOTAL MODAL DISETOR" />
        <CardModalPrive nominal="12.500.000" title="TOTAL PRIVE DIAMBIL" v2 />
      </div>
      {/* <TambahPelanggan token={token} /> */}
      {/* <TablePelanggan keyword={keyword} token={token} /> */}
    </div>
  );
}

export default ContainerModalPrive;
