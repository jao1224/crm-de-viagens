
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import type { ProductService } from '@/lib/types';


export default function NovoProdutoServicoPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const productId = searchParams.get('id');

    const [name, setName] = useState('');
    const [value, setValue] = useState('0,00');
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if (productId) {
            const storedProducts = JSON.parse(localStorage.getItem('productServices') || '[]') as ProductService[];
            const productToEdit = storedProducts.find(p => p.id === productId);
            if (productToEdit) {
                setName(productToEdit.name);
                setValue(productToEdit.value);
                setIsActive(productToEdit.isActive);
            }
        }
    }, [productId]);
    
    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value;
        inputValue = inputValue.replace(/\D/g, ''); // Remove todos os não-dígitos
        inputValue = inputValue.replace(/(\d)(\d{2})$/, '$1,$2'); // Adiciona vírgula antes dos últimos 2 dígitos
        inputValue = inputValue.replace(/(?=(\d{3})+(\D))\B/g, '.'); // Adiciona ponto como separador de milhar
        setValue(inputValue);
    };

    const handleSave = () => {
        if (!name) {
            toast({
                title: "Erro de Validação",
                description: "O campo 'Nome' é obrigatório.",
                variant: "destructive",
            });
            return;
        }

        const storedProducts = JSON.parse(localStorage.getItem('productServices') || '[]') as ProductService[];

        const newProduct: ProductService = {
            id: productId || Date.now().toString(),
            name,
            value: value || '0,00',
            isActive,
        };

        let updatedProducts: ProductService[];
        if (productId) {
            updatedProducts = storedProducts.map(p => p.id === productId ? newProduct : p);
        } else {
            updatedProducts = [...storedProducts, newProduct];
        }

        localStorage.setItem('productServices', JSON.stringify(updatedProducts));
        toast({
            title: "Sucesso!",
            description: `Produto/Serviço ${productId ? 'atualizado' : 'salvo'} com sucesso.`,
        });
        router.push('/produto-servico');
    };


    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <header>
                <h1 className="text-3xl font-bold text-primary">{productId ? 'Editar' : 'Cadastro de'} Produto/Serviço</h1>
            </header>

            <Card>
                <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-[3fr,1fr] gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="nome">Nome <span className="text-destructive">*</span></Label>
                            <Input id="nome" value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="valor">Valor (R$)</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">R$</span>
                                <Input id="valor" value={value} onChange={handleValueChange} className="pl-9 text-right" />
                            </div>
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
                    <Link href="/produto-servico">Cancelar</Link>
                </Button>
                <Button onClick={handleSave}>Salvar</Button>
            </div>
        </div>
    );
}
