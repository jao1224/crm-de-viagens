'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2 } from 'lucide-react';

// Mock data based on the image
const initialAccounts = [
  {
    id: 1,
    name: 'Banco Itau PJ - Matriz',
    agency: '5854',
    accountNumber: '99660-9',
    isActive: true,
  },
  {
    id: 2,
    name: 'Principal',
    agency: '',
    accountNumber: '',
    isActive: true,
  },
];

export default function ContaBancariaPage() {
    const [accounts, setAccounts] = useState(initialAccounts);

    const handleToggleActive = (id: number) => {
        setAccounts(prevAccounts => 
            prevAccounts.map(account => 
                account.id === id ? { ...account, isActive: !account.isActive } : account
            )
        );
    };

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-primary">Contas</h1>
                <Button>Novo</Button>
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
                                {accounts.map((account) => (
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
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive h-8 w-8">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {/* Empty row for new entry */}
                                 <TableRow>
                                    <TableCell colSpan={5} className="p-2 h-10"></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
