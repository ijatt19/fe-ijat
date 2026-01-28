"use client";

import { useState } from "react";
import FilterModalPrive from "./FilterModalPrive";
import { JenisModalPrive } from "@/types/api";
import CardModalPrive from "./CardModalPrive";
import { Button } from "@/components/ui/button";

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
      <div className="flex flex-col gap-y-8 w-full md:gap-y-0 md:flex-row md:justify-between md:max-w-[80%] xl:max-w-[60%]">
        <CardModalPrive nominal="12.500.000" title="TOTAL MODAL DISETOR" />
        <CardModalPrive nominal="12.500.000" title="TOTAL PRIVE DIAMBIL" v2 />
        <div className="flex flex-col gap-y-4 justify-between">
          <Button className="bg-yellow-500">Print Laporan</Button>
          <Button className="bg-primary-green">Tambah +</Button>
        </div>
      </div>
      {/* <TambahPelanggan token={token} /> */}
      {/* <TablePelanggan keyword={keyword} token={token} /> */}
    </div>
  );
}

export default ContainerModalPrive;
