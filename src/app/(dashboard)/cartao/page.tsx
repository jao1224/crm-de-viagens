
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';
import Link from 'next/link';

export default function CartaoPage() {
    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-primary">Cartões de Crédito</h1>
                <Button asChild>
                    {/* O link de destino para 'novo' pode ser ajustado quando a página de criação for implementada */}
                    <Link href="#">Novo</Link>
                </Button>
            </header>

            <Card className="h-96">
                <CardContent className="h-full flex flex-col items-center justify-center text-center text-muted-foreground p-6">
                    <Search className="h-12 w-12 mb-4 text-primary/30" />
                    <p className="text-lg font-medium">Não há registros a serem exibidos aqui</p>
                </CardContent>
            </Card>
        </div>
    );
}
