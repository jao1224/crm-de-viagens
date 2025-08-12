import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReportsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-primary">Relatórios</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">A área de geração de relatórios filtráveis estará disponível aqui.</p>
      </CardContent>
    </Card>
  );
}
