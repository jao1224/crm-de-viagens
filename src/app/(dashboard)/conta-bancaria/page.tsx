
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { BankAccount } from '@/lib/types';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

export default function ContaBancariaPage() {
    const [accounts, setAccounts] = useState<BankAccount[]>([]);
    const router = useRouter();

    useEffect(() => {
        const storedAccounts = localStorage.getItem('bankAccounts');
        if (storedAccounts) {
            setAccounts(JSON.parse(storedAccounts));
        }
    }, []);

    const handleDelete = (accountId: string) => {
        const updatedAccounts = accounts.filter(acc => acc.id !== accountId);
        setAccounts(updatedAccounts);
        localStorage.setItem('bankAccounts', JSON.stringify(updatedAccounts));
    };

    const handleEdit = (accountId: string) => {
        router.push(`/conta-bancaria/novo?id=${accountId}`);
    };

    const handleToggleActive = (id: string) => {
        const updatedAccounts = accounts.map(account =>
            account.id === id ? { ...account, isActive: !account.isActive } : account
        );
        setAccounts(updatedAccounts);
        localStorage.setItem('bankAccounts', JSON.stringify(updatedAccounts));
    };

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-primary">Contas</h1>
                <Button asChild>
                    <Link href="/conta-bancaria/novo">Novo</Link>
                </Button>
            </header>

            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[50%]">Nome</TableHead>
                                    <TableHead>Agência</TableHead>
                                    <TableHead>Nº. Conta</TableHead>
                                    <TableHead>Ativo</TableHead>
                                    <TableHead className="w-[100px] text-right">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {accounts.length > 0 ? (
                                    accounts.map((account) => (
                                        <TableRow key={account.id}>
                                            <TableCell className="font-medium">{account.name}</TableCell>
                                            <TableCell>{account.agency}</TableCell>
                                            <TableCell>{account.accountNumber}</TableCell>
                                            <TableCell>
                                                <Switch
                                                    checked={account.isActive}
                                                    onCheckedChange={() => handleToggleActive(account.id)}
                                                />
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(account.id)}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive h-8 w-8">
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Esta ação não pode ser desfeita. Isso excluirá permanentemente a conta.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => handleDelete(account.id)}>Continuar</AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-24 text-center">
                                            Não há contas cadastradas.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
