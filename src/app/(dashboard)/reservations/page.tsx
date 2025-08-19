
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { mockReservations } from "@/lib/mock-data";
import type { Reservation } from "@/lib/types";
import { ReservationForm } from '@/components/reservation-form';
import { useToast } from '@/hooks/use-toast';

export default function ReservationsPage() {
    const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const { toast } = useToast();


    const getStatusVariant = (status: Reservation['status']) => {
        switch (status) {
            case 'Confirmada': return 'default';
            case 'Pendente': return 'secondary';
            case 'Cancelada': return 'destructive';
            default: return 'outline';
        }
    };

    const handleAddReservation = () => {
        setIsFormOpen(true);
    };

    const handleFormSubmit = (values: Omit<Reservation, 'id' | 'agentAvatarUrl'>) => {
        const newReservation: Reservation = {
            ...values,
            id: (reservations.length + 1).toString(),
            agentAvatarUrl: 'https://placehold.co/100x100',
        };
        setReservations([newReservation, ...reservations]);
        toast({
            title: "Reserva Criada",
            description: `A reserva para ${newReservation.customerName} foi adicionada com sucesso.`
        });
        setIsFormOpen(false);
    };

    const handleActionClick = (action: string) => {
        toast({
            title: "Funcionalidade em Desenvolvimento",
            description: `A ação de "${action}" será implementada em breve.`,
        });
    };


  return (
      <>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle className="font-headline text-primary">Gerenciamento de Reservas</CardTitle>
                <CardDescription>Visualize e gerencie todas as reservas de pacotes.</CardDescription>
            </div>
            <Button onClick={handleAddReservation}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Nova Reserva
            </Button>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Pacote</TableHead>
                        <TableHead className="hidden md:table-cell">Data da Viagem</TableHead>
                        <TableHead className="hidden md:table-cell text-right">Valor</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>
                            <span className="sr-only">Ações</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {reservations.map((reservation) => (
                        <TableRow key={reservation.id}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar className="hidden h-9 w-9 sm:flex">
                                        <AvatarImage src={reservation.agentAvatarUrl} alt="Avatar" />
                                        <AvatarFallback>{reservation.customerName.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-0.5">
                                        <p className="font-medium">{reservation.customerName}</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <span className="font-medium">{reservation.packageName}</span>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                {new Date(reservation.travelDate).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}
                            </TableCell>
                            <TableCell className="hidden md:table-cell text-right">
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(reservation.totalPrice)}
                            </TableCell>
                            <TableCell>
                                <Badge variant={getStatusVariant(reservation.status)}>{reservation.status}</Badge>
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Toggle menu</span>
                                    </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                        <DropdownMenuItem onSelect={() => handleActionClick('Detalhes')}>Detalhes</DropdownMenuItem>
                                        <DropdownMenuItem onSelect={() => handleActionClick('Editar')}>Editar</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-destructive" onSelect={() => handleActionClick('Cancelar')}>Cancelar</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </CardContent>
        </Card>
        <ReservationForm 
            isOpen={isFormOpen}
            onOpenChange={setIsFormOpen}
            onSubmit={handleFormSubmit}
        />
      </>
  );
}
