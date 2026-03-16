'use client';

import { Card } from '@/components/ui/card';
import { specialties } from '@/lib/mock-data';

interface FilterSidebarProps {
  selectedSpecialty: string | null;
  minRating: number;
  onSpecialtyChange: (specialty: string | null) => void;
  onRatingChange: (rating: number) => void;
}

export function FilterSidebar({
  selectedSpecialty,
  minRating,
  onSpecialtyChange,
  onRatingChange,
}: FilterSidebarProps) {
  const uniqueSpecialties = [...new Set(specialties.map(s => s.name))];

  return (
    <div className="space-y-6">
      {/* Specialty Filter */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Specialty</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedSpecialty === null}
              onChange={() => onSpecialtyChange(null)}
              className="w-4 h-4 cursor-pointer"
            />
            <span className="text-sm text-foreground">All Specialties</span>
          </label>
          {uniqueSpecialties.map((specialty) => (
            <label key={specialty} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedSpecialty === specialty}
                onChange={() => onSpecialtyChange(selectedSpecialty === specialty ? null : specialty)}
                className="w-4 h-4 cursor-pointer"
              />
              <span className="text-sm text-foreground">{specialty}</span>
            </label>
          ))}
        </div>
      </Card>

      {/* Rating Filter */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Minimum Rating</h3>
        <div className="space-y-3">
          {[0, 3.5, 4, 4.5].map((rating) => (
            <label key={rating} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="rating"
                checked={minRating === rating}
                onChange={() => onRatingChange(rating)}
                className="w-4 h-4 cursor-pointer"
              />
              <span className="text-sm text-foreground">
                {rating === 0 ? 'Any Rating' : `${rating}+ Stars`}
              </span>
            </label>
          ))}
        </div>
      </Card>

      {/* Clear Filters */}
      <button
        onClick={() => {
          onSpecialtyChange(null);
          onRatingChange(0);
        }}
        className="w-full px-4 py-2 text-sm font-medium text-primary hover:bg-secondary rounded-lg transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );
}
