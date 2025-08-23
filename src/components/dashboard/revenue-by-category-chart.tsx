
'use client';

import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockReservations, mockTravelPackages } from '@/lib/mock-data';

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

export function RevenueByCategoryChart() {
    const data = useMemo(() => {
        const revenueByCategory: { [key: string]: number } = {};

        mockReservations.filter(r => r.status === 'Confirmada').forEach(res => {
            const pkg = mockTravelPackages.find(p => p.id === res.packageId);
            if (pkg) {
                if (!revenueByCategory[pkg.type]) {
                    revenueByCategory[pkg.type] = 0;
                }
                revenueByCategory[pkg.type] += res.totalPrice;
            }
        });
        
        return Object.entries(revenueByCategory).map(([name, value]) => ({ name, value }));

    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg font-headline text-primary">Receitas por Categoria</CardTitle>
            </CardHeader>
            <CardContent>
                 <div style={{ width: '100%', height: 200 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}
                            />
                            <Legend iconSize={10} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
