'use client';

import { CheckCircle2, CircleDashed, Circle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export type ChecklistItem = {
  module: string;
  task: string;
  status: 'done' | 'wip' | 'todo';
};

interface ChecklistProps {
  items: ChecklistItem[];
}

const statusConfig = {
  done: {
    icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
    label: 'Concluído',
    variant: 'default' as const,
    textClass: 'text-muted-foreground line-through',
  },
  wip: {
    icon: <CircleDashed className="h-5 w-5 text-blue-500" />,
    label: 'Em Andamento',
    variant: 'secondary' as const,
    textClass: 'font-semibold text-foreground',
  },
  todo: {
    icon: <Circle className="h-5 w-5 text-muted-foreground" />,
    label: 'A Fazer',
    variant: 'outline' as const,
    textClass: 'text-foreground',
  },
};

const groupItemsByModule = (items: ChecklistItem[]) => {
  return items.reduce((acc, item) => {
    (acc[item.module] = acc[item.module] || []).push(item);
    return acc;
  }, {} as Record<string, ChecklistItem[]>);
};

export function Checklist({ items }: ChecklistProps) {
  const groupedItems = groupItemsByModule(items);

  return (
    <div className="space-y-6">
      {Object.entries(groupedItems).map(([moduleName, moduleItems]) => (
        <Card key={moduleName} className="overflow-hidden">
          <CardHeader className='bg-muted/50'>
            <CardTitle className="text-lg font-semibold text-primary">{moduleName}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="divide-y">
              {moduleItems.map((item, index) => {
                const config = statusConfig[item.status];
                return (
                  <li key={index} className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-muted/30">
                    <div className="flex-shrink-0">{config.icon}</div>
                    <div className={`flex-grow ${config.textClass}`}>
                      {item.task}
                    </div>
                    <div className="flex-shrink-0">
                      <Badge variant={config.variant}>{config.label}</Badge>
                    </div>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
