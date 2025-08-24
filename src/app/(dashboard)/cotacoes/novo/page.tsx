
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
import { Calendar as CalendarIcon, MoreVertical, UserPlus, Image as ImageIcon, Upload, Library, Eye, ListFilter, PlusCircle, ArrowRight, ArrowLeft, Plane, Hotel, TrainFront, Ship, Camera, HeartPulse, ShoppingCart, Minus, Plus, Info, AlertTriangle, Trash2, User, Mail, Globe, Instagram, Gem } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';


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

const NewPersonDialog = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => {
    const [rating, setRating] = useState(0);
    const [birthDate, setBirthDate] = useState<Date>();
    const [passportIssueDate, setPassportIssueDate] = useState<Date>();
    const [passportExpiryDate, setPassportExpiryDate] = useState<Date>();
    const [visaValidityDate, setVisaValidityDate] = useState<Date>();


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-4xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-foreground">Nova Pessoa</DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                        <div className="space-y-2 lg:col-span-1">
                            <Label htmlFor="person-name">Nome <span className="text-destructive">*</span></Label>
                             <div className="flex items-center gap-2">
                                <Input id="person-name" className="flex-1" />
                                <div className="flex items-center">
                                    {[1, 2, 3, 4, 5].map((diamond) => (
                                        <button key={diamond} onClick={() => setRating(diamond)} className="focus:outline-none">
                                            <Gem className={cn("h-5 w-5", rating >= diamond ? "text-blue-400 fill-blue-400" : "text-muted-foreground/30")} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="birth-date">Data Nascimento</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn("w-full justify-start text-left font-normal", !birthDate && "text-muted-foreground")}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {birthDate ? format(birthDate, "dd/MM/yyyy") : <span>dd/mm/aaaa</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar mode="single" selected={birthDate} onSelect={setBirthDate} initialFocus locale={ptBR} />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="person-gender">Sexo</Label>
                            <Select>
                                <SelectTrigger id="person-gender">
                                    <SelectValue placeholder="Não Informado" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="not-informed">Não Informado</SelectItem>
                                    <SelectItem value="male">Masculino</SelectItem>
                                    <SelectItem value="female">Feminino</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label>Tipo <span className="text-destructive">*</span></Label>
                         <div className="flex items-center gap-6">
                            <div className="flex items-center space-x-2">
                                <Switch id="type-passenger" defaultChecked />
                                <Label htmlFor="type-passenger" className="font-normal">Passageiro</Label>
                            </div>
                             <div className="flex items-center space-x-2">
                                <Switch id="type-client" />
                                <Label htmlFor="type-client" className="font-normal">Cliente</Label>
                            </div>
                             <div className="flex items-center space-x-2">
                                <Switch id="type-supplier" />
                                <Label htmlFor="type-supplier" className="font-normal">Fornecedor</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch id="type-representative" />
                                <Label htmlFor="type-representative" className="font-normal">Representante</Label>
                            </div>
                        </div>
                    </div>
                    
                    <Tabs defaultValue="contato">
                        <TabsList>
                            <TabsTrigger value="contato">Contato</TabsTrigger>
                            <TabsTrigger value="documentos">Documentos</TabsTrigger>
                            <TabsTrigger value="informacoes">Informações</TabsTrigger>
                            <TabsTrigger value="endereco">Endereço</TabsTrigger>
                            <TabsTrigger value="observacao">Observação</TabsTrigger>
                        </TabsList>
                        <TabsContent value="contato" className="pt-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="person-phone">Celular</Label>
                                    <Input id="person-phone" placeholder="(11) 96123-4567" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="person-email">E-mail</Label>
                                    <div className="relative">
                                        <Input id="person-email" type="email" className="pl-9"/>
                                        <Mail className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    </div>
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="person-social">Rede Social</Label>
                                    <div className="relative">
                                        <Input id="person-social" className="pl-9"/>
                                        <Instagram className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    </div>
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="person-site">Site</Label>
                                     <div className="relative">
                                        <Input id="person-site" className="pl-9"/>
                                        <Globe className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    </div>
                                </div>
                                <div className="space-y-2 col-span-2">
                                    <Label htmlFor="person-pix">Chave Pix</Label>
                                    <Input id="person-pix" />
                                </div>
                            </div>
                             <div className="flex items-center space-x-2 mt-6">
                                <Switch id="accepts-communication" defaultChecked />
                                <Label htmlFor="accepts-communication">Aceita receber comunicação via E-mail/Whatsapp</Label>
                            </div>
                        </TabsContent>
                         <TabsContent value="documentos" className="pt-4 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="doc-cpf">CPF/CNPJ</Label>
                                    <Input id="doc-cpf" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="doc-rg">RG</Label>
                                    <Input id="doc-rg" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="doc-rg-issuer">Órgão Emissor RG</Label>
                                    <Input id="doc-rg-issuer" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="doc-municipal">Inscrição Municipal</Label>
                                    <Input id="doc-municipal" />
                                </div>
                            </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="doc-foreign-id">ID Estrangeiro</Label>
                                    <Input id="doc-foreign-id" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="doc-nationality">Nacionalidade</Label>
                                    <Select>
                                        <SelectTrigger id="doc-nationality">
                                            <SelectValue placeholder="Selecione a Nacionalidade" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {/* Add nationalities */}
                                        </SelectContent>
                                    </Select>
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="doc-marital-status">Estado Civil</Label>
                                    <Select>
                                        <SelectTrigger id="doc-marital-status">
                                            <SelectValue placeholder="Selecione o Estado Civil" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {/* Add marital statuses */}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="doc-passport">Passaporte</Label>
                                    <Input id="doc-passport" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="doc-passport-issue">Emissão Passaporte</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !passportIssueDate && "text-muted-foreground")}>
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {passportIssueDate ? format(passportIssueDate, "dd/MM/yyyy") : <span>dd/mm/aaaa</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={passportIssueDate} onSelect={setPassportIssueDate} locale={ptBR} /></PopoverContent>
                                    </Popover>
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="doc-passport-expiry">Vencimento Passaporte</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !passportExpiryDate && "text-muted-foreground")}>
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {passportExpiryDate ? format(passportExpiryDate, "dd/MM/yyyy") : <span>dd/mm/aaaa</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={passportExpiryDate} onSelect={setPassportExpiryDate} locale={ptBR} /></PopoverContent>
                                    </Popover>
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="doc-passport-nat">Nacionalidade do Passaporte</Label>
                                    <Select><SelectTrigger id="doc-passport-nat"><SelectValue placeholder="Selecione a Nacionalidade..." /></SelectTrigger><SelectContent>{/* Add nationalities */}</SelectContent></Select>
                                </div>
                            </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="doc-visa">Visto</Label>
                                    <Input id="doc-visa" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="doc-visa-validity">Validade do Visto</Label>
                                     <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !visaValidityDate && "text-muted-foreground")}>
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {visaValidityDate ? format(visaValidityDate, "dd/MM/yyyy") : <span>dd/mm/aaaa</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={visaValidityDate} onSelect={setVisaValidityDate} locale={ptBR} /></PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                        </TabsContent>
                         <TabsContent value="informacoes" className="pt-4">
                            <p className="text-muted-foreground text-center p-8">Nenhuma informação para exibir.</p>
                        </TabsContent>
                         <TabsContent value="endereco" className="pt-4">
                            <p className="text-muted-foreground text-center p-8">Nenhum endereço para exibir.</p>
                        </TabsContent>
                        <TabsContent value="observacao" className="pt-4">
                           <Textarea placeholder="Observações sobre esta pessoa..." />
                        </TabsContent>
                    </Tabs>

                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                    <Button>Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default function NovaCotacaoPage() {
    const [date, setDate] = useState<Date>(new Date(2025, 7, 23));
    const [currentStep, setCurrentStep] = useState(2);
    const [activeTab, setActiveTab] = useState('orcamento');
    const [isNewPersonDialogOpen, setIsNewPersonDialogOpen] = useState(false);


    return (
        <>
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
                                <DropdownMenuItem className="text-destructive">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Excluir
                                </DropdownMenuItem>
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
                                    <Button size="icon" variant="outline" onClick={() => setIsNewPersonDialogOpen(true)}><UserPlus/></Button>
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

                <Tabs value={activeTab} onValueChange={setActiveTab}>
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
                                
                                <Accordion type="single" collapsible className="w-full">
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

                                <Card>
                                    <CardContent className="p-4 space-y-4">
                                        <Accordion type="single" collapsible className="w-full">
                                            <AccordionItem value="roteiro">
                                                <AccordionTrigger className="font-semibold text-base hover:no-underline">
                                                    <div className="flex items-center gap-2">
                                                        <Checkbox id="roteiro-check" />
                                                        <Label htmlFor="roteiro-check" className="cursor-pointer">Roteiro (Day By Day)</Label>
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="pt-2">
                                                    <Textarea placeholder="Descreva o roteiro dia a dia..." />
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>

                                        <div className="space-y-2 pt-4">
                                            <Label htmlFor="detalhes-viagem">Detalhes da Viagem</Label>
                                            <Textarea id="detalhes-viagem" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="forma-pagamento">Forma de Pagamento</Label>
                                            <Textarea id="forma-pagamento" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="termos">Termos e Condições</Label>
                                            <Textarea id="termos" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="outras-info">Outras Informações</Label>
                                            <Textarea id="outras-info" />
                                        </div>
                                    </CardContent>
                                </Card>

                            </CardContent>
                            <CardFooter>
                                <p className="text-sm text-muted-foreground">
                                    Informe os valores da cotação na aba{' '}
                                    <button 
                                        onClick={() => setActiveTab('valores')}
                                        className="font-semibold text-primary hover:underline"
                                    >
                                        Valores
                                    </button>
                                </p>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="passageiros" className="mt-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <User className="h-5 w-5 text-primary" />
                                    <CardTitle className="text-xl">Passageiros</CardTitle>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreVertical className="h-5 w-5" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                            Configurar
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Passageiro</Label>
                                    <div className="flex items-center gap-2">
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {/* Options go here */}
                                            </SelectContent>
                                        </Select>
                                        <Button size="icon" variant="outline" onClick={() => setIsNewPersonDialogOpen(true)}>
                                            <UserPlus className="h-4 w-4" />
                                        </Button>
                                        <Button>Adicionar</Button>
                                    </div>
                                </div>
                                <div className="text-center py-8 border-dashed border-2 rounded-md">
                                    <p className="text-muted-foreground">Nenhum passageiro informado.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="valores" className="mt-4">
                        <Card>
                            <CardContent className="p-6 space-y-6">
                                <Card>
                                    <CardHeader className="flex-row items-center justify-between py-3">
                                        <div className="flex items-center gap-2">
                                            <Minus className="h-5 w-5 text-destructive" />
                                            <h3 className="font-semibold text-destructive">Valores de Custo</h3>
                                        </div>
                                        <Button>Incluir</Button>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-center py-8 border-dashed border-2 rounded-md">
                                            <p className="text-muted-foreground">Nenhum custo informado.</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="flex-row items-center justify-between py-3">
                                        <div className="flex items-center gap-2">
                                            <Plus className="h-5 w-5 text-blue-600" />
                                            <h3 className="font-semibold text-blue-600">Valores de Venda</h3>
                                        </div>
                                        <Button>Incluir</Button>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-center py-8 border-dashed border-2 rounded-md">
                                            <p className="text-muted-foreground">Nenhum valor informado.</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <div className="space-y-2">
                                    <Label htmlFor="valor-comparacao" className="flex items-center gap-1.5">
                                        Valor de Comparação <Info className="h-4 w-4 text-muted-foreground" />
                                    </Label>
                                    <Input id="valor-comparacao" defaultValue="R$ 0,00" />
                                </div>
                                
                                <div className="space-y-2">
                                    <Label>Forma(s) de Pagamento</Label>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground border p-3 rounded-md bg-muted/50">
                                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                                        Nenhuma forma de pagamento cadastrada.
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
            <NewPersonDialog open={isNewPersonDialogOpen} onOpenChange={setIsNewPersonDialogOpen} />
        </>
    );
}
