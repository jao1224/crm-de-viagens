
'use client';

import { SimpleDashboardNav } from "@/components/dashboard-nav";
import { DashboardHeader } from "@/components/dashboard-header";
import { SidebarProvider, Sidebar, SidebarContent, useSidebar } from "@/components/ui/sidebar";
import { ChatWidget } from "@/components/chat-widget";
import React from "react";
import { cn } from "@/lib/utils";

function DashboardMainContent({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex-1 flex flex-col bg-muted/30">
            <DashboardHeader />
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
        <div className="flex min-h-screen w-full">
            <Sidebar variant="sidebar" collapsible="icon" className="border-r">
                <SidebarContent className="p-0 pt-4">
                    <SimpleDashboardNav />
                </SidebarContent>
            </Sidebar>
            <div className="w-full">
               <DashboardMainContent>
                    {children}
                </DashboardMainContent>
            </div>
        </div>
          <ChatWidget />
      </SidebarProvider>
  );
}
