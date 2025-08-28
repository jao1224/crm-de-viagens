
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Switch } from '@/components/ui/switch';
import { Calendar as CalendarIcon, Instagram, Mail, MessageCircle, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Image from 'next/image';
import { Logo } from '@/components/logo';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { countries } from '@/lib/countries';

const DatePickerInput = ({ value, onSelect, placeholder = "dd/mm/aaaa" }: { value: Date | undefined, onSelect: (date: Date | undefined) => void, placeholder?: string }) => {
    const [inputValue, setInputValue] = React.useState(value ? format(value, "dd/MM/yyyy") : "");

    React.useEffect(() => {
        setInputValue(value ? format(value, "dd/MM/yyyy") : "");
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let v = e.target.value.replace(/\D/g, '').slice(0, 8);
        if (v.length > 2 && v.length <= 4) v = `${v.slice(0, 2)}/${v.slice(2)}`;
        else if (v.length > 4) v = `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4)}`;
        setInputValue(v);
    };

    const handleInputBlur = () => {
        if (inputValue.length === 10) {
            try {
                const parsedDate = parse(inputValue, "dd/MM/yyyy", new Date());
                 if (!isNaN(parsedDate.getTime())) {
                    onSelect(parsedDate);
                } else {
                    onSelect(undefined);
                    setInputValue("");
                }
            } catch (error) {
                 onSelect(undefined);
                 setInputValue("");
            }
        }
    };
    
    const handleDateSelect = (date: Date | undefined) => {
        onSelect(date);
    }

    return (
        <div className="relative w-full">
            <Input
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                placeholder={placeholder}
                className="pr-8"
            />
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                         <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={value}
                        onSelect={handleDateSelect}
                        initialFocus
                        locale={ptBR}
                        captionLayout="dropdown-buttons"
                        fromYear={new Date().getFullYear() - 100}
                        toYear={new Date().getFullYear() + 20}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default function CadastroPessoaPage() {
    const [nascimentoDate, setNascimentoDate] = React.useState<Date>();
    const [emissaoPassaporteDate, setEmissaoPassaporteDate] = React.useState<Date>();
    const [vencimentoPassaporteDate, setVencimentoPassaporteDate] = React.useState<Date>();

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
                    <CardTitle className="text-center text-3xl font-headline text-primary">Cadastro de Pessoa</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-8">
                        <section className="space-y-6">
                            <h3 className="font-semibold text-xl text-foreground">Dados Pessoais</h3>
                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="space-y-2 lg:col-span-1">
                                    <Label htmlFor="nome">Nome Completo <span className="text-destructive">*</span></Label>
                                    <Input id="nome" placeholder="Informe seu nome" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="nascimento">Nascimento <span className="text-destructive">*</span></Label>
                                    <DatePickerInput value={nascimentoDate} onSelect={setNascimentoDate} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="sexo">Sexo <span className="text-destructive">*</span></Label>
                                    <Select>
                                        <SelectTrigger id="sexo">
                                            <SelectValue placeholder="Não Informado" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="nao-informado">Não Informado</SelectItem>
                                            <SelectItem value="masculino">Masculino</SelectItem>
                                            <SelectItem value="feminino">Feminino</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="celular">Celular <span className="text-destructive">*</span></Label>
                                    <Input id="celular" type="tel" placeholder="(11) 96123-4567" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">E-mail</Label>
                                    <Input id="email" type="email" placeholder="seu@email.com" />
                                </div>
                            </div>
                             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="cpfCnpj">CPF/CNPJ</Label>
                                    <Input id="cpfCnpj" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="rg">RG</Label>
                                    <Input id="rg" />
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="id-estrangeiro">ID Estrangeiro</Label>
                                    <Input id="id-estrangeiro" />
                                </div>
                            </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="passaporte">Passaporte</Label>
                                    <Input id="passaporte" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="nacionalidade-passaporte">Nacionalidade do Passaporte</Label>
                                    <Select>
                                        <SelectTrigger id="nacionalidade-passaporte">
                                            <SelectValue placeholder="Selecione" />
                                        </SelectTrigger>
                                        <SelectContent>
                                             <SelectItem value="brasil">Brasil</SelectItem>
                                             <SelectItem value="portugal">Portugal</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="emissao-passaporte">Emissão Passaporte</Label>
                                    <DatePickerInput value={emissaoPassaporteDate} onSelect={setEmissaoPassaporteDate} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="vencimento-passaporte">Vencimento Passaporte</Label>
                                    <DatePickerInput value={vencimentoPassaporteDate} onSelect={setVencimentoPassaporteDate} />
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch id="aceita-comunicacao" />
                                <Label htmlFor="aceita-comunicacao">Aceito receber comunicação via E-mail/Whatsapp</Label>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h3 className="font-semibold text-xl text-foreground">Informações de Endereço</h3>
                             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="pais">País</Label>
                                    <Select defaultValue="brasil">
                                        <SelectTrigger id="pais">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {countries.map(country => (
                                                <SelectItem key={country.value} value={country.label}>{country.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cep">CEP <span className="text-destructive">*</span></Label>
                                     <div className="relative">
                                        <Input id="cep" />
                                        <Button type="button" size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                                            <Search className="h-4 w-4 text-muted-foreground" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cidade">Cidade <span className="text-destructive">*</span></Label>
                                    <Select>
                                        <SelectTrigger id="cidade">
                                            <SelectValue placeholder="Selecione a cidade" />
                                        </SelectTrigger>
                                        <SelectContent></SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="endereco">Endereço <span className="text-destructive">*</span></Label>
                                    <Input id="endereco" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="numero">Número <span className="text-destructive">*</span></Label>
                                    <Input id="numero" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="complemento">Complemento</Label>
                                    <Input id="complemento" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bairro">Bairro <span className="text-destructive">*</span></Label>
                                    <Input id="bairro" />
                                </div>
                            </div>
                        </section>
                        
                        <div className="flex flex-col items-center pt-6">
                            <p className="text-xs text-muted-foreground">* Informações de preenchimento obrigatório.</p>
                            <Button type="submit" className="mt-4 w-full md:w-auto">
                                Cadastrar
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

