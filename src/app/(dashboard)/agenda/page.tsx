
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { mockAppointments } from "@/lib/mock-data";
import type { Appointment } from "@/lib/types";
import { Users, Plane, DollarSign, Bell, BadgeInfo, ChevronLeft, ChevronRight, X, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { add, format, getDaysInMonth, startOfMonth, eachDayOfInterval, getDay, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';


const eventIcons: Record<Appointment['type'], React.ReactNode> = {
  meeting: <Users className="h-5 w-5" />,
  departure: <Plane className="h-5 w-5" />,
  payment: <DollarSign className="h-5 w-5" />,
  reminder: <Bell className="h-5 w-5" />,
};

const eventTypeMapping: Record<Appointment['type'], { colorClass: string; borderColorClass: string; label: string }> = {
    meeting: { 
        label: 'Reunião',
        colorClass: 'text-blue-700 bg-blue-500/10 dark:text-blue-400 dark:bg-blue-500/20',
        borderColorClass: 'border-blue-500',
    },
    departure: { 
        label: 'Embarque',
        colorClass: 'text-green-700 bg-green-500/10 dark:text-green-400 dark:bg-green-500/20',
        borderColorClass: 'border-green-500',
    },
    payment: {
        label: 'Pagamento',
        colorClass: 'text-yellow-700 bg-yellow-500/10 dark:text-yellow-400 dark:bg-yellow-500/20',
        borderColorClass: 'border-yellow-500',
    },
    reminder: {
        label: 'Lembrete',
        colorClass: 'text-purple-700 bg-purple-500/10 dark:text-purple-400 dark:bg-purple-500/20',
        borderColorClass: 'border-purple-500',
    },
}

const AppointmentItem = ({ appointment }: { appointment: Appointment }) => {
    const eventDetails = eventTypeMapping[appointment.type];

    return (
        <div className={`flex items-start gap-4 p-4 hover:bg-muted/50 rounded-lg transition-colors border-l-4 ${eventDetails.borderColorClass}`}>
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${eventDetails.colorClass}`}>
            {eventIcons[appointment.type]}
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold">{appointment.title}</p>
                  <span className="text-sm text-muted-foreground">{new Date(appointment.date).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="space-y-1 text-sm">
                <p className="text-muted-foreground">
                    Cliente: <span className="font-medium text-foreground">{appointment.customer}</span>
                </p>
                <p className="text-muted-foreground">
                    Pacote: <span className="font-medium text-foreground">{appointment.package}</span>
                </p>
              </div>
            </div>
        </div>
    );
};

const NewTaskDialog = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => {
    const [date, setDate] = React.useState<Date | undefined>(new Date(2025, 7, 23));
    
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[650px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-foreground">Tarefa</DialogTitle>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="task-type">Tipo de tarefa</Label>
                            <Select defaultValue="tarefa">
                                <SelectTrigger id="task-type">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="tarefa">Tarefa</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="assignee">Responsável <span className="text-destructive">*</span></Label>
                            <Select defaultValue="maxshuell">
                                <SelectTrigger id="assignee">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="maxshuell">Maxshuell</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="date">Data <span className="text-destructive">*</span></Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "dd/MM/yyyy") : <span>Escolha uma data</span>}
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                    locale={ptBR}
                                />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="time">Hora <span className="text-destructive">*</span></Label>
                             <div className="relative">
                                <Input id="time" type="time" defaultValue="12:00" className="pr-8"/>
                                <Clock className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="subject">Assunto <span className="text-destructive">*</span></Label>
                        <Input id="subject" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Descrição</Label>
                        <Textarea id="description" rows={4} />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch id="recorrente" />
                        <Label htmlFor="recorrente">Tarefa recorrente</Label>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="attachment">Anexo</Label>
                         <div className="flex items-center gap-2">
                            <Input id="attachment" type="file" className="hidden" />
                            <Button asChild variant="outline">
                                <label htmlFor="attachment" className="cursor-pointer">Escolher Arquivo</label>
                            </Button>
                            <span className="text-sm text-muted-foreground">Nenhum arquivo escolhido</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Imagens, PDF e arquivos de textos de até 5MB</p>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                    <Button type="submit">Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


const calendarFilters = ["Tarefas", "Aniversários", "Voos", "Hospedagens", "Transportes", "Experiências Turísticas", "Cruzeiros"];
const viewFilters = ["Mês", "Semana", "Dia", "Lista"];

const FullCalendar = ({ onNewTaskClick }: { onNewTaskClick: () => void }) => {
    const [currentDate, setCurrentDate] = React.useState(new Date(2025, 7, 1)); // Agosto de 2025
    const [activeView, setActiveView] = React.useState('Mês');

    const firstDayOfMonth = startOfMonth(currentDate);
    const daysInMonth = eachDayOfInterval({
        start: firstDayOfMonth,
        end: new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth() + 1, 0)
    });

    const startingDayIndex = getDay(firstDayOfMonth);

    const appointmentsByDate = React.useMemo(() => {
        const grouped: { [key: string]: Appointment[] } = {};
        mockAppointments.forEach(app => {
            const dateKey = format(new Date(app.date), 'yyyy-MM-dd');
            if (!grouped[dateKey]) {
                grouped[dateKey] = [];
            }
            grouped[dateKey].push(app);
        });
        return grouped;
    }, []);

    const changeMonth = (amount: number) => {
        setCurrentDate(prev => add(prev, { months: amount }));
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <CardTitle className="font-headline text-primary">Calendário</CardTitle>
                    <div className="flex flex-wrap items-center gap-2">
                        {calendarFilters.map(filter => (
                            <Button key={filter} variant={filter === 'Voos' ? 'default' : 'outline'} size="sm">
                                {filter}
                            </Button>
                        ))}
                         <Button variant="default" size="sm" onClick={onNewTaskClick}>Nova Tarefa</Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={() => changeMonth(-1)}>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" onClick={() => setCurrentDate(new Date())}>Hoje</Button>
                        <Button variant="outline" size="icon" onClick={() => changeMonth(1)}>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                        <h2 className="text-xl font-semibold text-foreground capitalize">
                            {format(currentDate, 'MMMM \'de\' yyyy', { locale: ptBR })}
                        </h2>
                    </div>
                    <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
                         {viewFilters.map(filter => (
                            <Button 
                                key={filter} 
                                variant={activeView === filter ? 'default' : 'ghost'} 
                                size="sm" 
                                className="h-8 px-3"
                                onClick={() => setActiveView(filter)}
                            >
                                {filter}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 border-t border-l border-border">
                    {['dom.', 'seg.', 'ter.', 'qua.', 'qui.', 'sex.', 'sáb.'].map(day => (
                        <div key={day} className="p-2 text-center font-medium text-muted-foreground text-sm border-r border-b border-border">
                            {day}
                        </div>
                    ))}
                    
                    {Array.from({ length: startingDayIndex }).map((_, i) => (
                        <div key={`empty-${i}`} className="h-32 border-r border-b border-border bg-muted/30"></div>
                    ))}

                    {daysInMonth.map(day => {
                        const dateKey = format(day, 'yyyy-MM-dd');
                        const dayAppointments = appointmentsByDate[dateKey] || [];

                        return (
                            <div key={day.toString()} className="h-32 p-1.5 border-r border-b border-border relative flex flex-col gap-1 overflow-hidden">
                                <span className={cn(
                                    "font-semibold text-sm",
                                    isToday(day) ? "bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center" : "text-foreground"
                                )}>
                                    {format(day, 'd')}
                                </span>
                                <div className="space-y-1 overflow-y-auto">
                                    {dayAppointments.map(app => {
                                        const eventDetails = eventTypeMapping[app.type];
                                        return (
                                            <div key={app.id} className={cn(
                                                "text-xs p-1 rounded-md text-white overflow-hidden text-ellipsis whitespace-nowrap",
                                                eventDetails.borderColorClass.replace('border-', 'bg-') // Simplified color
                                            )}>
                                                <span className="font-bold">{new Date(app.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span> {app.title}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}

export default function AgendaPage() {
    const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = React.useState(false);
    const sortedAppointments = [...mockAppointments].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const upcomingAppointments = sortedAppointments.filter(a => new Date(a.date) >= new Date());

  return (
    <div className="space-y-6">
        <FullCalendar onNewTaskClick={() => setIsNewTaskDialogOpen(true)} />

        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-primary">Próximos Eventos</CardTitle>
                <CardDescription>Seus compromissos e lembretes importantes.</CardDescription>
            </CardHeader>
            <CardContent className="max-h-[500px] overflow-y-auto pr-2">
                <div className="space-y-4">
                    {upcomingAppointments.length > 0 ? (
                        upcomingAppointments.map(app => <AppointmentItem key={app.id} appointment={app} />)
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center p-8 text-muted-foreground h-full">
                            <BadgeInfo className="w-10 h-10 mb-4" />
                            <p>Nenhum compromisso futuro agendado.</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>

        <NewTaskDialog open={isNewTaskDialogOpen} onOpenChange={setIsNewTaskDialogOpen} />
    </div>
  );
}

    