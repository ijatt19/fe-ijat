"use client";

import { useState } from "react";
import NavDataMaster from "../NavDataMaster";
import SearchBahanMentah from "./SearchBahanMentah";
import TambahBahan from "./TambahBahan";
import TableBahanMentah from "./TableBahanMentah";

function ContainerBahanMentah({ token }: { token: string }) {
  const [keyword, setKeyword] = useState("");
  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex items-end gap-x-4 md:w-2/3">
        <SearchBahanMentah value={keyword} onChange={setKeyword} />
        <TambahBahan token={token} />
      </div>
      <NavDataMaster />
      <TableBahanMentah token={token} keyword={keyword} />
    </div>
  );
}

export default ContainerBahanMentah;
