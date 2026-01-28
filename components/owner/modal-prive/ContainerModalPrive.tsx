"use client";

import { useState } from "react";
import FilterModalPrive from "./FilterModalPrive";
import { JenisModalPrive } from "@/types/api";

function ContainerModalPrive({ token }: { token: string }) {
  const [bulan, setBulan] = useState<string>("");
  const [tahun, setTahun] = useState<string>("");
  const [jenis, setJenis] = useState<JenisModalPrive>(
    JenisModalPrive.SETOR_MODAL,
  );
  return (
    <div className="flex flex-col gap-y-8 w-full">
      <div className="flex items-end gap-x-4">
        <FilterModalPrive
          bulan={bulan}
          setBulan={setBulan}
          tahun={tahun}
          setTahun={setTahun}
          jenis={jenis}
          setJenis={setJenis}
        />
        {/* <TambahPelanggan token={token} /> */}
      </div>
      {/* <TablePelanggan keyword={keyword} token={token} /> */}
    </div>
  );
}

export default ContainerModalPrive;
