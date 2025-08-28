
'use client';

import { SimpleDashboardNav } from "@/components/dashboard-nav";
import { DashboardHeader } from "@/components/dashboard-header";
import { SidebarProvider, Sidebar, SidebarContent, useSidebar } from "@/components/ui/sidebar";
import React from "react";
import { cn } from "@/lib/utils";

function DashboardMainContent({ children }: { children: React.ReactNode }) {
    const { state } = useSidebar();
    return (
        <main className={cn(
            "flex-1 p-4 md:p-6 bg-muted/30 overflow-y-auto transition-[margin-left] duration-300 ease-in-out pt-20", // Added pt-20 to account for header height
            state === 'expanded' ? 'md:ml-64' : 'md:ml-14'
        )}>
            {children}
        </main>
    );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <SidebarProvider>
        <div className="min-h-screen w-full bg-background relative flex">
            <Sidebar variant="sidebar" collapsible="icon" className="border-r fixed top-0 left-0 h-full pt-16">
                <SidebarContent className="p-0">
                    <SimpleDashboardNav />
                </SidebarContent>
            </Sidebar>
            <div className="flex flex-col flex-1 w-full">
              <DashboardHeader />
              <DashboardMainContent>
                  {children}
              </DashboardMainContent>
            </div>
        </div>
      </SidebarProvider>
  );
}
