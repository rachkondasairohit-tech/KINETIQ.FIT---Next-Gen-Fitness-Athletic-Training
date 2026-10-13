import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import {
  PageId,
  ClassSession,
  Booking,
  Trainer,
  FacilityCenter,
  MembershipPlan,
  UserProfile,
  Inquiry,
  AdminStats,
} from '../types';
import {
  INITIAL_CLASSES,
  TRAINERS,
  CENTERS,
  MEMBERSHIP_PLANS,
  INITIAL_USER_PROFILE,
} from '../data/initialData';
import { api } from '../services/api';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface ModalState {
  type: 'booking' | 'checkout' | 'logWorkout' | 'newClass' | null;
  data?: any;
}

interface FitnessContextType {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  classes: ClassSession[];
  bookings: Booking[];
  trainers: Trainer[];
  centers: FacilityCenter[];
  membershipPlans: MembershipPlan[];
  userProfile: UserProfile;
  inquiries: Inquiry[];
  adminStats: AdminStats;
  modal: ModalState;
  toast: Toast | null;
  loading: boolean;
  bookClass: (classItem: ClassSession) => Promise<boolean>;
  cancelBooking: (bookingId: string, classId?: string) => Promise<void>;
  logWorkout: (calories: number) => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  createClass: (newClass: Partial<ClassSession>) => Promise<void>;
  removeClass: (classId: string) => Promise<void>;
  sendInquiry: (data: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => Promise<boolean>;
  updateInquiryStatus: (id: string, status: Inquiry['status']) => Promise<void>;
  openBookingModal: (classItem: ClassSession) => void;
  openCheckoutModal: (plan?: MembershipPlan) => void;
  openModal: (type: ModalState['type'], data?: any) => void;
  closeModal: () => void;
  showToast: (message: string, type?: Toast['type']) => void;
  activatePlan: (planName: string) => void;
}

const FitnessContext = createContext<FitnessContextType | undefined>(undefined);

export const FitnessProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [classes, setClasses] = useState<ClassSession[]>(INITIAL_CLASSES);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [trainers] = useState<Trainer[]>(TRAINERS);
  const [centers] = useState<FacilityCenter[]>(CENTERS);
  const [membershipPlans] = useState<MembershipPlan[]>(MEMBERSHIP_PLANS);
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [adminStats, setAdminStats] = useState<AdminStats>({
    activeMembersCount: 14820,
    todayWorkoutsBooked: 138,
    occupancyRate: 84,
    centersOperational: 12,
    activeTrainers: 48,
    monthlyRevenue: '$284,500',
  });
  const [modal, setModal] = useState<ModalState>({ type: null });
  const [toast, setToast] = useState<Toast | null>(null);
  const [loading, setLoading] = useState(false);

  // Sync initial data from API
  useEffect(() => {
    async function initData() {
      try {
        const [loadedClasses, loadedBookings, loadedProfile, loadedInquiries, loadedStats] =
          await Promise.all([
            api.getClasses(),
            api.getBookings(),
            api.getUserProfile(),
            api.getInquiries(),
            api.getAdminStats(),
          ]);

        setClasses(loadedClasses);
        setBookings(loadedBookings);
        setUserProfile(loadedProfile);
        setInquiries(loadedInquiries);
        setAdminStats(loadedStats);
      } catch (err) {
        console.warn('Initialization using local defaults:', err);
      }
    }
    initData();
  }, []);

  const showToast = (message: string, type: Toast['type'] = 'success') => {
    const id = `${Date.now()}`;
    setToast({ id, message, type });
    setTimeout(() => {
      setToast(curr => (curr?.id === id ? null : curr));
    }, 3800);
  };

  const bookClass = async (classItem: ClassSession): Promise<boolean> => {
    if (classItem.bookedSpots >= classItem.totalSpots) {
      showToast('Class is currently fully booked!', 'error');
      return false;
    }

    // Check if already booked
    const existing = bookings.find(
      b => b.classId === classItem.id && b.status === 'confirmed'
    );
    if (existing) {
      showToast('You have already reserved a spot in this workout!', 'info');
      return false;
    }

    try {
      const newBooking = await api.createBooking(classItem);
      setBookings(prev => [newBooking, ...prev]);
      setClasses(prev =>
        prev.map(c =>
          c.id === classItem.id ? { ...c, bookedSpots: c.bookedSpots + 1 } : c
        )
      );
      setAdminStats(prev => ({
        ...prev,
        todayWorkoutsBooked: prev.todayWorkoutsBooked + 1,
      }));
      showToast(`Workout Confirmed! Pass Code: ${newBooking.passCode}`, 'success');
      return true;
    } catch {
      showToast('Could not complete booking. Please try again.', 'error');
      return false;
    }
  };

  const cancelBooking = async (bookingId: string, classId?: string) => {
    await api.cancelBooking(bookingId, classId);
    setBookings(prev => prev.filter(b => b.id !== bookingId));
    if (classId) {
      setClasses(prev =>
        prev.map(c =>
          c.id === classId && c.bookedSpots > 0
            ? { ...c, bookedSpots: c.bookedSpots - 1 }
            : c
        )
      );
    }
    showToast('Session cancelled. Slot returned to member pool.', 'info');
  };

  const logWorkout = async (calories: number) => {
    const updated = await api.logWorkout(calories);
    setUserProfile(updated);
    showToast(`Session logged! +${calories} kcal burned. Streak extended! 🔥`, 'success');
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    const updated = await api.updateUserProfile(updates);
    setUserProfile(updated);
    showToast('Profile updated successfully', 'success');
  };

  const createClass = async (newClass: Partial<ClassSession>) => {
    const created = await api.createClass(newClass);
    setClasses(prev => [created, ...prev]);
    showToast(`New class "${created.title}" scheduled!`, 'success');
  };

  const removeClass = async (classId: string) => {
    await api.deleteClass(classId);
    setClasses(prev => prev.filter(c => c.id !== classId));
    showToast('Class session removed from schedule', 'info');
  };

  const sendInquiry = async (data: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => {
    try {
      const created = await api.submitInquiry(data);
      setInquiries(prev => [created, ...prev]);
      showToast('Inquiry sent! A Kinetiq fitness manager will reach out shortly.', 'success');
      return true;
    } catch {
      showToast('Failed to send inquiry. Please try again.', 'error');
      return false;
    }
  };

  const updateInquiryStatus = async (id: string, status: Inquiry['status']) => {
    await api.updateInquiryStatus(id, status);
    setInquiries(prev =>
      prev.map(inq => (inq.id === id ? { ...inq, status } : inq))
    );
    showToast(`Inquiry marked as ${status}`, 'info');
  };

  const openBookingModal = (classItem: ClassSession) => {
    setModal({ type: 'booking', data: classItem });
  };

  const openCheckoutModal = (plan?: MembershipPlan) => {
    setModal({ type: 'checkout', data: plan || membershipPlans[0] });
  };

  const openModal = (type: ModalState['type'], data?: any) => {
    setModal({ type, data });
  };

  const closeModal = () => {
    setModal({ type: null });
  };

  const activatePlan = (planName: string) => {
    const updated = {
      ...userProfile,
      memberTier: planName,
      expiryDate: '2027-10-31',
    };
    setUserProfile(updated);
    api.updateUserProfile(updated);
    showToast(`Congratulations! Your ${planName} membership is now active!`, 'success');
    closeModal();
  };

  // Scroll to top on page change
  const handlePageChange = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <FitnessContext.Provider
      value={{
        currentPage,
        setCurrentPage: handlePageChange,
        classes,
        bookings,
        trainers,
        centers,
        membershipPlans,
        userProfile,
        inquiries,
        adminStats,
        modal,
        toast,
        loading,
        bookClass,
        cancelBooking,
        logWorkout,
        updateProfile,
        createClass,
        removeClass,
        sendInquiry,
        updateInquiryStatus,
        openBookingModal,
        openCheckoutModal,
        openModal,
        closeModal,
        showToast,
        activatePlan,
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
};

export const useFitness = () => {
  const context = useContext(FitnessContext);
  if (!context) {
    throw new Error('useFitness must be used within a FitnessProvider');
  }
  return context;
};
