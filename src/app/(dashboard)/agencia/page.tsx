

'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Globe, Instagram, Trash2, Image as ImageIcon, Search, Check, ChevronsUpDown, FileEdit, GripVertical, ExternalLink, Link as LinkIcon, Info } from 'lucide-react';
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
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';

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

    const handleCepSearch = async () => {
        const cep = address.cep.replace(/\D/g, '');
        if (cep.length !== 8) {
            toast({ title: "Erro", description: "CEP inválido.", variant: "destructive"});
            return;
        }

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            if (!response.ok) throw new Error('Erro ao buscar CEP');
            const data = await response.json();
            if (data.erro) {
                toast({ title: "Erro", description: "CEP não encontrado.", variant: "destructive"});
                return;
            }
            setAddress(prev => ({
                ...prev,
                logradouro: data.logradouro,
                bairro: data.bairro,
                localidade: data.localidade,
                uf: data.uf,
            }));
        } catch (error) {
            console.error(error);
            toast({ title: "Erro", description: "Falha ao buscar o CEP. Tente novamente.", variant: "destructive" });
        }
    };


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
                            <Button type="button" size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={handleCepSearch}>
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

interface AdditionalField {
  id: number;
  name: string;
  type: string;
  required: boolean;
}

const AdditionalFieldDialog = ({
  open,
  onOpenChange,
  onSave,
  fieldToEdit
}: {
  open: boolean,
  onOpenChange: (open: boolean) => void,
  onSave: (field: AdditionalField) => void,
  fieldToEdit: AdditionalField | null,
}) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('text');
  const [required, setRequired] = useState(false);

  React.useEffect(() => {
    if (fieldToEdit) {
      setName(fieldToEdit.name);
      setType(fieldToEdit.type);
      setRequired(fieldToEdit.required);
    } else {
      setName('');
      setType('text');
      setRequired(false);
    }
  }, [fieldToEdit]);

  const handleSave = () => {
    if (!name) {
      // Basic validation
      alert('O nome do campo é obrigatório.');
      return;
    }
    onSave({
      id: fieldToEdit?.id || Date.now(),
      name,
      type,
      required
    });
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Campo Adicional</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="field-name">Nome <span className="text-destructive">*</span></Label>
            <Input id="field-name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="field-type">Tipo <span className="text-destructive">*</span></Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger id="field-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Texto simples</SelectItem>
                <SelectItem value="number">Número</SelectItem>
                <SelectItem value="date">Data</SelectItem>
                <SelectItem value="textarea">Área de texto</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="field-required">Obrigatório <span className="text-destructive">*</span></Label>
            <Select value={String(required)} onValueChange={(val) => setRequired(val === 'true')}>
              <SelectTrigger id="field-required">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Sim</SelectItem>
                <SelectItem value="false">Não</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleSave}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};


const QuoteFormTab = () => {
    const { toast } = useToast();
    const [additionalFields, setAdditionalFields] = useState<AdditionalField[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [fieldToEdit, setFieldToEdit] = useState<AdditionalField | null>(null);

    const initialServices = {
        hospedagem: true,
        transporte: true,
        passeios: true,
        seguros: true,
        cruzeiro: false,
        roteiro: false,
    };
    
    const [services, setServices] = useState(initialServices);
    const [showDiscount, setShowDiscount] = useState(false);

    // Carregar configurações salvas no localStorage
    useEffect(() => {
        const savedSettings = localStorage.getItem('quoteFormSettings');
        if (savedSettings) {
            const { services: savedServices, showDiscount: savedShowDiscount } = JSON.parse(savedSettings);
            if (savedServices) setServices(savedServices);
            if (savedShowDiscount !== undefined) setShowDiscount(savedShowDiscount);
        }
    }, []);

    const handleServiceChange = (serviceId: keyof typeof services) => {
        setServices(prev => ({ ...prev, [serviceId]: !prev[serviceId] }));
    };

    const handleSaveField = (field: AdditionalField) => {
        setAdditionalFields(prev => {
            const index = prev.findIndex(f => f.id === field.id);
            if (index > -1) {
                const newFields = [...prev];
                newFields[index] = field;
                return newFields;
            }
            return [...prev, field];
        });
    };

    const handleNewField = () => {
        setFieldToEdit(null);
        setIsDialogOpen(true);
    };
    
    const handleEditField = (field: AdditionalField) => {
        setFieldToEdit(field);
        setIsDialogOpen(true);
    };

    const handleRemoveField = (id: number) => {
        setAdditionalFields(prev => prev.filter(f => f.id !== id));
    };

    const handleSave = () => {
        // Salvar no localStorage
        const settings = { services, showDiscount, additionalFields };
        localStorage.setItem('quoteFormSettings', JSON.stringify(settings));
        
        toast({
            title: "Sucesso!",
            description: "Formulário de cotação salvo com sucesso.",
        });
    };

    const fieldTypeLabels: { [key: string]: string } = {
      text: 'Texto simples',
      number: 'Número',
      date: 'Data',
      textarea: 'Área de texto'
    };

    return (
      <>
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
                            <Checkbox id="svc-hospedagem" checked={services.hospedagem} onCheckedChange={() => handleServiceChange('hospedagem')} />
                            <Label htmlFor="svc-hospedagem" className="font-normal">Hospedagem</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="svc-transporte" checked={services.transporte} onCheckedChange={() => handleServiceChange('transporte')} />
                            <Label htmlFor="svc-transporte" className="font-normal">Transporte</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="svc-passeios" checked={services.passeios} onCheckedChange={() => handleServiceChange('passeios')} />
                            <Label htmlFor="svc-passeios" className="font-normal">Passeios</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="svc-seguros" checked={services.seguros} onCheckedChange={() => handleServiceChange('seguros')} />
                            <Label htmlFor="svc-seguros" className="font-normal">Seguros</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="svc-cruzeiro" checked={services.cruzeiro} onCheckedChange={() => handleServiceChange('cruzeiro')} />
                            <Label htmlFor="svc-cruzeiro" className="font-normal">Cruzeiro</Label>
                        </div>
                         <div className="flex items-center space-x-2">
                            <Checkbox id="svc-roteiro" checked={services.roteiro} onCheckedChange={() => handleServiceChange('roteiro')}/>
                            <Label htmlFor="svc-roteiro" className="font-normal">Roteiro Personalizado</Label>
                        </div>
                    </div>
                     <div className="flex items-center space-x-2 pt-2">
                        <Switch id="show-discount" checked={showDiscount} onCheckedChange={setShowDiscount} />
                        <Label htmlFor="show-discount" className="font-normal">Exibir cupom de desconto</Label>
                    </div>
                </div>

                <Separator />
                
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <Label className="font-semibold">Configuração de campos adicionais</Label>
                        <Button onClick={handleNewField}>Incluir</Button>
                    </div>
                    {additionalFields.length > 0 ? (
                        <div className="border rounded-md">
                           {additionalFields.map(field => (
                               <div key={field.id} className="flex items-center justify-between p-3 border-b last:border-b-0">
                                   <div className="flex items-center gap-2">
                                       <GripVertical className="h-5 w-5 text-muted-foreground" />
                                       <div>
                                           <p className="font-medium">{field.name}</p>
                                           <p className="text-xs text-muted-foreground">
                                               {fieldTypeLabels[field.type]} - {field.required ? 'Obrigatório' : 'Opcional'}
                                            </p>
                                       </div>
                                   </div>
                                   <div className="flex items-center gap-1">
                                       <Button variant="ghost" size="icon" onClick={() => handleEditField(field)}>
                                           <FileEdit className="h-4 w-4" />
                                       </Button>
                                       <Button variant="ghost" size="icon" onClick={() => handleRemoveField(field.id)} className="text-destructive hover:text-destructive">
                                           <Trash2 className="h-4 w-4" />
                                       </Button>
                                   </div>
                               </div>
                           ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center text-muted-foreground bg-muted/50 rounded-md border border-dashed">
                            Nenhum campo adicional incluído.
                        </div>
                    )}
                </div>

                <div className="flex justify-end">
                    <Button onClick={handleSave}>Salvar</Button>
                </div>

            </CardContent>
        </Card>
        <AdditionalFieldDialog
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            onSave={handleSaveField}
            fieldToEdit={fieldToEdit}
        />
      </>
    )
}

const SettingsTab = () => {
    const { toast } = useToast();

    const handleSave = () => {
        toast({
            title: "Sucesso!",
            description: "Configurações salvas com sucesso.",
        });
    };

    return (
        <Card>
            <CardContent className="p-6 space-y-8">
                <div className="space-y-6">
                     <div className="space-y-2 max-w-sm">
                        <Label htmlFor="moeda">Moeda</Label>
                        <Select defaultValue="brl">
                            <SelectTrigger id="moeda">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="brl">Real Brasileiro (R$)</SelectItem>
                                <SelectItem value="usd">Dólar Americano (US$)</SelectItem>
                                <SelectItem value="eur">Euro (€)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="pixel-meta">Pixel Meta Ads</Label>
                            <Input id="pixel-meta" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="google-tag">Google Tag Manager</Label>
                            <Input id="google-tag" />
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Switch id="allow-post" />
                        <Label htmlFor="allow-post" className="font-normal">Permitir receber solicitações de cotações/pessoas via POST externo</Label>
                         <Button variant="outline" size="sm" asChild>
                            <a href="#" target="_blank">
                                Documentação <ExternalLink className="ml-2 h-3 w-3" />
                            </a>
                        </Button>
                    </div>

                     <div className="space-y-2">
                        <Label htmlFor="webhook-link">
                            Link do Webhook
                             <Button variant="outline" size="sm" className="ml-2" asChild>
                                <a href="#" target="_blank">
                                    Documentação <ExternalLink className="ml-2 h-3 w-3" />
                                </a>
                            </Button>
                        </Label>
                        <div className="relative">
                            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input id="webhook-link" className="pl-9" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-start">
                    <Button onClick={handleSave}>Salvar</Button>
                </div>
            </CardContent>
        </Card>
    );
};

const EmailSettingsTab = () => {
    const [sendMethod, setSendMethod] = useState('custom');
    const { toast } = useToast();

    const handleSave = () => {
        toast({
            title: "Sucesso!",
            description: "Configurações de e-mail salvas com sucesso.",
        });
    };

    return (
        <Card>
            <CardContent className="p-6 space-y-6">
                <Alert className="bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-700 dark:text-blue-200">
                    <Info className="h-4 w-4 !text-blue-800 dark:!text-blue-200" />
                    <AlertDescription>
                        Escolha aqui como prefere realizar envio de e-mail através da automação de comunicação ao cliente.
                    </AlertDescription>
                </Alert>

                <RadioGroup value={sendMethod} onValueChange={setSendMethod} className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="system" id="send-system" />
                        <Label htmlFor="send-system" className="font-normal">Enviar através do e-mail <span className="font-semibold">naoresponder@iddas.com.br</span></Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="custom" id="send-custom" />
                        <Label htmlFor="send-custom" className="font-normal">Enviar através do meu próprio e-mail</Label>
                    </div>
                </RadioGroup>

                {sendMethod === 'custom' && (
                    <div className="space-y-6 pt-6 border-t border-dashed">
                        <Alert className="bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-700 dark:text-yellow-200">
                            <Info className="h-4 w-4 !text-yellow-800 dark:!text-yellow-200" />
                            <AlertDescription>
                                Não nos responsabilizamos pelo envio realizado através de e-mail próprio.
                            </AlertDescription>
                        </Alert>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr,2fr,1fr,2fr,auto] gap-4 items-end">
                            <div className="space-y-2">
                                <Label htmlFor="smtp-email">E-mail</Label>
                                <Input id="smtp-email" placeholder="seuemail@provedor.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="smtp-server">Servidor SMTP</Label>
                                <Input id="smtp-server" placeholder="smtp.provedor.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="smtp-port">Porta</Label>
                                <Input id="smtp-port" placeholder="587" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="smtp-pass">Senha</Label>
                                <Input id="smtp-pass" type="password" />
                            </div>
                            <Button variant="outline" className="bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800">Testar</Button>
                        </div>
                    </div>
                )}
                
                <div className="flex justify-start pt-6">
                    <Button onClick={handleSave}>Salvar</Button>
                </div>
            </CardContent>
        </Card>
    )
};

const TextsTab = () => {
    const { toast } = useToast();

    const handleSave = () => {
        toast({
            title: "Sucesso!",
            description: "Textos padrão salvos com sucesso.",
        });
    };

    return (
        <Card>
            <CardContent className="p-6 space-y-6">
                <Alert className="bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-700 dark:text-blue-200">
                    <Info className="h-4 w-4 !text-blue-800 dark:!text-blue-200" />
                    <AlertDescription>
                        Realize a definição de textos padrões para as novas cotações.
                    </AlertDescription>
                </Alert>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="text-payment-method">Forma de Pagamento</Label>
                        <Textarea id="text-payment-method" rows={4} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="text-terms">Termos e Condições</Label>
                        <Textarea id="text-terms" rows={4} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="text-other-info">Outras Informações</Label>
                        <Textarea id="text-other-info" rows={4} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="text-service-desc">Descrição dos Serviços</Label>
                        <Textarea id="text-service-desc" rows={4} defaultValue="Visto Procura de trabalho" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="text-voucher-terms">Termos e Condições - Voucher</Label>
                        <Textarea id="text-voucher-terms" rows={4} />
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button onClick={handleSave}>Salvar</Button>
                </div>
            </CardContent>
        </Card>
    );
};


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
                    <SettingsTab />
                </TabsContent>
                 <TabsContent value="email" className="mt-6">
                    <EmailSettingsTab />
                </TabsContent>
                 <TabsContent value="textos" className="mt-6">
                    <TextsTab />
                </TabsContent>
            </Tabs>
        </div>
    );
}
