
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarIcon, GripVertical } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { DateRange } from 'react-day-picker';
import { Badge } from '@/components/ui/badge';

const mockData = [
    { location: "Lisboa (LIS)", count: 16 },
    { location: "Fortaleza (FOR)", count: 8 },
    { location: "São Paulo (VCP)", count: 8 },
    { location: "São Paulo (GRU)", count: 7 },
    { location: "Belo Horizonte (CNF)", count: 6 },
    { location: "Recife (REC)", count: 3 },
    { location: "Vitória (VIX)", count: 3 },
    { location: "Rio De Janeiro (GIG)", count: 2 },
    { location: "Belem (BEL)", count: 2 },
];

export default function OrigensDestinosPage() {
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(2025, 5, 4),
        to: new Date(2025, 8, 2),
    });

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-primary">Principais Origens/Destinos</h1>
            </header>

            <Card>
                <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                        <div className="space-y-1.5">
                            <Label>Cliente</Label>
                            <Select defaultValue="todos">
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="todos">Todos</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1.5 lg:col-span-2">
                             <Label>Período da Cotação</Label>
                             <div className="flex items-center gap-2">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !date?.from && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date?.from ? format(date.from, "dd/MM/yyyy") : <span>Início</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={date?.from}
                                            onSelect={(day) => setDate(prev => ({ ...prev, from: day }))}
                                            locale={ptBR}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <span className="text-muted-foreground">até</span>
                                 <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !date?.to && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date?.to ? format(date.to, "dd/MM/yyyy") : <span>Fim</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={date?.to}
                                            onSelect={(day) => setDate(prev => ({ ...prev, to: day }))}
                                            locale={ptBR}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                             </div>
                        </div>
                         <div className="space-y-1.5">
                            <Label>Voo</Label>
                            <Select defaultValue="origem">
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="origem">Origem</SelectItem>
                                    <SelectItem value="destino">Destino</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-1.5">
                            <Label>Situação</Label>
                            <Select defaultValue="todos">
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="todos">Todos</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button>Pesquisar</Button>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-2">
                {mockData.map((item, index) => (
                    <Card key={index}>
                        <CardContent className="p-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <GripVertical className="h-5 w-5 text-muted-foreground" />
                                <span className="font-medium text-foreground">{item.location}</span>
                            </div>
                            <Badge variant="default" className="text-sm">{item.count}</Badge>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
