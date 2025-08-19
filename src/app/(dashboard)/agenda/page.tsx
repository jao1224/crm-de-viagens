import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockAppointments } from "@/lib/mock-data";
import type { Appointment } from "@/lib/types";
import { Users, User, Briefcase } from 'lucide-react';

const AppointmentItem = ({ appointment }: { appointment: Appointment }) => (
  <div className="flex items-start gap-4 p-3 hover:bg-muted/50 rounded-lg transition-colors">
     <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
      {appointment.type === 'client' && <User className="h-5 w-5" />}
      {appointment.type === 'team' && <Users className="h-5 w-5" />}
      {appointment.type === 'provider' && <Briefcase className="h-5 w-5" />}
    </div>
    <div className="flex-1">
      <p className="font-semibold">{appointment.title}</p>
      <p className="text-sm text-muted-foreground">{appointment.time}</p>
      <p className="text-xs text-muted-foreground mt-1">Participantes: {appointment.attendees.join(', ')}</p>
    </div>
  </div>
);


export default function AgendaPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardContent className="p-2 md:p-6">
            <Calendar
              mode="single"
              selected={new Date()}
              className="rounded-md"
            />
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="font-headline text-primary">Compromissos</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="client" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="client">Clientes</TabsTrigger>
                    <TabsTrigger value="team">Equipe</TabsTrigger>
                    <TabsTrigger value="provider">Fornecedores</TabsTrigger>
                </TabsList>
                <div className="mt-4 max-h-[450px] overflow-y-auto pr-2">
                    <TabsContent value="client">
                        {mockAppointments.filter(a => a.type === 'client').map(app => <AppointmentItem key={app.id} appointment={app} />)}
                    </TabsContent>
                    <TabsContent value="team">
                        {mockAppointments.filter(a => a.type === 'team').map(app => <AppointmentItem key={app.id} appointment={app} />)}
                    </TabsContent>
                    <TabsContent value="provider">
                        {mockAppointments.filter(a => a.type === 'provider').map(app => <AppointmentItem key={app.id} appointment={app} />)}
                    </TabsContent>
                </div>
                </Tabs>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
