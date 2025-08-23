
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Home,
  Handshake,
  FileText,
  Calendar,
  Wallet,
  Users,
  BarChart,
  Package,
  Map,
  Wand2
} from 'lucide-react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import type { NavItem } from '@/lib/types';
import { cn } from '@/lib/utils';


export const navItems: NavItem[] = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/cotacoes', label: 'Cotações', icon: FileText },
  { href: '/agenda', label: 'Agenda', icon: Calendar },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 px-2 py-4 space-y-2">
      {navItems.map((item) => (
        <Link key={item.href} href={item.href} legacyBehavior passHref>
          <a
            className={cn(
              'w-full flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-accent',
              pathname === item.href && 'bg-primary/10 text-primary'
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </a>
        </Link>
      ))}
    </nav>
  );
}

export function SimpleDashboardNav() {
  const pathname = usePathname();
  return (
    <SidebarMenu>
      {navItems.map((item) => (
         <SidebarMenuItem key={item.href}>
            <Link href={item.href} passHref>
              <SidebarMenuButton
                isActive={pathname === item.href}
                tooltip={{ children: item.label, side: "right", align: "center" }}
              >
                <item.icon />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

    