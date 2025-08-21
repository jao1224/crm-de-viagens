
'use client';

import { useState } from 'react';
import { KpiCard } from '@/components/kpi-card';
import { SalesChart } from '@/components/sales-chart';
import { mockTravelPackages, mockReservations } from '@/lib/mock-data';
import type { Kpi, Reservation, TravelPackage, Booking } from '@/lib/types';
import { DollarSign, Package, Wallet, CalendarCheck } from 'lucide-react';
import { format, getMonth, isWithinInterval, startOfMonth, endOfMonth, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { DateRange } from 'react-day-picker';


// Helper to generate dynamic booking data by month based on number of travelers
const generateBookingPerformanceData = (
    reservations: Reservation[], 
    packages: TravelPackage[],
    dateRange?: DateRange
): { data: Booking[], config: any } => {
    const chartConfig: any = {};
    const monthlyData: { [key: string]: Booking } = {};

    let filteredReservations = reservations.filter(r => r.status === 'Confirmada');

    // Filter by date range if provided
    if (dateRange && dateRange.from) {
        // Set to to end of day if only from is set
        const to = dateRange.to || dateRange.from;
        filteredReservations = filteredReservations.filter(res => {
            const bookingDate = new Date(res.bookingDate);
            return isWithinInterval(bookingDate, { start: dateRange.from!, end: to });
        });
    }
    
    // Define colors for package types
    const packageTypes = [...new Set(packages.map(p => p.type))];
    const chartColors = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];
    packageTypes.forEach((type, index) => {
        chartConfig[type.toLowerCase()] = {
            label: type,
            color: chartColors[index % chartColors.length],
        };
    });

    filteredReservations.forEach(res => {
        const pkg = packages.find(p => p.id === res.packageId);
        if (!pkg) return;

        const date = new Date(res.bookingDate);
        const monthIndex = getMonth(date);
        const monthKey = format(date, 'yyyy-MM'); // Use a key that includes the year
        const monthName = format(date, "MMM", { locale: ptBR }).replace('.', '');


        if (!monthlyData[monthKey]) {
            monthlyData[monthKey] = { month: monthName, monthIndex: monthIndex, year: date.getFullYear() };
        }

        const typeKey = pkg.type.toLowerCase();
        const currentTravelers = (monthlyData[monthKey][typeKey] as number) || 0;
        monthlyData[monthKey][typeKey] = currentTravelers + res.travelers;
    });

    // Sort data by year then month index and convert to array
    const chartData = Object.values(monthlyData)
      .sort((a, b) => {
          const yearA = (a.year as number) || 0;
          const yearB = (b.year as number) || 0;
          if (yearA !== yearB) return yearA - yearB;
          return (a.monthIndex as number) - (b.monthIndex as number)
      })
      .map(({ monthIndex, year, ...rest }) => rest);


    // Fallback in case there are no confirmed reservations in the selected range
    if (chartData.length === 0) {
      const monthName = format(new Date(), "MMM", { locale: ptBR }).replace('.', '');
      const fallbackEntry: Booking = { month: monthName };
      packageTypes.forEach(type => {
        fallbackEntry[type.toLowerCase()] = 0;
      });
      chartData.push(fallbackEntry);
    }

    return { data: chartData, config: chartConfig };
};


export default function DashboardPage() {
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [packages, setPackages] = useState<TravelPackage[]>(mockTravelPackages);

  const defaultDateRange: DateRange = {
    from: startOfMonth(subMonths(new Date(), 5)),
    to: endOfMonth(new Date()),
  };
  const [dateRange, setDateRange] = useState<DateRange | undefined>(defaultDateRange);


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

  const { data: bookingData, config: bookingChartConfig } = generateBookingPerformanceData(reservations, packages, dateRange);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dynamicKpis.map((kpi) => (
          <KpiCard key={kpi.title} kpi={kpi} />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-1">
        <SalesChart 
          data={bookingData} 
          config={bookingChartConfig}
          chartTitle="Vendas Mensais por Tipo de Pacote"
          chartDescription="Número de viajantes em reservas confirmadas por tipo de pacote, mês a mês." 
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />
      </div>
    </div>
  );
}
