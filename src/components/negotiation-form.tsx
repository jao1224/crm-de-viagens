'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Wand2 } from 'lucide-react';
import { travelPackageRecommendation, TravelPackageRecommendationOutput } from '@/ai/flows/property-recommendation';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

const formSchema = z.object({
  packageDetails: z.string().min(10, {
    message: 'Os detalhes do pacote devem ter pelo menos 10 caracteres.',
  }),
  userPreferences: z.string().optional(),
});

export function NegotiationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<TravelPackageRecommendationOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      packageDetails: '',
      userPreferences: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setRecommendations(null);
    try {
      const result = await travelPackageRecommendation({
        packageDetails: values.packageDetails,
        userPreferences: values.userPreferences,
      });
      setRecommendations(result);
    } catch (error) {
      console.error('Error getting recommendations:', error);
      toast({
        variant: 'destructive',
        title: 'Erro de IA',
        description: 'Não foi possível obter recomendações. Tente novamente.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-primary">Gerador de Recomendações</CardTitle>
          <CardDescription>Use nossa IA para obter sugestões de pacotes de viagem com base nas preferências do cliente.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="packageDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detalhes do Pacote de Interesse</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ex: Viagem para a Europa no verão, focado em cultura e gastronomia."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Descreva o pacote que o cliente está interessado ou um resumo da conversa.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userPreferences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferências do Cliente (Opcional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ex: Gosta de hotéis boutique, prefere voos diretos, orçamento de até R$15.000..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Adicione qualquer preferência específica do cliente.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Buscando...
                        </>
                    ) : (
                        <>
                            <Wand2 className="mr-2 h-4 w-4" />
                            Obter Recomendações
                        </>
                    )}
                </Button>
                {recommendations && (
                    <DialogTrigger asChild>
                        <Button variant="secondary">Ver Recomendações</Button>
                    </DialogTrigger>
                )}
            </CardFooter>
          </form>
        </Form>
      </Card>

      {recommendations && (
        <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
                <DialogTitle className="font-headline text-primary">Pacotes Recomendados</DialogTitle>
                <DialogDescription>
                    Com base nos detalhes fornecidos, aqui estão algumas sugestões.
                </DialogDescription>
            </DialogHeader>
            <div className="prose prose-sm max-w-none text-foreground dark:prose-invert rounded-md border p-4 max-h-[60vh] overflow-y-auto">
                {recommendations.recommendedPackages}
            </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
