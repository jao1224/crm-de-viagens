'use client';

import { useState, useEffect } from 'react';
import { KpiCard } from '@/components/kpi-card';
import { SalesChart } from '@/components/sales-chart';
import { mockTravelPackages, mockReservations, mockSalesData } from '@/lib/mock-data';
import type { Kpi, Reservation, TravelPackage, Booking } from '@/lib/types';
import { DollarSign, Package, Wallet, CalendarCheck } from 'lucide-react';

export default function DashboardPage() {
  // Although we are using useState, for a real app, you'd use a global state manager (Zustand, Redux)
  // or fetch this data from your backend API to ensure it's consistent across all pages.
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [packages, setPackages] = useState<TravelPackage[]>(mockTravelPackages);
  const [salesData, setSalesData] = useState<Booking[]>(mockSalesData);

  // In a real app, you would fetch updated data here or listen to a global state.
  // For this prototype, the state is self-contained.
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

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dynamicKpis.map((kpi) => (
          <KpiCard key={kpi.title} kpi={kpi} />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <SalesChart data={salesData} />
        {/* Placeholder for other dashboard components */}
        <div className="lg:col-span-1 bg-card rounded-lg border p-4 flex items-center justify-center">
          <p className="text-muted-foreground">Outros widgets aqui...</p>
        </div>
      </div>
    </div>
  );
}
