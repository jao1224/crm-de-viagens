
'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { mockItineraries } from '@/lib/mock-data';
import type { Itinerary } from '@/lib/types';
import { ChevronLeft, Map, Clock, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const getStatusVariant = (status: Itinerary['status']) => {
    switch (status) {
      case 'Publicado': return 'default';
      case 'Em rascunho': return 'secondary';
      case 'Arquivado': return 'outline';
      default: return 'outline';
    }
};

export default function ItineraryDetailPage({ params }: { params: { id: string } }) {
  const itinerary = mockItineraries.find((i) => i.id === params.id);
  const { toast } = useToast();

  const handlePdfGeneration = () => {
    toast({
      title: "Funcionalidade em Desenvolvimento",
      description: "A geração de PDF para o roteiro será implementada em breve.",
    });
  };

  if (!itinerary) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Itinerário não encontrado</h1>
        <p className="text-muted-foreground">O roteiro que você está procurando não existe.</p>
        <Button asChild className="mt-4">
          <Link href="/processes">
            <ChevronLeft className="mr-2" />
            Voltar para Itinerários
          </Link>
        </Button>
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
          
          <div className="prose max-w-none text-foreground mt-6">
            <h3 className="font-headline text-xl text-primary flex items-center gap-2"><Map className="w-5 h-5" /> Roteiro Detalhado</h3>
            <p>
                Este é um espaço para a descrição completa do itinerário. Detalhe o dia a dia da viagem, incluindo atividades, passeios, dicas de restaurantes e informações sobre os locais a serem visitados.
            </p>
            <ul>
                <li><strong>Dia 1:</strong> Chegada em Roma, traslado para o hotel e jantar de boas-vindas.</li>
                <li><strong>Dia 2:</strong> Tour guiado pelo Coliseu, Fórum Romano e Monte Palatino.</li>
                <li><strong>Dia 3:</strong> Visita ao Vaticano: Basílica de São Pedro, Museus do Vaticano e Capela Sistina.</li>
                <li><strong>Dia 4:</strong> Dia livre para explorar a cidade ou fazer um tour gastronômico opcional.</li>
            </ul>
             <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
            </p>
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
