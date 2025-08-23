
'use client';
import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockReservations, mockUsers } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function TopClientsCard() {
    const topClients = useMemo(() => {
        const clientTotals: { [key: string]: { name: string; total: number; count: number } } = {};

        mockReservations
            .filter(r => r.status === 'Confirmada')
            .forEach(res => {
                if (!clientTotals[res.customerName]) {
                    clientTotals[res.customerName] = { name: res.customerName, total: 0, count: 0 };
                }
                clientTotals[res.customerName].total += res.totalPrice;
                clientTotals[res.customerName].count += 1;
            });
        
        return Object.values(clientTotals)
            .sort((a, b) => b.total - a.total)
            .slice(0, 5);

    }, []);

    const getClientAvatar = (name: string) => {
        const client = mockUsers.find(u => u.name === name);
        return client?.avatarUrl || 'https://placehold.co/100x100';
    }


    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-headline text-primary">Top 5 Clientes</CardTitle>
                <Button variant="ghost" size="sm">Ver todos</Button>
            </CardHeader>
            <CardContent className="space-y-4">
                {topClients.map((client, index) => (
                    <div key={client.name} className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                             <Avatar className="h-9 w-9">
                                <AvatarImage src={getClientAvatar(client.name)} alt={client.name} />
                                <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold text-sm truncate">{client.name}</p>
                                <p className="text-xs text-muted-foreground">{client.count} compra(s)</p>
                            </div>
                        </div>
                        <p className="font-semibold text-sm text-primary">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(client.total)}
                        </p>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
