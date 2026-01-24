import { auth } from "@/auth";
import ContainerBahanMentah from "@/components/owner/data-master/barang/bahan-mentah/ContainerBahanMentah";
import { redirect } from "next/navigation";

export default async function BarangMentahPage() {
  const session = await auth();

  if (!session || !session.user.token) redirect("/");
  return <ContainerBahanMentah token={session.user.token} />;
}
