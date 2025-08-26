
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ChevronDown, ExternalLink, User, Settings, Bell, Users, Goal, Webhook, LifeBuoy, Ticket, LogOut, PlusCircle, Building, CheckCircle, AlertCircle, Plane } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from '@/components/ui/badge';
import { currentUser } from '@/lib/mock-data';

const headerNavLinks = [
    { href: '#', label: 'Home'},
    { href: '#', label: 'Sistema'},
    { href: '#', label: 'Funcionalidades'},
    { href: '#', label: 'Planos'},
    { href: '#', label: 'Suporte'},
    { href: '#', label: 'Contato'},
]

const notifications = [
    { icon: CheckCircle, text: "Pagamento de R$1.854,00 recebido de Julio Venancio.", time: "agora", color: "text-green-500" },
    { icon: AlertCircle, text: "Tarefa 'Volta combinada' está atrasada há 2 dias.", time: "2d atrás", color: "text-red-500" },
    { icon: Plane, text: "Lembrete: Voo 7XIE9 para Lisboa (LIS) em 3 horas.", time: "às 17:15", color: "text-blue-500" },
];


export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-gradient-to-r from-primary to-[#9B59B6] px-4 md:px-6 text-primary-foreground">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden text-primary-foreground" />
        <h1 className="font-headline text-2xl font-bold">
            NoMeioDo<span className="text-yellow-400">Mundo</span>
        </h1>
      </div>
      
      {/* Navegação Principal do Header (visível em telas maiores) */}
      <nav className="hidden md:flex flex-1 items-center justify-center">
          <ul className="flex items-center gap-6 text-sm font-medium">
            {headerNavLinks.map(link => (
                <li key={link.label}>
                    <Link href={link.href} className="flex items-center gap-1.5 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                        {link.label}
                        {link.icon && <link.icon className="h-4 w-4"/>}
                    </Link>
                </li>
            ))}
          </ul>
      </nav>

      <div className="ml-auto flex items-center gap-4">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                 <Button variant="ghost" size="icon" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10 relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-yellow-400 ring-2 ring-primary" />
                    <span className="sr-only">Notificações</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end">
                <DropdownMenuLabel>Notificações</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {notifications.map((item, index) => (
                        <DropdownMenuItem key={index} className="flex items-start gap-3">
                           <item.icon className={`h-4 w-4 mt-1 ${item.color}`} />
                           <div className="flex flex-col">
                                <p className="text-xs text-wrap font-medium">{item.text}</p>
                                <span className="text-xs text-muted-foreground">{item.time}</span>
                           </div>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                 <DropdownMenuSeparator />
                 <DropdownMenuItem asChild className="justify-center text-sm text-primary hover:!text-primary font-semibold">
                    <Link href="/notificacoes">
                        Ver todas as notificações
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
             <div className="flex items-center gap-2 cursor-pointer">
                <Avatar className="h-9 w-9 border-2 border-white/50">
                  <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                  <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="hidden sm:flex flex-col items-start">
                  <span className="text-sm font-semibold text-primary-foreground">{currentUser.name}</span>
                </div>
                <ChevronDown className="h-4 w-4 text-primary-foreground/80" />
             </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-2 items-center py-2">
                    <Image src="/logo.png" alt="Logo" width={60} height={60} className="rounded-md" data-ai-hint="logo travel agency"/>
                    <p className="text-sm font-medium leading-none text-foreground">No Meio do Mundo Viagens</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link href="/perfil">
                        <User className="mr-2 h-4 w-4" />
                        <span>Perfil</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Building className="mr-2 h-4 w-4" />
                    <span>Agência</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/notificacoes">
                        <Bell className="mr-2 h-4 w-4" />
                        <span>Notificações</span>
                    </Link>
                </DropdownMenuItem>
                 <DropdownMenuItem asChild>
                    <Link href="/usuarios">
                        <Users className="mr-2 h-4 w-4" />
                        <span>Usuários</span>
                    </Link>
                </DropdownMenuItem>
                 <DropdownMenuItem>
                    <Goal className="mr-2 h-4 w-4" />
                    <span>Metas</span>
                </DropdownMenuItem>
                 <DropdownMenuItem>
                    <Webhook className="mr-2 h-4 w-4" />
                    <span>Webhook</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
               <DropdownMenuGroup>
                <DropdownMenuItem>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    <span>Serviços Adicionais</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Ticket className="mr-2 h-4 w-4" />
                    <span>Tickets</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
