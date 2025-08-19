'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PropertyCard } from '@/components/property-card';
import { mockTravelPackages } from '@/lib/mock-data';
import type { TravelPackage } from '@/lib/types';
import { PlusCircle } from 'lucide-react';
import { PackageForm } from '@/components/package-form';
import { useToast } from '@/hooks/use-toast';

export default function PropertiesPage() {
  const [packages, setPackages] = useState<TravelPackage[]>(mockTravelPackages);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();

  const handleFormSubmit = (values: Omit<TravelPackage, 'id' | 'status' | 'imageUrl' | 'dataAiHint'>) => {
    const newPackage: TravelPackage = {
      ...values,
      id: (packages.length + 1).toString(),
      status: 'Disponível',
      imageUrl: 'https://placehold.co/600x400',
      dataAiHint: `${values.type.toLowerCase()} ${values.destination.split(',')[0].toLowerCase()}`
    };
    setPackages([newPackage, ...packages]);
    toast({
      title: 'Pacote Adicionado!',
      description: `O pacote "${newPackage.title}" foi criado com sucesso.`
    });
    setIsFormOpen(false);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-headline text-primary">Todos os Pacotes</h2>
        <Button onClick={() => setIsFormOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Pacote
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <PropertyCard key={pkg.id} property={pkg} />
        ))}
      </div>

      <PackageForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
      />
    </>
  );
}
