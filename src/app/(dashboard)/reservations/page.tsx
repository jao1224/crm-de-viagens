
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuPortal } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { mockReservations, mockTravelPackages, mockUsers } from "@/lib/mock-data";
import type { Reservation, TravelPackage, User } from "@/lib/types";
import { ReservationForm } from '@/components/reservation-form';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { ReservationDetailsDialog } from '@/components/reservation-details-dialog';
import { format } from 'date-fns';

export default function ReservationsPage() {
    const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
    const [packages, setPackages] = useState<TravelPackage[]>(mockTravelPackages);
    const [clients] = useState<User[]>(mockUsers.filter(u => u.role === 'Cliente'));
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
    
    // Function to update package availability
    const updatePackageAvailability = (packageId: string, travelerChange: number) => {
        setPackages(prevPackages => {
            const pkgToUpdate = prevPackages.find(p => p.id === packageId);
            if (!pkgToUpdate || travelerChange === 0) return prevPackages;

            const newAvailability = pkgToUpdate.travelers - travelerChange;
            const newStatus = newAvailability <= 0 ? 'Esgotado' : 'Disponível';
            
            if (newStatus === 'Esgotado' && pkgToUpdate.status === 'Disponível') {
                 toast({ title: "Pacote Esgotado!", description: `O pacote "${pkgToUpdate.title}" não tem mais vagas.` });
            }

            return prevPackages.map(p => 
                p.id === packageId ? { ...p, travelers: newAvailability, status: newStatus } : p
            );
        });
    };

    const confirmCancel = () => {
        if (!selectedReservation) return;
        
        // If the reservation being cancelled was confirmed, add travelers back to the package
        if (selectedReservation.status === 'Confirmada') {
            updatePackageAvailability(selectedReservation.packageId, -selectedReservation.travelers);
        }

        const updatedReservations = reservations.map(r => 
            r.id === selectedReservation.id ? { ...r, status: 'Cancelada' as const } : r
        );
        setReservations(updatedReservations);

        toast({ title: "Reserva Cancelada", description: `A reserva de ${selectedReservation.customerName} foi cancelada.` });
        setIsCancelAlertOpen(false);
        setSelectedReservation(null);
    };
    
    const handleStatusChange = (reservationId: string, newStatus: Reservation['status']) => {
        const originalReservation = reservations.find(r => r.id === reservationId);
        if (!originalReservation || originalReservation.status === newStatus) return;

        // Decrease spots if changing to Confirmed
        if (newStatus === 'Confirmada' && originalReservation.status !== 'Confirmada') {
            updatePackageAvailability(originalReservation.packageId, originalReservation.travelers);
        } 
        // Increase spots if changing from Confirmed to something else
        else if (newStatus !== 'Confirmada' && originalReservation.status === 'Confirmada') {
            updatePackageAvailability(originalReservation.packageId, -originalReservation.travelers);
        }
        
        const updatedReservations = reservations.map(r => 
            r.id === reservationId ? { ...r, status: newStatus } : r
        );
        setReservations(updatedReservations);
        toast({ title: "Status da Reserva Atualizado", description: `A reserva de ${originalReservation.customerName} agora está ${newStatus}.` });
    }

    const handleFormSubmit = (values: Omit<Reservation, 'id' | 'agentAvatarUrl' | 'packageName' | 'bookingDate' | 'travelDate'> & { packageId: string; bookingDate: Date; travelDate: Date; }) => {
        const selectedPkg = packages.find(p => p.id === values.packageId);
        const selectedClient = clients.find(c => c.name === values.customerName);

        if (!selectedPkg || !selectedClient) {
            toast({ variant: 'destructive', title: "Erro", description: "Pacote ou cliente selecionado não encontrado."});
            return;
        }

        const newReservationData = {
            ...values,
            bookingDate: format(values.bookingDate, 'yyyy-MM-dd'),
            travelDate: format(values.travelDate, 'yyyy-MM-dd'),
            packageName: selectedPkg.title,
            agentAvatarUrl: 'https://placehold.co/100x100', // Placeholder
        };

        if (selectedReservation) {
            // Edit Mode
            const originalReservation = reservations.find(r => r.id === selectedReservation.id);
            if (!originalReservation) return;

            const updatedReservation = { ...selectedReservation, ...newReservationData };

            // Calculate the difference in travelers to adjust package availability
            let travelerChange = 0;

            // If the package changed
            if (originalReservation.packageId !== updatedReservation.packageId) {
                // Add travelers back to the old package if it was confirmed
                if (originalReservation.status === 'Confirmada') {
                    updatePackageAvailability(originalReservation.packageId, -originalReservation.travelers);
                }
                // Remove travelers from the new package if it is confirmed
                if (updatedReservation.status === 'Confirmada') {
                    updatePackageAvailability(updatedReservation.packageId, updatedReservation.travelers);
                }
            } else { // If the package is the same, calculate the diff
                 const oldTravelers = originalReservation.status === 'Confirmada' ? originalReservation.travelers : 0;
                 const newTravelers = updatedReservation.status === 'Confirmada' ? updatedReservation.travelers : 0;
                 travelerChange = newTravelers - oldTravelers;
                 updatePackageAvailability(updatedReservation.packageId, travelerChange);
            }
            
            setReservations(reservations.map(r => (r.id === selectedReservation.id ? updatedReservation : r)));
            toast({ title: "Reserva Atualizada", description: `A reserva de ${updatedReservation.customerName} foi atualizada.` });

        } else {
            // Add Mode
            const newReservation: Reservation = {
                ...newReservationData,
                id: (reservations.length + 1 + Date.now()).toString(),
            };
            setReservations([newReservation, ...reservations]);
            toast({
                title: "Reserva Criada",
                description: `A reserva para ${newReservation.customerName} foi adicionada com sucesso.`
            });
            
            // Sync package availability only if the new reservation is confirmed
            if (newReservation.status === 'Confirmada') {
                updatePackageAvailability(newReservation.packageId, newReservation.travelers);
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
                        <TableHead>Data da Reserva</TableHead>
                        <TableHead>Data da Viagem</TableHead>
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
                            <TableCell>
                                {new Date(reservation.bookingDate).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}
                            </TableCell>
                            <TableCell>
                                {new Date(reservation.travelDate).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}
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
                                        <DropdownMenuSub>
                                            <DropdownMenuSubTrigger>Alterar Status</DropdownMenuSubTrigger>
                                            <DropdownMenuPortal>
                                                <DropdownMenuSubContent>
                                                    <DropdownMenuItem onSelect={() => handleStatusChange(reservation.id, 'Pendente')} disabled={reservation.status === 'Pendente'}>Pendente</DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={() => handleStatusChange(reservation.id, 'Confirmada')} disabled={reservation.status === 'Confirmada'}>Confirmada</DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={() => handleStatusChange(reservation.id, 'Cancelada')} disabled={reservation.status === 'Cancelada'}>Cancelada</DropdownMenuItem>
                                                </DropdownMenuSubContent>
                                            </DropdownMenuPortal>
                                        </DropdownMenuSub>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem 
                                            className="text-destructive" 
                                            onSelect={() => handleCancelReservation(reservation)}
                                            disabled={reservation.status === 'Cancelada'}
                                        >
                                            Cancelar Reserva
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
            clients={clients}
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

    

    