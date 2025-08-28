
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function NovoProgramaPage() {
    const router = useRouter();
    const { toast } = useToast();
    
    const [nome, setNome] = useState('');
    const [valorMilheiro, setValorMilheiro] = useState('');
    const [isActive, setIsActive] = useState(true);

    const handleSave = () => {
        if (!nome) {
            toast({
                title: "Erro de Validação",
                description: "O campo 'Nome' é obrigatório.",
                variant: "destructive",
            });
            return;
        }
        // Lógica de salvamento (ex: localStorage) seria implementada aqui
        console.log({ nome, valorMilheiro, isActive });
        
        toast({
            title: "Sucesso!",
            description: "Programa salvo com sucesso.",
        });
        router.push('/programa');
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <header>
                <h1 className="text-3xl font-bold text-primary">Cadastro de Programa</h1>
            </header>

            <Card>
                <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-[3fr,1fr] gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="nome">Nome <span className="text-destructive">*</span></Label>
                            <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="valor-milheiro">Valor Milheiro</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">R$</span>
                                <Input id="valor-milheiro" value={valorMilheiro} onChange={(e) => setValorMilheiro(e.target.value)} className="pl-9" />
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
                    <Link href="/programa">Cancelar</Link>
                </Button>
                <Button onClick={handleSave}>Salvar</Button>
            </div>
        </div>
    );
}
