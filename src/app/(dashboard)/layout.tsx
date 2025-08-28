
'use client';

import { SimpleDashboardNav } from "@/components/dashboard-nav";
import { DashboardHeader } from "@/components/dashboard-header";
import { SidebarProvider, Sidebar, SidebarContent, useSidebar } from "@/components/ui/sidebar";
import { ChatWidget } from "@/components/chat-widget";
import React from "react";
import { cn } from "@/lib/utils";

function DashboardMainContent({ children }: { children: React.ReactNode }) {
    const { state } = useSidebar();
    return (
        <div className={cn(
            "flex flex-col flex-1 transition-[margin-left] duration-300 ease-in-out",
            state === 'expanded' ? 'md:ml-64' : 'md:ml-14'
        )}>
            <main className="flex-1 p-4 md:p-6 bg-muted/30 h-[calc(100vh-theme(spacing.16))] overflow-y-auto">
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
        <div className="flex min-h-screen w-full bg-background relative">
            <DashboardHeader />
            <div className="flex w-full">
                <Sidebar variant="sidebar" collapsible="icon" className="border-r top-16 h-[calc(100vh-theme(spacing.16))]">
                    <SidebarContent className="p-0 pt-4">
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
