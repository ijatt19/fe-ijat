"use client";

import { useState } from "react";
import NavDataMaster from "../NavDataMaster";
import SearchBahanMentah from "./SearchBahanMentah";
import TambahBahan from "./TambahBahan";
import TableBahanMentah from "./TableBahanMentah";

function ContainerBahanMentah({ token }: { token: string }) {
  const [keyword, setKeyword] = useState("");
  
  return (
    <div className="flex flex-col gap-y-6">
      {/* Tab Navigation */}
      <NavDataMaster />
      
      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="w-full sm:w-auto sm:min-w-[320px]">
          <SearchBahanMentah value={keyword} onChange={setKeyword} />
        </div>
        <TambahBahan token={token} />
      </div>
      
      {/* Table */}
      <TableBahanMentah token={token} keyword={keyword} />
    </div>
  );
}

export default ContainerBahanMentah;
