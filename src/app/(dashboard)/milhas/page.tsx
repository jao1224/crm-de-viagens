
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Filter, MoreHorizontal, Search, FileText, BarChart2 } from 'lucide-react';
import type { DateRange } from 'react-day-picker';

export default function MilhasPage() {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(2025, 6, 24),
        to: new Date(2025, 7, 23),
    });

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-primary">Milhas</h1>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            Exportar CSV
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <BarChart2 className="mr-2 h-4 w-4" />
                            Configurar painel
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>

            <Card>
                <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr,1fr,2fr,auto] gap-4 items-end">
                        <div className="space-y-2">
                            <Label htmlFor="fornecedor">Fornecedor</Label>
                            <Select>
                                <SelectTrigger id="fornecedor">
                                    <SelectValue placeholder="Todos" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="todos">Todos</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="programa">Programa</Label>
                            <Select>
                                <SelectTrigger id="programa">
                                    <SelectValue placeholder="Todos" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="todos">Todos</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Período</Label>
                            <div className="flex items-center gap-2">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            id="date-from"
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !date?.from && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date?.from ? format(date.from, "dd/MM/yyyy") : <span>Data de início</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            initialFocus
                                            mode="single"
                                            selected={date?.from}
                                            onSelect={(day) => setDate(prev => ({ ...prev, from: day }))}
                                        />
                                    </PopoverContent>
                                </Popover>
                                <span className="text-muted-foreground">até</span>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            id="date-to"
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !date?.to && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date?.to ? format(date.to, "dd/MM/yyyy") : <span>Data de fim</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="end">
                                        <Calendar
                                            initialFocus
                                            mode="single"
                                            selected={date?.to}
                                            onSelect={(day) => setDate(prev => ({ ...prev, to: day }))}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="icon">
                                <Filter className="h-4 w-4" />
                            </Button>
                            <Button>Pesquisar</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="h-96">
                <CardContent className="h-full flex flex-col items-center justify-center text-center text-muted-foreground p-6">
                    <Search className="h-12 w-12 mb-4 text-primary/30" />
                    <p className="text-lg font-medium">Não há registros a serem exibidos aqui</p>
                </CardContent>
            </Card>

        </div>
    );
}
