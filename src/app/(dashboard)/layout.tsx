
'use client';

import { SimpleDashboardNav } from "@/components/dashboard-nav";
import { DashboardHeader } from "@/components/dashboard-header";
import { SidebarProvider, Sidebar, SidebarContent, useSidebar } from "@/components/ui/sidebar";
import { ChatWidget } from "@/components/chat-widget";
import React from "react";
import { cn } from "@/lib/utils";

function DashboardMainContent({ children }: { children: React.ReactNode }) {
    const { state: sidebarState } = useSidebar();

    return (
        <div 
            className={cn(
                "flex-1 flex flex-col bg-muted/30 transition-[padding-left] duration-200 ease-linear",
                sidebarState === 'expanded' ? 'md:pl-[16rem]' : 'md:pl-[3.5rem]'
            )}
        >
            <main className="flex-1 p-4 md:p-6 relative">
                {children}
            </main>
        </div>
    );
}

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
                  <SidebarContent className="p-0 pt-16">
                      <SimpleDashboardNav />
                  </SidebarContent>
              </Sidebar>
              <DashboardMainContent>
                  {children}
              </DashboardMainContent>
          </div>
        </div>
          <ChatWidget />
      </SidebarProvider>
  );
}
