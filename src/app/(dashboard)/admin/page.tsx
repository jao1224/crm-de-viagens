import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-primary">Admin</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">A área de gerenciamento administrativo e de usuários estará disponível aqui.</p>
      </CardContent>
    </Card>
  );
}
