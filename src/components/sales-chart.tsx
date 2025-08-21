
'use client';

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import type { Booking } from '@/lib/types';
import type { ChartConfig } from '@/components/ui/chart';
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


interface SalesChartProps {
  data: Booking[];
  config: ChartConfig;
  chartTitle: string;
  chartDescription: string;
  years: number[];
  selectedYear: number;
  onYearChange: (year: string) => void;
  className?: string;
}

export function SalesChart({ data, config, chartTitle, chartDescription, years, selectedYear, onYearChange, className }: SalesChartProps) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="grid gap-1">
                  <CardTitle className="font-headline text-2xl text-primary">{chartTitle}</CardTitle>
                  <CardDescription>{chartDescription}</CardDescription>
              </div>
               <div className="grid gap-1 text-right">
                  <Label htmlFor="year-filter">Filtrar por Ano</Label>
                  <Select value={selectedYear.toString()} onValueChange={onYearChange}>
                    <SelectTrigger className="w-[120px]" id="year-filter">
                        <SelectValue placeholder="Selecione o ano" />
                    </SelectTrigger>
                    <SelectContent>
                        {years.map(year => (
                            <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
              </div>
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
