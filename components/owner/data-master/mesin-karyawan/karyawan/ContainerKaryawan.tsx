"use client";

import { useState } from "react";
import SearchKaryawan from "./SearchKaryawan";
import TambahKaryawan from "./TambahKaryawan";
import NavMesinKaryawan from "../NavMesinKaryawan";
import TableKaryawan from "./TableKaryawan";

function ContainerKaryawan({ token }: { token: string }) {
  const [keyword, setKeyword] = useState("");
  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex items-end gap-x-4 md:w-2/3">
        <SearchKaryawan value={keyword} onChange={setKeyword} />
        <TambahKaryawan token={token} />
      </div>
      <NavMesinKaryawan />
      <TableKaryawan keyword={keyword} token={token} />
    </div>
  );
}

export default ContainerKaryawan;
