export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  rating: number;
  reviewCount: number;
  availability: {
    days: string[];
    hours: string;
  };
  experience: number;
  bio: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientName: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  symptoms?: string[];
  notes?: string;
}

export interface SymptomCheckerResult {
  possibleConditions: Array<{
    name: string;
    probability: number;
    urgency: 'low' | 'medium' | 'high';
  }>;
  recommendedSpecialists: string[];
  suggestedActions: string[];
}