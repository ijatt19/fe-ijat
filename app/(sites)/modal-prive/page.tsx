import { auth } from "@/auth";
import ContainerModalPrive from "@/components/owner/modal-prive/ContainerModalPrive";
import { redirect } from "next/navigation";

export default async function ModalPrivePage() {
  const session = await auth();

  if (!session || !session.user.token) redirect("/");
  return (
    <div className="flex flex-col gap-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2.5">
          Kelola Modal & Prive Owner
        </h1>
        <h2 className="text-[14px]">
          {new Date().toLocaleString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </h2>
      </div>
      <ContainerModalPrive token={session.user.token} />
    </div>
  );
}
