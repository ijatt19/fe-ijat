import { auth } from "@/auth";
import ContainerAkun from "@/components/owner/data-master/akun/ContainerAkun";
import { redirect } from "next/navigation";
import React from "react";

export default async function AkunPage() {
  const session = await auth();

  if (!session || !session.user.token) redirect("/");
  return <ContainerAkun token={session.user.token} />;
}
