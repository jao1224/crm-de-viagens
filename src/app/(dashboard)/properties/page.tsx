import { PropertyCard } from '@/components/property-card';
import { mockProperties } from '@/lib/mock-data';

export default function PropertiesPage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockProperties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
