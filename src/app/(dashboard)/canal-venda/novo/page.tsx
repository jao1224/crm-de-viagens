
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
import type { SalesChannel } from '@/lib/types';


export default function NovoCanalVendaPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const channelId = searchParams.get('id');

    const [name, setName] = useState('');
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if (channelId) {
            const storedChannels = JSON.parse(localStorage.getItem('salesChannels') || '[]') as SalesChannel[];
            const channelToEdit = storedChannels.find(c => c.id === channelId);
            if (channelToEdit) {
                setName(channelToEdit.name);
                setIsActive(channelToEdit.isActive);
            }
        }
    }, [channelId]);

    const handleSave = () => {
        if (!name) {
            toast({
                title: "Erro de Validação",
                description: "O campo 'Nome' é obrigatório.",
                variant: "destructive",
            });
            return;
        }

        const storedChannels = JSON.parse(localStorage.getItem('salesChannels') || '[]') as SalesChannel[];

        const newChannel: SalesChannel = {
            id: channelId || Date.now().toString(),
            name,
            isActive,
        };

        let updatedChannels: SalesChannel[];
        if (channelId) {
            updatedChannels = storedChannels.map(c => c.id === channelId ? newChannel : c);
        } else {
            updatedChannels = [...storedChannels, newChannel];
        }

        localStorage.setItem('salesChannels', JSON.stringify(updatedChannels));
        toast({
            title: "Sucesso!",
            description: `Canal de Venda ${channelId ? 'atualizado' : 'salvo'} com sucesso.`,
        });
        router.push('/canal-venda');
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <header>
                <h1 className="text-3xl font-bold text-primary">{channelId ? 'Editar' : 'Cadastro de'} Canal de Venda</h1>
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
                    <Link href="/canal-venda">Cancelar</Link>
                </Button>
                <Button onClick={handleSave}>Salvar</Button>
            </div>
        </div>
    );
}
