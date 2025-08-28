
'use client';

import React, { useState, useEffect } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Copy, ExternalLink, Pencil, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import type { PersonLink } from './novo/page';


export default function LinkPessoaPage() {
    const { toast } = useToast();
    const [links, setLinks] = useState<PersonLink[]>([]);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const storedLinks = localStorage.getItem('personLinks');
        if (storedLinks) {
            setLinks(JSON.parse(storedLinks));
        }
    }, []);

    const copyLink = (linkId: string) => {
        const fullLink = `${window.location.origin}/cadastro-pessoa?link=${linkId}`;
        navigator.clipboard.writeText(fullLink);
        toast({
            title: "Link Copiado!",
            description: "O link de cadastro foi copiado para a área de transferência.",
        });
    };

    const handleToggleActive = (id: string) => {
        const updatedLinks = links.map(link =>
            link.id === id ? { ...link, isActive: !link.isActive } : link
        );
        setLinks(updatedLinks);
        localStorage.setItem('personLinks', JSON.stringify(updatedLinks));
    };

    const handleDelete = (id: string) => {
        const updatedLinks = links.filter(link => link.id !== id);
        setLinks(updatedLinks);
        localStorage.setItem('personLinks', JSON.stringify(updatedLinks));
        toast({
            title: "Sucesso!",
            description: "Link excluído permanentemente.",
        });
    }

    if (!isClient) {
        return null; // or a loading skeleton
    }

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-primary">Links de cadastro de Pessoas</h1>
                <Button asChild>
                    <Link href="/link-pessoa/novo">Novo</Link>
                </Button>
            </header>

            {links.length === 0 ? (
                <Card>
                    <CardContent className="p-16 text-center text-muted-foreground">
                        Nenhum link de cadastro encontrado.
                    </CardContent>
                </Card>
            ) : (
                links.map(link => (
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
                                        href={`/cadastro-pessoa?link=${link.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                                    >
                                        <ExternalLink className="mr-2 h-4 w-4" />
                                        Abrir em nova aba
                                    </Link>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Switch checked={link.isActive} onCheckedChange={() => handleToggleActive(link.id)} />
                                <Button variant="ghost" size="icon" asChild>
                                    <Link href={`/link-pessoa/novo?id=${link.id}`}>
                                        <Pencil className="h-4 w-4" />
                                    </Link>
                                </Button>
                                 <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Esta ação não pode ser desfeita. Isso excluirá permanentemente o link de cadastro.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDelete(link.id)}>Continuar</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </CardContent>
                    </Card>
                ))
            )}
        </div>
    );
}
