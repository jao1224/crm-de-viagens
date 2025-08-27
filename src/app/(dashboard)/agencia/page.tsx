
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Globe, Instagram, Trash2, Image as ImageIcon, Search, Check, ChevronsUpDown } from 'lucide-react';
import Image from 'next/image';
import { Logo } from '@/components/logo';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { countries, type Country } from '@/lib/countries';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';


const CountryCombobox = ({ selectedCountry, onSelectCountry }: { selectedCountry: Country | undefined, onSelectCountry: (country: Country) => void }) => {
    const [open, setOpen] = useState(false);
    const getFlagUrl = (countryCode: string) => `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[150px] justify-between"
                >
                    {selectedCountry ? (
                        <div className="flex items-center gap-2">
                            <Image src={getFlagUrl(selectedCountry.value)} alt={selectedCountry.label} width={20} height={15} />
                            <span>{`+${selectedCountry.phone}`}</span>
                        </div>
                    ) : (
                        "Select country"
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] p-0">
                <Command>
                    <CommandInput placeholder="Procurar país..." />
                    <CommandList>
                        <CommandEmpty>Nenhum país encontrado.</CommandEmpty>
                        <CommandGroup>
                            {countries.map((country) => (
                                <CommandItem
                                    key={country.value}
                                    value={country.label}
                                    onSelect={() => {
                                        onSelectCountry(country);
                                        setOpen(false);
                                    }}
                                >
                                    <div className="flex items-center gap-2 w-full">
                                        <Image src={getFlagUrl(country.value)} alt={country.label} width={20} height={15} className="shrink-0" />
                                        <span className="flex-1 truncate">{country.label}</span>
                                        <span className="text-muted-foreground text-xs">{`+${country.phone}`}</span>
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

const AgencyInfoTab = () => {
    const { toast } = useToast();
    const [cpfCnpj, setCpfCnpj] = useState('39.606.486/0001-41');
    const [logo, setLogo] = useState<string | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [selectedPhoneCountry, setSelectedPhoneCountry] = useState<Country | undefined>(countries.find(c => c.value === 'PT'));


    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogo(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveLogo = () => {
        setLogo(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

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

    const handleSave = () => {
        toast({
            title: "Sucesso!",
            description: "Informações da agência salvas com sucesso.",
        });
    };
    
    return (
        <Card>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 space-y-4">
                    <Card className="p-4 flex flex-col items-center gap-4">
                         <div className="w-40 h-40 relative rounded-md overflow-hidden border-2 border-primary/20 flex items-center justify-center bg-muted">
                            {logo ? (
                                <Image src={logo} alt="Logo da Agência" layout="fill" objectFit="cover" />
                            ) : (
                                <Logo className="h-24 w-24 text-primary/50" />
                            )}
                        </div>
                        <div className="flex gap-2">
                             <Button asChild variant="outline">
                                <label htmlFor="logo-upload" className="cursor-pointer">
                                    <ImageIcon className="mr-2 h-4 w-4" />
                                    Adicionar
                                </label>
                            </Button>
                             <input
                                type="file"
                                id="logo-upload"
                                ref={fileInputRef}
                                onChange={handleLogoChange}
                                className="hidden"
                                accept="image/png, image/jpeg, image/gif"
                            />
                            <Button variant="destructive" onClick={handleRemoveLogo} disabled={!logo}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Remover
                            </Button>
                        </div>
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
                                <CountryCombobox selectedCountry={selectedPhoneCountry} onSelectCountry={setSelectedPhoneCountry} />
                                <Input id="agency-phone" type="tel" defaultValue="924 782 269" className="flex-1" />
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
                    <Button onClick={handleSave}>Salvar</Button>
                </div>
            </CardContent>
        </Card>
    );
};

const AddressTab = () => {
    const { toast } = useToast();
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

    const getFlagUrl = (countryCode: string) => `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;

    const handleSave = () => {
        toast({
            title: "Sucesso!",
            description: "Endereço salvo com sucesso.",
        });
    };

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
                                    <SelectItem key={country.value} value={country.label}>
                                        <div className="flex items-center gap-2">
                                           <Image src={getFlagUrl(country.value)} alt={country.label} width={20} height={15} />
                                           {country.label}
                                        </div>
                                    </SelectItem>
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
                    <Button onClick={handleSave}>Salvar</Button>
                </div>
            </CardContent>
        </Card>
    );
};

const QuoteFormTab = () => {
    const { toast } = useToast();

    const handleSave = () => {
        toast({
            title: "Sucesso!",
            description: "Formulário de cotação salvo com sucesso.",
        });
    };

    return (
        <Card>
            <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="quote-instructions">Instruções da página de Solicitação de Cotação</Label>
                    <Textarea id="quote-instructions" rows={5} />
                </div>

                <Separator />

                <div className="space-y-4">
                    <Label className="font-semibold">Serviços adicionais</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="svc-hospedagem" defaultChecked />
                            <Label htmlFor="svc-hospedagem" className="font-normal">Hospedagem</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="svc-transporte" defaultChecked />
                            <Label htmlFor="svc-transporte" className="font-normal">Transporte</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="svc-passeios" defaultChecked />
                            <Label htmlFor="svc-passeios" className="font-normal">Passeios</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="svc-seguros" defaultChecked />
                            <Label htmlFor="svc-seguros" className="font-normal">Seguros</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="svc-cruzeiro" />
                            <Label htmlFor="svc-cruzeiro" className="font-normal">Cruzeiro</Label>
                        </div>
                         <div className="flex items-center space-x-2">
                            <Checkbox id="svc-roteiro" />
                            <Label htmlFor="svc-roteiro" className="font-normal">Roteiro Personalizado</Label>
                        </div>
                    </div>
                     <div className="flex items-center space-x-2 pt-2">
                        <Switch id="show-discount" />
                        <Label htmlFor="show-discount" className="font-normal">Exibir cupom de desconto</Label>
                    </div>
                </div>

                <Separator />
                
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <Label className="font-semibold">Configuração de campos adicionais</Label>
                        <Button>Incluir</Button>
                    </div>
                    <div className="p-8 text-center text-muted-foreground bg-muted/50 rounded-md border border-dashed">
                        Nenhum campo adicional incluído.
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button onClick={handleSave}>Salvar</Button>
                </div>

            </CardContent>
        </Card>
    )
}

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
                    <QuoteFormTab />
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

    

    