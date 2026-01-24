"use client";

import { useState } from "react";
import SearchSupplier from "./SearchSupplier";
import TambahSupplier from "./TambahSupplier";
import TableSupplier from "./TableSupplier";

function ContainerSupplier({ token }: { token: string }) {
  const [keyword, setKeyword] = useState("");
  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex items-end gap-x-4 md:w-2/3">
        <SearchSupplier value={keyword} onChange={setKeyword} />
        <TambahSupplier token={token} />
      </div>
      <TableSupplier keyword={keyword} token={token} />
    </div>
  );
}

export default ContainerSupplier;
