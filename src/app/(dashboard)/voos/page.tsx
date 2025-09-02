
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
import { Calendar as CalendarIcon, Filter, ShieldCheck, Pencil, MessageSquare, Clock, Bell, Link as LinkIcon, Plane, Printer, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, isPast, isToday, isFuture, differenceInDays, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { DateRange } from 'react-day-picker';
import { mockFlights } from '@/lib/mock-data';
import type { Flight } from '@/lib/types';


const FlightStatus = ({ status }: { status: Flight['status'] }) => {
    const statusConfig = {
        'check-in-open': { icon: Clock, text: 'Em Período de Check-in', className: 'bg-red-100 text-red-800 border-red-200' },
        'notify-check-in': { icon: Bell, text: 'Notificar Check-in 48h', className: 'bg-blue-100 text-blue-800 border-blue-200' },
        'completed': { icon: Plane, text: 'Voo Realizado', className: 'bg-gray-100 text-gray-800 border-gray-200' },
        'scheduled': { icon: CalendarIcon, text: 'Agendado', className: 'bg-green-100 text-green-800 border-green-200' },
    };
    const config = statusConfig[status];
    const Icon = config.icon;

    return (
        <div className="flex flex-col items-start gap-2">
            <Badge className={cn("text-sm font-medium", config.className)}>
                <Icon className="mr-2 h-4 w-4" />
                {config.text}
            </Badge>
             <Button variant="link" size="sm" className="text-muted-foreground h-auto p-0">
                <LinkIcon className="mr-1.5 h-3 w-3" />
                Link para check-in
            </Button>
        </div>
    );
}

const FlightCard = ({ flight, onConfirmClick }: { flight: Flight, onConfirmClick: (flight: Flight) => void }) => (
    <div className="flex items-start gap-4">
       <div className="relative pt-1.5">
            <div className="absolute left-1/2 -translate-x-1/2 top-5 -bottom-4 w-px bg-border -z-10 h-full"></div>
            <div className={cn(
                "h-4 w-4 rounded-full border-2 z-10",
                isToday(flight.dateTime) ? "bg-yellow-500 border-yellow-700" : isPast(flight.dateTime) ? "bg-gray-400 border-gray-600" : "bg-green-500 border-green-700"
            )}></div>
        </div>
        <div className="flex-1 -mt-1.5 w-full">
            <Card className="mb-4">
                <CardContent className="p-4 grid grid-cols-1 md:grid-cols-[1fr,2fr,2fr,2fr,auto] gap-x-4 gap-y-2 items-center">
                    <div className="font-semibold text-center">
                        <p className="font-bold text-lg">{format(flight.dateTime, 'dd/MM')}</p>
                        <p className="text-muted-foreground font-medium text-sm -mt-1">{format(flight.dateTime, 'HH:mm')}</p>
                    </div>
                    <div>
                        <p className="font-semibold flex items-center gap-1.5">{flight.passengerName} {flight.whatsappIcon && <MessageSquare className="h-4 w-4 text-green-500" />}</p>
                        <p className="text-sm text-muted-foreground">{flight.passengerCount} passageiro(s)</p>
                    </div>
                    <div>
                         <p className="font-semibold">{flight.from} → {flight.to}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Badge variant={flight.flightType === 'Ida' ? 'default' : 'secondary'} className="h-5">{flight.flightType}</Badge>
                            <span>{flight.airline}</span>
                             <span className="font-mono text-xs">• {flight.locator}</span>
                        </div>
                    </div>
                    <div>
                        <FlightStatus status={flight.status} />
                    </div>
                    <div className="flex justify-end items-center gap-1">
                         <Button variant="ghost" size="icon" onClick={() => onConfirmClick(flight)}>
                             <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                         </Button>
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

    const handleConfirmClick = (flight: Flight) => {
        window.open(`/voos/confirmacao/${flight.id}`, '_blank');
    };
    
    const filteredFlights = useMemo(() => {
        const now = new Date();
        now.setHours(0, 0, 0, 0); // Normalize now to the start of the day
        return mockFlights.filter(flight => {
            const flightDate = new Date(flight.dateTime);
            flightDate.setHours(0,0,0,0);
            const daysDiff = differenceInDays(flightDate, now);
            
            if (activeFilter === 'realizados') {
                return isPast(flight.dateTime) && !isToday(flight.dateTime);
            }
            if (activeFilter === 'proximos') {
                return daysDiff >= 0 && daysDiff <= 7;
            }
            if (activeFilter === 'distantes') {
                return daysDiff > 7;
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
                {Object.keys(groupedFlights).map((dateKey) => (
                    <div key={dateKey}>
                        <div className="flex items-center gap-3 mb-4">
                            <h2 className="font-semibold text-lg text-primary">{format(parseISO(dateKey), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</h2>
                            <div className="flex-1 h-px bg-border"></div>
                        </div>
                        <div className="relative">
                            {groupedFlights[dateKey].map(flight => (
                                <FlightCard key={flight.id} flight={flight} onConfirmClick={handleConfirmClick} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
