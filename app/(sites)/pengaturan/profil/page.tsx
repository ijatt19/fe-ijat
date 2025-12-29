import { auth } from "@/auth";
import { getUserProfile } from "@/services/user.service";
import { redirect } from "next/navigation";
import ProfilDetail from "./component/ProfilDetail";
import ForceClose from "@/components/ForceClose";

export default async function ProfilPage() {
  const session = await auth();

  if (!session) redirect("/");

  const userDetail = await getUserProfile(session.user.token, session.user.id);

  if (!userDetail.success) {
    if (userDetail.statusCode === 401) return <ForceClose />;

    return <div>{userDetail.message}</div>;
  }

  return <ProfilDetail dataUser={userDetail.data} token={session.user.token} />;
}
