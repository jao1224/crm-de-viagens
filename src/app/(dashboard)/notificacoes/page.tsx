
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';

const mockNotifications = [
    { date: '23/08/2025', time: '09:00', message: 'Hoje é aniversário do(a) Roseane Gomes Marques' },
    { date: '21/08/2025', time: '14:30', message: 'Realizar o check-in da viagem t196w do(a) Horlange Carvalho Azevedo' },
    { date: '21/08/2025', time: '11:00', message: 'Realizar o check-in da viagem 7xie9 do(a) Kelly Freitas Biagi Tassi' },
    { date: '20/08/2025', time: '18:00', message: 'Realizar o check-in da viagem rpkvs do(a) Ana Beatriz Peres de Lima' },
    { date: '20/08/2025', time: '17:45', message: 'Realizar o check-in da viagem rpkvs do(a) Ana Beatriz Peres de Lima' },
    { date: '20/08/2025', time: '09:00', message: 'Hoje é aniversário do(a) Pedro Gabriel Damásio do Nascimento' },
    { date: '18/08/2025', time: '09:00', message: 'Hoje é aniversário do(a) Suellen Henrique de Moura' },
    { date: '18/08/2025', time: '09:00', message: 'Hoje é aniversário do(a) Gabriela do Nascimento Oliveira Sales Silva' },
    { date: '16/08/2025', time: '10:15', message: 'Realizar o check-in da viagem 73gde do(a) Anderson' },
    { date: '16/08/2025', time: '09:00', message: 'Hoje é aniversário do(a) Liliane Feliciano Rocha' },
    { date: '16/08/2025', time: '09:00', message: 'Hoje é aniversário do(a) Laudenir de Carvalho Fonte' },
    { date: '15/08/2025', time: '09:00', message: 'Hoje é aniversário do(a) ANA PRISCILA PEREIRA CARVALHO' },
    { date: '13/08/2025', time: '16:00', message: 'Realizar o check-in da viagem 1luie do(a) Emanuel José Carvalho Fortes' },
    { date: '13/08/2025', time: '16:00', message: 'Realizar o check-in da viagem 1cb0t do(a) Pedro Vieira Lopes' },
];

export default function NotificacoesPage() {
    const [startDate, setStartDate] = React.useState<Date | undefined>(new Date(2025, 4, 23));
    const [endDate, setEndDate] = React.useState<Date | undefined>(new Date(2025, 7, 23));
    
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-primary">Notificações</h1>
            </header>

            <Card>
                <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr,1fr,1fr,1fr,auto] gap-4 items-end">
                        <div className="space-y-1.5">
                            <Label>Data Inicial</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !startDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {startDate ? format(startDate, "dd/MM/yyyy") : <span>Escolha uma data</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={startDate}
                                        onSelect={setStartDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="space-y-1.5">
                            <Label>Data Final</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !endDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {endDate ? format(endDate, "dd/MM/yyyy") : <span>Escolha uma data</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={endDate}
                                        onSelect={setEndDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="space-y-1.5">
                            <Label>Tipo</Label>
                            <Select defaultValue="todos">
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="todos">Todos</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1.5">
                            <Label>Registros</Label>
                            <Select defaultValue="100">
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="100">100</SelectItem>
                                    <SelectItem value="200">200</SelectItem>
                                    <SelectItem value="500">500</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button>Pesquisar</Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px]">Data e Hora</TableHead>
                                <TableHead>Notificação</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockNotifications.map((notification, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{notification.date} às {notification.time}</TableCell>
                                    <TableCell>{notification.message}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
