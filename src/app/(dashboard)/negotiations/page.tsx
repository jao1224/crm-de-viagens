
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Wand2, Copy, PlusCircle } from 'lucide-react';
import { recommendPackages, RecommendPackagesOutput } from '@/ai/flows/property-recommendation';
import { useToast } from '@/hooks/use-toast';
import { mockTravelPackages } from '@/lib/mock-data';
import { PropertyCard } from '@/components/property-card';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  clientRequest: z.string().min(10, {
    message: 'A solicitação do cliente deve ter pelo menos 10 caracteres.',
  }),
});

export default function NegotiationsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<RecommendPackagesOutput | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientRequest: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setRecommendations(null);
    try {
      const result = await recommendPackages({
        clientRequest: values.clientRequest,
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
      setIsFormOpen(false); // Close dialog on submission
    }
  }

  const copyToClipboard = () => {
    if (recommendations?.proposalText) {
      navigator.clipboard.writeText(recommendations.proposalText);
      toast({
        title: "Texto Copiado!",
        description: "A proposta para o cliente foi copiada para a área de transferência.",
      });
    }
  };

  const recommendedPackagesDetails = recommendations?.recommendedPackages.map(rec => {
      const pkg = mockTravelPackages.find(p => p.id === rec.packageId);
      return pkg ? { ...pkg, justification: rec.justification } : null;
  }).filter(Boolean);


  return (
    <div className="space-y-6">
       <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle className="font-headline text-2xl text-primary">Pipeline de Vendas</CardTitle>
                <CardDescription>
                    Use o assistente de IA para criar novas negociações e acompanhe seu progresso aqui.
                </CardDescription>
            </div>
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Nova Negociação com IA
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="font-headline text-2xl text-primary">Assistente Inteligente de Vendas</DialogTitle>
                        <DialogDescription>
                            Descreva o que o cliente procura e a IA encontrará os melhores pacotes e criará um rascunho de proposta.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                            <FormField
                            control={form.control}
                            name="clientRequest"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>O que seu cliente busca?</FormLabel>
                                <FormControl>
                                    <Textarea
                                    placeholder="Ex: 'Quero uma viagem romântica para a praia, com um bom hotel e duração de 7 dias. Orçamento em torno de R$ 9.000 para o casal.'"
                                    rows={4}
                                    {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Seja o mais detalhado possível para obter as melhores recomendações.
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button" variant="outline">Cancelar</Button>
                                </DialogClose>
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
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </CardHeader>
        <CardContent>
             <div className="text-center text-muted-foreground p-8">
                <p>O pipeline de vendas (Kanban) aparecerá aqui.</p>
             </div>
        </CardContent>
       </Card>
      
      {recommendations && (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-primary">Resultado da IA: Recomendações e Proposta</CardTitle>
                <CardDescription>Abaixo estão as sugestões da IA e um texto pronto para você enviar ao seu cliente.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                
                {recommendations.proposalText && (
                    <div className="space-y-2">
                        <h3 className="font-semibold text-lg">Sugestão de Texto para o Cliente</h3>
                        <div className="prose prose-sm max-w-none text-foreground dark:prose-invert rounded-md border p-4 bg-muted/50">
                            {recommendations.proposalText}
                        </div>
                         <Button variant="outline" size="sm" onClick={copyToClipboard}>
                            <Copy className="mr-2 h-4 w-4" />
                            Copiar Texto
                        </Button>
                    </div>
                )}
                
                <Separator />
                
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Pacotes Recomendados</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {recommendedPackagesDetails?.map((pkg) => (
                           pkg && <div key={pkg.id}>
                                <PropertyCard property={pkg} />
                                <div className="mt-2 p-3 bg-accent/20 text-accent-foreground/80 rounded-b-lg text-xs">
                                    <p><span className="font-bold text-primary/80">Justificativa da IA:</span> {pkg.justification}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </CardContent>
        </Card>
      )}

    </div>
  );
}
