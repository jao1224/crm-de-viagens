import { KpiCard } from '@/components/kpi-card';
import { SalesChart } from '@/components/sales-chart';
import { mockTravelPackages, mockReservations } from '@/lib/mock-data';
import type { Kpi } from '@/lib/types';
import { DollarSign, Package, Wallet, CalendarCheck } from 'lucide-react';

export default function DashboardPage() {

  // Calculate dynamic KPIs from mock data
  const totalRevenue = mockReservations
    .filter(r => r.status === 'Confirmada')
    .reduce((sum, r) => sum + r.totalPrice, 0);

  const activePackages = mockTravelPackages.filter(p => p.status === 'Disponível').length;
  
  const confirmedReservations = mockReservations.filter(r => r.status === 'Confirmada').length;
  
  const averageTicket = confirmedReservations > 0 ? totalRevenue / confirmedReservations : 0;

  // Create the KPI data array
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
        <SalesChart />
        {/* Placeholder for other dashboard components */}
        <div className="lg:col-span-1 bg-card rounded-lg border p-4 flex items-center justify-center">
          <p className="text-muted-foreground">Outros widgets aqui...</p>
        </div>
      </div>
    </div>
  );
}
