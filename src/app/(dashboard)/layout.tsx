
import Image from "next/image";
import { SimpleDashboardNav } from "@/components/dashboard-nav";
import { DashboardHeader } from "@/components/dashboard-header";
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarInset } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar variant="sidebar" collapsible="icon">
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <Image 
              src="https://i.pinimg.com/736x/c6/33/91/c633913aa268fe47d9dede01ca38eba7.jpg" 
              alt="EstateFlow Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="font-headline font-extrabold text-2xl text-primary group-data-[collapsible=icon]:hidden">EstateFlow</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
            <SimpleDashboardNav />
        </SidebarContent>
        <SidebarFooter>
          {/* Footer content if any */}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <DashboardHeader />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
