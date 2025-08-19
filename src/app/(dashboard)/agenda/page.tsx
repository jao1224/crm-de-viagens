
'use client';

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { mockAppointments } from "@/lib/mock-data";
import type { Appointment } from "@/lib/types";
import { Users, Plane, DollarSign, Bell, BadgeInfo } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import React from 'react';

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
        <div className={`flex items-start gap-4 p-3 hover:bg-muted/50 rounded-lg transition-colors border-l-4 ${eventDetails.borderColorClass}`}>
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${eventDetails.colorClass}`}>
            {eventIcons[appointment.type]}
            </div>
            <div className="flex-1">
            <div className="flex items-center justify-between">
                <p className="font-semibold">{appointment.title}</p>
                <span className="text-xs text-muted-foreground">{appointment.date}</span>
            </div>
            <p className="text-sm text-muted-foreground">
                Cliente: <span className="font-medium text-foreground">{appointment.customer}</span>
            </p>
            <p className="text-sm text-muted-foreground">
                Pacote: <span className="font-medium text-foreground">{appointment.package}</span>
            </p>
            </div>
        </div>
    );
};


export default function AgendaPage() {
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());
    
    // Simple filter logic for demo purposes
    const filteredAppointments = mockAppointments.filter(app => {
        // Here you would parse app.date and compare with selectedDate
        // For this demo, we'll just show all appointments regardless of selected date
        return true;
    });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      <div className="lg:col-span-2">
        <Card>
          <CardContent className="p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="w-full"
            />
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="font-headline text-primary">Próximos Eventos</CardTitle>
                <CardDescription>Seus compromissos e lembretes importantes.</CardDescription>
            </CardHeader>
            <CardContent className="max-h-[500px] overflow-y-auto pr-2">
                <div className="space-y-4">
                    {filteredAppointments.length > 0 ? (
                        filteredAppointments.map(app => <AppointmentItem key={app.id} appointment={app} />)
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center p-8 text-muted-foreground h-full">
                            <BadgeInfo className="w-10 h-10 mb-4" />
                            <p>Nenhum compromisso agendado para esta data.</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
