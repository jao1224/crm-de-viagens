
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockAppointments } from "@/lib/mock-data";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { ListTodo, Plane, Info, DollarSign, Hotel, Luggage, Camera, TrainFront, HeartPulse, Map, Calendar as CalendarIcon } from 'lucide-react';
import React from "react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import { ChatWidget } from "@/components/chat-widget";

const budgetChartData = {
    budget: [
        { name: 'Aprovado', value: 75, total: 100, color: 'hsl(var(--chart-1))' },
        { name: 'Aguardando', value: 25, total: 100, color: 'hsl(var(--chart-2))' },
    ],
    approval: [
        { name: 'Aprovado', value: 100, total: 100, color: 'hsl(var(--chart-3))' },
    ],
    salesChannels: [
        { name: 'Agência', value: 60, color: 'hsl(var(--chart-1))' },
        { name: 'Website', value: 30, color: 'hsl(var(--chart-2))' },
        { name: 'Indicação', value: 10, color: 'hsl(var(--chart-3))' },
    ],
    productsServices: [
        { name: 'Passagem', value: 72.7, color: 'hsl(var(--chart-1))' },
        { name: 'Hospedagem', value: 26.5, color: 'hsl(var(--chart-2))' },
        { name: 'Visto', value: 0.8, color: 'hsl(var(--chart-3))' },
    ],
};

const flightCodes = ['7XIE9', 'T196W', 'SN5EY'];

const top10Data = {
  'Clientes': [
      { name: 'Analine de Albuquerque Linhares', sales: 1, value: 'R$ 23.766,18' },
      { name: 'JULIO VENANCIO MENEZES', sales: 1, value: 'R$ 18.540,00' },
      { name: 'Lidiane da Silva Seidenfuhss', sales: 1, value: 'R$ 11.400,00' },
      { name: 'Davi William da Silveira de Campos', sales: 1, value: 'R$ 8.700,00' },
      { name: 'Maria Brandão Silva Gaspar', sales: 1, value: 'R$ 4.800,00' },
  ],
  'Fornecedores': [
      { name: 'Companhia Aérea X', sales: 15, value: 'R$ 150.000,00' },
      { name: 'Rede Hotel Y', sales: 25, value: 'R$ 120.000,00' },
      { name: 'Operadora de Turismo Z', sales: 10, value: 'R$ 95.000,00' },
      { name: 'Empresa de Transfer W', sales: 30, value: 'R$ 45.000,00' },
      { name: 'Seguradora V', sales: 50, value: 'R$ 30.000,00' },
  ],
  'Afiliados': [
      { name: 'Blog de Viagens A', sales: 5, value: 'R$ 12.500,00' },
      { name: 'Influenciador B', sales: 8, value: 'R$ 11.200,00' },
      { name: 'Agência Parceira C', sales: 3, value: 'R$ 9.800,00' },
      { name: 'Website de Ofertas D', sales: 12, value: 'R$ 8.100,00' },
      { name: 'Canal do Youtube E', sales: 4, value: 'R$ 7.600,00' },
  ]
};

const accompanimentData = [
  { icon: Plane, label: 'Voos', value: 4 },
  { icon: Hotel, label: 'Hospedagem', value: 0 },
  { icon: Luggage, label: 'Cruzeiro', value: 0 },
  { icon: Camera, label: 'Experiências', value: 0 },
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
      <div className="bg-background/80 p-2.5 border border-border rounded-lg shadow-lg backdrop-blur-sm">
        <p className="font-headline text-foreground">{data.name}</p>
        <p className="font-bold text-lg text-primary">{`${value}%`}</p>
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
    const [activeFilter, setActiveFilter] = React.useState('Mês');
    const [topClientsFilter, setTopClientsFilter] = React.useState('Faturamento');
    const [top10EntityType, setTop10EntityType] = React.useState<Top10EntityType>('Clientes');
    const [activeBudgetChartIndex, setActiveBudgetChartIndex] = React.useState(0);
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
        from: new Date(2025, 7, 1),
        to: new Date(2025, 7, 31),
    });

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
            case 'productsServices': return 'Produtos e Serviços';
            case 'accompaniment': return 'Acompanhamentos';
            default: return 'Orçamentos';
        }
    };
    
  return (
    <div className="space-y-6">
      <header>
          <h1 className="text-3xl font-headline text-primary">Dashboard</h1>
          <p className="text-muted-foreground">Bem-vindo(a) de volta, Maxshuell!</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between">
                <div >
                    <CardTitle className="font-headline text-primary">{getChartTitle()}</CardTitle>
                    <CardDescription>Análise visual dos seus dados chave.</CardDescription>
                </div>
                 <div className="flex flex-wrap gap-1">
                    {['Dia', 'Mês', 'Ano', 'Total'].map(filter => (
                        <Button 
                            key={filter} 
                            variant={activeFilter === filter ? 'default' : 'ghost'}
                            size="sm"
                            className="text-xs h-8 px-3"
                            onClick={() => setActiveFilter(filter)}
                        >
                            {filter}
                        </Button>
                    ))}
                    <Popover>
                        <PopoverTrigger asChild>
                             <Button 
                                variant={activeFilter === 'Personalizado' ? 'default' : 'ghost'}
                                size="sm"
                                className="text-xs h-8 px-3"
                                onClick={() => setActiveFilter('Personalizado')}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                Personalizado
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="end">
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={dateRange?.from}
                                selected={dateRange}
                                onSelect={setDateRange}
                                numberOfMonths={2}
                                locale={ptBR}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </CardHeader>
            <CardContent className="p-6 pt-0 flex-grow">
                {activeBudgetKey === 'accompaniment' ? (
                  <div className="grid grid-cols-2 gap-x-8 gap-y-6 pt-4 h-full content-center">
                      {accompanimentData.map(item => (
                        <div key={item.label} className="flex items-center justify-between text-base">
                          <div className="flex items-center gap-3 text-muted-foreground">
                            <item.icon className="w-5 h-5 text-primary" />
                            <span className="font-medium">{item.label}</span>
                          </div>
                          <Badge className="bg-primary/10 text-primary font-bold text-sm rounded-full w-8 h-8 flex items-center justify-center">{item.value}</Badge>
                        </div>
                      ))}
                  </div>
                ) : (
                <div className="w-full h-[250px] flex items-center justify-center gap-12">
                    <div className="flex-1 h-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie 
                                    data={chartData}
                                    dataKey="value" 
                                    nameKey="name" 
                                    cx="50%" 
                                    cy="50%" 
                                    outerRadius={100}
                                    innerRadius={60}
                                    paddingAngle={5}
                                    fill="hsl(var(--primary))"
                                    labelLine={false}
                                >
                                    {chartData.map((entry) => (
                                        <Cell key={`cell-${entry.name}`} fill={entry.color} stroke={entry.color} strokeWidth={2}/>
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} cursor={{fill: 'hsl(var(--accent))'}} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="w-48 space-y-4">
                        {chartData.map((entry) => (
                            <div key={entry.name} className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full" style={{backgroundColor: entry.color}}></div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-foreground">{entry.name}</span>
                                    <span className="text-xs text-muted-foreground">{entry.value}% do total</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                )}
            </CardContent>
            <div className="flex justify-center items-center gap-2 mt-auto p-4 border-t">
                {budgetChartKeys.map((key, index) => (
                  <button key={key} onClick={() => setActiveBudgetChartIndex(index)} className="w-2.5 h-2.5 rounded-full bg-muted transition-all hover:bg-primary/50 data-[active=true]:bg-primary data-[active=true]:w-6" data-active={activeBudgetChartIndex === index}></button>
                ))}
            </div>
        </Card>
        
        <Card className="h-fit flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="font-headline text-primary">Top 10 {top10EntityType}</CardTitle>
                <div className="flex items-center border rounded-md p-0.5 bg-muted/50">
                      <Button 
                          size="sm"
                          variant="ghost"
                          className={`text-xs h-7 px-3 ${topClientsFilter === 'Faturamento' ? 'bg-background shadow-sm text-primary' : 'bg-transparent text-muted-foreground'}`}
                          onClick={() => setTopClientsFilter('Faturamento')}
                      >
                          Faturamento
                      </Button>
                      <Button 
                          size="sm"
                          variant="ghost"
                          className={`text-xs h-7 px-3 ${topClientsFilter === 'Lucro' ? 'bg-background shadow-sm text-primary' : 'bg-transparent text-muted-foreground'}`}
                          onClick={() => setTopClientsFilter('Lucro')}
                      >
                          Lucro
                      </Button>
                </div>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="space-y-1 text-sm">
                    {currentTop10Data.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2.5 border-b last:border-b-0">
                          <span className="font-medium text-foreground max-w-[150px] truncate" title={item.name}>{index + 1}. {item.name}</span> 
                          <div className="text-right">
                            <span className="font-semibold text-primary">{item.value}</span>
                            <p className="text-xs text-muted-foreground">{item.sales} venda(s)</p>
                          </div>
                      </div>
                    ))}
                </div>
            </CardContent>
             <div className="flex justify-center items-center gap-3 mt-auto p-4 border-t">
                {top10Entities.map((entity) => (
                  <button key={entity} onClick={() => setTop10EntityType(entity)} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary data-[active=true]:text-primary" data-active={top10EntityType === entity}>{entity}</button>
                ))}
            </div>
        </Card>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-primary">Tarefas para Hoje</CardTitle>
                <CardDescription>Suas prioridades para {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center text-center text-muted-foreground py-10">
                <ListTodo className="w-12 h-12 mb-4 text-primary/50" />
                <p className="font-medium">Você não possui nenhuma tarefa para hoje.</p>
                <p className="text-sm">Aproveite para planejar sua semana!</p>
                <div className="flex gap-2 mt-6">
                    <Badge variant="destructive">4 atrasada(s)</Badge>
                    <Badge className="bg-green-500/10 text-green-700 border-green-500/20">0 no prazo</Badge>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-primary">Próximos Voos</CardTitle>
                <CardDescription>Fique de olho nos embarques que se aproximam.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {mockAppointments.filter(a => a.type === 'departure').slice(0, 3).map((flight, index) => (
                    <div key={flight.id} className="grid grid-cols-[auto,1fr,auto] items-center gap-4 p-3 rounded-lg bg-muted/50">
                        <div className="text-center">
                            <p className="font-bold text-lg text-primary">{new Date(flight.date).toLocaleDateString('pt-BR', {day: '2-digit'})}</p>
                            <p className="text-xs text-muted-foreground -mt-1">{new Date(flight.date).toLocaleDateString('pt-BR', {month: 'short'})}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-foreground">{flight.customer}</p>
                            <p className="text-sm text-muted-foreground font-medium">{flight.package}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Plane className="w-5 h-5 text-primary" />
                            <Badge variant="outline" className="font-mono text-primary border-primary/20">{flightCodes[index % flightCodes.length]}</Badge>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
      </div>
      
       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <Card className="text-center p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Recebido</h3>
            <p className="text-2xl font-bold text-primary">R$ 67k</p>
        </Card>

        <Card className="text-center p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Pago</h3>
            <p className="text-2xl font-bold text-destructive">R$ 60k</p>
        </Card>

        <Card className="text-center p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Faturamento</h3>
            <p className="text-2xl font-bold text-green-600">R$ 67k</p>
        </Card>
        
        <Card className="text-center p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Lucro</h3>
            <p className="text-2xl font-bold text-green-600">R$ 6.6k</p>
        </Card>

        <Card className="text-center p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Ticket Médio</h3>
            <p className="text-2xl font-bold text-primary">R$ 11.1k</p>
        </Card>
      </div>

       <ChatWidget />
    </div>
  );
}
