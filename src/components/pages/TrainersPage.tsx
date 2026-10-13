import React, { useState } from 'react';
import { useFitness } from '../../context/FitnessContext';
import { WorkoutFormat } from '../../types';
import {
  Award,
  Star,
  CheckCircle,
  Calendar,
  Flame,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const TrainersPage: React.FC = () => {
  const { trainers, classes, openBookingModal, setCurrentPage } = useFitness();
  const [filterFormat, setFilterFormat] = useState<WorkoutFormat | 'All'>('All');
  const [selectedTrainerName, setSelectedTrainerName] = useState<string | null>(null);

  const filteredTrainers = trainers.filter(
    t => filterFormat === 'All' || t.formats.includes(filterFormat)
  );

  return (
    <div className="space-y-20 pb-20">
      {/* Header */}
      <section className="pt-6 sm:pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="text-xs font-bold text-[#ff3278] tracking-wider uppercase">
            Master Athletic Coaches
          </div>
          <h1 className="text-4xl sm:text-5xl font-black font-display tracking-tight text-white uppercase max-w-3xl">
            Coached by Former Olympians & Elite Specialists
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Less than 1.4% of trainer applicants pass Kinetiq's grueling biomechanics,
            movement correction, and stage presence certifications.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 p-1.5 bg-[#0e1119] border border-[#202738] rounded-xl overflow-x-auto w-fit">
          {(['All', 'S&C', 'Dance', 'Boxing', 'HRX', 'Yoga', 'Pilates'] as const).map(
            fmt => (
              <button
                key={fmt}
                type="button"
                onClick={() => setFilterFormat(fmt)}
                className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  filterFormat === fmt
                    ? 'bg-[#ff3278] text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {fmt === 'All' ? 'All Coaches' : fmt}
              </button>
            )
          )}
        </div>
      </section>

      {/* Trainers Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTrainers.map(trainer => {
            const trainerClasses = classes.filter(c => c.trainer === trainer.name);

            return (
              <div
                key={trainer.id}
                className="bg-[#10141f] border border-[#1f2536] hover:border-slate-500 rounded-2xl overflow-hidden flex flex-col justify-between transition-all"
              >
                {/* Photo & Rating Header */}
                <div className="relative aspect-[4/3] bg-[#090b10] overflow-hidden group">
                  <img
                    src={trainer.imageUrl}
                    alt={trainer.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#10141f] via-black/20 to-transparent" />
                  
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded-lg flex items-center gap-1 text-xs font-bold text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{trainer.rating}</span>
                  </div>

                  <div className="absolute bottom-3 left-4">
                    <h3 className="text-xl font-bold font-display text-white">
                      {trainer.name}
                    </h3>
                    <div className="text-xs text-[#ff5e3a] font-medium">
                      {trainer.role}
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {trainer.bio}
                    </p>

                    <div className="space-y-1.5 pt-1">
                      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        Certifications & Honors
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {trainer.certifications.map((cert, i) => (
                          <span
                            key={i}
                            className="text-[11px] text-slate-300 bg-[#161a26] px-2.5 py-1 rounded-md border border-[#23293a]"
                          >
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sessions Led & Action */}
                  <div className="pt-4 border-t border-[#1a202f] space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>{trainer.experienceYears} Years Experience</span>
                      <span className="font-mono text-slate-300">
                        {trainer.sessionsLed.toLocaleString()} Sessions Led
                      </span>
                    </div>

                    {trainerClasses.length > 0 ? (
                      <button
                        onClick={() => openBookingModal(trainerClasses[0])}
                        className="w-full py-2.5 px-4 bg-[#1b202c] hover:bg-[#ff3278] text-white text-xs font-bold rounded-xl border border-[#273042] hover:border-[#ff3278] transition-all flex items-center justify-center gap-1.5"
                      >
                        <Calendar className="w-3.5 h-3.5" /> Book with {trainer.name} ({trainerClasses[0].time})
                      </button>
                    ) : (
                      <button
                        onClick={() => setCurrentPage('programs')}
                        className="w-full py-2.5 px-4 bg-[#141824] hover:bg-[#1a2030] text-slate-400 hover:text-white text-xs font-semibold rounded-xl border border-[#222838] transition-colors"
                      >
                        View Full Schedule
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Master Coaching Standard Quality Block */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0b0c10] border border-[#1b202c] rounded-2xl p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold text-[#ff3278] uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" /> The Kinetiq Coaching Standard
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white uppercase">
            Why Our Trainers Outperform Any Traditional Gym
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300 leading-relaxed pt-2">
            <div className="space-y-2 p-4 bg-[#10141f] rounded-xl border border-[#1e2434]">
              <div className="font-bold text-white text-sm">200+ Hours Biomechanics Training</div>
              <p className="text-slate-400">
                Coaches undergo intensive cadaver-level anatomy study and kinetic chain
                diagnostics so they recognize joint compensations instantly.
              </p>
            </div>
            <div className="space-y-2 p-4 bg-[#10141f] rounded-xl border border-[#1e2434]">
              <div className="font-bold text-white text-sm">Soundtrack & Energy Calibration</div>
              <p className="text-slate-400">
                Every playlist is engineered to match class heart-rate progression curves,
                driving natural adrenaline surges during high-lactate work blocks.
              </p>
            </div>
            <div className="space-y-2 p-4 bg-[#10141f] rounded-xl border border-[#1e2434]">
              <div className="font-bold text-white text-sm">Weekly Peer Technique Audits</div>
              <p className="text-slate-400">
                Coaches evaluate one another monthly to ensure form cues stay razor sharp,
                inclusive, and physically safe across all fitness levels.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
