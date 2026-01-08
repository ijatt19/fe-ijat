import { auth } from "@/auth";
import Header from "@/components/owner/konten-website/header/Header";
import { redirect } from "next/navigation";

export default async function KontenWebsiteHeaderPage() {
  const session = await auth();

  if (!session) redirect("/");

  return <Header token={session.user.token} />;
}
