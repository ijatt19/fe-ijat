import { auth } from "@/auth";
import ForceClose from "@/components/ForceClose";
import Header from "@/components/owner/konten-website/header/Header";
import { getDataHeaderKonten } from "@/services/konten-website.service";
import { redirect } from "next/navigation";

export default async function KontenWebsiteHeaderPage() {
  const session = await auth();

  if (!session) redirect("/");

  return <Header token={session.user.token} />;
}
