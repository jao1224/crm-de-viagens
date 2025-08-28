
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';

const mockProducts = [
    { id: '1', name: '2 VISTO PROC. TRABALHO', value: 800.00, isActive: true },
    { id: '2', name: '2 VISTOS PROC. PREMIUM', value: 600.00, isActive: true },
    { id: '3', name: 'DOCUMENTAÇÃO', value: 0.00, isActive: true },
    { id: '4', name: 'HOSPEDAGEM', value: 270.00, isActive: true },
    { id: '5', name: 'RELOCATION ENTRADA 50%', value: 1.00, isActive: true },
    { id: '6', name: 'RELOCATION FINALIZAÇÃO 50%', value: 1.00, isActive: true },
    { id: '7', name: 'VISTO AMERICANO', value: 397.00, isActive: true },
    { id: '8', name: 'VISTO PROC. PREMIUM', value: 400.00, isActive: true },
    { id: '9', name: 'VISTO PROC. TRABALHO', value: 400.00, isActive: true },
    { id: '10', name: 'VOLTA COMBINADA', value: 250.00, isActive: true },
];

export default function ProdutoServicoPage() {
    const [products, setProducts] = useState(mockProducts);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };
    
    const handleToggleActive = (id: string) => {
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === id ? { ...product, isActive: !product.isActive } : product
            )
        );
    };

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-primary">Produtos/Serviços</h1>
                <Button asChild>
                    <Link href="#">Novo</Link>
                </Button>
            </header>

            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[60%]">Nome</TableHead>
                                    <TableHead>Valor</TableHead>
                                    <TableHead>Ativo</TableHead>
                                    <TableHead className="w-[100px] text-right">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell className="font-medium">{product.name}</TableCell>
                                        <TableCell>{formatCurrency(product.value)}</TableCell>
                                        <TableCell>
                                            <Switch
                                                checked={product.isActive}
                                                onCheckedChange={() => handleToggleActive(product.id)}
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
