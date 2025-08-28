
'use client';

import React from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function LinkCotacaoPage() {
    const { toast } = useToast();
    // Use a relative path for the link to avoid hydration issues and simplify logic.
    const relativeLink = '/solicitacao-orcamento';

    const copyLink = () => {
        // Construct the full URL only when the user clicks to copy.
        const fullLink = `${window.location.origin}${relativeLink}`;
        navigator.clipboard.writeText(fullLink);
        toast({
            title: "Link Copiado!",
            description: "O link de cotação foi copiado para a área de transferência.",
        });
    };

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-primary">Links de Solicitação de Cotação</h1>
                <Button>Novo</Button>
            </header>

            <Card>
                <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex-1 space-y-3">
                        <p className="font-semibold text-lg text-foreground">Link principal da agência</p>
                        <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm" onClick={copyLink}>
                                <Copy className="mr-2 h-4 w-4" />
                                Copiar link
                            </Button>
                            <Link 
                                href={relativeLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                            >
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Abrir em nova aba
                            </Link>
                        </div>
                    </div>
                    <Badge>Principal</Badge>
                </CardContent>
            </Card>
        </div>
    );
}
