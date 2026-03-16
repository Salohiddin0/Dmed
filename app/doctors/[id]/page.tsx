'use client';

import { useState } from 'react';
import Link from 'next/link';
import { doctors } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star, MapPin, Briefcase, Award, ArrowLeft } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function DoctorProfilePage() {
  const params = useParams();
  const doctorId = params.id as string;
  const doctor = doctors.find((d) => d.id === doctorId);

  if (!doctor) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/doctors" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
            <ArrowLeft size={20} />
            Back to Doctors
          </Link>
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold text-foreground mb-4">Doctor not found</h1>
            <p className="text-muted-foreground mb-8">The doctor you're looking for doesn't exist.</p>
            <Link href="/doctors">
              <Button className="bg-primary text-white hover:bg-blue-700">
                Browse Doctors
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link href="/doctors" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft size={20} />
          Back to Doctors
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Doctor Image and Basic Info */}
          <div className="md:col-span-1">
            <Card className="overflow-hidden sticky top-20">
              <div className="aspect-square overflow-hidden bg-secondary">
                <img
                  src={doctor.photo}
                  alt={doctor.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6">
                <h1 className="text-2xl font-bold text-foreground mb-2">{doctor.name}</h1>
                <p className="text-lg font-medium text-primary mb-4">{doctor.specialty}</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < Math.floor(doctor.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">
                    {doctor.rating} ({doctor.reviewCount} reviews)
                  </span>
                </div>

                {/* Info Cards */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-secondary rounded">
                    <Briefcase size={20} className="text-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Experience</p>
                      <p className="font-semibold text-foreground">{doctor.experience_years}+ years</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-secondary rounded">
                    <Award size={20} className="text-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Consultation</p>
                      <p className="font-semibold text-foreground">${doctor.consultation_price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-secondary rounded">
                    <MapPin size={20} className="text-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Availability</p>
                      <p className="font-semibold text-foreground">
                        {doctor.clinic_online === 'both' ? 'Clinic & Online' : doctor.clinic_online === 'clinic' ? 'Clinic' : 'Online'}
                      </p>
                    </div>
                  </div>
                </div>

                <Link href={`/booking/${doctor.id}`} className="w-full block">
                  <Button className="w-full bg-primary text-white hover:bg-blue-700 py-6 text-lg">
                    Book Appointment
                  </Button>
                </Link>
              </div>
            </Card>
          </div>

          {/* Doctor Details */}
          <div className="md:col-span-2 space-y-8">
            {/* About Section */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">About</h2>
              <p className="text-foreground leading-relaxed">{doctor.bio}</p>
            </Card>

            {/* Reviews Section */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">Patient Reviews</h2>
              <div className="space-y-4">
                {doctor.reviews.map((review) => (
                  <div key={review.id} className="pb-4 border-b border-border last:border-b-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-foreground">{review.patientName}</p>
                        <p className="text-sm text-muted-foreground">{review.date}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Available Slots Section */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">Available Appointment Slots</h2>
              <p className="text-muted-foreground mb-6">
                Select a date to view available time slots
              </p>
              <Link href={`/booking/${doctor.id}`} className="w-full block">
                <Button className="w-full bg-primary text-white hover:bg-blue-700 py-6 text-lg">
                  View & Book Slots
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
