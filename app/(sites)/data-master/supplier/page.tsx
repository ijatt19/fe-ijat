import { auth } from "@/auth";
import ContainerSupplier from "@/components/owner/data-master/supplier/ContainerSupplier";
import { redirect } from "next/navigation";
import React from "react";

export default async function SupplierPage() {
  const session = await auth();

  if (!session || !session.user.token) redirect("/");
  return <ContainerSupplier token={session.user.token} />;
}
