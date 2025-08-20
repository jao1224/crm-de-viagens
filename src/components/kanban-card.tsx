
import type { Negotiation } from '@/lib/types';
import { mockUsers } from '@/lib/mock-data';
import { Card, CardContent, CardFooter } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { CheckCircle2, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface KanbanCardProps {
  deal: Negotiation;
}

export function KanbanCard({ deal }: KanbanCardProps) {
  const agent = mockUsers.find(user => user.id === deal.agentId);
  const { toast } = useToast();

  const handleRegisterSale = () => {
    // In a real app, this would navigate to a reservation form
    // pre-filled with the deal's data.
    toast({
        title: "Funcionalidade em Desenvolvimento",
        description: `O próximo passo seria registrar a venda para "${deal.customerName}" no valor de R$ ${deal.value}.`
    })
  }

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-3">
        <div className="flex items-center gap-3 mb-2">
          {agent && (
            <Avatar className="h-8 w-8">
              <AvatarImage src={agent.avatarUrl} alt={agent.name} />
              <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
            </Avatar>
          )}
          <div>
            <p className="text-sm font-semibold">{deal.customerName}</p>
            <p className="text-xs text-muted-foreground">{deal.packageName}</p>
          </div>
        </div>
        <div className="flex items-center justify-start gap-2">
            <DollarSign className="h-4 w-4 text-green-500" />
            <span className="text-sm font-bold text-foreground">
                {new Intl.NumberFormat('pt-BR', { notation: 'compact' }).format(deal.value)}
            </span>
        </div>
      </CardContent>
      {deal.status !== 'Ganhos' && (
         <CardFooter className="p-2 border-t">
            <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start text-xs"
                onClick={handleRegisterSale}
            >
                <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
                Marcar como Venda
            </Button>
         </CardFooter>
      )}
    </Card>
  );
}

    