import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { mockTravelPackages } from '@/lib/mock-data';
import type { TravelPackage } from '@/lib/types';
import { Users, Calendar, MapPin, Tag, Sun, Mountain, Briefcase, ChevronLeft, HeartHandshake } from 'lucide-react';
import Link from 'next/link';

const TypeIcon = ({ type }: { type: TravelPackage['type']}) => {
    switch (type) {
        case 'Praia': return <Sun className="w-5 h-5" />;
        case 'Montanha': return <Mountain className="w-5 h-5" />;
        case 'Negócios': return <Briefcase className="w-5 h-5" />;
        case 'Família': return <HeartHandshake className="w-5 h-5" />;
        case 'Cidade':
        default: return <Tag className="w-5 h-5" />;
    }
}

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = mockTravelPackages.find((p) => p.id === params.id);

  if (!property) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Pacote não encontrado</h1>
        <p className="text-muted-foreground">O pacote de viagem que você está procurando não existe.</p>
        <Button asChild className="mt-4">
          <Link href="/properties">
            <ChevronLeft className="mr-2" />
            Voltar para Pacotes
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
        <div className="mb-4">
            <Button asChild variant="outline">
                <Link href="/properties">
                    <ChevronLeft className="mr-2" />
                    Voltar para todos os pacotes
                </Link>
            </Button>
        </div>
      <Card className="overflow-hidden">
        <CardHeader className="p-0">
          <Image
            src={property.imageUrl}
            alt={property.title}
            width={1200}
            height={600}
            className="w-full h-64 object-cover"
            data-ai-hint={property.dataAiHint}
          />
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <CardTitle className="font-headline text-3xl text-primary">{property.title}</CardTitle>
              <CardDescription className="flex items-center gap-2 text-lg">
                <MapPin className="w-5 h-5" />
                {property.destination}
              </CardDescription>
            </div>
            <Badge variant={property.status === 'Esgotado' ? 'destructive' : 'secondary'} className="text-sm">
              {property.status}
            </Badge>
          </div>

          <div className="my-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg">
                <TypeIcon type={property.type} />
                <span className="mt-2 text-sm font-semibold">{property.type}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg">
                <Calendar />
                <span className="mt-2 text-sm font-semibold">{property.duration} dias</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg">
                <Users />
                <span className="mt-2 text-sm font-semibold">{property.travelers} viajante(s)</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-accent/20 rounded-lg">
                <p className="text-2xl font-bold font-headline text-primary">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(property.price)}
                </p>
                <span className="text-xs text-muted-foreground">por pessoa</span>
              </div>
          </div>
          
          <div className="prose max-w-none text-foreground">
            <p>
                Este é um exemplo de descrição para o pacote de viagem. Aqui você pode detalhar o que está incluído, o itinerário, informações sobre acomodação e dicas locais.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
            </p>
          </div>

          <div className="mt-6 text-center">
            <Button size="lg" disabled={property.status === 'Esgotado'} asChild>
                <Link href="/reservations">Reservar Agora</Link>
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
