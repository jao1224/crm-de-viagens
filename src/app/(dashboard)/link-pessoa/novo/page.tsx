
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useRouter, useSearchParams } from 'next/navigation';

export interface PersonLink {
    id: string;
    description: string;
    instructions: string;
    personType: string;
    isActive: boolean;
}


export default function NovoLinkPessoaPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const linkId = searchParams.get('id');

    const [description, setDescription] = useState('');
    const [instructions, setInstructions] = useState('');
    const [personType, setPersonType] = useState('passageiro');

    useEffect(() => {
        if (linkId) {
            const storedLinks = JSON.parse(localStorage.getItem('personLinks') || '[]') as PersonLink[];
            const linkToEdit = storedLinks.find(link => link.id === linkId);
            if (linkToEdit) {
                setDescription(linkToEdit.description);
                setInstructions(linkToEdit.instructions);
                setPersonType(linkToEdit.personType);
            }
        }
    }, [linkId]);

    const handleSave = () => {
         if (!description) {
            toast({
                title: "Erro de Validação",
                description: "O campo 'Descrição' é obrigatório.",
                variant: "destructive",
            });
            return;
        }

        const storedLinks = JSON.parse(localStorage.getItem('personLinks') || '[]') as PersonLink[];

        const newLink: PersonLink = {
            id: linkId || Date.now().toString(),
            description,
            instructions,
            personType,
            isActive: true, // Default to active
        };

        let updatedLinks: PersonLink[];
        if (linkId) {
            updatedLinks = storedLinks.map(link => (link.id === linkId ? newLink : link));
        } else {
            updatedLinks = [...storedLinks, newLink];
        }

        localStorage.setItem('personLinks', JSON.stringify(updatedLinks));
        toast({
            title: "Sucesso!",
            description: `Link ${linkId ? 'atualizado' : 'salvo'} com sucesso.`,
        });
        router.push('/link-pessoa');
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <header>
                <h1 className="text-3xl font-bold text-primary">{linkId ? 'Editar Link' : 'Cadastro de Link'} de cadastro de Pessoas</h1>
            </header>

            <Card>
                <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="descricao">Descrição <span className="text-destructive">*</span></Label>
                        <Input id="descricao" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="instrucoes">Instruções da página de cadastro</Label>
                        <Textarea id="instrucoes" rows={4} value={instructions} onChange={(e) => setInstructions(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label>Tipo de Pessoa <span className="text-destructive">*</span></Label>
                        <RadioGroup value={personType} onValueChange={setPersonType} className="flex flex-wrap items-center gap-6">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="passageiro" id="tipo-passageiro" />
                                <Label htmlFor="tipo-passageiro" className="font-normal">Passageiro</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="cliente" id="tipo-cliente" />
                                <Label htmlFor="tipo-cliente" className="font-normal">Cliente</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="fornecedor" id="tipo-fornecedor" />
                                <Label htmlFor="tipo-fornecedor" className="font-normal">Fornecedor</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="representante" id="tipo-representante" />
                                <Label htmlFor="tipo-representante" className="font-normal">Representante</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-start gap-2">
                <Button variant="outline" asChild>
                    <Link href="/link-pessoa">Cancelar</Link>
                </Button>
                <Button onClick={handleSave}>Salvar</Button>
            </div>
        </div>
    );
}
