'use client';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { mockSalesData } from '@/lib/mock-data';

export function SalesChart() {
  const chartConfig = {
    repasse: { label: 'Repasse', color: 'hsl(var(--chart-3))' },
    novo: { label: 'Novo', color: 'hsl(var(--chart-1))' },
    usado: { label: 'Usado', color: 'hsl(var(--chart-2))' },
  }

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-primary">Performance de Vendas</CardTitle>
        <CardDescription>Vendas por tipo de imóvel nos últimos 6 meses.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart data={mockSalesData} accessibilityLayer>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis />
              <Tooltip cursor={{fill: 'hsl(var(--background))'}} content={<ChartTooltipContent />} />
              <Bar dataKey="repasse" fill="var(--color-repasse)" radius={4} />
              <Bar dataKey="novo" fill="var(--color-novo)" radius={4} />
              <Bar dataKey="usado" fill="var(--color-usado)" radius={4} />
            </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
