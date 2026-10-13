import React, { useState } from 'react';
import { useFitness } from '../../context/FitnessContext';
import {
  Flame,
  Calendar,
  Clock,
  MapPin,
  QrCode,
  Plus,
  Trash2,
  Award,
  TrendingUp,
  Activity,
  User,
  ShieldCheck,
  Scale,
} from 'lucide-react';

export const CustomerDashboardPage: React.FC = () => {
  const {
    userProfile,
    bookings,
    cancelBooking,
    openModal,
    setCurrentPage,
    updateProfile,
    showToast,
  } = useFitness();

  const [weightInput, setWeightInput] = useState(userProfile.weightKg.toString());
  const [targetInput, setTargetInput] = useState(userProfile.targetWeightKg.toString());
  const [savingMetrics, setSavingMetrics] = useState(false);

  // Calculate BMI: weight(kg) / (height(m))^2
  const heightInMeters = userProfile.heightCm / 100;
  const currentBmi = (userProfile.weightKg / (heightInMeters * heightInMeters)).toFixed(1);

  const handleSaveMetrics = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weightInput);
    const tw = parseFloat(targetInput);
    if (isNaN(w) || isNaN(tw) || w <= 30 || tw <= 30) {
      showToast('Please enter a valid weight in kg', 'error');
      return;
    }

    setSavingMetrics(true);
    updateProfile({ weightKg: w, targetWeightKg: tw });
    setSavingMetrics(false);
  };

  return (
    <div className="space-y-12 pb-20 pt-6 sm:pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Member Card & Welcome */}
        <div className="bg-[#10141f] border border-[#1f2536] rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-3 z-10">
            <div className="flex items-center gap-2 text-xs font-bold text-[#ff3278] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" /> Active Member Identity
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white uppercase">
                Welcome Back, {userProfile.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Pass ID: <span className="font-mono text-slate-200">{userProfile.membershipId}</span> · Valid through{' '}
                <span className="text-slate-200">{userProfile.expiryDate}</span>
              </p>
            </div>
          </div>

          {/* Digital Badge Container */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-[#191e2b] to-[#141824] border border-[#2b3348] rounded-2xl flex items-center gap-4 z-10 w-full sm:w-auto">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff3278] to-[#ff5e3a] flex items-center justify-center text-white font-black text-xl font-display shrink-0 shadow-lg shadow-[#ff3278]/20">
              K
            </div>
            <div>
              <div className="text-xs font-bold text-[#ff3278] uppercase tracking-wider">
                {userProfile.memberTier} Pass
              </div>
              <div className="text-sm font-bold text-white">All Center All-Access</div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Active & Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Quantitative KPIs Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#0f121b] border border-[#1e2333] rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Active Streak</span>
              <Flame className="w-4 h-4 text-[#ff5e3a]" />
            </div>
            <div className="text-3xl font-black font-mono text-white tabular-nums">
              {userProfile.streakDays}{' '}
              <span className="text-xs font-sans text-slate-400 font-normal">Days</span>
            </div>
            <div className="text-[11px] text-emerald-400 font-medium">
              🔥 Keep it going!
            </div>
          </div>

          <div className="bg-[#0f121b] border border-[#1e2333] rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Workouts Completed</span>
              <Activity className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl font-black font-mono text-white tabular-nums">
              {userProfile.workoutsCompleted}
            </div>
            <div className="text-[11px] text-slate-400">
              Across S&C, Boxing & Dance
            </div>
          </div>

          <div className="bg-[#0f121b] border border-[#1e2333] rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Total Energy Burned</span>
              <TrendingUp className="w-4 h-4 text-[#ff3278]" />
            </div>
            <div className="text-3xl font-black font-mono text-white tabular-nums">
              {userProfile.totalCaloriesBurned.toLocaleString()}{' '}
              <span className="text-xs font-sans text-slate-400 font-normal">kcal</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Clinical InBody audited
            </div>
          </div>

          <div className="bg-[#0f121b] border border-[#1e2333] rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Current Weight / BMI</span>
              <Scale className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black font-mono text-white tabular-nums">
              {userProfile.weightKg}{' '}
              <span className="text-xs font-sans text-slate-400 font-normal">kg</span>
            </div>
            <div className="text-[11px] text-slate-400">
              BMI: <strong className="text-white font-mono">{currentBmi}</strong> · Target: {userProfile.targetWeightKg} kg
            </div>
          </div>
        </div>

        {/* Upcoming Booked Sessions */}
        <div className="bg-[#0f121b] border border-[#1e2333] rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-[#ff3278] uppercase tracking-wider mb-1">
                Active Reservations
              </div>
              <h2 className="text-2xl font-black font-display text-white uppercase">
                Upcoming Workout Sessions
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => openModal('logWorkout')}
                className="py-2.5 px-4 bg-[#1b202c] hover:bg-[#252b3a] text-slate-200 text-xs font-semibold rounded-xl border border-[#273042] transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5 text-[#ff5e3a]" /> Log Past Workout
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage('programs')}
                className="py-2.5 px-4 bg-gradient-to-r from-[#ff3278] to-[#ff5e3a] hover:from-[#ff226a] hover:to-[#ff4d26] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" /> Book New Session
              </button>
            </div>
          </div>

          {bookings.length === 0 ? (
            <div className="text-center py-12 bg-[#090b10] rounded-xl border border-[#1b2130] space-y-3">
              <p className="text-sm text-slate-400">
                You have no upcoming workout sessions reserved.
              </p>
              <button
                onClick={() => setCurrentPage('programs')}
                className="text-xs font-bold text-[#ff3278] hover:underline"
              >
                Explore Today's Slots & Book Now →
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookings.map(booking => (
                <div
                  key={booking.id}
                  className="bg-[#121622] border border-[#23293a] rounded-xl p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase text-[#ff3278] bg-[#ff3278]/10 px-2 py-0.5 rounded">
                        {booking.format}
                      </span>
                      <div className="flex items-center gap-1.5 font-mono text-xs text-white bg-[#0a0c10] px-2.5 py-1 rounded border border-[#1e2333]">
                        <QrCode className="w-3.5 h-3.5 text-slate-400" />
                        <span>{booking.passCode}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-white">
                        {booking.classTitle}
                      </h4>
                      <div className="text-xs text-slate-400 mt-1">
                        Coach: <strong className="text-slate-200">{booking.trainer}</strong>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs text-slate-400">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>{booking.date} at {booking.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="truncate">{booking.center}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#1b202e] flex items-center justify-between text-xs">
                    <span className="text-emerald-400 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      Seat Reserved
                    </span>
                    <button
                      type="button"
                      onClick={() => cancelBooking(booking.id, booking.classId)}
                      className="text-rose-400 hover:text-rose-300 font-medium flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Cancel Slot
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Body Metrics & Goals Tracker */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 bg-[#0f121b] border border-[#1e2333] rounded-2xl p-6 sm:p-8 space-y-5">
            <div>
              <div className="text-xs font-bold text-[#ff3278] uppercase tracking-wider mb-1">
                Body Composition
              </div>
              <h3 className="text-xl font-bold font-display text-white uppercase">
                Update Weight & Target Goals
              </h3>
            </div>

            <form onSubmit={handleSaveMetrics} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Current Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={weightInput}
                    onChange={e => setWeightInput(e.target.value)}
                    className="w-full bg-[#090b10] border border-[#222a3c] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff3278]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Target Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={targetInput}
                    onChange={e => setTargetInput(e.target.value)}
                    className="w-full bg-[#090b10] border border-[#222a3c] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff3278]"
                  />
                </div>
              </div>

              <div className="p-3 bg-[#121622] rounded-xl border border-[#1f2536] text-xs text-slate-300 flex items-center justify-between">
                <span>Calculated Body Mass Index (BMI):</span>
                <span className="font-mono font-bold text-white text-sm">{currentBmi}</span>
              </div>

              <button
                type="submit"
                disabled={savingMetrics}
                className="w-full py-2.5 px-4 bg-[#1b202c] hover:bg-[#ff3278] text-white text-xs font-bold rounded-xl border border-[#273042] hover:border-[#ff3278] transition-all"
              >
                {savingMetrics ? 'Updating...' : 'Save Metrics to Profile'}
              </button>
            </form>
          </div>

          {/* Quick FAQ / Member Care */}
          <div className="lg:col-span-6 bg-[#0f121b] border border-[#1e2333] rounded-2xl p-6 sm:p-8 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="text-xs font-bold text-[#ff3278] uppercase tracking-wider">
                Member Care & Perks
              </div>
              <h3 className="text-xl font-bold font-display text-white uppercase">
                Cult Elite Privileges Active
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Unlimited 45-day membership freeze allowance whenever traveling</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>2 Free Guest passes renewed every 1st of the month</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Complimentary towel & RFID locker service at all 12 arenas</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-[#1a202e] flex items-center justify-between text-xs">
              <span className="text-slate-400">Need support with a reservation?</span>
              <button
                onClick={() => setCurrentPage('contact')}
                className="text-[#ff3278] font-bold hover:underline"
              >
                Contact Concierge →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
