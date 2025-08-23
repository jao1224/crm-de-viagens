

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
  Building2,
  Link2,
  Landmark,
  CreditCard,
  Banknote,
  User,
  Trash2,
  ShoppingCart,
  Receipt,
  MessageSquare,
  Volume2,
  PenSquare,
  XCircle,
  Tag,
  Image as ImageIcon,
} from 'lucide-react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import type { NavItem } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';


export const navItems: NavItem[] = [
  { href: '/', label: 'Dashboard', icon: Gauge },
  { href: '/cotações', label: 'Cotações', icon: FileText }, 
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

export const documentItems: NavItem[] = [
    { href: '/faturas', label: 'Faturas', icon: FileText },
    { href: '/pagamentos', label: 'Pagamentos', icon: FileText },
    { href: '/contratos', label: 'Contratos', icon: FileText },
    { href: '/nota-fiscal', label: 'Nota Fiscal', icon: FileText },
];

export const registrationItems: NavItem[] = [
    { href: '/agencia', label: 'Agência', icon: Building2 },
    { href: '/link-cotacao', label: 'Link Cotação', icon: Link2 },
    { href: '/link-pessoa', label: 'Link Pessoa', icon: Link2 },
    { href: '/conta-bancaria', label: 'Conta Bancária', icon: Landmark },
    { href: '/cartao', label: 'Cartão', icon: CreditCard },
    { href: '/forma-pagamento', label: 'Forma de Pagamento', icon: Banknote },
    { href: '/pessoa', label: 'Pessoa', icon: User },
    { href: '/programa', label: 'Programa', icon: Trash2 },
    { href: '/produto-servico', label: 'Produto/Serviço', icon: ShoppingCart },
    { href: '/receita-despesa-cadastro', label: 'Receita/Despesa', icon: Receipt },
    { href: '/mensagem', label: 'Mensagem', icon: MessageSquare },
    { href: '/canal-venda', label: 'Canal de Venda', icon: Volume2 },
    { href: '/contrato', label: 'Contrato', icon: PenSquare },
    { href: '/motivo-reprovacao', label: 'Motivo Reprovação', icon: XCircle },
    { href: '/etiqueta', label: 'Etiqueta', icon: Tag },
    { href: '/imagens', label: 'Imagens', icon: ImageIcon },
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
            <CollapsibleTrigger className={cn(buttonVariants({variant: 'ghost'}), "w-full justify-between h-10 px-2")}>
                <span className="text-sm font-semibold text-muted-foreground">
                    Principal
                </span>
                <ChevronDown className="h-4 w-4" />
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
            <CollapsibleTrigger className={cn(buttonVariants({variant: 'ghost'}), "w-full justify-between h-10 px-2")}>
                <span className="text-sm font-medium text-muted-foreground">
                    Acompanhamento
                </span>
                <ChevronDown className="h-4 w-4" />
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
            <CollapsibleTrigger className={cn(buttonVariants({variant: 'ghost'}), "w-full justify-between h-10 px-2")}>
                 <span className="text-sm font-medium text-muted-foreground">
                    Financeiro
                </span>
                <ChevronDown className="h-4 w-4" />
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
            <CollapsibleTrigger className={cn(buttonVariants({variant: 'ghost'}), "w-full justify-between h-10 px-2")}>
                <span className="text-sm font-medium text-muted-foreground">
                    Documentos
                </span>
                <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1 py-1">
                {documentItems.map((item) => (
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
            <CollapsibleTrigger className={cn(buttonVariants({variant: 'ghost'}), "w-full justify-between h-10 px-2")}>
                <span className="text-sm font-medium text-muted-foreground">
                    Cadastros
                </span>
                <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1 py-1">
                 {registrationItems.map((item) => (
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
