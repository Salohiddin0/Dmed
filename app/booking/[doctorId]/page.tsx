'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { doctors } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Calendar, Clock, CheckCircle } from 'lucide-react';

export default function BookingPage() {
  const params = useParams();
  const doctorId = params.doctorId as string;
  const doctor = doctors.find((d) => d.id === doctorId);

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [description, setDescription] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!doctor) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
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

  // Get available dates (next 7 days)
  const today = new Date();
  const availableDates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    availableDates.push(date.toISOString().split('T')[0]);
  }

  // Get time slots for selected date
  const timeSlots = selectedDate ? doctor.timeSlots[selectedDate] || [] : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!patientName.trim()) newErrors.patientName = 'Name is required';
    if (!phoneNumber.trim()) newErrors.phoneNumber = 'Phone is required';
    if (!selectedDate) newErrors.selectedDate = 'Date is required';
    if (!selectedTime) newErrors.selectedTime = 'Time is required';
    if (!description.trim()) newErrors.description = 'Description is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Booking successful
    setIsBooked(true);
  };

  if (isBooked) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/doctors" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
            <ArrowLeft size={20} />
            Back to Doctors
          </Link>

          <Card className="text-center p-12">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle size={48} className="text-green-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Appointment Confirmed!</h1>
            <p className="text-muted-foreground text-lg mb-8">
              Your appointment has been successfully booked.
            </p>

            {/* Confirmation Details */}
            <div className="bg-secondary rounded-lg p-8 text-left mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-6">Appointment Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-border pb-4">
                  <span className="text-muted-foreground">Doctor</span>
                  <span className="font-semibold text-foreground">{doctor.name}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-4">
                  <span className="text-muted-foreground">Specialty</span>
                  <span className="font-semibold text-foreground">{doctor.specialty}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-4">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-semibold text-foreground">
                    {new Date(selectedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex justify-between border-b border-border pb-4">
                  <span className="text-muted-foreground">Time</span>
                  <span className="font-semibold text-foreground">{selectedTime}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-4">
                  <span className="text-muted-foreground">Patient Name</span>
                  <span className="font-semibold text-foreground">{patientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Consultation Fee</span>
                  <span className="font-semibold text-primary text-lg">${doctor.consultation_price}</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-8">
              A confirmation email has been sent to your registered email address.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/" className="flex-1">
                <Button className="w-full bg-primary text-white hover:bg-blue-700">
                  Back to Home
                </Button>
              </Link>
              <Link href="/doctors" className="flex-1">
                <Button variant="outline" className="w-full">
                  Browse More Doctors
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
        <Link href={`/doctors/${doctorId}`} className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft size={20} />
          Back to Doctor Profile
        </Link>

        <Card className="p-8 mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Book an Appointment</h1>
          <p className="text-muted-foreground mb-8">
            Schedule your consultation with {doctor.name}
          </p>

          {/* Doctor Summary */}
          <div className="flex items-start gap-4 p-4 bg-secondary rounded-lg mb-8">
            <img
              src={doctor.photo}
              alt={doctor.name}
              className="w-16 h-16 rounded object-cover"
            />
            <div>
              <h2 className="font-semibold text-foreground">{doctor.name}</h2>
              <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
              <p className="text-sm font-medium text-primary mt-2">${doctor.consultation_price} per consultation</p>
            </div>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Patient Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Patient Name *</label>
              <Input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Enter your full name"
                className="border border-border"
              />
              {errors.patientName && <p className="text-destructive text-sm mt-1">{errors.patientName}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Phone Number *</label>
              <Input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
                className="border border-border"
              />
              {errors.phoneNumber && <p className="text-destructive text-sm mt-1">{errors.phoneNumber}</p>}
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Select Date *</label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {availableDates.map((date) => {
                  const dateObj = new Date(date);
                  const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
                  const dayNum = dateObj.toLocaleDateString('en-US', { day: 'numeric' });

                  return (
                    <button
                      key={date}
                      type="button"
                      onClick={() => {
                        setSelectedDate(date);
                        setSelectedTime('');
                      }}
                      className={`p-3 rounded-lg border-2 text-center transition-colors ${
                        selectedDate === date
                          ? 'border-primary bg-primary text-white'
                          : 'border-border bg-background hover:border-primary'
                      }`}
                    >
                      <div className="text-xs font-semibold">{dayName}</div>
                      <div className="text-lg font-bold">{dayNum}</div>
                    </button>
                  );
                })}
              </div>
              {errors.selectedDate && <p className="text-destructive text-sm mt-1">{errors.selectedDate}</p>}
            </div>

            {/* Time Selection */}
            {selectedDate && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Select Time *</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {timeSlots.map((slot, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSelectedTime(slot.time)}
                      disabled={!slot.available}
                      className={`p-3 rounded-lg border-2 text-center transition-colors text-sm font-medium ${
                        selectedTime === slot.time
                          ? 'border-primary bg-primary text-white'
                          : slot.available
                          ? 'border-border bg-background hover:border-primary cursor-pointer'
                          : 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
                {errors.selectedTime && <p className="text-destructive text-sm mt-1">{errors.selectedTime}</p>}
              </div>
            )}

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Reason for Visit *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your symptoms or reason for visit"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground resize-none"
                rows={4}
              />
              {errors.description && <p className="text-destructive text-sm mt-1">{errors.description}</p>}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-primary text-white hover:bg-blue-700 py-6 text-lg font-semibold"
            >
              Confirm Appointment
            </Button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-6">
            By booking, you agree to our terms and conditions. A confirmation will be sent to your email.
          </p>
        </Card>
      </div>
    </main>
  );
}
