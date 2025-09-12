
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon, UserPlus, Plus, Paperclip } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { mockPeople } from '@/lib/mock-data';
import type { Person } from '@/lib/types';


const DatePicker = ({ date, setDate, placeholder }: { date?: Date, setDate: (date?: Date) => void, placeholder: string }) => {
    return (
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
                    {date ? format(date, "dd/MM/yyyy") : <span>{placeholder}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
};

const NewPersonDialog = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => {
    // This is a simplified version for demonstration.
    // In a real app, this would be a more complex form.
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Cadastrar Nova Pessoa</DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="new-person-name">Nome</Label>
                        <Input id="new-person-name" placeholder="Nome completo" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="new-person-email">Email</Label>
                        <Input id="new-person-email" type="email" placeholder="email@exemplo.com" />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                    <Button onClick={() => onOpenChange(false)}>Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const NovaReceitaDialog = ({ open, onOpenChange, people, onNewPersonClick }: { open: boolean, onOpenChange: (open: boolean) => void, people: Person[], onNewPersonClick: () => void }) => {
    const [lancamentoDate, setLancamentoDate] = useState<Date | undefined>(new Date(2025, 8, 12));
    const [vencimentoDate, setVencimentoDate] = useState<Date | undefined>(new Date(2025, 8, 12));
    const [pagamentoDate, setPagamentoDate] = useState<Date | undefined>();
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFileName(event.target.files[0].name);
        } else {
            setFileName(null);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-4xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-foreground">Cadastro de Receita</DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-6 max-h-[80vh] overflow-y-auto pr-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="pessoa">Pessoa <span className="text-destructive">*</span></Label>
                            <div className="flex items-center gap-2">
                                <Select>
                                    <SelectTrigger id="pessoa">
                                        <SelectValue placeholder="Selecione" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {people.map(person => (
                                            <SelectItem key={person.id} value={person.id}>{person.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Button size="icon" variant="outline" onClick={onNewPersonClick}><UserPlus className="h-4 w-4" /></Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="conta">Conta <span className="text-destructive">*</span></Label>
                            <Select>
                                <SelectTrigger id="conta">
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                    {/* Options */}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="categoria">Categoria <span className="text-destructive">*</span></Label>
                             <div className="flex items-center gap-2">
                                <Select>
                                    <SelectTrigger id="categoria">
                                        <SelectValue placeholder="Selecione" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {/* Options */}
                                    </SelectContent>
                                </Select>
                                <Button size="icon" variant="outline"><Plus className="h-4 w-4" /></Button>
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="descricao">Descrição <span className="text-destructive">*</span></Label>
                            <Input id="descricao" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="lancamento">Lançamento <span className="text-destructive">*</span></Label>
                            <DatePicker date={lancamentoDate} setDate={setLancamentoDate} placeholder="dd/mm/aaaa" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="vencimento">Vencimento <span className="text-destructive">*</span></Label>
                            <DatePicker date={vencimentoDate} setDate={setVencimentoDate} placeholder="dd/mm/aaaa" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="pagamento">Pagamento</Label>
                            <DatePicker date={pagamentoDate} setDate={setPagamentoDate} placeholder="dd/mm/aaaa" />
                        </div>
                    </div>

                    <div className="rounded-md border">
                        <div className="bg-primary text-primary-foreground font-semibold p-3 rounded-t-md">
                            Recebimento
                        </div>
                        <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                            <div className="space-y-2">
                                <Label htmlFor="recebimento-lancamento">Lançamento <span className="text-destructive">*</span></Label>
                                <Select defaultValue="normal">
                                    <SelectTrigger id="recebimento-lancamento">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="normal">Normal</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="valor">Valor <span className="text-destructive">*</span></Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">R$</span>
                                    <Input id="valor" className="pl-9" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="forma-pagamento">Forma de Pagamento <span className="text-destructive">*</span></Label>
                                <Select>
                                    <SelectTrigger id="forma-pagamento">
                                        <SelectValue placeholder="Selecione" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {/* Options */}
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="parcelas">Parcelas <span className="text-destructive">*</span></Label>
                                <Input id="parcelas" type="number" defaultValue={1} />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="observacao">Observação</Label>
                        <Textarea id="observacao" rows={3} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="anexo">Anexo</Label>
                        <div className="flex items-center gap-2">
                            <Input id="anexo" type="file" className="hidden" onChange={handleFileChange} />
                            <Button asChild variant="outline">
                                <label htmlFor="anexo" className="cursor-pointer">Escolher arquivo</label>
                            </Button>
                            <span className="text-sm text-muted-foreground truncate" title={fileName ?? undefined}>
                                {fileName ?? 'Nenhum arquivo escolhido'}
                            </span>
                        </div>
                        <p className="text-xs text-muted-foreground">Imagens, PDF e arquivos de textos de até 5MB</p>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                    <Button>Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default function ReceitasPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNewPersonDialogOpen, setIsNewPersonDialogOpen] = useState(false);
    const [people, setPeople] = useState<Person[]>([]);

    useEffect(() => {
        setPeople(mockPeople);
    }, []);

    return (
        <>
            <div className="space-y-6">
                <header className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-primary">Receitas</h1>
                    <Button onClick={() => setIsModalOpen(true)}>Nova Receita</Button>
                </header>
                <Card>
                    <CardContent className="h-96 flex items-center justify-center">
                        <p className="text-muted-foreground">Nenhuma receita encontrada.</p>
                    </CardContent>
                </Card>
            </div>
            <NovaReceitaDialog 
                open={isModalOpen} 
                onOpenChange={setIsModalOpen} 
                people={people}
                onNewPersonClick={() => setIsNewPersonDialogOpen(true)}
            />
            <NewPersonDialog 
                open={isNewPersonDialogOpen}
                onOpenChange={setIsNewPersonDialogOpen}
            />
        </>
    );
}
