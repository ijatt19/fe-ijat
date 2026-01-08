import { redirect } from "next/navigation";

export default async function KontenWebsitePage() {
  // const session = await auth();

  // if (!session) redirect("/");

  // const dataKontens = await getDataKonten(session.user.token);

  // if (dataKontens && !dataKontens.success) {
  //   if (dataKontens.statusCode === 401) return <ForceClose />;

  //   return <div>{dataKontens.message}</div>;
  // }

  // if (!("data" in dataKontens)) return <div>{dataKontens.message}</div>;

  // return (
  //   <KontenWebsiteDetail
  //     token={session.user.token}
  //     dataKonten={dataKontens.data}
  //   />
  // );
  return redirect("/konten-website/header");
}
