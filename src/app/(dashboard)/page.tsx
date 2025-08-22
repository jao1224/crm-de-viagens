'use client';

import { useState, useMemo } from 'react';
import { KpiCard } from '@/components/kpi-card';
import { SalesChart } from '@/components/sales-chart';
import { mockTravelPackages, mockReservations } from '@/lib/mock-data';
import type { Kpi, Reservation, TravelPackage, Booking } from '@/lib/types';
import { DollarSign, Package, Wallet, CalendarCheck } from 'lucide-react';
import { format, getMonth, getYear } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Helper to calculate KPIs for a given set of reservations
const calculateKpis = (reservations: Reservation[]) => {
  const confirmed = reservations.filter(r => r.status === 'Confirmada');
  const totalRevenue = confirmed.reduce((sum, r) => sum + r.totalPrice, 0);
  const confirmedReservations = confirmed.length;
  const averageTicket = confirmedReservations > 0 ? totalRevenue / confirmedReservations : 0;

  return { totalRevenue, confirmedReservations, averageTicket };
};

// Helper to format percentage change
const formatPercentageChange = (current: number, previous: number) => {
    if (previous === 0) {
        return current > 0 ? '+100%' : '0%';
    }
    if (current === previous) {
        return '0%';
    }
    const change = ((current - previous) / previous) * 100;
    return `${change > 0 ? '+' : ''}${change.toFixed(1)}%`;
};

// Helper to generate dynamic booking data by month based on number of travelers
const generateBookingPerformanceData = (
    reservations: Reservation[], 
    packages: TravelPackage[],
    selectedYear: number,
): { data: Booking[], config: any } => {
    const chartConfig: any = {};
    const monthlyData: { [key: string]: Booking } = {};

    // Filter by booking date year
    let filteredReservations = reservations.filter(r => r.status === 'Confirmada' && getYear(new Date(r.bookingDate)) === selectedYear);
    
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

        const date = new Date(res.bookingDate); // Use bookingDate for grouping by month
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

  // Generate available years from bookingDate
  const availableYears = Array.from(new Set(reservations.map(r => getYear(new Date(r.bookingDate))))).sort((a, b) => b - a);
  const [selectedYear, setSelectedYear] = useState<number>(availableYears[0] || new Date().getFullYear());

  const { filteredReservations, previousYearReservations } = useMemo(() => {
    const filtered = reservations.filter(r => getYear(new Date(r.bookingDate)) === selectedYear);
    const previous = reservations.filter(r => getYear(new Date(r.bookingDate)) === selectedYear - 1);
    return { filteredReservations: filtered, previousYearReservations: previous };
  }, [reservations, selectedYear]);

  const { 
    totalRevenue, 
    confirmedReservations, 
    averageTicket 
  } = calculateKpis(filteredReservations);

  const { 
    totalRevenue: prevTotalRevenue, 
    confirmedReservations: prevConfirmedReservations, 
    averageTicket: prevAverageTicket 
  } = calculateKpis(previousYearReservations);
  
  const activePackages = packages.filter(p => p.status === 'Disponível').length;
  
  const dynamicKpis: Kpi[] = [
    { 
      title: 'Faturamento Total', 
      value: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(totalRevenue), 
      change: formatPercentageChange(totalRevenue, prevTotalRevenue), 
      changeType: totalRevenue >= prevTotalRevenue ? 'increase' : 'decrease',
      icon: DollarSign,
      description: `Faturamento total de reservas confirmadas em ${selectedYear}.`
    },
    { 
      title: 'Pacotes Ativos', 
      value: activePackages.toString(), 
      change: '',
      changeType: 'increase', 
      icon: Package,
      description: 'Número total de pacotes de viagem que estão atualmente com status "Disponível". Este valor não é afetado pelo filtro de ano.'
    },
     { 
      title: 'Ticket Médio', 
      value: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(averageTicket), 
      change: formatPercentageChange(averageTicket, prevAverageTicket),
      changeType: averageTicket >= prevAverageTicket ? 'increase' : 'decrease',
      icon: Wallet,
      description: `Valor médio por reserva confirmada em ${selectedYear}.`
    },
    { 
      title: 'Reservas Confirmadas', 
      value: confirmedReservations.toString(), 
      change: formatPercentageChange(confirmedReservations, prevConfirmedReservations),
      changeType: confirmedReservations >= prevConfirmedReservations ? 'increase' : 'decrease',
      icon: CalendarCheck,
      description: `Número total de reservas confirmadas em ${selectedYear}.`
    },
  ];

  const { data: bookingData, config: bookingChartConfig } = generateBookingPerformanceData(reservations, packages, selectedYear);

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
          chartDescription={`Número de viajantes em reservas confirmadas por tipo de pacote em ${selectedYear}.`}
          years={availableYears}
          selectedYear={selectedYear}
          onYearChange={(year) => setSelectedYear(parseInt(year))}
        />
      </div>
    </div>
  );
}
