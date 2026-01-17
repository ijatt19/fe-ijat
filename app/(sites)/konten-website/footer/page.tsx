import { auth } from "@/auth";
import Footer from "@/components/owner/konten-website/footer/Footer";
import { redirect } from "next/navigation";

export default async function KontenWebsiteFooterPage() {
  const session = await auth();

  if (!session) redirect("/");
  return <Footer token={session.user.token} />;
}
