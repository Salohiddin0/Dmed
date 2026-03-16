'use client';

import { useState, useEffect } from 'react';
import { doctors } from '@/lib/mock-data';
import { DoctorCard } from '@/components/doctor-card';
import { FilterSidebar } from '@/components/filter-sidebar';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function DoctorsPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [minRating, setMinRating] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null);

  // Get initial search params from URL on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const specialty = params.get('specialty');
      const search = params.get('search');
      
      if (specialty) {
        setSelectedSpecialty(specialty);
      }
      if (search) {
        setSearchQuery(search);
      }
      setSearchParams(params);
    }
  }, []);

  // Filter doctors based on criteria
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSpecialty = !selectedSpecialty || doctor.specialty === selectedSpecialty;
    const matchesRating = doctor.rating >= minRating;
    const matchesSearch =
      !searchQuery ||
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSpecialty && matchesRating && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Find a Doctor</h1>
          <p className="text-lg text-muted-foreground">
            Browse our network of {doctors.length} qualified healthcare professionals.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search doctors by name or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-base border border-border shadow-sm"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <FilterSidebar
              selectedSpecialty={selectedSpecialty}
              minRating={minRating}
              onSpecialtyChange={setSelectedSpecialty}
              onRatingChange={setMinRating}
            />
          </aside>

          {/* Doctors Grid */}
          <div className="lg:col-span-3">
            {filteredDoctors.length > 0 ? (
              <>
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredDoctors.length} of {doctors.length} doctors
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredDoctors.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                  ))}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center py-24 text-center">
                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-2">No doctors found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or search query.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedSpecialty(null);
                      setMinRating(0);
                      setSearchQuery('');
                    }}
                    className="text-primary hover:underline font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
