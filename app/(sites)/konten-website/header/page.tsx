import { auth } from "@/auth";
import ForceClose from "@/components/ForceClose";
import Header from "@/components/owner/konten-website/header/Header";
import { getDataHeaderKonten } from "@/services/konten-website.service";
import { redirect } from "next/navigation";

export default async function KontenWebsiteHeaderPage() {
  const session = await auth();

  if (!session) redirect("/");

  // const dataHeader = await getDataHeaderKonten(session.user.token);

  // if (!dataHeader.success) {
  //   if (dataHeader.statusCode === 401) return <ForceClose />;

  //   return <div>{dataHeader.message}</div>;
  // }

  return <Header token={session.user.token} />;
}
