
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import type { PaymentMethod } from '@/lib/types';

const PercentageInput = ({ label, value, onChange }: { label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
    return (
        <div className="space-y-2">
            <Label htmlFor={label.toLowerCase()}>{label}</Label>
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
                <Input id={label.toLowerCase()} value={value} onChange={onChange} className="pl-8" />
            </div>
        </div>
    );
}

export default function NovaFormaPagamentoPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const paymentMethodId = searchParams.get('id');

    const [nome, setNome] = useState('');
    const [numeroParcelas, setNumeroParcelas] = useState(1);
    const [intervaloDias, setIntervaloDias] = useState(0);
    const [desconto, setDesconto] = useState('0,00');
    const [acrescimo, setAcrescimo] = useState('0,00');
    const [observacao, setObservacao] = useState('');
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if (paymentMethodId) {
            const storedMethods = JSON.parse(localStorage.getItem('paymentMethods') || '[]') as PaymentMethod[];
            const methodToEdit = storedMethods.find(method => method.id === paymentMethodId);
            if (methodToEdit) {
                setNome(methodToEdit.nome);
                setNumeroParcelas(methodToEdit.numeroParcelas);
                setIntervaloDias(methodToEdit.intervaloDias);
                setDesconto(methodToEdit.desconto);
                setAcrescimo(methodToEdit.acrescimo);
                setObservacao(methodToEdit.observacao);
                setIsActive(methodToEdit.isActive);
            }
        }
    }, [paymentMethodId]);

    const formatCurrency = (value: string) => {
        let v = value.replace(/\D/g, '');
        v = (parseInt(v) / 100).toFixed(2) + '';
        v = v.replace('.', ',');
        v = v.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        return v;
    }

    const handleSave = () => {
        if (!nome) {
            toast({
                title: "Erro de Validação",
                description: "O campo 'Nome' é obrigatório.",
                variant: "destructive",
            });
            return;
        }

        const storedMethods = JSON.parse(localStorage.getItem('paymentMethods') || '[]') as PaymentMethod[];
        
        const newMethod: PaymentMethod = {
            id: paymentMethodId || Date.now().toString(),
            nome,
            numeroParcelas,
            intervaloDias,
            desconto,
            acrescimo,
            observacao,
            isActive
        };

        let updatedMethods: PaymentMethod[];
        if (paymentMethodId) {
            updatedMethods = storedMethods.map(method => method.id === paymentMethodId ? newMethod : method);
        } else {
            updatedMethods = [...storedMethods, newMethod];
        }

        localStorage.setItem('paymentMethods', JSON.stringify(updatedMethods));
        toast({
            title: "Sucesso!",
            description: `Forma de pagamento ${paymentMethodId ? 'atualizada' : 'salva'} com sucesso.`,
        });
        router.push('/forma-pagamento');
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <header>
                <h1 className="text-3xl font-bold text-primary">{paymentMethodId ? 'Editar' : 'Nova'} Forma de Pagamento</h1>
            </header>

            <Card>
                <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="nome">Nome <span className="text-destructive">*</span></Label>
                        <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-end">
                        <div className="space-y-2">
                            <Label htmlFor="numero-parcelas">Número de parcelas <span className="text-destructive">*</span></Label>
                            <Input id="numero-parcelas" type="number" value={numeroParcelas} onChange={(e) => setNumeroParcelas(Number(e.target.value))} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="intervalo-dias">Intervalo de dias</Label>
                            <Input id="intervalo-dias" type="number" value={intervaloDias} onChange={(e) => setIntervaloDias(Number(e.target.value))} />
                        </div>
                        <PercentageInput label="Desconto" value={desconto} onChange={e => setDesconto(e.target.value)} />
                        <PercentageInput label="Acréscimo" value={acrescimo} onChange={e => setAcrescimo(e.target.value)} />
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="observacao">Observação</Label>
                        <Textarea id="observacao" rows={4} value={observacao} onChange={(e) => setObservacao(e.target.value)} />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <Switch id="ativo" checked={isActive} onCheckedChange={setIsActive} />
                        <Label htmlFor="ativo">Ativo</Label>
                    </div>
                </CardContent>
            </Card>

             <div className="flex justify-start gap-2">
                <Button variant="outline" asChild>
                    <Link href="/forma-pagamento">Cancelar</Link>
                </Button>
                <Button onClick={handleSave}>Salvar</Button>
            </div>
        </div>
    );
}
