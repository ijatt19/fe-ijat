"use client";

import { useState } from "react";
import NavDataMaster from "../NavDataMaster";
import SearchBarangJadi from "./SearchBarangJadi";
import TableBarangJadi from "./TableBarangJadi";
import TambahBarang from "./TambahBarang";

function ContainerBarangJadi({ token }: { token: string }) {
  const [keyword, setKeyword] = useState("");
  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex items-end gap-x-4 md:w-2/3">
        <SearchBarangJadi value={keyword} onChange={setKeyword} />
        <TambahBarang token={token} />
      </div>
      <NavDataMaster />
      <TableBarangJadi token={token} keyword={keyword} />
    </div>
  );
}

export default ContainerBarangJadi;
