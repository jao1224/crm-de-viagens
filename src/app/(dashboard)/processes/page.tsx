import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProcessesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-primary">Itinerários</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">A área de criação e gerenciamento de itinerários de viagem estará disponível aqui.</p>
      </CardContent>
    </Card>
  );
}
