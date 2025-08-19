
'use client';

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import type { Itinerary } from '@/lib/types';
import { useEffect } from 'react';
import { mockTravelPackages } from '@/lib/mock-data';

const itineraryFormSchema = z.object({
  title: z.string().min(5, { message: 'O título deve ter pelo menos 5 caracteres.' }),
  package: z.string({ required_error: 'É necessário vincular um pacote.' }),
});

type ItineraryFormValues = z.infer<typeof itineraryFormSchema>;

interface ItineraryFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (values: ItineraryFormValues) => void;
  itinerary: Itinerary | null;
}

export function ItineraryForm({ isOpen, onOpenChange, onSubmit, itinerary }: ItineraryFormProps) {
  const form = useForm<ItineraryFormValues>({
    resolver: zodResolver(itineraryFormSchema),
  });

  useEffect(() => {
    if (isOpen) {
        if (itinerary) {
            form.reset(itinerary);
        } else {
            form.reset({
                title: '',
                package: undefined,
            });
        }
    }
  }, [itinerary, form, isOpen]);

  const handleFormSubmit = (values: ItineraryFormValues) => {
    onSubmit(values);
    form.reset();
  }

  const dialogTitle = itinerary ? 'Editar Itinerário' : 'Criar Novo Itinerário';
  const dialogDescription = itinerary
    ? 'Altere os dados abaixo para atualizar o roteiro.'
    : 'Preencha os campos para criar um novo roteiro de viagem.';

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título do Itinerário</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Roteiro pelo centro histórico" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="package"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pacote Vinculado</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um pacote" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockTravelPackages.map(pkg => (
                            <SelectItem key={pkg.id} value={pkg.title}>{pkg.title}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
              <Button type="submit">{itinerary ? 'Salvar Alterações' : 'Criar Itinerário'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
