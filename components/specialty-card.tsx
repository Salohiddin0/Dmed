'use client';

import Link from 'next/link';
import { Specialty } from '@/lib/types';
import { Card } from '@/components/ui/card';
import * as Icons from 'lucide-react';

interface SpecialtyCardProps {
  specialty: Specialty;
}

export function SpecialtyCard({ specialty }: SpecialtyCardProps) {
  // Map icon names to lucide icons
  const getIcon = (iconName: string) => {
    const iconMap: Record<string, any> = {
      Heart: Icons.Heart,
      Droplet: Icons.Droplet,
      Brain: Icons.Brain,
      Smile: Icons.Smile,
      Baby: Icons.Baby,
      User: Icons.User,
      Bone: Icons.Bone,
    };
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent size={40} className="text-primary" /> : null;
  };

  return (
    <Link href={`/doctors?specialty=${encodeURIComponent(specialty.name)}`}>
      <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:border-primary p-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 p-3 bg-secondary rounded-lg">
            {getIcon(specialty.icon)}
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">{specialty.name}</h3>
          <p className="text-sm text-muted-foreground mb-3">{specialty.description}</p>
          <p className="text-xs font-medium text-primary">{specialty.doctorCount}+ Doctors</p>
        </div>
      </Card>
    </Link>
  );
}
