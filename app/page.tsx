'use client';

import { useState } from 'react';
import Link from 'next/link';
import { doctors, specialties } from '@/lib/mock-data';
import { DoctorCard } from '@/components/doctor-card';
import { SpecialtyCard } from '@/components/specialty-card';
import { HowItWorks } from '@/components/how-it-works';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter doctors based on search query
  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.bio.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Show top 6 doctors or filtered results
  const displayedDoctors = searchQuery ? filteredDoctors.slice(0, 6) : doctors.slice(0, 6);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-transparent py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Find the Right Doctor for Your Health
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Search by specialty, view doctor profiles, and book appointments online at your convenience.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
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

          {/* Search Results or Featured Doctors */}
          {searchQuery && filteredDoctors.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">
                  Search Results ({filteredDoctors.length})
                </h2>
                <Link href={`/doctors?search=${encodeURIComponent(searchQuery)}`}>
                  <Button variant="outline">View All Results</Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedDoctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            </div>
          )}

          {searchQuery && filteredDoctors.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No doctors found matching "{searchQuery}". Try a different search.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Browse by Specialty</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find specialists in various medical fields.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialties.map((specialty) => (
              <SpecialtyCard key={specialty.id} specialty={specialty} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Featured Doctors (only show if no search) */}
      {!searchQuery && (
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Featured Doctors</h2>
                <p className="text-lg text-muted-foreground">Top-rated doctors in our network</p>
              </div>
              <Link href="/doctors">
                <Button className="bg-primary text-white hover:bg-blue-700">
                  View All Doctors
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Book an Appointment?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Find the right doctor and schedule your consultation today.
          </p>
          <Link href="/doctors">
            <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-6 text-lg">
              Find a Doctor Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">Docssw</h3>
              <p className="text-sm text-gray-300">
                Your trusted platform for finding and booking doctors.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li><Link href="/doctors" className="hover:text-white">Find Doctors</Link></li>
                <li><a href="#" className="hover:text-white">About Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-300">
            <p>&copy; 2024 Docssw. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
