
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Logo } from '@/components/logo';
import { Plane, Printer, Copy, AlertTriangle, User } from 'lucide-react';
import { mockFlights } from '@/lib/mock-data';
import type { Flight } from '@/lib/types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';

const ConfirmationPage = ({ params }: { params: { id: string } }) => {
    const { toast } = useToast();
    const flight = mockFlights.find(f => f.id === params.id);
    
    if (!flight) {
        return (
             <div className="flex flex-col items-center justify-center h-screen bg-muted text-foreground p-4">
                <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
                <h1 className="text-2xl font-bold text-center">Voo não encontrado</h1>
                <p className="text-muted-foreground text-center mt-2">
                    Não foi possível encontrar os detalhes para este voo. O link pode estar incorreto ou a reserva pode ter sido removida.
                </p>
                <Button asChild className="mt-6">
                    <a href="/">Voltar para a página inicial</a>
                </Button>
            </div>
        );
    }
    
    const confirmationLink = typeof window !== 'undefined' ? window.location.href : '';

    const handlePrint = () => {
        window.print();
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(confirmationLink);
        toast({
            title: "Link Copiado!",
            description: "O link da confirmação foi copiado para a área de transferência.",
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-8 bg-background print:bg-white">
            <style type="text/css" media="print">
              {`
                @page { size: auto;  margin: 0mm; }
                body { -webkit-print-color-adjust: exact; }
                .no-print { display: none; }
              `}
            </style>
             <header className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-6 border-b-2 border-primary">
                 <div className="flex items-center gap-4">
                    <Logo className="h-16 w-16 text-primary" />
                    <div>
                        <h2 className="text-xl font-bold text-primary">No Meio do Mundo Viagens</h2>
                        <p className="text-sm text-muted-foreground">Sua jornada começa aqui.</p>
                    </div>
                </div>
                <div className="text-center sm:text-right">
                    <h1 className="text-3xl font-bold text-primary">Confirmação de Reserva</h1>
                    <p className="font-mono text-muted-foreground">Localizador: {flight.locator}</p>
                </div>
            </header>

            <main className="py-8 space-y-8">
                <div className="p-6 border rounded-xl bg-muted/30">
                    <p className="text-sm text-muted-foreground mb-2">Passageiro(s)</p>
                    <div className="space-y-2">
                        {flight.passengers.map((passenger, index) => (
                             <div key={index} className="flex items-center gap-3">
                                <User className="h-5 w-5 text-muted-foreground" />
                                <p className="font-bold text-xl text-foreground">{passenger}</p>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <Plane className="h-6 w-6 text-primary" />
                        <h3 className="text-2xl font-semibold text-primary">Detalhes do Voo</h3>
                    </div>
                    <div className="border rounded-xl overflow-hidden">
                        <div className="grid grid-cols-1 sm:grid-cols-3">
                            <div className="p-4 bg-muted/30">
                                <p className="text-sm text-muted-foreground">Data e Hora</p>
                                <p className="font-medium text-lg">{format(flight.dateTime, "dd 'de' MMM, yyyy 'às' HH:mm", { locale: ptBR })}</p>
                            </div>
                            <div className="p-4">
                                <p className="text-sm text-muted-foreground">Companhia Aérea</p>
                                <p className="font-medium text-lg">{flight.airline}</p>
                            </div>
                            <div className="p-4 bg-muted/30">
                                <p className="text-sm text-muted-foreground">Tipo</p>
                                <p className="font-medium text-lg">{flight.flightType}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 border-t">
                            <div className="p-4">
                                <p className="text-sm text-muted-foreground">Origem</p>
                                <p className="font-medium text-2xl">{flight.from}</p>
                            </div>
                            <div className="p-4 sm:border-l">
                                <p className="text-sm text-muted-foreground">Destino</p>
                                <p className="font-medium text-2xl">{flight.to}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="no-print pt-6 flex flex-col sm:flex-row justify-center gap-3">
                     <Button onClick={handlePrint}>
                        <Printer className="mr-2 h-4 w-4" />
                        Imprimir / Salvar PDF
                    </Button>
                    <Button variant="outline" onClick={handleCopyLink}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copiar Link
                    </Button>
                </div>
            </main>
        </div>
    );
};

export default ConfirmationPage;
