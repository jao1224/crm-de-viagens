
'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Itinerary } from '@/lib/types';
import { ChevronLeft, Map, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { mockItineraries } from '@/lib/mock-data';

const LOCAL_STORAGE_KEY = 'itineraries';

const getStatusVariant = (status: Itinerary['status']) => {
    switch (status) {
      case 'Publicado': return 'default';
      case 'Em rascunho': return 'secondary';
      case 'Arquivado': return 'outline';
      default: return 'outline';
    }
};

export default function ItineraryDetailPage({ params }: { params: { id: string } }) {
  const [itinerary, setItinerary] = useState<Itinerary | undefined>(undefined);
  const { toast } = useToast();
  const { id } = params;

  useEffect(() => {
    let allItineraries: Itinerary[] = [];
    try {
      const storedItineraries = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedItineraries) {
        allItineraries = JSON.parse(storedItineraries);
      } else {
        allItineraries = mockItineraries;
      }
    } catch (error) {
      console.error("Failed to parse itineraries from localStorage", error);
      allItineraries = mockItineraries;
    }
    
    const foundItinerary = allItineraries.find((i) => i.id === id);
    setItinerary(foundItinerary);

  }, [id]);


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
                <Link href="/processes">
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
