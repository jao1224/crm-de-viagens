
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
  Wand2,
  UserCog,
} from 'lucide-react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import type { NavItem } from '@/lib/types';


export const navItems: NavItem[] = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/packages', label: 'Pacotes', icon: Package },
  { href: '/reservations', label: 'Reservas', icon: CalendarCheck },
  { href: '/recomendacoes', label: 'Recomendações', icon: Wand2 },
  { href: '/itineraries', label: 'Itinerários', icon: Map },
  { href: '/agenda', label: 'Agenda', icon: Calendar },
  { href: '/faturamento', label: 'Faturamento', icon: DollarSign },
  { href: '/relatorios', label: 'Relatórios', icon: LineChart },
  { href: '/clientes', label: 'Clientes', icon: Users },
  { href: '/admin', label: 'Usuários', icon: UserCog },
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
