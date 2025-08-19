'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Package,
  CalendarCheck,
  Map,
  Calendar,
  DollarSign,
  Users,
  LineChart,
  Shield,
  Wand2,
} from 'lucide-react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import type { NavItem } from '@/lib/types';


export const navItems: NavItem[] = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/properties', label: 'Pacotes', icon: Package },
  { href: '/reservations', label: 'Reservas', icon: CalendarCheck },
  { href: '/negotiations', label: 'Recomendações', icon: Wand2 },
  { href: '/processes', label: 'Itinerários', icon: Map },
  { href: '/agenda', label: 'Agenda', icon: Calendar },
  { href: '/financial', label: 'Faturamento', icon: DollarSign },
  { href: '/reports', label: 'Relatórios', icon: LineChart },
  { href: '/admin', label: 'Admin', icon: Shield },
];


export function SimpleDashboardNav() {
  const pathname = usePathname();
  return (
    <SidebarMenu>
      {navItems.map((item) => (
         <SidebarMenuItem key={item.href}>
            <Link href={item.href}>
              <SidebarMenuButton
                isActive={pathname.startsWith(item.href) && (item.href !== '/' || pathname === '/')}
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
