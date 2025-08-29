
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, ComposedChart } from 'recharts';


const chartData = [
  { month: '02/2025', receita: 180000, despesa: 140000, lucro: 40000 },
  { month: '03/2025', receita: 290000, despesa: 210000, lucro: 80000 },
  { month: '04/2025', receita: 470000, despesa: 330000, lucro: 140000 },
  { month: '05/2025', receita: 435000, despesa: 305000, lucro: 130000 },
  { month: '06/2025', receita: 450000, despesa: 345000, lucro: 105000 },
  { month: '07/2025', receita: 170000, despesa: 145000, lucro: 25000 },
  { month: '08/2025', receita: 70000, despesa: 60000, lucro: 10000 },
];

export default function ReceitaDespesaPage() {
    const [startDate, setStartDate] = React.useState<Date | undefined>(new Date(2025, 0, 1));
    const [endDate, setEndDate] = React.useState<Date | undefined>(new Date(2025, 11, 31));

    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-BR');
    };

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
            <div className="bg-background/90 p-3 border border-border rounded-lg shadow-lg">
                <p className="font-bold text-base mb-2">{label}</p>
                {payload.map((pld: any) => (
                     <div key={pld.dataKey} className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: pld.fill || pld.stroke }}></div>
                        <span>{pld.name}:</span>
                        <span className="font-semibold ml-auto">R$ {pld.value.toLocaleString('pt-BR')}</span>
                    </div>
                ))}
            </div>
            );
        }

        return null;
    };


  return (
    <div className="space-y-6">
        <header>
            <h1 className="text-3xl font-bold text-primary">Comparativo de Receita/Despesa</h1>
        </header>

        <Card>
            <CardContent className="p-4 space-y-6">
                 <div className="flex flex-wrap items-end gap-4">
                    <div className="flex-1 min-w-[150px] space-y-2">
                        <Label htmlFor="filter-by">Filtrar por</Label>
                        <Select defaultValue="data-lancamento">
                            <SelectTrigger id="filter-by">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="data-lancamento">Data de Lançamento</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex-1 min-w-[300px] space-y-2">
                        <Label>Período</Label>
                        <div className="flex items-center gap-2">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {startDate ? format(startDate, "dd/MM/yyyy") : <span>Data de início</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar mode="single" selected={startDate} onSelect={setStartDate} locale={ptBR} />
                                </PopoverContent>
                            </Popover>
                            <span className="text-muted-foreground">até</span>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {endDate ? format(endDate, "dd/MM/yyyy") : <span>Data de fim</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar mode="single" selected={endDate} onSelect={setEndDate} locale={ptBR} />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                     <div>
                        <Button>Visualizar</Button>
                    </div>
                </div>

                <div className="h-[450px] w-full pt-4">
                     <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart
                            data={chartData}
                            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="month" tick={{ fontSize: 12 }} dy={10} />
                            <YAxis 
                                tickFormatter={formatCurrency}
                                tick={{ fontSize: 12 }}
                                domain={[0, 500000]}
                                axisLine={false}
                                tickLine={false}
                                label={{ value: 'Valor', angle: -90, position: 'insideLeft', offset: -10, style: { textAnchor: 'middle' } }}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--accent))', opacity: 0.2 }}/>
                            <Legend verticalAlign="bottom" height={36} />
                            <Bar dataKey="receita" name="Receita" fill="#9E7631" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="despesa" name="Despesa" fill="#DC2626" radius={[4, 4, 0, 0]} />
                            <Line type="monotone" dataKey="lucro" name="Lucro" stroke="#22C55E" strokeWidth={3} dot={{ r: 4, fill: '#22C55E' }} activeDot={{ r: 6 }} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
