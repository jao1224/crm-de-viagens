
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { mockReservations, mockTravelPackages } from "@/lib/mock-data";
import type { Reservation, TravelPackage } from "@/lib/types";
import { ReservationForm } from '@/components/reservation-form';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { ReservationDetailsDialog } from '@/components/reservation-details-dialog';

export default function ReservationsPage() {
    const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
    const [packages, setPackages] = useState<TravelPackage[]>(mockTravelPackages);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isCancelAlertOpen, setIsCancelAlertOpen] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
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
        setSelectedReservation(null);
        setIsFormOpen(true);
    };
    
    const handleEditReservation = (reservation: Reservation) => {
        setSelectedReservation(reservation);
        setIsFormOpen(true);
    };

    const handleDetailsReservation = (reservation: Reservation) => {
        setSelectedReservation(reservation);
        setIsDetailsOpen(true);
    }
    
    const handleCancelReservation = (reservation: Reservation) => {
        setSelectedReservation(reservation);
        setIsCancelAlertOpen(true);
    }

    const confirmCancel = () => {
        if (!selectedReservation) return;
        
        const updatedReservations = reservations.map(r => 
            r.id === selectedReservation.id ? { ...r, status: 'Cancelada' as const } : r
        );
        setReservations(updatedReservations);

        toast({ title: "Reserva Cancelada", description: `A reserva de ${selectedReservation.customerName} foi cancelada.` });
        setIsCancelAlertOpen(false);
        setSelectedReservation(null);
    };

    const handleFormSubmit = (values: Omit<Reservation, 'id' | 'agentAvatarUrl' | 'packageName'> & { packageId: string; }) => {
        const selectedPkg = packages.find(p => p.id === values.packageId);
        if (!selectedPkg) {
            toast({ variant: 'destructive', title: "Erro", description: "Pacote selecionado não encontrado."});
            return;
        }

        const newReservationData = {
            ...values,
            packageName: selectedPkg.title,
            agentAvatarUrl: 'https://placehold.co/100x100', // Placeholder
        };

        if (selectedReservation) {
            // Edit
            const updatedReservation = { ...selectedReservation, ...newReservationData };
            setReservations(reservations.map(r => (r.id === selectedReservation.id ? updatedReservation : r)));
            toast({ title: "Reserva Atualizada", description: `A reserva de ${updatedReservation.customerName} foi atualizada.` });
        } else {
            // Add
            const newReservation: Reservation = {
                ...newReservationData,
                id: (reservations.length + 1 + Date.now()).toString(),
            };
            setReservations([newReservation, ...reservations]);
            toast({
                title: "Reserva Criada",
                description: `A reserva para ${newReservation.customerName} foi adicionada com sucesso.`
            });
            
             // Sync package availability
            if (newReservation.status === 'Confirmada') {
                const pkgToUpdate = packages.find(p => p.id === newReservation.packageId);
                if (pkgToUpdate && pkgToUpdate.status === 'Disponível') {
                    const newAvailability = pkgToUpdate.travelers - newReservation.travelers;
                    const newStatus = newAvailability <= 0 ? 'Esgotado' : 'Disponível';
                    const updatedPackages = packages.map(p => p.id === newReservation.packageId ? { ...p, travelers: newAvailability, status: newStatus } : p);
                    setPackages(updatedPackages);
                    if (newStatus === 'Esgotado') {
                         toast({ title: "Pacote Esgotado!", description: `O pacote "${pkgToUpdate.title}" não tem mais vagas.` });
                    }
                }
            }
        }
        setIsFormOpen(false);
        setSelectedReservation(null);
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
                                        <DropdownMenuItem onSelect={() => handleDetailsReservation(reservation)}>Detalhes</DropdownMenuItem>
                                        <DropdownMenuItem onSelect={() => handleEditReservation(reservation)}>Editar</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem 
                                            className="text-destructive" 
                                            onSelect={() => handleCancelReservation(reservation)}
                                            disabled={reservation.status === 'Cancelada'}
                                        >
                                            Cancelar
                                        </DropdownMenuItem>
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
            reservation={selectedReservation}
            packages={packages}
        />
        
        <ReservationDetailsDialog
            isOpen={isDetailsOpen}
            onOpenChange={setIsDetailsOpen}
            reservation={selectedReservation}
        />
        
        <AlertDialog open={isCancelAlertOpen} onOpenChange={setIsCancelAlertOpen}>
            <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                <AlertDialogDescription>
                Essa ação não pode ser desfeita. Isso definirá o status da reserva como "Cancelada".
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setSelectedReservation(null)}>Voltar</AlertDialogCancel>
                <AlertDialogAction onClick={confirmCancel}>Sim, cancelar</AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

      </>
  );
}
