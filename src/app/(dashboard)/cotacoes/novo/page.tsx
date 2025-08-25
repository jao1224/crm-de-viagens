

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
import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar as CalendarIcon, MoreVertical, UserPlus, Image as ImageIcon, Upload, Library, Eye, ListFilter, PlusCircle, ArrowRight, ArrowLeft, Plane, Hotel, TrainFront, Ship, Camera, HeartPulse, ShoppingCart, Minus, Plus, Info, AlertTriangle, Trash2, User, Mail, Globe, Instagram, Gem, Paperclip, ListTodo, MessageSquare, Star, ChevronsUpDown, ReceiptText, History, DollarSign, Pencil, FileText as FileTextIcon } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';


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

const DatePickerInput = ({ value, onSelect, placeholder = "dd/mm/aaaa" }: { value: Date | undefined, onSelect: (date: Date | undefined) => void, placeholder?: string }) => {
    const [inputValue, setInputValue] = useState(value ? format(value, "dd/MM/yyyy") : "");
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

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
        setIsPopoverOpen(false);
    }

    return (
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
                <div className="relative w-full">
                    <Input
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        placeholder={placeholder}
                        className="pr-8"
                    />
                    <CalendarIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
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
    );
};


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
                            <DatePickerInput value={birthDate} onSelect={setBirthDate} />
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
                                    <DatePickerInput value={passportIssueDate} onSelect={setPassportIssueDate} />
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="doc-passport-expiry">Vencimento Passaporte</Label>
                                    <DatePickerInput value={passportExpiryDate} onSelect={setPassportExpiryDate} />
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
                                    <DatePickerInput value={visaValidityDate} onSelect={setVisaValidityDate} />
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

const CostInfoDialog = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => {
    const [vencimentoDate, setVencimentoDate] = useState<Date>(new Date(2025, 7, 24));
    
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
                                    <DatePickerInput value={vencimentoDate} onSelect={setVencimentoDate} />
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
                    <Button>Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const SaleValueInfoDialog = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => {
    const [vencimentoDate, setVencimentoDate] = useState<Date>(new Date(2025, 7, 24));
    
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
                                    <DatePickerInput value={vencimentoDate} onSelect={setVencimentoDate} />
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
                    <Button>Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const BonusInfoDialog = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => {
    const [vencimentoDate, setVencimentoDate] = useState<Date>(new Date(2025, 7, 24));
    
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
                                    <DatePickerInput value={vencimentoDate} onSelect={setVencimentoDate} />
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
                    <Button>Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


const PaidBonusInfoDialog = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => {
    const [vencimentoDate, setVencimentoDate] = useState<Date>(new Date(2025, 7, 24));
    
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
                                    <DatePickerInput value={vencimentoDate} onSelect={setVencimentoDate} />
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
                    <Button>Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const InvoiceServiceDialog = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => {
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
                    <Button>Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const historyItems = [
    {
        icon: DollarSign,
        user: 'Maxshuell',
        action: 'Removeu a venda.',
        timestamp: '24/08/2025 10:59'
    },
    {
        icon: DollarSign,
        user: 'Maxshuell',
        action: 'Realizou o lançamento da venda.',
        timestamp: '24/08/2025 10:58'
    },
    {
        icon: Pencil,
        user: 'Maxshuell',
        action: 'Alterou a situação para Aprovado.',
        timestamp: '22/08/2025 17:52'
    },
    {
        icon: FileTextIcon,
        user: 'Maxshuell',
        action: 'Cadastrou a cotação.',
        timestamp: '22/08/2025 17:51'
    }
];

export default function NovaCotacaoPage() {
    const [date, setDate] = useState<Date>(new Date(2025, 7, 23));
    const [currentStep, setCurrentStep] = useState(2);
    const [activeTab, setActiveTab] = useState('valores');
    const [isNewPersonDialogOpen, setIsNewPersonDialogOpen] = useState(false);
    const [isCostInfoDialogOpen, setIsCostInfoDialogOpen] = useState(false);
    const [isSaleValueInfoDialogOpen, setIsSaleValueInfoDialogOpen] = useState(false);
    const [isBonusInfoDialogOpen, setIsBonusInfoDialogOpen] = useState(false);
    const [isPaidBonusInfoDialogOpen, setIsPaidBonusInfoDialogOpen] = useState(false);
    const [isInvoiceServiceDialogOpen, setIsInvoiceServiceDialogOpen] = useState(false);
    const [faturaEmissao, setFaturaEmissao] = useState<Date>(new Date(2025, 7, 25));
    const [faturaVencimento, setFaturaVencimento] = useState<Date>(new Date(2025, 7, 25));


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
                                            <Label>Lucro <sup className="font-medium">1</sup></Label>
                                            <p className="text-2xl font-bold">R$ 0,00</p>
                                            <p className="text-xs text-muted-foreground">¹ lucro com bonificações</p>
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
                                        <DatePickerInput value={faturaEmissao} onSelect={setFaturaEmissao} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="fatura-vencimento">Vencimento <span className="text-destructive">*</span></Label>
                                        <DatePickerInput value={faturaVencimento} onSelect={setFaturaVencimento} />
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
                                    <MessageSquare className="h-5 w-5 text-primary" />
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
                                {historyItems.map((item, index) => (
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
                                ))}
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
        </>
    );
}
