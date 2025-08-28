'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Link from 'next/link';

export default function NovaContaBancariaPage() {
    const [date, setDate] = useState<Date | undefined>(new Date(2025, 7, 28)); // August is 7
    const [isActive, setIsActive] = useState(true);

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <header>
                <h1 className="text-3xl font-bold text-primary">Cadastro de Conta</h1>
            </header>

            <Card>
                <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-end">
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="nome">Nome <span className="text-destructive">*</span></Label>
                            <Input id="nome" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="agencia">Agência</Label>
                            <Input id="agencia" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="conta">Nº. Conta</Label>
                            <Input id="conta" />
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-end">
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="saldo">Saldo Inicial <span className="text-destructive">*</span></Label>
                             <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">R$</span>
                                <Input id="saldo" defaultValue="0,00" className="pl-9" />
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="data-saldo">Data Saldo <span className="text-destructive">*</span></Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, "dd/MM/yyyy") : <span>Escolha uma data</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                        locale={ptBR}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                     <div className="flex items-center space-x-2">
                        <Switch id="ativo" checked={isActive} onCheckedChange={setIsActive} />
                        <Label htmlFor="ativo">Ativo</Label>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-start gap-2">
                <Button variant="outline" asChild>
                    <Link href="/conta-bancaria">Cancelar</Link>
                </Button>
                <Button>Salvar</Button>
            </div>
        </div>
    );
}
