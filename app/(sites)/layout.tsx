import Topbar from "@/components/Topbar";
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
        <Topbar />
        {/* topbar */}

        {/* sidebar and main-content */}
        <div className="px-4 py-20 xl:p-0">{children}</div>
        {/* sidebar and main-content */}
      </SidebarProvider>
    </div>
  );
}
