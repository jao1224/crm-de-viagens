
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { LogOut, User, Settings, Bell, CheckCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { navItems } from './dashboard-nav';
import Link from 'next/link';

export function DashboardHeader() {
  const pathname = usePathname();
  
  let pageTitle = 'Dashboard';
  if (pathname.startsWith('/account')) {
    pageTitle = 'Minha Conta';
  } else {
    const currentPage = navItems.find((item) => pathname.startsWith(item.href) && (item.href !== '/' || pathname === '/'));
    if (currentPage) {
        pageTitle = currentPage.label;
    }
  }


  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <h1 className="font-headline text-xl md:text-2xl text-primary">{pageTitle}</h1>
      </div>
      <div className="ml-auto flex items-center gap-2">
         <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Bell className="h-5 w-5"/>
              <span className="absolute top-2 right-2 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80" align="end">
            <DropdownMenuLabel>Notificações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1"/>
                <div>
                  <p className="font-medium">Nova reserva confirmada!</p>
                  <p className="text-xs text-muted-foreground">Cliente: Fábio Martins - Pacote: Férias em Roma.</p>
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <div className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1"/>
                <div>
                  <p className="font-medium">Pagamento recebido</p>
                  <p className="text-xs text-muted-foreground">Reserva #12345 - R$ 9.000,00</p>
                </div>
              </div>
            </DropdownMenuItem>
             <DropdownMenuItem>
                <div className="flex items-start gap-3">
                <CheckCircle className="text-primary mt-1"/>
                <div>
                  <p className="font-medium">Novo lead de cliente</p>
                  <p className="text-xs text-muted-foreground">Cliente: Mariana Rios - Interessada em pacotes para a Grécia.</p>
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center">
              Ver todas as notificações
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://placehold.co/100x100" alt="Agente" />
                <AvatarFallback>AV</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Agente de Viagens</p>
                <p className="text-xs leading-none text-muted-foreground">agente@estateflow.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/account">
                <User className="mr-2 h-4 w-4" />
                <span>Minha Conta</span>
              </Link>
            </DropdownMenuItem>
             <DropdownMenuItem asChild>
               <Link href="/account">
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações</span>
               </Link>
            </DropdownMenuItem>
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
