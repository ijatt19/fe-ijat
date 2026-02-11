import React from "react";

export default function KaryawanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-y-6">
      {/* Header Section */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-orange-600 rounded-full" />
          <h1 className="text-2xl font-bold text-slate-800">Data Master</h1>
        </div>
        <p className="text-sm text-slate-500 ml-4 pl-3">
          Kelola data mesin dan karyawan
        </p>
      </div>

      {children}
    </div>
  );
}
