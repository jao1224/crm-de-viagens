

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Gem, Eye, Pencil, Trash2, Filter, UserPlus, Mail, Globe, Instagram, Calendar as CalendarIcon, Check, Users, Search, Handshake, FileText as FileTextIcon, Info, UserRound, BookUser, Link as LinkIcon, Home, Briefcase, Milestone, FileArchive, Paperclip, Copy, X } from 'lucide-react';
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
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Separator } from '@/components/ui/separator';


const mockPeopleData = [
    { id: 1, name: 'Aalyah Evelyn Bulhões Domingues', rating: 5, types: ['Passageiro'], cpfCnpj: '123.456.789-00', phone: '+55 85 91234-5678', email: 'aalyah@email.com', sexo: 'Feminino', nascimento: '2004-07-13', rg: '2004123456789', orgaoEmissor: 'SSP/CE', id_estrangeiro: '', nacionalidade: 'Brasil', estadoCivil: 'Solteira', passaporte: 'GJ407853', emissaoPassaporte: '2024-05-21', vencimentoPassaporte: '2034-05-20', nacionalidadePassaporte: 'Brasil', visto: '', validadeVisto: '', active: true },
    { id: 2, name: 'Aayslah Raquel Bulhões Domingues', rating: 5, types: ['Passageiro'], cpfCnpj: '', phone: '', email: '', sexo: 'Feminino', nascimento: '', rg: '', orgaoEmissor: '', id_estrangeiro: '', nacionalidade: 'Brasil', estadoCivil: '', passaporte: '', emissaoPassaporte: '', vencimentoPassaporte: '', nacionalidadePassaporte: '', visto: '', validadeVisto: '', active: true },
    { id: 3, name: 'Abdessalam bara', rating: 5, types: ['Cliente'], cpfCnpj: '', phone: '', email: '', sexo: 'Masculino', nascimento: '', rg: '', orgaoEmissor: '', id_estrangeiro: '', nacionalidade: 'Marrocos', estadoCivil: '', passaporte: '', emissaoPassaporte: '', vencimentoPassaporte: '', nacionalidadePassaporte: '', visto: '', validadeVisto: '', active: true },
    { id: 4, name: 'ADEILSON', rating: 0, types: ['Cliente'], cpfCnpj: '', phone: '', email: '', sexo: '', nascimento: '', rg: '', orgaoEmissor: '', id_estrangeiro: '', nacionalidade: 'Brasil', estadoCivil: '', passaporte: '', emissaoPassaporte: '', vencimentoPassaporte: '', nacionalidadePassaporte: '', visto: '', validadeVisto: '', active: true },
    { id: 5, name: 'ADEMIR', rating: 0, types: ['Passageiro', 'Cliente'], cpfCnpj: '', phone: '', email: '', sexo: '', nascimento: '', rg: '', orgaoEmissor: '', id_estrangeiro: '', nacionalidade: 'Brasil', estadoCivil: '', passaporte: '', emissaoPassaporte: '', vencimentoPassaporte: '', nacionalidadePassaporte: '', visto: '', validadeVisto: '', active: true },
];

type Person = typeof mockPeopleData[0];

const nationalities = [
    { value: "afghan", label: "Afegã" }, { value: "german", label: "Alemã" }, { value: "andorran", label: "Andorrana" }, { value: "angolan", label: "Angolana" }, { value: "antiguan", label: "Antiguana" }, { value: "algerian", label: "Argelina" }, { value: "argentine", label: "Argentina" }, { value: "armenian", label: "Armênia" }, { value: "australian", label: "Australiana" }, { value: "austrian", label: "Austríaca" }, { value: "azerbaijani", label: "Azerbaijana" }, { value: "bahamian", label: "Bahamense" }, { value: "bahraini", label: "Bareinita" }, { value: "bangladeshi", label: "Bangladesa" }, { value: "barbadian", label: "Barbadiana" }, { value: "belarusian", label: "Bielorrussa" }, { value: "belgian", label: "Belga" }, { value: "belizean", label: "Belizenha" }, { value: "beninese", label: "Beninense" }, { value: "bhutanese", label: "Butanesa" }, { value: "bolivian", label: "Boliviana" }, { value: "bosnian", label: "Bósnia" }, { value: "botswanan", label: "Botsuana" }, { value: "brazilian", label: "Brasileira" }, { value: "bruneian", label: "Bruneana" }, { value: "bulgarian", label: "Búlgara" }, { value: "burkinabe", label: "Burquinense" }, { value: "burundian", label: "Burundiana" }, { value: "cambodian", label: "Cambojana" }, { value: "cameroonian", label: "Camaronesa" }, { value: "canadian", label: "Canadense" }, { value: "cape_verdean", label: "Cabo-verdiana" }, { value: "qatari", label: "Catariana" }, { value: "kazakh", label: "Cazaque" }, { value: "chadian", label: "Chadiana" }, { value: "chilean", label: "Chilena" }, { value: "chinese", label: "Chinesa" }, { value: "cypriot", label: "Cipriota" }, { value: "colombian", label: "Colombiana" }, { value: "comorian", label: "Comoriana" }, { value: "congolese_drc", label: "Congolesa (RDC)" }, { value: "congolese_roc", label: "Congolesa (República)" }, { value: "north_korean", label: "Norte-coreana" }, { value: "south_korean", label: "Sul-coreana" }, { value: "ivorian", label: "Marfinense" }, { value: "costa_rican", label: "Costa-riquenha" }, { value: "croatian", label: "Croata" }, { value: "cuban", label: "Cubana" }, { value: "danish", label: "Dinamarquesa" }, { value: "djiboutian", label: "Djibutiana" }, { value: "dominican", label: "Dominiquesa" }, { value: "egyptian", label: "Egípcia" }, { value: "salvadoran", label: "Salvadorenha" }, { value: "emirati", label: "Emiratense" }, { value: "ecuadorian", label: "Equatoriana" }, { value: "eritrean", label: "Eritreia" }, { value: "slovak", label: "Eslovaca" }, { value: "slovenian", label: "Eslovena" }, { value: "spanish", label: "Espanhola" }, { value: "estonian", label: "Estoniana" }, { value: "ethiopian", label: "Etíope" }, { value: "fijian", label: "Fijiana" }, { value: "filipino", label: "Filipina" }, { value: "finnish", label: "Finlandesa" }, { value: "french", label: "Francesa" }, { value: "gabonese", label: "Gabonesa" }, { value: "gambian", label: "Gambiana" }, { value: "ghanaian", label: "Ganesa" }, { value: "georgian", label: "Georgiana" }, { value: "grenadian", label: "Granadina" }, { value: "greek", label: "Grega" }, { value: "guatemalan", label: "Guatemalteca" }, { value: "guyanese", label: "Guianesa" }, { value: "guinean", label: "Guineense" }, { value: "equatorial_guinean", label: "Guinéu-equatoriana" }, { value: "guinea_bissauan", label: "Guineense (Bissau)" }, { value: "haitian", label: "Haitiana" }, { value: "dutch", label: "Holandesa" }, { value: "honduran", label: "Hondurenha" }, { value: "hungarian", label: "Húngara" }, { value: "yemeni", label: "Iemenita" }, { value: "marshallese", label: "Marshallina" }, { value: "solomon_islander", label: "Salomônica" }, { value: "indian", label: "Indiana" }, { value: "indonesian", label: "Indonésia" }, { value: "iranian", label: "Iraniana" }, { value: "iraqi", label: "Iraquiana" }, { value: "irish", label: "Irlandesa" }, { value: "icelandic", label: "Islandesa" }, { value: "israeli", label: "Israelense" }, { value: "italian", label: "Italiana" }, { value: "jamaican", label: "Jamaicana" }, { value: "japanese", label: "Japonesa" }, { value: "jordanian", label: "Jordaniana" }, { value: "kiribatian", label: "Kiribatiana" }, { value: "kosovar", label: "Kosovar" }, { value: "kuwaiti", label: "Kuwaitiana" }, { value: "laotian", label: "Laosiana" }, { value: "lesotho", label: "Lesota" }, { value: "latvian", label: "Letã" }, { value: "lebanese", label: "Libanesa" }, { value: "liberian", label: "Liberiana" }, { value: "libyan", label: "Líbia" }, { value: "liechtensteiner", label: "Liechtensteiniense" }, { value: "lithuanian", label: "Lituana" }, { value: "luxembourgish", label: "Luxemburguesa" }, { value: "macedonian", label: "Macedônia" }, { value: "malagasy", label: "Malgaxe" }, { value: "malaysian", label: "Malaia" }, { value: "malawian", label: "Malauiana" }, { value: "maldivan", label: "Maldiva" }, { value: "malian", label: "Maliana" }, { value: "maltese", label: "Maltesa" }, { value: "moroccan", label: "Marroquina" }, { value: "mauritanian", label: "Mauritana" }, { value: "mauritian", label: "Mauriciana" }, { value: "mexican", label: "Mexicana" }, { value: "micronesian", label: "Micronésia" }, { value: "mozambican", label: "Moçambicana" }, { value: "moldovan", label: "Moldávia" }, { value: "monacan", label: "Monegasca" }, { value: "mongolian", label: "Mongol" }, { value: "montenegrin", label: "Montenegrina" }, { value: "myanmarese", label: "Birmanesa" }, { value: "namibian", label: "Namibiana" }, { value: "nauruan", label: "Nauruana" }, { value: "nepalese", label: "Nepalesa" }, { value: "nicaraguan", label: "Nicaraguense" }, { value: "nigerien", label: "Nigerina" }, { value: "nigerian", label: "Nigeriana" }, { value: "norwegian", label: "Norueguesa" }, { value: "new_zealander", label: "Neozelandesa" }, { value: "omani", label: "Omanense" }, { value: "palauan", label: "Palauana" }, { value: "panamanian", label: "Panamenha" }, { value: "papua_new_guinean", label: "Papuásia" }, { value: "pakistani", label: "Paquistanesa" }, { value: "paraguayan", label: "Paraguaia" }, { value: "peruvian", label: "Peruana" }, { value: "polish", label: "Polonesa" }, { value: "portuguese", label: "Portuguesa" }, { value: "kenyan", label: "Queniana" }, { value: "kyrgyz", label: "Quirguiz" }, { value: "british", label: "Britânica" }, { value: "central_african", label: "Centro-africana" }, { value: "czech", label: "Tcheca" }, { value: "dominican_republic", label: "Dominicana" }, { value: "romanian", label: "Romena" }, { value: "rwandan", label: "Ruandesa" }, { value: "russian", label: "Russa" }, { value: "saint_kitts_and_nevis", label: "São-cristovense" }, { value: "saint_lucian", label: "Santa-lucense" }, { value: "saint_vincent_and_the_grenadines", label: "São-vicentina" }, { value: "samoan", label: "Samoana" }, { value: "san_marinese", label: "São-marinense" }, { value: "sao_tomean", label: "Santomense" }, { value: "saudi", label: "Saudita" }, { value: "senegalese", label: "Senegalesa" }, { value: "sierra_leonean", label: "Serra-leonesa" }, { value: "serbian", label: "Sérvia" }, { value: "seychellois", label: "Seichelense" }, { value: "singaporean", label: "Singapurense" }, { value: "syrian", label: "Síria" }, { value: "somali", label: "Somali" }, { value: "sri_lankan", label: "Cingalesa" }, { value: "swazi", label: "Suazi" }, { value: "sudanese", label: "Sudanesa" }, { value: "south_sudanese", label: "Sul-sudanesa" }, { value: "swedish", label: "Sueca" }, { value: "swiss", label: "Suíça" }, { value: "surinamese", label: "Surinamesa" }, { value: "thai", label: "Tailandesa" }, { value: "taiwanese", label: "Taiwanesa" }, { value: "tanzanian", label: "Tanzaniana" }, { value: "tajik", label: "Tadjique" }, { value: "east_timorese", label: "Timorense" }, { value: "togolese", label: "Togolesa" }, { value: "tongan", label: "Tonganesa" }, { value: "trinidadian_and_tobagonian", label: "Trinitário-tobagense" }, { value: "tunisian", label: "Tunisiana" }, { value: "turkmen", label: "Turcomena" }, { value: "turkish", label: "Turca" }, { value: "tuvaluan", label: "Tuvaluana" }, { value: "ukrainian", label: "Ucraniana" }, { value: "ugandan", label: "Ugandense" }, { value: "uruguayan", label: "Uruguaia" }, { value: "uzbek", label: "Uzbeque" }, { value: "vanuatuan", label: "Vanuatuense" }, { value: "vatican", label: "Vaticana" }, { value: "venezuelan", label: "Venezuelana" }, { value: "vietnamese", label: "Vietnamita" }, { value: "zambian", label: "Zambiana" }, { value: "zimbabwean", label: "Zimbabuana" }
];

const DatePickerInput = ({ value, onSelect, placeholder = "dd/mm/aaaa" }: { value: Date | undefined, onSelect: (date: Date | undefined) => void, placeholder?: string }) => {
    const [inputValue, setInputValue] = useState(value ? format(value, "dd/MM/yyyy") : "");

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

interface Attachment {
    id: string;
    fileName: string;
    description: string;
}

const AttachmentDialog = ({ open, onOpenChange, onSave }: { open: boolean, onOpenChange: (open: boolean) => void, onSave: (attachment: Omit<Attachment, 'id'>) => void }) => {
    const [fileName, setFileName] = useState<string | null>(null);
    const [description, setDescription] = useState('');
    const fileInputRef = React.useRef<HTMLInputElement>(null);


    const handleSave = () => {
        if (fileName && description) {
            onSave({ fileName, description });
            onOpenChange(false);
            // Reset state
            setFileName(null);
            setDescription('');
            if(fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } else {
            alert('Por favor, selecione um arquivo e adicione uma descrição.');
        }
    };
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFileName(event.target.files[0].name);
        } else {
            setFileName(null);
        }
    };


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Anexo</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="attachment-file">Selecione o arquivo <span className="text-destructive">*</span></Label>
                         <div className="flex items-center gap-2">
                            <Input id="attachment-file" type="file" className="hidden" onChange={handleFileChange} ref={fileInputRef} />
                            <Button asChild variant="outline">
                                <label htmlFor="attachment-file" className="cursor-pointer">Escolher Arquivo</label>
                            </Button>
                            <span className="text-sm text-muted-foreground truncate" title={fileName ?? undefined}>
                                {fileName ?? 'Nenhum arquivo escolhido'}
                            </span>
                        </div>
                        <p className="text-xs text-muted-foreground">Imagens, PDF e arquivos de textos de até 5MB</p>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="attachment-description">Descrição <span className="text-destructive">*</span></Label>
                        <Input id="attachment-description" placeholder="Não informada" value={description} onChange={(e) => setDescription(e.target.value)} />
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

const NewPersonDialog = ({ open, onOpenChange, personToEdit, onSave }: { open: boolean, onOpenChange: (open: boolean) => void, personToEdit: Person | null, onSave: (person: Person) => void }) => {
    const { toast } = useToast();
    const formRef = React.useRef<HTMLFormElement>(null);
    const [rating, setRating] = useState(0);
    const [birthDate, setBirthDate] = useState<Date>();
    const [passportIssueDate, setPassportIssueDate] = useState<Date>();
    const [passportExpiryDate, setPassportExpiryDate] = useState<Date>();
    const [visaValidityDate, setVisaValidityDate] = useState<Date>();
    const [address, setAddress] = useState(initialAddressState);
    const [isAttachmentDialogOpen, setIsAttachmentDialogOpen] = useState(false);
    const [attachments, setAttachments] = useState<Attachment[]>([]);
    const [personName, setPersonName] = useState('');
    const [cpfCnpj, setCpfCnpj] = useState('');

    const handleCpfCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters

        if (value.length <= 11) { // CPF
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        } else { // CNPJ
            value = value.slice(0, 14); // Limit to 14 digits
            value = value.replace(/^(\d{2})(\d)/, '$1.$2');
            value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
            value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
            value = value.replace(/(\d{4})(\d)/, '$1-$2');
        }
        setCpfCnpj(value);
    };


    React.useEffect(() => {
        if (personToEdit) {
            setPersonName(personToEdit.name);
            setRating(personToEdit.rating);
            setCpfCnpj(personToEdit.cpfCnpj || '');
            // Preencher outros campos se necessário
        } else {
            // Resetar campos para um novo formulário
            setPersonName('');
            setRating(0);
            setCpfCnpj('');
        }
    }, [personToEdit]);

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setAddress(prev => ({ ...prev, [id.replace('addr-', '')]: value }));
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
    
    const handleSaveAttachment = (attachment: Omit<Attachment, 'id'>) => {
        setAttachments(prev => [...prev, { ...attachment, id: Date.now().toString() }]);
    };

    const handleDeleteAttachment = (id: string) => {
        setAttachments(prev => prev.filter(att => att.id !== id));
    };
    
    const handleSavePerson = () => {
        const form = formRef.current;
        if (!form) return;

        // Basic validation
        if (!personName) {
             toast({
                title: 'Campo Obrigatório',
                description: 'O campo "Nome" é obrigatório.',
                variant: 'destructive',
            });
            return;
        }
        
        const newPerson: Person = {
            id: personToEdit?.id || Date.now(), // Use existing id or generate a new one
            name: personName,
            rating: rating,
            types: ['Passageiro'], // Default, can be changed
            cpfCnpj: cpfCnpj,
            phone: (form.querySelector('#person-phone') as HTMLInputElement)?.value || '',
            email: (form.querySelector('#person-email') as HTMLInputElement)?.value || '',
            sexo: (form.querySelector('#person-gender') as HTMLSelectElement)?.value || '',
            nascimento: birthDate ? format(birthDate, 'yyyy-MM-dd') : '',
            rg: (form.querySelector('#doc-rg') as HTMLInputElement)?.value || '',
            orgaoEmissor: (form.querySelector('#doc-rg-issuer') as HTMLInputElement)?.value || '',
            id_estrangeiro: (form.querySelector('#doc-foreign-id') as HTMLInputElement)?.value || '',
            nacionalidade: (form.querySelector('#doc-nationality') as HTMLSelectElement)?.value || '',
            estadoCivil: (form.querySelector('#doc-marital-status') as HTMLSelectElement)?.value || '',
            passaporte: (form.querySelector('#doc-passport') as HTMLInputElement)?.value || '',
            emissaoPassaporte: passportIssueDate ? format(passportIssueDate, 'yyyy-MM-dd') : '',
            vencimentoPassaporte: passportExpiryDate ? format(passportExpiryDate, 'yyyy-MM-dd') : '',
            nacionalidadePassaporte: (form.querySelector('#doc-passport-nat') as HTMLSelectElement)?.value || '',
            visto: (form.querySelector('#doc-visa') as HTMLInputElement)?.value || '',
            validadeVisto: visaValidityDate ? format(visaValidityDate, 'yyyy-MM-dd') : '',
            active: personToEdit?.active ?? true,
        };

        onSave(newPerson);
        onOpenChange(false);
    };

    const activeTabClasses = "data-[state=active]:bg-primary data-[state=active]:text-chart-2";

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-4xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-foreground">{personToEdit ? 'Editar Pessoa' : 'Nova Pessoa'}</DialogTitle>
                    </DialogHeader>
                    <form ref={formRef}>
                    <div className="py-4 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                            <div className="space-y-2 lg:col-span-1">
                                <Label htmlFor="person-name">Nome <span className="text-destructive">*</span></Label>
                                <div className="flex items-center gap-2">
                                    <Input id="person-name" className="flex-1" value={personName} onChange={(e) => setPersonName(e.target.value)} />
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div className="flex items-center">
                                                    {[1, 2, 3, 4, 5].map((diamond) => (
                                                        <button key={diamond} type="button" onClick={() => setRating(diamond)} className="focus:outline-none">
                                                            <Gem className={cn("h-5 w-5", rating >= diamond ? "text-blue-400 fill-blue-400" : "text-muted-foreground/30")} />
                                                        </button>
                                                    ))}
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Avalie este cliente/pessoa</p>
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
                             <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 md:grid-cols-8 h-auto border-2 border-primary/20 shadow-lg shadow-primary/10">
                                <TabsTrigger value="contato" className={cn("flex-col h-auto gap-1.5 py-2", activeTabClasses)}><UserRound className="w-5 h-5"/>Contato</TabsTrigger>
                                <TabsTrigger value="documentos" className={cn("flex-col h-auto gap-1.5 py-2", activeTabClasses)}><BookUser className="w-5 h-5"/>Documentos</TabsTrigger>
                                <TabsTrigger value="informacoes" className={cn("flex-col h-auto gap-1.5 py-2", activeTabClasses)}><Briefcase className="w-5 h-5"/>Informações</TabsTrigger>
                                <TabsTrigger value="endereco" className={cn("flex-col h-auto gap-1.5 py-2", activeTabClasses)}><Home className="w-5 h-5"/>Endereço</TabsTrigger>
                                <TabsTrigger value="familia" className={cn("flex-col h-auto gap-1.5 py-2", activeTabClasses)}><Users className="w-5 h-5"/>Família</TabsTrigger>
                                <TabsTrigger value="cotacoes" className={cn("flex-col h-auto gap-1.5 py-2", activeTabClasses)}><FileTextIcon className="w-5 h-5"/>Cotações</TabsTrigger>
                                <TabsTrigger value="anexos" className={cn("flex-col h-auto gap-1.5 py-2", activeTabClasses)}><FileArchive className="w-5 h-5"/>Anexos</TabsTrigger>
                                <TabsTrigger value="observacao" className={cn("flex-col h-auto gap-1.5 py-2", activeTabClasses)}><Milestone className="w-5 h-5"/>Observação</TabsTrigger>
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
                                        <Input id="doc-cpf" value={cpfCnpj} onChange={handleCpfCnpjChange} maxLength={18} />
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
                                        <Select name="info-profession" id="info-profession-select">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {/* Add profession options here */}
                                                <SelectItem value="developer">Desenvolvedor</SelectItem>
                                                <SelectItem value="designer">Designer</SelectItem>
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
                                            <Select value={address.pais} onValueChange={(v) => handleAddressChange({ target: { id: 'addr-pais', value: v } } as any)}>
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
                            <TabsContent value="cotacoes" className="pt-4">
                                <p className="text-muted-foreground text-center p-8">Não há nenhuma cotação vinculada a esta pessoa.</p>
                            </TabsContent>
                            <TabsContent value="anexos" className="pt-4">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between py-3">
                                        <CardTitle className="text-base">Anexos</CardTitle>
                                        <Button size="sm" type="button" onClick={() => setIsAttachmentDialogOpen(true)}>Incluir</Button>
                                    </CardHeader>
                                    <CardContent>
                                        {attachments.length > 0 ? (
                                            <ul className="space-y-3">
                                                {attachments.map(att => (
                                                    <li key={att.id} className="flex items-center justify-between p-2 rounded-md border bg-muted/50">
                                                        <div className="flex items-center gap-3">
                                                            <Paperclip className="h-5 w-5 text-muted-foreground" />
                                                            <div>
                                                                <p className="text-sm font-medium text-foreground">{att.fileName}</p>
                                                                <p className="text-xs text-muted-foreground">{att.description}</p>
                                                            </div>
                                                        </div>
                                                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" type="button" onClick={() => handleDeleteAttachment(att.id)}>
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <div className="text-center py-8 border-dashed border-2 rounded-md">
                                                <p className="text-muted-foreground">Nenhum anexo incluído.</p>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="observacao" className="pt-4">
                            <Textarea placeholder="Observações sobre esta pessoa..." />
                            </TabsContent>
                        </Tabs>
                    </div>
                    </form>
                    <DialogFooter>
                        <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>Cancelar</Button>
                        <Button type="button" onClick={handleSavePerson}>Salvar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <AttachmentDialog open={isAttachmentDialogOpen} onOpenChange={setIsAttachmentDialogOpen} onSave={handleSaveAttachment} />
        </>
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
    const getFlagUrl = (countryCode: string) => `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;

    let countryCode = 'BR'; // Default
    if (phone.startsWith('+351')) countryCode = 'PT';
    else if (phone.startsWith('+1')) countryCode = 'US';
    // Add more mappings as needed

    return (
        <div className="flex items-center gap-2">
            <Image src={getFlagUrl(countryCode)} alt="Bandeira" width={16} height={12} />
            <span>{phone}</span>
        </div>
    );
};

const ViewPersonDialog = ({ open, onOpenChange, person }: { open: boolean, onOpenChange: (open: boolean) => void, person: Person | null }) => {
    if (!person) return null;

    const InfoItem = ({ label, value, hasCopy = false }: { label: string, value: string | undefined, hasCopy?: boolean }) => {
        if (!value) return null;
        return (
            <div className="flex flex-col">
                <p className="text-xs text-muted-foreground">{label}</p>
                <div className="flex items-center gap-1">
                    <p className="font-medium text-foreground">{value}</p>
                    {hasCopy && <Copy className="h-3 w-3 text-muted-foreground cursor-pointer hover:text-primary" />}
                </div>
            </div>
        );
    }
    
    const formatDate = (dateString?: string) => {
        if (!dateString) return '';
        try {
            return format(parse(dateString, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy');
        } catch {
            return dateString;
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-4xl">
                <DialogHeader className="flex-row items-center justify-between pr-8">
                     <div className="flex items-center gap-3">
                        <UserRound className="h-6 w-6 text-primary" />
                        <DialogTitle className="text-xl font-bold text-foreground">{person.name}</DialogTitle>
                         <Copy className="h-4 w-4 text-muted-foreground cursor-pointer" />
                    </div>
                     <button onClick={() => onOpenChange(false)} className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Fechar</span>
                    </button>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <div className="grid grid-cols-2 gap-y-4">
                        <InfoItem label="Telefone" value={person.phone} />
                        <InfoItem label="E-mail" value={person.email} />
                    </div>
                     <Separator />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4">
                        <InfoItem label="Sexo" value={person.sexo} />
                        <InfoItem label="Nascimento" value={formatDate(person.nascimento)} hasCopy />
                        <InfoItem label="Tipo" value={person.types.join(', ')} />
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4">
                        <InfoItem label="CPF/CNPJ" value={person.cpfCnpj} />
                        <InfoItem label="RG" value={person.rg} />
                        <InfoItem label="Órgão Emissor RG" value={person.orgaoEmissor} />
                        <InfoItem label="ID Estrangeiro" value={person.id_estrangeiro} />
                        <InfoItem label="Nacionalidade" value={person.nacionalidade} />
                        <InfoItem label="Estado Civil" value={person.estadoCivil} />
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4">
                        <InfoItem label="Passaporte" value={person.passaporte} hasCopy/>
                        <InfoItem label="Emissão Passaporte" value={formatDate(person.emissaoPassaporte)} />
                        <InfoItem label="Vencimento Passaporte" value={formatDate(person.vencimentoPassaporte)} />
                        <InfoItem label="Nacionalidade do Passaporte" value={person.nacionalidadePassaporte} />
                        <InfoItem label="Visto" value={person.visto} />
                        <InfoItem label="Validade do Visto" value={formatDate(person.validadeVisto)} />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Fechar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default function PessoasPage() {
    const [people, setPeople] = useState(mockPeopleData);
    const [isNewPersonDialogOpen, setIsNewPersonDialogOpen] = useState(false);
    const [personToEdit, setPersonToEdit] = useState<Person | null>(null);
    const [isViewPersonDialogOpen, setIsViewPersonDialogOpen] = useState(false);
    const [personToView, setPersonToView] = useState<Person | null>(null);

    const handleNewPerson = () => {
        setPersonToEdit(null);
        setIsNewPersonDialogOpen(true);
    }

    const handleEditPerson = (person: Person) => {
        setPersonToEdit(person);
        setIsNewPersonDialogOpen(true);
    }

    const handleViewPerson = (person: Person) => {
        setPersonToView(person);
        setIsViewPersonDialogOpen(true);
    }

    const handleDeletePerson = (personId: number) => {
        setPeople(prev => prev.filter(p => p.id !== personId));
    }
    
    const handleToggleActive = (personId: number) => {
        setPeople(prev => 
            prev.map(p => 
                p.id === personId ? { ...p, active: !p.active } : p
            )
        );
    }

    const handleSavePerson = (personData: Person) => {
        setPeople(prev => {
            const exists = prev.some(p => p.id === personData.id);
            if (exists) {
                // Update existing person
                return prev.map(p => p.id === personData.id ? personData : p);
            } else {
                // Add new person
                return [{...personData, id: Date.now()}, ...prev];
            }
        });
    }

    return (
        <>
            <div className="space-y-6">
                <header className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-primary">Pessoas</h1>
                    <Button onClick={handleNewPerson}>Novo</Button>
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
                                    {people.map((person) => (
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
                                                <Switch checked={person.active} onCheckedChange={() => handleToggleActive(person.id)} />
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button variant="ghost" size="icon" onClick={() => handleViewPerson(person)}>
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={() => handleEditPerson(person)}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                                              <Trash2 className="h-4 w-4" />
                                                          </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Essa ação não pode ser desfeita. Isso excluirá permanentemente os dados da pessoa de nossos servidores.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => handleDeletePerson(person.id)}>Continuar</AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
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
            <NewPersonDialog 
                open={isNewPersonDialogOpen} 
                onOpenChange={setIsNewPersonDialogOpen}
                personToEdit={personToEdit}
                onSave={handleSavePerson}
            />
             <ViewPersonDialog 
                open={isViewPersonDialogOpen} 
                onOpenChange={setIsViewPersonDialogOpen}
                person={personToView}
            />
        </>
    );
}
    


