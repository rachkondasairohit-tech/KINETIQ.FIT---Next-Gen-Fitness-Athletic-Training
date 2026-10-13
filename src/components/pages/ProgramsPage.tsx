import React, { useState } from 'react';
import { useFitness } from '../../context/FitnessContext';
import { ASSETS } from '../../data/initialData';
import { WorkoutFormat } from '../../types';
import {
  Flame,
  Clock,
  MapPin,
  Calendar,
  Sparkles,
  Zap,
  CheckCircle2,
} from 'lucide-react';

export const ProgramsPage: React.FC = () => {
  const { classes, openBookingModal, centers } = useFitness();

  const [selectedFormat, setSelectedFormat] = useState<WorkoutFormat | 'All'>('All');
  const [selectedDay, setSelectedDay] = useState<'All' | 'Today' | 'Tomorrow'>('Today');
  const [selectedCenter, setSelectedCenter] = useState<string>('All');
  const [selectedIntensity, setSelectedIntensity] = useState<string>('All');

  const formatsList: {
    id: WorkoutFormat;
    title: string;
    description: string;
    focus: string;
    calories: string;
    image: string;
  }[] = [
    {
      id: 'S&C',
      title: 'Strength & Conditioning',
      description:
        'Biomechanical barbell squats, deadlifts, and kettlebell complexes paired with high-lactate metabolic finishers for dense hypertrophy and functional strength.',
      focus: 'Compound Lifts · Posterior Chain · Core Bracing',
      calories: '500–600 kcal',
      image: ASSETS.heroWorkout,
    },
    {
      id: 'Dance',
      title: 'Dance Fitness',
      description:
        'Easy-to-follow, chart-topping choreography that blends Latin, pop, and house music with sustained aerobic endurance intervals.',
      focus: 'Cardiovascular Health · Rhythm · Agility',
      calories: '450–550 kcal',
      image: ASSETS.danceEnergy,
    },
    {
      id: 'Boxing',
      title: 'Pro Boxing Conditioning',
      description:
        'Authentic heavy bag combinations, slip drills, and rapid shoulder burn rounds designed to hone fight reflexes and shred upper body fat.',
      focus: 'Kinetic Punch Power · Footwork · Rotational Core',
      calories: '550–650 kcal',
      image: ASSETS.boxingSc,
    },
    {
      id: 'HRX',
      title: 'HRX Athlete Functional',
      description:
        'High-intensity interval conditioning engineered with plyometric boxes, battle ropes, and prowler sleds for maximum athletic power output.',
      focus: 'Anaerobic Threshold · Explosive Power · Lean Mass',
      calories: '550–600 kcal',
      image: ASSETS.facilityArena,
    },
    {
      id: 'Yoga',
      title: 'Mobility & Vinyasa Flow',
      description:
        'Decompress tight hips, open thoracic spine mobility, and master diaphragmatic breathing to optimize recovery and prevent lifting injuries.',
      focus: 'Joint Health · Spinal Decompression · Mental Calm',
      calories: '250–320 kcal',
      image: ASSETS.heroWorkout,
    },
    {
      id: 'Pilates',
      title: 'Pilates Core Sculpt',
      description:
        'Precise low-impact isometric holds targeting the pelvic floor, transverse abdominis, and spinal stabilizers for postural symmetry.',
      focus: 'Deep Core · Posture Restoration · Muscular Balance',
      calories: '300–380 kcal',
      image: ASSETS.facilityArena,
    },
    {
      id: 'Cult Play',
      title: 'Cult Play (Indoor Sports)',
      description:
        'BWF-certified indoor wooden badminton courts, heated lap swimming pools, and amateur competitive leagues for sport lovers.',
      focus: 'Recreational Play · Hand-Eye Coordination · Endurance',
      calories: '450–550 kcal',
      image: ASSETS.facilityArena,
    },
  ];

  // Filter classes based on user criteria
  const filteredClasses = classes.filter(c => {
    if (selectedFormat !== 'All' && c.format !== selectedFormat) return false;
    if (selectedDay !== 'All' && c.date !== selectedDay) return false;
    if (selectedCenter !== 'All' && c.center !== selectedCenter) return false;
    if (selectedIntensity !== 'All' && c.intensity !== selectedIntensity) return false;
    return true;
  });

  return (
    <div className="space-y-20 pb-20">
      {/* Header Banner */}
      <section className="pt-6 sm:pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="text-xs font-bold text-[#ff3278] tracking-wider uppercase">
            Signature Formats & Live Timetable
          </div>
          <h1 className="text-4xl sm:text-5xl font-black font-display tracking-tight text-white uppercase max-w-3xl">
            World-Class Group Workouts. Every Day.
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Every session is engineered with structured warm-ups, progressive loading
            phases, heart-rate intervals, and cool-downs led by certified masters.
          </p>
        </div>
      </section>

      {/* Formats Catalogue Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black font-display tracking-tight text-white uppercase">
            Signature Disciplines
          </h2>
          <span className="text-xs text-slate-400">
            Click format below to filter live slots
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {formatsList.map(item => {
            const isSelected = selectedFormat === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedFormat(isSelected ? 'All' : item.id)}
                className={`cursor-pointer rounded-2xl overflow-hidden border p-5 flex flex-col justify-between transition-all duration-200 ${
                  isSelected
                    ? 'border-[#ff3278] bg-[#171b26] shadow-lg shadow-[#ff3278]/10'
                    : 'border-[#1f2536] bg-[#10141f] hover:border-slate-500'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-[#ff3278]">
                      {item.id}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {item.calories}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-display text-white">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-[#1a202f] flex items-center justify-between text-[11px] text-slate-400">
                  <span className="truncate max-w-[200px] text-slate-300">
                    {item.focus}
                  </span>
                  <span className="text-[#ff3278] font-semibold hover:underline">
                    {isSelected ? 'Selected ✓' : 'View Schedule'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Class Schedule Explorer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-[#0f121b] border border-[#202738] rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-[#ff3278] tracking-wider uppercase mb-1">
                Booking Schedule
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white uppercase">
                Find Your Next Sweat Session
              </h2>
            </div>
            <div className="text-xs text-slate-400">
              Showing <strong className="text-white font-mono">{filteredClasses.length}</strong> matching slots
            </div>
          </div>

          {/* Filter Bar Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            {/* Format Filter */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Discipline
              </label>
              <select
                value={selectedFormat}
                onChange={e => setSelectedFormat(e.target.value as any)}
                className="w-full bg-[#090b10] border border-[#222a3c] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff3278]"
              >
                <option value="All">All Disciplines</option>
                <option value="S&C">S&C (Strength & Conditioning)</option>
                <option value="Dance">Dance Fitness</option>
                <option value="Boxing">Pro Boxing</option>
                <option value="HRX">HRX Functional</option>
                <option value="Yoga">Yoga Flow</option>
                <option value="Pilates">Pilates Core</option>
                <option value="Cult Play">Cult Play (Sports)</option>
              </select>
            </div>

            {/* Day Filter */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Date
              </label>
              <select
                value={selectedDay}
                onChange={e => setSelectedDay(e.target.value as any)}
                className="w-full bg-[#090b10] border border-[#222a3c] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff3278]"
              >
                <option value="All">All Dates</option>
                <option value="Today">Today</option>
                <option value="Tomorrow">Tomorrow</option>
              </select>
            </div>

            {/* Center Filter */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Facility Center
              </label>
              <select
                value={selectedCenter}
                onChange={e => setSelectedCenter(e.target.value)}
                className="w-full bg-[#090b10] border border-[#222a3c] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff3278]"
              >
                <option value="All">All 12 Centers</option>
                {centers.map(cnt => (
                  <option key={cnt.id} value={cnt.name}>
                    {cnt.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Intensity Filter */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Intensity Level
              </label>
              <select
                value={selectedIntensity}
                onChange={e => setSelectedIntensity(e.target.value)}
                className="w-full bg-[#090b10] border border-[#222a3c] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff3278]"
              >
                <option value="All">All Intensity Levels</option>
                <option value="Medium">Medium Intensity</option>
                <option value="High">High Intensity</option>
                <option value="Extreme">Extreme Intensity</option>
              </select>
            </div>
          </div>

          {/* Classes Result Grid */}
          {filteredClasses.length === 0 ? (
            <div className="text-center py-12 bg-[#090b10] rounded-xl border border-[#1b2130] space-y-3">
              <p className="text-sm text-slate-400">
                No class slots matched your current filter selection.
              </p>
              <button
                onClick={() => {
                  setSelectedFormat('All');
                  setSelectedDay('All');
                  setSelectedCenter('All');
                  setSelectedIntensity('All');
                }}
                className="text-xs font-semibold text-[#ff3278] hover:underline"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredClasses.map(session => {
                const spotsLeft = session.totalSpots - session.bookedSpots;
                return (
                  <div
                    key={session.id}
                    className="bg-[#121622] border border-[#202738] rounded-xl p-5 flex flex-col justify-between hover:border-slate-500 transition-colors"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#ff3278] font-display text-sm tracking-wide">
                          {session.format}
                        </span>
                        <span className="text-slate-300 font-mono font-semibold">
                          {session.date} · {session.time}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-base font-bold text-white">
                          {session.title}
                        </h4>
                        <div className="text-xs text-slate-400 mt-1">
                          Coach: <strong className="text-slate-200">{session.trainer}</strong>
                        </div>
                      </div>

                      <div className="space-y-1.5 text-xs text-slate-400">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span className="truncate">{session.center}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span>{session.duration} mins · ~{session.calories} kcal ({session.intensity})</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#1a202e] flex items-center justify-between">
                      <div className="text-[11px] font-mono">
                        <span
                          className={
                            spotsLeft <= 5
                              ? 'text-amber-400 font-bold'
                              : 'text-emerald-400 font-bold'
                          }
                        >
                          {spotsLeft} spots left
                        </span>
                        <span className="text-slate-500"> / {session.totalSpots}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => openBookingModal(session)}
                        className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#ff3278] to-[#ff5e3a] hover:from-[#ff226a] hover:to-[#ff4d26] rounded-xl shadow-md transition-all active:scale-[0.98]"
                      >
                        Reserve Slot
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Science and Methodology Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0b0d13] border border-[#1b202c] rounded-2xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-2">
            <div className="text-xs font-bold text-[#ff3278] uppercase tracking-wider">
              01. Biomechanical Periodization
            </div>
            <h3 className="text-lg font-bold text-white font-display">
              Built Around Recovery Cycles
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We alternate heavy posterior chain days with cardiovascular aerobic
              flushing so you build muscle without CNS fatigue or burnout.
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-bold text-[#ff3278] uppercase tracking-wider">
              02. EPOC Afterburn Effect
            </div>
            <h3 className="text-lg font-bold text-white font-display">
              Elevated Resting Metabolism
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              By pushing heart rate into the 80–90% anaerobic zone during intervals,
              your body burns excess calories for up to 24 hours post-workout.
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-bold text-[#ff3278] uppercase tracking-wider">
              03. Master Athlete Coaching
            </div>
            <h3 className="text-lg font-bold text-white font-display">
              Every Rep Audited in Real-Time
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our trainers correct barbell bar paths, knee valgus, and scapular
              retraction on every single athlete to guarantee zero injuries.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
