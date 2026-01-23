"use client";

import { useState } from "react";
import SearchMesin from "./SearchMesin";
import TambahMesin from "./TambahMesin";
import NavMesinKaryawan from "../NavMesinKaryawan";
import TableMesin from "./TableMesin";

function ContainerMesin({ token }: { token: string }) {
  const [keyword, setKeyword] = useState("");
  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex items-end gap-x-4 md:w-2/3">
        <SearchMesin value={keyword} onChange={setKeyword} />
        <TambahMesin token={token} />
      </div>
      <NavMesinKaryawan />
      <TableMesin keyword={keyword} token={token} />
    </div>
  );
}

export default ContainerMesin;
