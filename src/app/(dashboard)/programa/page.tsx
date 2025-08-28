
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';
import Link from 'next/link';

export default function ProgramaPage() {
    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-primary">Programas Aéreos</h1>
                <Button asChild>
                    <Link href="/programa/novo">Novo</Link>
                </Button>
            </header>

            <Card>
                <CardContent className="p-16 text-center text-muted-foreground">
                     <div className="flex flex-col items-center justify-center gap-4">
                        <Search className="h-12 w-12 text-gray-400" />
                        <span>Não há registros a serem exibidos aqui</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
