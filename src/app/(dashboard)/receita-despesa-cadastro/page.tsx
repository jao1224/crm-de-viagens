
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';


const mockCategories = [
    { id: 1, type: 'receita', name: '2 VISTOS PROC. TRABALHO', active: true },
    { id: 2, type: 'receita', name: 'documentações', active: true },
    { id: 3, type: 'receita', name: 'Hospedagem', active: true },
    { id: 4, type: 'receita', name: 'passagem', active: true },
    { id: 5, type: 'receita', name: 'SEGURO VIAGEM', active: true },
    { id: 6, type: 'receita', name: 'Venda de Passagem', active: true },
    { id: 7, type: 'receita', name: 'VISTO AMERICANO', active: true },
    { id: 8, type: 'receita', name: 'VISTO PROC. TRABALHO', active: true },
    { id: 9, type: 'receita', name: 'VOLTA COMBINADA', active: true },
    { id: 10, type: 'despesa', name: 'Comissão de Venda', active: true },
    { id: 11, type: 'despesa', name: 'Pagamento Fornecedor', active: true },
    { id: 12, type: 'despesa', name: 'Salário', active: true },
];

export default function ReceitaDespesaCadastroPage() {
    const [categories, setCategories] = useState(mockCategories);

    const handleToggleActive = (id: number) => {
        setCategories(prev => prev.map(cat => cat.id === id ? { ...cat, active: !cat.active } : cat));
    };

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-primary">Categoria de Receita/Despesa</h1>
                <Button>Novo</Button>
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
                                {categories.map((category) => (
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
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

