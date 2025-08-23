
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import type { DateRange } from 'react-day-picker';

const mockTasks = [
    {
        id: '1',
        date: new Date(2025, 7, 14, 12, 0), // Note: month is 0-indexed, so 7 is August
        assignee: {
            name: 'Ana',
            avatarUrl: 'https://i.pinimg.com/736x/a2/3c/9f/a23c9f18b0d355639f041530c345129c.jpg'
        },
        quoteId: '1cb0t',
        type: 'Tarefa',
        description: 'Volta combinada',
        status: 'aguardando',
        priority: 'overdue'
    },
];

type TaskStatus = 'overdue' | 'today' | 'on-time' | 'completed';
const statusFilters: { label: string; value: TaskStatus, color: string }[] = [
    { label: 'Atrasadas', value: 'overdue', color: 'bg-red-500 hover:bg-red-600' },
    { label: 'Para o dia', value: 'today', color: 'bg-yellow-500 hover:bg-yellow-600' },
    { label: 'No prazo', value: 'on-time', color: 'bg-blue-500 hover:bg-blue-600' },
    { label: 'Concluídas', value: 'completed', color: 'bg-green-600 hover:bg-green-700' },
]

export default function TarefasPage() {
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
        from: new Date(2025, 7, 8),
        to: new Date(2025, 8, 22),
    });
    const [activeStatusFilter, setActiveStatusFilter] = React.useState<TaskStatus>('overdue');

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-primary">Tarefas</h1>
                <Button>Nova</Button>
            </header>

            <Card>
                <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
                        <div className="space-y-1.5 lg:col-span-1">
                            <label className="text-sm font-medium text-muted-foreground px-1">Descrição</label>
                            <Input placeholder="Buscar pela descrição" />
                        </div>
                        <div className="space-y-1.5 lg:col-span-2">
                             <label className="text-sm font-medium text-muted-foreground px-1">Período</label>
                             <div className="flex items-center gap-2">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !dateRange?.from && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {dateRange?.from ? format(dateRange.from, "dd/MM/yyyy") : <span>Início</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={dateRange?.from}
                                            onSelect={(day) => setDateRange(prev => ({ ...prev, from: day }))}
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
                                                !dateRange?.to && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {dateRange?.to ? format(dateRange.to, "dd/MM/yyyy") : <span>Fim</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={dateRange?.to}
                                            onSelect={(day) => setDateRange(prev => ({ ...prev, to: day }))}
                                            locale={ptBR}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                             </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-muted-foreground px-1">Situação</label>
                            <Select defaultValue="aguardando">
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="aguardando">Aguardando</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-muted-foreground px-1">Tarefa</label>
                            <Select defaultValue="todas">
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="todas">Todas as Tarefas</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex gap-2 items-end">
                            <div className="space-y-1.5 flex-1">
                                <label className="text-sm font-medium text-muted-foreground px-1">Responsável</label>
                                <Select defaultValue="todos">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="todos">Todos</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button className="h-10">Pesquisar</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {statusFilters.map(filter => (
                         <Button 
                            key={filter.value}
                            variant={activeStatusFilter === filter.value ? 'default' : 'outline'}
                            size="sm"
                            className={cn(
                                'transition-all',
                                activeStatusFilter === filter.value && `${filter.color} text-white`
                            )}
                            onClick={() => setActiveStatusFilter(filter.value)}
                         >
                            {filter.label}
                         </Button>
                    ))}
                </div>
            </div>

            <div className="space-y-3">
                {mockTasks.map(task => (
                    <Card key={task.id}>
                        <CardContent className="p-4 grid grid-cols-[auto,1fr,auto] items-center gap-4">
                            <div className="flex items-center gap-3">
                                <div className={cn(
                                    "w-3 h-3 rounded-full", 
                                    task.priority === 'overdue' ? 'bg-red-500' : 'bg-gray-400'
                                )}></div>
                                <div>
                                    <p className="font-bold text-lg text-foreground">{format(task.date, 'dd/MM/yyyy')}</p>
                                    <p className="text-sm text-muted-foreground">{format(task.date, 'HH:mm')}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={task.assignee.avatarUrl} alt={task.assignee.name} />
                                    <AvatarFallback>{task.assignee.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <Badge variant="secondary" className="font-mono">{task.quoteId}</Badge>
                                        <Badge variant="outline">{task.type}</Badge>
                                    </div>
                                    <p className="text-foreground font-medium">{task.description}</p>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Badge variant="outline" className="text-muted-foreground">
                                    <Clock className="mr-1.5 h-3 w-3" />
                                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="flex justify-end">
                <Button size="icon">1</Button>
            </div>

        </div>
    );
}

    