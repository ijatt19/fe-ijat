"use client";

import { useState } from "react";
import SearchKaryawan from "./SearchKaryawan";
import TambahKaryawan from "./TambahKaryawan";
import NavMesinKaryawan from "../NavMesinKaryawan";
import TableKaryawan from "./TableKaryawan";

function ContainerKaryawan({ token }: { token: string }) {
  const [keyword, setKeyword] = useState("");
  
  return (
    <div className="flex flex-col gap-y-6">
      {/* Tab Navigation */}
      <NavMesinKaryawan />
      
      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="w-full sm:w-auto sm:min-w-[320px]">
          <SearchKaryawan value={keyword} onChange={setKeyword} />
        </div>
        <TambahKaryawan token={token} />
      </div>
      
      {/* Table */}
      <TableKaryawan keyword={keyword} token={token} />
    </div>
  );
}

export default ContainerKaryawan;
