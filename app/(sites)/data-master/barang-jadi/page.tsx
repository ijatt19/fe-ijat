import { auth } from "@/auth";
import ContainerBarangJadi from "@/components/owner/data-master/barang/barang-jadi/ContainerBarangJadi";
import { redirect } from "next/navigation";

export default async function BarangJadiPage() {
  const session = await auth();

  if (!session || !session.user.token) redirect("/");
  return <ContainerBarangJadi token={session.user.token} />;
}
