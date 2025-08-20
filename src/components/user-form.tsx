
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
import type { User, TravelStyle } from '@/lib/types';
import { travelStyles } from '@/lib/types';
import { useEffect } from 'react';

const userFormSchema = z.object({
  name: z.string().min(2, { message: 'O nome deve ter pelo menos 2 caracteres.' }),
  email: z.string().email({ message: 'Por favor, insira um email válido.' }),
  phone: z.string().optional(),
  travelStyle: z.enum(travelStyles).optional(),
  role: z.enum(['Administrador', 'Agente de Viagem', 'Cliente']).optional(),
  status: z.enum(['Ativo', 'Inativo']).optional(),
});

type UserFormValues = z.infer<typeof userFormSchema>;

interface UserFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (values: UserFormValues) => void;
  user: User | null;
  isClientForm?: boolean;
}

export function UserForm({ isOpen, onOpenChange, onSubmit, user, isClientForm = true }: UserFormProps) {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
  });

  useEffect(() => {
    if (isOpen) {
      if (user) {
        form.reset(user);
      } else {
        form.reset({
          name: '',
          email: '',
          phone: '',
          travelStyle: undefined,
          role: isClientForm ? 'Cliente' : 'Agente de Viagem',
          status: 'Ativo',
        });
      }
    }
  }, [user, form, isOpen, isClientForm]);
  
  const handleFormSubmit = (values: UserFormValues) => {
    onSubmit(values);
    onOpenChange(false);
  }

  const dialogTitle = isClientForm
    ? (user ? 'Editar Cliente' : 'Adicionar Novo Cliente')
    : (user ? 'Editar Usuário' : 'Adicionar Novo Usuário');
  
  const dialogDescription = isClientForm
    ? (user ? 'Altere os dados abaixo para atualizar o cliente.' : 'Preencha os campos para criar um novo cliente.')
    : (user ? 'Altere os dados para atualizar o usuário.' : 'Preencha os campos para criar um novo usuário do sistema.');

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: João da Silva" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Ex: joao.silva@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: +55 11 98765-4321" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {isClientForm && (
              <FormField
                control={form.control}
                name="travelStyle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estilo de Viagem Preferido</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um estilo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {travelStyles.map(style => (
                            <SelectItem key={style} value={style}>{style}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}


            {!isClientForm && (
              <div className="grid grid-cols-2 gap-4">
                 <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Perfil</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione um perfil" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Administrador">Administrador</SelectItem>
                              <SelectItem value="Agente de Viagem">Agente de Viagem</SelectItem>
                            </SelectContent>
                          </Select>
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
                              </Trigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Ativo">Ativo</SelectItem>
                              <SelectItem value="Inativo">Inativo</SelectItem>
                            </SelectContent>
                          </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              </div>
            )}

            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit">{user ? 'Salvar Alterações' : (isClientForm ? 'Criar Cliente' : 'Criar Usuário')}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
