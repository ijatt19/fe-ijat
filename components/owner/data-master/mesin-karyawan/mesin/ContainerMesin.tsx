"use client";

import { useState } from "react";
import SearchMesin from "./SearchMesin";
import TambahMesin from "./TambahMesin";
import NavMesinKaryawan from "../NavMesinKaryawan";
import TableMesin from "./TableMesin";

function ContainerMesin({ token }: { token: string }) {
  const [keyword, setKeyword] = useState("");
  
  return (
    <div className="flex flex-col gap-y-6">
      {/* Tab Navigation */}
      <NavMesinKaryawan />
      
      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="w-full sm:w-auto sm:min-w-[320px]">
          <SearchMesin value={keyword} onChange={setKeyword} />
        </div>
        <TambahMesin token={token} />
      </div>
      
      {/* Table */}
      <TableMesin keyword={keyword} token={token} />
    </div>
  );
}

export default ContainerMesin;
