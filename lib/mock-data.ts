import { Doctor, Specialty } from './types';

// Generate time slots for each day
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour < 17; hour++) {
    slots.push({
      time: `${hour.toString().padStart(2, '0')}:00`,
      available: Math.random() > 0.3,
    });
    slots.push({
      time: `${hour.toString().padStart(2, '0')}:30`,
      available: Math.random() > 0.3,
    });
  }
  return slots;
};

// Generate time slots for next 7 days
const generateDaySlots = () => {
  const slots: Record<string, any[]> = {};
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    slots[dateStr] = generateTimeSlots();
  }
  return slots;
};

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    rating: 4.8,
    reviewCount: 156,
    experience_years: 12,
    consultation_price: 150,
    clinic_online: 'both',
    bio: 'Specialized in cardiovascular diseases with 12+ years of experience. Dr. Johnson is known for her compassionate approach and accurate diagnoses.',
    reviews: [
      {
        id: '1',
        patientName: 'John Doe',
        rating: 5,
        comment: 'Excellent doctor, very professional and caring.',
        date: '2024-02-10',
      },
      {
        id: '2',
        patientName: 'Emma Wilson',
        rating: 5,
        comment: 'Best cardiologist in town. Highly recommended!',
        date: '2024-01-25',
      },
      {
        id: '3',
        patientName: 'Michael Brown',
        rating: 4,
        comment: 'Great service, a bit long wait times.',
        date: '2024-01-15',
      },
    ],
    timeSlots: generateDaySlots(),
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Dermatologist',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    rating: 4.7,
    reviewCount: 142,
    experience_years: 10,
    consultation_price: 120,
    clinic_online: 'clinic',
    bio: 'Expert in treating all skin conditions. Dr. Chen uses the latest dermatological techniques and treatments.',
    reviews: [
      {
        id: '1',
        patientName: 'Sarah Miller',
        rating: 5,
        comment: 'Cleared my acne completely. Very effective treatment.',
        date: '2024-02-08',
      },
      {
        id: '2',
        patientName: 'Lisa Anderson',
        rating: 4,
        comment: 'Professional and knowledgeable.',
        date: '2024-01-28',
      },
    ],
    timeSlots: generateDaySlots(),
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Neurologist',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    rating: 4.9,
    reviewCount: 189,
    experience_years: 14,
    consultation_price: 160,
    clinic_online: 'both',
    bio: 'Specializes in neurological disorders and brain health. One of the most experienced neurologists in the region.',
    reviews: [
      {
        id: '1',
        patientName: 'David Lee',
        rating: 5,
        comment: 'Changed my life. Excellent neurologist.',
        date: '2024-02-05',
      },
      {
        id: '2',
        patientName: 'Patricia Harris',
        rating: 5,
        comment: 'Very thorough and caring physician.',
        date: '2024-01-30',
      },
      {
        id: '3',
        patientName: 'Robert Martin',
        rating: 4,
        comment: 'Good doctor, helped with my migraines.',
        date: '2024-01-20',
      },
    ],
    timeSlots: generateDaySlots(),
  },
  {
    id: '4',
    name: 'Dr. James Thompson',
    specialty: 'Dentist',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    rating: 4.6,
    reviewCount: 167,
    experience_years: 11,
    consultation_price: 100,
    clinic_online: 'clinic',
    bio: 'General dentistry with expertise in cosmetic and restorative dental work. Painless procedures guaranteed.',
    reviews: [
      {
        id: '1',
        patientName: 'Jennifer White',
        rating: 5,
        comment: 'My teeth have never looked better!',
        date: '2024-02-03',
      },
      {
        id: '2',
        patientName: 'Kevin Davis',
        rating: 4,
        comment: 'Friendly staff and good service.',
        date: '2024-01-25',
      },
    ],
    timeSlots: generateDaySlots(),
  },
  {
    id: '5',
    name: 'Dr. Lisa Anderson',
    specialty: 'Pediatrician',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    rating: 4.8,
    reviewCount: 178,
    experience_years: 9,
    consultation_price: 110,
    clinic_online: 'both',
    bio: 'Specialized in child health and development. Creates a friendly environment for children.',
    reviews: [
      {
        id: '1',
        patientName: 'Margaret Taylor',
        rating: 5,
        comment: 'My kids love visiting her. Great pediatrician!',
        date: '2024-02-07',
      },
      {
        id: '2',
        patientName: 'Charles Martinez',
        rating: 5,
        comment: 'Very patient and understanding with children.',
        date: '2024-01-22',
      },
    ],
    timeSlots: generateDaySlots(),
  },
  {
    id: '6',
    name: 'Dr. Robert Wilson',
    specialty: 'Therapist',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
    rating: 4.7,
    reviewCount: 156,
    experience_years: 13,
    consultation_price: 130,
    clinic_online: 'both',
    bio: 'Licensed therapist specializing in cognitive behavioral therapy and stress management. Confidential and supportive.',
    reviews: [
      {
        id: '1',
        patientName: 'Nancy Garcia',
        rating: 5,
        comment: 'Really helped me work through my anxiety.',
        date: '2024-02-06',
      },
      {
        id: '2',
        patientName: 'Bruce Robinson',
        rating: 4,
        comment: 'Professional and compassionate.',
        date: '2024-01-28',
      },
    ],
    timeSlots: generateDaySlots(),
  },
  {
    id: '7',
    name: 'Dr. Victoria Clark',
    specialty: 'Gynecologist',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Victoria',
    rating: 4.9,
    reviewCount: 195,
    experience_years: 15,
    consultation_price: 140,
    clinic_online: 'clinic',
    bio: 'Expert in women\'s health with comprehensive reproductive care. Compassionate and experienced.',
    reviews: [
      {
        id: '1',
        patientName: 'Dorothy Rodriguez',
        rating: 5,
        comment: 'Excellent care and attention to detail.',
        date: '2024-02-04',
      },
      {
        id: '2',
        patientName: 'Susan Lewis',
        rating: 5,
        comment: 'Best gynecologist I\'ve had.',
        date: '2024-01-26',
      },
    ],
    timeSlots: generateDaySlots(),
  },
  {
    id: '8',
    name: 'Dr. Christopher Lewis',
    specialty: 'Orthopedist',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Christopher',
    rating: 4.7,
    reviewCount: 163,
    experience_years: 11,
    consultation_price: 135,
    clinic_online: 'clinic',
    bio: 'Specializes in orthopedic surgery and sports medicine. Known for excellent surgical outcomes.',
    reviews: [
      {
        id: '1',
        patientName: 'Daniel Walker',
        rating: 5,
        comment: 'Fixed my knee perfectly. Back to sports!',
        date: '2024-02-02',
      },
      {
        id: '2',
        patientName: 'Karen Hall',
        rating: 4,
        comment: 'Very skilled surgeon.',
        date: '2024-01-24',
      },
    ],
    timeSlots: generateDaySlots(),
  },
  {
    id: '9',
    name: 'Dr. Patricia Moore',
    specialty: 'Cardiologist',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Patricia',
    rating: 4.8,
    reviewCount: 152,
    experience_years: 13,
    consultation_price: 155,
    clinic_online: 'both',
    bio: 'Leading cardiologist with expertise in heart disease prevention and treatment.',
    reviews: [
      {
        id: '1',
        patientName: 'Steven Allen',
        rating: 5,
        comment: 'Saved my life. Highly recommended.',
        date: '2024-02-01',
      },
      {
        id: '2',
        patientName: 'Angela Young',
        rating: 5,
        comment: 'Thorough and professional.',
        date: '2024-01-27',
      },
    ],
    timeSlots: generateDaySlots(),
  },
  {
    id: '10',
    name: 'Dr. Kevin Taylor',
    specialty: 'Dermatologist',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kevin',
    rating: 4.6,
    reviewCount: 138,
    experience_years: 9,
    consultation_price: 118,
    clinic_online: 'clinic',
    bio: 'Skin care specialist with advanced knowledge of dermatological conditions.',
    reviews: [
      {
        id: '1',
        patientName: 'Rebecca King',
        rating: 4,
        comment: 'Good treatment, fair pricing.',
        date: '2024-01-31',
      },
      {
        id: '2',
        patientName: 'Ronald Jackson',
        rating: 4,
        comment: 'Professional and knowledgeable.',
        date: '2024-01-23',
      },
    ],
    timeSlots: generateDaySlots(),
  },
  {
    id: '11',
    name: 'Dr. Helen White',
    specialty: 'Neurologist',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Helen',
    rating: 4.7,
    reviewCount: 171,
    experience_years: 12,
    consultation_price: 158,
    clinic_online: 'both',
    bio: 'Neurology specialist with research background. Offers personalized treatment plans.',
    reviews: [
      {
        id: '1',
        patientName: 'Anthony Harris',
        rating: 5,
        comment: 'Excellent diagnosis and treatment.',
        date: '2024-01-29',
      },
      {
        id: '2',
        patientName: 'Maria Martin',
        rating: 4,
        comment: 'Very helpful and professional.',
        date: '2024-01-21',
      },
    ],
    timeSlots: generateDaySlots(),
  },
  {
    id: '12',
    name: 'Dr. George Thompson',
    specialty: 'Dentist',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=George',
    rating: 4.5,
    reviewCount: 145,
    experience_years: 10,
    consultation_price: 105,
    clinic_online: 'clinic',
    bio: 'Experienced dentist offering comprehensive dental services from routine cleaning to advanced procedures.',
    reviews: [
      {
        id: '1',
        patientName: 'Barbara Garcia',
        rating: 4,
        comment: 'Good service and friendly staff.',
        date: '2024-01-30',
      },
      {
        id: '2',
        patientName: 'Mark Rodriguez',
        rating: 4,
        comment: 'Professional dentist.',
        date: '2024-01-19',
      },
    ],
    timeSlots: generateDaySlots(),
  },
];

export const specialties: Specialty[] = [
  {
    id: '1',
    name: 'Cardiologist',
    icon: 'Heart',
    description: 'Heart and cardiovascular health',
    doctorCount: 2,
  },
  {
    id: '2',
    name: 'Dermatologist',
    icon: 'Droplet',
    description: 'Skin care and skin conditions',
    doctorCount: 2,
  },
  {
    id: '3',
    name: 'Neurologist',
    icon: 'Brain',
    description: 'Brain and nervous system',
    doctorCount: 2,
  },
  {
    id: '4',
    name: 'Dentist',
    icon: 'Smile',
    description: 'Dental health and teeth care',
    doctorCount: 2,
  },
  {
    id: '5',
    name: 'Pediatrician',
    icon: 'Baby',
    description: 'Child health and development',
    doctorCount: 1,
  },
  {
    id: '6',
    name: 'Therapist',
    icon: 'User',
    description: 'Mental health and counseling',
    doctorCount: 1,
  },
  {
    id: '7',
    name: 'Gynecologist',
    icon: 'Heart',
    description: 'Women\'s health care',
    doctorCount: 1,
  },
  {
    id: '8',
    name: 'Orthopedist',
    icon: 'Bone',
    description: 'Bone and joint health',
    doctorCount: 1,
  },
];
