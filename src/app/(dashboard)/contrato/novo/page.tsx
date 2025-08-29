'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import type { Contract } from '@/lib/types';

export default function NovoContratoPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const contractId = searchParams.get('id');

    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if (contractId) {
            const storedContracts = JSON.parse(localStorage.getItem('contracts') || '[]') as Contract[];
            const contractToEdit = storedContracts.find(c => c.id === contractId);
            if (contractToEdit) {
                setName(contractToEdit.name);
                setContent(contractToEdit.content);
                setIsActive(contractToEdit.isActive);
            }
        }
    }, [contractId]);

    const handleSave = () => {
        if (!name) {
            toast({
                title: "Erro de Validação",
                description: "O campo 'Nome' é obrigatório.",
                variant: "destructive",
            });
            return;
        }

        const storedContracts = JSON.parse(localStorage.getItem('contracts') || '[]') as Contract[];

        const newContract: Contract = {
            id: contractId || Date.now().toString(),
            name,
            content,
            isActive,
        };

        let updatedContracts: Contract[];
        if (contractId) {
            updatedContracts = storedContracts.map(c => c.id === contractId ? newContract : c);
        } else {
            updatedContracts = [...storedContracts, newContract];
        }

        localStorage.setItem('contracts', JSON.stringify(updatedContracts));
        toast({
            title: "Sucesso!",
            description: `Modelo de Contrato ${contractId ? 'atualizado' : 'salvo'} com sucesso.`,
        });
        router.push('/contrato');
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <header>
                <h1 className="text-3xl font-bold text-primary">{contractId ? 'Editar' : 'Cadastro de'} Modelo de Contrato</h1>
            </header>

            <Card>
                 <CardHeader>
                    <CardTitle>Conteúdo do Modelo</CardTitle>
                    <CardDescription>Crie o modelo de contrato que será utilizado na geração de contratos para os clientes.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                     <div className="space-y-2">
                        <Label htmlFor="nome">Nome <span className="text-destructive">*</span></Label>
                        <Input id="nome" value={name} onChange={e => setName(e.target.value)} placeholder="Ex: Contrato de Prestação de Serviços de Viagem" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="content">Modelo do Contrato</Label>
                        <Textarea id="content" rows={15} value={content} onChange={e => setContent(e.target.value)} placeholder="Insira o texto do contrato aqui. Você pode usar variáveis como {{CLIENTE_NOME}}, {{VALOR_TOTAL}}, etc."/>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch id="ativo" checked={isActive} onCheckedChange={setIsActive} />
                        <Label htmlFor="ativo">Ativo</Label>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-start gap-2">
                <Button variant="outline" asChild>
                    <Link href="/contrato">Cancelar</Link>
                </Button>
                <Button onClick={handleSave}>Salvar</Button>
            </div>
        </div>
    );
}
