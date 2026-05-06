import { gear, GearCategory } from '@/data/gear';
import { GearCard } from './GearCard';
import { SectionHeading } from '@/components/shared/SectionHeading';

function CategorySection({ category }: { category: GearCategory }) {
  const items = gear.filter((g) => g.category === category);
  return (
    <div>
      <SectionHeading
        label={category === 'Current' ? 'Daily drivers' : 'On the wishlist'}
        title={`${category} Setup`}
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <GearCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export function GearGrid() {
  return (
    <section className="py-24 max-w-6xl mx-auto px-4 sm:px-6 space-y-24" aria-label="Workstation gear">
      <CategorySection category="Current" />
      <CategorySection category="Future" />
    </section>
  );
}
