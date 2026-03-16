'use client';

import { Card } from '@/components/ui/card';
import { Search, User, Calendar } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: 'Search Doctors',
      description: 'Find the right doctor based on specialty, location, and availability.',
    },
    {
      icon: User,
      title: 'View Profile',
      description: 'Check doctor\'s experience, qualifications, reviews, and consultation fees.',
    },
    {
      icon: Calendar,
      title: 'Book Appointment',
      description: 'Select your preferred date and time, and confirm your appointment.',
    },
  ];

  return (
    <section className="py-16 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Booking a doctor's appointment has never been easier. Follow these simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="relative p-8 text-center hover:shadow-md transition-shadow">
                {/* Step number */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                </div>

                <div className="pt-6">
                  <div className="inline-block p-3 bg-secondary rounded-lg mb-4">
                    <Icon size={32} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>

                {/* Connector line for desktop */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-20 -right-[calc(50%-24px)] w-[calc(100%-48px)] h-0.5 bg-border" />
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
