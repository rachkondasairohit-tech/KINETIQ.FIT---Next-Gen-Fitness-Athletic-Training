import React, { useState } from 'react';
import { useFitness } from '../../context/FitnessContext';
import { ASSETS, TRANSFORMATION_STORIES } from '../../data/initialData';
import { WorkoutFormat } from '../../types';
import {
  Flame,
  ArrowRight,
  ShieldCheck,
  Check,
  Zap,
  MapPin,
  Clock,
  Sparkles,
  Award,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    setCurrentPage,
    classes,
    openBookingModal,
    openCheckoutModal,
    membershipPlans,
  } = useFitness();

  const [activeFormatTab, setActiveFormatTab] = useState<WorkoutFormat | 'All'>('All');

  // Featured formats list with domain-specific science
  const formatCards = [
    {
      format: 'S&C' as WorkoutFormat,
      title: 'Strength & Conditioning',
      subtitle: 'Barbells · Dumbbells · Heavy Core',
      description:
        'Biomechanical compound lifts and progressive overload engineered to build dense athletic muscle and resilient joints.',
      calories: '500–600 kcal',
      time: '50 Mins',
      image: ASSETS.heroWorkout,
    },
    {
      format: 'Dance' as WorkoutFormat,
      title: 'Dance Fitness',
      subtitle: 'Chart Hits · High BPM · Non-Stop Euphoria',
      description:
        'Fast-paced choreographed cardio workout designed for fat burning and dopamine release without feeling like a chore.',
      calories: '450–550 kcal',
      time: '50 Mins',
      image: ASSETS.danceEnergy,
    },
    {
      format: 'Boxing' as WorkoutFormat,
      title: 'Pro Boxing Conditioning',
      subtitle: 'Heavy Bags · Combos · Footwork',
      description:
        'Authentic pugilist footwork, slipping drills, and heavy bag power rounds for explosive shoulder endurance and rotational core.',
      calories: '550–650 kcal',
      time: '50 Mins',
      image: ASSETS.boxingSc,
    },
    {
      format: 'HRX' as WorkoutFormat,
      title: 'HRX Athlete Functional',
      subtitle: 'Plyometrics · Agility · Anaerobic Power',
      description:
        'Celebrity athlete-engineered functional intervals designed to strip visceral fat and heighten explosive kinetic power.',
      calories: '550–600 kcal',
      time: '50 Mins',
      image: ASSETS.facilityArena,
    },
  ];

  // Filter classes for the live schedule preview
  const previewClasses = classes
    .filter(c => activeFormatTab === 'All' || c.format === activeFormatTab)
    .slice(0, 4);

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Proposition */}
            <div className="lg:col-span-7 space-y-6 z-10">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#ff3278] tracking-wider uppercase">
                <Sparkles className="w-4 h-4" />
                <span>Next-Gen Athletic Ecosystem</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white uppercase leading-[1.05] max-w-2xl text-balance">
                Forged by Science. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff3278] via-[#ff5e3a] to-[#ffaa40]">
                  Fueled by Euphoria.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
                Experience high-energy group workouts, Olympic strength arenas, and
                master-led conditioning inspired by cult.fit. One pass unlocks all 12+
                centers, live slots, and sports leagues.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => openCheckoutModal()}
                  className="px-7 py-3.5 text-base font-bold text-white bg-gradient-to-r from-[#ff3278] to-[#ff5e3a] hover:from-[#ff226a] hover:to-[#ff4d26] rounded-xl shadow-xl shadow-[#ff3278]/25 transition-all active:scale-[0.98] whitespace-nowrap shrink-0"
                >
                  Join Cult Elite Pass
                </button>
                <button
                  onClick={() => setCurrentPage('programs')}
                  className="px-6 py-3.5 text-base font-semibold text-slate-200 bg-[#141824] hover:bg-[#1d2334] border border-[#262d3e] rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-2"
                >
                  Explore Workouts <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Unboxed Metadata & Proof Row */}
              <div className="pt-4 border-t border-[#1a1f2c] flex flex-wrap items-center gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold font-mono tabular-nums text-sm">
                    14,800+
                  </span>
                  <span>Active Athletes</span>
                </div>
                <span className="text-slate-600">·</span>
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold font-mono tabular-nums text-sm">
                    4.96 / 5
                  </span>
                  <span>Average Class Rating</span>
                </div>
                <span className="text-slate-600">·</span>
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold font-mono tabular-nums text-sm">
                    12 Centers
                  </span>
                  <span>Metro Coverage</span>
                </div>
              </div>
            </div>

            {/* Right Column: High-Impact Visual Asset */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#23293a] bg-[#12151e] aspect-[4/3] lg:aspect-[16/11] shadow-2xl group">
                <img
                  src={ASSETS.heroWorkout}
                  alt="High energy athletic group training workout"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e14] via-black/20 to-transparent" />
                
                {/* Floating Quick Action Overlay */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-[#0f121b]/90 backdrop-blur-md border border-[#23293a] rounded-xl flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-slate-400">Next Slot Starting</div>
                    <div className="text-xs font-bold text-white">S&C Barbell · 06:30 AM</div>
                  </div>
                  <button
                    onClick={() => openBookingModal(classes[0])}
                    className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#ff3278] hover:bg-[#ff226a] rounded-lg transition-colors whitespace-nowrap"
                  >
                    Quick Reserve
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE FORMATS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-[#ff3278] tracking-wider uppercase mb-1">
              Curated Training Formats
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white uppercase">
              Engineered For Results. Addictive By Design.
            </h2>
          </div>
          <button
            onClick={() => setCurrentPage('programs')}
            className="text-sm font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors"
          >
            View Full Program Catalogue <ArrowRight className="w-4 h-4 text-[#ff3278]" />
          </button>
        </div>

        {/* Formats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {formatCards.map(item => (
            <div
              key={item.format}
              className="bg-[#10131c] border border-[#1e2333] hover:border-[#ff3278]/50 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-[#ff3278]/5 group"
            >
              {/* Card Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#0a0c10]">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10131c] via-black/30 to-transparent" />
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-md text-[11px] font-bold text-white uppercase tracking-wider">
                  {item.format}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold font-display text-white tracking-wide">
                    {item.title}
                  </h3>
                  <div className="text-[11px] text-[#ff5e3a] font-medium mt-0.5">
                    {item.subtitle}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mt-2.5">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#1a1f2c] flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1 text-slate-300">
                    <Flame className="w-3.5 h-3.5 text-[#ff5e3a]" /> {item.calories}
                  </span>
                  <span>{item.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. LIVE CLASS BOOKING STRIP */}
      <section className="bg-[#0e1119] border-y border-[#1c2232] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-[#ff3278] tracking-wider uppercase mb-1">
                Live Center Schedule
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white uppercase">
                Reserve Your Workout Slot Today
              </h2>
            </div>

            {/* Interactive Filter Tabs (Buttons) */}
            <div className="flex items-center gap-1.5 p-1 bg-[#090b0f] border border-[#1f2536] rounded-xl overflow-x-auto">
              {(['All', 'S&C', 'Dance', 'Boxing', 'HRX'] as const).map(fmt => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setActiveFormatTab(fmt)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                    activeFormatTab === fmt
                      ? 'bg-[#ff3278] text-white font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          {/* Classes Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {previewClasses.map(session => {
              const spotsLeft = session.totalSpots - session.bookedSpots;
              return (
                <div
                  key={session.id}
                  className="bg-[#121622] border border-[#202738] rounded-xl p-4 flex flex-col justify-between hover:border-slate-500 transition-colors"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#ff3278] font-display text-sm">
                        {session.format}
                      </span>
                      <span className="text-slate-400 font-mono text-[11px]">
                        {session.time}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white line-clamp-1">
                      {session.title}
                    </h4>

                    <div className="space-y-1 text-xs text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>{session.duration} mins · {session.level}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                        <span className="truncate">{session.center}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-3 border-t border-[#1a202e] flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400">
                      <strong className={spotsLeft <= 5 ? 'text-amber-400' : 'text-emerald-400'}>
                        {spotsLeft}
                      </strong>{' '}
                      spots left
                    </span>
                    <button
                      type="button"
                      onClick={() => openBookingModal(session)}
                      className="px-3 py-1.5 text-xs font-bold text-white bg-[#1e2434] hover:bg-[#ff3278] border border-[#2b3346] hover:border-[#ff3278] rounded-lg transition-colors whitespace-nowrap"
                    >
                      Book Slot
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. FACILITY SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#10131c] border border-[#1e2333] rounded-3xl p-6 sm:p-10">
          <div className="lg:col-span-7 space-y-5">
            <div className="text-xs font-bold text-[#ff3278] tracking-wider uppercase">
              World-Class Infrastructure
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white uppercase">
              Designed For High Performance. Built For Recovery.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Every Kinetiq arena is equipped with Eleiko Olympic barbells, Rogue power rigs,
              high-speed sprint turf tracks, soundproofed mobility sanctums, and cold plunge cryo
              tubs to accelerate athletic regeneration.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#ff3278]" />
                <span>HEPA Air Filtration & UV Sanitized</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#ff3278]" />
                <span>Cedar Wood Steam Saunas</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#ff3278]" />
                <span>Smart RFID Locker Systems</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#ff3278]" />
                <span>InBody 770 Clinical Body Scanners</span>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={() => setCurrentPage('facilities')}
                className="px-6 py-3 text-sm font-bold text-white bg-[#1b202c] hover:bg-[#252c3c] border border-[#2a3244] rounded-xl transition-colors inline-flex items-center gap-2"
              >
                Explore All Facilities & Amenities <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-[#242a3a] aspect-[16/10] bg-[#090b10]">
              <img
                src={ASSETS.facilityArena}
                alt="Kinetiq Olympic lifting gym facility"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. CULT PASS MEMBERSHIP TIERS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="text-xs font-bold text-[#ff3278] tracking-wider uppercase">
            Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white uppercase">
            One Pass. Infinite Fitness.
          </h2>
          <p className="text-sm text-slate-400">
            No registration fees. No hidden lock-in contracts. Freeze anytime free of charge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {membershipPlans.map(plan => (
            <div
              key={plan.id}
              className={`rounded-2xl p-6 flex flex-col justify-between transition-all ${
                plan.highlight
                  ? 'bg-gradient-to-b from-[#181d2a] to-[#11141e] border-2 border-[#ff3278] shadow-xl shadow-[#ff3278]/10'
                  : 'bg-[#10131c] border border-[#1e2333]'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold font-display text-white tracking-wide">
                    {plan.name}
                  </h3>
                  {plan.badge && (
                    <span className="text-[11px] font-bold uppercase text-[#ff3278] bg-[#ff3278]/10 px-2 py-0.5 rounded">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400 min-h-[36px]">{plan.tagline}</p>

                <div className="pt-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black font-mono text-white tabular-nums">
                      ${plan.pricing.monthly}
                    </span>
                    <span className="text-xs text-slate-400">/ month</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    billed quarterly at ${plan.pricing.quarterly}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#1a1f2c] space-y-2.5">
                  {plan.features.slice(0, 4).map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-[#ff3278] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => openCheckoutModal(plan)}
                  className={`w-full py-3 text-xs font-bold rounded-xl transition-all ${
                    plan.highlight
                      ? 'bg-gradient-to-r from-[#ff3278] to-[#ff5e3a] hover:from-[#ff226a] hover:to-[#ff4d26] text-white shadow-lg'
                      : 'bg-[#1b202c] hover:bg-[#252b3a] text-white border border-[#273042]'
                  }`}
                >
                  Choose {plan.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. REAL TRANSFORMATION PROOF */}
      <section className="bg-[#0b0d13] border-t border-[#181d28] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-[#ff3278] tracking-wider uppercase mb-1">
                Real Member Impact
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white uppercase">
                Measurable Milestones, Not Empty Promises
              </h2>
            </div>
            <div className="text-xs text-slate-400">
              Verified clinical InBody 770 tracking stats
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TRANSFORMATION_STORIES.map(story => (
              <div
                key={story.id}
                className="bg-[#10141f] border border-[#1d2332] rounded-2xl p-6 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="text-xs font-bold font-mono text-[#ff5e3a]">
                    {story.stat}
                  </div>
                  <blockquote className="text-xs text-slate-300 leading-relaxed italic">
                    "{story.quote}"
                  </blockquote>
                </div>

                <div className="pt-3 border-t border-[#1a1f2c] text-xs">
                  <div className="font-bold text-white">{story.name}</div>
                  <div className="text-[11px] text-slate-400">
                    {story.profession} · {story.timeframe} at {story.center}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CONVERSION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#181124] via-[#1a0f1e] to-[#121526] border border-[#ff3278]/30 rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ff3278]">
            <Award className="w-4 h-4" /> Ready to Elevate Your Routine?
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white uppercase max-w-2xl mx-auto leading-tight text-balance">
            Claim Your First 7 Days of Cult Elite Risk-Free
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Unlimited group classes, Olympic strength arenas, steam baths, and free
            technique assessments with certified master coaches.
          </p>
          <div className="pt-2">
            <button
              onClick={() => openCheckoutModal()}
              className="px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-[#ff3278] to-[#ff5e3a] hover:from-[#ff226a] hover:to-[#ff4d26] rounded-xl shadow-xl shadow-[#ff3278]/25 transition-all active:scale-[0.98]"
            >
              Start 7-Day Trial Pass
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
