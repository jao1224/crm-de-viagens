'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

export default function NovoLinkPessoaPage() {
    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <header>
                <h1 className="text-3xl font-bold text-primary">Cadastro de Link de cadastro de Pessoas</h1>
            </header>

            <Card>
                <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="descricao">Descrição <span className="text-destructive">*</span></Label>
                        <Input id="descricao" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="instrucoes">Instruções da página de cadastro</Label>
                        <Textarea id="instrucoes" rows={4} />
                    </div>
                    <div className="space-y-2">
                        <Label>Tipo de Pessoa <span className="text-destructive">*</span></Label>
                        <RadioGroup defaultValue="passageiro" className="flex flex-wrap items-center gap-6">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="passageiro" id="tipo-passageiro" />
                                <Label htmlFor="tipo-passageiro" className="font-normal">Passageiro</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="cliente" id="tipo-cliente" />
                                <Label htmlFor="tipo-cliente" className="font-normal">Cliente</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="fornecedor" id="tipo-fornecedor" />
                                <Label htmlFor="tipo-fornecedor" className="font-normal">Fornecedor</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="representante" id="tipo-representante" />
                                <Label htmlFor="tipo-representante" className="font-normal">Representante</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-start gap-2">
                <Button variant="outline" asChild>
                    <Link href="/link-pessoa">Cancelar</Link>
                </Button>
                <Button>Salvar</Button>
            </div>
        </div>
    );
}
