'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Building2,
  Handshake,
  ClipboardList,
  Calendar,
  DollarSign,
  Shield,
  User,
  LineChart,
  Home
} from 'lucide-react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import type { NavItem } from '@/lib/types';
import { cn } from '@/lib/utils';


export const navItems: NavItem[] = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/properties', label: 'Imóveis', icon: Building2 },
  { href: '/negotiations', label: 'Negociações', icon: Handshake },
  { href: '/processes', label: 'Processos', icon: ClipboardList },
  { href: '/agenda', label: 'Agenda', icon: Calendar },
  { href: '/financial', label: 'Financeiro', icon: DollarSign },
  { href: '/reports', label: 'Relatórios', icon: LineChart },
  { href: '/admin', label: 'Administrativo', icon: Shield },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 px-2 py-4 space-y-2">
      {navItems.map((item) => (
        <Link key={item.href} href={item.href}>
          <button
            className={cn(
              'w-full flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-accent',
              pathname === item.href && 'bg-primary/10 text-primary'
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </button>
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
            <Link href={item.href} legacyBehavior passHref>
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
