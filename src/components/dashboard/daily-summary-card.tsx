
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface DailySummaryCardProps {
    title: string;
    value: number;
    icon: LucideIcon;
    variant: 'success' | 'danger';
}

export function DailySummaryCard({ title, value, icon: Icon, variant }: DailySummaryCardProps) {
    const colorClass = variant === 'success' ? 'text-green-500' : 'text-red-500';

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base font-medium text-muted-foreground">{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
                <p className={cn("text-3xl font-bold font-headline", colorClass)}>
                     {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}
                </p>
                <Icon className={cn("w-8 h-8", colorClass)} />
            </CardContent>
        </Card>
    );
}
