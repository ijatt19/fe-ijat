"use client";

import { useState } from "react";
import NavDataMaster from "../NavDataMaster";
import SearchBarangJadi from "./SearchBarangJadi";
import TableBarangJadi from "./TableBarangJadi";
import TambahBarang from "./TambahBarang";

function ContainerBarangJadi({ token }: { token: string }) {
  const [keyword, setKeyword] = useState("");
  
  return (
    <div className="flex flex-col gap-y-6">
      {/* Tab Navigation */}
      <NavDataMaster />
      
      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="w-full sm:w-auto sm:min-w-[320px]">
          <SearchBarangJadi value={keyword} onChange={setKeyword} />
        </div>
        <TambahBarang token={token} />
      </div>
      
      {/* Table */}
      <TableBarangJadi token={token} keyword={keyword} />
    </div>
  );
}

export default ContainerBarangJadi;
