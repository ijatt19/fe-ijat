import { auth } from "@/auth";
import SidebarOwner from "@/components/owner/SidebarOwner";
import TopbarOwner from "@/components/owner/TopbarOwner";
import { SidebarProvider } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";

export default async function SitesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/");
  if (!session.user) redirect("/");
  return (
    <div className="w-full">
      <SidebarProvider>
        <TopbarOwner user={session.user} />

        <div className="px-4 pt-20 md:pt-24 xl:p-0 xl:flex w-full min-h-screen">
          <SidebarOwner user={session.user} />
          <div className="xl:w-1/4"></div>
          <div className="w-full xl:p-6 ">{children}</div>
        </div>
      </SidebarProvider>
    </div>
  );
}
