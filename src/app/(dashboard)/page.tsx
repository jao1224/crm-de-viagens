import { KpiCard } from '@/components/kpi-card';
import { SalesChart } from '@/components/sales-chart';
import { mockKpis } from '@/lib/mock-data';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {mockKpis.map((kpi) => (
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
