
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { PaymentMethod } from '@/lib/types';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

export default function FormaPagamentoPage() {
    const [methods, setMethods] = useState<PaymentMethod[]>([]);
    const router = useRouter();

    useEffect(() => {
        const storedMethods = localStorage.getItem('paymentMethods');
        if (storedMethods) {
            setMethods(JSON.parse(storedMethods));
        }
    }, []);

    const handleDelete = (methodId: string) => {
        const updatedMethods = methods.filter(method => method.id !== methodId);
        setMethods(updatedMethods);
        localStorage.setItem('paymentMethods', JSON.stringify(updatedMethods));
    };

    const handleEdit = (methodId: string) => {
        router.push(`/forma-pagamento/novo?id=${methodId}`);
    };

    const handleToggleActive = (id: string) => {
        const updatedMethods = methods.map(method =>
            method.id === id ? { ...method, isActive: !method.isActive } : method
        );
        setMethods(updatedMethods);
        localStorage.setItem('paymentMethods', JSON.stringify(updatedMethods));
    };

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-primary">Forma de Pagamento</h1>
                <Button asChild>
                    <Link href="/forma-pagamento/novo">Novo</Link>
                </Button>
            </header>

            <Card>
                <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr,auto] gap-4 items-end">
                        <div className="space-y-2">
                            <Label htmlFor="nome">Nome</Label>
                            <Input id="nome" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="situacao">Situação</Label>
                            <Select defaultValue="ativo">
                                <SelectTrigger id="situacao">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ativo">Ativo</SelectItem>
                                    <SelectItem value="inativo">Inativo</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
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
                                    <TableHead className="w-[50%]">Nome</TableHead>
                                    <TableHead>Parcelas</TableHead>
                                    <TableHead>Ativo</TableHead>
                                    <TableHead className="w-[100px] text-right">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {methods.length > 0 ? (
                                    methods.map((method) => (
                                        <TableRow key={method.id}>
                                            <TableCell className="font-medium">{method.nome}</TableCell>
                                            <TableCell>{method.numeroParcelas}</TableCell>
                                            <TableCell>
                                                <Switch
                                                    checked={method.isActive}
                                                    onCheckedChange={() => handleToggleActive(method.id)}
                                                />
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(method.id)}>
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
                                                                    Esta ação não pode ser desfeita. Isso excluirá permanentemente a forma de pagamento.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => handleDelete(method.id)}>Continuar</AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-24 text-center">
                                            Não há formas de pagamento cadastradas.
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
