
'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Logo } from '@/components/logo';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Plane, Hotel, TrainFront, Ship, Camera, HeartPulse, Users, User, Baby, Utensils, MessageSquare } from 'lucide-react';

interface QuotePreviewData {
    titulo: string;
    imagem: string;
    adultos: number;
    criancas: number;
    bebes: number;
    servicosAdicionais: string;
    roteiro: string;
    detalhesViagem: string;
    formaPagamento: string;
    termos: string;
    outrasInfo: string;
}

const InfoBadge = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: React.ReactNode }) => (
    <div className="flex items-center gap-3 rounded-lg bg-primary/5 p-3">
        <Icon className="h-6 w-6 text-primary" />
        <div>
            <p className="text-sm font-semibold text-primary">{label}</p>
            <p className="text-lg font-bold text-foreground">{value}</p>
        </div>
    </div>
);


export default function VisualizarOrcamentoPage() {
    const [data, setData] = useState<QuotePreviewData | null>(null);

    useEffect(() => {
        const savedData = localStorage.getItem('quotePreviewData');
        if (savedData) {
            setData(JSON.parse(savedData));
        }
    }, []);

    if (!data) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Carregando dados do orçamento...</p>
            </div>
        );
    }
    
    const hasPaxInfo = data.adultos > 0 || data.criancas > 0 || data.bebes > 0;
    const hasDetails = data.detalhesViagem || data.formaPagamento || data.termos || data.outrasInfo;

    return (
        <div className="bg-background text-foreground font-sans max-w-4xl mx-auto p-4 sm:p-8">
            <header className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 pb-8 border-b-2 border-primary">
                <div className="text-center sm:text-left">
                    <h1 className="text-4xl font-bold text-primary tracking-tight">{data.titulo || 'Seu Roteiro Personalizado'}</h1>
                    <p className="text-lg text-muted-foreground mt-1">Uma experiência inesquecível aguarda por você.</p>
                </div>
                 <div className="flex items-center gap-4">
                    <Logo className="h-20 w-20 text-primary" />
                    <div>
                        <h2 className="font-bold text-lg text-primary">No Meio do Mundo Viagens</h2>
                        <p className="text-sm text-muted-foreground">Sua jornada começa aqui.</p>
                    </div>
                </div>
            </header>
            
            <main className="py-8 space-y-8">
                {data.imagem && (
                    <div className="rounded-xl overflow-hidden shadow-lg">
                        <Image src={data.imagem} alt={data.titulo} width={1200} height={400} className="w-full h-auto object-cover" />
                    </div>
                )}

                {hasPaxInfo && (
                     <section>
                        <h2 className="text-2xl font-semibold text-primary mb-4">Resumo da Viagem</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                           {data.adultos > 0 && <InfoBadge icon={User} label="Adultos" value={data.adultos} />}
                           {data.criancas > 0 && <InfoBadge icon={Users} label="Crianças" value={data.criancas} />}
                           {data.bebes > 0 && <InfoBadge icon={Baby} label="Bebês" value={data.bebes} />}
                        </div>
                    </section>
                )}
                
                {data.servicosAdicionais && (
                     <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Serviços Adicionais</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="whitespace-pre-wrap">{data.servicosAdicionais}</p>
                        </CardContent>
                    </Card>
                )}
                
                {data.roteiro && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Roteiro (Day by Day)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div
                                className="prose prose-lg max-w-none"
                                dangerouslySetInnerHTML={{ __html: data.roteiro }}
                            />
                        </CardContent>
                    </Card>
                )}
                
                {hasDetails && (
                    <section>
                         <h2 className="text-2xl font-semibold text-primary mb-4">Informações Importantes</h2>
                         <div className="space-y-4">
                            {data.detalhesViagem && (
                                <Card>
                                    <CardHeader><CardTitle>Detalhes da Viagem</CardTitle></CardHeader>
                                    <CardContent><p className="whitespace-pre-wrap">{data.detalhesViagem}</p></CardContent>
                                </Card>
                            )}
                            {data.formaPagamento && (
                                <Card>
                                    <CardHeader><CardTitle>Forma de Pagamento</CardTitle></CardHeader>
                                    <CardContent><p className="whitespace-pre-wrap">{data.formaPagamento}</p></CardContent>
                                </Card>
                            )}
                            {data.termos && (
                                <Card>
                                    <CardHeader><CardTitle>Termos e Condições</CardTitle></CardHeader>
                                    <CardContent><p className="whitespace-pre-wrap">{data.termos}</p></CardContent>
                                </Card>
                            )}
                            {data.outrasInfo && (
                                <Card>
                                    <CardHeader><CardTitle>Outras Informações</CardTitle></CardHeader>
                                    <CardContent><p className="whitespace-pre-wrap">{data.outrasInfo}</p></CardContent>
                                </Card>
                            )}
                         </div>
                    </section>
                )}

            </main>

            <footer className="text-center pt-8 mt-8 border-t">
                 <p className="text-muted-foreground">Este é um orçamento gerado por No Meio do Mundo Viagens.</p>
                 <p className="text-xs text-muted-foreground mt-2">Valores e disponibilidade sujeitos a alteração sem aviso prévio.</p>
            </footer>
        </div>
    );
}

