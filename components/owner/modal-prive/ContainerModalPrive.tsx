"use client";

import { useState } from "react";
import FilterModalPrive from "./FilterModalPrive";
import CardModalPrive from "./CardModalPrive";
import { Button } from "@/components/ui/button";
import TambahModalPrive from "./TambahModalPrive";
import TableModalPrive from "./TableModalPrive";

function ContainerModalPrive({ token }: { token: string }) {
  const [draftFilter, setDraftFilter] = useState({
    bulan: "",
    tahun: "",
    jenis: "",
  });

  const [appliedFilter, setAppliedFilter] = useState({
    bulan: "",
    tahun: "",
    jenis: "",
  });

  const tampilkanHandler = () => {
    setAppliedFilter(draftFilter);
  };
  return (
    <div className="flex flex-col gap-y-8 w-full">
      <FilterModalPrive
        filter={draftFilter}
        setFilter={setDraftFilter}
        btnHandler={tampilkanHandler}
      />
      <div className="flex flex-col gap-y-8 w-full md:gap-y-0 md:flex-row md:justify-between md:max-w-[80%] xl:max-w-[60%]">
        <CardModalPrive nominal="12.500.000" title="TOTAL MODAL DISETOR" />
        <CardModalPrive nominal="12.500.000" title="TOTAL PRIVE DIAMBIL" v2 />
        <div className="flex flex-col gap-y-4 justify-between">
          <Button className="bg-yellow-500">Print Laporan</Button>
          <TambahModalPrive token={token} />
        </div>
      </div>
      <TableModalPrive token={token} filter={appliedFilter} />
    </div>
  );
}

export default ContainerModalPrive;
