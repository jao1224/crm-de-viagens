
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockAppointments } from "@/lib/mock-data";
import { Plane } from "lucide-react";

export function UpcomingFlightsCard() {
    const upcomingFlights = mockAppointments.filter(a => a.type === 'departure').slice(0, 3);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg font-headline text-primary">Próximos Voos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {upcomingFlights.length > 0 ? (
                    upcomingFlights.map(flight => (
                        <div key={flight.id} className="flex items-center gap-4">
                            <div className="bg-muted rounded-full p-2">
                                <Plane className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="font-semibold text-sm">{flight.customer}</p>
                                <p className="text-xs text-muted-foreground">{flight.package}</p>
                                <p className="text-xs text-muted-foreground">{flight.date}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-muted-foreground">Nenhum voo próximo agendado.</p>
                )}
                 <Button variant="outline" size="sm" className="w-full">Ver todos</Button>
            </CardContent>
        </Card>
    );
}
