"use client";

import { useState } from "react";
import SearchKaryawan from "./SearchKaryawan";
import TambahKaryawan from "./TambahKaryawan";

function ContainerKaryawan({ token }: { token: string }) {
  const [keyword, setKeyword] = useState("");
  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex items-end gap-x-4 md:w-2/3">
        <SearchKaryawan value={keyword} onChange={setKeyword} />
        <TambahKaryawan token={token} />
      </div>
    </div>
  );
}

export default ContainerKaryawan;
