
'use client';

import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, MoreHorizontal, Link as LinkIcon, Filter, Eye, Paperclip, Pencil, CheckCircle2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockQuotes } from '@/lib/mock-data';
import type { Quote } from '@/lib/types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const statusConfig: { [key in Quote['status']]: { title: string; color: string; textColor: string } } = {
  aguardando: { title: 'AGUARDANDO', color: 'bg-gray-500', textColor: 'text-white' },
  'em-cotacao': { title: 'EM COTAÇÃO', color: 'bg-orange-500', textColor: 'text-white' },
  'aguardando-cliente': { title: 'AGUARDANDO CLIENTE', color: 'bg-blue-500', textColor: 'text-white' },
  aprovado: { title: 'APROVADO', color: 'bg-green-600', textColor: 'text-white' },
  reprovado: { title: 'REPROVADO', color: 'bg-red-600', textColor: 'text-white' },
};

const QuoteCard = ({ quote }: { quote: Quote }) => {
  return (
    <Card className="mb-4">
      <CardContent className="p-3">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">{quote.id}</span>
            <span className="text-xs text-muted-foreground">{quote.date}</span>
            <Avatar className="h-5 w-5">
              <AvatarImage src={quote.client.avatarUrl} alt={quote.client.name} />
              <AvatarFallback>{quote.client.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <div className={cn("flex items-center font-semibold", quote.status === 'aprovado' ? 'text-green-600' : 'text-foreground')}>
            {quote.status === 'aprovado' && <CheckCircle2 className="h-4 w-4 mr-1" />}
            <span className="text-sm">
                {quote.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </div>
        </div>
        <p className="font-semibold text-sm truncate mb-2" title={quote.client.name}>
          {quote.client.name || 'Cliente não informado'}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground text-sm">#</span>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Eye className="h-4 w-4 cursor-pointer hover:text-primary" />
            <Paperclip className="h-4 w-4 cursor-pointer hover:text-primary" />
            <Pencil className="h-4 w-4 cursor-pointer hover:text-primary" />
            <MoreHorizontal className="h-4 w-4 cursor-pointer hover:text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const QuoteColumn = ({ status, quotes }: { status: Quote['status']; quotes: Quote[] }) => {
  const config = statusConfig[status];
  const totalValue = quotes.reduce((acc, q) => acc + q.value, 0);

  return (
    <div className="flex-1 min-w-[280px]">
      <div className={cn('flex justify-between items-center p-2 rounded-t-md', config.color, config.textColor)}>
        <h2 className="font-bold text-sm">{`${config.title} (${quotes.length})`}</h2>
        <span className="font-bold text-sm">
            {totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </span>
      </div>
      <div className="p-2 bg-muted/50 h-full rounded-b-md">
        {quotes.length > 0 ? (
          quotes.map(quote => <QuoteCard key={quote.id} quote={quote} />)
        ) : (
          <div className="flex justify-center items-center h-24 text-sm text-muted-foreground">
            Nenhuma cotação.
          </div>
        )}
      </div>
    </div>
  );
};


export default function CotacoesPage() {
  const [date, setDate] = React.useState<{ from: Date | undefined; to: Date | undefined }>({
    from: new Date(2025, 5, 24),
    to: new Date(2025, 7, 23),
  });

  const quotesByStatus = mockQuotes.reduce((acc, quote) => {
    if (!acc[quote.status]) {
      acc[quote.status] = [];
    }
    acc[quote.status].push(quote);
    return acc;
  }, {} as Record<Quote['status'], Quote[]>);

  return (
    <div className="flex flex-col h-full gap-4">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">Cotações</h1>
        <div className="flex items-center gap-2">
            <MoreHorizontal className="h-5 w-5 text-muted-foreground cursor-pointer" />
            <Button variant="outline" size="sm">
                <LinkIcon className="mr-2 h-4 w-4" />
                Links
            </Button>
            <Button size="sm">Nova Cotação</Button>
        </div>
      </header>

      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div className="space-y-1">
              <label className="text-sm font-medium">Cliente</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Tag/Identificador</label>
              <Input placeholder="Tag ou Identificador" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Período da Cotação</label>
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={'outline'} className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date.from ? format(date.from, 'dd/MM/yyyy') : <span>Início</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date.from}
                      onSelect={(day) => setDate(prev => ({...prev, from: day}))}
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
                <span className="text-muted-foreground">até</span>
                 <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={'outline'} className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date.to ? format(date.to, 'dd/MM/yyyy') : <span>Fim</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date.to}
                      onSelect={(day) => setDate(prev => ({...prev, to: day}))}
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Usuário</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                </Button>
                <Button className="flex-1">Pesquisar</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex-1 flex gap-4 overflow-x-auto pb-4">
        {Object.keys(statusConfig).map(statusKey => (
            <QuoteColumn 
                key={statusKey} 
                status={statusKey as Quote['status']} 
                quotes={quotesByStatus[statusKey as Quote['status']] || []} 
            />
        ))}
      </div>
    </div>
  );
}

    