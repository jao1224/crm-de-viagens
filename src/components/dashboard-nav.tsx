
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
  Mail,
  RefreshCw,
  PlayCircle,
  LifeBuoy,
  BookText,
  ExternalLink,
  Bell,
  Award,
  Handshake,
  Star,
  Map,
  Goal,
} from 'lucide-react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import type { NavItem } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { currentUser } from '@/lib/mock-data';


const navItems: NavItem[] = [
  { href: '/', label: 'Dashboard', icon: Gauge },
  { href: '/cotacoes', label: 'Cotações', icon: FileText }, 
  { href: '/agenda', label: 'Calendário', icon: Calendar },
  { href: '/tarefas', label: 'Tarefas', icon: ClipboardList, badge: 1 },
];

const accompanimentItems: NavItem[] = [
    { href: '/voos', label: 'Voos', icon: Plane },
    { href: '/hospedagens', label: 'Hospedagens', icon: Hotel },
    { href: '/transportes', label: 'Transportes', icon: TrainFront },
    { href: '/experiencias', label: 'Experiências Turísticas', icon: Camera },
    { href: '/cruzeiros', label: 'Cruzeiros', icon: Luggage },
    { href: '/seguros', label: 'Seguros', icon: HeartPulse },
];

const reportItems: NavItem[] = [
    { href: '/relatorios/solicitacoes', label: 'Solicitações', icon: Handshake },
    { href: '/relatorios/pessoas-via-link', label: 'Pessoas via Link', icon: Users },
    { href: '/relatorios/avaliacoes', label: 'Avaliações', icon: Star },
    { href: '/relatorios/reprovacoes', label: 'Reprovações', icon: XCircle },
    { href: '/relatorios/origens-destinos', label: 'Origens/Destinos', icon: Map },
    { href: '/relatorios/comunicacao-email', label: 'Comunicação E-mail', icon: Mail },
    { href: '/relatorios/comunicacao-whatsapp', label: 'Comun. Whatsapp', icon: MessageSquare },
    { href: '/relatorios/metas', label: 'Metas', icon: Goal },
];


const financialItems: NavItem[] = [
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

const documentItems: NavItem[] = [
    { href: '/faturas', label: 'Faturas', icon: FileText },
    { href: '/pagamentos', label: 'Pagamentos', icon: FileText },
    { href: '/contratos', label: 'Contratos', icon: FileText },
    { href: '/nota-fiscal', label: 'Nota Fiscal', icon: FileText },
];

const registrationItems: NavItem[] = [
    { href: '/agencia', label: 'Agência', icon: Building2 },
    { href: '/link-cotacao', label: 'Link Cotação', icon: Link2 },
    { href: '/link-pessoa', label: 'Link Pessoa', icon: Link2 },
    { href: '/conta-bancaria', label: 'Conta Bancária', icon: Landmark },
    { href: '/cartao', label: 'Cartão', icon: CreditCard },
    { href: '/forma-pagamento', 'label': 'Forma de Pagamento', icon: Banknote },
    { href: '/pessoa', label: 'Pessoa', icon: User },
    { href: '/programa', label: 'Programa', icon: Award },
    { href: '/produto-servico', label: 'Produto/Serviço', icon: ShoppingCart },
    { href: '/receita-despesa-cadastro', label: 'Receita/Despesa', icon: Receipt },
    { href: '/mensagem', label: 'Mensagem', icon: MessageSquare },
    { href: '/canal-venda', label: 'Canal de Venda', icon: Volume2 },
    { href: '/contrato', label: 'Contrato', icon: PenSquare },
    { href: '/motivo-reprovacao', label: 'Motivo Reprovação', icon: XCircle },
    { href: '/etiqueta', label: 'Etiqueta', icon: Tag },
    { href: '/imagens', label: 'Imagens', icon: ImageIcon },
];

const automationItems: NavItem[] = [
    { href: '/automacao/email', label: 'Comunicação E-mail', icon: Mail },
    { href: '/automacao/whatsapp', label: 'Comun. Whatsapp', icon: MessageSquare },
    { href: '/automacao/tarefas', label: 'Tarefas', icon: RefreshCw },
];

const helpItems: NavItem[] = [
    { href: '/ajuda/tutoriais', label: 'Tutoriais', icon: PlayCircle },
    { href: '/ajuda/central', label: 'Central de Ajuda', icon: HelpCircle, external: true },
    { href: '/ajuda/ticket', label: 'Ticket', icon: LifeBuoy },
    { href: '/ajuda/whatsapp', label: 'Whatsapp', icon: MessageSquare, external: true },
    { href: '/ajuda/integracao', label: 'Integração', icon: BookText, external: true },
];

const navGroups = [
    { title: 'Principal', items: navItems, adminOnly: false },
    { title: 'Acompanhamento', items: accompanimentItems, adminOnly: false },
    { title: 'Relatórios', items: reportItems, adminOnly: true },
    { title: 'Financeiro', items: financialItems, adminOnly: true },
    { title: 'Documentos', items: documentItems, adminOnly: true },
    { title: 'Cadastros', items: registrationItems, adminOnly: true },
    { title: 'Automação', items: automationItems, adminOnly: true },
    { title: 'Ajuda', items: helpItems, adminOnly: false },
];

export function SimpleDashboardNav() {
  const pathname = usePathname();
  const isAdmin = currentUser.permission === 'Admin';
  
  const isActive = (href: string) => {
    // Handle the dashboard link specifically
    if (href === '/') {
        return pathname === '/';
    }
    // For other links, check if the pathname starts with the href.
    // This handles nested routes correctly (e.g., /link-pessoa/novo should activate /link-pessoa).
    return pathname.startsWith(href);
  }

  const isGroupActive = (items: NavItem[]) => {
      return items.some(item => isActive(item.href));
  }

  return (
    <SidebarMenu>
        {navGroups.map((group) => {
            if (group.adminOnly && !isAdmin) {
                return null;
            }
            return (
                <Collapsible className="w-full" key={group.title} defaultOpen>
                    <CollapsibleTrigger className={cn(buttonVariants({variant: 'ghost'}), "w-full justify-between h-10 px-2 hover:bg-sidebar-accent", isGroupActive(group.items) && "bg-sidebar-accent")}>
                        <span className={cn("text-sm font-semibold text-sidebar-foreground/70 group-hover:text-sidebar-foreground", isGroupActive(group.items) && "text-sidebar-accent-foreground")}>
                            {group.title}
                        </span>
                        <ChevronDown className="h-4 w-4 text-sidebar-foreground/70" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-1 py-1">
                        {group.items.map((item) => (
                            <SidebarMenuItem key={item.href}>
                                <Link href={item.href} target={item.external ? '_blank' : undefined} rel={item.external ? 'noopener noreferrer' : undefined}>
                                    <SidebarMenuButton
                                        isActive={isActive(item.href)}
                                        tooltip={{ children: item.label, side: "right", align: "center" }}
                                        className={cn(isActive(item.href) && 'text-sidebar-primary font-semibold')}
                                    >
                                        <item.icon className={cn(isActive(item.href) ? 'text-sidebar-primary' : 'text-sidebar-foreground')}/>
                                        <span className={cn(isActive(item.href) && 'text-sidebar-primary')}>{item.label}</span>
                                        {item.badge && <Badge className="bg-yellow-400 text-primary font-bold text-xs size-5 flex items-center justify-center p-0 ml-auto">{item.badge}</Badge>}
                                        {item.external && <ExternalLink className="h-3 w-3 text-muted-foreground" />}
                                    </SidebarMenuButton>
                                </Link>
                            </SidebarMenuItem>
                        ))}
                    </CollapsibleContent>
                </Collapsible>
            )
        })}
    </SidebarMenu>
  );
}
