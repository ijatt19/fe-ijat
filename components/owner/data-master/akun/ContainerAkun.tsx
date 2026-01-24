"use client";

import { useState } from "react";
import SearchAkun from "./SearchAkun";
import TambahAkun from "./TambahAkun";
import TableAkun from "./TableAkun";

function ContainerAkun({ token }: { token: string }) {
  const [keyword, setKeyword] = useState("");
  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex items-end gap-x-4 md:w-2/3">
        <SearchAkun value={keyword} onChange={setKeyword} />
        <TambahAkun token={token} />
      </div>
      <TableAkun keyword={keyword} token={token} />
    </div>
  );
}

export default ContainerAkun;
