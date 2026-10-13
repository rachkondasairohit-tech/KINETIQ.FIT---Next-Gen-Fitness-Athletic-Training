import React from 'react';
import { useFitness } from '../../context/FitnessContext';
import { PageId } from '../../types';
import { ShieldCheck, MapPin, Phone, Mail, Award, Dumbbell } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage } = useFitness();

  return (
    <footer className="bg-[#08090d] border-t border-[#181c26] text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="text-2xl font-black font-display tracking-wider text-white">
              KINETIQ<span className="text-[#ff3278]">.</span>FIT
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Cult-inspired athletic training ecosystem. Engineered group workouts,
              Olympic strength floors, certified masters, and science-backed conditioning.
              Every move matters.
            </p>
            <div className="flex items-center gap-6 pt-2 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#ff3278]" />
                ISO 9001 Hygiene Certified
              </span>
              <span className="flex items-center gap-1.5">
                <Dumbbell className="w-4 h-4 text-[#ff5e3a]" />
                12+ Premier Centers
              </span>
            </div>
          </div>

          {/* Formats & Workouts */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 tracking-wider uppercase">
              Workouts
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => setCurrentPage('programs')}
                  className="hover:text-white transition-colors"
                >
                  Strength & Conditioning
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('programs')}
                  className="hover:text-white transition-colors"
                >
                  Dance Fitness
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('programs')}
                  className="hover:text-white transition-colors"
                >
                  Pro Boxing
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('programs')}
                  className="hover:text-white transition-colors"
                >
                  HRX Athlete Engine
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('programs')}
                  className="hover:text-white transition-colors"
                >
                  Yoga & Mobility Flow
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 tracking-wider uppercase">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => setCurrentPage('memberships')}
                  className="hover:text-white transition-colors"
                >
                  Cult Pass & Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('facilities')}
                  className="hover:text-white transition-colors"
                >
                  Centers & Facilities
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('trainers')}
                  className="hover:text-white transition-colors"
                >
                  Master Coaches
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('dashboard')}
                  className="hover:text-white transition-colors"
                >
                  Member Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('about')}
                  className="hover:text-white transition-colors"
                >
                  About the Science
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('admin')}
                  className="text-amber-400/80 hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Admin Console
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 tracking-wider uppercase">
              Connect
            </h4>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>Downtown Arena & 12 Regional Locations</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                <span>+1 (800) 456-KNTQ</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <span>support@kinetiq.fit</span>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => setCurrentPage('contact')}
                  className="text-xs font-semibold text-[#ff3278] hover:underline"
                >
                  Corporate Inquiries & Partnerships →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[#141822] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} KINETIQ FITNESS INC. Inspired by Cult.fit. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Terms of Service</span>
            <span>·</span>
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Safety Protocols</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
