
'use client';

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import type { Booking } from '@/lib/types';
import type { ChartConfig } from '@/components/ui/chart';
import { cn } from "@/lib/utils";


interface SalesChartProps {
  data: Booking[];
  config: ChartConfig;
  chartTitle: string;
  chartDescription: string;
  className?: string;
}

export function SalesChart({ data, config, chartTitle, chartDescription, className }: SalesChartProps) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
          <div className="grid gap-1">
              <CardTitle className="font-headline text-2xl text-primary">{chartTitle}</CardTitle>
              <CardDescription>{chartDescription}</CardDescription>
          </div>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer config={config} className="h-[300px] w-full">
            <BarChart data={data} accessibilityLayer>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                stroke="#888888"
                fontSize={12}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
                allowDecimals={false}
              />
              <Tooltip cursor={{fill: 'hsl(var(--muted))'}} content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              {Object.keys(config).map((key) => (
                 <Bar key={key} dataKey={key} fill={`var(--color-${key})`} radius={4} stackId="a" />
              ))}
            </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
