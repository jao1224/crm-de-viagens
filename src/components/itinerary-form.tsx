
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
import { useEffect, useState } from 'react';
import { mockTravelPackages } from '@/lib/mock-data';
import { Textarea } from './ui/textarea';
import { Loader2, Wand2 } from 'lucide-react';
import { generateItinerary } from '@/ai/flows/generate-itinerary-flow';
import { useToast } from '@/hooks/use-toast';


const itineraryFormSchema = z.object({
  title: z.string().min(5, { message: 'O título deve ter pelo menos 5 caracteres.' }),
  package: z.string({ required_error: 'É necessário vincular um pacote.' }),
  description: z.string().min(10, { message: 'A descrição deve ter pelo menos 10 caracteres.' }),
});

type ItineraryFormValues = z.infer<typeof itineraryFormSchema>;

interface ItineraryFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (values: Omit<Itinerary, 'id' | 'status'>) => void;
  itinerary: Itinerary | null;
}

export function ItineraryForm({ isOpen, onOpenChange, onSubmit, itinerary }: ItineraryFormProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ItineraryFormValues>({
    resolver: zodResolver(itineraryFormSchema),
    defaultValues: {
      title: '',
      description: '',
    }
  });

  useEffect(() => {
    if (isOpen) {
        if (itinerary) {
            form.reset(itinerary);
        } else {
            form.reset({
                title: '',
                package: undefined,
                description: '',
            });
        }
    }
  }, [itinerary, form, isOpen]);

  const handleFormSubmit = (values: ItineraryFormValues) => {
    onSubmit(values);
    form.reset();
  }

  const handleGenerateDescription = async () => {
    const { title, package: packageTitle } = form.getValues();
    if (!title || !packageTitle) {
      toast({
        variant: 'destructive',
        title: 'Campos Obrigatórios',
        description: 'Por favor, preencha o título do itinerário e selecione um pacote para gerar a descrição.'
      });
      return;
    }
    
    setIsGenerating(true);
    try {
      const result = await generateItinerary({ title, packageTitle });
      if (result.description) {
        form.setValue('description', result.description, { shouldValidate: true });
        toast({
          title: "Descrição Gerada!",
          description: "A descrição do roteiro foi gerada com sucesso.",
        });
      }
    } catch (error) {
      console.error("Error generating itinerary description:", error);
      toast({
        variant: 'destructive',
        title: 'Erro de IA',
        description: 'Não foi possível gerar a descrição. Tente novamente.'
      });
    } finally {
      setIsGenerating(false);
    }
  }

  const dialogTitle = itinerary ? 'Editar Itinerário' : 'Criar Novo Itinerário';
  const dialogDescription = itinerary
    ? 'Altere os dados abaixo para atualizar o roteiro.'
    : 'Preencha os campos para criar um novo roteiro de viagem.';

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
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <div className='flex justify-between items-center mb-2'>
                    <FormLabel>Descrição Detalhada do Roteiro</FormLabel>
                    <Button type="button" size="sm" variant="ghost" onClick={handleGenerateDescription} disabled={isGenerating}>
                      {isGenerating ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Wand2 className="mr-2 h-4 w-4" />
                      )}
                       Gerar com IA
                    </Button>
                  </div>
                  <FormControl>
                    <Textarea 
                        placeholder="Detalhe o dia a dia da viagem ou use a IA para gerar uma sugestão." 
                        className="min-h-[150px]"
                        {...field} 
                    />
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
              <Button type="submit">{itinerary ? 'Salvar Alterações' : 'Criar Itinerário'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
