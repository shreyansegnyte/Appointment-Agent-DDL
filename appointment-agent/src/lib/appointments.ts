import { AppointmentType, AppointmentCategory, RecurrenceFrequency } from './types';

export interface AppointmentTypeInfo {
  type: AppointmentType;
  category: AppointmentCategory;
  label: string;
  defaultDuration: number; // minutes
  defaultFrequency: RecurrenceFrequency;
  urgencyLevel: number; // 1-5
  flexibilityScore: number; // 0-1
  description: string;
  icon: string;
}

export const appointmentTypes: AppointmentTypeInfo[] = [
  // ── MEDICAL ──────────────────────────────────────────
  {
    type: 'doctor_annual',
    category: 'medical',
    label: 'Annual Physical',
    defaultDuration: 60,
    defaultFrequency: 'annual',
    urgencyLevel: 4,
    flexibilityScore: 0.3,
    description: 'Comprehensive annual health checkup with primary care physician',
    icon: '🩺',
  },
  {
    type: 'dentist_cleaning',
    category: 'medical',
    label: 'Dental Cleaning',
    defaultDuration: 60,
    defaultFrequency: 'biannual',
    urgencyLevel: 3,
    flexibilityScore: 0.5,
    description: 'Routine dental cleaning and oral examination',
    icon: '🦷',
  },
  {
    type: 'dermatologist',
    category: 'medical',
    label: 'Dermatologist',
    defaultDuration: 45,
    defaultFrequency: 'quarterly',
    urgencyLevel: 3,
    flexibilityScore: 0.4,
    description: 'Skin examination and screening',
    icon: '🔬',
  },
  {
    type: 'eye_exam',
    category: 'medical',
    label: 'Eye Exam',
    defaultDuration: 45,
    defaultFrequency: 'annual',
    urgencyLevel: 2,
    flexibilityScore: 0.6,
    description: 'Comprehensive vision and eye health examination',
    icon: '👁️',
  },
  {
    type: 'therapy',
    category: 'medical',
    label: 'Therapy Session',
    defaultDuration: 50,
    defaultFrequency: 'biweekly',
    urgencyLevel: 4,
    flexibilityScore: 0.2,
    description: 'Mental health counseling / psychotherapy session',
    icon: '🧠',
  },
  {
    type: 'pediatrician',
    category: 'medical',
    label: 'Pediatrician Visit',
    defaultDuration: 45,
    defaultFrequency: 'biannual',
    urgencyLevel: 5,
    flexibilityScore: 0.1,
    description: 'Child health checkup and developmental screening',
    icon: '👶',
  },
  {
    type: 'physical_therapy',
    category: 'medical',
    label: 'Physical Therapy',
    defaultDuration: 45,
    defaultFrequency: 'weekly',
    urgencyLevel: 4,
    flexibilityScore: 0.3,
    description: 'Physical rehabilitation and therapeutic exercises',
    icon: '🏋️',
  },

  // ── PERSONAL ─────────────────────────────────────────
  {
    type: 'haircut',
    category: 'personal',
    label: 'Haircut',
    defaultDuration: 45,
    defaultFrequency: 'monthly',
    urgencyLevel: 1,
    flexibilityScore: 0.8,
    description: 'Hair styling and grooming appointment',
    icon: '💇',
  },
  {
    type: 'gym_trainer',
    category: 'personal',
    label: 'Personal Training',
    defaultDuration: 60,
    defaultFrequency: 'weekly',
    urgencyLevel: 2,
    flexibilityScore: 0.6,
    description: 'Guided workout session with personal trainer',
    icon: '💪',
  },
  {
    type: 'massage_spa',
    category: 'personal',
    label: 'Massage / Spa',
    defaultDuration: 60,
    defaultFrequency: 'monthly',
    urgencyLevel: 2,
    flexibilityScore: 0.7,
    description: 'Therapeutic massage or spa treatment',
    icon: '💆',
  },
  {
    type: 'meditation_class',
    category: 'personal',
    label: 'Meditation Class',
    defaultDuration: 60,
    defaultFrequency: 'weekly',
    urgencyLevel: 2,
    flexibilityScore: 0.5,
    description: 'Group or guided meditation session',
    icon: '🧘',
  },
  {
    type: 'hobby_class',
    category: 'personal',
    label: 'Hobby Class',
    defaultDuration: 60,
    defaultFrequency: 'weekly',
    urgencyLevel: 1,
    flexibilityScore: 0.7,
    description: 'Recreational class (dance, art, music, etc.)',
    icon: '🎨',
  },

  // ── PROFESSIONAL ─────────────────────────────────────
  {
    type: 'financial_advisor',
    category: 'professional',
    label: 'Financial Advisor',
    defaultDuration: 60,
    defaultFrequency: 'quarterly',
    urgencyLevel: 2,
    flexibilityScore: 0.5,
    description: 'Financial planning and investment review',
    icon: '💰',
  },
  {
    type: 'networking_lunch',
    category: 'professional',
    label: 'Networking Lunch',
    defaultDuration: 75,
    defaultFrequency: 'weekly',
    urgencyLevel: 3,
    flexibilityScore: 0.3,
    description: 'Professional networking over a meal',
    icon: '🤝',
  },
  {
    type: 'career_coach',
    category: 'professional',
    label: 'Career Coach',
    defaultDuration: 60,
    defaultFrequency: 'monthly',
    urgencyLevel: 2,
    flexibilityScore: 0.5,
    description: 'Career development and coaching session',
    icon: '📈',
  },
  {
    type: 'mentor_meeting',
    category: 'professional',
    label: 'Mentor Meeting',
    defaultDuration: 45,
    defaultFrequency: 'biweekly',
    urgencyLevel: 3,
    flexibilityScore: 0.3,
    description: 'Meeting with professional mentor',
    icon: '🎓',
  },
  {
    type: 'team_standup',
    category: 'professional',
    label: 'Team Standup',
    defaultDuration: 15,
    defaultFrequency: 'daily',
    urgencyLevel: 5,
    flexibilityScore: 0.1,
    description: 'Daily team synchronization meeting',
    icon: '📋',
  },

  // ── HOUSEHOLD ────────────────────────────────────────
  {
    type: 'vet',
    category: 'household',
    label: 'Vet Appointment',
    defaultDuration: 45,
    defaultFrequency: 'biannual',
    urgencyLevel: 3,
    flexibilityScore: 0.4,
    description: 'Pet veterinary checkup and vaccinations',
    icon: '🐾',
  },
  {
    type: 'car_maintenance',
    category: 'household',
    label: 'Car Maintenance',
    defaultDuration: 60,
    defaultFrequency: 'quarterly',
    urgencyLevel: 2,
    flexibilityScore: 0.7,
    description: 'Vehicle service, oil change, or inspection',
    icon: '🚗',
  },
  {
    type: 'home_cleaning',
    category: 'household',
    label: 'Home Cleaning',
    defaultDuration: 180,
    defaultFrequency: 'biweekly',
    urgencyLevel: 2,
    flexibilityScore: 0.4,
    description: 'Professional home cleaning service',
    icon: '🏠',
  },
  {
    type: 'plumber_electrician',
    category: 'household',
    label: 'Plumber / Electrician',
    defaultDuration: 120,
    defaultFrequency: 'annual',
    urgencyLevel: 3,
    flexibilityScore: 0.3,
    description: 'Home repair and maintenance service call',
    icon: '🔧',
  },
  {
    type: 'grocery_delivery',
    category: 'household',
    label: 'Grocery Delivery',
    defaultDuration: 30,
    defaultFrequency: 'weekly',
    urgencyLevel: 2,
    flexibilityScore: 0.5,
    description: 'Scheduled grocery delivery window',
    icon: '🛒',
  },
];

export function getAppointmentInfo(type: AppointmentType): AppointmentTypeInfo | undefined {
  return appointmentTypes.find((a) => a.type === type);
}

export function getAppointmentsByCategory(category: AppointmentCategory): AppointmentTypeInfo[] {
  return appointmentTypes.filter((a) => a.category === category);
}

export function getRecurrenceLabel(frequency: RecurrenceFrequency): string {
  const labels: Record<RecurrenceFrequency, string> = {
    daily: 'Daily',
    weekly: 'Weekly',
    biweekly: 'Every 2 weeks',
    monthly: 'Monthly',
    bimonthly: 'Every 2 months',
    quarterly: 'Every 3 months',
    biannual: 'Every 6 months',
    annual: 'Annually',
  };
  return labels[frequency];
}

export function getRecurrenceDays(frequency: RecurrenceFrequency): number {
  const days: Record<RecurrenceFrequency, number> = {
    daily: 1,
    weekly: 7,
    biweekly: 14,
    monthly: 30,
    bimonthly: 60,
    quarterly: 91,
    biannual: 182,
    annual: 365,
  };
  return days[frequency];
}
