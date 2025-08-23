
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ListChecks } from "lucide-react";

export function TasksCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg font-headline text-primary">Tarefas para hoje, dia {new Date().getDate()}</CardTitle>
                 <div className="flex gap-2 mt-2">
                    <Badge variant="destructive">4 atrasadas</Badge>
                    <Badge variant="secondary">0 para o dia de hoje</Badge>
                    <Badge variant="default">0 no prazo</Badge>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center text-center text-muted-foreground h-24">
                <ListChecks className="w-8 h-8 mb-2" />
                <p>Você não possui nenhuma tarefa para o dia de hoje.</p>
            </CardContent>
        </Card>
    );
}
