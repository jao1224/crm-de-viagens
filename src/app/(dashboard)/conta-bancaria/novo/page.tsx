
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import type { BankAccount } from '@/lib/types';

export default function NovaContaBancariaPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const accountId = searchParams.get('id');

    const [nome, setNome] = useState('');
    const [agencia, setAgencia] = useState('');
    const [conta, setConta] = useState('');
    const [saldoInicial, setSaldoInicial] = useState('0,00');
    const [dataSaldo, setDataSaldo] = useState<Date | undefined>(new Date());
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if (accountId) {
            const storedAccounts = JSON.parse(localStorage.getItem('bankAccounts') || '[]') as BankAccount[];
            const accountToEdit = storedAccounts.find(acc => acc.id === accountId);
            if (accountToEdit) {
                setNome(accountToEdit.name);
                setAgencia(accountToEdit.agency);
                setConta(accountToEdit.accountNumber);
                setSaldoInicial(accountToEdit.initialBalance);
                setDataSaldo(new Date(accountToEdit.balanceDate));
                setIsActive(accountToEdit.isActive);
            }
        }
    }, [accountId]);
    
    const handleSaldoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        value = value.replace(/\D/g, ''); // Remove todos os não-dígitos
        value = value.replace(/(\d)(\d{2})$/, '$1,$2'); // Adiciona vírgula antes dos últimos 2 dígitos
        value = value.replace(/(?=(\d{3})+(\D))\B/g, '.'); // Adiciona ponto como separador de milhar
        setSaldoInicial(value);
    };

    const handleSave = () => {
        if (!nome) {
            toast({
                title: "Erro de Validação",
                description: "O campo 'Nome' é obrigatório.",
                variant: "destructive",
            });
            return;
        }

        const storedAccounts = JSON.parse(localStorage.getItem('bankAccounts') || '[]') as BankAccount[];
        
        const newAccount: BankAccount = {
            id: accountId || Date.now().toString(),
            name: nome,
            agency: agencia,
            accountNumber: conta,
            initialBalance: saldoInicial,
            balanceDate: dataSaldo ? dataSaldo.toISOString() : new Date().toISOString(),
            isActive
        };

        let updatedAccounts: BankAccount[];
        if (accountId) {
            updatedAccounts = storedAccounts.map(acc => acc.id === accountId ? newAccount : acc);
        } else {
            updatedAccounts = [...storedAccounts, newAccount];
        }

        localStorage.setItem('bankAccounts', JSON.stringify(updatedAccounts));
        toast({
            title: "Sucesso!",
            description: `Conta ${accountId ? 'atualizada' : 'salva'} com sucesso.`,
        });
        router.push('/conta-bancaria');
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <header>
                <h1 className="text-3xl font-bold text-primary">{accountId ? 'Editar Conta' : 'Cadastro de Conta'}</h1>
            </header>

            <Card>
                <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-end">
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="nome">Nome <span className="text-destructive">*</span></Label>
                            <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="agencia">Agência</Label>
                            <Input id="agencia" value={agencia} onChange={(e) => setAgencia(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="conta">Nº. Conta</Label>
                            <Input id="conta" value={conta} onChange={(e) => setConta(e.target.value)} />
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                        <div className="space-y-2">
                            <Label htmlFor="saldo">Saldo Inicial <span className="text-destructive">*</span></Label>
                             <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">R$</span>
                                <Input id="saldo" value={saldoInicial} onChange={handleSaldoChange} className="pl-9" />
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="data-saldo">Data Saldo <span className="text-destructive">*</span></Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !dataSaldo && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {dataSaldo ? format(dataSaldo, "dd/MM/yyyy") : <span>Escolha uma data</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={dataSaldo}
                                        onSelect={setDataSaldo}
                                        initialFocus
                                        locale={ptBR}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                     <div className="flex items-center space-x-2">
                        <Switch id="ativo" checked={isActive} onCheckedChange={setIsActive} />
                        <Label htmlFor="ativo">Ativo</Label>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-start gap-2">
                <Button variant="outline" asChild>
                    <Link href="/conta-bancaria">Cancelar</Link>
                </Button>
                <Button onClick={handleSave}>Salvar</Button>
            </div>
        </div>
    );
}
