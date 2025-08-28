
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import type { QuoteLink } from '@/lib/types';

export default function NovoLinkCotacaoPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const linkId = searchParams.get('id');

    const [descricao, setDescricao] = useState('');
    const [afiliado, setAfiliado] = useState('');
    const [canalVenda, setCanalVenda] = useState('');

    useEffect(() => {
        if (linkId) {
            const storedLinks = JSON.parse(localStorage.getItem('quoteLinks') || '[]') as QuoteLink[];
            const linkToEdit = storedLinks.find(link => link.id === linkId);
            if (linkToEdit) {
                setDescricao(linkToEdit.description);
                setAfiliado(linkToEdit.affiliate || '');
                setCanalVenda(linkToEdit.salesChannel || '');
            }
        }
    }, [linkId]);

    const handleSave = () => {
        if (!descricao) {
            toast({
                title: "Erro de Validação",
                description: "O campo 'Descrição' é obrigatório.",
                variant: "destructive",
            });
            return;
        }

        const storedLinks = JSON.parse(localStorage.getItem('quoteLinks') || '[]') as QuoteLink[];
        
        const newLink: QuoteLink = {
            id: linkId || Date.now().toString(),
            description: descricao,
            affiliate: afiliado,
            salesChannel: canalVenda,
            isPrincipal: false,
        };

        let updatedLinks: QuoteLink[];
        if (linkId) {
            updatedLinks = storedLinks.map(link => (link.id === linkId ? newLink : link));
        } else {
            updatedLinks = [...storedLinks, newLink];
        }

        localStorage.setItem('quoteLinks', JSON.stringify(updatedLinks));
        toast({
            title: "Sucesso!",
            description: `Link ${linkId ? 'atualizado' : 'salvo'} com sucesso.`,
        });
        router.push('/link-cotacao');
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <header>
                <h1 className="text-3xl font-bold text-primary">{linkId ? 'Editar Link' : 'Cadastro de Link'} de Solicitação de Orçamento</h1>
            </header>

            <Card>
                 <CardHeader>
                    <CardTitle>Novo Link</CardTitle>
                    <CardDescription>Crie novos links vinculados a afiliados e/ou canais de vendas.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                     <div className="space-y-2">
                        <Label htmlFor="descricao">Descrição <span className="text-destructive">*</span></Label>
                        <Input id="descricao" value={descricao} onChange={e => setDescricao(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="afiliado">Afiliado (Pessoa)</Label>
                            <Select value={afiliado} onValueChange={setAfiliado}>
                                <SelectTrigger id="afiliado">
                                    <SelectValue placeholder="Selecione a pessoa para vincular ao link" />
                                </SelectTrigger>
                                <SelectContent>
                                    {/* Options would be populated here */}
                                     <SelectItem value="nenhum">Nenhum</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="canal-venda">Canal de Venda</Label>
                            <Select value={canalVenda} onValueChange={setCanalVenda}>
                                <SelectTrigger id="canal-venda">
                                    <SelectValue placeholder="Selecione o canal de venda para vincular ao link" />
                                </SelectTrigger>
                                <SelectContent>
                                     {/* Options would be populated here */}
                                     <SelectItem value="nenhum">Nenhum</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-start gap-2">
                <Button variant="outline" asChild>
                    <Link href="/link-cotacao">Cancelar</Link>
                </Button>
                <Button onClick={handleSave}>Salvar</Button>
            </div>
        </div>
    );
}
