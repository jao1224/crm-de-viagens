
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockAppointments } from "@/lib/mock-data";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { ListTodo, Plane, MessageSquare, Info, DollarSign, Hotel, Luggage, Camera, TrainFront, HeartPulse, Map, CalendarIcon, Send } from 'lucide-react';
import React from "react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const budgetChartData = {
    budget: [
        { name: 'Aprovado', value: 75, total: 100, color: 'hsl(var(--chart-1))' },
        { name: 'Aguardando', value: 25, total: 100, color: '#6b7280' },
    ],
    approval: [
        { name: 'Aprovado', value: 100, total: 100, color: '#10b981' },
    ],
    salesChannels: [
        { name: 'Agência', value: 60, color: 'hsl(var(--chart-1))' },
        { name: 'Website', value: 30, color: 'hsl(var(--chart-2))' },
        { name: 'Indicação', value: 10, color: 'hsl(var(--chart-3))' },
    ],
    productsServices: [
        { name: 'Venda de Passagem', value: 72.7, color: 'hsl(var(--chart-1))' },
        { name: 'passagem', value: 26.5, color: 'hsl(var(--chart-2))' },
        { name: 'VISTO PROC. TRABALHO', value: 0.8, color: 'hsl(var(--chart-3))' },
    ],
};

const flightCodes = ['7xie9', 't196w', 'sn5ey'];

const top10Data = {
  'Clientes': [
      { name: 'Analine de Albuquerque Linhares', sales: 1, value: '23.766,18' },
      { name: 'JULIO VENANCIO MENEZES', sales: 1, value: '18.540,00' },
      { name: 'Lidiane da Silva Seidenfuhss', sales: 1, value: '11.400,00' },
      { name: 'Davi William da Silveira de Campos', sales: 1, value: '8.700,00' },
      { name: 'Maria Brandão Silva Gaspar', sales: 1, value: '4.800,00' },
  ],
  'Fornecedores': [
      { name: 'Companhia Aérea X', sales: 15, value: '150.000,00' },
      { name: 'Rede Hotel Y', sales: 25, value: '120.000,00' },
      { name: 'Operadora de Turismo Z', sales: 10, value: '95.000,00' },
      { name: 'Empresa de Transfer W', sales: 30, value: '45.000,00' },
      { name: 'Seguradora V', sales: 50, value: '30.000,00' },
  ],
  'Afiliados': [
      { name: 'Blog de Viagens A', sales: 5, value: '12.500,00' },
      { name: 'Influenciador B', sales: 8, value: '11.200,00' },
      { name: 'Agência Parceira C', sales: 3, value: '9.800,00' },
      { name: 'Website de Ofertas D', sales: 12, value: '8.100,00' },
      { name: 'Canal do Youtube E', sales: 4, value: '7.600,00' },
  ]
};

const accompanimentData = [
  { icon: Plane, label: 'Voos', value: 4 },
  { icon: Hotel, label: 'Hospedagem', value: 0 },
  { icon: Luggage, label: 'Cruzeiro', value: 0 },
  { icon: Camera, label: 'Experiências Turísticas', value: 0 },
  { icon: TrainFront, label: 'Transporte', value: 0 },
  { icon: HeartPulse, label: 'Seguro', value: 0 },
  { icon: Map, label: 'Roteiro', value: 0 },
];


type Top10EntityType = keyof typeof top10Data;


const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const value = payload[0].value;
    
    return (
      <div className="bg-white/90 p-2 border border-gray-200 rounded-md shadow-lg backdrop-blur-sm dark:bg-gray-800/90 dark:border-gray-700">
        <p className="font-semibold">{data.name}</p>
        <p className="font-bold text-lg">{`${value}%`}</p>
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
    const [activeFilter, setActiveFilter] = React.useState('Mês');
    const [topClientsFilter, setTopClientsFilter] = React.useState('Faturamento');
    const [top10EntityType, setTop10EntityType] = React.useState<Top10EntityType>('Clientes');
    const [activeBudgetChartIndex, setActiveBudgetChartIndex] = React.useState(1);
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
        from: new Date(2025, 7, 1),
        to: new Date(2025, 7, 31),
    });
    const [chatMessages, setChatMessages] = React.useState([
        { from: 'assistant', text: 'Olá! Como posso te ajudar a encontrar o pacote de viagem perfeito hoje?' }
    ]);
    const [chatInput, setChatInput] = React.useState('');

    const handleSendMessage = () => {
        if (chatInput.trim() === '') return;
        setChatMessages(prev => [...prev, { from: 'user', text: chatInput.trim() }]);
        setChatInput('');
        // TODO: Add logic to get assistant response
    }

    const budgetChartKeys: (keyof typeof budgetChartData | 'accompaniment')[] = ['budget', 'approval', 'salesChannels', 'productsServices', 'accompaniment'];
    const activeBudgetKey = budgetChartKeys[activeBudgetChartIndex];
    const chartData = activeBudgetKey !== 'accompaniment' ? budgetChartData[activeBudgetKey as keyof typeof budgetChartData] : [];

    const top10Entities: Top10EntityType[] = ['Clientes', 'Fornecedores', 'Afiliados'];
    const currentTop10Data = top10Data[top10EntityType];
    
    const getChartTitle = () => {
        switch(activeBudgetKey) {
            case 'budget': return 'Orçamentos';
            case 'approval': return 'Índice de Aprovação';
            case 'salesChannels': return 'Canais de Venda';
            case 'productsServices': return 'Produtos/Serviços';
            case 'accompaniment': return 'Acompanhamento';
            default: return 'Orçamentos';
        }
    };
    
  return (
    <div className="relative p-4 sm:p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
        <Card className="h-fit">
            <CardHeader>
                <CardTitle className="text-lg text-foreground font-semibold">Tarefas para hoje, dia {new Date().getDate()}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center text-center text-muted-foreground py-8">
                <ListTodo className="w-12 h-12 mb-4" />
                <p>Você não possui nenhuma tarefa para o dia de hoje.</p>
                <div className="flex gap-2 mt-6">
                    <Badge variant="destructive">4 atrasada(s)</Badge>
                    <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">0 para o dia de hoje</Badge>
                    <Badge className="bg-green-500 text-white hover:bg-green-600">0 no prazo</Badge>
                </div>
            </CardContent>
        </Card>

        <Card className="h-fit">
            <CardHeader>
                <CardTitle className="text-lg text-foreground font-semibold">Próximos voos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {mockAppointments.filter(a => a.type === 'departure').slice(0, 3).map((flight, index) => (
                    <div key={flight.id} className="grid grid-cols-[auto,1fr,auto] items-center gap-4">
                        <div className="text-right">
                            <p className="text-sm text-muted-foreground">{new Date(flight.date).toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit', year: 'numeric'})}</p>
                            <p className="text-sm font-semibold text-foreground">{new Date(flight.date).toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit', timeZone: 'UTC'})}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-sm text-foreground">{flight.customer}</p>
                            <p className="text-xs text-muted-foreground font-semibold">{flight.package}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Plane className="w-4 h-4 text-primary" />
                            <Badge variant="outline" className="text-primary border-primary bg-primary/10">{flightCodes[index % flightCodes.length]}</Badge>
                        </div>
                    </div>
                ))}
                <div className="flex gap-2">
                    <Badge variant="destructive">2 em período de check-in</Badge>
                    <Badge className="bg-green-500 text-white hover:bg-green-600">46 voo(s) pendente(s)</Badge>
                </div>
            </CardContent>
        </Card>
        
        <Card className="h-fit flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-lg text-foreground font-semibold">Top 10 {top10EntityType}</CardTitle>
                <div className="flex items-center border border-primary rounded-md p-0.5 bg-muted/50">
                      <Button 
                          size="sm"
                          className={`text-xs h-7 px-3 ${topClientsFilter === 'Faturamento' ? 'bg-primary text-primary-foreground' : 'bg-transparent text-primary hover:bg-primary/10'}`}
                          onClick={() => setTopClientsFilter('Faturamento')}
                      >
                          Faturamento
                      </Button>
                      <Button 
                          size="sm"
                          className={`text-xs h-7 px-3 ${topClientsFilter === 'Lucro' ? 'bg-primary text-primary-foreground' : 'bg-transparent text-primary hover:bg-primary/10'}`}
                          onClick={() => setTopClientsFilter('Lucro')}
                      >
                          Lucro
                      </Button>
                </div>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="space-y-3 text-sm">
                    {currentTop10Data.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-1">
                          <span className="font-medium text-foreground">{index + 1}) {item.name}</span> 
                          <span className="font-semibold text-right">
                              {item.sales} venda(s) <span className="ml-4 text-primary">{item.value}</span>
                          </span>
                      </div>
                    ))}
                </div>
            </CardContent>
             <div className="flex justify-center items-center gap-2 mt-auto p-4">
                {top10Entities.map((entity) => (
                  <button key={entity} onClick={() => setTop10EntityType(entity)} className="w-8 h-1.5 rounded-full bg-muted data-[active=true]:bg-primary/80" data-active={top10EntityType === entity}></button>
                ))}
            </div>
        </Card>
        
        <Card className="h-fit flex flex-col">
            <CardHeader className="p-6 space-y-4">
                <CardTitle className="text-lg text-foreground font-semibold">
                     {getChartTitle()}
                </CardTitle>
                <div className="flex flex-wrap gap-1">
                    {['Dia', 'Semana', 'Mês', 'Ano', 'Total', 'Personalizado'].map(filter => (
                        <Button 
                            key={filter} 
                            variant={activeFilter === filter ? 'default' : 'outline'}
                            size="sm"
                            className={`text-xs h-7 px-2 ${activeFilter === filter ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                            onClick={() => setActiveFilter(filter)}
                        >
                            {filter}
                        </Button>
                    ))}
                </div>
                {activeFilter === 'Personalizado' && (
                    <div className="flex items-center justify-center pt-2">
                        <div className="flex items-center border rounded-md p-1 bg-background">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className={cn(
                                            "justify-start text-left font-normal h-7 px-2",
                                            !dateRange?.from && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {dateRange?.from ? format(dateRange.from, "dd/MM/y", { locale: ptBR }) : <span>Data inicial</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        initialFocus
                                        mode="single"
                                        selected={dateRange?.from}
                                        onSelect={(day) => setDateRange(prev => ({...prev, from: day}))}
                                        locale={ptBR}
                                    />
                                </PopoverContent>
                            </Popover>
                            <span className="text-muted-foreground mx-2 text-sm">até</span>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className={cn(
                                            "justify-start text-left font-normal h-7 px-2",
                                            !dateRange?.to && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {dateRange?.to ? format(dateRange.to, "dd/MM/y", { locale: ptBR }) : <span>Data final</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        initialFocus
                                        mode="single"
                                        selected={dateRange?.to}
                                        onSelect={(day) => setDateRange(prev => ({...prev, to: day}))}
                                        locale={ptBR}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                )}
            </CardHeader>
            <CardContent className="p-6 pt-0 flex-grow">
                {activeBudgetKey === 'accompaniment' ? (
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4 pt-4">
                    <div className="space-y-4">
                      {accompanimentData.slice(0, 4).map(item => (
                        <div key={item.label} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <item.icon className="w-4 h-4" />
                            <span>{item.label}</span>
                          </div>
                          <Badge className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center">{item.value}</Badge>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-4">
                      {accompanimentData.slice(4).map(item => (
                        <div key={item.label} className="flex items-center justify-between text-sm">
                           <div className="flex items-center gap-2 text-muted-foreground">
                            <item.icon className="w-4 h-4" />
                            <span>{item.label}</span>
                          </div>
                          <Badge className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center">{item.value}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                <div className="w-full h-[200px] flex items-center justify-center gap-12">
                    <div className="flex-1 h-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie 
                                    data={chartData}
                                    dataKey="value" 
                                    nameKey="name" 
                                    cx="50%" 
                                    cy="50%" 
                                    outerRadius={80} 
                                    fill="hsl(var(--primary))"
                                    labelLine={false}
                                >
                                    {chartData.map((entry) => (
                                        <Cell key={`cell-${entry.name}`} fill={entry.color} strokeWidth={0} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="w-48 space-y-3 pl-4">
                        {chartData.map((entry) => (
                            <div key={entry.name} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{backgroundColor: entry.color}}></div>
                                <span className="text-sm font-medium text-foreground">{entry.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
                )}
            </CardContent>
            <div className="flex justify-center items-center gap-2 mt-auto p-4">
                {budgetChartKeys.map((key, index) => (
                  <button key={key} onClick={() => setActiveBudgetChartIndex(index)} className="w-8 h-1.5 rounded-full bg-muted data-[active=true]:bg-primary/80" data-active={activeBudgetChartIndex === index}></button>
                ))}
            </div>
        </Card>

      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
        <Card className="h-fit">
            <CardContent className="p-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                            MM
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground">Casal em Coimbra</h3>
                            <p className="text-sm text-green-600 font-medium">100,00%</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <Badge className="bg-primary/10 text-primary border-primary/20 mb-1">4 orçamentos</Badge>
                        <p className="text-sm font-semibold text-foreground">R$ 48.666,18</p>
                        <Badge className="bg-green-100 text-green-700 border-green-200 mt-1">4 aprovados</Badge>
                        <p className="text-sm font-semibold text-foreground">R$ 48.666,18</p>
                    </div>
                </div>
            </CardContent>
        </Card>

        <Card className="h-fit">
            <CardContent className="p-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                            MM
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground">Conexões</h3>
                        </div>
                    </div>
                    <div className="text-right">
                        <Badge className="bg-primary/10 text-primary border-primary/20 mb-1">0 orçamentos</Badge>
                        <p className="text-sm font-semibold text-foreground">R$ 0,00</p>
                        <Badge className="bg-green-100 text-green-700 border-green-200 mt-1">0 aprovados</Badge>
                        <p className="text-sm font-semibold text-foreground">R$ 0,00</p>
                    </div>
                </div>
            </CardContent>
        </Card>

        <Card className="h-fit">
            <CardContent className="p-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                            MM
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground">É o Nosso Quintal</h3>
                            <p className="text-sm text-green-600 font-medium">100,00%</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <Badge className="bg-primary/10 text-primary border-primary/20 mb-1">1 orçamentos</Badge>
                        <p className="text-sm font-semibold text-foreground">R$ 18.450,00</p>
                        <Badge className="bg-green-100 text-green-700 border-green-200 mt-1">1 aprovados</Badge>
                        <p className="text-sm font-semibold text-foreground">R$ 18.450,00</p>
                    </div>
                </div>
            </CardContent>
        </Card>

        <Card className="h-fit">
            <CardContent className="p-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-muted-foreground rounded-full flex items-center justify-center text-white font-bold text-sm">
                            M
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground">Maxshuell</h3>
                            <p className="text-sm text-yellow-600 font-medium">50,00%</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <Badge className="bg-primary/10 text-primary border-primary/20 mb-1">2 orçamentos</Badge>
                        <p className="text-sm font-semibold text-foreground">R$ 0,00</p>
                        <Badge className="bg-green-100 text-green-700 border-green-200 mt-1">1 aprovados</Badge>
                        <p className="text-sm font-semibold text-foreground">R$ 0,00</p>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-7xl mx-auto">
        <Card className="h-fit">
            <CardContent className="p-4 text-center">
                <h3 className="text-sm text-muted-foreground mb-2">Recebido (R$)</h3>
                <p className="text-2xl font-bold text-primary">67.206,18</p>
                <div className="w-full h-1 bg-primary mt-2"></div>
            </CardContent>
        </Card>

        <Card className="h-fit">
            <CardContent className="p-4 text-center">
                <h3 className="text-sm text-muted-foreground mb-2">Pago (R$)</h3>
                <p className="text-2xl font-bold text-destructive">60.582,30</p>
                <div className="w-full h-1 bg-destructive mt-2"></div>
            </CardContent>
        </Card>

        <Card className="h-fit">
            <CardContent className="p-4 text-center">
                <h3 className="text-sm text-muted-foreground mb-2">Faturamento (R$)</h3>
                <p className="text-2xl font-bold text-green-600">67.206,18</p>
                <div className="w-full h-1 bg-green-600 mt-2"></div>
            </CardContent>
        </Card>

        <Card className="h-fit">
            <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <h3 className="text-sm text-muted-foreground">Lucro (R$)</h3>
                    <Info className="w-4 h-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold text-green-600">6.623,88</p>
                <div className="w-full h-1 bg-green-600 mt-2"></div>
            </CardContent>
        </Card>

        <Card className="h-fit">
            <CardContent className="p-4 text-center">
                <h3 className="text-sm text-muted-foreground mb-2">Ticket Médio (R$)</h3>
                <p className="text-2xl font-bold text-primary">11.186,03</p>
                <div className="w-full h-1 bg-primary mt-2"></div>
            </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
        <Card className="h-fit">
            <CardHeader>
                <CardTitle className="text-lg text-foreground font-semibold">Receitas para hoje, dia {new Date().getDate()}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center text-center text-muted-foreground py-8">
                <DollarSign className="w-16 h-16 mb-4" />
                <p>Nenhuma receita para o dia de hoje.</p>
                <div className="flex gap-2 mt-6">
                    <Badge variant="destructive">23 atrasada(s)</Badge>
                    <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">0 para o dia de hoje</Badge>
                </div>
            </CardContent>
        </Card>

        <Card className="h-fit">
            <CardHeader>
                <CardTitle className="text-lg text-foreground font-semibold">Despesas para hoje, dia {new Date().getDate()}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center text-center text-muted-foreground py-8">
                <DollarSign className="w-16 h-16 mb-4" />
                <p>Nenhuma despesa para o dia de hoje.</p>
                <div className="flex gap-2 mt-6">
                    <Badge variant="destructive">157 atrasada(s)</Badge>
                    <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">0 para o dia de hoje</Badge>
                </div>
            </CardContent>
        </Card>
      </div>
      
       <Sheet>
        <SheetTrigger asChild>
            <Button
                className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
                size="icon"
            >
                <MessageSquare className="h-7 w-7" />
                <span className="sr-only">Chat</span>
            </Button>
        </SheetTrigger>
        <SheetContent side="right" className="flex flex-col h-full w-[400px]">
            <SheetHeader className="p-4 border-b">
                <SheetTitle>Assistente Virtual</SheetTitle>
            </SheetHeader>
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                    {chatMessages.map((msg, index) => (
                        <div key={index} className={cn("flex items-end gap-2", msg.from === 'user' ? 'justify-end' : 'justify-start')}>
                           {msg.from === 'assistant' && (
                               <Avatar className="h-8 w-8">
                                   <AvatarImage src="https://i.pinimg.com/736x/05/2d/19/052d19b3a3721345f2a1b92e59530b13.jpg" alt="Assistente" />
                                   <AvatarFallback>A</AvatarFallback>
                               </Avatar>
                           )}
                           <div className={cn(
                               "max-w-[75%] rounded-lg px-4 py-2 text-sm", 
                               msg.from === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                           )}>
                               <p>{msg.text}</p>
                           </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
            <div className="p-4 border-t">
                <div className="relative">
                    <Textarea 
                        placeholder="Digite sua mensagem..." 
                        className="pr-16"
                        value={chatInput}
                        onChange={e => setChatInput(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); }}}
                    />
                    <Button 
                        size="icon" 
                        className="absolute top-1/2 right-3 -translate-y-1/2"
                        onClick={handleSendMessage}
                        disabled={!chatInput.trim()}
                    >
                        <Send className="h-5 w-5" />
                        <span className="sr-only">Enviar</span>
                    </Button>
                </div>
            </div>
        </SheetContent>
    </Sheet>
    </div>
  );
}
