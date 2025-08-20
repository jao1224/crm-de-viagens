
'use client';

import type { TravelPackage } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from './ui/dialog';
import { Badge } from './ui/badge';
import Image from 'next/image';
import { Users, Calendar, MapPin, Tag, Sun, Mountain, Briefcase, ChevronLeft, HeartHandshake } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

interface PackageDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  pkg: TravelPackage | null;
}

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

export function PackageDetailsDialog({ isOpen, onOpenChange, pkg }: PackageDetailsDialogProps) {
  if (!pkg) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl p-0">
        <div className="overflow-hidden">
            <Image
                src={pkg.imageUrl}
                alt={pkg.title}
                width={1200}
                height={600}
                className="w-full h-64 object-cover"
                data-ai-hint={pkg.dataAiHint}
            />
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <DialogTitle className="font-headline text-3xl text-primary">{pkg.title}</DialogTitle>
              <DialogDescription className="flex items-center gap-2 text-lg">
                <MapPin className="w-5 h-5" />
                {pkg.destination}
              </DialogDescription>
            </div>
            <Badge variant={pkg.status === 'Esgotado' ? 'destructive' : 'secondary'} className="text-sm">
              {pkg.status}
            </Badge>
          </div>

          <div className="my-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg">
                <TypeIcon type={pkg.type} />
                <span className="mt-2 text-sm font-semibold">{pkg.type}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg">
                <Calendar />
                <span className="mt-2 text-sm font-semibold">{pkg.duration} dias</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg">
                <Users />
                <span className="mt-2 text-sm font-semibold">{pkg.travelers} viajante(s)</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-accent/20 rounded-lg">
                <p className="text-2xl font-bold font-headline text-primary">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pkg.price)}
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
        </div>

        <DialogFooter className="p-6 pt-0 flex sm:justify-between w-full">
            <DialogClose asChild>
                <Button type="button" variant="outline">Fechar</Button>
            </DialogClose>
            <Button size="lg" disabled={pkg.status === 'Esgotado'} asChild>
                <Link href="/reservations">Reservar Agora</Link>
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
