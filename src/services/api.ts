import {
  ClassSession,
  Booking,
  Inquiry,
  UserProfile,
  AdminStats,
} from '../types';
import { INITIAL_CLASSES, INITIAL_USER_PROFILE } from '../data/initialData';

const STORAGE_KEYS = {
  CLASSES: 'kinetiq_classes_v1',
  BOOKINGS: 'kinetiq_bookings_v1',
  USER_PROFILE: 'kinetiq_profile_v1',
  INQUIRIES: 'kinetiq_inquiries_v1',
};

// Local storage fallback helpers
function getStored<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setStored<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }
}

export const api = {
  async getClasses(): Promise<ClassSession[]> {
    try {
      const res = await fetch('/api/classes');
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setStored(STORAGE_KEYS.CLASSES, json.data);
          return json.data;
        }
      }
    } catch {
      // Fallback
    }
    return getStored(STORAGE_KEYS.CLASSES, INITIAL_CLASSES);
  },

  async createClass(newClass: Partial<ClassSession>): Promise<ClassSession> {
    const classObj: ClassSession = {
      id: `cls-${Date.now()}`,
      title: newClass.title || 'Special Workshop',
      format: newClass.format || 'S&C',
      trainer: newClass.trainer || 'Marcus Vance',
      center: newClass.center || 'Downtown Central Arena',
      time: newClass.time || '07:00 AM',
      date: newClass.date || 'Today',
      duration: newClass.duration || 50,
      calories: newClass.calories || 480,
      intensity: newClass.intensity || 'High',
      totalSpots: newClass.totalSpots || 24,
      bookedSpots: 0,
      level: newClass.level || 'All Levels',
      description: newClass.description || 'Special fitness session.',
    };

    try {
      const res = await fetch('/api/classes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(classObj),
      });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // local fallback
    }

    const current = getStored(STORAGE_KEYS.CLASSES, INITIAL_CLASSES);
    const updated = [classObj, ...current];
    setStored(STORAGE_KEYS.CLASSES, updated);
    return classObj;
  },

  async deleteClass(id: string): Promise<void> {
    try {
      await fetch(`/api/classes/${id}`, { method: 'DELETE' });
    } catch {
      // ignore
    }
    const current = getStored(STORAGE_KEYS.CLASSES, INITIAL_CLASSES);
    setStored(STORAGE_KEYS.CLASSES, current.filter(c => c.id !== id));
  },

  async getBookings(): Promise<Booking[]> {
    try {
      const res = await fetch('/api/bookings');
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setStored(STORAGE_KEYS.BOOKINGS, json.data);
          return json.data;
        }
      }
    } catch {
      // ignore
    }
    return getStored<Booking[]>(STORAGE_KEYS.BOOKINGS, [
      {
        id: 'bk-101',
        classId: 'cls-1',
        classTitle: 'S&C: Heavy Barbell & Core Blast',
        format: 'S&C',
        trainer: 'Marcus Vance',
        center: 'Downtown Central Arena',
        date: 'Today',
        time: '06:30 AM',
        bookedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        status: 'confirmed',
        passCode: 'KNQ-7824',
      },
    ]);
  },

  async createBooking(targetClass: ClassSession): Promise<Booking> {
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ classId: targetClass.id }),
      });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // ignore
    }

    const newBooking: Booking = {
      id: `bk-${Date.now()}`,
      classId: targetClass.id,
      classTitle: targetClass.title,
      format: targetClass.format,
      trainer: targetClass.trainer,
      center: targetClass.center,
      date: targetClass.date,
      time: targetClass.time,
      bookedAt: new Date().toISOString(),
      status: 'confirmed',
      passCode: `KNQ-${Math.floor(1000 + Math.random() * 9000)}`,
    };

    const currentBookings = getStored<Booking[]>(STORAGE_KEYS.BOOKINGS, []);
    setStored(STORAGE_KEYS.BOOKINGS, [newBooking, ...currentBookings]);

    // Update local class booked spots
    const currentClasses = getStored<ClassSession[]>(STORAGE_KEYS.CLASSES, INITIAL_CLASSES);
    const updatedClasses = currentClasses.map(c =>
      c.id === targetClass.id ? { ...c, bookedSpots: c.bookedSpots + 1 } : c
    );
    setStored(STORAGE_KEYS.CLASSES, updatedClasses);

    return newBooking;
  },

  async cancelBooking(bookingId: string, classId?: string): Promise<void> {
    try {
      await fetch(`/api/bookings/${bookingId}`, { method: 'DELETE' });
    } catch {
      // ignore
    }

    const currentBookings = getStored<Booking[]>(STORAGE_KEYS.BOOKINGS, []);
    setStored(
      STORAGE_KEYS.BOOKINGS,
      currentBookings.filter(b => b.id !== bookingId)
    );

    if (classId) {
      const currentClasses = getStored<ClassSession[]>(STORAGE_KEYS.CLASSES, INITIAL_CLASSES);
      const updatedClasses = currentClasses.map(c =>
        c.id === classId && c.bookedSpots > 0
          ? { ...c, bookedSpots: c.bookedSpots - 1 }
          : c
      );
      setStored(STORAGE_KEYS.CLASSES, updatedClasses);
    }
  },

  async getUserProfile(): Promise<UserProfile> {
    try {
      const res = await fetch('/api/user-profile');
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setStored(STORAGE_KEYS.USER_PROFILE, json.data);
          return json.data;
        }
      }
    } catch {
      // ignore
    }
    return getStored(STORAGE_KEYS.USER_PROFILE, INITIAL_USER_PROFILE);
  },

  async updateUserProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    try {
      const res = await fetch('/api/user-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        const json = await res.json();
        setStored(STORAGE_KEYS.USER_PROFILE, json.data);
        return json.data;
      }
    } catch {
      // ignore
    }
    const current = getStored(STORAGE_KEYS.USER_PROFILE, INITIAL_USER_PROFILE);
    const updated = { ...current, ...updates };
    setStored(STORAGE_KEYS.USER_PROFILE, updated);
    return updated;
  },

  async logWorkout(caloriesBurned: number): Promise<UserProfile> {
    try {
      const res = await fetch('/api/user-profile/log-workout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caloriesBurned }),
      });
      if (res.ok) {
        const json = await res.json();
        setStored(STORAGE_KEYS.USER_PROFILE, json.data);
        return json.data;
      }
    } catch {
      // ignore
    }
    const current = getStored(STORAGE_KEYS.USER_PROFILE, INITIAL_USER_PROFILE);
    const updated = {
      ...current,
      workoutsCompleted: current.workoutsCompleted + 1,
      streakDays: current.streakDays + 1,
      totalCaloriesBurned: current.totalCaloriesBurned + caloriesBurned,
    };
    setStored(STORAGE_KEYS.USER_PROFILE, updated);
    return updated;
  },

  async getInquiries(): Promise<Inquiry[]> {
    try {
      const res = await fetch('/api/inquiries');
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setStored(STORAGE_KEYS.INQUIRIES, json.data);
          return json.data;
        }
      }
    } catch {
      // ignore
    }
    return getStored<Inquiry[]>(STORAGE_KEYS.INQUIRIES, [
      {
        id: 'inq-1',
        name: 'Sarah Connor',
        email: 'sarah.c@techcorp.io',
        phone: '+1 (555) 349-2810',
        city: 'New York, NY',
        interest: 'Corporate Wellness Pass',
        message: 'Interested in team memberships for 65 engineering employees.',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        status: 'new',
      },
    ]);
  },

  async submitInquiry(data: Omit<Inquiry, 'id' | 'createdAt' | 'status'>): Promise<Inquiry> {
    const inquiry: Inquiry = {
      id: `inq-${Date.now()}`,
      ...data,
      createdAt: new Date().toISOString(),
      status: 'new',
    };

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // ignore
    }

    const current = getStored<Inquiry[]>(STORAGE_KEYS.INQUIRIES, []);
    setStored(STORAGE_KEYS.INQUIRIES, [inquiry, ...current]);
    return inquiry;
  },

  async updateInquiryStatus(id: string, status: Inquiry['status']): Promise<void> {
    try {
      await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
    } catch {
      // ignore
    }
    const current = getStored<Inquiry[]>(STORAGE_KEYS.INQUIRIES, []);
    setStored(
      STORAGE_KEYS.INQUIRIES,
      current.map(item => (item.id === id ? { ...item, status } : item))
    );
  },

  async getAdminStats(): Promise<AdminStats> {
    try {
      const res = await fetch('/api/stats');
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // ignore
    }
    return {
      activeMembersCount: 14820,
      todayWorkoutsBooked: 138,
      occupancyRate: 84,
      centersOperational: 12,
      activeTrainers: 48,
      monthlyRevenue: '$284,500',
    };
  },
};
