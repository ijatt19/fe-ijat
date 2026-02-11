"use client";

import { useState } from "react";
import SearchAkun from "./SearchAkun";
import TambahAkun from "./TambahAkun";
import TableAkun from "./TableAkun";

function ContainerAkun({ token, currentUserId }: { token: string; currentUserId: string }) {
  const [keyword, setKeyword] = useState("");
  return (
    <div className="flex flex-col gap-y-6">
      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="w-full sm:w-auto sm:min-w-[320px]">
          <SearchAkun value={keyword} onChange={setKeyword} />
        </div>
        <TambahAkun token={token} />
      </div>
      
      {/* Table */}
      <TableAkun keyword={keyword} token={token} currentUserId={currentUserId} />
    </div>
  );
}

export default ContainerAkun;
