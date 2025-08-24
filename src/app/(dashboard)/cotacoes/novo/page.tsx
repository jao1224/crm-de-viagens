'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar as CalendarIcon, MoreVertical, UserPlus, Image as ImageIcon, Upload, Library, Eye, ListFilter, PlusCircle, ArrowRight, ArrowLeft, Plane, Hotel, TrainFront, Ship, Camera, HeartPulse, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Textarea } from '@/components/ui/textarea';

const steps = [
  { id: 1, name: 'Aguardando' },
  { id: 2, name: 'Em Cotação' },
  { id: 3, name: 'Aguardando Cliente' },
  { id: 4, name: 'Aprovado' },
  { id: 5, name: 'Reprovado' },
];

const Stepper = ({ currentStep }: { currentStep: number }) => (
    <div className="flex items-center w-full my-6">
        {steps.map((step, index) => (
            <React.Fragment key={step.id}>
                <div className="flex flex-col items-center text-center">
                    <div
                        className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 transition-all",
                            currentStep >= step.id ? "bg-primary border-primary text-primary-foreground" : "bg-muted border-border text-muted-foreground"
                        )}
                    >
                        {step.id}
                    </div>
                    <p className={cn("text-xs mt-2 font-semibold", currentStep >= step.id ? "text-foreground" : "text-muted-foreground")}>
                        {step.name}
                    </p>
                </div>
                {index < steps.length - 1 && (
                    <div className={cn("flex-1 h-0.5 mx-2", currentStep > index + 1 ? "bg-primary" : "bg-border")} />
                )}
            </React.Fragment>
        ))}
    </div>
);


export default function NovaCotacaoPage() {
    const [date, setDate] = useState<Date>(new Date(2025, 7, 23));
    const [currentStep, setCurrentStep] = useState(2);

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-primary">Cotação</h1>
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Opção 1</DropdownMenuItem>
                            <DropdownMenuItem>Opção 2</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="outline" asChild><Link href="/cotacoes">Cancelar</Link></Button>
                    <Button variant="outline">Salvar</Button>
                    <Button>Salvar e Fechar</Button>
                </div>
            </header>

            <Card>
                <CardContent className="p-4 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-lg font-mono font-semibold">ispg5</Badge>
                             <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-[180px] justify-start text-left font-normal",
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
                                        onSelect={(d) => d && setDate(d)}
                                        initialFocus
                                        locale={ptBR}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    
                    <Stepper currentStep={currentStep} />
                    
                    <Separator/>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                        <div className="space-y-1.5 lg:col-span-1">
                            <Label>Cliente</Label>
                             <div className="flex items-center gap-2">
                                <Select defaultValue="nao-informado">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="nao-informado">Não informado</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button size="icon" variant="outline"><UserPlus/></Button>
                             </div>
                             <p className="text-xs text-destructive">Informe o cliente da cotação</p>
                        </div>
                        <div className="space-y-1.5">
                            <Label>Canal de Venda</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione"/>
                                </SelectTrigger>
                                <SelectContent>
                                     <SelectItem value="direto">Direto</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1.5">
                            <Label>Afiliado</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione"/>
                                </SelectTrigger>
                                <SelectContent>
                                     <SelectItem value="nenhum">Nenhum</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1.5">
                            <Label>Usuário</Label>
                            <Select defaultValue="maxshuell">
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                     <SelectItem value="maxshuell">Maxshuell</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="text-right">
                           <p className="text-sm text-muted-foreground">Valor Total</p>
                           <p className="text-2xl font-bold text-primary">R$ 0</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Tabs defaultValue="orcamento">
                <TabsList>
                    <TabsTrigger value="solicitacao">Solicitação</TabsTrigger>
                    <TabsTrigger value="orcamento">Orçamento</TabsTrigger>
                    <TabsTrigger value="passageiros">Passageiros</TabsTrigger>
                    <TabsTrigger value="anexos">Anexos</TabsTrigger>
                    <TabsTrigger value="tarefas">Tarefas</TabsTrigger>
                    <TabsTrigger value="observacoes">Observações</TabsTrigger>
                    <TabsTrigger value="valores">Valores</TabsTrigger>
                    <TabsTrigger value="venda">Venda</TabsTrigger>
                    <TabsTrigger value="fatura">Fatura</TabsTrigger>
                    <TabsTrigger value="comunicacao">Comunicação</TabsTrigger>
                    <TabsTrigger value="historico">Histórico</TabsTrigger>
                </TabsList>
                <TabsContent value="orcamento" className="mt-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Orçamento</CardTitle>
                                <CardDescription>Preencha as informações do orçamento para esta cotação.</CardDescription>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline"><ListFilter className="mr-2 h-4 w-4"/>Opções</Button>
                                <Button><Eye className="mr-2 h-4 w-4"/>Visualizar</Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="titulo">Título</Label>
                                <Input id="titulo" placeholder="Informe um título para o orçamento" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="imagem"><ImageIcon className="inline-block mr-2 h-4 w-4" />Imagem</Label>
                                <Card className="border-dashed">
                                    <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                                        <p className="text-muted-foreground mb-4">Nenhuma imagem incluída.</p>
                                        <div className="flex gap-2">
                                            <Button variant="outline"><Upload className="mr-2 h-4 w-4"/>Upload</Button>
                                            <Button variant="outline"><Library className="mr-2 h-4 w-4"/>Biblioteca</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                             <Card className="bg-muted/30">
                                <CardHeader>
                                    <CardTitle className="text-lg">Informações sobre o destino</CardTitle>
                                </CardHeader>
                                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                     <div className="space-y-2">
                                        <Label htmlFor="adultos">Adultos</Label>
                                        <Input id="adultos" type="number" defaultValue={1} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="criancas">Crianças <span className="text-muted-foreground text-xs">(2 a 11 anos)</span></Label>
                                        <Input id="criancas" type="number" defaultValue={0} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="bebes">Bebês <span className="text-muted-foreground text-xs">(0 a 23 meses)</span></Label>
                                        <Input id="bebes" type="number" defaultValue={0} />
                                    </div>
                                </CardContent>
                            </Card>
                            
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <ArrowRight className="h-5 w-5 text-green-600" />
                                        <CardTitle className="text-lg text-green-600">Voo de Ida</CardTitle>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline">Incluir via Localizador</Button>
                                        <Button>Incluir</Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-center py-6 border-dashed border-2 rounded-md">
                                        <p className="text-muted-foreground">Nenhum voo incluído.</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <ArrowLeft className="h-5 w-5 text-green-600" />
                                        <CardTitle className="text-lg text-green-600">Voo de Volta</CardTitle>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline">Incluir via Localizador</Button>
                                        <Button>Incluir</Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-center py-6 border-dashed border-2 rounded-md">
                                        <p className="text-muted-foreground">Nenhum voo incluído.</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Plane className="h-5 w-5 text-green-600" />
                                        <CardTitle className="text-lg text-green-600">Voo Interno</CardTitle>
                                    </div>
                                    <Button>Incluir</Button>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-center py-6 border-dashed border-2 rounded-md">
                                        <p className="text-muted-foreground">Nenhum voo incluído.</p>
                                    </div>
                                </CardContent>
                            </Card>
                            
                             <Accordion type="single" collapsible className="w-full" defaultValue="servicos">
                                <AccordionItem value="hospedagem">
                                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                                        <div className="flex items-center gap-2">
                                            <Hotel className="h-5 w-5" /> Hospedagem
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="text-center py-6 border-dashed border-2 rounded-md">
                                            <p className="text-muted-foreground">Nenhuma hospedagem incluída.</p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="transporte">
                                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                                        <div className="flex items-center gap-2">
                                            <TrainFront className="h-5 w-5" /> Transporte
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="text-center py-6 border-dashed border-2 rounded-md">
                                            <p className="text-muted-foreground">Nenhum transporte incluído.</p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="cruzeiro">
                                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                                        <div className="flex items-center gap-2">
                                            <Ship className="h-5 w-5" /> Cruzeiro
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="text-center py-6 border-dashed border-2 rounded-md">
                                            <p className="text-muted-foreground">Nenhum cruzeiro incluído.</p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="experiencias">
                                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                                        <div className="flex items-center gap-2">
                                            <Camera className="h-5 w-5" /> Experiências Turísticas
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="text-center py-6 border-dashed border-2 rounded-md">
                                            <p className="text-muted-foreground">Nenhuma experiência incluída.</p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="seguros">
                                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                                        <div className="flex items-center gap-2">
                                            <HeartPulse className="h-5 w-5" /> Seguros
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="text-center py-6 border-dashed border-2 rounded-md">
                                            <p className="text-muted-foreground">Nenhum seguro incluído.</p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                                 <AccordionItem value="servicos">
                                    <AccordionTrigger className="text-lg font-semibold hover:no-underline bg-primary/10 px-4 rounded-md">
                                        <div className="flex items-center gap-2">
                                            <ShoppingCart className="h-5 w-5" /> Serviços Adicionais
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="p-4 space-y-4">
                                         <div className="space-y-2">
                                            <Label htmlFor="descricao-servicos">Descrição dos Serviços</Label>
                                            <Textarea id="descricao-servicos" defaultValue="Visto Procura de trabalho" />
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>

                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
