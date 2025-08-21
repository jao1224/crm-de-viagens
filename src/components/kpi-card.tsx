
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Kpi } from '@/lib/types';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type KpiCardProps = {
  kpi: Kpi;
};

export function KpiCard({ kpi }: KpiCardProps) {
  const TrendIcon = kpi.changeType === 'increase' ? TrendingUp : TrendingDown;
  const trendColor = kpi.changeType === 'increase' ? 'text-green-500' : 'text-red-500';

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
          {kpi.description && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{kpi.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <kpi.icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold font-headline text-primary">{kpi.value}</div>
        <p className={`text-xs ${trendColor} flex items-center`}>
          <TrendIcon className="h-4 w-4 mr-1" />
          {kpi.change} vs. mês anterior
        </p>
      </CardContent>
    </Card>
  );
}
