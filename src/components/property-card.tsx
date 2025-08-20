import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { TravelPackage } from '@/lib/types';
import { Users, Sun, Mountain, Briefcase, Tag, Calendar, HeartHandshake } from 'lucide-react';

type PropertyCardProps = {
  property: TravelPackage;
  onDetailsClick: () => void;
};

const TypeIcon = ({ type }: { type: TravelPackage['type']}) => {
    switch (type) {
        case 'Praia': return <Sun className="w-4 h-4 text-primary/70" />;
        case 'Montanha': return <Mountain className="w-4 h-4 text-primary/70" />;
        case 'Negócios': return <Briefcase className="w-4 h-4 text-primary/70" />;
        case 'Família': return <HeartHandshake className="w-4 h-4 text-primary/70" />;
        case 'Cidade':
        default: return <Tag className="w-4 h-4 text-primary/70" />;
    }
}

export function PropertyCard({ property, onDetailsClick }: PropertyCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0 relative">
        <Image
          src={property.imageUrl}
          alt={property.title}
          width={600}
          height={400}
          className="w-full h-48 object-cover"
          data-ai-hint={property.dataAiHint}
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <Badge variant={property.status === 'Esgotado' ? 'destructive' : 'secondary'}>{property.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="font-headline text-lg text-primary mb-2 truncate">{property.title}</CardTitle>
        <p className="text-sm text-muted-foreground truncate">{property.destination}</p>
        <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <TypeIcon type={property.type} />
            <span>{property.type}</span>
          </div>
           <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="w-4 h-4 text-primary/70" />
            <span>{property.travelers}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary/70" />
            <span>{property.duration} dias</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center bg-muted/30">
        <p className="text-xl font-bold font-headline text-primary">
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(property.price)}
        </p>
        <Button onClick={onDetailsClick}>Detalhes</Button>
      </CardFooter>
    </Card>
  );
}
