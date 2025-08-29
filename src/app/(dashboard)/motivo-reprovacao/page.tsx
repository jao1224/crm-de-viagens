
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import type { RejectionReason } from '@/lib/types';
import { currentUser } from '@/lib/mock-data';


const initialReasons: RejectionReason[] = [
    { id: '1', name: 'Não retornou o contato', isActive: true },
    { id: '2', name: 'Achou o preço muito caro', isActive: true },
    { id: '3', name: 'Não gostou do orçamento/roteiro proposto', isActive: true },
    { id: '4', name: 'Comprou em outro lugar', isActive: true },
    { id: '5', name: 'Desistiu da viagem', isActive: true },
];

export default function MotivoReprovacaoPage() {
    const [reasons, setReasons] = useState<RejectionReason[]>([]);
    const router = useRouter();
    const { toast } = useToast();
    const isAdmin = currentUser.permission === 'Admin';

    useEffect(() => {
        const storedReasons = localStorage.getItem('rejectionReasons');
        if (storedReasons) {
            setReasons(JSON.parse(storedReasons));
        } else {
            setReasons(initialReasons);
            localStorage.setItem('rejectionReasons', JSON.stringify(initialReasons));
        }
    }, []);

    const handleEdit = (id: string) => {
        router.push(`/motivo-reprovacao/novo?id=${id}`);
    };

    const handleDelete = (id: string) => {
        const updatedReasons = reasons.filter(reason => reason.id !== id);
        setReasons(updatedReasons);
        localStorage.setItem('rejectionReasons', JSON.stringify(updatedReasons));
        toast({
            title: "Sucesso!",
            description: "Motivo de reprovação excluído com sucesso."
        });
    };
    
    const handleToggleActive = (id: string) => {
        const updatedReasons = reasons.map(reason =>
            reason.id === id ? { ...reason, isActive: !reason.isActive } : reason
        );
        setReasons(updatedReasons);
        localStorage.setItem('rejectionReasons', JSON.stringify(updatedReasons));
    };

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-primary">Motivos de Reprovação</h1>
                {isAdmin && (
                    <Button asChild>
                        <Link href="/motivo-reprovacao/novo">Novo</Link>
                    </Button>
                )}
            </header>

            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[70%]">Nome</TableHead>
                                    <TableHead>Ativo</TableHead>
                                    {isAdmin && <TableHead className="text-right">Ações</TableHead>}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {reasons.length > 0 ? (
                                    reasons.map((reason) => (
                                        <TableRow key={reason.id}>
                                            <TableCell className="font-medium">{reason.name}</TableCell>
                                             <TableCell>
                                                <Switch
                                                    checked={reason.isActive}
                                                    onCheckedChange={() => handleToggleActive(reason.id)}
                                                    disabled={!isAdmin}
                                                />
                                            </TableCell>
                                            {isAdmin && (
                                                <TableCell className="text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(reason.id)}>
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
                                                                        Esta ação não pode ser desfeita. Isso excluirá permanentemente o motivo de reprovação.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                                    <AlertDialogAction onClick={() => handleDelete(reason.id)}>Continuar</AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </div>
                                                </TableCell>
                                            )}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={isAdmin ? 3 : 2} className="h-24 text-center">
                                            Não há motivos de reprovação cadastrados.
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
