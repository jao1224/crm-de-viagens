import { PropertyCard } from '@/components/property-card';
import { mockTravelPackages } from '@/lib/mock-data';

export default function PropertiesPage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockTravelPackages.map((pkg) => (
        <PropertyCard key={pkg.id} property={pkg} />
      ))}
    </div>
  );
}
