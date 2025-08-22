
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
import { LogOut, User, Settings, Bell } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { navItems } from './dashboard-nav';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useNotifications } from '@/context/notification-context';

export function DashboardHeader() {
  const pathname = usePathname();
  const { toast } = useToast();
  const { notifications, showNotificationDot, setShowNotificationDot } = useNotifications();
  
  let pageTitle = 'Dashboard';
  const currentPage = navItems.find((item) => pathname.startsWith(item.href) && (item.href !== '/' || pathname === '/'));

  if (pathname.startsWith('/account')) {
    pageTitle = 'Minha Conta';
  } else if (currentPage) {
    pageTitle = currentPage.label;
  }
  
  const handleNotificationOpenChange = (open: boolean) => {
    if (open && showNotificationDot) {
      setShowNotificationDot(false);
    }
  }


  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <h1 className="font-headline text-xl md:text-2xl text-primary">{pageTitle}</h1>
      </div>
      <div className="ml-auto flex items-center gap-2">
         <DropdownMenu onOpenChange={handleNotificationOpenChange}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Bell className="h-5 w-5"/>
              {showNotificationDot && (
                <span className="absolute top-2 right-2 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80" align="end">
            <DropdownMenuLabel>Notificações Recentes</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.length === 0 ? (
                <DropdownMenuItem disabled>
                    <p className="text-sm text-muted-foreground p-4 text-center w-full">Nenhuma notificação nova.</p>
                </DropdownMenuItem>
            ) : (
                notifications.slice(0, 5).map((notif) => (
                    <DropdownMenuItem key={notif.id}>
                        <div className="flex items-start gap-3">
                            <notif.icon className="text-primary mt-1"/>
                            <div>
                            <p className="font-medium">{notif.title}</p>
                            <p className="text-xs text-muted-foreground">{notif.description}</p>
                            </div>
                        </div>
                    </DropdownMenuItem>
                ))
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center" asChild>
              <Link href="/notifications">Ver todas as notificações</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://i.pinimg.com/736x/c6/33/91/c633913aa268fe47d9dede01ca38eba7.jpg" alt="Ana Costa" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Ana Costa</p>
                <p className="text-xs leading-none text-muted-foreground">ana.costa@travelflow.com</p>
                <p className="text-xs leading-none text-muted-foreground pt-1">Administradora</p>
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
               <Link href="/admin">
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
