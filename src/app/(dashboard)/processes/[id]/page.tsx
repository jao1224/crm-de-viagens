
'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { mockItineraries } from '@/lib/mock-data';
import type { Itinerary } from '@/lib/types';
import { ChevronLeft, Map, Clock, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';

const getStatusVariant = (status: Itinerary['status']) => {
    switch (status) {
      case 'Publicado': return 'default';
      case 'Em rascunho': return 'secondary';
      case 'Arquivado': return 'outline';
      default: return 'outline';
    }
};

export default function ItineraryDetailPage({ params }: { params: { id: string } }) {
  // We can't share state between pages without a state manager.
  // For this prototype, we assume the detail page can also access the mock data.
  // In a real app, this would be a fetch from an API.
  const [itinerary, setItinerary] = useState<Itinerary | undefined>(undefined);
  const { toast } = useToast();
  const { id } = params;

  useEffect(() => {
    // In a real app, you'd fetch by ID. Here, we find from the mock array.
    // This will not find newly created itineraries that only exist in the parent page's state.
    // The "correct" fix would involve a shared state (Context, Zustand, Redux) or fetching from a backend.
    // For the prototype, let's assume the mock data is the single source of truth.
    const foundItinerary = mockItineraries.find((i) => i.id === id);
    setItinerary(foundItinerary);
  }, [id]);


  const handlePdfGeneration = () => {
    toast({
      title: "Funcionalidade em Desenvolvimento",
      description: "A geração de PDF para o roteiro será implementada em breve.",
    });
  };

  if (!itinerary) {
    // This logic needs to be robust. For now, we check if itinerary is loaded.
    const tempItinerary = mockItineraries.find((i) => i.id === id);
     if(!tempItinerary) {
        return (
          <div className="text-center">
            <h1 className="text-2xl font-bold">Itinerário não encontrado</h1>
            <p className="text-muted-foreground">O roteiro que você está procurando não existe ou não foi salvo.</p>
            <Button asChild className="mt-4">
              <Link href="/processes">
                <ChevronLeft className="mr-2" />
                Voltar para Itinerários
              </Link>
            </Button>
          </div>
        );
     }
     setItinerary(tempItinerary);
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
        <div className="mb-4">
            <Button asChild variant="outline">
                <Link href="/processes">
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
                    Vinculado ao pacote: <span className="font-semibold text-primary">{itinerary.package}</span>
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

          <div className="mt-8 text-center">
            <Button size="lg" onClick={handlePdfGeneration}>
                <FileText className="mr-2" />
                Gerar PDF do Roteiro
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
