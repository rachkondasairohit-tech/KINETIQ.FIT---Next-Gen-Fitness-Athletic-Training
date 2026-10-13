import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

// In-memory persistent data store
interface ClassSession {
  id: string;
  title: string;
  format: string; // 'S&C' | 'Dance' | 'Boxing' | 'Yoga' | 'HRX' | 'Pilates'
  trainer: string;
  center: string;
  time: string;
  date: string;
  duration: number; // minutes
  calories: number;
  intensity: 'Medium' | 'High' | 'Extreme';
  totalSpots: number;
  bookedSpots: number;
  level: string;
}

interface Booking {
  id: string;
  classId: string;
  classTitle: string;
  format: string;
  trainer: string;
  center: string;
  date: string;
  time: string;
  bookedAt: string;
  status: 'confirmed' | 'attended' | 'cancelled';
  passCode: string;
}

interface Inquiry {
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

const initialClasses: ClassSession[] = [
  {
    id: 'cls-1',
    title: 'S&C: Heavy Barbell & Core Blast',
    format: 'S&C',
    trainer: 'Marcus Vance',
    center: 'Downtown Central Arena',
    time: '06:30 AM',
    date: 'Today',
    duration: 50,
    calories: 520,
    intensity: 'Extreme',
    totalSpots: 24,
    bookedSpots: 18,
    level: 'All Levels',
  },
  {
    id: 'cls-2',
    title: 'Dance Fitness: Electric Beats',
    format: 'Dance',
    trainer: 'Natasha K.',
    center: 'Downtown Central Arena',
    time: '07:30 AM',
    date: 'Today',
    duration: 50,
    calories: 460,
    intensity: 'High',
    totalSpots: 30,
    bookedSpots: 27,
    level: 'Beginner Friendly',
  },
  {
    id: 'cls-3',
    title: 'HRX: Athlete Functional Engine',
    format: 'HRX',
    trainer: 'Kabir Sen',
    center: 'Westside Tech Park',
    time: '08:00 AM',
    date: 'Today',
    duration: 50,
    calories: 580,
    intensity: 'Extreme',
    totalSpots: 20,
    bookedSpots: 14,
    level: 'Intermediate to Advanced',
  },
  {
    id: 'cls-4',
    title: 'Pro Boxing: Heavy Bag Combinations',
    format: 'Boxing',
    trainer: 'Dev Malhotra',
    center: 'Westside Tech Park',
    time: '06:00 PM',
    date: 'Today',
    duration: 50,
    calories: 540,
    intensity: 'High',
    totalSpots: 18,
    bookedSpots: 15,
    level: 'All Levels',
  },
  {
    id: 'cls-5',
    title: 'Mobility & Deep Flow Yoga',
    format: 'Yoga',
    trainer: 'Elena Rostova',
    center: 'Uptown Heights',
    time: '07:00 PM',
    date: 'Today',
    duration: 55,
    calories: 280,
    intensity: 'Medium',
    totalSpots: 22,
    bookedSpots: 12,
    level: 'All Levels',
  },
  {
    id: 'cls-6',
    title: 'S&C: Metabolic Conditioning',
    format: 'S&C',
    trainer: 'Marcus Vance',
    center: 'Metro Hub South',
    time: '07:30 PM',
    date: 'Today',
    duration: 50,
    calories: 510,
    intensity: 'High',
    totalSpots: 24,
    bookedSpots: 21,
    level: 'All Levels',
  },
  {
    id: 'cls-7',
    title: 'Dance Blast: High Octane Remixes',
    format: 'Dance',
    trainer: 'Natasha K.',
    center: 'Downtown Central Arena',
    time: '07:00 AM',
    date: 'Tomorrow',
    duration: 50,
    calories: 480,
    intensity: 'High',
    totalSpots: 30,
    bookedSpots: 8,
    level: 'All Levels',
  },
  {
    id: 'cls-8',
    title: 'Pilates Sculpt: Core & Alignment',
    format: 'Pilates',
    trainer: 'Priya Sharma',
    center: 'Uptown Heights',
    time: '08:30 AM',
    date: 'Tomorrow',
    duration: 45,
    calories: 320,
    intensity: 'Medium',
    totalSpots: 16,
    bookedSpots: 11,
    level: 'Beginner to Intermediate',
  },
];

let classes: ClassSession[] = [...initialClasses];
let bookings: Booking[] = [
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
];

let inquiries: Inquiry[] = [
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
];

let userProfile = {
  name: 'Alex Rivera',
  email: 'alex.rivera@example.com',
  memberTier: 'Cult Elite',
  expiryDate: '2027-04-15',
  membershipId: 'KNTQ-8891-VIP',
  streakDays: 14,
  workoutsCompleted: 42,
  totalCaloriesBurned: 21840,
  weightKg: 74.5,
  targetWeightKg: 72.0,
  heightCm: 178,
};

// API Endpoints
app.get('/api/classes', (_req, res) => {
  res.json({ success: true, data: classes });
});

app.post('/api/classes', (req, res) => {
  const newClass: ClassSession = {
    id: `cls-${Date.now()}`,
    ...req.body,
    bookedSpots: 0,
    totalSpots: Number(req.body.totalSpots) || 24,
    duration: Number(req.body.duration) || 50,
    calories: Number(req.body.calories) || 450,
  };
  classes.unshift(newClass);
  res.status(201).json({ success: true, data: newClass });
});

app.delete('/api/classes/:id', (req, res) => {
  const { id } = req.params;
  classes = classes.filter(c => c.id !== id);
  res.json({ success: true, message: 'Class removed' });
});

app.get('/api/bookings', (_req, res) => {
  res.json({ success: true, data: bookings });
});

app.post('/api/bookings', (req, res) => {
  const { classId } = req.body;
  const targetClass = classes.find(c => c.id === classId);
  if (!targetClass) {
    return res.status(404).json({ success: false, error: 'Class not found' });
  }

  if (targetClass.bookedSpots >= targetClass.totalSpots) {
    return res.status(400).json({ success: false, error: 'Class is full' });
  }

  targetClass.bookedSpots += 1;
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

  bookings.unshift(newBooking);
  res.status(201).json({ success: true, data: newBooking });
});

app.delete('/api/bookings/:id', (req, res) => {
  const { id } = req.params;
  const bookingIndex = bookings.findIndex(b => b.id === id);
  if (bookingIndex === -1) {
    return res.status(404).json({ success: false, error: 'Booking not found' });
  }

  const booking = bookings[bookingIndex];
  const targetClass = classes.find(c => c.id === booking.classId);
  if (targetClass && targetClass.bookedSpots > 0) {
    targetClass.bookedSpots -= 1;
  }

  bookings.splice(bookingIndex, 1);
  res.json({ success: true, message: 'Booking cancelled successfully' });
});

app.get('/api/user-profile', (_req, res) => {
  res.json({ success: true, data: userProfile });
});

app.put('/api/user-profile', (req, res) => {
  userProfile = { ...userProfile, ...req.body };
  res.json({ success: true, data: userProfile });
});

app.post('/api/user-profile/log-workout', (req, res) => {
  const { caloriesBurned = 450 } = req.body;
  userProfile.workoutsCompleted += 1;
  userProfile.streakDays += 1;
  userProfile.totalCaloriesBurned += Number(caloriesBurned);
  res.json({ success: true, data: userProfile });
});

app.get('/api/inquiries', (_req, res) => {
  res.json({ success: true, data: inquiries });
});

app.post('/api/inquiries', (req, res) => {
  const newInquiry: Inquiry = {
    id: `inq-${Date.now()}`,
    name: req.body.name || 'Anonymous',
    email: req.body.email || '',
    phone: req.body.phone || '',
    city: req.body.city || 'Downtown',
    interest: req.body.interest || 'General Membership',
    message: req.body.message || '',
    createdAt: new Date().toISOString(),
    status: 'new',
  };
  inquiries.unshift(newInquiry);
  res.status(201).json({ success: true, data: newInquiry });
});

app.patch('/api/inquiries/:id', (req, res) => {
  const { id } = req.params;
  const inquiry = inquiries.find(inq => inq.id === id);
  if (inquiry) {
    inquiry.status = req.body.status || inquiry.status;
  }
  res.json({ success: true, data: inquiry });
});

app.get('/api/stats', (_req, res) => {
  const totalSpots = classes.reduce((acc, c) => acc + c.totalSpots, 0);
  const totalBooked = classes.reduce((acc, c) => acc + c.bookedSpots, 0);
  const occupancyRate = totalSpots > 0 ? Math.round((totalBooked / totalSpots) * 100) : 0;

  res.json({
    success: true,
    data: {
      activeMembersCount: 14820,
      todayWorkoutsBooked: totalBooked,
      occupancyRate,
      centersOperational: 12,
      activeTrainers: 48,
      monthlyRevenue: '$284,500',
    },
  });
});

async function startServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`KINETIQ Fitness server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
