
'use client';

import type { Reservation } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from './ui/dialog';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { User, Package, Calendar, DollarSign, Info } from 'lucide-react';
import { Button } from './ui/button';

interface ReservationDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  reservation: Reservation | null;
}

const getStatusVariant = (status: Reservation['status'] | undefined) => {
    if (!status) return 'outline';
    switch (status) {
        case 'Confirmada': return 'default';
        case 'Pendente': return 'secondary';
        case 'Cancelada': return 'destructive';
        default: return 'outline';
    }
};

export function ReservationDetailsDialog({ isOpen, onOpenChange, reservation }: ReservationDetailsDialogProps) {
  if (!reservation) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline text-primary">Detalhes da Reserva</DialogTitle>
          <DialogDescription>
            Visualização completa dos dados da reserva.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
            <div className='flex items-center gap-4'>
                <Avatar className="h-16 w-16">
                    <AvatarImage src={reservation.agentAvatarUrl} alt={reservation.customerName} />
                    <AvatarFallback>{reservation.customerName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className='space-y-1'>
                    <h3 className="text-lg font-semibold">{reservation.customerName}</h3>
                    <Badge variant={getStatusVariant(reservation.status)}>{reservation.status}</Badge>
                </div>
            </div>

            <div className="grid gap-3">
                <div className="flex items-center gap-3">
                    <Package className="h-5 w-5 text-muted-foreground" />
                    <div className="text-sm">
                        <p className="text-muted-foreground">Pacote</p>
                        <p className="font-medium">{reservation.packageName}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div className="text-sm">
                        <p className="text-muted-foreground">Data da Viagem</p>
                        <p className="font-medium">{new Date(reservation.travelDate).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-muted-foreground" />
                    <div className="text-sm">
                        <p className="text-muted-foreground">Valor Total</p>
                        <p className="font-medium">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(reservation.totalPrice)}</p>
                    </div>
                </div>
            </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Fechar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
