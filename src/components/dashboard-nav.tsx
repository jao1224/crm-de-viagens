
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Calendar,
  ClipboardList,
  ChevronDown,
  FileText,
  Users,
  Settings,
  HelpCircle,
  Gauge,
  Plane,
  Hotel,
  TrainFront,
  Camera,
  Luggage,
  HeartPulse,
  Wallet,
  WalletCards,
  Plus,
  Minus,
  ArrowRightLeft,
  CheckCheck,
  BadgePercent,
  LineChart,
  Gem,
} from 'lucide-react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import type { NavItem } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';


export const navItems: NavItem[] = [
  { href: '/', label: 'Dashboard', icon: Gauge },
  { href: '/cotações', label: 'Cotações', icon: FileText, badge: 1 }, 
  { href: '/agenda', label: 'Calendário', icon: Calendar },
  { href: '/tarefas', label: 'Tarefas', icon: ClipboardList },
];

export const accompanimentItems: NavItem[] = [
    { href: '/voos', label: 'Voos', icon: Plane },
    { href: '/hospedagens', label: 'Hospedagens', icon: Hotel },
    { href: '/transportes', label: 'Transportes', icon: TrainFront },
    { href: '/experiencias', label: 'Experiências Turísticas', icon: Camera },
    { href: '/cruzeiros', label: 'Cruzeiros', icon: Luggage },
    { href: '/seguros', label: 'Seguros', icon: HeartPulse },
];

export const financialItems: NavItem[] = [
    { href: '/vendas', label: 'Vendas', icon: Wallet },
    { href: '/fluxo-caixa', label: 'Fluxo de Caixa', icon: WalletCards },
    { href: '/receitas', label: 'Receitas', icon: Plus },
    { href: '/despesas', label: 'Despesas', icon: Minus },
    { href: '/transferencia', label: 'Transferência', icon: ArrowRightLeft },
    { href: '/conciliacao', label: 'Conciliação', icon: CheckCheck },
    { href: '/resumo-mensal', label: 'Resumo Mensal', icon: BadgePercent },
    { href: '/receita-despesa', label: 'Receita/Despesa', icon: LineChart },
    { href: '/milhas', label: 'Milhas', icon: Gem },
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
                    <span className="text-sm font-semibold text-muted-foreground">
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


        <Collapsible className="w-full" defaultOpen>
            <CollapsibleTrigger className="w-full">
                 <SidebarMenuButton className="w-full justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                        Acompanhamento
                    </span>
                    <ChevronDown className="h-4 w-4" />
                 </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1 py-1">
                {accompanimentItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                        <Link href={item.href}>
                        <SidebarMenuButton
                            isActive={pathname.startsWith(item.href)}
                            tooltip={{ children: item.label, side: "right", align: "center" }}
                        >
                            <item.icon />
                            <span className="flex-1">{item.label}</span>
                        </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                ))}
            </CollapsibleContent>
        </Collapsible>

        <Collapsible className="w-full" defaultOpen>
            <CollapsibleTrigger className="w-full">
                 <SidebarMenuButton className="w-full justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                        Financeiro
                    </span>
                    <ChevronDown className="h-4 w-4" />
                 </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1 py-1">
                {financialItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                        <Link href={item.href}>
                        <SidebarMenuButton
                            isActive={pathname.startsWith(item.href)}
                            tooltip={{ children: item.label, side: "right", align: "center" }}
                        >
                            <item.icon />
                            <span className="flex-1">{item.label}</span>
                        </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                ))}
            </CollapsibleContent>
        </Collapsible>

        <Collapsible className="w-full" defaultOpen>
            <CollapsibleTrigger className="w-full">
                 <SidebarMenuButton className="w-full justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                        Cadastros
                    </span>
                    <ChevronDown className="h-4 w-4" />
                 </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-8 space-y-1 py-1">
                 {registrationItems.map((item) => (
                    <Link key={item.href} href={item.href} className={cn("block text-sm text-muted-foreground hover:text-foreground", pathname === item.href && "text-primary font-semibold")}>
                        {item.label}
                    </Link>
                ))}
            </CollapsibleContent>
        </Collapsible>

         {automationItems.map((item) => (
            <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                <SidebarMenuButton
                    isActive={pathname.startsWith(item.href)}
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
                    isActive={pathname.startsWith(item.href)}
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
