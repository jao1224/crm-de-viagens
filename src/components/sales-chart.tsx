'use client';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import type { Booking } from '@/lib/types';

interface SalesChartProps {
  data: Booking[];
}

export function SalesChart({ data }: SalesChartProps) {
  const chartConfig = {
    praia: { label: 'Praia', color: 'hsl(var(--chart-1))' },
    montanha: { label: 'Montanha', color: 'hsl(var(--chart-2))' },
    cidade: { label: 'Cidade', color: 'hsl(var(--chart-3))' },
  }

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-primary">Performance de Vendas</CardTitle>
        <CardDescription>Vendas por tipo de pacote nos últimos 6 meses.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart data={data} accessibilityLayer>
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
              <Bar dataKey="praia" fill="var(--color-praia)" radius={4} />
              <Bar dataKey="montanha" fill="var(--color-montanha)" radius={4} />
              <Bar dataKey="cidade" fill="var(--color-cidade)" radius={4} />
            </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
