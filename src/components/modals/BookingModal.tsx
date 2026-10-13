import React, { useState } from 'react';
import { useFitness } from '../../context/FitnessContext';
import { ClassSession } from '../../types';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Flame,
  User,
  ShieldCheck,
  CheckCircle,
  QrCode,
} from 'lucide-react';

interface Props {
  classItem: ClassSession;
}

export const BookingModal: React.FC<Props> = ({ classItem }) => {
  const { bookClass, closeModal, setCurrentPage } = useFitness();
  const [confirmed, setConfirmed] = useState(false);
  const [passCode, setPassCode] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const spotsLeft = classItem.totalSpots - classItem.bookedSpots;

  const handleConfirm = async () => {
    setSubmitting(true);
    const success = await bookClass(classItem);
    setSubmitting(false);
    if (success) {
      setPassCode(`KNQ-${Math.floor(1000 + Math.random() * 9000)}`);
      setConfirmed(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#12151e] border border-[#23293a] rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#202636] flex items-center justify-between">
          <div className="text-xs font-bold tracking-wider uppercase text-[#ff3278]">
            {confirmed ? 'Booking Confirmed' : 'Reserve Workout Slot'}
          </div>
          <button
            onClick={closeModal}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmed ? (
          /* Confirmation Pass Screen */
          <div className="p-6 space-y-6 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle className="w-9 h-9" />
            </div>

            <div>
              <h3 className="text-xl font-bold font-display tracking-wide text-white">
                Spot Reserved Successfully!
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                Show this digital pass code or scan at the center reception tablet.
              </p>
            </div>

            {/* Digital Pass Card */}
            <div className="p-5 bg-[#0b0c10] border border-[#23293a] rounded-xl text-left space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#1c2130]">
                <div>
                  <div className="text-xs text-slate-400">Class</div>
                  <div className="text-sm font-bold text-white">{classItem.title}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Pass Code</div>
                  <div className="text-sm font-mono font-bold text-[#ff3278]">{passCode}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>{classItem.time} · {classItem.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-400" />
                  <span>Coach: {classItem.trainer}</span>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="truncate">{classItem.center}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-[#1c2130]">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Free cancellation up to 60m before</span>
                </div>
                <div className="flex items-center gap-1 font-mono text-[11px] text-slate-500">
                  <QrCode className="w-4 h-4" /> QR Ready
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  closeModal();
                  setCurrentPage('dashboard');
                }}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-[#ff3278] to-[#ff5e3a] hover:from-[#ff226a] hover:to-[#ff4d26] text-white text-sm font-bold rounded-xl transition-all"
              >
                Go to Member Dashboard
              </button>
              <button
                onClick={closeModal}
                className="py-3 px-4 bg-[#1b202c] hover:bg-[#232938] text-slate-300 text-sm font-medium rounded-xl transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Slot Details Screen */
          <div className="p-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-1">
                <span className="text-[#ff3278] font-bold">{classItem.format}</span>
                <span>·</span>
                <span>{classItem.duration} Mins</span>
                <span>·</span>
                <span>{classItem.level}</span>
              </div>
              <h3 className="text-xl font-bold font-display text-white tracking-wide">
                {classItem.title}
              </h3>
              {classItem.description && (
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {classItem.description}
                </p>
              )}
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 gap-3 p-4 bg-[#0a0c10] border border-[#1e2333] rounded-xl text-xs">
              <div className="space-y-1">
                <span className="text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Date & Time
                </span>
                <span className="font-semibold text-white block">
                  {classItem.date} at {classItem.time}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 flex items-center gap-1">
                  <User className="w-3.5 h-3.5" /> Lead Coach
                </span>
                <span className="font-semibold text-white block">
                  {classItem.trainer}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> Facility
                </span>
                <span className="font-semibold text-white block truncate">
                  {classItem.center}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-[#ff5e3a]" /> Estimated Burn
                </span>
                <span className="font-semibold text-white block">
                  ~{classItem.calories} kcal ({classItem.intensity})
                </span>
              </div>
            </div>

            {/* Capacity Meter */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Class Capacity</span>
                <span className="font-mono text-slate-200">
                  <strong className={spotsLeft <= 5 ? 'text-amber-400' : 'text-emerald-400'}>
                    {spotsLeft} spots remaining
                  </strong>{' '}
                  / {classItem.totalSpots}
                </span>
              </div>
              <div className="w-full h-2 bg-[#1b202e] rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all rounded-full ${
                    spotsLeft <= 5 ? 'bg-amber-400' : 'bg-emerald-500'
                  }`}
                  style={{
                    width: `${Math.min(
                      100,
                      (classItem.bookedSpots / classItem.totalSpots) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>

            {/* Terms note */}
            <div className="text-[11px] text-slate-500 leading-relaxed bg-[#141822] p-3 rounded-lg flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                Included in your active Cult Elite pass. No cancellation penalty up to 60
                minutes before class start. Clean indoor workout footwear required.
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={closeModal}
                className="py-3 px-4 bg-[#1b202c] hover:bg-[#232938] text-slate-300 text-sm font-medium rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={spotsLeft <= 0 || submitting}
                onClick={handleConfirm}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-[#ff3278] to-[#ff5e3a] hover:from-[#ff226a] hover:to-[#ff4d26] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl shadow-lg shadow-[#ff3278]/25 transition-all"
              >
                {submitting
                  ? 'Reserving Slot...'
                  : spotsLeft <= 0
                  ? 'Class Full'
                  : 'Confirm Slot Reservation'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
