import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { mockAppointments } from "@/lib/mock-data";
import type { Appointment } from "@/lib/types";
import { Users, Plane, DollarSign, Bell, BadgeInfo } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const eventIcons = {
  meeting: <Users className="h-5 w-5" />,
  departure: <Plane className="h-5 w-5" />,
  payment: <DollarSign className="h-5 w-5" />,
  reminder: <Bell className="h-5 w-5" />,
};

const eventColors: Record<Appointment['type'], string> = {
    meeting: 'bg-blue-500/10 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
    departure: 'bg-green-500/10 text-green-700 dark:bg-green-500/20 dark:text-green-400',
    payment: 'bg-yellow-500/10 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400',
    reminder: 'bg-purple-500/10 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400',
}

const AppointmentItem = ({ appointment }: { appointment: Appointment }) => (
  <div className="flex items-start gap-4 p-3 hover:bg-muted/50 rounded-lg transition-colors border-l-4" style={{borderColor: `hsl(var(--${appointment.type === 'meeting' ? 'primary' : appointment.type === 'departure' ? 'accent' : 'secondary'}))`}}>
     <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${eventColors[appointment.type]}`}>
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


export default function AgendaPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      <div className="lg:col-span-2">
        <Card>
          <CardContent className="p-0">
            <Calendar
              mode="single"
              selected={new Date()}
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
                    {mockAppointments.map(app => <AppointmentItem key={app.id} appointment={app} />)}
                    {mockAppointments.length === 0 && (
                        <div className="flex flex-col items-center justify-center text-center p-8 text-muted-foreground">
                            <BadgeInfo className="w-10 h-10 mb-4" />
                            <p>Nenhum compromisso agendado.</p>
                            <p className="text-xs">Adicione novas reservas para ver seus eventos aqui.</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
