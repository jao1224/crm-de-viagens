
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
import type { RejectionReason } from '@/lib/types';


export default function NovoMotivoReprovacaoPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const reasonId = searchParams.get('id');

    const [name, setName] = useState('');
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if (reasonId) {
            const storedReasons = JSON.parse(localStorage.getItem('rejectionReasons') || '[]') as RejectionReason[];
            const reasonToEdit = storedReasons.find(c => c.id === reasonId);
            if (reasonToEdit) {
                setName(reasonToEdit.name);
                setIsActive(reasonToEdit.isActive);
            }
        }
    }, [reasonId]);

    const handleSave = () => {
        if (!name) {
            toast({
                title: "Erro de Validação",
                description: "O campo 'Nome' é obrigatório.",
                variant: "destructive",
            });
            return;
        }

        const storedReasons = JSON.parse(localStorage.getItem('rejectionReasons') || '[]') as RejectionReason[];

        const newReason: RejectionReason = {
            id: reasonId || Date.now().toString(),
            name,
            isActive,
        };

        let updatedReasons: RejectionReason[];
        if (reasonId) {
            updatedReasons = storedReasons.map(c => c.id === reasonId ? newReason : c);
        } else {
            updatedReasons = [...storedReasons, newReason];
        }

        localStorage.setItem('rejectionReasons', JSON.stringify(updatedReasons));
        toast({
            title: "Sucesso!",
            description: `Motivo de Reprovação ${reasonId ? 'atualizado' : 'salvo'} com sucesso.`,
        });
        router.push('/motivo-reprovacao');
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <header>
                <h1 className="text-3xl font-bold text-primary">{reasonId ? 'Editar' : 'Cadastro de'} Motivo de Reprovação</h1>
            </header>

            <Card>
                <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="nome">Nome <span className="text-destructive">*</span></Label>
                        <Input id="nome" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <Switch id="ativo" checked={isActive} onCheckedChange={setIsActive} />
                        <Label htmlFor="ativo">Ativo</Label>
                    </div>
                </CardContent>
            </Card>

             <div className="flex justify-start gap-2">
                <Button variant="outline" asChild>
                    <Link href="/motivo-reprovacao">Cancelar</Link>
                </Button>
                <Button onClick={handleSave}>Salvar</Button>
            </div>
        </div>
    );
}
