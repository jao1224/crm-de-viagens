'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Info, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useRouter, useSearchParams } from 'next/navigation';
import type { CreditCard } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

const DayInput = ({ label, tooltipText, ...props }: { label: string, tooltipText: string } & React.InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <div className="space-y-2">
            <Label htmlFor={label.toLowerCase()} className="flex items-center gap-1.5">
                {label}
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Info className="h-3 w-3 text-muted-foreground cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{tooltipText}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </Label>
            <div className="relative">
                <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id={label.toLowerCase()} type="number" placeholder="00" className="pl-8" {...props}/>
            </div>
        </div>
    );
}

const CurrencyInput = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <div className="space-y-2">
            <Label htmlFor={label.toLowerCase()}>{label}</Label>
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">R$</span>
                <Input id={label.toLowerCase()} defaultValue="0,00" className="pl-9" {...props}/>
            </div>
        </div>
    );
}


export default function NovoCartaoPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const cardId = searchParams.get('id');
    
    const [descricao, setDescricao] = useState('');
    const [ultimosDigitos, setUltimosDigitos] = useState('');
    const [fechamento, setFechamento] = useState('');
    const [vencimento, setVencimento] = useState('');
    const [limite, setLimite] = useState('0,00');
    const [anuidade, setAnuidade] = useState('0,00');
    const [observacao, setObservacao] = useState('');
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if (cardId) {
            const storedCards = JSON.parse(localStorage.getItem('creditCards') || '[]') as CreditCard[];
            const cardToEdit = storedCards.find(card => card.id === cardId);
            if (cardToEdit) {
                setDescricao(cardToEdit.descricao);
                setUltimosDigitos(cardToEdit.ultimosDigitos);
                setFechamento(cardToEdit.fechamento);
                setVencimento(cardToEdit.vencimento);
                setLimite(cardToEdit.limite);
                setAnuidade(cardToEdit.anuidade);
                setObservacao(cardToEdit.observacao);
                setIsActive(cardToEdit.isActive);
            }
        }
    }, [cardId]);

    const handleSave = () => {
        if (!descricao) {
            toast({
                title: "Erro de Validação",
                description: "O campo 'Descrição' é obrigatório.",
                variant: "destructive",
            });
            return;
        }

        const storedCards = JSON.parse(localStorage.getItem('creditCards') || '[]') as CreditCard[];
        
        const newCard: CreditCard = {
            id: cardId || Date.now().toString(),
            descricao,
            ultimosDigitos,
            fechamento,
            vencimento,
            limite,
            anuidade,
            observacao,
            isActive
        };

        let updatedCards: CreditCard[];
        if (cardId) {
            updatedCards = storedCards.map(card => card.id === cardId ? newCard : card);
        } else {
            updatedCards = [...storedCards, newCard];
        }

        localStorage.setItem('creditCards', JSON.stringify(updatedCards));
        toast({
            title: "Sucesso!",
            description: `Cartão ${cardId ? 'atualizado' : 'salvo'} com sucesso.`,
        });
        router.push('/cartao');
    };


    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <header>
                <h1 className="text-3xl font-bold text-primary">{cardId ? 'Editar Cartão' : 'Cadastro de Cartão'}</h1>
            </header>

            <Card>
                <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="descricao">Descrição <span className="text-destructive">*</span></Label>
                        <Input id="descricao" value={descricao} onChange={e => setDescricao(e.target.value)} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-end">
                        <div className="space-y-2">
                            <Label htmlFor="ultimos-digitos">Últimos 4 dígitos</Label>
                            <Input id="ultimos-digitos" placeholder="0000" value={ultimosDigitos} onChange={e => setUltimosDigitos(e.target.value)} />
                        </div>
                        <DayInput label="Fechamento" tooltipText="Melhor dia para compra" value={fechamento} onChange={e => setFechamento(e.target.value)} />
                        <DayInput label="Vencimento" tooltipText="Dia do vencimento da fatura" value={vencimento} onChange={e => setVencimento(e.target.value)} />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <CurrencyInput label="Limite" value={limite} onChange={e => setLimite(e.target.value)} />
                        <CurrencyInput label="Anuidade" value={anuidade} onChange={e => setAnuidade(e.target.value)} />
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="observacao">Observação</Label>
                        <Input id="observacao" value={observacao} onChange={e => setObservacao(e.target.value)} />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <Switch id="ativo" checked={isActive} onCheckedChange={setIsActive} />
                        <Label htmlFor="ativo">Ativo</Label>
                    </div>

                </CardContent>
            </Card>

             <div className="flex justify-start gap-2">
                <Button variant="outline" asChild>
                    <Link href="/cartao">Cancelar</Link>
                </Button>
                <Button onClick={handleSave}>Salvar</Button>
            </div>
        </div>
    );
}
