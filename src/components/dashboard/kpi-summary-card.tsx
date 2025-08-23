
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface KpiSummaryCardProps {
    title: string;
    value: number;
    icon: LucideIcon;
}

export function KpiSummaryCard({ title, value, icon: Icon }: KpiSummaryCardProps) {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-2xl font-bold font-headline text-primary">
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                        notation: 'compact',
                        compactDisplay: 'short'
                    }).format(value)}
                </p>
            </CardContent>
        </Card>
    );
}
