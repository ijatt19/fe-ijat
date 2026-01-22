import { Input } from "@/components/ui/input";
import React from "react";

function SearchKaryawan({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="w-full">
      <Input
        placeholder="Cari karyawan..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchKaryawan;
