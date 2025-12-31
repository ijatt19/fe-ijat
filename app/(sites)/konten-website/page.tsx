import { auth } from "@/auth";
import { redirect } from "next/navigation";
import KontenWebsiteDetail from "./component/KontenWebsiteDetail";
import { getDataKonten } from "@/services/konten-website.service";
import ForceClose from "@/components/ForceClose";

export default async function KontenWebsitePage() {
  const session = await auth();

  if (!session) redirect("/");

  const dataKontens = await getDataKonten(session.user.token);

  if (dataKontens && !dataKontens.success) {
    if (dataKontens.statusCode === 401) return <ForceClose />;

    return <div>{dataKontens.message}</div>;
  }

  if (!("data" in dataKontens)) return <div>{dataKontens.message}</div>;

  return (
    <KontenWebsiteDetail
      token={session.user.token}
      dataKonten={dataKontens.data}
    />
  );
}
