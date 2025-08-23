
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { mockAppointments } from '@/lib/mock-data';
import type { Appointment } from '@/lib/types';


const generateNotificationMessage = (appointment: Appointment): string => {
    switch (appointment.type) {
        case 'birthday':
            return `Hoje é aniversário de ${appointment.customer}.`;
        case 'departure':
        case 'flight':
            return `Lembrete de embarque/voo: ${appointment.title} para ${appointment.customer}.`;
        case 'payment':
            return `Vencimento de pagamento: ${appointment.title} de ${appointment.customer}.`;
        case 'meeting':
            return `Reunião agendada: ${appointment.title} com ${appointment.customer}.`;
        case 'task':
             return `Tarefa pendente: ${appointment.title}.`;
        default:
            return `Lembrete: ${appointment.title} para ${appointment.customer}.`;
    }
};

const notifications = mockAppointments
    .map(app => ({
        date: parseISO(app.date),
        message: generateNotificationMessage(app),
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime());

export default function NotificacoesPage() {
    const [startDate, setStartDate] = React.useState<Date | undefined>(new Date(2025, 4, 23));
    const [endDate, setEndDate] = React.useState<Date | undefined>(new Date(2025, 10, 23));
    
    const filteredNotifications = notifications.filter(notification => {
        const notificationDate = notification.date;
        const start = startDate ? new Date(startDate.setHours(0,0,0,0)) : null;
        const end = endDate ? new Date(endDate.setHours(23,59,59,999)) : null;

        if (start && notificationDate < start) return false;
        if (end && notificationDate > end) return false;
        return true;
    })


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
                                        locale={ptBR}
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
                                        locale={ptBR}
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
                                    <SelectItem value="solicitacao-orcamento">Solicitação Orçamento</SelectItem>
                                    <SelectItem value="check-in">Check-in</SelectItem>
                                    <SelectItem value="aniversarios">Aniversários</SelectItem>
                                    <SelectItem value="tarefas">Tarefas</SelectItem>
                                    <SelectItem value="cadastro-pessoa">Cadastro de Pessoa</SelectItem>
                                    <SelectItem value="nova-avaliacao">Nova Avaliação</SelectItem>
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
                            {filteredNotifications.map((notification, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{format(notification.date, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}</TableCell>
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
