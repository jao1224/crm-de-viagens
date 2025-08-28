
'use client';

import React from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, ExternalLink, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const NewLinkDialog = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-foreground">Cadastro de Link de Solicitação de Orçamento</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 pt-4">
                     <div className="space-y-2">
                        <Label htmlFor="descricao">Descrição <span className="text-destructive">*</span></Label>
                        <Input id="descricao" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="afiliado">Afiliado (Pessoa)</Label>
                            <Select>
                                <SelectTrigger id="afiliado">
                                    <SelectValue placeholder="Selecione a pessoa para vincular ao link" />
                                </SelectTrigger>
                                <SelectContent>
                                    {/* Options would be populated here */}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="canal-venda">Canal de Venda</Label>
                            <Select>
                                <SelectTrigger id="canal-venda">
                                    <SelectValue placeholder="Selecione o canal de venda para vincular ao link" />
                                </SelectTrigger>
                                <SelectContent>
                                     {/* Options would be populated here */}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                 <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                    <Button>Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};


export default function LinkCotacaoPage() {
    const { toast } = useToast();
    const [isNewLinkDialogOpen, setIsNewLinkDialogOpen] = React.useState(false);
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
        <>
            <div className="space-y-6">
                <header className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-primary">Links de Solicitação de Cotação</h1>
                    <Button onClick={() => setIsNewLinkDialogOpen(true)}>Novo</Button>
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
            <NewLinkDialog open={isNewLinkDialogOpen} onOpenChange={setIsNewLinkDialogOpen} />
        </>
    );
}
