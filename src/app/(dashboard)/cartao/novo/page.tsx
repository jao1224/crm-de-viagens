'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Info, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const DayInput = ({ label, tooltipText }: { label: string, tooltipText: string }) => {
    return (
        <div className="space-y-2">
            <Label htmlFor={label.toLowerCase()} className="flex items-center gap-1.5">
                {label}
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Info className="h-3 w-3 text-muted-foreground cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{tooltipText}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </Label>
            <div className="relative">
                <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id={label.toLowerCase()} type="number" placeholder="00" className="pl-8" />
            </div>
        </div>
    );
}

const CurrencyInput = ({ label }: { label: string }) => {
    return (
        <div className="space-y-2">
            <Label htmlFor={label.toLowerCase()}>{label}</Label>
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">R$</span>
                <Input id={label.toLowerCase()} defaultValue="0,00" className="pl-9" />
            </div>
        </div>
    );
}


export default function NovoCartaoPage() {
    const [isActive, setIsActive] = useState(true);

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <header>
                <h1 className="text-3xl font-bold text-primary">Cadastro de Cartão</h1>
            </header>

            <Card>
                <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="descricao">Descrição <span className="text-destructive">*</span></Label>
                        <Input id="descricao" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-end">
                        <div className="space-y-2">
                            <Label htmlFor="ultimos-digitos">Últimos 4 dígitos</Label>
                            <Input id="ultimos-digitos" placeholder="0000" />
                        </div>
                        <DayInput label="Fechamento" tooltipText="Melhor dia para compra" />
                        <DayInput label="Vencimento" tooltipText="Dia do vencimento da fatura" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <CurrencyInput label="Limite" />
                        <CurrencyInput label="Anuidade" />
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="observacao">Observação</Label>
                        <Input id="observacao" />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <Switch id="ativo" checked={isActive} onCheckedChange={setIsActive} />
                        <Label htmlFor="ativo">Ativo</Label>
                    </div>

                </CardContent>
            </Card>

             <div className="flex justify-start gap-2">
                <Button variant="outline" asChild>
                    <Link href="/cartao">Cancelar</Link>
                </Button>
                <Button>Salvar</Button>
            </div>
        </div>
    );
}
