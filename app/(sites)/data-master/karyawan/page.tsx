import { auth } from "@/auth";
import ContainerKaryawan from "@/components/owner/data-master/mesin-karyawan/karyawan/ContainerKaryawan";
import { redirect } from "next/navigation";

export default async function KaryawanPage() {
  const session = await auth();

  if (!session || !session.user.token) redirect("/");
  return <ContainerKaryawan token={session.user.token} />;
}
