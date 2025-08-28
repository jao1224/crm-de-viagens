
'use client';

import React, { useState, useEffect } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, ExternalLink, Pencil, Trash2, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import type { QuoteLink } from '@/lib/types';


const principalLink: QuoteLink = {
    id: 'principal',
    description: 'Link principal da agência',
    isPrincipal: true,
}

export default function LinkCotacaoPage() {
    const { toast } = useToast();
    const [links, setLinks] = useState<QuoteLink[]>([]);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const storedLinks = localStorage.getItem('quoteLinks');
        if (storedLinks) {
            setLinks(JSON.parse(storedLinks));
        }
    }, []);

    const getQuoteLink = (linkId: string) => {
        if (!isClient) return '';
        const linkIdentifier = linkId === 'principal' ? '' : `?ref=${linkId}`;
        return `${window.location.origin}/solicitacao-orcamento${linkIdentifier}`;
    };

    const copyLink = (linkId: string) => {
        const fullLink = getQuoteLink(linkId);
        navigator.clipboard.writeText(fullLink);
        toast({
            title: "Link Copiado!",
            description: "O link de cotação foi copiado para a área de transferência.",
        });
    };

    const handleDelete = (id: string) => {
        const updatedLinks = links.filter(link => link.id !== id);
        setLinks(updatedLinks);
        localStorage.setItem('quoteLinks', JSON.stringify(updatedLinks));
        toast({
            title: "Sucesso!",
            description: "Link excluído permanentemente.",
        });
    }

    if (!isClient) {
        return null; // ou um esqueleto de carregamento
    }

    const allLinks = [principalLink, ...links];

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-primary">Links de Solicitação de Cotação</h1>
                <Button asChild>
                    <Link href="/link-cotacao/novo">Novo</Link>
                </Button>
            </header>

            <div className="space-y-4">
                {allLinks.map((link) => (
                    <Card key={link.id}>
                        <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex-1 space-y-3">
                                <p className="font-semibold text-lg text-foreground">{link.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    <Button variant="outline" size="sm" onClick={() => copyLink(link.id)}>
                                        <Copy className="mr-2 h-4 w-4" />
                                        Copiar link
                                    </Button>
                                    <Link
                                        href={getQuoteLink(link.id)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                                    >
                                        <ExternalLink className="mr-2 h-4 w-4" />
                                        Abrir em nova aba
                                    </Link>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {link.isPrincipal ? (
                                    <Badge>Principal</Badge>
                                ) : (
                                    <>
                                        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                                             <Link href={`/link-cotacao/novo?id=${link.id}`}>
                                                <Pencil className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive h-8 w-8">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Esta ação não pode ser desfeita. Isso excluirá permanentemente o link de cotação.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleDelete(link.id)}>Continuar</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
