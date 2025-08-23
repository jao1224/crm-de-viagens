
'use client';
import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { mockReservations, mockUsers } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function SalesByAgentCard() {
    const salesByAgent = useMemo(() => {
        const agentSales: { [key: string]: { name: string; total: number; avatar: string } } = {};
        mockUsers.filter(u => u.role === 'Agente de Viagem').forEach(agent => {
            agentSales[agent.id] = { name: agent.name, total: 0, avatar: agent.avatarUrl };
        });

        mockReservations.filter(r => r.status === 'Confirmada').forEach(res => {
            if (agentSales[res.agentId]) {
                agentSales[res.agentId].total += res.totalPrice;
            }
        });

        return Object.values(agentSales).sort((a,b) => b.total - a.total);
    }, []);

    const maxSale = Math.max(...salesByAgent.map(a => a.total), 0);
    
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg font-headline text-primary">Vendas por Agente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {salesByAgent.map(agent => (
                    <div key={agent.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                             <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={agent.avatar} alt={agent.name} />
                                    <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium">{agent.name}</span>
                            </div>
                            <span className="text-sm font-semibold">
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(agent.total)}
                            </span>
                        </div>
                        <Progress value={maxSale > 0 ? (agent.total / maxSale) * 100 : 0} />
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
