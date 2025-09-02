

'use client';

import React, { useState, useEffect, useRef } from 'react';
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
import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar as CalendarIcon, MoreVertical, UserPlus, Image as ImageIcon, Upload, Library, Eye, ListFilter, PlusCircle, ArrowRight, ArrowLeft, Plane, Hotel, TrainFront, Ship, Camera, HeartPulse, ShoppingCart, Minus, Plus, Info, AlertTriangle, Trash2, User, Mail, Globe, Instagram, Gem, Paperclip, ListTodo, MessageSquare, Star, ChevronsUpDown, ReceiptText, History, DollarSign, Pencil, FileText as FileTextIcon, HandCoins, Handshake, MessagesSquare, FileArchive, Check, Users, Search, Clock, Luggage, RefreshCw, PencilLine } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Image from 'next/image';
import { countries } from '@/lib/countries';
import RichTextEditor from '@/components/rich-text-editor';
import { mockPeople } from '@/lib/mock-data';
import type { Person } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';


interface FlightData {
    id: string;
    type: 'ida' | 'volta' | 'interno';
    origin: string;
    destination: string;
    departureDate: string;
    departureTime: string;
    arrivalDate: string;
    arrivalTime: string;
    airline?: string;
    flightNumber?: string;
    locator?: string;
    purchaseNumber?: string;
}

interface HotelData {
    id: string;
    name: string;
    checkIn: string;
    checkInTime: string;
    checkOut: string;
    checkOutTime: string;
    nights: number;
    rooms: number;
    description: string;
}


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

const nationalities = [
    { value: "afghan", label: "Afegã" },
    { value: "german", label: "Alemã" },
    { value: "andorran", label: "Andorrana" },
    { value: "angolan", label: "Angolana" },
    { value: "antiguan", label: "Antiguana" },
    { value: "algerian", label: "Argelina" },
    { value: "argentine", label: "Argentina" },
    { value: "armenian", label: "Armênia" },
    { value: "australian", label: "Australiana" },
    { value: "austrian", label: "Austríaca" },
    { value: "azerbaijani", label: "Azerbaijana" },
    { value: "bahamian", label: "Bahamense" },
    { value: "bahraini", label: "Bareinita" },
    { value: "bangladeshi", label: "Bangladesa" },
    { value: "barbadian", label: "Barbadiana" },
    { value: "belarusian", label: "Bielorrussa" },
    { value: "belgian", label: "Belga" },
    { value: "belizean", label: "Belizenha" },
    { value: "beninese", label: "Beninense" },
    { value: "bhutanese", label: "Butanesa" },
    { value: "bolivian", label: "Boliviana" },
    { value: "bosnian", label: "Bósnia" },
    { value: "botswanan", label: "Botsuana" },
    { value: "brazilian", label: "Brasileira" },
    { value: "bruneian", label: "Bruneana" },
    { value: "bulgarian", label: "Búlgara" },
    { value: "burkinabe", label: "Burquinense" },
    { value: "burundian", label: "Burundiana" },
    { value: "cambodian", label: "Cambojana" },
    { value: "cameroonian", label: "Camaronesa" },
    { value: "canadian", label: "Canadense" },
    { value: "cape_verdean", label: "Cabo-verdiana" },
    { value: "qatari", label: "Catariana" },
    { value: "kazakh", label: "Cazaque" },
    { value: "chadian", label: "Chadiana" },
    { value: "chilean", label: "Chilena" },
    { value: "chinese", label: "Chinesa" },
    { value: "cypriot", label: "Cipriota" },
    { value: "colombian", label: "Colombiana" },
    { value: "comorian", label: "Comoriana" },
    { value: "congolese_drc", label: "Congolesa (RDC)" },
    { value: "congolese_roc", label: "Congolesa (República)" },
    { value: "north_korean", label: "Norte-coreana" },
    { value: "south_korean", label: "Sul-coreana" },
    { value: "ivorian", label: "Marfinense" },
    { value: "costa_rican", label: "Costa-riquenha" },
    { value: "croatian", label: "Croata" },
    { value: "cuban", label: "Cubana" },
    { value: "danish", label: "Dinamarquesa" },
    { value: "djiboutian", label: "Djibutiana" },
    { value: "dominican", label: "Dominiquesa" },
    { value: "egyptian", label: "Egípcia" },
    { value: "salvadoran", label: "Salvadorenha" },
    { value: "emirati", label: "Emiratense" },
    { value: "ecuadorian", label: "Equatoriana" },
    { value: "eritrean", label: "Eritreia" },
    { value: "slovak", label: "Eslovaca" },
    { value: "slovenian", label: "Eslovena" },
    { value: "spanish", label: "Espanhola" },
    { value: "estonian", label: "Estoniana" },
    { value: "ethiopian", label: "Etíope" },
    { value: "fijian", label: "Fijiana" },
    { value: "filipino", label: "Filipina" },
    { value: "finnish", label: "Finlandesa" },
    { value: "french", label: "Francesa" },
    { value: "gabonese", label: "Gabonesa" },
    { value: "gambian", label: "Gambiana" },
    { value: "ghanaian", label: "Ganesa" },
    { value: "georgian", label: "Georgiana" },
    { value: "grenadian", label: "Granadina" },
    { value: "greek", label: "Grega" },
    { value: "guatemalan", label: "Guatemalteca" },
    { value: "guyanese", label: "Guianesa" },
    { value: "guinean", label: "Guineense" },
    { value: "equatorial_guinean", label: "Guinéu-equatoriana" },
    { value: "guinea_bissauan", label: "Guineense (Bissau)" },
    { value: "haitian", label: "Haitiana" },
    { value: "dutch", label: "Holandesa" },
    { value: "honduran", label: "Hondurenha" },
    { value: "hungarian", label: "Húngara" },
    { value: "yemeni", label: "Iemenita" },
    { value: "marshallese", label: "Marshallina" },
    { value: "solomon_islander", label: "Salomônica" },
    { value: "indian", label: "Indiana" },
    { value: "indonesian", label: "Indonésia" },
    { value: "iranian", label: "Iraniana" },
    { value: "iraqi", label: "Iraquiana" },
    { value: "irish", label: "Irlandesa" },
    { value: "icelandic", label: "Islandesa" },
    { value: "israeli", label: "Israelense" },
    { value: "italian", label: "Italiana" },
    { value: "jamaican", label: "Jamaicana" },
    { value: "japanese", label: "Japonesa" },
    { value: "jordanian", label: "Jordaniana" },
    { value: "kiribatian", label: "Kiribatiana" },
    { value: "kosovar", label: "Kosovar" },
    { value: "kuwaiti", label: "Kuwaitiana" },
    { value: "laotian", label: "Laosiana" },
    { value: "lesotho", label: "Lesota" },
    { value: "latvian", label: "Letã" },
    { value: "lebanese", label: "Libanesa" },
    { value: "liberian", label: "Liberiana" },
    { value: "libyan", label: "Líbia" },
    { value: "liechtensteiner", label: "Liechtensteiniense" },
    { value: "lithuanian", label: "Lituana" },
    { value: "luxembourgish", label: "Luxemburguesa" },
    { value: "macedonian", label: "Macedônia" },
    { value: "malagasy", label: "Malgaxe" },
    { value: "malaysian", label: "Malaia" },
    { value: "malawian", label: "Malauiana" },
    { value: "maldivan", label: "Maldiva" },
    { value: "malian", label: "Maliana" },
    { value: "maltese", label: "Maltesa" },
    { value: "moroccan", label: "Marroquina" },
    { value: "mauritanian", label: "Mauritana" },
    { value: "mauritian", label: "Mauriciana" },
    { value: "mexican", label: "Mexicana" },
    { value: "micronesian", label: "Micronésia" },
    { value: "mozambican", label: "Moçambicana" },
    { value: "moldovan", label: "Moldávia" },
    { value: "monacan", label: "Monegasca" },
    { value: "mongolian", label: "Mongol" },
    { value: "montenegrin", label: "Montenegrina" },
    { value: "myanmarese", label: "Birmanesa" },
    { value: "namibian", label: "Namibiana" },
    { value: "nauruan", label: "Nauruana" },
    { value: "nepalese", label: "Nepalesa" },
    { value: "nicaraguan", label: "Nicaraguense" },
    { value: "nigerien", label: "Nigerina" },
    { value: "nigerian", label: "Nigeriana" },
    { value: "norwegian", label: "Norueguesa" },
    { value: "new_zealander", label: "Neozelandesa" },
    { value: "omani", label: "Omanense" },
    { value: "palauan", label: "Palauana" },
    { value: "panamanian", label: "Panamenha" },
    { value: "papua_new_guinean", label: "Papuásia" },
    { value: "pakistani", label: "Paquistanesa" },
    { value: "paraguayan", label: "Paraguaia" },
    { value: "peruvian", label: "Peruana" },
    { value: "polish", label: "Polonesa" },
    { value: "portuguese", label: "Portuguesa" },
    { value: "kenyan", label: "Queniana" },
    { value: "kyrgyz", label: "Quirguiz" },
    { value: "british", label: "Britânica" },
    { value: "central_african", label: "Centro-africana" },
    { value: "czech", label: "Tcheca" },
    { value: "dominican_republic", label: "Dominicana" },
    { value: "romanian", label: "Romena" },
    { value: "rwandan", label: "Ruandesa" },
    { value: "russian", label: "Russa" },
    { value: "saint_kitts_and_nevis", label: "São-cristovense" },
    { value: "saint_lucian", label: "Santa-lucense" },
    { value: "saint_vincent_and_the_grenadines", label: "São-vicentina" },
    { value: "samoan", label: "Samoana" },
    { value: "san_marinese", label: "São-marinense" },
    { value: "sao_tomean", label: "Santomense" },
    { value: "saudi", label: "Saudita" },
    { value: "senegalese", label: "Senegalesa" },
    { value: "sierra_leonean", label: "Serra-leonesa" },
    { value: "serbian", label: "Sérvia" },
    { value: "seychellois", label: "Seichelense" },
    { value: "singaporean", label: "Singapurense" },
    { value: "syrian", label: "Síria" },
    { value: "somali", label: "Somali" },
    { value: "sri_lankan", label: "Cingalesa" },
    { value: "swazi", label: "Suazi" },
    { value: "sudanese", label: "Sudanesa" },
    { value: "south_sudanese", label: "Sul-sudanesa" },
    { value: "swedish", label: "Sueca" },
    { value: "swiss", label: "Suíça" },
    { value: "surinamese", label: "Surinamesa" },
    { value: "thai", label: "Tailandesa" },
    { value: "taiwanese", label: "Taiwanesa" },
    { value: "tanzanian", label: "Tanzaniana" },
    { value: "tajik", label: "Tadjique" },
    { value: "east_timorese", label: "Timorense" },
    { value: "togolese", label: "Togolesa" },
    { value: "tongan", label: "Tonganesa" },
    { value: "trinidadian_and_tobagonian", label: "Trinitário-tobagense" },
    { value: "tunisian", label: "Tunisiana" },
    { value: "turkmen", label: "Turcomena" },
    { value: "turkish", label: "Turca" },
    { value: "tuvaluan", label: "Tuvaluana" },
    { value: "ukrainian", label: "Ucraniana" },
    { value: "ugandan", label: "Ugandense" },
    { value: "uruguayan", label: "Uruguaia" },
    { value: "uzbek", label: "Uzbeque" },
    { value: "vanuatuan", label: "Vanuatuense" },
    { value: "vatican", label: "Vaticana" },
    { value: "venezuelan", label: "Venezuelana" },
    { value: "vietnamese", label: "Vietnamita" },
    { value: "zambian", label: "Zambiana" },
    { value: "zimbabwean", label: "Zimbabuana" }
];

const airlines = [
  { value: "ad", label: "Azul" },
  { value: "g3", label: "GOL" },
  { value: "jj", label: "LATAM Airlines" },
  { value: "tp", label: "TAP Portugal" },
  { value: "ar", label: "Aerolineas Argentinas" },
  { value: "am", label: "AeroMexico" },
  { value: "ac", "label": "Air Canada" },
  { value: "af", "label": "Air France" },
  { value: "av", "label": "Avianca" },
  { value: "ba", "label": "British Airways" },
  { value: "cm", "label": "Copa Airlines" },
  { value: "ek", "label": "Emirates" },
  { value: "ib", "label": "Iberia" },
  { value: "kl", "label": "KLM" },
  { value: "lh", "label": "Lufthansa" },
  { value: "qr", "label": "Qatar Airways" },
  { value: "tk", "label": "Turkish Airlines" },
  { value: "ua", "label": "United Airlines" },
];


const initialAddressState = {
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    localidade: '',
    uf: '',
    pais: 'Brasil'
};

const NewPersonDialog = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => {
    const { toast } = useToast();
    const [rating, setRating] = useState(0);
    const [birthDate, setBirthDate] = useState<Date>();
    const [passportIssueDate, setPassportIssueDate] = useState<Date>();
    const [passportExpiryDate, setPassportExpiryDate] = useState<Date>();
    const [visaValidityDate, setVisaValidityDate] = useState<Date>();
    const [address, setAddress] = useState(initialAddressState);

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setAddress(prev => ({ ...prev, [id.replace('addr-', '')]: value }));
    }

    const handleCepSearch = async () => {
        const cep = address.cep.replace(/\D/g, '');
        if (cep.length !== 8) {
            alert('CEP inválido.');
            return;
        }

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            if (!response.ok) throw new Error('Erro ao buscar CEP');
            const data = await response.json();
            if (data.erro) {
                alert('CEP não encontrado.');
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
            alert('Falha ao buscar o CEP. Tente novamente.');
        }
    };
    
    const handleSave = () => {
        onOpenChange(false);
        toast({
            title: "Sucesso!",
            description: "Nova pessoa salva com sucesso.",
        });
    }

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
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div className="flex items-center">
                                                {[1, 2, 3, 4, 5].map((diamond) => (
                                                    <button key={diamond} onClick={() => setRating(diamond)} className="focus:outline-none">
                                                        <Gem className={cn("h-5 w-5", rating >= diamond ? "text-blue-400 fill-blue-400" : "text-muted-foreground/30")} />
                                                    </button>
                                                ))}
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Classifique esta pessoa</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="birth-date">Data Nascimento</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !birthDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {birthDate ? format(birthDate, "dd/MM/yyyy") : <span>dd/mm/aaaa</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={birthDate}
                                        onSelect={setBirthDate}
                                        initialFocus
                                        locale={ptBR}
                                        captionLayout="dropdown-buttons"
                                        fromYear={new Date().getFullYear() - 100}
                                        toYear={new Date().getFullYear() + 20}
                                    />
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
                         <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
                            <TabsList className="bg-transparent p-0 h-auto gap-1">
                                <TabsTrigger value="contato">Contato</TabsTrigger>
                                <TabsTrigger value="documentos">Documentos</TabsTrigger>
                                <TabsTrigger value="informacoes">Informações</TabsTrigger>
                                <TabsTrigger value="endereco">Endereço</TabsTrigger>
                                <TabsTrigger value="observacao">Observação</TabsTrigger>
                            </TabsList>
                        </div>
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
                                            {nationalities.map((nat) => (
                                                <SelectItem key={nat.value} value={nat.value}>{nat.label}</SelectItem>
                                            ))}
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
                                            <SelectItem value="solteiro">Solteiro(a)</SelectItem>
                                            <SelectItem value="casado">Casado(a)</SelectItem>
                                            <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                                            <SelectItem value="viuvo">Viuvo(a)</SelectItem>
                                            <SelectItem value="uniao-estavel">União Estável</SelectItem>
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
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !passportIssueDate && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {passportIssueDate ? format(passportIssueDate, "dd/MM/yyyy") : <span>dd/mm/aaaa</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={passportIssueDate}
                                                onSelect={setPassportIssueDate}
                                                initialFocus
                                                locale={ptBR}
                                                captionLayout="dropdown-buttons"
                                                fromYear={new Date().getFullYear() - 100}
                                                toYear={new Date().getFullYear() + 20}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="doc-passport-expiry">Vencimento Passaporte</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !passportExpiryDate && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {passportExpiryDate ? format(passportExpiryDate, "dd/MM/yyyy") : <span>dd/mm/aaaa</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={passportExpiryDate}
                                                onSelect={setPassportExpiryDate}
                                                initialFocus
                                                locale={ptBR}
                                                captionLayout="dropdown-buttons"
                                                fromYear={new Date().getFullYear() - 100}
                                                toYear={new Date().getFullYear() + 20}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="doc-passport-nat">Nacionalidade do Passaporte</Label>
                                    <Select>
                                        <SelectTrigger id="doc-passport-nat">
                                            <SelectValue placeholder="Selecione a Nacionalidade..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {nationalities.map((nat) => (
                                                <SelectItem key={nat.value} value={nat.value}>{nat.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
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
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !visaValidityDate && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {visaValidityDate ? format(visaValidityDate, "dd/MM/yyyy") : <span>dd/mm/aaaa</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={visaValidityDate}
                                                onSelect={setVisaValidityDate}
                                                initialFocus
                                                locale={ptBR}
                                                captionLayout="dropdown-buttons"
                                                fromYear={new Date().getFullYear() - 100}
                                                toYear={new Date().getFullYear() + 20}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                        </TabsContent>
                         <TabsContent value="informacoes" className="pt-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="info-profession">Profissão</Label>
                                    <Select>
                                        <SelectTrigger id="info-profession">
                                            <SelectValue placeholder="Selecione" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {/* Add profession options here */}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="info-income">Renda</Label>
                                    <Input id="info-income" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="info-sales-channel">Canal de Venda</Label>
                                    <Select>
                                        <SelectTrigger id="info-sales-channel">
                                            <SelectValue placeholder="Selecione" />
                                        </SelectTrigger>
                                        <SelectContent>
                                             {/* Add sales channel options here */}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </TabsContent>
                         <TabsContent value="endereco" className="pt-4">
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="addr-pais">País</Label>
                                        <Select value={address.pais} onValueChange={(v) => setAddress(p => ({...p, pais: v}))}>
                                            <SelectTrigger id="addr-pais">
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
                                        <Label htmlFor="addr-cep">CEP</Label>
                                        <div className="relative">
                                            <Input id="addr-cep" value={address.cep} onChange={handleAddressChange} />
                                            <Button type="button" size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={handleCepSearch}>
                                                <Search className="h-4 w-4 text-muted-foreground" />
                                            </Button>
                                        </div>
                                    </div>
                                     <div className="space-y-2">
                                        <Label htmlFor="addr-localidade">Cidade</Label>
                                        <Input id="addr-localidade" value={address.localidade} onChange={handleAddressChange} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-[3fr,1fr] gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="addr-logradouro">Endereço</Label>
                                        <Input id="addr-logradouro" value={address.logradouro} onChange={handleAddressChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="addr-numero">Número</Label>
                                        <Input id="addr-numero" value={address.numero} onChange={handleAddressChange} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="addr-complemento">Complemento</Label>
                                        <Input id="addr-complemento" value={address.complemento} onChange={handleAddressChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="addr-bairro">Bairro</Label>
                                        <Input id="addr-bairro" value={address.bairro} onChange={handleAddressChange} />
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button variant="outline">Cancelar</Button>
                                    <Button>Salvar</Button>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="observacao" className="pt-4">
                           <Textarea placeholder="Observações sobre esta pessoa..." />
                        </TabsContent>
                    </Tabs>

                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                    <Button onClick={handleSave}>Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const CostInfoDialog = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => {
    const handleSave = () => {
        onOpenChange(false);
    }
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-foreground">Informação dos Custos</DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr,1fr] gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="cost-type">Tipo</Label>
                            <Select defaultValue="dinheiro">
                                <SelectTrigger id="cost-type">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="dinheiro">Dinheiro</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cost-description">Descrição <span className="text-destructive">*</span></Label>
                            <Input id="cost-description" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cost-value">Valor <span className="text-destructive">*</span></Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                                <Input id="cost-value" className="pl-8" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-md border">
                        <div className="bg-red-900 text-white font-semibold p-3 rounded-t-md">
                            Pagamento
                        </div>
                        <div className="p-4 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                 <div className="space-y-2">
                                    <Label htmlFor="cost-supplier">Fornecedor</Label>
                                     <div className="flex items-center gap-2">
                                        <Select>
                                            <SelectTrigger id="cost-supplier">
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                            <SelectContent></SelectContent>
                                        </Select>
                                        <Button size="icon"><UserPlus className="h-4 w-4" /></Button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cost-account">Conta</Label>
                                    <Select>
                                        <SelectTrigger id="cost-account">
                                            <SelectValue placeholder="Selecione" />
                                        </SelectTrigger>
                                        <SelectContent></SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cost-category">Categoria</Label>
                                     <div className="flex items-center gap-2">
                                        <Select>
                                            <SelectTrigger id="cost-category">
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                            <SelectContent></SelectContent>
                                        </Select>
                                        <Button size="icon"><Plus className="h-4 w-4" /></Button>
                                    </div>
                                </div>
                            </div>
                             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="cost-due-date">Vencimento</Label>
                                     <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full justify-start text-left font-normal"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                <span>24/08/2025</span>
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                initialFocus
                                                locale={ptBR}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cost-payment-method">Forma de Pagamento</Label>
                                    <Select>
                                        <SelectTrigger id="cost-payment-method">
                                            <SelectValue placeholder="Selecione" />
                                        </SelectTrigger>
                                        <SelectContent></SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cost-installments">Parcelas</Label>
                                    <Input id="cost-installments" type="number" defaultValue={1} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                    <Button onClick={handleSave}>Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const SaleValueInfoDialog = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => {
    const handleSave = () => {
        onOpenChange(false);
    }
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-foreground">Informação dos Valores de Venda</DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="sale-description">Descrição <span className="text-destructive">*</span></Label>
                            <Input id="sale-description" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="sale-value">Valor <span className="text-destructive">*</span></Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                                <Input id="sale-value" className="pl-8" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-md border">
                        <div className="bg-blue-900 text-white font-semibold p-3 rounded-t-md">
                            Pagamento
                        </div>
                        <div className="p-4 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                 <div className="space-y-2">
                                    <Label htmlFor="sale-account">Conta <span className="text-destructive">*</span></Label>
                                     <Select>
                                        <SelectTrigger id="sale-account">
                                            <SelectValue placeholder="Selecione" />
                                        </SelectTrigger>
                                        <SelectContent></SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="sale-category">Categoria <span className="text-destructive">*</span></Label>
                                    <div className="flex items-center gap-2">
                                        <Select>
                                            <SelectTrigger id="sale-category">
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                            <SelectContent></SelectContent>
                                        </Select>
                                        <Button size="icon"><Plus className="h-4 w-4" /></Button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="sale-due-date">Vencimento <span className="text-destructive">*</span></Label>
                                     <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full justify-start text-left font-normal"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                <span>24/08/2025</span>
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                initialFocus
                                                locale={ptBR}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="sale-payment-method">Forma de Pagamento <span className="text-destructive">*</span></Label>
                                    <Select>
                                        <SelectTrigger id="sale-payment-method">
                                            <SelectValue placeholder="Selecione" />
                                        </SelectTrigger>
                                        <SelectContent></SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="sale-installments">Parcelas <span className="text-destructive">*</span></Label>
                                    <Input id="sale-installments" type="number" defaultValue={1} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                    <Button onClick={handleSave}>Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const BonusInfoDialog = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => {
    const handleSave = () => {
        onOpenChange(false);
    }
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-foreground">Informação da Bonificação Recebida</DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="bonus-description">Descrição <span className="text-destructive">*</span></Label>
                            <Input id="bonus-description" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bonus-value">Bonificação <span className="text-destructive">*</span></Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                                <Input id="bonus-value" className="pl-8" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-md border">
                        <div className="bg-blue-900 text-white font-semibold p-3 rounded-t-md">
                            Pagamento
                        </div>
                        <div className="p-4 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                 <div className="space-y-2">
                                    <Label htmlFor="bonus-supplier">Fornecedor <span className="text-destructive">*</span></Label>
                                     <div className="flex items-center gap-2">
                                        <Select>
                                            <SelectTrigger id="bonus-supplier">
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                            <SelectContent></SelectContent>
                                        </Select>
                                        <Button size="icon"><UserPlus className="h-4 w-4" /></Button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bonus-account">Conta <span className="text-destructive">*</span></Label>
                                    <Select>
                                        <SelectTrigger id="bonus-account">
                                            <SelectValue placeholder="Selecione" />
                                        </SelectTrigger>
                                        <SelectContent></SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bonus-category">Categoria <span className="text-destructive">*</span></Label>
                                     <div className="flex items-center gap-2">
                                        <Select>
                                            <SelectTrigger id="bonus-category">
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                            <SelectContent></SelectContent>
                                        </Select>
                                        <Button size="icon"><Plus className="h-4 w-4" /></Button>
                                    </div>
                                </div>
                            </div>
                             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="bonus-due-date">Vencimento <span className="text-destructive">*</span></Label>
                                     <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full justify-start text-left font-normal"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                <span>24/08/2025</span>
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                initialFocus
                                                locale={ptBR}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bonus-payment-method">Forma de Pagamento <span className="text-destructive">*</span></Label>
                                    <Select>
                                        <SelectTrigger id="bonus-payment-method">
                                            <SelectValue placeholder="Selecione" />
                                        </SelectTrigger>
                                        <SelectContent></SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bonus-installments">Parcelas <span className="text-destructive">*</span></Label>
                                    <Input id="bonus-installments" type="number" defaultValue={1} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                    <Button onClick={handleSave}>Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


const PaidBonusInfoDialog = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => {
    const handleSave = () => {
        onOpenChange(false);
    }
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-foreground">Pagamento de Bonificação</DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="paid-bonus-description">Descrição <span className="text-destructive">*</span></Label>
                            <Input id="paid-bonus-description" defaultValue="Bonificação" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="paid-bonus-value">Bonificação</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                                <Input id="paid-bonus-value" className="pl-8" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-md border">
                        <div className="bg-red-900 text-white font-semibold p-3 rounded-t-md">
                            Pagamento
                        </div>
                        <div className="p-4 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                 <div className="space-y-2">
                                    <Label htmlFor="paid-bonus-person">Pessoa</Label>
                                     <div className="flex items-center gap-2">
                                        <Select>
                                            <SelectTrigger id="paid-bonus-person">
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                            <SelectContent></SelectContent>
                                        </Select>
                                        <Button size="icon"><UserPlus className="h-4 w-4" /></Button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="paid-bonus-account">Conta</Label>
                                    <Select>
                                        <SelectTrigger id="paid-bonus-account">
                                            <SelectValue placeholder="Selecione" />
                                        </SelectTrigger>
                                        <SelectContent></SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="paid-bonus-category">Categoria</Label>
                                     <div className="flex items-center gap-2">
                                        <Select>
                                            <SelectTrigger id="paid-bonus-category">
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                            <SelectContent></SelectContent>
                                        </Select>
                                        <Button size="icon"><Plus className="h-4 w-4" /></Button>
                                    </div>
                                </div>
                            </div>
                             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="paid-bonus-due-date">Vencimento</Label>
                                     <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full justify-start text-left font-normal"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                <span>24/08/2025</span>
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                initialFocus
                                                locale={ptBR}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="paid-bonus-payment-method">Forma de Pagamento <span className="text-destructive">*</span></Label>
                                    <Select>
                                        <SelectTrigger id="paid-bonus-payment-method">
                                            <SelectValue placeholder="Selecione" />
                                        </SelectTrigger>
                                        <SelectContent></SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="paid-bonus-installments">Parcelas <span className="text-destructive">*</span></Label>
                                    <Input id="paid-bonus-installments" type="number" defaultValue={1} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                    <Button onClick={handleSave}>Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const InvoiceServiceDialog = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => {
    const handleSave = () => {
        onOpenChange(false);
    }
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-foreground">Serviços da Fatura</DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="service-description">Descrição <span className="text-destructive">*</span></Label>
                        <Textarea id="service-description" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="service-fare">Tarifa <span className="text-destructive">*</span></Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                                <Input id="service-fare" className="pl-8" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="service-taxes">Taxas</Label>
                             <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                                <Input id="service-taxes" className="pl-8" />
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="service-impostos">Impostos</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                                <Input id="service-impostos" className="pl-8" />
                            </div>
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="service-rav">RAV</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                                <Input id="service-rav" className="pl-8" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="service-discount">Desconto (-)</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                                <Input id="service-discount" className="pl-8" />
                            </div>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                    <Button onClick={handleSave}>Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const historyItems = [
    {
        icon: DollarSign,
        user: 'Lima',
        action: 'Removeu a venda.',
        timestamp: '24/08/2025 10:59'
    },
    {
        icon: DollarSign,
        user: 'Lima',
        action: 'Realizou o lançamento da venda.',
        timestamp: '24/08/2025 10:58'
    },
    {
        icon: Pencil,
        user: 'Lima',
        action: 'Alterou a situação para Aprovado.',
        timestamp: '22/08/2025 17:52'
    },
    {
        icon: FileTextIcon,
        user: 'Lima',
        action: 'Cadastrou a cotação.',
        timestamp: '22/08/2025 17:51'
    }
];

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  description: string;
  quoteCount: number;
  size: string;
  type: 'Destino' | 'Hotel' | 'Passeio';
  dataAiHint: string;
}

const ImageLibraryDialog = ({ open, onOpenChange, onImageSelect }: { open: boolean, onOpenChange: (open: boolean) => void, onImageSelect: (src: string) => void }) => {
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [allImages, setAllImages] = useState<GalleryImage[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (open && isClient) {
            const storedImages = JSON.parse(localStorage.getItem('galleryImages') || '[]') as GalleryImage[];
            setAllImages(storedImages);
        }
    }, [open, isClient]);
    
    const handleImageClick = (image: GalleryImage) => {
        onImageSelect(image.src);
        onOpenChange(false);
    }
    
    const filteredImages = allImages.filter(image => 
        image.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        image.alt.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
         <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-4xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-normal text-foreground flex justify-between items-center">
                        Selecionar imagens da biblioteca
                        <DialogClose />
                    </DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 space-y-1.5">
                             <Label htmlFor="search-library">Imagens de Destaque</Label>
                             <div className="flex gap-2">
                                <Input id="search-library" placeholder="Pesquisar pela descrição" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                             </div>
                        </div>
                    </div>
                     {filteredImages.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 h-96 overflow-y-auto pr-2">
                            {filteredImages.map(image => (
                                    <div 
                                        key={image.id} 
                                        className="relative rounded-lg overflow-hidden cursor-pointer group"
                                        onClick={() => handleImageClick(image)}
                                    >
                                        <Image 
                                            src={image.src} 
                                            alt={image.alt} 
                                            width={600} 
                                            height={400} 
                                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                            data-ai-hint={image.dataAiHint}
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Check className="h-10 w-10 text-white" />
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                     ) : (
                        <div className="text-center py-16 text-muted-foreground">
                            Nenhuma imagem encontrada.
                        </div>
                     )}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Voltar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

type FlightDialogType = 'ida' | 'volta' | 'interno';

const AirlineCombobox = ({ value, onValueChange, ...props }: { value?: string, onValueChange: (value: string) => void }) => {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen} {...props}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {value ? airlines.find(a => a.label.toLowerCase() === value.toLowerCase())?.label : "Selecione"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
                <Command>
                    <CommandInput placeholder="Buscar companhia..." />
                    <CommandList>
                        <CommandEmpty>Nenhuma companhia encontrada.</CommandEmpty>
                        <CommandGroup>
                            {airlines.map((airline) => (
                                <CommandItem
                                    key={airline.value}
                                    value={airline.label}
                                    onSelect={(currentValue) => {
                                        onValueChange(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === airline.label ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {airline.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};


const FlightInfoDialog = ({ open, onOpenChange, title, flightType, onSave, flightToEdit }: { open: boolean; onOpenChange: (open: boolean) => void; title: string, flightType: FlightDialogType, onSave: (data: FlightData) => void, flightToEdit: FlightData | null }) => {
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);
    const [departureDate, setDepartureDate] = useState<Date | undefined>();
    const [arrivalDate, setArrivalDate] = useState<Date | undefined>();
    const [flightSearchDate, setFlightSearchDate] = useState<Date | undefined>();
    const [selectedAirline, setSelectedAirline] = useState<string | undefined>();
    
    useEffect(() => {
        if (flightToEdit) {
            const parseDate = (dateStr: string) => {
                if (!dateStr) return undefined;
                try {
                    return parse(dateStr, 'dd/MM/yyyy', new Date());
                } catch {
                    return undefined;
                }
            }
            setDepartureDate(parseDate(flightToEdit.departureDate));
            setArrivalDate(parseDate(flightToEdit.arrivalDate));
            setSelectedAirline(flightToEdit.airline);
            // You can populate other fields here from flightToEdit
        } else {
             setDepartureDate(undefined);
             setArrivalDate(undefined);
             setFlightSearchDate(undefined);
             setSelectedAirline(undefined);
        }
    }, [flightToEdit]);


    const handleSave = () => {
        if (!formRef.current) return;

        const formData = new FormData(formRef.current);
        const origin = formData.get('flight-origin') as string;
        const destination = formData.get('flight-destination') as string;
        const departureTime = formData.get('flight-departure-time') as string;
        const arrivalTime = formData.get('flight-arrival-time') as string;

        if (!origin || !destination || !departureDate || !departureTime || !arrivalDate || !arrivalTime) {
            toast({
                title: "Campos obrigatórios",
                description: "Por favor, preencha todos os campos marcados com *.",
                variant: "destructive",
            });
            return;
        }

        const flightData: FlightData = {
            id: flightToEdit?.id || Date.now().toString(),
            type: flightType,
            origin,
            destination,
            departureDate: format(departureDate, 'dd/MM/yyyy'),
            departureTime,
            arrivalDate: format(arrivalDate, 'dd/MM/yyyy'),
            arrivalTime,
            airline: selectedAirline,
            flightNumber: formData.get('flight-no') as string || undefined,
            locator: formData.get('flight-locator') as string || undefined,
            purchaseNumber: formData.get('flight-purchase-no') as string || undefined,
        };
        
        onSave(flightData);
        onOpenChange(false);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-4xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-foreground">{title}</DialogTitle>
                </DialogHeader>
                <form ref={formRef} className="py-4 space-y-6 max-h-[70vh] overflow-y-auto pr-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                        <div className="space-y-2">
                            <Label htmlFor="flight-search-no">Nº do Voo</Label>
                            <Input id="flight-search-no" name="flight-search-no" />
                        </div>
                        <div className="space-y-2">
                           <Label htmlFor="flight-search-company">Companhia</Label>
                           <AirlineCombobox onValueChange={() => {}} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="flight-search-date">Data do Voo</Label>
                             <div className="flex gap-2">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !flightSearchDate && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {flightSearchDate ? format(flightSearchDate, "dd/MM/yyyy") : <span>dd/mm/aaaa</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={flightSearchDate}
                                            onSelect={setFlightSearchDate}
                                            initialFocus
                                            locale={ptBR}
                                        />
                                    </PopoverContent>
                                </Popover>
                                <Button>Buscar</Button>
                             </div>
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Esta funcionalidade está em modo experimental e pode ser descontinuada a qualquer momento.</p>
                    
                    <Separator />

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="flight-origin">Origem <span className="text-destructive">*</span></Label>
                                <Input id="flight-origin" name="flight-origin" placeholder="Comece a digitar para selecionar ou digite manualmente" defaultValue={flightToEdit?.origin} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="flight-destination">Destino <span className="text-destructive">*</span></Label>
                                <Input id="flight-destination" name="flight-destination" placeholder="Comece a digitar para selecionar ou digite manualmente" defaultValue={flightToEdit?.destination} />
                            </div>
                        </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="flight-departure-date">Embarque <span className="text-destructive">*</span></Label>
                                <div className="flex gap-2">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !departureDate && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {departureDate ? format(departureDate, "dd/MM/yyyy") : <span>dd/mm/aaaa</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={departureDate}
                                                onSelect={setDepartureDate}
                                                initialFocus
                                                locale={ptBR}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <div className="relative">
                                        <Input type="time" name="flight-departure-time" className="pr-8" required defaultValue={flightToEdit?.departureTime} />
                                        <Clock className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    </div>
                                </div>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="flight-arrival-date">Chegada <span className="text-destructive">*</span></Label>
                                <div className="flex gap-2">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !arrivalDate && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {arrivalDate ? format(arrivalDate, "dd/MM/yyyy") : <span>dd/mm/aaaa</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={arrivalDate}
                                                onSelect={setArrivalDate}
                                                initialFocus
                                                locale={ptBR}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                     <div className="relative">
                                        <Input type="time" name="flight-arrival-time" className="pr-8" required defaultValue={flightToEdit?.arrivalTime} />
                                        <Clock className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                             <div className="space-y-2">
                                <Label htmlFor="flight-duration">Duração</Label>
                                <Input id="flight-duration" name="flight-duration" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="flight-company">Companhia</Label>
                                <AirlineCombobox value={selectedAirline} onValueChange={setSelectedAirline} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="flight-no">Nº do Voo</Label>
                                <Input id="flight-no" name="flight-no" defaultValue={flightToEdit?.flightNumber} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="flight-locator">Localizador</Label>
                                <Input id="flight-locator" name="flight-locator" defaultValue={flightToEdit?.locator} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="flight-purchase-no">Nº da Compra</Label>
                                <Input id="flight-purchase-no" name="flight-purchase-no" defaultValue={flightToEdit?.purchaseNumber} />
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-[repeat(3,auto),1fr] gap-6 items-end">
                            <div className="space-y-2 w-20">
                                 <Label htmlFor="bag-personal" className="flex justify-center"><User className="h-5 w-5"/></Label>
                                <Input id="bag-personal" name="bag-personal" defaultValue={1} type="number" />
                            </div>
                             <div className="space-y-2 w-20">
                                 <Label htmlFor="bag-carryon" className="flex justify-center"><Luggage className="h-5 w-5"/></Label>
                                <Input id="bag-carryon" name="bag-carryon" defaultValue={1} type="number" />
                            </div>
                            <div className="space-y-2 w-20">
                                 <Label htmlFor="bag-checked" className="flex justify-center"><Luggage className="h-5 w-5"/></Label>
                                <Input id="bag-checked" name="bag-checked" defaultValue={0} type="number" />
                            </div>
                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                             <div className="space-y-2">
                                <Label htmlFor="flight-class">Classe</Label>
                                <Select defaultValue="economica" name="flight-class">
                                    <SelectTrigger id="flight-class"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="economica">Econômica</SelectItem>
                                        <SelectItem value="economica-premium">Econômica Premium</SelectItem>
                                        <SelectItem value="primeira">Primeira Classe</SelectItem>
                                        <SelectItem value="executiva">Executiva</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="flight-connections">Conexões</Label>
                                <Select defaultValue="direto" name="flight-connections">
                                    <SelectTrigger id="flight-connections"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="direto">Voo direto</SelectItem>
                                        <SelectItem value="1-conexao">1 Conexão</SelectItem>
                                        <SelectItem value="2-conexoes">2+ Conexões</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="flight-checkin">Notificação Check-in</Label>
                                <Select defaultValue="nao-notificar" name="flight-checkin">
                                    <SelectTrigger id="flight-checkin"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                         <SelectItem value="nao-notificar">Não Notificar</SelectItem>
                                         <SelectItem value="24h">Notificar Check-in 24h</SelectItem>
                                         <SelectItem value="36h">Notificar Check-in 36h</SelectItem>
                                         <SelectItem value="48h">Notificar Check-in 48h</SelectItem>
                                         <SelectItem value="72h">Notificar Check-in 72h</SelectItem>
                                         <SelectItem value="em-periodo">Em Período de Check-in</SelectItem>
                                         <SelectItem value="realizado">Check-in Realizado</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="flight-obs">Observação</Label>
                                <Input id="flight-obs" name="flight-obs" />
                            </div>
                        </div>
                    </div>
                </form>
                <DialogFooter>
                    <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>Cancelar</Button>
                    <Button onClick={handleSave}>Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const HotelInfoDialog = ({ open, onOpenChange, onSave }: { open: boolean; onOpenChange: (open: boolean) => void; onSave: (data: HotelData) => void }) => {
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);
    const [checkInDate, setCheckInDate] = useState<Date>();
    const [checkOutDate, setCheckOutDate] = useState<Date>();

    const handleSaveHotel = () => {
        if (!formRef.current) return;
        const formData = new FormData(formRef.current);

        const name = formData.get('hotel-name') as string;
        const checkInTime = formData.get('hotel-entry-time') as string;
        const checkOutTime = formData.get('hotel-exit-time') as string;

        if (!name) {
            toast({ title: "Erro", description: "O nome do hotel é obrigatório.", variant: "destructive" });
            return;
        }

        const hotelData: HotelData = {
            id: Date.now().toString(),
            name,
            checkIn: checkInDate ? format(checkInDate, "dd/MM/yyyy") : '',
            checkInTime,
            checkOut: checkOutDate ? format(checkOutDate, "dd/MM/yyyy") : '',
            checkOutTime,
            nights: Number(formData.get('hotel-diarias') as string),
            rooms: Number(formData.get('hotel-quartos') as string),
            description: formData.get('hotel-description') as string,
        };

        onSave(hotelData);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-4xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-foreground">Hospedagem</DialogTitle>
                </DialogHeader>
                <form ref={formRef} className="py-4 space-y-6 max-h-[70vh] overflow-y-auto pr-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="hotel-name">Nome <span className="text-destructive">*</span></Label>
                            <div className="relative">
                                <Input id="hotel-name" name="hotel-name" placeholder="Comece a digitar para selecionar" />
                                <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                                    <Search className="h-4 w-4 text-muted-foreground" />
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="hotel-link">Link</Label>
                            <Input id="hotel-link" name="hotel-link" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="hotel-entry-date">Entrada</Label>
                            <div className="flex gap-2">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !checkInDate && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {checkInDate ? format(checkInDate, "dd/MM/yyyy") : <span>dd/mm/aaaa</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={checkInDate}
                                            onSelect={setCheckInDate}
                                            initialFocus
                                            locale={ptBR}
                                        />
                                    </PopoverContent>
                                </Popover>
                                <div className="relative">
                                    <Input type="time" name="hotel-entry-time" className="pr-8"/>
                                    <Clock className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="hotel-exit-date">Saída</Label>
                            <div className="flex gap-2">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !checkOutDate && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {checkOutDate ? format(checkOutDate, "dd/MM/yyyy") : <span>dd/mm/aaaa</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={checkOutDate}
                                            onSelect={setCheckOutDate}
                                            initialFocus
                                            locale={ptBR}
                                        />
                                    </PopoverContent>
                                </Popover>
                                <div className="relative">
                                    <Input type="time" name="hotel-exit-time" className="pr-8"/>
                                    <Clock className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="hotel-address">Endereço</Label>
                        <Input id="hotel-address" name="hotel-address" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="hotel-diarias" className="flex items-center gap-1">
                                Diárias <RefreshCw className="h-3 w-3 text-muted-foreground cursor-pointer" />
                            </Label>
                            <Input id="hotel-diarias" name="hotel-diarias" type="number" defaultValue={0} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="hotel-quartos">Quartos</Label>
                            <Input id="hotel-quartos" name="hotel-quartos" type="number" defaultValue={0} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="hotel-type">Tipo</Label>
                            <Select name="hotel-type">
                                <SelectTrigger id="hotel-type"><SelectValue placeholder="Não informado" /></SelectTrigger>
                                <SelectContent></SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="hotel-stars">Estrelas</Label>
                            <Select name="hotel-stars">
                                <SelectTrigger id="hotel-stars"><SelectValue placeholder="Não informado" /></SelectTrigger>
                                <SelectContent></SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="hotel-reservation-no">Nº da Reserva</Label>
                            <Input id="hotel-reservation-no" name="hotel-reservation-no" />
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="hotel-description">Descrição</Label>
                        <Textarea id="hotel-description" name="hotel-description" rows={4} />
                    </div>
                </form>
                <DialogFooter>
                    <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>Cancelar</Button>
                    <Button onClick={handleSaveHotel}>Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const FlightItem = ({ flight, onRemove, onEdit }: { flight: FlightData, onRemove: (id: string) => void, onEdit: (flight: FlightData) => void }) => {
    return (
        <div className="border p-4 rounded-lg relative pr-12">
            <div className="absolute top-2 right-2 flex gap-1">
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => onEdit(flight)}><PencilLine className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive hover:text-destructive" onClick={() => onRemove(flight.id)}><Trash2 className="h-4 w-4" /></Button>
            </div>
            <p className="font-bold text-lg">{flight.origin} → {flight.destination}</p>
            <p className="text-sm text-muted-foreground">
                <span className="capitalize">{flight.type}</span> | Saída: {flight.departureDate} às {flight.departureTime} | Chegada: {flight.arrivalDate} às {flight.arrivalTime}
            </p>
            {flight.airline && <p className="text-xs text-muted-foreground">Cia: {flight.airline} | Voo: {flight.flightNumber} | Localizador: {flight.locator}</p>}
        </div>
    )
}

const HotelItem = ({ hotel, onRemove }: { hotel: HotelData, onRemove: (id: string) => void }) => {
    return (
         <div className="border p-4 rounded-lg relative pr-12">
            <div className="absolute top-2 right-2 flex gap-1">
                <Button variant="ghost" size="icon" className="h-6 w-6"><PencilLine className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive hover:text-destructive" onClick={() => onRemove(hotel.id)}><Trash2 className="h-4 w-4" /></Button>
            </div>
            <p className="font-bold text-lg">{hotel.name}</p>
            <p className="text-sm text-muted-foreground">
                Check-in: {hotel.checkIn} às {hotel.checkInTime} | Check-out: {hotel.checkOut} às {hotel.checkOutTime}
            </p>
            <p className="text-xs text-muted-foreground">{hotel.nights} diárias | {hotel.rooms} quarto(s)</p>
            {hotel.description && <p className="text-xs mt-2">{hotel.description}</p>}
        </div>
    )
}


export default function NovaCotacaoPage() {
    const { toast } = useToast();
    const [date, setDate] = useState<Date>(new Date(2025, 7, 23));
    const [currentStep, setCurrentStep] = useState(2);
    const [activeTab, setActiveTab] = useState('orcamento');
    const [isNewPersonDialogOpen, setIsNewPersonDialogOpen] = useState(false);
    const [isCostInfoDialogOpen, setIsCostInfoDialogOpen] = useState(false);
    const [isSaleValueInfoDialogOpen, setIsSaleValueInfoDialogOpen] = useState(false);
    const [isBonusInfoDialogOpen, setIsBonusInfoDialogOpen] = useState(false);
    const [isPaidBonusInfoDialogOpen, setIsPaidBonusInfoDialogOpen] = useState(false);
    const [isInvoiceServiceDialogOpen, setIsInvoiceServiceDialogOpen] = useState(false);
    const [isImageLibraryOpen, setIsImageLibraryOpen] = useState(false);
    const [flightDialogType, setFlightDialogType] = useState<FlightDialogType | null>(null);
    const [flightToEdit, setFlightToEdit] = useState<FlightData | null>(null);
    const [isHotelInfoDialogOpen, setIsHotelInfoDialogOpen] = useState(false);
    const [faturaEmissao, setFaturaEmissao] = useState<Date>(new Date(2025, 7, 25));
    const [faturaVencimento, setFaturaVencimento] = useState<Date>(new Date(2025, 7, 25));
    const [passengers, setPassengers] = useState<Person[]>([]);
    const [selectedPassengerId, setSelectedPassengerId] = useState<string | null>(null);
    const [selectedClientId, setSelectedClientId] = useState('nao-informado');
    const [flights, setFlights] = useState<FlightData[]>([]);
    const [hotels, setHotels] = useState<HotelData[]>([]);
    
    const [quoteData, setQuoteData] = useState({
        titulo: 'Visto para procurar trabalho em Portugal',
        imagem: '',
        adultos: 1,
        criancas: 0,
        bebes: 0,
        servicosAdicionais: 'Visto Procura de trabalho',
        roteiro: '',
        detalhesViagem: '',
        formaPagamento: '',
        termos: '',
        outrasInfo: '',
    });
    
    const flightDialogTitles: Record<FlightDialogType, string> = {
      ida: 'Voo de Ida',
      volta: 'Voo de Volta',
      interno: 'Voo Interno',
    };

    const openFlightDialog = (type: FlightDialogType) => {
        setFlightToEdit(null); // Ensure we're adding a new one
        setFlightDialogType(type);
    };
    
    const handleEditFlight = (flight: FlightData) => {
        setFlightToEdit(flight);
        setFlightDialogType(flight.type);
    };

    const closeFlightDialog = () => {
        setFlightToEdit(null);
        setFlightDialogType(null);
    };


    useEffect(() => {
        setQuoteData(prev => ({
            ...prev,
            adultos: passengers.filter(p => p.type === 'adulto').length,
            criancas: passengers.filter(p => p.type === 'crianca').length,
            bebes: passengers.filter(p => p.type === 'bebe').length,
        }));
    }, [passengers]);
    
    useEffect(() => {
        if (passengers.length > 0 && selectedClientId === 'nao-informado') {
            setSelectedClientId(String(passengers[0].id));
        }
    }, [passengers, selectedClientId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setQuoteData(prev => ({ ...prev, [id]: value }));
    };

    const handleNumericInputChange = (id: 'adultos' | 'criancas' | 'bebes', value: string) => {
        setQuoteData(prev => ({ ...prev, [id]: Number(value) }));
    };
    
    const handleRichTextChange = (value: string, field: keyof typeof quoteData) => {
        setQuoteData(prev => ({...prev, [field]: value}));
    };


    const handleImageSelect = (src: string) => {
        setQuoteData(prev => ({...prev, imagem: src}));
    };


    const handlePreview = () => {
        localStorage.setItem('quotePreviewData', JSON.stringify(quoteData));
        window.open('/visualizar-orcamento', '_blank');
    };
    
    const handleAddPassenger = () => {
        if (selectedPassengerId) {
            const personToAdd = mockPeople.find(p => String(p.id) === selectedPassengerId);
            if (personToAdd && !passengers.some(p => p.id === personToAdd.id)) {
                setPassengers(prev => [...prev, personToAdd]);
            }
        }
    };
    
    const handleRemovePassenger = (id: number) => {
        setPassengers(prev => prev.filter(p => p.id !== id));
    };

    const handleSaveFlight = (data: FlightData) => {
        setFlights(prev => {
            const exists = prev.some(f => f.id === data.id);
            if (exists) {
                return prev.map(f => (f.id === data.id ? data : f));
            }
            return [...prev, data];
        });
        toast({ title: "Sucesso!", description: `Voo ${flightToEdit ? 'atualizado' : 'salvo'} com sucesso.` });
    };


    const handleRemoveFlight = (id: string) => {
        setFlights(prev => prev.filter(f => f.id !== id));
    };

    const handleSaveHotel = (data: HotelData) => {
        setHotels(prev => [...prev, data]);
        toast({
            title: "Sucesso!",
            description: "Hospedagem salva com sucesso.",
        });
    }
    
    const handleRemoveHotel = (id: string) => {
        setHotels(prev => prev.filter(h => h.id !== id));
    }

    const handleSaveAndToast = (msg: string) => {
        toast({ title: "Sucesso!", description: msg });
    };

    return (
        <>
            <div className="space-y-6">
                <header className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <h1 className="text-3xl font-bold text-primary">Cotação</h1>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" asChild><Link href="/cotacoes">Cancelar</Link></Button>
                        <Button>Salvar e Fechar</Button>
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <MoreVertical className="h-5 w-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                 <DropdownMenuItem>
                                    Salvar
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Excluir
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                <Card>
                    <CardContent className="p-4 md:p-6">
                         <Stepper currentStep={currentStep} />
                        
                        <Separator className="my-6"/>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                             <div className="flex items-center gap-2 lg:col-span-1">
                                <Badge variant="outline" className="text-lg font-mono font-semibold py-2">ispg5</Badge>
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
                                            onSelect={(d) => d && setDate(d)}
                                            initialFocus
                                            locale={ptBR}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="space-y-1.5 lg:col-span-1">
                                <Label>Cliente</Label>
                                <div className="flex items-center gap-2">
                                     <Select value={selectedClientId} onValueChange={setSelectedClientId}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="nao-informado">Não informado</SelectItem>
                                            {passengers.map(p => (
                                                <SelectItem key={p.id} value={String(p.id)}>{p.name}</SelectItem>
                                            ))}
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
                                <Label>Usuário</Label>
                                <Select defaultValue="lima">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="lima">Lima</SelectItem>
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

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-11 h-auto">
                        <TabsTrigger value="solicitacao" className="flex-col h-auto gap-1.5 py-2"><Handshake className="w-5 h-5"/>Solicitação</TabsTrigger>
                        <TabsTrigger value="orcamento" className="flex-col h-auto gap-1.5 py-2"><FileTextIcon className="w-5 h-5"/>Orçamento</TabsTrigger>
                        <TabsTrigger value="passageiros" className="flex-col h-auto gap-1.5 py-2"><Users className="w-5 h-5"/>Passageiros</TabsTrigger>
                        <TabsTrigger value="anexos" className="flex-col h-auto gap-1.5 py-2"><FileArchive className="w-5 h-5"/>Anexos</TabsTrigger>
                        <TabsTrigger value="tarefas" className="flex-col h-auto gap-1.5 py-2"><ListTodo className="w-5 h-5"/>Tarefas</TabsTrigger>
                        <TabsTrigger value="observacoes" className="flex-col h-auto gap-1.5 py-2"><MessageSquare className="w-5 h-5"/>Observações</TabsTrigger>
                        <TabsTrigger value="valores" className="flex-col h-auto gap-1.5 py-2"><DollarSign className="w-5 h-5"/>Valores</TabsTrigger>
                        <TabsTrigger value="venda" className="flex-col h-auto gap-1.5 py-2"><HandCoins className="w-5 h-5"/>Venda</TabsTrigger>
                        <TabsTrigger value="fatura" className="flex-col h-auto gap-1.5 py-2"><ReceiptText className="w-5 h-5"/>Fatura</TabsTrigger>
                        <TabsTrigger value="comunicacao" className="flex-col h-auto gap-1.5 py-2"><MessagesSquare className="w-5 h-5"/>Comunicação</TabsTrigger>
                        <TabsTrigger value="historico" className="flex-col h-auto gap-1.5 py-2"><History className="w-5 h-5"/>Histórico</TabsTrigger>
                    </TabsList>
                     <TabsContent value="solicitacao" className="mt-4">
                        <Card>
                             <CardHeader>
                                <CardTitle>Solicitação do Cliente</CardTitle>
                                <CardDescription>Detalhes da solicitação original do cliente.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Textarea readOnly className="bg-muted min-h-48">
                                    Nenhuma solicitação encontrada.
                                </Textarea>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="orcamento" className="mt-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle>Orçamento</CardTitle>
                                    <CardDescription>Preencha as informações do orçamento para esta cotação.</CardDescription>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline"><ListFilter className="mr-2 h-4 w-4"/>Opções</Button>
                                    <Button onClick={handlePreview}><Eye className="mr-2 h-4 w-4"/>Visualizar</Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="titulo">Título</Label>
                                    <Input id="titulo" placeholder="Informe um título para o orçamento" value={quoteData.titulo} onChange={handleInputChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="imagem-upload"><ImageIcon className="inline-block mr-2 h-4 w-4" />Imagem</Label>
                                    <Card className="border-dashed">
                                        <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                                            {quoteData.imagem ? (
                                                <Image src={quoteData.imagem} alt="Imagem do Orçamento" width={200} height={150} className="rounded-md mb-4"/>
                                            ) : (
                                                <p className="text-muted-foreground mb-4">Nenhuma imagem incluída.</p>
                                            )}
                                            <div className="flex gap-2">
                                                <Input id="imagem-upload" type="file" className="hidden" onChange={e => e.target.files && handleImageSelect(URL.createObjectURL(e.target.files[0]))} />
                                                <Button asChild variant="outline">
                                                    <label htmlFor="imagem-upload" className="cursor-pointer">
                                                        <Upload className="mr-2 h-4 w-4"/>
                                                        Upload
                                                    </label>
                                                </Button>
                                                <Button variant="outline" onClick={() => setIsImageLibraryOpen(true)}><Library className="mr-2 h-4 w-4"/>Biblioteca</Button>
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
                                            <Input id="adultos" type="number" value={quoteData.adultos} onChange={(e) => handleNumericInputChange('adultos', e.target.value)} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="criancas">Crianças <span className="text-muted-foreground text-xs">(2 a 11 anos)</span></Label>
                                            <Input id="criancas" type="number" value={quoteData.criancas} onChange={(e) => handleNumericInputChange('criancas', e.target.value)} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="bebes">Bebês <span className="text-muted-foreground text-xs">(0 a 23 meses)</span></Label>
                                            <Input id="bebes" type="number" value={quoteData.bebes} onChange={(e) => handleNumericInputChange('bebes', e.target.value)} />
                                        </div>
                                    </CardContent>
                                </Card>
                                
                                <Card>
                                    <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                        <div className="flex items-center gap-2">
                                            <ArrowRight className="h-5 w-5 text-green-600" />
                                            <CardTitle className="text-lg text-green-600">Voo de Ida</CardTitle>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button variant="outline">Incluir via Localizador</Button>
                                            <Button onClick={() => openFlightDialog('ida')}>Incluir</Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        {flights.filter(f => f.type === 'ida').length === 0 ? (
                                            <div className="text-center py-6 border-dashed border-2 rounded-md">
                                                <p className="text-muted-foreground">Nenhum voo de ida incluído.</p>
                                            </div>
                                        ) : (
                                            flights.filter(f => f.type === 'ida').map(flight => (
                                                <FlightItem key={flight.id} flight={flight} onRemove={handleRemoveFlight} onEdit={handleEditFlight} />
                                            ))
                                        )}
                                    </CardContent>
                                </Card>

                                 <Card>
                                    <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                        <div className="flex items-center gap-2">
                                            <ArrowLeft className="h-5 w-5 text-green-600" />
                                            <CardTitle className="text-lg text-green-600">Voo de Volta</CardTitle>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button variant="outline">Incluir via Localizador</Button>
                                            <Button onClick={() => openFlightDialog('volta')}>Incluir</Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                         {flights.filter(f => f.type === 'volta').length === 0 ? (
                                            <div className="text-center py-6 border-dashed border-2 rounded-md">
                                                <p className="text-muted-foreground">Nenhum voo de volta incluído.</p>
                                            </div>
                                        ) : (
                                            flights.filter(f => f.type === 'volta').map(flight => (
                                                <FlightItem key={flight.id} flight={flight} onRemove={handleRemoveFlight} onEdit={handleEditFlight} />
                                            ))
                                        )}
                                    </CardContent>
                                </Card>

                                <Card>
                                     <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                        <div className="flex items-center gap-2">
                                            <Plane className="h-5 w-5 text-green-600" />
                                            <CardTitle className="text-lg text-green-600">Voo Interno</CardTitle>
                                        </div>
                                        <div className="flex items-center gap-2">
                                           <Button onClick={() => openFlightDialog('interno')}>Incluir</Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        {flights.filter(f => f.type === 'interno').length === 0 ? (
                                            <div className="text-center py-6 border-dashed border-2 rounded-md">
                                                <p className="text-muted-foreground">Nenhum voo interno incluído.</p>
                                            </div>
                                        ) : (
                                            flights.filter(f => f.type === 'interno').map(flight => (
                                                <FlightItem key={flight.id} flight={flight} onRemove={handleRemoveFlight} onEdit={handleEditFlight} />
                                            ))
                                        )}
                                    </CardContent>
                                </Card>
                                
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="hospedagem">
                                        <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                                            <div className="flex items-center gap-2">
                                                <Hotel className="h-5 w-5" /> Hospedagem
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="p-4 space-y-2">
                                            {hotels.length === 0 ? (
                                                <div className="text-center py-6 border-dashed border-2 rounded-md">
                                                    <p className="text-muted-foreground mb-2">Nenhuma hospedagem incluída.</p>
                                                    <Button onClick={() => setIsHotelInfoDialogOpen(true)}>Incluir</Button>
                                                </div>
                                            ) : (
                                                <>
                                                    {hotels.map(hotel => (
                                                        <HotelItem key={hotel.id} hotel={hotel} onRemove={handleRemoveHotel} />
                                                    ))}
                                                    <div className="flex justify-end">
                                                        <Button onClick={() => setIsHotelInfoDialogOpen(true)}>Incluir mais</Button>
                                                    </div>
                                                </>
                                            )}
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
                                                <Label htmlFor="servicosAdicionais">Descrição dos Serviços</Label>
                                                <Textarea id="servicosAdicionais" value={quoteData.servicosAdicionais} onChange={e => handleRichTextChange(e.target.value, 'servicosAdicionais')} />
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>

                                <Card>
                                    <CardContent className="p-4 space-y-4">
                                        <Accordion type="single" collapsible className="w-full">
                                            <AccordionItem value="roteiro">
                                                <div className="flex items-center justify-between py-4">
                                                    <div className="flex items-center gap-2">
                                                        <Checkbox id="roteiro-check" />
                                                        <Label htmlFor="roteiro-check" className="font-semibold text-base cursor-pointer">
                                                            Roteiro (Day By Day)
                                                        </Label>
                                                    </div>
                                                    <AccordionTrigger className="p-0 hover:no-underline [&>svg]:h-5 [&>svg]:w-5"></AccordionTrigger>
                                                </div>
                                                <AccordionContent className="pt-2">
                                                    <RichTextEditor 
                                                        value={quoteData.roteiro} 
                                                        onChange={(v) => handleRichTextChange(v, 'roteiro')} 
                                                    />
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>

                                        <div className="space-y-2 pt-4">
                                            <Label htmlFor="detalhesViagem">Detalhes da Viagem</Label>
                                            <Textarea id="detalhesViagem" value={quoteData.detalhesViagem} onChange={handleInputChange} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="formaPagamento">Forma de Pagamento</Label>
                                            <Textarea id="formaPagamento" value={quoteData.formaPagamento} onChange={handleInputChange} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="termos">Termos e Condições</Label>
                                            <Textarea id="termos" value={quoteData.termos} onChange={handleInputChange} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="outrasInfo">Outras Informações</Label>
                                            <Textarea id="outrasInfo" value={quoteData.outrasInfo} onChange={handleInputChange} />
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
                                    <Users className="h-5 w-5 text-primary" />
                                    <CardTitle className="text-xl">Passageiros</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Passageiro</Label>
                                    <div className="flex items-center gap-2">
                                        <Select onValueChange={setSelectedPassengerId}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {mockPeople.map(p => (
                                                    <SelectItem key={p.id} value={String(p.id)}>{p.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <Button size="icon" variant="outline" onClick={() => setIsNewPersonDialogOpen(true)}>
                                            <UserPlus className="h-4 w-4" />
                                        </Button>
                                        <Button onClick={handleAddPassenger}>Adicionar</Button>
                                    </div>
                                </div>
                                 {passengers.length > 0 ? (
                                    <div className="border rounded-md">
                                        {passengers.map(p => (
                                            <div key={p.id} className="flex items-center justify-between p-3 border-b last:border-b-0">
                                                <p className="font-medium">{p.name}</p>
                                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleRemovePassenger(p.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 border-dashed border-2 rounded-md">
                                        <p className="text-muted-foreground">Nenhum passageiro informado.</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="anexos" className="mt-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Paperclip className="h-5 w-5 text-primary" />
                                    <CardTitle className="text-xl">Anexos</CardTitle>
                                </div>
                                <Button>Incluir</Button>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-8 border-dashed border-2 rounded-md">
                                    <p className="text-muted-foreground">Nenhum anexo incluído.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="tarefas" className="mt-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <ListTodo className="h-5 w-5 text-primary" />
                                    <CardTitle className="text-xl">Tarefas</CardTitle>
                                </div>
                                <Button>Incluir</Button>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-8 border-dashed border-2 rounded-md">
                                    <p className="text-muted-foreground">Nenhuma tarefa incluída.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                     <TabsContent value="observacoes" className="mt-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <MessageSquare className="h-5 w-5 text-primary" />
                                    <CardTitle className="text-xl">Observações</CardTitle>
                                </div>
                                <Button>Incluir</Button>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-8 border-dashed border-2 rounded-md">
                                    <p className="text-muted-foreground">Nenhuma observação incluída.</p>
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
                                        <Button onClick={() => setIsCostInfoDialogOpen(true)}>Incluir</Button>
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
                                        <Button onClick={() => setIsSaleValueInfoDialogOpen(true)}>Incluir</Button>
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
                    <TabsContent value="venda" className="mt-4">
                        <Card>
                            <CardContent className="p-6 space-y-6">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <Label>Data da Venda</Label>
                                        <div className="flex items-center gap-2 p-2 border rounded-md w-fit">
                                            <span>22/08/2025</span>
                                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                    </div>
                                    <div className="flex gap-8 text-right">
                                        <div>
                                            <Label>Lucro</Label>
                                            <p className="text-2xl font-bold">R$ 0,00</p>
                                        </div>
                                        <div>
                                            <Label>Bonificação</Label>
                                            <p className="text-2xl font-bold">R$ 0,00</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="rounded-lg overflow-hidden border">
                                        <div className="bg-red-900 text-white p-3 flex justify-between items-center">
                                            <h3 className="font-semibold">Valores de Custo</h3>
                                            <Button variant="secondary" size="sm" onClick={() => setIsCostInfoDialogOpen(true)}>Incluir</Button>
                                        </div>
                                        <div className="p-4 space-y-3">
                                            <div className="flex items-center gap-2 text-sm bg-red-50 border border-red-200 text-red-800 p-3 rounded-md">
                                                <AlertTriangle className="h-5 w-5" />
                                                <p>Há lançamentos que não foram totalmente configurados, estes valores serão desconsiderados no lançamento da venda, realize o ajuste na lista abaixo.</p>
                                            </div>
                                            <div className="text-center py-6 border-dashed border-2 rounded-md">
                                                <p className="text-muted-foreground">Nenhum custo informado.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-lg overflow-hidden border">
                                        <div className="bg-blue-900 text-white p-3 flex justify-between items-center">
                                            <h3 className="font-semibold">Valores de Venda</h3>
                                            <Button variant="secondary" size="sm" onClick={() => setIsSaleValueInfoDialogOpen(true)}>Incluir</Button>
                                        </div>
                                        <div className="p-4 space-y-3">
                                            <div className="flex items-center gap-2 text-sm bg-red-50 border border-red-200 text-red-800 p-3 rounded-md">
                                                <AlertTriangle className="h-5 w-5" />
                                                <p>Há lançamentos que não foram totalmente configurados, estes valores serão desconsiderados no lançamento da venda, realize o ajuste na lista abaixo.</p>
                                            </div>
                                            <div className="text-center py-6 border-dashed border-2 rounded-md">
                                                <p className="text-muted-foreground">Nenhum valor de venda informado.</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="rounded-lg overflow-hidden border">
                                        <div className="bg-blue-900 text-white p-3 flex justify-between items-center">
                                            <h3 className="font-semibold">Recebimento de Bonificação</h3>
                                            <Button variant="secondary" size="sm" onClick={() => setIsBonusInfoDialogOpen(true)}>Incluir</Button>
                                        </div>
                                        <div className="p-4 space-y-3">
                                            <div className="text-center py-6 border-dashed border-2 rounded-md">
                                                <p className="text-muted-foreground max-w-md mx-auto">Nenhum valor de bonificação a ser recebido, lance aqui bonificações recebidas de consolidadoras ou outros parceiros. Ao informar uma bonificação os valores de custos e de venda acima não precisam ser informados, caso não seja necessário lança-los no financeiro.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rounded-lg overflow-hidden border">
                                        <div className="bg-red-900 text-white p-3 flex justify-between items-center">
                                            <h3 className="font-semibold">Pagamento de Bonificação</h3>
                                            <Button variant="secondary" size="sm" onClick={() => setIsPaidBonusInfoDialogOpen(true)}>Incluir</Button>
                                        </div>
                                        <div className="p-4 space-y-3">
                                            <div className="text-center py-6 border-dashed border-2 rounded-md">
                                                <p className="text-muted-foreground">Nenhum valor de bonificação a ser paga foi informada.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="venda-observacao">Observação</Label>
                                        <Textarea id="venda-observacao" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="fatura" className="mt-4">
                        <Card>
                            <CardHeader className="flex-row items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <ReceiptText className="h-5 w-5 text-primary" />
                                    <CardTitle className="text-xl">Fatura</CardTitle>
                                </div>
                                <Button>Lançar Fatura</Button>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="fatura-emissao">Emissão</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal",
                                                        !faturaEmissao && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {faturaEmissao ? format(faturaEmissao, "dd/MM/yyyy") : <span>dd/mm/aaaa</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={faturaEmissao}
                                                    onSelect={(d) => d && setFaturaEmissao(d)}
                                                    initialFocus
                                                    locale={ptBR}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="fatura-vencimento">Vencimento <span className="text-destructive">*</span></Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal",
                                                        !faturaVencimento && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {faturaVencimento ? format(faturaVencimento, "dd/MM/yyyy") : <span>dd/mm/aaaa</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={faturaVencimento}
                                                    onSelect={(d) => d && setFaturaVencimento(d)}
                                                    initialFocus
                                                    locale={ptBR}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="fatura-info-adicional">Informação Adicional</Label>
                                    <Textarea id="fatura-info-adicional" />
                                </div>
                                <div>
                                     <div className="flex items-center justify-between mb-2">
                                        <Label className="text-green-600 font-semibold">Discriminação dos Serviços</Label>
                                        <Button size="sm" onClick={() => setIsInvoiceServiceDialogOpen(true)}>Incluir</Button>
                                    </div>
                                    <div className="text-center py-8 border-dashed border-2 rounded-md">
                                        <p className="text-sm text-muted-foreground">
                                            Nenhum serviço informado.
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Informe manualmente ou importe os valores de venda{' '}
                                            <button 
                                                onClick={() => setActiveTab('valores')} 
                                                className="text-primary hover:underline font-semibold"
                                            >
                                                clicando aqui
                                            </button>.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="comunicacao" className="mt-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <MessagesSquare className="h-5 w-5 text-primary" />
                                    <CardTitle className="text-xl">Comunicação</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-8 border-dashed border-2 rounded-md">
                                    <p className="text-muted-foreground">Nenhuma comunicação enviada.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                     <TabsContent value="historico" className="mt-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <History className="h-5 w-5 text-primary" />
                                    Histórico
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {historyItems.length > 0 ? historyItems.map((item, index) => (
                                    <div key={index} className="flex items-start gap-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                                            <item.icon className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-foreground">
                                                <span className="font-bold">{item.user}</span> {item.action}
                                            </p>
                                            <p className="text-sm text-muted-foreground">{item.timestamp}</p>
                                        </div>
                                    </div>
                                )) : (
                                     <div className="text-center py-8 border-dashed border-2 rounded-md">
                                        <p className="text-muted-foreground">Nenhum histórico de alterações.</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
            <NewPersonDialog open={isNewPersonDialogOpen} onOpenChange={setIsNewPersonDialogOpen} />
            <CostInfoDialog open={isCostInfoDialogOpen} onOpenChange={setIsCostInfoDialogOpen} />
            <SaleValueInfoDialog open={isSaleValueInfoDialogOpen} onOpenChange={setIsSaleValueInfoDialogOpen} />
            <BonusInfoDialog open={isBonusInfoDialogOpen} onOpenChange={setIsBonusInfoDialogOpen} />
            <PaidBonusInfoDialog open={isPaidBonusInfoDialogOpen} onOpenChange={setIsPaidBonusInfoDialogOpen} />
            <InvoiceServiceDialog open={isInvoiceServiceDialogOpen} onOpenChange={setIsInvoiceServiceDialogOpen} />
            <ImageLibraryDialog open={isImageLibraryOpen} onOpenChange={setIsImageLibraryOpen} onImageSelect={handleImageSelect} />
            {flightDialogType && (
                <FlightInfoDialog
                    open={!!flightDialogType}
                    onOpenChange={(open) => !open && closeFlightDialog()}
                    title={flightToEdit ? `Editar ${flightDialogTitles[flightDialogType]}`: flightDialogTitles[flightDialogType]}
                    flightType={flightDialogType}
                    onSave={handleSaveFlight}
                    flightToEdit={flightToEdit}
                />
            )}
            {isHotelInfoDialogOpen && (
                <HotelInfoDialog 
                    open={isHotelInfoDialogOpen} 
                    onOpenChange={setIsHotelInfoDialogOpen} 
                    onSave={handleSaveHotel}
                />
            )}
        </>
    );
}

