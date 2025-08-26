
import { SimpleDashboardNav } from "@/components/dashboard-nav";
import { DashboardHeader } from "@/components/dashboard-header";
import { SidebarProvider, Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { ChatWidget } from "@/components/chat-widget";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <SidebarProvider>
        <div className="flex min-h-screen w-full flex-col">
          <DashboardHeader />
          <div className="flex flex-1">
              <Sidebar variant="sidebar" collapsible="icon" className="border-r">
                  <SidebarContent className="p-0">
                      <SimpleDashboardNav />
                  </SidebarContent>
              </Sidebar>
              <div className="flex-1 flex flex-col bg-muted/30">
                  <main className="flex-1 p-4 md:p-6 relative">
                      {children}
                  </main>
              </div>
          </div>
        </div>
          <ChatWidget />
      </SidebarProvider>
  );
}
