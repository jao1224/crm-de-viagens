
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { RevenueExpenseCategory } from '@/lib/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

export default function ReceitaDespesaCadastroPage() {
    const [categories, setCategories] = useState<RevenueExpenseCategory[]>([]);
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        const storedCategoriesRaw = localStorage.getItem('revenueExpenseCategories');
        if (storedCategoriesRaw) {
            try {
                setCategories(JSON.parse(storedCategoriesRaw));
            } catch (e) {
                console.error("Error parsing categories from localStorage", e);
                setCategories([]);
            }
        }
    }, []);

    const handleToggleActive = (id: string) => {
        const updatedCategories = categories.map(cat => 
            cat.id === id ? { ...cat, active: !cat.active } : cat
        );
        setCategories(updatedCategories);
        localStorage.setItem('revenueExpenseCategories', JSON.stringify(updatedCategories));
    };

    const handleEdit = (id: string) => {
        router.push(`/receita-despesa/novo?id=${id}`);
    };

    const handleDelete = (id: string) => {
        const updatedCategories = categories.filter(cat => cat.id !== id);
        setCategories(updatedCategories);
        localStorage.setItem('revenueExpenseCategories', JSON.stringify(updatedCategories));
        toast({
            title: "Sucesso!",
            description: "Categoria excluída com sucesso."
        });
    };

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-primary">Categoria de Receita/Despesa</h1>
                <Button asChild>
                    <Link href="/receita-despesa/novo">Novo</Link>
                </Button>
            </header>

            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[120px]">Tipo</TableHead>
                                    <TableHead>Nome</TableHead>
                                    <TableHead className="w-[100px]">Ativo</TableHead>
                                    <TableHead className="w-[100px] text-right">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categories.length > 0 ? categories.map((category) => (
                                    <TableRow key={category.id}>
                                        <TableCell>
                                            <Badge
                                                className={cn(
                                                    category.type === 'receita' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'
                                                )}
                                            >
                                                {category.type === 'receita' ? 'Receita' : 'Despesa'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="font-medium">{category.name}</TableCell>
                                        <TableCell>
                                            <Switch
                                                checked={category.active}
                                                onCheckedChange={() => handleToggleActive(category.id)}
                                            />
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(category.id)}>
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
                                                                Esta ação não pode ser desfeita. Isso excluirá permanentemente a categoria.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDelete(category.id)}>Continuar</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-24 text-center">
                                            Não há categorias cadastradas.
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
