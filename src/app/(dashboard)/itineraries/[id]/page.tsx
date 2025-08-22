
'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Itinerary, TravelPackage } from '@/lib/types';
import { ChevronLeft, Map, FileText, Pencil, LinkIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { mockItineraries, mockTravelPackages } from '@/lib/mock-data';
import { ItineraryForm } from '@/components/itinerary-form';


const getStatusVariant = (status: Itinerary['status']) => {
    switch (status) {
      case 'Publicado': return 'default';
      case 'Em rascunho': return 'secondary';
      case 'Arquivado': return 'outline';
      default: return 'outline';
    }
};

export default function ItineraryDetailPage({ params }: { params: { id: string } }) {
  const [itineraries, setItineraries] = useState<Itinerary[]>(mockItineraries);
  const [itinerary, setItinerary] = useState<Itinerary | undefined>(undefined);
  const [linkedPackage, setLinkedPackage] = useState<TravelPackage | undefined>(undefined);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();
  const { id } = params;

  useEffect(() => {
    const foundItinerary = itineraries.find((i) => i.id === id);
    if (foundItinerary) {
        setItinerary(foundItinerary);
        const foundPackage = mockTravelPackages.find(p => p.title === foundItinerary.package);
        setLinkedPackage(foundPackage);
    }
  }, [id, itineraries]);

  const handleFormSubmit = (values: Omit<Itinerary, 'id' | 'status'>) => {
    if (itinerary) {
      const updatedItinerary = { ...itinerary, ...values };
      const updatedList = itineraries.map(it => it.id === itinerary.id ? updatedItinerary : it);
      setItineraries(updatedList);
      
      toast({ title: "Itinerário Atualizado", description: "As alterações foram salvas com sucesso."});
    }
    setIsFormOpen(false);
  }

  const handlePdfGeneration = () => {
    toast({
      title: "Funcionalidade em Desenvolvimento",
      description: "A geração de PDF para o roteiro será implementada em breve.",
    });
  };

  if (!itinerary) {
      return (
        <div className="text-center p-8">
          <Card>
            <CardContent className="p-6">
              <h1 className="text-2xl font-bold mb-2">Carregando itinerário...</h1>
              <p className="text-muted-foreground">Se o itinerário não carregar, ele pode não existir ou ter sido removido.</p>
              <Button asChild className="mt-4">
                <Link href="/itineraries">
                  <ChevronLeft className="mr-2" />
                  Voltar para Itinerários
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      );
  }

  return (
    <>
      <div className="max-w-4xl mx-auto p-4">
          <div className="mb-4">
              <Button asChild variant="outline">
                  <Link href="/itineraries">
                      <ChevronLeft className="mr-2" />
                      Voltar para todos os itinerários
                  </Link>
              </Button>
          </div>
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                  <CardTitle className="font-headline text-3xl text-primary">{itinerary.title}</CardTitle>
                  <CardDescription className="text-lg">
                      Vinculado ao pacote: 
                      {linkedPackage ? (
                          <Link href={`/packages/${linkedPackage.id}`} className="font-semibold text-primary hover:underline ml-1">
                              {itinerary.package}
                          </Link>
                      ) : (
                          <span className="font-semibold text-primary ml-1">{itinerary.package}</span>
                      )}
                  </CardDescription>
              </div>
              <Badge variant={getStatusVariant(itinerary.status)}>{itinerary.status}</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            
            <div className="prose max-w-none text-foreground mt-6 dark:prose-invert">
              <h3 className="font-headline text-xl text-primary flex items-center gap-2"><Map className="w-5 h-5" /> Roteiro Detalhado</h3>
              {/* Using a div with whitespace-pre-wrap to respect newlines from the description */}
              <div className="whitespace-pre-wrap text-foreground">
                  {itinerary.description}
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" variant="outline" onClick={() => setIsFormOpen(true)}>
                  <Pencil className="mr-2" />
                  Editar Roteiro
              </Button>
              <Button size="lg" onClick={handlePdfGeneration}>
                  <FileText className="mr-2" />
                  Gerar PDF do Roteiro
              </Button>
            </div>

          </CardContent>
        </Card>
      </div>
      
      <ItineraryForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
        itinerary={itinerary}
      />
    </>
  );
}
