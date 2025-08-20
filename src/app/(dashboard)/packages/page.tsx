'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PropertyCard } from '@/components/property-card';
import { mockTravelPackages } from '@/lib/mock-data';
import type { TravelPackage } from '@/lib/types';
import { PlusCircle } from 'lucide-react';
import { PackageForm } from '@/components/package-form';
import { useToast } from '@/hooks/use-toast';
import { PackageDetailsDialog } from '@/components/package-details-dialog';

const filterTypes: (TravelPackage['type'] | 'Todos')[] = ['Todos', 'Praia', 'Montanha', 'Cidade', 'Negócios', 'Família'];

export default function PackagesPage() {
  const [packages, setPackages] = useState<TravelPackage[]>(mockTravelPackages);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(null);
  const [activeFilter, setActiveFilter] = useState<TravelPackage['type'] | 'Todos'>('Todos');
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
  
  const handleDetailsClick = (pkg: TravelPackage) => {
    setSelectedPackage(pkg);
    setIsDetailsOpen(true);
  }

  const filteredPackages = activeFilter === 'Todos' 
    ? packages 
    : packages.filter(pkg => pkg.type === activeFilter);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-headline text-primary">Todos os Pacotes</h2>
        <Button onClick={() => setIsFormOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Pacote
        </Button>
      </div>

      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          {filterTypes.map(type => (
            <Button
              key={type}
              variant={activeFilter === type ? 'default' : 'outline'}
              onClick={() => setActiveFilter(type)}
              className="whitespace-nowrap"
            >
              {type}
            </Button>
          ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPackages.map((pkg) => (
          <PropertyCard key={pkg.id} property={pkg} onDetailsClick={() => handleDetailsClick(pkg)} />
        ))}
      </div>

      <PackageForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
      />

      <PackageDetailsDialog
        isOpen={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        pkg={selectedPackage}
      />
    </>
  );
}
