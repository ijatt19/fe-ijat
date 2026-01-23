import { auth } from "@/auth";
import ContainerMesin from "@/components/owner/data-master/mesin-karyawan/mesin/ContainerMesin";
import { redirect } from "next/navigation";

export default async function MesinPage() {
  const session = await auth();

  if (!session || !session.user.token) redirect("/");
  return <ContainerMesin token={session.user.token} />;
}
