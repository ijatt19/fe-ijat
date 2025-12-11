"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";

function ForceClose() {
  useEffect(() => {
    signOut({ redirect: true, redirectTo: "/" });
  }, []);
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      <p className="mt-4 text-sm text-gray-500">
        Sesi kadaluarsa. Sedang logout...
      </p>
    </div>
  );
}

export default ForceClose;
