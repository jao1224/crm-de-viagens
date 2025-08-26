
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Globe, Instagram, Trash2, Image as ImageIcon, Search } from 'lucide-react';
import Image from 'next/image';
import { Logo } from '@/components/logo';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { countries } from '@/lib/countries';
import { Textarea } from '@/components/ui/textarea';

const AgencyInfoTab = () => {
    
    const [cpfCnpj, setCpfCnpj] = useState('39.606.486/0001-41');

    const handleCpfCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, ''); 

        if (value.length <= 11) { 
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        } else { 
            value = value.slice(0, 14);
            value = value.replace(/^(\d{2})(\d)/, '$1.$2');
            value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
            value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
            value = value.replace(/(\d{4})(\d)/, '$1-$2');
        }
        setCpfCnpj(value);
    };
    
    return (
        <Card>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 space-y-4">
                    <Card className="p-4 flex flex-col items-center gap-4">
                         <div className="w-40 h-40 relative rounded-md overflow-hidden border-2 border-primary/20 flex items-center justify-center bg-muted">
                            <Logo className="h-24 w-24 text-primary/50" />
                            {/* <Image src="/logo-full.png" alt="Logo da Agência" layout="fill" objectFit="cover" /> */}
                        </div>
                        <Button variant="destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remover
                        </Button>
                    </Card>
                    <div className="space-y-2">
                        <Label htmlFor="layout-color">Cor do Layout</Label>
                        <Input id="layout-color" type="color" defaultValue="#4B0082" className="p-1 h-10"/>
                    </div>
                </div>
                <div className="md:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="agency-name">Nome da Agência <span className="text-destructive">*</span></Label>
                            <Input id="agency-name" defaultValue="No Meio do Mundo Viagens" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="agency-cnpj">CPF/CNPJ</Label>
                            <Input id="agency-cnpj" value={cpfCnpj} onChange={handleCpfCnpjChange} />
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="agency-email">E-mail</Label>
                             <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input id="agency-email" type="email" defaultValue="nomeiodomundoviagens@gmail.com" className="pl-9" />
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="agency-phone">Celular</Label>
                             <div className="flex gap-2">
                                <Select defaultValue="PT">
                                    <SelectTrigger className="w-24">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {/* Simplificando a lista para o exemplo */}
                                        <SelectItem value="BR">
                                            <div className="flex items-center gap-2">
                                               <Image src="/flags/br.svg" alt="Brasil" width={16} height={12} /> BR
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="PT">
                                             <div className="flex items-center gap-2">
                                               <Image src="/flags/pt.svg" alt="Portugal" width={16} height={12} /> PT
                                            </div>
                                        </SelectItem>
                                         <SelectItem value="US">
                                             <div className="flex items-center gap-2">
                                               <Image src="/flags/us.svg" alt="EUA" width={16} height={12} /> US
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <Input id="agency-phone" type="tel" defaultValue="924 782 269" />
                            </div>
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="agency-site">Site</Label>
                             <div className="relative">
                                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input id="agency-site" placeholder="Não é necessário informar o https://" className="pl-9" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="agency-instagram">Instagram</Label>
                             <div className="relative">
                                <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input id="agency-instagram" defaultValue="https://www.instagram.com/nomeiodomundoviagens" className="pl-9" />
                            </div>
                        </div>
                    </div>
                </div>
                 <div className="md:col-span-3 flex justify-end">
                    <Button>Salvar</Button>
                </div>
            </CardContent>
        </Card>
    );
};

const AddressTab = () => {
    const [address, setAddress] = useState({
        cep: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        localidade: '',
        uf: '',
        pais: 'Brasil'
    });

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setAddress(prev => ({ ...prev, [id]: value }));
    }

    return (
        <Card>
            <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="pais">País</Label>
                        <Select name="pais" value={address.pais} onValueChange={(v) => setAddress(p => ({...p, pais: v}))}>
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
                        <Label htmlFor="cep">CEP</Label>
                        <div className="relative">
                            <Input id="cep" value={address.cep} onChange={handleAddressChange} />
                            <Button type="button" size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                                <Search className="h-4 w-4 text-muted-foreground" />
                            </Button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="localidade">Cidade</Label>
                        <Input id="localidade" value={address.localidade} onChange={handleAddressChange} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="logradouro">Endereço</Label>
                        <Input id="logradouro" value={address.logradouro} onChange={handleAddressChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="numero">Número</Label>
                        <Input id="numero" value={address.numero} onChange={handleAddressChange} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="complemento">Complemento</Label>
                        <Input id="complemento" value={address.complemento} onChange={handleAddressChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="bairro">Bairro</Label>
                        <Input id="bairro" value={address.bairro} onChange={handleAddressChange} />
                    </div>
                </div>
                 <div className="flex justify-end">
                    <Button>Salvar</Button>
                </div>
            </CardContent>
        </Card>
    );
};

const PlaceholderTab = ({ title }: { title: string }) => (
    <Card>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>Configurações para {title.toLowerCase()}.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="h-40 flex items-center justify-center text-muted-foreground bg-muted/50 rounded-md">
                Conteúdo para {title} em breve.
            </div>
        </CardContent>
    </Card>
);

export default function AgenciaPage() {
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-primary">Agência</h1>
            </header>

            <Tabs defaultValue="agencia" className="w-full">
                <TabsList>
                    <TabsTrigger value="agencia">Agência</TabsTrigger>
                    <TabsTrigger value="endereco">Endereço</TabsTrigger>
                    <TabsTrigger value="formulario">Formulário de Cotação</TabsTrigger>
                    <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
                    <TabsTrigger value="email">Configuração de E-mail</TabsTrigger>
                    <TabsTrigger value="textos">Textos</TabsTrigger>
                </TabsList>

                <TabsContent value="agencia" className="mt-6">
                    <AgencyInfoTab />
                </TabsContent>
                <TabsContent value="endereco" className="mt-6">
                    <AddressTab />
                </TabsContent>
                <TabsContent value="formulario" className="mt-6">
                    <PlaceholderTab title="Formulário de Cotação" />
                </TabsContent>
                <TabsContent value="configuracoes" className="mt-6">
                    <PlaceholderTab title="Configurações" />
                </TabsContent>
                 <TabsContent value="email" className="mt-6">
                    <PlaceholderTab title="Configuração de E-mail" />
                </TabsContent>
                 <TabsContent value="textos" className="mt-6">
                    <PlaceholderTab title="Textos" />
                </TabsContent>
            </Tabs>
        </div>
    );
}
