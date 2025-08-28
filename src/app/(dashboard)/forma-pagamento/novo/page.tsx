
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

const PercentageInput = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <div className="space-y-2">
            <Label htmlFor={label.toLowerCase()}>{label}</Label>
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
                <Input id={label.toLowerCase()} defaultValue="0,00" className="pl-8" {...props}/>
            </div>
        </div>
    );
}

export default function NovaFormaPagamentoPage() {
    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <header>
                <h1 className="text-3xl font-bold text-primary">Forma de Pagamento</h1>
            </header>

            <Card>
                <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="nome">Nome <span className="text-destructive">*</span></Label>
                        <Input id="nome" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-end">
                        <div className="space-y-2">
                            <Label htmlFor="numero-parcelas">Número de parcelas <span className="text-destructive">*</span></Label>
                            <Input id="numero-parcelas" type="number" defaultValue={1} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="intervalo-dias">Intervalo de dias</Label>
                            <Input id="intervalo-dias" type="number" />
                        </div>
                        <PercentageInput label="Desconto" />
                        <PercentageInput label="Acréscimo" />
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="observacao">Observação</Label>
                        <Textarea id="observacao" rows={4} />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <Switch id="ativo" defaultChecked />
                        <Label htmlFor="ativo">Ativo</Label>
                    </div>
                </CardContent>
            </Card>

             <div className="flex justify-start gap-2">
                <Button variant="outline" asChild>
                    <Link href="/forma-pagamento">Cancelar</Link>
                </Button>
                <Button>Salvar</Button>
            </div>
        </div>
    );
}
