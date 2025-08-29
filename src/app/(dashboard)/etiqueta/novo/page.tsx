
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
import type { Tag } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


export default function NovoEtiquetaPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const tagId = searchParams.get('id');

    const [name, setName] = useState('');
    const [type, setType] = useState('Pessoa');
    const [color, setColor] = useState('#3b82f6');
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if (tagId) {
            const storedTags = JSON.parse(localStorage.getItem('tags') || '[]') as Tag[];
            const tagToEdit = storedTags.find(t => t.id === tagId);
            if (tagToEdit) {
                setName(tagToEdit.name);
                setType(tagToEdit.type);
                setColor(tagToEdit.color);
                setIsActive(tagToEdit.isActive);
            }
        }
    }, [tagId]);

    const handleSave = () => {
        if (!name) {
            toast({
                title: "Erro de Validação",
                description: "O campo 'Nome' é obrigatório.",
                variant: "destructive",
            });
            return;
        }

        const storedTags = JSON.parse(localStorage.getItem('tags') || '[]') as Tag[];

        const newTag: Tag = {
            id: tagId || Date.now().toString(),
            name,
            type,
            color,
            isActive,
        };

        let updatedTags: Tag[];
        if (tagId) {
            updatedTags = storedTags.map(t => t.id === tagId ? newTag : t);
        } else {
            updatedTags = [...storedTags, newTag];
        }

        localStorage.setItem('tags', JSON.stringify(updatedTags));
        toast({
            title: "Sucesso!",
            description: `Etiqueta ${tagId ? 'atualizada' : 'salva'} com sucesso.`,
        });
        router.push('/etiqueta');
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <header>
                <h1 className="text-3xl font-bold text-primary">{tagId ? 'Editar' : 'Cadastro de'} Etiqueta</h1>
            </header>

            <Card>
                <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="nome">Nome <span className="text-destructive">*</span></Label>
                            <Input id="nome" value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tipo">Tipo <span className="text-destructive">*</span></Label>
                            <Select value={type} onValueChange={setType}>
                                <SelectTrigger id="tipo">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Pessoa">Pessoa</SelectItem>
                                    <SelectItem value="Cotação">Cotação</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="cor">Cor</Label>
                        <div className="relative">
                            <Input id="cor" type="color" value={color} onChange={(e) => setColor(e.target.value)} className="p-1 h-10 w-24"/>
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
                    <Link href="/etiqueta">Cancelar</Link>
                </Button>
                <Button onClick={handleSave}>Salvar</Button>
            </div>
        </div>
    );
}
