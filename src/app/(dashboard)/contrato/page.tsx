'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2, Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import type { Contract } from '@/lib/types';
import { Switch } from '@/components/ui/switch';


export default function ContratoPage() {
    const [contracts, setContracts] = useState<Contract[]>([]);
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        const storedContracts = localStorage.getItem('contracts');
        if (storedContracts) {
            setContracts(JSON.parse(storedContracts));
        }
    }, []);

    const handleEdit = (id: string) => {
        router.push(`/contrato/novo?id=${id}`);
    };

    const handleDelete = (id: string) => {
        const updatedContracts = contracts.filter(contract => contract.id !== id);
        setContracts(updatedContracts);
        localStorage.setItem('contracts', JSON.stringify(updatedContracts));
        toast({
            title: "Sucesso!",
            description: "Modelo de contrato excluído com sucesso."
        });
    };
    
    const handleToggleActive = (id: string) => {
        const updatedContracts = contracts.map(contract =>
            contract.id === id ? { ...contract, isActive: !contract.isActive } : contract
        );
        setContracts(updatedContracts);
        localStorage.setItem('contracts', JSON.stringify(updatedContracts));
    };

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-primary">Modelo de Contratos</h1>
                <Button asChild>
                    <Link href="/contrato/novo">Novo</Link>
                </Button>
            </header>

            <Card>
                <CardContent className="p-0">
                    {contracts.length > 0 ? (
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
                                    {contracts.map((contract) => (
                                        <TableRow key={contract.id}>
                                            <TableCell className="font-medium">{contract.name}</TableCell>
                                             <TableCell>
                                                <Switch
                                                    checked={contract.isActive}
                                                    onCheckedChange={() => handleToggleActive(contract.id)}
                                                />
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(contract.id)}>
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
                                                                    Esta ação não pode ser desfeita. Isso excluirá permanentemente o modelo de contrato.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => handleDelete(contract.id)}>Continuar</AlertDialogAction>
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
