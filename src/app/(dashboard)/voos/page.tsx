
'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Calendar as CalendarIcon, Filter, MoreHorizontal, ShieldCheck, Pencil, MessageSquare, Clock, Bell, Link as LinkIcon, Plane } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, isPast, isToday, isFuture, differenceInDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { DateRange } from 'react-day-picker';

interface Flight {
    id: string;
    passengerName: string;
    passengerCount: number;
    flightCode: string;
    from: string;
    to: string;
    flightType: 'Ida' | 'Volta';
    airline: string;
    locator: string;
    dateTime: Date;
    status: 'check-in-open' | 'notify-check-in' | 'completed' | 'scheduled';
    whatsappIcon?: boolean;
}

const mockFlights: Flight[] = [
    { id: '1', passengerName: 'Leidiane Tamara de Oliveira Milher', passengerCount: 1, flightCode: 'f80at', from: 'Lisboa (LIS)', to: 'São Paulo (VCP)', flightType: 'Ida', airline: 'Azul', locator: 'RLNDMW', dateTime: new Date('2025-09-01T10:00:00'), status: 'check-in-open'},
    { id: '2', passengerName: 'Lyllyan Claudia Rafael de Freitas', passengerCount: 1, flightCode: 'eh23s', from: 'Porto (OPO)', to: 'Lisboa (LIS)', flightType: 'Ida', airline: 'TAP Portugal', locator: 'YQOVEZ', dateTime: new Date('2025-09-01T22:35:00'), status: 'check-in-open', whatsappIcon: true},
    { id: '3', passengerName: 'Zenilda Aparecida Pires', passengerCount: 1, flightCode: 'uiw4h', from: 'Frankfurt (FRA)', to: 'São Paulo (GRU)', flightType: 'Volta', airline: 'LATAM Airlines', locator: 'ABCDEF', dateTime: new Date('2025-09-04T21:30:00'), status: 'notify-check-in'},
    { id: '4', passengerName: 'HANNA VIETRO', passengerCount: 1, flightCode: 'ns6rm', from: 'Fortaleza (FOR)', to: 'São Paulo (GRU)', flightType: 'Ida', airline: 'LATAM Airlines', locator: 'GHIJKL', dateTime: new Date('2025-09-05T04:45:00'), status: 'notify-check-in'},
];


const FlightStatus = ({ status }: { status: Flight['status'] }) => {
    const statusConfig = {
        'check-in-open': { icon: Clock, text: 'Em Período de Check-in', color: 'text-red-600' },
        'notify-check-in': { icon: Bell, text: 'Notificar Check-in 48h', color: 'text-blue-600' },
        'completed': { icon: Plane, text: 'Voo Realizado', color: 'text-gray-600' },
        'scheduled': { icon: CalendarIcon, text: 'Agendado', color: 'text-green-600' },
    };
    const config = statusConfig[status];
    const Icon = config.icon;

    return (
        <div className="flex items-center gap-2">
            <div className={cn("flex items-center text-sm font-medium", config.color)}>
                <Icon className="mr-2 h-4 w-4" />
                <Select defaultValue={status}>
                    <SelectTrigger className="border-0 bg-transparent p-0 h-auto focus:ring-0 focus:ring-offset-0">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="check-in-open">Em Período de Check-in</SelectItem>
                        <SelectItem value="notify-check-in">Notificar Check-in 48h</SelectItem>
                        <SelectItem value="completed">Voo Realizado</SelectItem>
                         <SelectItem value="scheduled">Agendado</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <Button variant="link" size="sm" className="text-muted-foreground h-auto p-0">
                <LinkIcon className="mr-1.5 h-3 w-3" />
                Link para check-in
            </Button>
        </div>
    );
}

const FlightCard = ({ flight }: { flight: Flight }) => (
    <div className="flex items-start gap-4">
        <div className="flex flex-col items-center">
            <div className={cn(
                "h-4 w-4 rounded-full border-2",
                isToday(flight.dateTime) ? "bg-yellow-500 border-yellow-700" : isPast(flight.dateTime) ? "bg-gray-400 border-gray-600" : "bg-green-500 border-green-700"
            )}></div>
            <div className="w-px h-full bg-border flex-1"></div>
        </div>
        <div className="flex-1 -mt-1.5">
            <Card className="mb-4">
                <CardContent className="p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-center">
                    <div className="lg:col-span-1 flex items-center gap-4">
                        <div>
                            <p className="font-bold text-lg">{format(flight.dateTime, 'dd/MM/yyyy')}</p>
                            <p className="text-muted-foreground font-medium text-lg">{format(flight.dateTime, 'HH:mm')}</p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">{flight.flightCode}</Badge>
                    </div>
                    <div className="lg:col-span-1">
                        <p className="font-semibold flex items-center gap-1.5">{flight.passengerName} {flight.whatsappIcon && <MessageSquare className="h-4 w-4 text-green-500" />}</p>
                        <p className="text-sm text-muted-foreground">{flight.passengerCount} passageiro(s)</p>
                    </div>
                    <div className="lg:col-span-1">
                        <p className="font-semibold">{flight.from} → {flight.to}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Badge variant={flight.flightType === 'Ida' ? 'default' : 'secondary'} className="h-5">{flight.flightType}</Badge>
                            <span>{flight.airline}</span>
                             <span className="font-mono text-xs">• {flight.locator}</span>
                        </div>
                    </div>
                    <div className="lg:col-span-1">
                        <FlightStatus status={flight.status} />
                    </div>
                    <div className="lg:col-span-1 flex justify-end items-center gap-2">
                         <Button variant="ghost" size="icon"><ShieldCheck className="h-5 w-5 text-muted-foreground" /></Button>
                         <Button variant="ghost" size="icon"><Pencil className="h-5 w-5 text-muted-foreground" /></Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
);

const groupFlightsByDate = (flights: Flight[]) => {
    return flights.reduce((acc, flight) => {
        const dateKey = format(flight.dateTime, 'yyyy-MM-dd');
        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }
        acc[dateKey].push(flight);
        return acc;
    }, {} as Record<string, Flight[]>);
};

export default function VoosPage() {
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(2025, 7, 31),
        to: new Date(2025, 11, 1),
    });
    const [activeFilter, setActiveFilter] = useState<'realizados' | 'proximos' | 'distantes'>('proximos');
    
    const filteredFlights = useMemo(() => {
        const now = new Date();
        return mockFlights.filter(flight => {
            const daysDiff = differenceInDays(flight.dateTime, now);
            
            if (activeFilter === 'realizados') {
                return isPast(flight.dateTime) && !isToday(flight.dateTime);
            }
            if (activeFilter === 'proximos') {
                return (isToday(flight.dateTime) || isFuture(flight.dateTime)) && daysDiff <= 7;
            }
            if (activeFilter === 'distantes') {
                return isFuture(flight.dateTime) && daysDiff > 7;
            }
            return true;
        }).sort((a,b) => a.dateTime.getTime() - b.dateTime.getTime());
    }, [activeFilter]);
    
    const groupedFlights = groupFlightsByDate(filteredFlights);


    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-primary">Voos</h1>
            </header>

            <Card>
                <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                        <div className="space-y-1.5">
                            <Label>Cliente</Label>
                            <Select>
                                <SelectTrigger><SelectValue placeholder="Todos" /></SelectTrigger>
                                <SelectContent></SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1.5 lg:col-span-2">
                             <Label>Embarque</Label>
                              <div className="flex items-center gap-2">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            id="date-from"
                                            variant={"outline"}
                                            className={cn("w-full justify-start text-left font-normal", !date?.from && "text-muted-foreground")}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date?.from ? format(date.from, "dd/MM/yyyy") : <span>Início</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar initialFocus mode="single" selected={date?.from} onSelect={(day) => setDate(prev => ({ ...prev, from: day }))} />
                                    </PopoverContent>
                                </Popover>
                                <span className="text-muted-foreground">até</span>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            id="date-to"
                                            variant={"outline"}
                                            className={cn("w-full justify-start text-left font-normal", !date?.to && "text-muted-foreground")}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date?.to ? format(date.to, "dd/MM/yyyy") : <span>Fim</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="end">
                                        <Calendar initialFocus mode="single" selected={date?.to} onSelect={(day) => setDate(prev => ({ ...prev, to: day }))} />
                                    </PopoverContent>
                                </Popover>
                              </div>
                        </div>
                        <div className="space-y-1.5">
                            <Label>Situação</Label>
                            <Select>
                                <SelectTrigger><SelectValue placeholder="Todos" /></SelectTrigger>
                                <SelectContent></SelectContent>
                            </Select>
                        </div>
                        <div className="flex gap-2">
                             <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
                             <Button className="flex-1">Pesquisar</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end gap-2">
                <Button variant={activeFilter === 'realizados' ? 'default' : 'outline'} onClick={() => setActiveFilter('realizados')}>Voos Realizados</Button>
                <Button variant={activeFilter === 'proximos' ? 'default' : 'outline'} className={activeFilter === 'proximos' ? 'bg-yellow-500 text-white' : ''} onClick={() => setActiveFilter('proximos')}>Voos Próximos</Button>
                <Button variant={activeFilter === 'distantes' ? 'default' : 'outline'} className={activeFilter === 'distantes' ? 'bg-green-600 text-white' : ''} onClick={() => setActiveFilter('distantes')}>Voos Distantes</Button>
            </div>
            
            <div className="space-y-6">
                {Object.keys(groupedFlights).map(dateKey => (
                    <div key={dateKey}>
                        <div className="flex items-center gap-3 mb-4">
                            <h2 className="font-semibold text-lg text-primary">{format(new Date(dateKey), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</h2>
                            <div className="flex-1 h-px bg-border"></div>
                        </div>
                        <div className="relative">
                             <div className="absolute left-1.5 top-0 bottom-0 w-px bg-border"></div>
                            {groupedFlights[dateKey].map(flight => (
                                <FlightCard key={flight.id} flight={flight} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>


        </div>
    );
}
