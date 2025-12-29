import { auth } from "@/auth";
import { redirect } from "next/navigation";
import KontenWebsiteDetail from "./component/KontenWebsiteDetail";
import { getDataKonten } from "@/services/konten-website.service";

export default async function KontenWebsitePage() {
  const session = await auth();

  if (!session) redirect("/");

  const dataKontens = await getDataKonten(session.user.token);

  if (!dataKontens) return <p>Terjadi Kesalahan</p>;

  return (
    <KontenWebsiteDetail
      token={session.user.token}
      dataKonten={dataKontens?.data}
    />
  );
}
