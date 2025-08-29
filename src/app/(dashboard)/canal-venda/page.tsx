
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import type { SalesChannel } from '@/lib/types';
import { Switch } from '@/components/ui/switch';


const initialChannels: SalesChannel[] = [
    { id: '1', name: 'Instagram', isActive: true },
    { id: '2', name: 'Facebook', isActive: true },
    { id: '3', name: 'Whatsapp', isActive: true },
    { id: '4', name: 'Representante', isActive: true },
    { id: '5', name: 'Indicação', isActive: true },
    { id: '6', name: 'Telegram', isActive: true },
];


export default function CanalVendaPage() {
    const [channels, setChannels] = useState<SalesChannel[]>([]);
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        const storedChannels = localStorage.getItem('salesChannels');
        if (storedChannels) {
            setChannels(JSON.parse(storedChannels));
        } else {
            setChannels(initialChannels);
            localStorage.setItem('salesChannels', JSON.stringify(initialChannels));
        }
    }, []);

    const handleEdit = (id: string) => {
        router.push(`/canal-venda/novo?id=${id}`);
    };

    const handleDelete = (id: string) => {
        const updatedChannels = channels.filter(channel => channel.id !== id);
        setChannels(updatedChannels);
        localStorage.setItem('salesChannels', JSON.stringify(updatedChannels));
        toast({
            title: "Sucesso!",
            description: "Canal de venda excluído com sucesso."
        });
    };
    
    const handleToggleActive = (id: string) => {
        const updatedChannels = channels.map(channel =>
            channel.id === id ? { ...channel, isActive: !channel.isActive } : channel
        );
        setChannels(updatedChannels);
        localStorage.setItem('salesChannels', JSON.stringify(updatedChannels));
    };

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-primary">Canal de Venda</h1>
                <Button asChild>
                    <Link href="/canal-venda/novo">Novo</Link>
                </Button>
            </header>

            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[70%]">Nome</TableHead>
                                    <TableHead>Ativo</TableHead>
                                    <TableHead className="text-right">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {channels.length > 0 ? (
                                    channels.map((channel) => (
                                        <TableRow key={channel.id}>
                                            <TableCell className="font-medium">{channel.name}</TableCell>
                                             <TableCell>
                                                <Switch
                                                    checked={channel.isActive}
                                                    onCheckedChange={() => handleToggleActive(channel.id)}
                                                />
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(channel.id)}>
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
                                                                    Esta ação não pode ser desfeita. Isso excluirá permanentemente o canal de venda.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => handleDelete(channel.id)}>Continuar</AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="h-24 text-center">
                                            Não há canais de venda cadastrados.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
