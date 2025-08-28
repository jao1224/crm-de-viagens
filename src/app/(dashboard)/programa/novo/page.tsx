
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
import type { Program } from '@/lib/types';

export default function NovoProgramaPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const programId = searchParams.get('id');
    
    const [nome, setNome] = useState('');
    const [valorMilheiro, setValorMilheiro] = useState('');
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if (programId) {
            const storedPrograms = JSON.parse(localStorage.getItem('programs') || '[]') as Program[];
            const programToEdit = storedPrograms.find(p => p.id === programId);
            if (programToEdit) {
                setNome(programToEdit.nome);
                setValorMilheiro(programToEdit.valorMilheiro);
                setIsActive(programToEdit.isActive);
            }
        }
    }, [programId]);

    const handleSave = () => {
        if (!nome) {
            toast({
                title: "Erro de Validação",
                description: "O campo 'Nome' é obrigatório.",
                variant: "destructive",
            });
            return;
        }
        
        const storedPrograms = JSON.parse(localStorage.getItem('programs') || '[]') as Program[];

        const newProgram: Program = {
            id: programId || Date.now().toString(),
            nome,
            valorMilheiro,
            isActive
        };

        let updatedPrograms: Program[];
        if (programId) {
            updatedPrograms = storedPrograms.map(p => p.id === programId ? newProgram : p);
        } else {
            updatedPrograms = [...storedPrograms, newProgram];
        }
        
        localStorage.setItem('programs', JSON.stringify(updatedPrograms));
        toast({
            title: "Sucesso!",
            description: `Programa ${programId ? 'atualizado' : 'salvo'} com sucesso.`,
        });
        router.push('/programa');
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <header>
                <h1 className="text-3xl font-bold text-primary">{programId ? 'Editar' : 'Cadastro de'} Programa</h1>
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
