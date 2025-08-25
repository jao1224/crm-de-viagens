

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Gem, Eye, Pencil, Trash2, Filter, UserPlus, Mail, Globe, Instagram, Calendar as CalendarIcon, Check, Users, Search } from 'lucide-react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Textarea } from '@/components/ui/textarea';
import { countries } from '@/lib/countries';


const mockPeople = [
    { id: 1, name: 'Aalyah Evelyn Bulhões Domingues', rating: 5, types: ['Passageiro'], cpfCnpj: '', phone: '', active: true },
    { id: 2, name: 'Aayslah Raquel Bulhões Domingues', rating: 5, types: ['Passageiro'], cpfCnpj: '', phone: '', active: true },
    { id: 3, name: 'Abdessalam bara', rating: 5, types: ['Cliente'], cpfCnpj: '', phone: '', active: true },
    { id: 4, name: 'ADEILSON', rating: 0, types: ['Cliente'], cpfCnpj: '', phone: '', active: true },
    { id: 5, name: 'ADEMIR', rating: 0, types: ['Passageiro', 'Cliente'], cpfCnpj: '', phone: '', active: true },
    { id: 6, name: 'ADEMIR', rating: 0, types: ['Passageiro', 'Cliente'], cpfCnpj: '', phone: '', active: true },
    { id: 7, name: 'ADEMIR', rating: 0, types: ['Cliente'], cpfCnpj: '', phone: '', active: true },
    { id: 8, name: 'ADEMIR CAETANO', rating: 0, types: ['Passageiro'], cpfCnpj: '', phone: '', active: true },
    { id: 9, name: 'Adriana Bulhões Vieira', rating: 5, types: ['Passageiro', 'Cliente'], cpfCnpj: '', phone: '+5519996182481', active: true },
    { id: 10, name: 'Adriana e Davi', rating: 5, types: ['Cliente'], cpfCnpj: '', phone: '', active: true },
    { id: 11, name: 'ADRIANA E JAMILLA', rating: 0, types: ['Cliente'], cpfCnpj: '', phone: '', active: true },
    { id: 12, name: 'Adriano da Conceição Carreiro', rating: 0, types: ['Passageiro'], cpfCnpj: '080.659.707-02', phone: '', active: true },
    { id: 13, name: 'adriano e jamilla', rating: 0, types: ['Cliente'], cpfCnpj: '', phone: '', active: true },
    { id: 14, name: 'Adriano e jamilla', rating: 0, types: ['Cliente'], cpfCnpj: '', phone: '', active: true },
    { id: 15, name: 'Agatha Batista Amaral', rating: 0, types: ['Passageiro', 'Cliente'], cpfCnpj: '', phone: '', active: true },
    { id: 16, name: 'Agatha Batista Amaral', rating: 0, types: ['Passageiro'], cpfCnpj: '', phone: '', active: true },
    { id: 17, name: 'AILANA CLARA LIMA BARATA', rating: 5, types: ['Passageiro', 'Cliente'], cpfCnpj: '', phone: '(85) 98828-0142', active: true },
    { id: 18, name: 'Alessandra Neris Pereira', rating: 0, types: ['Passageiro'], cpfCnpj: '282.332.928-50', phone: '(11) 93961-6954', active: true },
    { id: 19, name: 'Alessandro Cavalcante', rating: 5, types: ['Passageiro', 'Cliente'], cpfCnpj: '', phone: '(98) 99991-5130', active: true },
];

const nationalities = [
    { value: "afghan", label: "Afegã" }, { value: "german", label: "Alemã" }, { value: "andorran", label: "Andorrana" }, { value: "angolan", label: "Angolana" }, { value: "antiguan", label: "Antiguana" }, { value: "algerian", label: "Argelina" }, { value: "argentine", label: "Argentina" }, { value: "armenian", label: "Armênia" }, { value: "australian", label: "Australiana" }, { value: "austrian", label: "Austríaca" }, { value: "azerbaijani", label: "Azerbaijana" }, { value: "bahamian", label: "Bahamense" }, { value: "bahraini", label: "Bareinita" }, { value: "bangladeshi", label: "Bangladesa" }, { value: "barbadian", label: "Barbadiana" }, { value: "belarusian", label: "Bielorrussa" }, { value: "belgian", label: "Belga" }, { value: "belizean", label: "Belizenha" }, { value: "beninese", label: "Beninense" }, { value: "bhutanese", label: "Butanesa" }, { value: "bolivian", label: "Boliviana" }, { value: "bosnian", label: "Bósnia" }, { value: "botswanan", label: "Botsuana" }, { value: "brazilian", label: "Brasileira" }, { value: "bruneian", label: "Bruneana" }, { value: "bulgarian", label: "Búlgara" }, { value: "burkinabe", label: "Burquinense" }, { value: "burundian", label: "Burundiana" }, { value: "cambodian", label: "Cambojana" }, { value: "cameroonian", label: "Camaronesa" }, { value: "canadian", label: "Canadense" }, { value: "cape_verdean", label: "Cabo-verdiana" }, { value: "qatari", label: "Catariana" }, { value: "kazakh", label: "Cazaque" }, { value: "chadian", label: "Chadiana" }, { value: "chilean", label: "Chilena" }, { value: "chinese", label: "Chinesa" }, { value: "cypriot", label: "Cipriota" }, { value: "colombian", label: "Colombiana" }, { value: "comorian", label: "Comoriana" }, { value: "congolese_drc", label: "Congolesa (RDC)" }, { value: "congolese_roc", label: "Congolesa (República)" }, { value: "north_korean", label: "Norte-coreana" }, { value: "south_korean", label: "Sul-coreana" }, { value: "ivorian", label: "Marfinense" }, { value: "costa_rican", label: "Costa-riquenha" }, { value: "croatian", label: "Croata" }, { value: "cuban", label: "Cubana" }, { value: "danish", label: "Dinamarquesa" }, { value: "djiboutian", label: "Djibutiana" }, { value: "dominican", label: "Dominiquesa" }, { value: "egyptian", label: "Egípcia" }, { value: "salvadoran", label: "Salvadorenha" }, { value: "emirati", label: "Emiratense" }, { value: "ecuadorian", label: "Equatoriana" }, { value: "eritrean", label: "Eritreia" }, { value: "slovak", label: "Eslovaca" }, { value: "slovenian", label: "Eslovena" }, { value: "spanish", label: "Espanhola" }, { value: "estonian", label: "Estoniana" }, { value: "ethiopian", label: "Etíope" }, { value: "fijian", label: "Fijiana" }, { value: "filipino", label: "Filipina" }, { value: "finnish", label: "Finlandesa" }, { value: "french", label: "Francesa" }, { value: "gabonese", label: "Gabonesa" }, { value: "gambian", label: "Gambiana" }, { value: "ghanaian", label: "Ganesa" }, { value: "georgian", label: "Georgiana" }, { value: "grenadian", label: "Granadina" }, { value: "greek", label: "Grega" }, { value: "guatemalan", label: "Guatemalteca" }, { value: "guyanese", label: "Guianesa" }, { value: "guinean", label: "Guineense" }, { value: "equatorial_guinean", label: "Guinéu-equatoriana" }, { value: "guinea_bissauan", label: "Guineense (Bissau)" }, { value: "haitian", label: "Haitiana" }, { value: "dutch", label: "Holandesa" }, { value: "honduran", label: "Hondurenha" }, { value: "hungarian", label: "Húngara" }, { value: "yemeni", label: "Iemenita" }, { value: "marshallese", label: "Marshallina" }, { value: "solomon_islander", label: "Salomônica" }, { value: "indian", label: "Indiana" }, { value: "indonesian", label: "Indonésia" }, { value: "iranian", label: "Iraniana" }, { value: "iraqi", label: "Iraquiana" }, { value: "irish", label: "Irlandesa" }, { value: "icelandic", label: "Islandesa" }, { value: "israeli", label: "Israelense" }, { value: "italian", label: "Italiana" }, { value: "jamaican", label: "Jamaicana" }, { value: "japanese", label: "Japonesa" }, { value: "jordanian", label: "Jordaniana" }, { value: "kiribatian", label: "Kiribatiana" }, { value: "kosovar", label: "Kosovar" }, { value: "kuwaiti", label: "Kuwaitiana" }, { value: "laotian", label: "Laosiana" }, { value: "lesotho", label: "Lesota" }, { value: "latvian", label: "Letã" }, { value: "lebanese", label: "Libanesa" }, { value: "liberian", label: "Liberiana" }, { value: "libyan", label: "Líbia" }, { value: "liechtensteiner", label: "Liechtensteiniense" }, { value: "lithuanian", label: "Lituana" }, { value: "luxembourgish", label: "Luxemburguesa" }, { value: "macedonian", label: "Macedônia" }, { value: "malagasy", label: "Malgaxe" }, { value: "malaysian", label: "Malaia" }, { value: "malawian", label: "Malauiana" }, { value: "maldivan", label: "Maldiva" }, { value: "malian", label: "Maliana" }, { value: "maltese", label: "Maltesa" }, { value: "moroccan", label: "Marroquina" }, { value: "mauritanian", label: "Mauritana" }, { value: "mauritian", label: "Mauriciana" }, { value: "mexican", label: "Mexicana" }, { value: "micronesian", label: "Micronésia" }, { value: "mozambican", label: "Moçambicana" }, { value: "moldovan", label: "Moldávia" }, { value: "monacan", label: "Monegasca" }, { value: "mongolian", label: "Mongol" }, { value: "montenegrin", label: "Montenegrina" }, { value: "myanmarese", label: "Birmanesa" }, { value: "namibian", label: "Namibiana" }, { value: "nauruan", label: "Nauruana" }, { value: "nepalese", label: "Nepalesa" }, { value: "nicaraguan", label: "Nicaraguense" }, { value: "nigerien", label: "Nigerina" }, { value: "nigerian", label: "Nigeriana" }, { value: "norwegian", label: "Norueguesa" }, { value: "new_zealander", label: "Neozelandesa" }, { value: "omani", label: "Omanense" }, { value: "palauan", label: "Palauana" }, { value: "panamanian", label: "Panamenha" }, { value: "papua_new_guinean", label: "Papuásia" }, { value: "pakistani", label: "Paquistanesa" }, { value: "paraguayan", label: "Paraguaia" }, { value: "peruvian", label: "Peruana" }, { value: "polish", label: "Polonesa" }, { value: "portuguese", label: "Portuguesa" }, { value: "kenyan", label: "Queniana" }, { value: "kyrgyz", label: "Quirguiz" }, { value: "british", label: "Britânica" }, { value: "central_african", label: "Centro-africana" }, { value: "czech", label: "Tcheca" }, { value: "dominican_republic", label: "Dominicana" }, { value: "romanian", label: "Romena" }, { value: "rwandan", label: "Ruandesa" }, { value: "russian", label: "Russa" }, { value: "saint_kitts_and_nevis", label: "São-cristovense" }, { value: "saint_lucian", label: "Santa-lucense" }, { value: "saint_vincent_and_the_grenadines", label: "São-vicentina" }, { value: "samoan", label: "Samoana" }, { value: "san_marinese", label: "São-marinense" }, { value: "sao_tomean", label: "Santomense" }, { value: "saudi", label: "Saudita" }, { value: "senegalese", label: "Senegalesa" }, { value: "sierra_leonean", label: "Serra-leonesa" }, { value: "serbian", label: "Sérvia" }, { value: "seychellois", label: "Seichelense" }, { value: "singaporean", label: "Singapurense" }, { value: "syrian", label: "Síria" }, { value: "somali", label: "Somali" }, { value: "sri_lankan", label: "Cingalesa" }, { value: "swazi", label: "Suazi" }, { value: "sudanese", label: "Sudanesa" }, { value: "south_sudanese", label: "Sul-sudanesa" }, { value: "swedish", label: "Sueca" }, { value: "swiss", label: "Suíça" }, { value: "surinamese", label: "Surinamesa" }, { value: "thai", label: "Tailandesa" }, { value: "taiwanese", label: "Taiwanesa" }, { value: "tanzanian", label: "Tanzaniana" }, { value: "tajik", label: "Tadjique" }, { value: "east_timorese", label: "Timorense" }, { value: "togolese", label: "Togolesa" }, { value: "tongan", label: "Tonganesa" }, { value: "trinidadian_and_tobagonian", label: "Trinitário-tobagense" }, { value: "tunisian", label: "Tunisiana" }, { value: "turkmen", label: "Turcomena" }, { value: "turkish", label: "Turca" }, { value: "tuvaluan", label: "Tuvaluana" }, { value: "ukrainian", label: "Ucraniana" }, { value: "ugandan", label: "Ugandense" }, { value: "uruguayan", label: "Uruguaia" }, { value: "uzbek", label: "Uzbeque" }, { value: "vanuatuan", label: "Vanuatuense" }, { value: "vatican", label: "Vaticana" }, { value: "venezuelan", label: "Venezuelana" }, { value: "vietnamese", label: "Vietnamita" }, { value: "zambian", label: "Zambiana" }, { value: "zimbabwean", label: "Zimbabuana" }
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
                                <TabsTrigger value="familia">Família</TabsTrigger>
                                <TabsTrigger value="cotações">Cotações</TabsTrigger>
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
                        <TabsContent value="familia" className="pt-4">
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr,auto] gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="family-person">Pessoa</Label>
                                        <Select>
                                            <SelectTrigger id="family-person">
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                            <SelectContent></SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="family-member">Membro</Label>
                                        <Select>
                                            <SelectTrigger id="family-member">
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                            <SelectContent></SelectContent>
                                        </Select>
                                    </div>
                                    <Button className="self-end">Adicionar</Button>
                                </div>
                                <div className="p-8 text-center text-muted-foreground bg-muted/50 rounded-md">
                                    Nenhum membro familiar informado.
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="cotações" className="pt-4">
                            <p className="text-muted-foreground text-center p-8">Não há nenhuma cotação vinculada a esta pessoa.</p>
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

const RatingStars = ({ rating }: { rating: number }) => (
    <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
            <Gem key={i} className={`h-4 w-4 ${i < rating ? 'text-blue-500 fill-blue-500' : 'text-gray-300'}`} />
        ))}
    </div>
);

const PhoneCell = ({ phone }: { phone: string }) => {
    if (!phone) return null;

    let flag = '';
    if (phone.includes('(85)') || phone.includes('(98)')) {
        flag = '/flags/br.svg';
    } else if (phone.startsWith('+55')) {
        flag = '/flags/br.svg';
    }

    return (
        <div className="flex items-center gap-2">
            {flag && <Image src={flag} alt="Bandeira" width={16} height={12} />}
            <span>{phone}</span>
        </div>
    );
};

export default function PessoasPage() {
    const [isNewPersonDialogOpen, setIsNewPersonDialogOpen] = useState(false);

    return (
        <>
            <div className="space-y-6">
                <header className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-primary">Pessoas</h1>
                    <Button onClick={() => setIsNewPersonDialogOpen(true)}>Novo</Button>
                </header>

                <Card>
                    <CardContent className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr,1fr,1fr,1fr,auto,auto] gap-4 items-end">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-muted-foreground px-1">Nome</label>
                                <Input placeholder="Nome" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-muted-foreground px-1">CPF/CNPJ</label>
                                <Input placeholder="CPF/CNPJ" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-muted-foreground px-1">Tipo</label>
                                <Select defaultValue="todos">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="todos">Todos</SelectItem>
                                        <SelectItem value="cliente">Cliente</SelectItem>
                                        <SelectItem value="passageiro">Passageiro</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-muted-foreground px-1">Situação</label>
                                <Select defaultValue="ativos">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ativos">Ativos</SelectItem>
                                        <SelectItem value="inativos">Inativos</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button variant="outline" size="icon">
                                <Filter className="h-4 w-4" />
                            </Button>
                            <Button>Pesquisar</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[30%]">Nome</TableHead>
                                        <TableHead>Tipo</TableHead>
                                        <TableHead>CPF/CNPJ</TableHead>
                                        <TableHead>Celular</TableHead>
                                        <TableHead>Ativo</TableHead>
                                        <TableHead className="text-right">Ações</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockPeople.map((person) => (
                                        <TableRow key={person.id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-2">
                                                    <span>{person.name}</span>
                                                    {person.rating > 0 && <RatingStars rating={person.rating} />}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-wrap gap-1">
                                                    {person.types.map(type => (
                                                        <Badge key={type} variant="secondary" className="font-normal">{type}</Badge>
                                                    ))}
                                                </div>
                                            </TableCell>
                                            <TableCell>{person.cpfCnpj}</TableCell>
                                            <TableCell>
                                                <PhoneCell phone={person.phone} />
                                            </TableCell>
                                            <TableCell>
                                                <Switch checked={person.active} />
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button variant="ghost" size="icon">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon">
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <NewPersonDialog open={isNewPersonDialogOpen} onOpenChange={setIsNewPersonDialogOpen} />
        </>
    );
}

    
