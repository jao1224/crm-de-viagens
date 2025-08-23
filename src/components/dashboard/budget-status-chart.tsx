
'use client'

import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockReservations } from '@/lib/mock-data';

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--muted))'];

export function BudgetStatusChart() {

    const data = useMemo(() => {
        const approved = mockReservations.filter(r => r.status === 'Confirmada').length;
        const pending = mockReservations.filter(r => r.status === 'Pendente').length;
        return [
            { name: 'Aprovado', value: approved },
            { name: 'Aguardando', value: pending }
        ];
    }, []);

    const total = data.reduce((acc, entry) => acc + entry.value, 0);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg font-headline text-primary">Orçamentos</CardTitle>
            </CardHeader>
            <CardContent>
                <div style={{ width: '100%', height: 200 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                stroke="hsl(var(--background))"
                                
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend 
                                iconSize={10} 
                                layout="vertical" 
                                verticalAlign="middle" 
                                align="right" 
                                formatter={(value, entry) => {
                                    const { color } = entry;
                                    const itemValue = entry.payload?.value ?? 0;
                                    const percentage = total > 0 ? ((itemValue / total) * 100).toFixed(1) : 0;
                                    return <span style={{ color: 'hsl(var(--foreground))' }}>{value} ({percentage}%)</span>
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
