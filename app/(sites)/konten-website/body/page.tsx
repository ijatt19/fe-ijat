import { auth } from "@/auth";
import Body from "@/components/owner/konten-website/body/Body";
import { redirect } from "next/navigation";

export default async function KontenWebsiteBodyPage() {
  const session = await auth();

  if (!session) redirect("/");
  return <Body token={session.user.token} />;
}
