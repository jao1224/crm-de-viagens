
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Calendar as CalendarIcon, Instagram, Mail, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Image from 'next/image';
import { Logo } from '@/components/logo';

export default function SolicitacaoOrcamentoPage() {
    const [idaDate, setIdaDate] = React.useState<Date>();
    const [voltaDate, setVoltaDate] = React.useState<Date>();

    return (
        <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6">
            <div className="text-center">
                <Logo className="h-16 w-auto mx-auto text-primary" />
                <h1 className="text-2xl font-bold text-primary mt-2">No Meio do Mundo Viagens</h1>
                <div className="flex justify-center items-center gap-4 mt-2">
                    <Button variant="ghost" size="icon"><MessageCircle className="h-5 w-5"/></Button>
                    <Button variant="ghost" size="icon"><Instagram className="h-5 w-5"/></Button>
                    <Button variant="ghost" size="icon"><Mail className="h-5 w-5"/></Button>
                </div>
            </div>

            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-center text-3xl font-headline text-primary">Solicitação de Orçamento</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="nome">Seu Nome Completo <span className="text-destructive">*</span></Label>
                                <Input id="nome" placeholder="Informe seu nome" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="celular">Celular <span className="text-destructive">*</span></Label>
                                <Input id="celular" type="tel" placeholder="(11) 96123-4567" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">E-mail</Label>
                                <Input id="email" type="email" placeholder="seu@email.com" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="origem">Origem <span className="text-destructive">*</span></Label>
                                <Input id="origem" placeholder="Informe a cidade de partida" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="destino">Destino <span className="text-destructive">*</span></Label>
                                <Input id="destino" placeholder="Informe a cidade de destino" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="space-y-2">
                                <Label htmlFor="ida">Ida <span className="text-destructive">*</span></Label>
                                 <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !idaDate && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {idaDate ? format(idaDate, "dd/MM/yyyy") : <span>dd/mm/aaaa</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={idaDate}
                                            onSelect={setIdaDate}
                                            initialFocus
                                            locale={ptBR}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="volta">Volta</Label>
                                 <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !voltaDate && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {voltaDate ? format(voltaDate, "dd/MM/yyyy") : <span>dd/mm/aaaa</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={voltaDate}
                                            onSelect={setVoltaDate}
                                            initialFocus
                                            locale={ptBR}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>

                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="adultos">Adultos</Label>
                                <Input id="adultos" type="number" defaultValue={1} min={1}/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="criancas">Crianças</Label>
                                <Input id="criancas" type="number" defaultValue={0} min={0} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bagagem">Bagagem despachada</Label>
                                <Input id="bagagem" type="number" defaultValue={0} min={0} />
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Switch id="flexibilidade-datas" />
                            <Label htmlFor="flexibilidade-datas">Possuo flexibilidade de datas próximas</Label>
                        </div>
                        
                        <div>
                            <Label className="font-semibold">Serviços adicionais</Label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="hospedagem" />
                                    <Label htmlFor="hospedagem" className="font-normal">Hospedagem</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="transporte" />
                                    <Label htmlFor="transporte" className="font-normal">Transporte</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="passeios" />
                                    <Label htmlFor="passeios" className="font-normal">Passeios</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="seguros" />
                                    <Label htmlFor="seguros" className="font-normal">Seguros</Label>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="observacao">Observação</Label>
                            <Textarea id="observacao" placeholder="Informe aqui qualquer observação que possa auxiliar a cotação da sua passagem" />
                        </div>
                        
                        <div className="flex flex-col items-center">
                            <p className="text-xs text-muted-foreground">* Informações de preenchimento obrigatório.</p>
                            <Button type="submit" className="mt-4 w-full md:w-auto">
                                Solicitar
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
