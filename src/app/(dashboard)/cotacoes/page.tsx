
'use client';

import React, { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, MoreHorizontal, Link as LinkIcon, Filter, Eye, Paperclip, Pencil, CheckCircle2, Copy, ExternalLink, X, Plus } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { mockQuotes } from '@/lib/mock-data';
import type { Quote } from '@/lib/types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import Link from 'next/link';

// Configuração para estilização de cada status do Kanban.
const statusConfig: { [key in Quote['status']]: { title: string; borderColor: string; bgColor: string; textColor: string; } } = {
  aguardando: { title: 'AGUARDANDO', borderColor: 'border-gray-500', bgColor: 'bg-gray-100 dark:bg-gray-800/50', textColor: 'text-gray-600 dark:text-gray-400' },
  'em-cotacao': { title: 'EM COTAÇÃO', borderColor: 'border-orange-500', bgColor: 'bg-orange-100 dark:bg-orange-800/50', textColor: 'text-orange-600 dark:text-orange-400' },
  'aguardando-cliente': { title: 'AGUARDANDO CLIENTE', borderColor: 'border-blue-500', bgColor: 'bg-blue-100 dark:bg-blue-800/50', textColor: 'text-blue-600 dark:text-blue-400' },
  aprovado: { title: 'APROVADO', borderColor: 'border-green-600', bgColor: 'bg-green-100 dark:bg-green-800/50', textColor: 'text-green-700 dark:text-green-500' },
  reprovado: { title: 'REPROVADO', borderColor: 'border-red-600', bgColor: 'bg-red-100 dark:bg-red-800/50', textColor: 'text-red-700 dark:text-red-500' },
};

/**
 * Componente QuoteCard: Representa um único card arrastável no quadro Kanban.
 * @param {object} props - Propriedades do componente.
 * @param {Quote} props.quote - Os dados da cotação a serem exibidos.
 * @param {Function} props.onDragStart - A função a ser chamada quando o arrasto do card começa.
 */
const QuoteCard = ({ quote, onDragStart }: { quote: Quote, onDragStart: (e: React.DragEvent<HTMLDivElement>, quoteId: string) => void }) => {
  const config = statusConfig[quote.status];
  return (
    <Card 
      className="mb-3 cursor-grab active:cursor-grabbing transition-shadow duration-200 hover:shadow-lg bg-card"
      // PASSO 1: Tornar o elemento arrastável.
      draggable="true"
      // PASSO 2: Definir a função que será executada quando o arrasto iniciar.
      // Passamos o evento (e) e o ID da cotação para a função pai.
      onDragStart={(e) => onDragStart(e, quote.id)}
    >
      <CardContent className="p-3">
        <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={quote.client.avatarUrl} alt={quote.client.name} />
                    <AvatarFallback>{quote.client.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <p className="font-bold text-sm text-foreground" title={quote.client.name}>
                    {quote.client.name || 'Cliente não informado'}
                    </p>
                    <span className="text-xs text-muted-foreground font-mono">ID: {quote.id}</span>
                </div>
            </div>
          
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                {quote.status === 'aprovado' && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                <Eye className="h-4 w-4 cursor-pointer transition-colors hover:text-primary" />
                <Paperclip className="h-4 w-4 cursor-pointer transition-colors hover:text-primary" />
                <Link href={`/cotacoes/novo?id=${quote.id}`}>
                    <Pencil className="h-4 w-4 cursor-pointer transition-colors hover:text-primary" />
                </Link>
            </div>
        </div>
        
        <div className="flex justify-between items-center text-xs text-muted-foreground mt-3">
          <span className="font-medium">{quote.date}</span>
          {quote.value > 0 && (
              <span className={cn('font-semibold text-sm', quote.status === 'aprovado' ? 'text-green-600' : 'text-foreground')}>
                  {quote.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

/**
 * Componente QuoteColumn: Representa uma coluna do quadro Kanban.
 * @param {object} props - Propriedades do componente.
 * @param {Quote['status']} props.status - O status que esta coluna representa (ex: 'aguardando').
 * @param {Quote[]} props.quotes - O array de cotações que pertencem a esta coluna.
 * @param {Function} props.onDrop - A função a ser chamada quando um card é solto nesta coluna.
 * @param {Function} props.onDragOver - A função a ser chamada quando um card é arrastado sobre esta coluna.
 * @param {Function} props.onDragStart - A função passada para os componentes QuoteCard.
 */
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
      className={cn("flex-1 min-w-[250px] rounded-lg", config.bgColor)}
      // PASSO 4: Definir a função a ser chamada quando um card é solto aqui.
      // Passamos o evento (e) e o status desta coluna para a função pai.
      onDrop={(e) => onDrop(e, status)}
      // PASSO 5: Definir a função para quando um card é arrastado sobre esta área.
      // É crucial para permitir que o onDrop funcione.
      onDragOver={onDragOver}
    >
      <div className={cn('flex justify-between items-center p-3 rounded-t-lg border-t-4', config.borderColor)}>
        <h2 className={cn("font-bold text-sm uppercase tracking-wider", config.textColor)}>{`${config.title} (${quotes.length})`}</h2>
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

const LinkDialog = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => {
    const quoteLink = typeof window !== 'undefined' ? `${window.location.origin}/solicitacao-orcamento` : '';

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-foreground">Link para Solicitação de Cotação</DialogTitle>
                     <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Fechar</span>
                    </DialogClose>
                </DialogHeader>
                <div className="space-y-6 pt-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">Link principal da Agência</h3>
                        <p className="text-blue-600 dark:text-blue-400 mt-1 mb-4">{quoteLink}</p>
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={() => navigator.clipboard.writeText(quoteLink)}>
                                <Copy className="mr-2 h-4 w-4" />
                                Copiar link
                            </Button>
                            <a href={quoteLink} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline">
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    Abrir em nova aba
                                </Button>
                            </a>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-semibold text-foreground">Crie novos links vinculados a afiliados e/ou canais de vendas.</h4>
                            <Button className="mt-2">Criar novos Links</Button>
                        </div>
                         <div>
                            <h4 className="font-semibold text-foreground">Personalize o formulário de solicitação e adicione novas informações.</h4>
                            <Button className="mt-2">Personalizar o Formulário</Button>
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Os links são fixos, utilize-os em suas redes sociais, em campanhas de marketing, enviando diretamente ao cliente e também enviando pelo seu site através de POST ou iFrame. Se desejar, utilize um encurtador de URL para obter dados estatísticos.
                    </p>
                </div>
                 <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Fechar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};


export default function CotacoesPage() {
  const [date, setDate] = React.useState<{ from: Date | undefined; to: Date | undefined } | undefined>();
  const [isClient, setIsClient] = React.useState(false);
  const [isLinkDialogOpen, setIsLinkDialogOpen] = React.useState(false);
  
  useEffect(() => {
    setDate({
      from: new Date(2025, 5, 24),
      to: new Date(2025, 7, 23),
    });
    setIsClient(true);
  }, []);

  // O estado central que controla todos os cards
  const [quotes, setQuotes] = React.useState<Quote[]>(mockQuotes);

  /**
   * Função onDragStart: Chamada quando um card começa a ser arrastado.
   * Armazena o ID do card no objeto `dataTransfer` para que possamos recuperá-lo no drop.
   * @param {React.DragEvent<HTMLDivElement>} e - O evento de arrasto.
   * @param {string} quoteId - O ID do card que está sendo arrastado.
   */
  const onDragStart = (e: React.DragEvent<HTMLDivElement>, quoteId: string) => {
    // PASSO 3: Guardar o ID do card. O primeiro argumento é uma chave, o segundo é o valor.
    e.dataTransfer.setData("quoteId", quoteId);
  };
  
  /**
   * Função onDragOver: Chamada quando um card é arrastado sobre uma coluna.
   * Chamar `e.preventDefault()` é ESSENCIAL para permitir que o evento onDrop seja disparado.
   * @param {React.DragEvent<HTMLDivElement>} e - O evento de arrasto.
   */
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    // PASSO 6: Permitir que o elemento seja um alvo de "soltar".
    e.preventDefault(); 
  };
  
  /**
   * Função onDrop: Chamada quando um card é solto em uma nova coluna.
   * Esta é a função principal que atualiza o estado e move o card.
   * @param {React.DragEvent<HTMLDivElement>} e - O evento de soltar.
   * @param {Quote['status']} newStatus - O status da coluna onde o card foi solto.
   */
  const onDrop = (e: React.DragEvent<HTMLDivElement>, newStatus: Quote['status']) => {
    e.preventDefault();
    // PASSO 7: Recuperar o ID do card que guardamos no onDragStart.
    const quoteId = e.dataTransfer.getData("quoteId");
    
    // PASSO 8: Atualizar o estado.
    // Iteramos sobre o array de cotações. Se o ID da cotação corresponder ao que arrastamos,
    // criamos um novo objeto para ela com o `newStatus`. Caso contrário, mantemos a cotação como está.
    setQuotes(prevQuotes => 
      prevQuotes.map(quote => 
        quote.id === quoteId ? { ...quote, status: newStatus } : quote
      )
    );
  };

  /**
   * Agrupa as cotações por status usando `React.useMemo` para otimização.
   * Este objeto é usado para passar a lista de cotações correta para cada coluna.
   * Ex: { aguardando: [quote1, quote2], 'em-cotacao': [quote3] }
   */
  const quotesByStatus = React.useMemo(() => {
      return quotes.reduce((acc, quote) => {
        if (!acc[quote.status]) {
          acc[quote.status] = [];
        }
        acc[quote.status].push(quote);
        return acc;
      }, {} as Record<Quote['status'], Quote[]>);
  }, [quotes]);
  
  if (!isClient) {
    return null; // ou um esqueleto de carregamento
  }

  return (
    <div className="flex flex-col h-full gap-4">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">Cotações</h1>
        <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsLinkDialogOpen(true)}>
                <LinkIcon className="mr-2 h-4 w-4" />
                Links
            </Button>
            <Button asChild size="sm">
              <Link href="/cotacoes/novo">
                <Plus className="mr-2 h-4 w-4" />
                Nova Cotação
              </Link>
            </Button>
        </div>
      </header>

      <Card>
        <CardContent className="p-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground px-1">Cliente</label>
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
              <label className="text-xs font-medium text-muted-foreground px-1">Tag/Identificador</label>
              <Input placeholder="Tag ou Identificador" className="h-9" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground px-1">Período da Cotação</label>
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
              <label className="text-xs font-medium text-muted-foreground px-1">Usuário</label>
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
      
      {/* Renderização das colunas do Kanban */}
      <div className="flex-grow flex gap-4 overflow-x-auto pb-4">
        {/* Mapeia a configuração de status para criar cada coluna dinamicamente */}
        {Object.keys(statusConfig).map(statusKey => (
            <QuoteColumn 
                key={statusKey} 
                status={statusKey as Quote['status']} 
                // Passa apenas os cards que correspondem ao status da coluna
                quotes={quotesByStatus[statusKey as Quote['status']] || []}
                // Passa as funções de drag and drop como props para as colunas
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragStart={onDragStart}
            />
        ))}
      </div>
      <LinkDialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen} />
    </div>
  );
}
