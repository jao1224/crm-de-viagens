
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
      <div className="bg-white/90 p-2 border border-gray-200 rounded-md shadow-lg backdrop-blur-sm dark:bg-gray-800/90 dark:border-gray-700">
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
    const [activeChart, setActiveChart] = React.useState<'budget' | 'approval'>('approval');
    
    const chartData = budgetChartData[activeChart];
    const chartTitle = activeChart === 'budget' ? 'Orçamentos' : 'Índice de Aprovação';
    
  return (
    <div className="relative p-4 sm:p-6 space-y-6">
      
      {/* Filtros de Período - Centralizados e alinhados */}
      <div className="flex justify-center">
        <div className="flex flex-wrap gap-1 bg-gray-50 p-1 rounded-lg">
          {['Dia', 'Semana', 'Mês', 'Ano', 'Total', 'Personalizado'].map(filter => (
              <Button 
                  key={filter} 
                  variant={activeFilter === filter ? 'default' : 'outline'}
                  size="sm"
                  className={`text-xs h-8 px-3 ${activeFilter === filter ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => setActiveFilter(filter)}
              >
                  {filter}
              </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
        
        {/* Coluna da Esquerda - Índice de Aprovação */}
        <div className="flex flex-col gap-6">
          <Card className="h-fit">
              <CardHeader>
                  <CardTitle className="text-lg text-primary font-semibold">{chartTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="w-full h-[250px] flex items-center justify-center gap-6">
                      <div className="flex-1 h-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie 
                                    data={chartData}
                                    dataKey="value" 
                                    nameKey="name" 
                                    cx="50%" 
                                    cy="50%" 
                                    outerRadius={90} 
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
                      <div className="w-48 space-y-3 pl-4">
                          <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-green-500"></div>
                              <span className="text-sm font-medium">Aprovado</span>
                          </div>
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
                  
                  {/* Indicadores de paginação */}
                  <div className="flex justify-center gap-2 mt-4">
                      <div className="w-8 h-1.5 bg-gray-300 rounded-full"></div>
                      <div className="w-8 h-1.5 bg-gray-800 rounded-full"></div>
                      <div className="w-8 h-1.5 bg-gray-300 rounded-full"></div>
                      <div className="w-8 h-1.5 bg-gray-300 rounded-full"></div>
                  </div>
              </CardContent>
          </Card>
        </div>

        {/* Coluna da Direita - Top 10 Clientes */}
        <div className="flex flex-col gap-6">
          <Card className="h-fit">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <CardTitle className="text-lg text-primary font-semibold">Top 10 Clientes</CardTitle>
                    <div className="flex items-center border border-primary rounded-md p-0.5 bg-gray-50">
                          <Button 
                              size="sm"
                              className={`text-xs h-8 px-3 ${topClientsFilter === 'Faturamento' ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-transparent text-primary hover:bg-primary/10'}`}
                              onClick={() => setTopClientsFilter('Faturamento')}
                          >
                              Faturamento
                          </Button>
                          <Button 
                              size="sm"
                              className={`text-xs h-8 px-3 ${topClientsFilter === 'Lucro' ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-transparent text-primary hover:bg-primary/10'}`}
                              onClick={() => setTopClientsFilter('Lucro')}
                          >
                              Lucro
                          </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center py-1">
                            <span className="font-medium">1) Aneline de Albuquerque Linhares</span> 
                            <span className="font-semibold text-right">
                                1 venda(s) <span className="ml-4 text-primary">23.766,18</span>
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-1">
                            <span className="font-medium">2) JULIO VENANCIO MENEZES</span> 
                            <span className="font-semibold text-right">
                                1 venda(s) <span className="ml-4 text-primary">18.540,00</span>
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-1">
                            <span className="font-medium">3) Lidiane da Silva Seidenfuhss</span> 
                            <span className="font-semibold text-right">
                                1 venda(s) <span className="ml-4 text-primary">11.400,00</span>
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-1">
                            <span className="font-medium">4) Davi William da Silveira de Campos</span> 
                            <span className="font-semibold text-right">
                                1 venda(s) <span className="ml-4 text-primary">8.700,00</span>
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-1">
                            <span className="font-medium">5) Maria Brandão Silva Gaspar</span> 
                            <span className="font-semibold text-right">
                                1 venda(s) <span className="ml-4 text-primary">4.800,00</span>
                            </span>
                        </div>
                    </div>
                    
                    {/* Indicadores de paginação */}
                    <div className="flex justify-center gap-2 mt-6">
                        <div className="w-8 h-1.5 bg-gray-800 rounded-full"></div>
                        <div className="w-8 h-1.5 bg-gray-300 rounded-full"></div>
                        <div className="w-8 h-1.5 bg-gray-300 rounded-full"></div>
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
