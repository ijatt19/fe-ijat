import SidebarOwner from "@/components/owner/SidebarOwner";
import TopbarOwner from "@/components/owner/TopbarOwner";
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function SitesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <SidebarProvider>
        {/* topbar */}
        <TopbarOwner />
        {/* topbar */}

        {/* sidebar and main-content */}
        <div className="px-4 py-20 xl:p-0 xl:flex w-full min-h-screen">
          <SidebarOwner />
          <div className="w-full">{children}</div>
        </div>
        {/* sidebar and main-content */}
      </SidebarProvider>
    </div>
  );
}
