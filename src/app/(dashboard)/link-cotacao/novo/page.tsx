
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';

export default function NovoLinkCotacaoPage() {
    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <header>
                <h1 className="text-3xl font-bold text-primary">Cadastro de Link de Solicitação de Orçamento</h1>
            </header>

            <Card>
                 <CardHeader>
                    <CardTitle>Novo Link</CardTitle>
                    <CardDescription>Crie novos links vinculados a afiliados e/ou canais de vendas.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
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
                </CardContent>
            </Card>

            <div className="flex justify-start gap-2">
                <Button variant="outline" asChild>
                    <Link href="/link-cotacao">Cancelar</Link>
                </Button>
                <Button>Salvar</Button>
            </div>
        </div>
    );
}
