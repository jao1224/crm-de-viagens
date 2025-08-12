import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Property } from '@/lib/types';
import { BedDouble, Bath, Ruler, Tag, Home } from 'lucide-react';

type PropertyCardProps = {
  property: Property;
};

export function PropertyCard({ property }: PropertyCardProps) {
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
          <Badge variant="secondary">{property.type}</Badge>
          <Badge>{property.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="font-headline text-lg text-primary mb-2 truncate">{property.title}</CardTitle>
        <p className="text-sm text-muted-foreground truncate">{property.address}</p>
        <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <BedDouble className="w-4 h-4 text-primary/70" />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Bath className="w-4 h-4 text-primary/70" />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Ruler className="w-4 h-4 text-primary/70" />
            <span>{property.area} m²</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center bg-muted/30">
        <p className="text-xl font-bold font-headline text-primary">
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(property.price)}
        </p>
        <Button>Detalhes</Button>
      </CardFooter>
    </Card>
  );
}
