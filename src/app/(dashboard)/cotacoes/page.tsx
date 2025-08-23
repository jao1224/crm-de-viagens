
'use client';

import React, { useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, MoreHorizontal, Link as LinkIcon, Filter, Eye, Paperclip, Pencil, CheckCircle2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { mockQuotes } from '@/lib/mock-data';
import type { Quote } from '@/lib/types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const statusConfig: { [key in Quote['status']]: { title: string; borderColor: string; bgColor: string; textColor: string; } } = {
  aguardando: { title: 'AGUARDANDO', borderColor: 'border-gray-500', bgColor: 'bg-gray-500/10', textColor: 'text-gray-600' },
  'em-cotacao': { title: 'EM COTAÇÃO', borderColor: 'border-orange-500', bgColor: 'bg-orange-500/10', textColor: 'text-orange-600' },
  'aguardando-cliente': { title: 'AGUARDANDO CLIENTE', borderColor: 'border-blue-500', bgColor: 'bg-blue-500/10', textColor: 'text-blue-600' },
  aprovado: { title: 'APROVADO', borderColor: 'border-green-600', bgColor: 'bg-green-600/10', textColor: 'text-green-700' },
  reprovado: { title: 'REPROVADO', borderColor: 'border-red-600', bgColor: 'bg-red-600/10', textColor: 'text-red-700' },
};

const QuoteCard = ({ quote, onDragStart }: { quote: Quote, onDragStart: (e: React.DragEvent<HTMLDivElement>, quoteId: string) => void }) => {
  const config = statusConfig[quote.status];
  return (
    <Card 
      className="mb-4 cursor-grab active:cursor-grabbing transition-shadow duration-200 hover:shadow-lg"
      draggable="true"
      onDragStart={(e) => onDragStart(e, quote.id)}
    >
      <CardContent className="p-3">
        <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                    <AvatarImage src={quote.client.avatarUrl} alt={quote.client.name} />
                    <AvatarFallback>{quote.client.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <p className="font-bold text-sm text-foreground truncate" title={quote.client.name}>
                    {quote.client.name || 'Cliente não informado'}
                    </p>
                    <span className="text-xs text-muted-foreground font-mono">ID: {quote.id}</span>
                </div>
            </div>
          
            <div className="flex items-center font-bold text-sm">
                {quote.value > 0 && (
                    <span className={cn(quote.status === 'aprovado' ? 'text-green-600' : 'text-foreground')}>
                        {quote.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                )}
            </div>
        </div>
        
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>{quote.date}</span>
          <div className="flex items-center gap-2.5 text-muted-foreground">
            <Eye className="h-4 w-4 cursor-pointer transition-colors hover:text-primary" />
            <Paperclip className="h-4 w-4 cursor-pointer transition-colors hover:text-primary" />
            <Pencil className="h-4 w-4 cursor-pointer transition-colors hover:text-primary" />
            <MoreHorizontal className="h-4 w-4 cursor-pointer transition-colors hover:text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const QuoteColumn = ({ 
  status, 
  quotes, 
  onDrop,
  onDragOver,
  onDragStart,
}: { 
  status: Quote['status']; 
  quotes: Quote[];
  onDrop: (e: React.DragEvent<HTMLDivElement>, newStatus: Quote['status']) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, quoteId: string) => void;
}) => {
  const config = statusConfig[status];
  const totalValue = quotes.reduce((acc, q) => acc + q.value, 0);

  return (
    <div 
      className={cn("flex-1 min-w-[300px] rounded-lg", config.bgColor)}
      onDrop={(e) => onDrop(e, status)}
      onDragOver={onDragOver}
    >
      <div className={cn('flex justify-between items-center p-3 rounded-t-lg border-t-4', config.borderColor)}>
        <h2 className={cn("font-bold text-sm", config.textColor)}>{`${config.title} (${quotes.length})`}</h2>
        <span className={cn("font-semibold text-sm", config.textColor)}>
            {totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </span>
      </div>
      <div className="p-2 h-full">
        {quotes.length > 0 ? (
          quotes.map(quote => <QuoteCard key={quote.id} quote={quote} onDragStart={onDragStart} />)
        ) : (
          <div className="flex justify-center items-center h-24 text-sm text-muted-foreground/70">
            Arraste os cards para cá
          </div>
        )}
      </div>
    </div>
  );
};


export default function CotacoesPage() {
  const [date, setDate] = React.useState<{ from: Date | undefined; to: Date | undefined } | undefined>();
  
  useEffect(() => {
    setDate({
      from: new Date(2025, 5, 24),
      to: new Date(2025, 7, 23),
    });
  }, []);

  const [quotes, setQuotes] = React.useState<Quote[]>(mockQuotes);

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, quoteId: string) => {
    e.dataTransfer.setData("quoteId", quoteId);
  };
  
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); 
  };
  
  const onDrop = (e: React.DragEvent<HTMLDivElement>, newStatus: Quote['status']) => {
    e.preventDefault();
    const quoteId = e.dataTransfer.getData("quoteId");
    
    setQuotes(prevQuotes => 
      prevQuotes.map(quote => 
        quote.id === quoteId ? { ...quote, status: newStatus } : quote
      )
    );
  };

  const quotesByStatus = React.useMemo(() => {
      return quotes.reduce((acc, quote) => {
        if (!acc[quote.status]) {
          acc[quote.status] = [];
        }
        acc[quote.status].push(quote);
        return acc;
      }, {} as Record<Quote['status'], Quote[]>);
  }, [quotes]);

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
        <CardContent className="p-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Cliente</label>
              <Select>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Tag/Identificador</label>
              <Input placeholder="Tag ou Identificador" className="h-9" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Período</label>
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={'outline'} className="w-full justify-start text-left font-normal h-9">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date?.from ? format(date.from, 'dd/MM/yy') : <span>Início</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date?.from}
                      onSelect={(day) => setDate(prev => prev ? {...prev, from: day} : {from: day, to: undefined})}
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
                 <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={'outline'} className="w-full justify-start text-left font-normal h-9">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date?.to ? format(date.to, 'dd/MM/yy') : <span>Fim</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date?.to}
                      onSelect={(day) => setDate(prev => prev ? {...prev, to: day} : {from: undefined, to: day})}
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Usuário</label>
              <Select>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" size="icon" className="h-9">
                    <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="flex-1 h-9">Pesquisar</Button>
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
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragStart={onDragStart}
            />
        ))}
      </div>
    </div>
  );
}
