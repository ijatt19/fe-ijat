import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function BarangMentahPage() {
  const session = await auth();

  if (!session || !session.user.token) redirect("/");
  return <div>bahan mentah page</div>;
}
