"use client";

import { useState } from "react";
import SearchPelanggan from "./SearchPelanggan";
import TambahPelanggan from "./TambahPelanggan";
import TablePelanggan from "./TablePelanggan";

function ContainerPelanggan({ token }: { token: string }) {
  const [keyword, setKeyword] = useState("");
  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex items-end gap-x-4 md:w-2/3">
        <SearchPelanggan value={keyword} onChange={setKeyword} />
        <TambahPelanggan token={token} />
      </div>
      <TablePelanggan keyword={keyword} token={token} />
    </div>
  );
}

export default ContainerPelanggan;
