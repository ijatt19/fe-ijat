import React from "react";

export default function MesinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2.5">Data Master</h1>
        <h2 className="text-[14px]">Master Mesin</h2>
      </div>

      {children}
    </div>
  );
}
