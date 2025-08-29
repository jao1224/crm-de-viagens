
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2, Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import type { Tag } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

const initialTags: Tag[] = [
    { id: '1', name: 'VIP', type: 'Pessoa', color: '#FFD700', isActive: true },
    { id: '2', name: 'Família', type: 'Cotação', color: '#3b82f6', isActive: true },
    { id: '3', name: 'Blacklist', type: 'Pessoa', color: '#000000', isActive: true },
];

export default function EtiquetaPage() {
    const [tags, setTags] = useState<Tag[]>([]);
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        const storedTags = localStorage.getItem('tags');
        if (storedTags) {
            setTags(JSON.parse(storedTags));
        } else {
            setTags(initialTags);
            localStorage.setItem('tags', JSON.stringify(initialTags));
        }
    }, []);

    const handleEdit = (id: string) => {
        router.push(`/etiqueta/novo?id=${id}`);
    };

    const handleDelete = (id: string) => {
        const updatedTags = tags.filter(tag => tag.id !== id);
        setTags(updatedTags);
        localStorage.setItem('tags', JSON.stringify(updatedTags));
        toast({
            title: "Sucesso!",
            description: "Etiqueta excluída com sucesso."
        });
    };
    
    const handleToggleActive = (id: string) => {
        const updatedTags = tags.map(tag =>
            tag.id === id ? { ...tag, isActive: !tag.isActive } : tag
        );
        setTags(updatedTags);
        localStorage.setItem('tags', JSON.stringify(updatedTags));
    };

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-primary">Etiquetas</h1>
                <Button asChild>
                    <Link href="/etiqueta/novo">Novo</Link>
                </Button>
            </header>

            <Card>
                <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-[1fr,1fr,1fr,auto] gap-4 items-end">
                         <div className="space-y-2">
                            <Label htmlFor="nome">Nome</Label>
                            <Input id="nome" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tipo">Tipo</Label>
                            <Select>
                                <SelectTrigger id="tipo">
                                    <SelectValue placeholder="Todos" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="todos">Todos</SelectItem>
                                    <SelectItem value="pessoa">Pessoa</SelectItem>
                                    <SelectItem value="cotacao">Cotação</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="situacao">Situação</Label>
                            <Select>
                                <SelectTrigger id="situacao">
                                    <SelectValue placeholder="Ativo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ativo">Ativo</SelectItem>
                                    <SelectItem value="inativo">Inativo</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button>Pesquisar</Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-0">
                    {tags.length > 0 ? (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[50%]">Nome</TableHead>
                                        <TableHead>Tipo</TableHead>
                                        <TableHead>Ativo</TableHead>
                                        <TableHead className="text-right">Ações</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {tags.map((tag) => (
                                        <TableRow key={tag.id}>
                                            <TableCell>
                                                <Badge style={{ backgroundColor: tag.color, color: '#fff' }} className="font-semibold">
                                                    {tag.name}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{tag.type}</TableCell>
                                            <TableCell>
                                                <Switch
                                                    checked={tag.isActive}
                                                    onCheckedChange={() => handleToggleActive(tag.id)}
                                                />
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(tag.id)}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive h-8 w-8">
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Esta ação não pode ser desfeita. Isso excluirá permanentemente a etiqueta.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => handleDelete(tag.id)}>Continuar</AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                         <div className="h-60 flex flex-col items-center justify-center text-center text-muted-foreground p-6">
                            <Search className="h-12 w-12 mb-4 text-primary/30" />
                            <p className="text-lg font-medium">Não há registros a serem exibidos aqui</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
