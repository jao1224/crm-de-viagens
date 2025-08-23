
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Calendar,
  ClipboardList,
  ChevronDown,
  FileText,
  LineChart,
  Users,
  Settings,
  HelpCircle
} from 'lucide-react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import type { NavItem } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';


export const navItems: NavItem[] = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/cotações', label: 'Cotações', icon: LayoutDashboard, badge: 1 }, // Ícone precisa ser trocado
  { href: '/agenda', label: 'Calendário', icon: Calendar },
  { href: '/tarefas', label: 'Tarefas', icon: ClipboardList },
];

export const accompanimentItems: NavItem[] = [
    { href: '/financeiro', label: 'Financeiro', icon: LineChart },
    { href: '/documentos', label: 'Documentos', icon: FileText },
    { href: '/relatorios', label: 'Relatórios', icon: LineChart },
];

export const registrationItems: NavItem[] = [
    { href: '/clientes', label: 'Clientes', icon: Users },
    { href: '/fornecedores', label: 'Fornecedores', icon: Users },
];
export const automationItems: NavItem[] = [
    { href: '/automacao', label: 'Automação', icon: Settings },
];
export const helpItems: NavItem[] = [
    { href: '/ajuda', label: 'Ajuda', icon: HelpCircle },
];


export function SimpleDashboardNav() {
  const pathname = usePathname();
  return (
    <SidebarMenu>
        <Collapsible className="w-full" defaultOpen>
            <CollapsibleTrigger className="w-full">
                 <SidebarMenuButton className="w-full justify-between">
                    <span className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                        Principal
                    </span>
                    <ChevronDown className="h-4 w-4" />
                 </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1 py-1">
                {navItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                        <Link href={item.href}>
                        <SidebarMenuButton
                            isActive={pathname.startsWith(item.href) && (item.href !== '/' || pathname === '/')}
                            tooltip={{ children: item.label, side: "right", align: "center" }}
                        >
                            <item.icon />
                            <span className="flex-1">{item.label}</span>
                            {item.badge && <Badge className="bg-red-500 text-white">{item.badge}</Badge>}
                        </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                ))}
            </CollapsibleContent>
        </Collapsible>


        <Collapsible className="w-full">
            <CollapsibleTrigger className="w-full">
                 <SidebarMenuButton className="w-full justify-between">
                    <span className="flex items-center gap-2">
                        <LineChart/>
                        Acompanhamento
                    </span>
                    <ChevronDown className="h-4 w-4" />
                 </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-8 space-y-1 py-1">
                 {accompanimentItems.map((item) => (
                    <Link key={item.href} href={item.href} className={cn("text-sm text-muted-foreground hover:text-foreground flex items-center", pathname === item.href && "text-primary font-semibold")}>
                        {item.label}
                    </Link>
                ))}
            </CollapsibleContent>
        </Collapsible>
        <Collapsible className="w-full">
            <CollapsibleTrigger className="w-full">
                 <SidebarMenuButton className="w-full justify-between">
                    <span className="flex items-center gap-2">
                        <Users/>
                        Cadastros
                    </span>
                    <ChevronDown className="h-4 w-4" />
                 </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-8 space-y-1 py-1">
                 {registrationItems.map((item) => (
                    <Link key={item.href} href={item.href} className={cn("text-sm text-muted-foreground hover:text-foreground flex items-center", pathname === item.href && "text-primary font-semibold")}>
                        {item.label}
                    </Link>
                ))}
            </CollapsibleContent>
        </Collapsible>

         {automationItems.map((item) => (
            <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                <SidebarMenuButton
                    isActive={pathname.startsWith(item.href) && (item.href !== '/' || pathname === '/')}
                    tooltip={{ children: item.label, side: "right", align: "center" }}
                >
                    <item.icon />
                    <span className="flex-1">{item.label}</span>
                </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
        ))}
         {helpItems.map((item) => (
            <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                <SidebarMenuButton
                    isActive={pathname.startsWith(item.href) && (item.href !== '/' || pathname === '/')}
                    tooltip={{ children: item.label, side: "right", align: "center" }}
                >
                    <item.icon />
                    <span className="flex-1">{item.label}</span>
                </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
        ))}

    </SidebarMenu>
  );
}
