'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { CreditCard } from '@/lib/types';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';


export default function CartaoPage() {
    const [cards, setCards] = useState<CreditCard[]>([]);
    const router = useRouter();

    useEffect(() => {
        const storedCards = localStorage.getItem('creditCards');
        if (storedCards) {
            setCards(JSON.parse(storedCards));
        }
    }, []);
    
    const handleDelete = (cardId: string) => {
        const updatedCards = cards.filter(card => card.id !== cardId);
        setCards(updatedCards);
        localStorage.setItem('creditCards', JSON.stringify(updatedCards));
    };

    const handleEdit = (cardId: string) => {
        router.push(`/cartao/novo?id=${cardId}`);
    };

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-primary">Cartões de Crédito</h1>
                <Button asChild>
                    <Link href="/cartao/novo">Novo</Link>
                </Button>
            </header>

            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[50%]">Descrição</TableHead>
                                    <TableHead>Últimos 4 dígitos</TableHead>
                                    <TableHead>Fechamento</TableHead>
                                    <TableHead>Vencimento</TableHead>
                                    <TableHead className="w-[100px] text-right">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cards.length > 0 ? (
                                    cards.map((card) => (
                                        <TableRow key={card.id}>
                                            <TableCell className="font-medium">{card.descricao}</TableCell>
                                            <TableCell>{card.ultimosDigitos}</TableCell>
                                            <TableCell>{card.fechamento}</TableCell>
                                            <TableCell>{card.vencimento}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(card.id)}>
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
                                                                    Esta ação não pode ser desfeita. Isso excluirá permanentemente o cartão.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => handleDelete(card.id)}>Continuar</AlertDialogAction>
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
                                            Não há cartões cadastrados.
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
