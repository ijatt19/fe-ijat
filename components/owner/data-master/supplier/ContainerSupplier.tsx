"use client";

import { useState } from "react";
import SearchSupplier from "./SearchSupplier";
import TambahSupplier from "./TambahSupplier";
import TableSupplier from "./TableSupplier";

function ContainerSupplier({ token }: { token: string }) {
  const [keyword, setKeyword] = useState("");
  
  return (
    <div className="flex flex-col gap-y-6">
      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="w-full sm:w-auto sm:min-w-[320px]">
          <SearchSupplier value={keyword} onChange={setKeyword} />
        </div>
        <TambahSupplier token={token} />
      </div>
      
      {/* Table */}
      <TableSupplier keyword={keyword} token={token} />
    </div>
  );
}

export default ContainerSupplier;
