
'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from './ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { mockTravelPackages } from '@/lib/mock-data';
import type { Reservation, TravelPackage, User } from '@/lib/types';

const reservationFormSchema = z.object({
  customerName: z.string({ required_error: 'O nome do cliente é obrigatório.' }),
  packageId: z.string({ required_error: 'Selecione um pacote.' }),
  travelers: z.coerce.number().int().min(1, { message: 'Deve haver pelo menos 1 viajante.' }),
  bookingDate: z.date({ required_error: 'A data da reserva é obrigatória.' }),
  travelDate: z.date({ required_error: 'A data da viagem é obrigatória.' }),
  totalPrice: z.coerce.number().min(0, { message: 'O valor deve ser positivo.' }),
  status: z.enum(['Confirmada', 'Pendente', 'Cancelada']),
});

type ReservationFormValues = z.infer<typeof reservationFormSchema>;

interface ReservationFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (values: Omit<Reservation, 'id' | 'agentAvatarUrl' | 'packageName' | 'bookingDate' | 'travelDate'> & { bookingDate: Date, travelDate: Date, packageId: string }) => void;
  reservation: Reservation | null;
  packages: TravelPackage[];
  clients: User[];
}

export function ReservationForm({ isOpen, onOpenChange, onSubmit, reservation, packages, clients }: ReservationFormProps) {
  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationFormSchema),
    defaultValues: {
      travelers: 1,
    }
  });

  const selectedPackageId = form.watch('packageId');
  const travelers = form.watch('travelers');

  useEffect(() => {
    if (isOpen) {
        if (reservation) {
            form.reset({
                ...reservation,
                bookingDate: new Date(reservation.bookingDate),
                travelDate: new Date(reservation.travelDate),
            });
        } else {
            form.reset({
                customerName: undefined,
                packageId: undefined,
                bookingDate: new Date(),
                travelDate: undefined,
                totalPrice: 0,
                travelers: 1,
                status: 'Pendente',
            });
        }
    }
  }, [reservation, form, isOpen]);

  useEffect(() => {
    if (selectedPackageId && travelers > 0) {
      const selectedPkg = packages.find(p => p.id === selectedPackageId);
      if (selectedPkg) {
        form.setValue('totalPrice', selectedPkg.price * travelers);
      }
    }
  }, [selectedPackageId, travelers, packages, form]);


  const handleFormSubmit = (values: ReservationFormValues) => {
    onSubmit(values);
    form.reset();
  }
  
  const dialogTitle = reservation ? 'Editar Reserva' : 'Nova Reserva';
  const dialogDescription = reservation 
    ? 'Altere os detalhes para atualizar a reserva.' 
    : 'Preencha os detalhes para criar uma nova reserva.';

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Cliente</FormLabel>
                   <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um cliente" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {clients.map(client => (
                            <SelectItem key={client.id} value={client.name}>
                                {client.name}
                            </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="packageId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pacote</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um pacote" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {packages.filter(p => p.status === 'Disponível' || p.id === reservation?.packageId).map(pkg => (
                            <SelectItem key={pkg.id} value={pkg.id}>
                                {pkg.title} ({pkg.travelers} vagas)
                            </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="bookingDate"
                render={({ field }) => (
                    <FormItem className='flex flex-col pt-2'>
                        <FormLabel>Data da Reserva</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                )}
                                >
                                {field.value ? (
                                    format(field.value, "dd/MM/yyyy")
                                ) : (
                                    <span>Escolha uma data</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="travelDate"
                render={({ field }) => (
                    <FormItem className='flex flex-col pt-2'>
                        <FormLabel>Data da Viagem</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                )}
                                >
                                {field.value ? (
                                    format(field.value, "dd/MM/yyyy")
                                ) : (
                                    <span>Escolha uma data</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                        date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                    </FormItem>
                )}
                />
            </div>
             <div className="grid grid-cols-2 gap-4">
                 <FormField
                    control={form.control}
                    name="totalPrice"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Valor Total (R$)</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="Ex: 5300.00" {...field} readOnly />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                 <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Pendente">Pendente</SelectItem>
                            <SelectItem value="Confirmada">Confirmada</SelectItem>
                            <SelectItem value="Cancelada">Cancelada</SelectItem>
                          </SelectContent>
                        </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
             <FormField
              control={form.control}
              name="travelers"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Nº de Viajantes</FormLabel>
                  <FormControl>
                      <Input type="number" min="1" {...field} />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
            />
            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit">{reservation ? 'Salvar Alterações' : 'Criar Reserva'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
