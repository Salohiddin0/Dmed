export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Review {
  id: string;
  patientName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  photo: string;
  rating: number;
  reviewCount: number;
  experience_years: number;
  consultation_price: number;
  clinic_online: 'clinic' | 'online' | 'both';
  bio: string;
  reviews: Review[];
  timeSlots: Record<string, TimeSlot[]>;
}

export interface Appointment {
  id: string;
  patientName: string;
  phoneNumber: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  description: string;
  createdAt: string;
}

export interface Specialty {
  id: string;
  name: string;
  icon: string;
  description: string;
  doctorCount: number;
}
