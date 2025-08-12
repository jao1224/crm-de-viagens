import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FinancialPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-primary">Financeiro</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">A área de gerenciamento financeiro, comissões e pagamentos estará disponível aqui.</p>
      </CardContent>
    </Card>
  );
}
