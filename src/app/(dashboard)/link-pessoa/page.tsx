
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Copy, ExternalLink, Pencil, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function LinkPessoaPage() {
    const { toast } = useToast();
    const link = typeof window !== 'undefined' ? `${window.location.origin}/cadastro-pessoa` : '';

    const copyLink = () => {
        navigator.clipboard.writeText(link);
        toast({
            title: "Link Copiado!",
            description: "O link de cadastro foi copiado para a área de transferência.",
        });
    };

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-primary">Links de cadastro de Pessoas</h1>
                <Button>Novo</Button>
            </header>

            <Card>
                <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex-1 space-y-3">
                        <p className="font-semibold text-lg text-foreground">casdastro</p>
                        <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm" onClick={copyLink}>
                                <Copy className="mr-2 h-4 w-4" />
                                Copiar link
                            </Button>
                            <Button variant="outline" size="sm" asChild>
                                <a href={link} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    Abrir em nova aba
                                </a>
                            </Button>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Switch defaultChecked />
                        <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

