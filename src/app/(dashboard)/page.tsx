
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockAppointments } from "@/lib/mock-data";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { ListTodo, Plane, MessageSquare, Info, DollarSign } from 'lucide-react';
import React from "react";
import { cn } from "@/lib/utils";

const budgetChartData = {
    budget: [
        { name: 'Aprovado', value: 75, total: 100, color: 'hsl(var(--chart-1))' },
        { name: 'Aguardando', value: 25, total: 100, color: '#6b7280' },
    ],
    approval: [
        { name: 'Aprovado', value: 100, total: 100, color: '#10b981' },
    ],
};

const revenueChartData = [
    { name: 'Venda de Passagem', value: 72.7, color: '#3b82f6' },
    { name: 'passagem', value: 26.5, color: '#f97316' },
    { name: 'VISTO PROC. TRABALHO', value: 0.8, color: '#ef4444' },
];

const expenseChartData = [
    { name: 'Pagamento Fornecedor', value: 100, color: '#3b82f6' },
];

const flightCodes = ['7xie9', 't196w', 'sn5ey'];

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
    const [activeChart, setActiveChart] = React.useState<'budget' | 'approval'>('approval');
    
    const chartData = budgetChartData[activeChart];
    
  return (
    <div className="relative p-4 sm:p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
        {/* Coluna Esquerda */}
        <div className="space-y-6 flex flex-col">
            <Card className="h-fit">
                <CardHeader>
                    <CardTitle className="text-lg text-gray-800 font-semibold">Tarefas para hoje, dia {new Date().getDate()}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center text-center text-gray-600 py-8">
                    <ListTodo className="w-12 h-12 mb-4 text-gray-400" />
                    <p>Você não possui nenhuma tarefa para o dia de hoje.</p>
                    <div className="flex gap-2 mt-6">
                        <Badge className="bg-red-500 text-white hover:bg-red-600">4 atrasada(s)</Badge>
                        <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">0 para o dia de hoje</Badge>
                        <Badge className="bg-green-500 text-white hover:bg-green-600">0 no prazo</Badge>
                    </div>
                </CardContent>
            </Card>
            <Card className="h-fit">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <CardTitle className="text-lg text-gray-800 font-semibold">Top 10 Clientes</CardTitle>
                    <div className="flex items-center border border-blue-600 rounded-md p-0.5 bg-gray-50">
                          <Button 
                              size="sm"
                              className={`text-xs h-7 px-3 ${topClientsFilter === 'Faturamento' ? 'bg-blue-600 text-white' : 'bg-transparent text-blue-600 hover:bg-blue-50'}`}
                              onClick={() => setTopClientsFilter('Faturamento')}
                          >
                              Faturamento
                          </Button>
                          <Button 
                              size="sm"
                              className={`text-xs h-7 px-3 ${topClientsFilter === 'Lucro' ? 'bg-blue-600 text-white' : 'bg-transparent text-blue-600 hover:bg-blue-50'}`}
                              onClick={() => setTopClientsFilter('Lucro')}
                          >
                              Lucro
                          </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center py-1">
                            <span className="font-medium text-gray-800">1) Analine de Albuquerque Linhares</span> 
                            <span className="font-semibold text-right">
                                1 venda(s) <span className="ml-4 text-blue-600">23.766,18</span>
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-1">
                            <span className="font-medium text-gray-800">2) JULIO VENANCIO MENEZES</span> 
                            <span className="font-semibold text-right">
                                1 venda(s) <span className="ml-4 text-blue-600">18.540,00</span>
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-1">
                            <span className="font-medium text-gray-800">3) Lidiane da Silva Seidenfuhss</span> 
                            <span className="font-semibold text-right">
                                1 venda(s) <span className="ml-4 text-blue-600">11.400,00</span>
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-1">
                            <span className="font-medium text-gray-800">4) Davi William da Silveira de Campos</span> 
                            <span className="font-semibold text-right">
                                1 venda(s) <span className="ml-4 text-blue-600">8.700,00</span>
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-1">
                            <span className="font-medium text-gray-800">5) Maria Brandão Silva Gaspar</span> 
                            <span className="font-semibold text-right">
                                1 venda(s) <span className="ml-4 text-blue-600">4.800,00</span>
                            </span>
                        </div>
                    </div>
                    
                    {/* Indicadores de paginação */}
                    <div className="flex justify-center gap-2 mt-6">
                        <div className="w-8 h-1.5 bg-gray-600 rounded-full"></div>
                        <div className="w-8 h-1.5 bg-gray-300 rounded-full"></div>
                        <div className="w-8 h-1.5 bg-gray-300 rounded-full"></div>
                    </div>
                </CardContent>
            </Card>
        </div>

        {/* Coluna Direita */}
        <div className="space-y-6 flex flex-col">
            <Card className="h-fit">
                <CardHeader>
                    <CardTitle className="text-lg text-gray-800 font-semibold">Próximos voos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {mockAppointments.filter(a => a.type === 'departure').slice(0, 3).map((flight, index) => (
                        <div key={flight.id} className="grid grid-cols-[auto,1fr,auto] items-center gap-4">
                            <div className="text-right">
                                <p className="text-sm text-gray-600">{new Date(flight.date).toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit', year: 'numeric'})}</p>
                                <p className="text-sm font-semibold text-gray-800">{new Date(flight.date).toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit', timeZone: 'UTC'})}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-sm text-gray-800">{flight.customer}</p>
                                <p className="text-xs text-gray-600 font-semibold">{flight.package}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Plane className="w-4 h-4 text-blue-600" />
                                <Badge variant="outline" className="text-blue-600 border-blue-600 bg-blue-50">{flightCodes[index % flightCodes.length]}</Badge>
                            </div>
                        </div>
                    ))}
                    <div className="flex gap-2">
                        <Badge className="bg-red-500 text-white hover:bg-red-600">2 em período de check-in</Badge>
                        <Badge className="bg-green-500 text-white hover:bg-green-600">46 voo(s) pendente(s)</Badge>
                    </div>
                </CardContent>
            </Card>
            <Card className="h-fit">
                <CardHeader className="p-6 space-y-4">
                    <CardTitle className="text-lg text-gray-800 font-semibold">
                         {activeChart === 'budget' ? 'Orçamentos' : 'Índice de Aprovação'}
                    </CardTitle>
                    <div className="flex flex-wrap gap-1">
                        {['Dia', 'Semana', 'Mês', 'Ano', 'Total', 'Personalizado'].map(filter => (
                            <Button 
                                key={filter} 
                                variant={activeFilter === filter ? 'default' : 'outline'}
                                size="sm"
                                className={`text-xs h-7 px-2 ${activeFilter === filter ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                onClick={() => setActiveFilter(filter)}
                            >
                                {filter}
                            </Button>
                        ))}
                    </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
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
                                        fill="#10b981"
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
                        <div className="w-40 space-y-3">
                            <Button 
                                variant={activeChart === 'budget' ? 'secondary' : 'ghost'}
                                className="w-full justify-start text-left"
                                onClick={() => setActiveChart('budget')}
                            >
                                Orçamentos
                            </Button>
                            <Button 
                                variant={activeChart === 'approval' ? 'secondary' : 'ghost'}
                                className="w-full justify-start text-left"
                                onClick={() => setActiveChart('approval')}
                            >
                                Índice de Aprovação
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
        <Card className="h-fit">
            <CardContent className="p-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            MM
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800">Casal em Coimbra</h3>
                            <p className="text-sm text-green-600 font-medium">100,00%</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <Badge className="bg-blue-100 text-blue-700 border-blue-200 mb-1">4 orçamentos</Badge>
                        <p className="text-sm font-semibold text-gray-800">R$ 48.666,18</p>
                        <Badge className="bg-green-100 text-green-700 border-green-200 mt-1">4 aprovados</Badge>
                        <p className="text-sm font-semibold text-gray-800">R$ 48.666,18</p>
                    </div>
                </div>
            </CardContent>
        </Card>

        <Card className="h-fit">
            <CardContent className="p-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            MM
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800">Conexões</h3>
                        </div>
                    </div>
                    <div className="text-right">
                        <Badge className="bg-blue-100 text-blue-700 border-blue-200 mb-1">0 orçamentos</Badge>
                        <p className="text-sm font-semibold text-gray-800">R$ 0,00</p>
                        <Badge className="bg-green-100 text-green-700 border-green-200 mt-1">0 aprovados</Badge>
                        <p className="text-sm font-semibold text-gray-800">R$ 0,00</p>
                    </div>
                </div>
            </CardContent>
        </Card>

        <Card className="h-fit">
            <CardContent className="p-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            MM
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800">É o Nosso Quintal</h3>
                            <p className="text-sm text-green-600 font-medium">100,00%</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <Badge className="bg-blue-100 text-blue-700 border-blue-200 mb-1">1 orçamentos</Badge>
                        <p className="text-sm font-semibold text-gray-800">R$ 18.450,00</p>
                        <Badge className="bg-green-100 text-green-700 border-green-200 mt-1">1 aprovados</Badge>
                        <p className="text-sm font-semibold text-gray-800">R$ 18.450,00</p>
                    </div>
                </div>
            </CardContent>
        </Card>

        <Card className="h-fit">
            <CardContent className="p-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            M
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800">Maxshuell</h3>
                            <p className="text-sm text-yellow-600 font-medium">50,00%</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <Badge className="bg-blue-100 text-blue-700 border-blue-200 mb-1">2 orçamentos</Badge>
                        <p className="text-sm font-semibold text-gray-800">R$ 0,00</p>
                        <Badge className="bg-green-100 text-green-700 border-green-200 mt-1">1 aprovados</Badge>
                        <p className="text-sm font-semibold text-gray-800">R$ 0,00</p>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-7xl mx-auto">
        <Card className="h-fit">
            <CardContent className="p-4 text-center">
                <h3 className="text-sm text-gray-600 mb-2">Recebido (R$)</h3>
                <p className="text-2xl font-bold text-blue-600">67.206,18</p>
                <div className="w-full h-1 bg-blue-600 mt-2"></div>
            </CardContent>
        </Card>

        <Card className="h-fit">
            <CardContent className="p-4 text-center">
                <h3 className="text-sm text-gray-600 mb-2">Pago (R$)</h3>
                <p className="text-2xl font-bold text-red-600">60.582,30</p>
                <div className="w-full h-1 bg-red-600 mt-2"></div>
            </CardContent>
        </Card>

        <Card className="h-fit">
            <CardContent className="p-4 text-center">
                <h3 className="text-sm text-gray-600 mb-2">Faturamento (R$)</h3>
                <p className="text-2xl font-bold text-green-600">67.206,18</p>
                <div className="w-full h-1 bg-green-600 mt-2"></div>
            </CardContent>
        </Card>

        <Card className="h-fit">
            <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <h3 className="text-sm text-gray-600">Lucro (R$)</h3>
                    <Info className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-2xl font-bold text-green-600">6.623,88</p>
                <div className="w-full h-1 bg-green-600 mt-2"></div>
            </CardContent>
        </Card>

        <Card className="h-fit">
            <CardContent className="p-4 text-center">
                <h3 className="text-sm text-gray-600 mb-2">Ticket Médio (R$)</h3>
                <p className="text-2xl font-bold text-blue-600">11.186,03</p>
                <div className="w-full h-1 bg-blue-600 mt-2"></div>
            </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
        <Card className="h-fit">
            <CardHeader>
                <CardTitle className="text-lg text-gray-800 font-semibold">Despesas por Categoria</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="w-full h-[250px] flex items-center justify-center gap-6">
                    <div className="flex-1 h-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie 
                                    data={expenseChartData}
                                    dataKey="value" 
                                    nameKey="name" 
                                    cx="50%" 
                                    cy="50%" 
                                    outerRadius={80} 
                                    innerRadius={40}
                                    fill="#8884d8"
                                    labelLine={false}
                                >
                                    {expenseChartData.map((entry) => (
                                        <Cell key={`cell-${entry.name}`} fill={entry.color} strokeWidth={0} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="w-48 space-y-3 pl-4">
                        {expenseChartData.map((entry) => (
                            <div key={entry.name} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{backgroundColor: entry.color}}></div>
                                <span className="text-sm font-medium text-gray-700">{entry.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
        <Card className="h-fit">
            <CardHeader>
                <CardTitle className="text-lg text-gray-800 font-semibold">Receitas por Categoria</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="w-full h-[250px] flex items-center justify-center gap-6">
                    <div className="flex-1 h-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie 
                                    data={revenueChartData}
                                    dataKey="value" 
                                    nameKey="name" 
                                    cx="50%" 
                                    cy="50%" 
                                    outerRadius={80} 
                                    innerRadius={40}
                                    fill="#8884d8"
                                    labelLine={false}
                                >
                                    {revenueChartData.map((entry) => (
                                        <Cell key={`cell-${entry.name}`} fill={entry.color} strokeWidth={0} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="w-48 space-y-3 pl-4">
                        {revenueChartData.map((entry) => (
                            <div key={entry.name} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{backgroundColor: entry.color}}></div>
                                <span className="text-sm font-medium text-gray-700">{entry.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
        <Card className="h-fit">
            <CardHeader>
                <CardTitle className="text-lg text-gray-800 font-semibold">Receitas para hoje, dia {new Date().getDate()}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center text-center text-gray-600 py-8">
                <DollarSign className="w-16 h-16 mb-4 text-gray-400" />
                <p>Nenhuma receita para o dia de hoje.</p>
                <div className="flex gap-2 mt-6">
                    <Badge className="bg-red-500 text-white hover:bg-red-600">23 atrasada(s)</Badge>
                    <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">0 para o dia de hoje</Badge>
                </div>
            </CardContent>
        </Card>

        <Card className="h-fit">
            <CardHeader>
                <CardTitle className="text-lg text-gray-800 font-semibold">Despesas para hoje, dia {new Date().getDate()}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center text-center text-gray-600 py-8">
                <DollarSign className="w-16 h-16 mb-4 text-gray-400" />
                <p>Nenhuma despesa para o dia de hoje.</p>
                <div className="flex gap-2 mt-6">
                    <Badge className="bg-red-500 text-white hover:bg-red-600">157 atrasada(s)</Badge>
                    <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">0 para o dia de hoje</Badge>
                </div>
            </CardContent>
        </Card>
      </div>
      
      <Button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600"
        size="icon"
      >
        <MessageSquare className="h-7 w-7" />
        <span className="sr-only">Chat</span>
      </Button>
    </div>
  );
}

    

    

