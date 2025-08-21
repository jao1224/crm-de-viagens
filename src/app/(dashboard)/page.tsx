
'use client';

import { useState } from 'react';
import { KpiCard } from '@/components/kpi-card';
import { SalesChart } from '@/components/sales-chart';
import { mockTravelPackages, mockReservations } from '@/lib/mock-data';
import type { Kpi, Reservation, TravelPackage, Booking } from '@/lib/types';
import { DollarSign, Package, Wallet, CalendarCheck } from 'lucide-react';

// Helper function to generate dynamic sales data based on real reservations
const generateDynamicSalesData = (reservations: Reservation[], packages: TravelPackage[]): { data: Booking[], config: any } => {
    const packageTypes = [...new Set(packages.map(p => p.type))];
    const typeCounts: { [key: string]: number } = {};

    reservations
        .filter(r => r.status === 'Confirmada')
        .forEach(r => {
            const pkg = packages.find(p => p.id === r.packageId);
            if (pkg) {
                typeCounts[pkg.type] = (typeCounts[pkg.type] || 0) + r.travelers;
            }
        });

    const totalSales = Object.values(typeCounts).reduce((sum, count) => sum + count, 1); // Avoid division by zero

    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
    const salesData: Booking[] = months.map((month, index) => {
        const monthData: Booking = { month };
        packageTypes.forEach(type => {
            const baseSales = typeCounts[type] || 0;
            // Simulate some variance and growth over time
            const monthSales = Math.floor((baseSales / totalSales * 10) + (Math.random() * 3 * (index + 1)));
            monthData[type.toLowerCase()] = monthSales;
        });
        return monthData;
    });

    const chartColors = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];
    const chartConfig: any = {};
    packageTypes.forEach((type, index) => {
        chartConfig[type.toLowerCase()] = {
            label: type,
            color: chartColors[index % chartColors.length],
        };
    });
    
    return { data: salesData, config: chartConfig };
};


export default function DashboardPage() {
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [packages, setPackages] = useState<TravelPackage[]>(mockTravelPackages);

  const totalRevenue = reservations
    .filter(r => r.status === 'Confirmada')
    .reduce((sum, r) => sum + r.totalPrice, 0);

  const activePackages = packages.filter(p => p.status === 'Disponível').length;
  
  const confirmedReservations = reservations.filter(r => r.status === 'Confirmada').length;
  
  const averageTicket = confirmedReservations > 0 ? totalRevenue / confirmedReservations : 0;

  const dynamicKpis: Kpi[] = [
    { 
      title: 'Faturamento Total', 
      value: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(totalRevenue), 
      change: '+12.5%', // Placeholder
      changeType: 'increase', 
      icon: DollarSign 
    },
    { 
      title: 'Pacotes Ativos', 
      value: activePackages.toString(), 
      change: '+2', // Placeholder
      changeType: 'increase', 
      icon: Package 
    },
     { 
      title: 'Ticket Médio', 
      value: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(averageTicket), 
      change: '-2.1%', // Placeholder
      changeType: 'decrease', 
      icon: Wallet 
    },
    { 
      title: 'Reservas Confirmadas', 
      value: confirmedReservations.toString(), 
      change: '+5', // Placeholder
      changeType: 'increase', 
      icon: CalendarCheck 
    },
  ];

  const { data: salesData, config: salesChartConfig } = generateDynamicSalesData(reservations, packages);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dynamicKpis.map((kpi) => (
          <KpiCard key={kpi.title} kpi={kpi} />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <SalesChart data={salesData} config={salesChartConfig} />
        <div className="lg:col-span-1 bg-card rounded-lg border p-4 flex items-center justify-center">
          <p className="text-muted-foreground">Outros widgets aqui...</p>
        </div>
      </div>
    </div>
  );
}
