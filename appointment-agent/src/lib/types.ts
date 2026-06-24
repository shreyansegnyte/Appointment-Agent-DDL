// Shared TypeScript types for the Appointment Agent system

export interface Profile {
  id: string;
  name: string;
  age: number;
  occupation: string;
  location: string;
  shortDescription: string;
  avatar: string; // emoji for now
  accentColor: string;
  accentColorLight: string;
  accentGradient: string;
  fullContext: string; // Rich personality context sent to the AI
  schedulingPreferences: SchedulingPreferences;
  appointmentPreferences: AppointmentPreference[];
}

export interface SchedulingPreferences {
  preferredTimeBlocks: TimeBlock[];
  avoidDays: number[]; // 0=Sunday, 6=Saturday
  avoidTimeRanges: TimeBlock[];
  maxAppointmentsPerDay: number;
  minGapBetweenAppointments: number; // minutes
  preferredAppointmentDuration: number; // minutes, default
  bufferBeforeAppointment: number; // minutes
  bufferAfterAppointment: number; // minutes
  willingnessToReschedule: number; // 0-1 scale
  priorityOrder: AppointmentCategory[];
}

export interface TimeBlock {
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  label?: string;
}

export interface AppointmentPreference {
  type: AppointmentType;
  frequency: RecurrenceFrequency;
  frequencyValue: number; // e.g., every 2 weeks
  preferredDuration: number; // minutes
  priority: 'critical' | 'high' | 'medium' | 'low';
  flexibility: number; // 0-1 scale, how easily it can be moved
  preferredDayOfWeek?: number; // 0-6
  preferredTimeOfDay?: 'morning' | 'afternoon' | 'evening';
  notes?: string;
}

export type AppointmentCategory = 'medical' | 'personal' | 'professional' | 'household';

export type AppointmentType =
  // Medical
  | 'doctor_annual'
  | 'dentist_cleaning'
  | 'dermatologist'
  | 'eye_exam'
  | 'therapy'
  | 'pediatrician'
  | 'physical_therapy'
  // Personal
  | 'haircut'
  | 'gym_trainer'
  | 'massage_spa'
  | 'meditation_class'
  | 'hobby_class'
  // Professional
  | 'financial_advisor'
  | 'networking_lunch'
  | 'career_coach'
  | 'mentor_meeting'
  | 'team_standup'
  // Household
  | 'vet'
  | 'car_maintenance'
  | 'home_cleaning'
  | 'plumber_electrician'
  | 'grocery_delivery';

export type RecurrenceFrequency = 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'bimonthly' | 'quarterly' | 'biannual' | 'annual';

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: AppointmentType;
  category: AppointmentCategory;
  isAgentScheduled: boolean;
  isRecurring: boolean;
  recurrenceId?: string; // groups recurring events
  agentReasoning?: AgentReasoning;
  profileId: string;
  color?: string;
}

export interface AgentReasoning {
  reasoning: string;
  renewalDecision: boolean;
  renewalReasoning: string;
  nextOccurrence: string | null;
  confidenceScore: number;
  alternativesConsidered: string;
  factors: string[];
}

export interface AgentDecision {
  appointmentType: AppointmentType;
  title: string;
  scheduledDate: string; // ISO date
  scheduledTime: string; // HH:mm
  duration: number; // minutes
  reasoning: string;
  renewalDecision: boolean;
  renewalReasoning: string;
  nextOccurrence: string | null;
  confidenceScore: number;
  alternativesConsidered: string;
  factors: string[];
}

export interface AgentResponse {
  profileId: string;
  decisions: AgentDecision[];
  summary: string;
}

export const APPOINTMENT_LABELS: Record<AppointmentType, string> = {
  doctor_annual: 'Annual Physical',
  dentist_cleaning: 'Dental Cleaning',
  dermatologist: 'Dermatologist Visit',
  eye_exam: 'Eye Exam',
  therapy: 'Therapy Session',
  pediatrician: 'Pediatrician',
  physical_therapy: 'Physical Therapy',
  haircut: 'Haircut',
  gym_trainer: 'Personal Training',
  massage_spa: 'Massage / Spa',
  meditation_class: 'Meditation Class',
  hobby_class: 'Hobby Class',
  financial_advisor: 'Financial Advisor',
  networking_lunch: 'Networking Lunch',
  career_coach: 'Career Coach',
  mentor_meeting: 'Mentor Meeting',
  team_standup: 'Team Standup',
  vet: 'Vet Appointment',
  car_maintenance: 'Car Maintenance',
  home_cleaning: 'Home Cleaning',
  plumber_electrician: 'Plumber / Electrician',
  grocery_delivery: 'Grocery Delivery',
};

export const CATEGORY_COLORS: Record<AppointmentCategory, string> = {
  medical: '#4ea8de',
  personal: '#48bfa0',
  professional: '#a78bfa',
  household: '#f5a623',
};

export const CATEGORY_LABELS: Record<AppointmentCategory, string> = {
  medical: 'Medical',
  personal: 'Personal',
  professional: 'Professional',
  household: 'Household',
};
