import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProcessesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-primary">Processos</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">A área de gerenciamento de processos estará disponível aqui.</p>
      </CardContent>
    </Card>
  );
}
