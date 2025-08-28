
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

export default function FormaPagamentoPage() {
    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-primary">Forma de Pagamento</h1>
                <Button>Novo</Button>
            </header>

            <Card>
                <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr,auto] gap-4 items-end">
                        <div className="space-y-2">
                            <Label htmlFor="nome">Nome</Label>
                            <Input id="nome" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="situacao">Situação</Label>
                            <Select defaultValue="ativo">
                                <SelectTrigger id="situacao">
                                    <SelectValue />
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

            <Card className="h-80">
                <CardContent className="h-full flex flex-col items-center justify-center text-center text-muted-foreground p-6">
                    <Search className="h-12 w-12 mb-4 text-primary/30" />
                    <p className="text-lg font-medium">Não há registros a serem exibidos aqui</p>
                </CardContent>
            </Card>
        </div>
    );
}
