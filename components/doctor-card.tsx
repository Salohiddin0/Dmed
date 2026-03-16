'use client';

import Link from 'next/link';
import { Doctor } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star, MapPin } from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-square overflow-hidden bg-secondary">
        <img
          src={doctor.photo}
          alt={doctor.name}
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-foreground">{doctor.name}</h3>
        <p className="text-sm text-muted-foreground mb-3">{doctor.specialty}</p>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < Math.floor(doctor.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">
            {doctor.rating} ({doctor.reviewCount})
          </span>
        </div>

        {/* Experience & Price */}
        <div className="space-y-2 mb-4">
          <p className="text-sm text-foreground">
            <span className="font-medium">{doctor.experience_years}+ years</span> experience
          </p>
          <p className="text-sm text-foreground">
            Consultation: <span className="font-semibold text-primary">${doctor.consultation_price}</span>
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <MapPin size={14} />
            {doctor.clinic_online === 'both' ? 'Clinic & Online' : doctor.clinic_online === 'clinic' ? 'Clinic' : 'Online'}
          </p>
        </div>

        <Link href={`/doctors/${doctor.id}`} className="w-full block">
          <Button className="w-full bg-primary text-white hover:bg-blue-700">
            View Profile
          </Button>
        </Link>
      </div>
    </Card>
  );
}
