
'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import type { Booking } from '@/lib/types';
import type { ChartConfig } from '@/components/ui/chart';

interface SalesChartProps {
  data: Booking[];
  config: ChartConfig;
}

export function SalesChart({ data, config }: SalesChartProps) {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-primary">Performance de Vendas</CardTitle>
        <CardDescription>Vendas por tipo de pacote nos últimos 6 meses.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="h-[300px] w-full">
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
              <ChartLegend content={<ChartLegendContent />} />
              {Object.keys(config).map((key) => (
                 <Bar key={key} dataKey={key} fill={`var(--color-${key})`} radius={4} />
              ))}
            </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
