
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Program } from '@/lib/types';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

export default function ProgramaPage() {
    const [programs, setPrograms] = useState<Program[]>([]);
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        const storedPrograms = localStorage.getItem('programs');
        if (storedPrograms) {
            setPrograms(JSON.parse(storedPrograms));
        }
    }, []);

    const handleDelete = (programId: string) => {
        const updatedPrograms = programs.filter(program => program.id !== programId);
        setPrograms(updatedPrograms);
        localStorage.setItem('programs', JSON.stringify(updatedPrograms));
        toast({
            title: "Sucesso!",
            description: "Programa excluído com sucesso.",
        });
    };

    const handleEdit = (programId: string) => {
        router.push(`/programa/novo?id=${programId}`);
    };

    const handleToggleActive = (id: string) => {
        const updatedPrograms = programs.map(program =>
            program.id === id ? { ...program, isActive: !program.isActive } : program
        );
        setPrograms(updatedPrograms);
        localStorage.setItem('programs', JSON.stringify(updatedPrograms));
    };

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-primary">Programas Aéreos</h1>
                <Button asChild>
                    <Link href="/programa/novo">Novo</Link>
                </Button>
            </header>

            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[60%]">Nome</TableHead>
                                    <TableHead>Valor Milheiro</TableHead>
                                    <TableHead>Ativo</TableHead>
                                    <TableHead className="w-[100px] text-right">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {programs.length > 0 ? (
                                    programs.map((program) => (
                                        <TableRow key={program.id}>
                                            <TableCell className="font-medium">{program.nome}</TableCell>
                                            <TableCell>R$ {program.valorMilheiro}</TableCell>
                                            <TableCell>
                                                <Switch
                                                    checked={program.isActive}
                                                    onCheckedChange={() => handleToggleActive(program.id)}
                                                />
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(program.id)}>
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
                                                                    Esta ação não pode ser desfeita. Isso excluirá permanentemente o programa.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => handleDelete(program.id)}>Continuar</AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-24 text-center">
                                            Não há programas cadastrados.
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
