import { auth } from "@/auth";
import ContainerPelanggan from "@/components/owner/pelanggan/ContainerPelanggan";
import { redirect } from "next/navigation";

export default async function PelangganPage() {
  const session = await auth();

  if (!session || !session.user.token) redirect("/");
  return (
    <div className="flex flex-col gap-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2.5">Pelanggan</h1>
      </div>
      <ContainerPelanggan token={session.user.token} />
    </div>
  );
}
