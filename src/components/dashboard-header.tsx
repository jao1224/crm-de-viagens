
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ChevronDown, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const headerNavLinks = [
    { href: '#', label: 'Home'},
    { href: '#', label: 'Sistema'},
    { href: '#', label: 'Funcionalidades'},
    { href: '#', label: 'Planos'},
    { href: '#', label: 'Suporte'},
    { href: '#', label: 'Contato'},
    { href: '#', label: 'Iddas Milhas', icon: ExternalLink},
]

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-primary px-4 md:px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden text-primary-foreground" />
        <h1 className="font-bold text-xl text-primary-foreground">NoMeioDoMundo</h1>
      </div>
      
      {/* Navegação Principal do Header (visível em telas maiores) */}
      <nav className="hidden md:flex flex-1 items-center justify-center">
          <ul className="flex items-center gap-6 text-sm">
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

      <div className="ml-auto flex items-center gap-2">
         <div className="flex items-center gap-2">
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://i.pinimg.com/736x/a2/3c/9f/a23c9f18b0d355639f041530c345129c.jpg" alt="Maxshuell" />
              <AvatarFallback>M</AvatarFallback>
            </Avatar>
            <div className="hidden sm:flex flex-col items-start">
              <span className="text-sm font-medium text-primary-foreground">Maxshuell</span>
            </div>
            <ChevronDown className="h-4 w-4 text-primary-foreground/80" />
         </div>
      </div>
    </header>
  );
}
