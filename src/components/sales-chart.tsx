
'use client';

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import type { Booking } from '@/lib/types';
import type { ChartConfig } from '@/components/ui/chart';
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { DateRange } from "react-day-picker";
import { ptBR } from 'date-fns/locale';


interface SalesChartProps {
  data: Booking[];
  config: ChartConfig;
  chartTitle: string;
  chartDescription: string;
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  className?: string;
}

export function SalesChart({ data, config, chartTitle, chartDescription, dateRange, onDateRangeChange, className }: SalesChartProps) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="grid gap-1">
                <CardTitle className="font-headline text-2xl text-primary">{chartTitle}</CardTitle>
                <CardDescription>{chartDescription}</CardDescription>
            </div>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                        "w-full sm:w-[260px] justify-start text-left font-normal",
                        !dateRange && "text-muted-foreground"
                    )}
                    >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                        dateRange.to ? (
                        <>
                            {format(dateRange.from, "LLL dd, y", { locale: ptBR })} -{" "}
                            {format(dateRange.to, "LLL dd, y", { locale: ptBR })}
                        </>
                        ) : (
                        format(dateRange.from, "LLL dd, y", { locale: ptBR })
                        )
                    ) : (
                        <span>Escolha um período</span>
                    )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={onDateRangeChange}
                    numberOfMonths={2}
                    locale={ptBR}
                    />
                </PopoverContent>
            </Popover>
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
