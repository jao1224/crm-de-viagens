
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
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import type { TravelPackage } from '@/lib/types';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const packageFormSchema = z.object({
  title: z.string().min(5, { message: 'O título deve ter pelo menos 5 caracteres.' }),
  destination: z.string().min(3, { message: 'O destino é obrigatório.' }),
  price: z.coerce.number().min(0, { message: 'O preço deve ser um valor positivo.' }),
  duration: z.coerce.number().int().min(1, { message: 'A duração deve ser de pelo menos 1 dia.' }),
  travelers: z.coerce.number().int().min(1, { message: 'Deve haver pelo menos 1 viajante.' }),
  type: z.enum(['Praia', 'Montanha', 'Cidade', 'Negócios', 'Família']),
  imageUrl: z.string().optional(),
});

type PackageFormValues = z.infer<typeof packageFormSchema>;

interface PackageFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (values: PackageFormValues) => void;
  pkg: TravelPackage | null;
}

export function PackageForm({ isOpen, onOpenChange, onSubmit, pkg }: PackageFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const form = useForm<PackageFormValues>({
    resolver: zodResolver(packageFormSchema),
    defaultValues: {
        title: '',
        destination: '',
        price: 0,
        duration: 1,
        travelers: 1,
        type: 'Praia',
        imageUrl: '',
    }
  });

  useEffect(() => {
    if (isOpen) {
      if (pkg) {
        form.reset(pkg);
        if (pkg.imageUrl) {
          setImagePreview(pkg.imageUrl);
        } else {
          setImagePreview(null);
        }
      } else {
        form.reset({
          title: '',
          destination: '',
          price: 0,
          duration: 1,
          travelers: 1,
          type: 'Praia',
          imageUrl: '',
        });
        setImagePreview(null);
      }
    }
  }, [pkg, form, isOpen]);
  
  const handleFormSubmit = (values: PackageFormValues) => {
    // If a new image was selected, its data URI is in imagePreview.
    // If not, we use the existing imageUrl from the form values.
    const finalValues = {
      ...values,
      imageUrl: imagePreview || values.imageUrl || '',
    };
    onSubmit(finalValues);
    form.reset();
    setImagePreview(null);
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setImagePreview(dataUrl);
        form.setValue('imageUrl', dataUrl); // Set the value for the form
      };
      reader.readAsDataURL(file);
    }
  };

  const dialogTitle = pkg ? 'Editar Pacote' : 'Adicionar Novo Pacote';
  const dialogDescription = pkg
    ? 'Altere os dados abaixo para atualizar o pacote.'
    : 'Preencha os campos abaixo para criar um novo pacote de viagem.';

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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título do Pacote</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Férias Incríveis na Grécia" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             
            <FormItem>
              <FormLabel>Imagem do Pacote</FormLabel>
              <FormControl>
                <Input 
                  type="file" 
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleImageChange}
                  className="file:text-primary file:font-medium"
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            {imagePreview && (
                <div className="w-full h-32 relative rounded-md overflow-hidden border">
                    <Image 
                        src={imagePreview}
                        alt="Pré-visualização do pacote"
                        fill
                        className="object-cover"
                    />
                </div>
            )}

            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destino</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Santorini, Grécia" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Pacote</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Praia">Praia</SelectItem>
                        <SelectItem value="Montanha">Montanha</SelectItem>
                        <SelectItem value="Cidade">Cidade</SelectItem>
                        <SelectItem value="Negócios">Negócios</SelectItem>
                        <SelectItem value="Família">Família</SelectItem>
                      </SelectContent>
                    </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Preço (R$)</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="Ex: 7500" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Duração (dias)</FormLabel>
                    <FormControl>
                        <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="travelers"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Viajantes</FormLabel>
                    <FormControl>
                        <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
              />
            </div>
            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit">{pkg ? 'Salvar Alterações' : 'Criar Pacote'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
