import React, { useState } from 'react';
import { useFitness } from '../../context/FitnessContext';
import { ASSETS } from '../../data/initialData';
import {
  MapPin,
  Clock,
  Phone,
  CheckCircle,
  ShieldCheck,
  Dumbbell,
  Sparkles,
  Flame,
} from 'lucide-react';

export const FacilitiesPage: React.FC = () => {
  const { centers, openCheckoutModal, showToast } = useFitness();
  const [selectedCity, setSelectedCity] = useState<string>('All');

  const cities = ['All', 'Downtown Hub', 'Westside District', 'Uptown Heights', 'South Metro'];

  const filteredCenters = centers.filter(
    c => selectedCity === 'All' || c.city === selectedCity
  );

  const handleBookTour = (centerName: string) => {
    showToast(`VIP Day Tour reserved at ${centerName}! Show your email at reception.`, 'success');
  };

  return (
    <div className="space-y-20 pb-20">
      {/* Header */}
      <section className="pt-6 sm:pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="text-xs font-bold text-[#ff3278] tracking-wider uppercase">
            State-of-the-Art Arenas
          </div>
          <h1 className="text-4xl sm:text-5xl font-black font-display tracking-tight text-white uppercase max-w-3xl">
            Precision Architecture. Engineered For Athletes.
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Every square foot is planned around biometric acoustics, specialized shock-absorbing
            athletic flooring, hospital-grade airflow ventilation, and cold recovery.
          </p>
        </div>
      </section>

      {/* City Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 p-1.5 bg-[#0e1119] border border-[#202738] rounded-xl overflow-x-auto w-fit">
          {cities.map(city => (
            <button
              key={city}
              type="button"
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedCity === city
                  ? 'bg-[#ff3278] text-white font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </section>

      {/* Centers Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredCenters.map(center => (
            <div
              key={center.id}
              className="bg-[#10141f] border border-[#1f2536] hover:border-slate-500 rounded-2xl overflow-hidden flex flex-col justify-between transition-all"
            >
              {/* Center Image */}
              <div className="relative aspect-[16/9] bg-[#090b10] overflow-hidden group">
                <img
                  src={center.imageUrl}
                  alt={center.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10141f] via-black/20 to-transparent" />
                
                <div className="absolute top-3 left-3 px-3 py-1 bg-black/70 backdrop-blur-md rounded-lg text-xs font-bold font-mono text-white">
                  {center.sqft.toLocaleString()} SQ. FT.
                </div>

                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="text-xl font-bold font-display text-white">
                    {center.name}
                  </h3>
                  <div className="text-xs text-slate-300 flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#ff3278]" />
                    <span>{center.address}</span>
                  </div>
                </div>
              </div>

              {/* Info & Amenities */}
              <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Hours and phone */}
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 border-b border-[#1a202f] pb-3">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" /> {center.timings}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-500" /> {center.phone}
                    </span>
                  </div>

                  {/* High Performance Equipment */}
                  <div className="space-y-2">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Training Equipment & Zones
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                      {center.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Dumbbell className="w-3.5 h-3.5 text-[#ff5e3a] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recovery & Amenities */}
                  <div className="space-y-2 pt-1">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Recovery & Hospitality Amenities
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                      {center.amenities.map((amenity, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-[#ff3278] shrink-0 mt-0.5" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-[#1a202f] flex gap-3">
                  <button
                    type="button"
                    onClick={() => handleBookTour(center.name)}
                    className="flex-1 py-2.5 px-4 bg-[#1b202c] hover:bg-[#252b3a] text-slate-200 text-xs font-bold rounded-xl border border-[#262e40] transition-colors"
                  >
                    Book Free Day Tour
                  </button>
                  <button
                    type="button"
                    onClick={() => openCheckoutModal()}
                    className="flex-1 py-2.5 px-4 bg-gradient-to-r from-[#ff3278] to-[#ff5e3a] hover:from-[#ff226a] hover:to-[#ff4d26] text-white text-xs font-bold rounded-xl transition-all"
                  >
                    Join with Elite Pass
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hygiene and Safety Protocol */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0b0c10] border border-[#1b202c] rounded-2xl p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" /> Hospital-Grade Hygiene Standards
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white uppercase">
            Pristine Cleanliness You Can Smell & Feel
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300 leading-relaxed pt-2">
            <div className="space-y-2 p-4 bg-[#10141f] rounded-xl border border-[#1e2434]">
              <div className="font-bold text-white text-sm">8x Hourly Air Volume Cycling</div>
              <p className="text-slate-400">
                Hospital-grade MERV 16 filtration units continuously scrub airborne particulates,
                sweat humidity, and odors with 100% fresh outside air.
              </p>
            </div>
            <div className="space-y-2 p-4 bg-[#10141f] rounded-xl border border-[#1e2434]">
              <div className="font-bold text-white text-sm">Pre & Post Class Sanitation</div>
              <p className="text-slate-400">
                Every dumbbell handle, barbell knurling, yoga mat, and boxing bag is disinfected
                with hospital-grade organic botanical solution between classes.
              </p>
            </div>
            <div className="space-y-2 p-4 bg-[#10141f] rounded-xl border border-[#1e2434]">
              <div className="font-bold text-white text-sm">Anti-Microbial Athletic Turf</div>
              <p className="text-slate-400">
                Our sprint tracks and turf bays feature silver-ion infused fibers that inhibit
                99.9% of bacterial replication and friction burn.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
