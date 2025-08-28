
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
            "flex-1 p-4 md:p-6 bg-muted/30 overflow-y-auto transition-[margin-left] duration-300 ease-in-out",
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
        <DashboardHeader />
        <div className="min-h-[calc(100vh-4rem)] w-full bg-background relative flex">
            <Sidebar variant="sidebar" collapsible="icon" className="border-r top-16 h-[calc(100vh-4rem)]">
                <SidebarContent className="p-0 pt-4">
                    <SimpleDashboardNav />
                </SidebarContent>
            </Sidebar>
            <DashboardMainContent>
                {children}
            </DashboardMainContent>
        </div>
      </SidebarProvider>
  );
}
