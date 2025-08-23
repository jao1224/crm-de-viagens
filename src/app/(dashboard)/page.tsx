
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockAppointments } from "@/lib/mock-data";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { ListTodo, Plane, MessageSquare } from 'lucide-react';
import React from "react";
import { cn } from "@/lib/utils";

const budgetChartData = {
    budget: [
        { name: 'Aprovado', value: 75, total: 100, color: 'hsl(var(--chart-1))' },
        { name: 'Aguardando', value: 25, total: 100, color: '#6b7280' },
    ],
    approval: [
        { name: 'Aprovado', value: 100, total: 100, color: 'hsl(var(--chart-1))' },
    ],
};

const flightCodes = ['7xie9', 't196w', 'sn5ey'];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const value = payload[0].value;
    const percentage = data.total ? ((value / data.total) * 100).toFixed(0) : value;
    
    return (
      <div className="bg-white/90 p-2 border border-gray-200 rounded-md shadow-lg backdrop-blur-sm">
        <p className="font-semibold">{data.name}</p>
        <p className="font-bold text-lg">{`${value} (${percentage}%)`}</p>
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
    const [activeFilter, setActiveFilter] = React.useState('Mês');
    const [topClientsFilter, setTopClientsFilter] = React.useState('Faturamento');
    const [activeChart, setActiveChart] = React.useState<'budget' | 'approval'>('budget');

    const chartData = budgetChartData[activeChart];
    const chartTitle = activeChart === 'budget' ? 'Orçamentos' : 'Índice de Aprovação';
    
  return (
    <div className="relative p-4 sm:p-6 space-y-6">
      
      <div className="flex flex-col md:flex-row gap-6">

        {/* Coluna da Esquerda */}
        <div className="flex flex-col gap-6 md:w-1/2">
          {/* Próximos voos */}
          <Card>
              <CardHeader>
                  <CardTitle className="text-base text-primary font-semibold">Próximos voos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                  {mockAppointments.filter(a => a.type === 'departure').slice(0, 3).map((flight, index) => (
                      <div key={flight.id} className="grid grid-cols-[auto,1fr,auto] items-center gap-4">
                          <div className="text-right">
                              <p className="text-sm text-muted-foreground">{new Date(flight.date).toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit', year: 'numeric'})}</p>
                              <p className="text-sm font-semibold">{new Date(flight.date).toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit', timeZone: 'UTC'})}</p>
                          </div>
                          <div>
                              <p className="font-semibold text-sm">{flight.customer}</p>
                              <p className="text-xs text-muted-foreground font-semibold">{flight.package}</p>
                          </div>
                          <div className="flex items-center gap-2">
                              <Plane className="w-4 h-4 text-primary" />
                              <Badge variant="outline" className="text-primary border-primary">{flightCodes[index % flightCodes.length]}</Badge>
                          </div>
                      </div>
                  ))}
                  <div className="flex gap-2">
                      <Badge className="bg-red-500 text-white hover:bg-red-600">2 em período de check-in</Badge>
                      <Badge className="bg-green-500 text-white hover:bg-green-600">46 voo(s) pendente(s)</Badge>
                  </div>
              </CardContent>
          </Card>

          <div className="flex flex-wrap gap-1">
            {['Dia', 'Semana', 'Mês', 'Ano', 'Total', 'Personalizado'].map(filter => (
                <Button 
                    key={filter} 
                    variant={activeFilter === filter ? 'default' : 'outline'}
                    size="sm"
                    className={`text-xs h-8 ${activeFilter === filter ? 'bg-primary text-primary-foreground' : 'bg-white text-gray-700'}`}
                    onClick={() => setActiveFilter(filter)}
                >
                    {filter}
                </Button>
            ))}
          </div>
          
          {/* Orçamentos e Índice de Aprovação Combinados */}
          <Card>
              <CardHeader>
                  <CardTitle className="text-base text-primary font-semibold">{chartTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="w-full h-[200px] flex items-center justify-center gap-4">
                      <div className="flex-1 h-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie 
                                    data={chartData}
                                    dataKey="value" 
                                    nameKey="name" 
                                    cx="50%" 
                                    cy="50%" 
                                    outerRadius={80} 
                                    fill="#8884d8"
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
                      <div className="w-48 space-y-2 pl-4">
                          <button
                              className={cn(
                                  "w-full text-left p-2 rounded-md transition-colors text-sm",
                                  activeChart === 'budget' ? "bg-muted font-semibold" : "hover:bg-muted/50"
                              )}
                              onClick={() => setActiveChart('budget')}
                          >
                              Orçamentos
                          </button>
                          <button
                              className={cn(
                                  "w-full text-left p-2 rounded-md transition-colors text-sm",
                                  activeChart === 'approval' ? "bg-muted font-semibold" : "hover:bg-muted/50"
                              )}
                              onClick={() => setActiveChart('approval')}
                          >
                              Índice de Aprovação
                          </button>
                      </div>
                  </div>
              </CardContent>
          </Card>
        </div>

        {/* Coluna da Direita */}
        <div className="flex flex-col gap-6 md:w-1/2">
          {/* Tarefas para hoje */}
          <Card>
              <CardHeader>
                  <CardTitle className="text-base text-primary font-semibold">Tarefas para hoje, dia {new Date().getDate()}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center text-center text-muted-foreground py-8">
                  <ListTodo className="w-12 h-12 mb-4 text-gray-400" />
                  <p>Você não possui nenhuma tarefa para o dia de hoje.</p>
                  <div className="flex gap-2 mt-6">
                      <Badge className="bg-red-500 text-white hover:bg-red-600">4 atrasada(s)</Badge>
                      <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">0 para o dia de hoje</Badge>
                      <Badge className="bg-green-500 text-white hover:bg-green-600">0 no prazo</Badge>
                  </div>
              </CardContent>
          </Card>

          {/* Top 10 Clientes */}
          <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-base text-primary font-semibold">Top 10 Clientes</CardTitle>
                   <div className="flex items-center border border-primary rounded-md p-0.5">
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
              <CardContent>
                  <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span>1) Aneline de Albuquerque Linhares</span> <span className="font-semibold">1 venda(s) <span className="ml-4">23.766,18</span></span></div>
                      <div className="flex justify-between"><span>2) JULIO VENANCIO MENEZES</span> <span className="font-semibold">1 venda(s) <span className="ml-4">18.540,00</span></span></div>
                      <div className="flex justify-between"><span>3) Lidiane da Silva Seidenfuhss</span> <span className="font-semibold">1 venda(s) <span className="ml-4">11.400,00</span></span></div>
                      <div className="flex justify-between"><span>4) Davi William da Silveira de Campos</span> <span className="font-semibold">1 venda(s) <span className="ml-4">8.700,00</span></span></div>
                      <div className="flex justify-between"><span>5) Maria Brandão Silva Gaspar</span> <span className="font-semibold">1 venda(s) <span className="ml-4">4.800,00</span></span></div>
                  </div>
                    <div className="flex justify-center gap-2 mt-4">
                        <div className="w-10 h-1 bg-gray-800 rounded-full"></div>
                        <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
                        <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
                   </div>
              </CardContent>
          </Card>
        </div>
      </div>
      
      <Button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
        size="icon"
      >
        <MessageSquare className="h-7 w-7" />
        <span className="sr-only">Chat</span>
      </Button>
    </div>
  );
}
