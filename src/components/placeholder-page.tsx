
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Wrench } from "lucide-react";

export default function PlaceholderPage({ title }: { title: string }) {
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-primary">{title}</h1>
            </header>
            <Card className="h-96">
                <CardContent className="h-full flex flex-col items-center justify-center text-center text-muted-foreground p-6">
                    <Wrench className="h-12 w-12 mb-4 text-primary/30" />
                    <h2 className="text-xl font-semibold mb-2 text-foreground">Página em Desenvolvimento</h2>
                    <p className="text-lg font-medium">Esta funcionalidade está sendo construída e estará disponível em breve.</p>
                    <p className="text-sm mt-1">Agradecemos a sua paciência!</p>
                </CardContent>
            </Card>
        </div>
    );
}
