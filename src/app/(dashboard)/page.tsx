'use client';

import { KpiSummaryCard } from '@/components/dashboard/kpi-summary-card';
import { UpcomingFlightsCard } from '@/components/dashboard/upcoming-flights-card';
import { TasksCard } from '@/components/dashboard/tasks-card';
import { TopClientsCard } from '@/components/dashboard/top-clients-card';
import { BudgetStatusChart } from '@/components/dashboard/budget-status-chart';
import { SalesByAgentCard } from '@/components/dashboard/sales-by-agent-card';
import { RevenueByCategoryChart } from '@/components/dashboard/revenue-by-category-chart';
import { DailySummaryCard } from '@/components/dashboard/daily-summary-card';

import { DollarSign, Plane, ListTodo, Users, PieChart, UserCheck, Donut, TrendingUp, TrendingDown } from 'lucide-react';


export default function DashboardPage() {

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      
      {/* Coluna 1 */}
      <div className="lg:col-span-1 xl:col-span-1 flex flex-col gap-6">
        <UpcomingFlightsCard />
        <BudgetStatusChart />
        <RevenueByCategoryChart />
      </div>

      {/* Coluna 2 */}
      <div className="lg:col-span-1 xl:col-span-2 flex flex-col gap-6">
        <TasksCard />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KpiSummaryCard title="Faturamento (R$)" value={67206.18} icon={DollarSign} />
          <KpiSummaryCard title="Lucro (R$)" value={6623.88} icon={TrendingUp} />
          <KpiSummaryCard title="Ticket Médio (R$)" value={11186.03} icon={DollarSign} />
        </div>
        <SalesByAgentCard />
      </div>

      {/* Coluna 3 */}
      <div className="lg:col-span-1 xl:col-span-1 flex flex-col gap-6">
        <TopClientsCard />
        <div className="grid grid-cols-1 gap-6">
          <DailySummaryCard title="Receitas para hoje" value={0} icon={TrendingUp} variant="success" />
          <DailySummaryCard title="Despesas para hoje" value={0} icon={TrendingDown} variant="danger" />
        </div>
      </div>

    </div>
  );
}
