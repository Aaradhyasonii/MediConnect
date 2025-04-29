import { Doctor, Appointment } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Wilson',
    specialty: 'Cardiology',
    image: 'https://images.pexels.com/photos/5214958/pexels-photo-5214958.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    reviewCount: 124,
    availability: {
      days: ['Monday', 'Tuesday', 'Thursday'],
      hours: '9:00 AM - 5:00 PM'
    },
    experience: 12,
    bio: 'Dr. Wilson is a board-certified cardiologist with over 12 years of experience in treating various heart conditions. She specializes in preventive cardiology and heart failure management.'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Dermatology',
    image: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    reviewCount: 98,
    availability: {
      days: ['Monday', 'Wednesday', 'Friday'],
      hours: '10:00 AM - 6:00 PM'
    },
    experience: 8,
    bio: 'Dr. Chen is a renowned dermatologist who specializes in cosmetic dermatology and skin cancer treatment. He is known for his patient-centered approach and innovative treatments.'
  },
  {
    id: '3',
    name: 'Dr. Jessica Patel',
    specialty: 'Pediatrics',
    image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    reviewCount: 156,
    availability: {
      days: ['Tuesday', 'Thursday', 'Saturday'],
      hours: '8:00 AM - 4:00 PM'
    },
    experience: 15,
    bio: 'Dr. Patel is a compassionate pediatrician with 15 years of experience. She specializes in newborn care, childhood development, and adolescent medicine.'
  },
  {
    id: '4',
    name: 'Dr. Robert Johnson',
    specialty: 'Orthopedics',
    image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.7,
    reviewCount: 87,
    availability: {
      days: ['Monday', 'Wednesday', 'Friday'],
      hours: '9:00 AM - 5:00 PM'
    },
    experience: 10,
    bio: 'Dr. Johnson is an orthopedic surgeon specializing in sports medicine and joint replacement. He has worked with professional athletes and uses the latest minimally invasive techniques.'
  }
];

export const upcomingAppointments: Appointment[] = [
  {
    id: uuidv4(),
    doctorId: '1',
    patientName: 'John Doe',
    date: '2025-08-15',
    time: '10:00 AM',
    status: 'upcoming',
    symptoms: ['Chest pain', 'Shortness of breath'],
    notes: 'Follow-up appointment after medication adjustment'
  },
  {
    id: uuidv4(),
    doctorId: '3',
    patientName: 'Emily Smith',
    date: '2025-08-18',
    time: '2:30 PM',
    status: 'upcoming',
    symptoms: ['Fever', 'Cough'],
    notes: 'Annual check-up'
  }
];

export const commonSymptoms = [
  'Headache',
  'Fever',
  'Cough',
  'Sore throat',
  'Fatigue',
  'Nausea',
  'Dizziness',
  'Chest pain',
  'Shortness of breath',
  'Back pain',
  'Joint pain',
  'Rash',
  'Abdominal pain',
  'Diarrhea',
  'Vomiting'
];

export const specialties = [
  'Cardiology',
  'Dermatology',
  'Endocrinology',
  'Gastroenterology',
  'Neurology',
  'Obstetrics & Gynecology',
  'Oncology',
  'Ophthalmology',
  'Orthopedics',
  'Pediatrics',
  'Psychiatry',
  'Pulmonology',
  'Rheumatology',
  'Urology'
];