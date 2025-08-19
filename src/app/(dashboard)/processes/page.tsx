
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import type { Itinerary } from '@/lib/types';
import { ItineraryForm } from '@/components/itinerary-form';
import { useToast } from '@/hooks/use-toast';

const mockItineraries: Itinerary[] = [
  { id: '1', title: 'Roteiro Gastronômico na Toscana', package: 'Férias em Roma e Vaticano', status: 'Publicado' },
  { id: '2', title: 'Trilhas e Lagos Alpinos', package: 'Aventura nos Alpes Suíços', status: 'Publicado' },
  { id: '3', title: 'Mergulho e Ruínas Maias', package: 'Resort Tropical em Cancún', status: 'Em rascunho' },
  { id: '4', title: 'Itinerário de Negócios e Lazer', package: 'Viagem de Negócios a Nova York', status: 'Arquivado' },
  { id: '5', title: 'Descobrindo Templos Antigos', package: 'Tour Cultural em Quioto', status: 'Em rascunho' },
];

export default function ItinerariesPage() {
  const [itineraries, setItineraries] = useState<Itinerary[]>(mockItineraries);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedItinerary, setSelectedItinerary] = useState<Itinerary | null>(null);
  const { toast } = useToast();

  const getStatusVariant = (status: Itinerary['status']) => {
    switch (status) {
      case 'Publicado': return 'default';
      case 'Em rascunho': return 'secondary';
      case 'Arquivado': return 'outline';
      default: return 'outline';
    }
  };
  
  const handleAdd = () => {
    setSelectedItinerary(null);
    setIsFormOpen(true);
  }

  const handleEdit = (itinerary: Itinerary) => {
    setSelectedItinerary(itinerary);
    setIsFormOpen(true);
  }
  
  const handleArchive = (itineraryToArchive: Itinerary) => {
    setItineraries(itineraries.map(it => 
        it.id === itineraryToArchive.id ? { ...it, status: 'Arquivado' } : it
    ));
    toast({
        title: "Itinerário Arquivado",
        description: `O itinerário "${itineraryToArchive.title}" foi arquivado.`
    });
  }

  const handleFormSubmit = (values: Omit<Itinerary, 'id' | 'status'>) => {
    if (selectedItinerary) {
        // Edit
        const updatedItinerary = { ...selectedItinerary, ...values };
        setItineraries(itineraries.map(it => it.id === selectedItinerary.id ? updatedItinerary : it));
        toast({ title: "Itinerário Atualizado", description: "As alterações foram salvas."});
    } else {
        // Add
        const newItinerary: Itinerary = {
            ...values,
            id: (itineraries.length + 1).toString(),
            status: 'Em rascunho'
        };
        setItineraries([newItinerary, ...itineraries]);
        toast({ title: "Itinerário Criado", description: `O itinerário "${newItinerary.title}" foi criado como rascunho.`});
    }
    setIsFormOpen(false);
    setSelectedItinerary(null);
  }

  return (
    <>
        <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
            <CardTitle className="font-headline text-primary">Gerenciamento de Itinerários</CardTitle>
            <CardDescription>Crie e gerencie os roteiros de viagem dos pacotes.</CardDescription>
            </div>
            <Button onClick={handleAdd}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Criar Itinerário
            </Button>
        </CardHeader>
        <CardContent>
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Título do Itinerário</TableHead>
                <TableHead>Pacote Vinculado</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                    <span className="sr-only">Ações</span>
                </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {itineraries.map((itinerary) => (
                <TableRow key={itinerary.id}>
                    <TableCell className="font-medium">{itinerary.title}</TableCell>
                    <TableCell className="text-muted-foreground">{itinerary.package}</TableCell>
                    <TableCell>
                    <Badge variant={getStatusVariant(itinerary.status)}>{itinerary.status}</Badge>
                    </TableCell>
                    <TableCell>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem onSelect={() => handleEdit(itinerary)}>Editar</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleArchive(itinerary)} disabled={itinerary.status === 'Arquivado'}>
                            Arquivar
                        </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </CardContent>
        </Card>

        <ItineraryForm
            isOpen={isFormOpen}
            onOpenChange={setIsFormOpen}
            onSubmit={handleFormSubmit}
            itinerary={selectedItinerary}
        />
    </>
  );
}
