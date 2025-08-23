
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockAppointments, mockProjects } from "@/lib/mock-data";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { ListTodo, Plane, Info, DollarSign, Hotel, Luggage, Camera, TrainFront, HeartPulse, Map, Calendar as CalendarIcon, Users } from 'lucide-react';
import React from "react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import { ChatWidget } from "@/components/chat-widget";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import type { Project } from "@/lib/types";
import { Input } from "@/components/ui/input";

const revenueChartData = [
    { name: 'Venda de Passagem', value: 72.7, color: 'hsl(var(--chart-1))' },
    { name: 'passagem', value: 26.5, color: 'hsl(var(--chart-2))' },
    { name: 'VISTO PROC. TRABALHO', value: 0.8, color: 'hsl(var(--chart-3))' },
];

const expensesChartData = [
    { name: 'Pagamento Fornecedor', value: 100, color: 'hsl(var(--chart-1))' },
]

const budgetChartData = [
    { name: 'Aprovado', value: 75, color: 'hsl(var(--chart-1))' },
    { name: 'Aguardando', value: 25, color: 'hsl(var(--chart-2))' },
];

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

const PieChartCard = ({ title, data }: { title: string, data: {name: string, value: number, color: string}[] }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-primary text-xl">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="w-full h-[250px] flex items-center justify-center gap-12">
                    <div className="flex-1 h-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie 
                                    data={data}
                                    dataKey="value" 
                                    nameKey="name" 
                                    cx="50%" 
                                    cy="50%" 
                                    outerRadius={100}
                                    innerRadius={70}
                                    paddingAngle={data.length > 1 ? 2 : 0}
                                    fill="hsl(var(--primary))"
                                    labelLine={false}
                                >
                                    {data.map((entry) => (
                                        <Cell key={`cell-${entry.name}`} fill={entry.color} stroke={entry.color} strokeWidth={2}/>
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} cursor={{fill: 'hsl(var(--accent))'}} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="w-48 space-y-4">
                        {data.map((entry) => (
                            <div key={entry.name} className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full" style={{backgroundColor: entry.color}}></div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-foreground">{entry.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

const ProjectCard = ({ project }: { project: Project }) => (
    <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
            <h3 className="font-bold text-lg text-primary">{project.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
            <div className="flex items-center justify-between mb-2">
                <div className="flex -space-x-2">
                    {project.members.map((member, index) => (
                        <Avatar key={index} className="h-8 w-8 border-2 border-background">
                            <AvatarImage src={member.avatarUrl} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    ))}
                </div>
                <span className="text-xs font-semibold text-muted-foreground">{project.members.length} membro(s)</span>
            </div>
            <div>
                <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-muted-foreground">Progresso</span>
                    <span className="text-xs font-bold text-primary">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
            </div>
        </CardContent>
    </Card>
);

export default function DashboardPage() {
    const [topClientsFilter, setTopClientsFilter] = React.useState('Faturamento');
    const [activeBudgetFilter, setActiveBudgetFilter] = React.useState('Mês');
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
        from: new Date(2025, 7, 1),
        to: new Date(2025, 7, 31),
    });
    
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-headline text-primary">Dashboard</h1>
                <p className="text-muted-foreground">Bem-vindo(a) de volta, Maxshuell!</p>
            </header>

            {/* Seção de Orçamentos */}
            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <CardTitle className="font-headline text-primary text-2xl">Orçamentos</CardTitle>
                            <CardDescription className="text-base">Análise visual dos seus dados chave.</CardDescription>
                        </div>
                        
                        <div className="flex items-center gap-2 flex-wrap">
                            {/* Filtros de Período */}
                            <div className="flex flex-wrap gap-1">
                                {['Dia', 'Mês', 'Ano', 'Total'].map(filter => (
                                    <Button 
                                        key={filter} 
                                        variant={activeBudgetFilter === filter ? 'default' : 'outline'}
                                        size="sm"
                                        className={`text-xs h-8 px-3`}
                                        onClick={() => setActiveBudgetFilter(filter)}
                                    >
                                        {filter}
                                    </Button>
                                ))}
                                <Button 
                                    variant={activeBudgetFilter === 'Personalizado' ? 'default' : 'outline'}
                                    size="sm"
                                    className={`text-xs h-8 px-3`}
                                    onClick={() => setActiveBudgetFilter('Personalizado')}
                                >
                                    <CalendarIcon className="w-3 h-3 mr-1" />
                                    Personalizado
                                </Button>
                            </div>
                        </div>
                    </div>
                     {activeBudgetFilter === 'Personalizado' && (
                        <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-2 pt-4">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <div className="relative">
                                        <Input
                                          value={dateRange?.from ? format(dateRange.from, 'dd/MM/yyyy') : ''}
                                          placeholder="Data de Início"
                                          className="pr-8"
                                          readOnly
                                        />
                                        <CalendarIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={dateRange?.from}
                                        onSelect={(day) => setDateRange(prev => ({...prev, from: day}))}
                                        initialFocus
                                        locale={ptBR}
                                    />
                                </PopoverContent>
                            </Popover>
                            <span className="text-muted-foreground">até</span>
                            <Popover>
                                <PopoverTrigger asChild>
                                     <div className="relative">
                                        <Input
                                          value={dateRange?.to ? format(dateRange.to, 'dd/MM/yyyy') : ''}
                                          placeholder="Data Final"
                                          className="pr-8"
                                          readOnly
                                        />
                                        <CalendarIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="end">
                                    <Calendar
                                        mode="single"
                                        selected={dateRange?.to}
                                        onSelect={(day) => setDateRange(prev => ({...prev, to: day}))}
                                        initialFocus
                                        locale={ptBR}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    )}
                </CardHeader>
                <CardContent>
                    <div className="w-full h-[300px] flex items-center justify-center gap-8">
                        <div className="flex-1 h-full flex items-center justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie 
                                        data={budgetChartData}
                                        dataKey="value" 
                                        nameKey="name" 
                                        cx="50%" 
                                        cy="50%" 
                                        outerRadius={100} 
                                        innerRadius={60}
                                        fill="hsl(var(--primary))"
                                        labelLine={false}
                                    >
                                        {budgetChartData.map((entry) => (
                                            <Cell key={`cell-${entry.name}`} fill={entry.color} strokeWidth={0} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        
                        {/* Legenda */}
                        <div className="w-48 space-y-4">
                            {budgetChartData.map((entry) => (
                                <div key={entry.name} className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full" style={{backgroundColor: entry.color}}></div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-foreground">{entry.name}</span>
                                        <span className="text-xs text-muted-foreground">{entry.value}% do total</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Indicadores de paginação */}
                    <div className="flex justify-center gap-2 mt-6">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <div className="w-3 h-3 bg-muted-foreground/30 rounded-full"></div>
                        <div className="w-3 h-3 bg-muted-foreground/30 rounded-full"></div>
                        <div className="w-3 h-3 bg-muted-foreground/30 rounded-full"></div>
                        <div className="w-3 h-3 bg-muted-foreground/30 rounded-full"></div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-4">
                        <CardTitle className="font-headline text-primary">Top 10 Clientes</CardTitle>
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
                    <CardContent>
                        <div className="space-y-1 text-sm">
                            {top10Data.Clientes.map((item, index) => (
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
                </Card>
                
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-4">
                        <CardTitle className="font-headline text-primary">Top 10 Fornecedores</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-1 text-sm">
                            {top10Data.Fornecedores.map((item, index) => (
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
            
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-primary">Acompanhe seus projetos</CardTitle>
                    <CardDescription>Visão geral do andamento dos seus grupos e viagens.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {mockProjects.map(project => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PieChartCard title="Receitas por Categoria" data={revenueChartData} />
                <PieChartCard title="Despesas por Categoria" data={expensesChartData} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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

    



    

    




    