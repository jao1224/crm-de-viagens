
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
import { mockTravelPackages } from '@/lib/mock-data';
import type { Negotiation } from '@/lib/types';
import { useEffect } from 'react';

const negotiationFormSchema = z.object({
  customerName: z.string().min(2, { message: 'O nome do cliente é obrigatório.' }),
  packageName: z.string({ required_error: 'Selecione um pacote.' }),
  value: z.coerce.number().min(0, { message: 'O valor da negociação deve ser positivo.' }),
});

type NegotiationFormValues = z.infer<typeof negotiationFormSchema>;

interface NegotiationFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (values: NegotiationFormValues) => void;
  negotiation?: Negotiation | null;
}

export function NegotiationForm({ isOpen, onOpenChange, onSubmit, negotiation }: NegotiationFormProps) {
  const form = useForm<NegotiationFormValues>({
    resolver: zodResolver(negotiationFormSchema),
  });

  useEffect(() => {
    if (isOpen) {
      if (negotiation) {
        form.reset(negotiation);
      } else {
        form.reset({
          customerName: '',
          packageName: undefined,
          value: 0,
        });
      }
    }
  }, [negotiation, form, isOpen]);

  const handleFormSubmit = (values: NegotiationFormValues) => {
    onSubmit(values);
    form.reset();
  };
  
  const dialogTitle = negotiation ? 'Editar Negociação' : 'Nova Negociação Manual';
  const dialogDescription = negotiation
    ? 'Altere os detalhes para atualizar a negociação.'
    : 'Preencha os detalhes para criar uma nova negociação.';

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
              name="customerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Cliente</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: José Carlos" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="packageName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pacote de Interesse</FormLabel>
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
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor da Negociação (R$)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Ex: 9500" {...field} />
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
              <Button type="submit">{negotiation ? 'Salvar Alterações' : 'Criar Negociação'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
