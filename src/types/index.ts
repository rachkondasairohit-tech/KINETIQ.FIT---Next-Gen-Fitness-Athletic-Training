export type PageId =
  | 'home'
  | 'programs'
  | 'trainers'
  | 'memberships'
  | 'facilities'
  | 'about'
  | 'contact'
  | 'dashboard'
  | 'admin';

export type WorkoutFormat =
  | 'S&C'
  | 'Dance'
  | 'Boxing'
  | 'HRX'
  | 'Yoga'
  | 'Pilates'
  | 'Cult Play';

export interface ClassSession {
  id: string;
  title: string;
  format: WorkoutFormat;
  trainer: string;
  trainerAvatar?: string;
  center: string;
  time: string;
  date: string;
  duration: number; // in mins
  calories: number;
  intensity: 'Medium' | 'High' | 'Extreme';
  totalSpots: number;
  bookedSpots: number;
  level: string;
  description?: string;
}

export interface Booking {
  id: string;
  classId: string;
  classTitle: string;
  format: WorkoutFormat;
  trainer: string;
  center: string;
  date: string;
  time: string;
  bookedAt: string;
  status: 'confirmed' | 'attended' | 'cancelled';
  passCode: string;
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  specialty: string;
  formats: WorkoutFormat[];
  experienceYears: number;
  certifications: string[];
  bio: string;
  rating: number;
  sessionsLed: number;
  imageUrl: string;
}

export interface FacilityCenter {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  timings: string;
  sqft: number;
  features: string[];
  amenities: string[];
  imageUrl: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  badge?: string;
  tagline: string;
  pricing: {
    monthly: number;
    quarterly: number;
    annual: number;
  };
  features: string[];
  highlight: boolean;
  colorScheme: string;
}

export interface UserProfile {
  name: string;
  email: string;
  memberTier: string;
  expiryDate: string;
  membershipId: string;
  streakDays: number;
  workoutsCompleted: number;
  totalCaloriesBurned: number;
  weightKg: number;
  targetWeightKg: number;
  heightCm: number;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  interest: string;
  message: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'resolved';
}

export interface AdminStats {
  activeMembersCount: number;
  todayWorkoutsBooked: number;
  occupancyRate: number;
  centersOperational: number;
  activeTrainers: number;
  monthlyRevenue: string;
}
