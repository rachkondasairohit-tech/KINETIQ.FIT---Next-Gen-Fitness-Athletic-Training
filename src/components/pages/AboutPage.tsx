import React from 'react';
import { useFitness } from '../../context/FitnessContext';
import { ASSETS } from '../../data/initialData';
import {
  Award,
  ShieldCheck,
  Flame,
  Zap,
  Users,
  Target,
  HeartHandshake,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setCurrentPage, openCheckoutModal } = useFitness();

  return (
    <div className="space-y-24 pb-20 pt-6 sm:pt-10">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-xs font-bold text-[#ff3278] tracking-wider uppercase">
          The Athletic Revolution
        </div>
        <h1 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-white uppercase max-w-4xl leading-tight">
          We Replaced Solitary Treadmill Boredom With Pure Energy.
        </h1>
        <p className="text-base sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
          Inspired by the cult fitness movement, Kinetiq was founded on one undeniable
          truth: humans achieve extraordinary athletic breakthroughs when training
          together in synchronized, high-octane environments.
        </p>
      </section>

      {/* Origin Story Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#10141f] border border-[#1f2536] rounded-3xl p-6 sm:p-12">
          <div className="lg:col-span-6 space-y-5">
            <div className="text-xs font-bold text-[#ff3278] uppercase tracking-wider">
              Our Founding Thesis
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white uppercase">
              Fitness Should Be The Best 50 Minutes Of Your Day
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Traditional commercial gyms sell thousands of unused keycard memberships,
              hoping you never walk through the door. Kinetiq engineered the inverse model:
              immersive athletic studios, heart-thumping sound systems, and coaches who know
              your name, ensuring you never miss a session.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              By blending high-volume compound lifts with dopamine-inducing dance cardio and
              pugilist combat drills, we created a daily athletic routine you actively crave.
            </p>
            <div className="pt-2 flex items-center gap-6 text-xs text-slate-400">
              <div>
                <strong className="block text-2xl font-mono font-black text-white">
                  94.2%
                </strong>
                <span>30-Day Attendance Retention</span>
              </div>
              <div className="h-8 w-px bg-[#222a3c]"></div>
              <div>
                <strong className="block text-2xl font-mono font-black text-white">
                  14,800+
                </strong>
                <span>Active City Members</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-[#23293a] aspect-[4/3] bg-[#090b10]">
              <img
                src={ASSETS.heroWorkout}
                alt="Athletes training at Kinetiq arena"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold text-[#ff3278] uppercase tracking-wider">
            Our Guiding Code
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-white uppercase">
            The Three Pillars of Kinetiq
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#0f121b] border border-[#1e2333] rounded-2xl p-8 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#ff3278]/10 text-[#ff3278] flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white uppercase">
              01. Biomechanical Integrity
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              No arbitrary circus exercises. Every movement in S&C, HRX, and Boxing is
              rooted in exercise physiology, progressive overload, and joint longevity.
            </p>
          </div>

          <div className="bg-[#0f121b] border border-[#1e2333] rounded-2xl p-8 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#ff5e3a]/10 text-[#ff5e3a] flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white uppercase">
              02. Auditory Euphoria
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Music isn't elevator background noise—it's the metabolic pacemaker. Our
              curated playlists sync beats per minute (BPM) with your target cardiovascular zone.
            </p>
          </div>

          <div className="bg-[#0f121b] border border-[#1e2333] rounded-2xl p-8 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white uppercase">
              03. Zero-Ego Community
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Whether you are an Olympic lifter or lacing up shoes for day one, there are
              no mirrors to preen in and zero judgment. Everyone sweats together.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#141824] border border-[#262f44] rounded-3xl p-8 sm:p-12 text-center space-y-5">
          <h2 className="text-3xl sm:text-4xl font-black font-display text-white uppercase max-w-xl mx-auto">
            Experience the Kinetiq Difference in Person
          </h2>
          <p className="text-slate-300 text-sm max-w-lg mx-auto">
            Try a session today at any of our 12 metro arenas. Certified coaches, pristine
            facilities, and zero sales pressure.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => openCheckoutModal()}
              className="py-3 px-6 bg-gradient-to-r from-[#ff3278] to-[#ff5e3a] text-white text-sm font-bold rounded-xl shadow-lg"
            >
              Get Cult Pass
            </button>
            <button
              onClick={() => setCurrentPage('programs')}
              className="py-3 px-6 bg-[#1f2536] text-slate-200 hover:text-white text-sm font-semibold rounded-xl"
            >
              Browse Today's Sessions
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
