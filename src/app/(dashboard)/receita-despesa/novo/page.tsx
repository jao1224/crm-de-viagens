
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import type { RevenueExpenseCategory } from '@/lib/types';


export default function NovaCategoriaReceitaDespesaPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const categoryId = searchParams.get('id');

    const [type, setType] = useState<'receita' | 'despesa'>('receita');
    const [name, setName] = useState('');
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if (categoryId) {
            const storedCategories = JSON.parse(localStorage.getItem('revenueExpenseCategories') || '[]') as RevenueExpenseCategory[];
            const categoryToEdit = storedCategories.find(cat => cat.id === categoryId);
            if (categoryToEdit) {
                setType(categoryToEdit.type);
                setName(categoryToEdit.name);
                setIsActive(categoryToEdit.active);
            }
        }
    }, [categoryId]);

    const handleSave = () => {
        if (!name || !type) {
            toast({
                title: "Erro de Validação",
                description: "Os campos 'Tipo' e 'Nome' são obrigatórios.",
                variant: "destructive",
            });
            return;
        }

        const storedCategories = JSON.parse(localStorage.getItem('revenueExpenseCategories') || '[]') as RevenueExpenseCategory[];

        const newCategory: RevenueExpenseCategory = {
            id: categoryId || Date.now().toString(),
            type,
            name,
            active: isActive,
        };

        let updatedCategories: RevenueExpenseCategory[];
        if (categoryId) {
            updatedCategories = storedCategories.map(cat => (cat.id === categoryId ? newCategory : cat));
        } else {
            updatedCategories = [...storedCategories, newCategory];
        }

        localStorage.setItem('revenueExpenseCategories', JSON.stringify(updatedCategories));
        toast({
            title: "Sucesso!",
            description: `Categoria ${categoryId ? 'atualizada' : 'salva'} com sucesso.`,
        });
        router.push('/receita-despesa-cadastro');
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <header>
                <h1 className="text-3xl font-bold text-primary">{categoryId ? 'Editar' : 'Cadastro de'} Categoria de Receita/Despesa</h1>
            </header>

            <Card>
                <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="tipo">Tipo <span className="text-destructive">*</span></Label>
                            <Select value={type} onValueChange={(value) => setType(value as 'receita' | 'despesa')}>
                                <SelectTrigger id="tipo">
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="receita">Receita</SelectItem>
                                    <SelectItem value="despesa">Despesa</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="nome">Nome <span className="text-destructive">*</span></Label>
                            <Input id="nome" value={name} onChange={e => setName(e.target.value)} />
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
                    <Link href="/receita-despesa-cadastro">Cancelar</Link>
                </Button>
                <Button onClick={handleSave}>Salvar</Button>
            </div>
        </div>
    );
}
