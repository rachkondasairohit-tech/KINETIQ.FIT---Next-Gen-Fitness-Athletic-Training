import React, { useState } from 'react';
import { useFitness } from '../../context/FitnessContext';
import { FAQS } from '../../data/initialData';
import {
  Check,
  X,
  ShieldCheck,
  Sparkles,
  ChevronDown,
  Building2,
  Zap,
} from 'lucide-react';

export const MembershipsPage: React.FC = () => {
  const { membershipPlans, openCheckoutModal, setCurrentPage } = useFitness();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'annual'>(
    'quarterly'
  );
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Comparison feature list
  const comparisonRows = [
    {
      feature: 'Access to All 12+ Centers',
      elite: true,
      pro: 'Home Center Only',
      play: 'Sports Centers Only',
      live: false,
    },
    {
      feature: 'Unlimited Group Classes (S&C, Dance, Boxing)',
      elite: true,
      pro: '4 Classes / Month',
      play: false,
      live: 'Digital Streams Only',
    },
    {
      feature: 'Gym Floor & Olympic Barbells',
      elite: true,
      pro: true,
      play: false,
      live: false,
    },
    {
      feature: 'Badminton Courts & Lap Pools',
      elite: true,
      pro: false,
      play: true,
      live: false,
    },
    {
      feature: 'Priority Booking Window',
      elite: '4 Days in Advance',
      pro: '2 Days in Advance',
      play: '3 Days in Advance',
      live: 'Instant Stream',
    },
    {
      feature: 'Free Membership Freezes / Pauses',
      elite: 'Up to 45 Days',
      pro: 'Up to 20 Days',
      play: 'Up to 15 Days',
      live: 'Pause Anytime',
    },
    {
      feature: 'Complimentary Monthly InBody 770 Scans',
      elite: true,
      pro: '$15 / scan',
      play: false,
      live: false,
    },
    {
      feature: 'Free Guest Passes Every Month',
      elite: '2 Passes / Mo',
      pro: false,
      play: '1 Pass / Weekend',
      live: false,
    },
    {
      feature: 'Cedar Steam Sauna & Cryo Plunge Access',
      elite: true,
      pro: true,
      play: true,
      live: false,
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* Header */}
      <section className="pt-6 sm:pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ff3278] tracking-wider uppercase">
            <Sparkles className="w-4 h-4" /> Transparent All-Inclusive Passes
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white uppercase max-w-3xl mx-auto leading-tight">
            One Pass. Infinite Workouts. Zero Lock-In.
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Choose the membership tailored to your routine. All passes include free pause
            allowances, zero registration fees, and full locker amenities.
          </p>

          {/* Billing Cycle Switcher */}
          <div className="pt-4 flex justify-center">
            <div className="p-1 bg-[#10141f] border border-[#202638] rounded-2xl flex items-center gap-1 text-xs">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`py-2 px-4 rounded-xl font-medium transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-[#1b202f] text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('quarterly')}
                className={`py-2 px-4 rounded-xl font-medium transition-all flex items-center gap-1.5 ${
                  billingCycle === 'quarterly'
                    ? 'bg-[#ff3278] text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>3 Months</span>
                <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-mono">
                  SAVE 15%
                </span>
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('annual')}
                className={`py-2 px-4 rounded-xl font-medium transition-all flex items-center gap-1.5 ${
                  billingCycle === 'annual'
                    ? 'bg-[#ff3278] text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>12 Months</span>
                <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-mono">
                  SAVE 30%
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {membershipPlans.map(plan => {
            const price = plan.pricing[billingCycle];
            const monthlyEquivalent =
              billingCycle === 'monthly'
                ? price
                : billingCycle === 'quarterly'
                ? Math.round(price / 3)
                : Math.round(price / 12);

            return (
              <div
                key={plan.id}
                className={`rounded-2xl p-6 flex flex-col justify-between transition-all ${
                  plan.highlight
                    ? 'bg-gradient-to-b from-[#181d2a] to-[#11141e] border-2 border-[#ff3278] shadow-2xl shadow-[#ff3278]/15 relative'
                    : 'bg-[#10141f] border border-[#1e2333] hover:border-slate-500'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-[#ff3278] to-[#ff5e3a] text-white font-bold text-[10px] tracking-wider uppercase rounded-full shadow-md">
                    {plan.badge}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold font-display text-white">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 min-h-[32px]">
                      {plan.tagline}
                    </p>
                  </div>

                  <div className="pt-2">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black font-mono text-white tabular-nums">
                        ${monthlyEquivalent}
                      </span>
                      <span className="text-xs text-slate-400">/ mo</span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                      {billingCycle === 'monthly'
                        ? 'Billed monthly'
                        : `Billed $${price} for ${
                            billingCycle === 'quarterly' ? '3 months' : '12 months'
                          }`}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#1a202e] space-y-2.5">
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-[#ff3278] shrink-0 mt-0.5" />
                        <span className="leading-tight">{feat}</span>
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
                        ? 'bg-gradient-to-r from-[#ff3278] to-[#ff5e3a] hover:from-[#ff226a] hover:to-[#ff4d26] text-white shadow-lg shadow-[#ff3278]/25'
                        : 'bg-[#1b202c] hover:bg-[#252b3a] text-white border border-[#273042]'
                    }`}
                  >
                    Select {plan.name}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Feature Comparison Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-1">
          <div className="text-xs font-bold text-[#ff3278] tracking-wider uppercase">
            Pass Comparison
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white uppercase">
            Feature Breakdown By Tier
          </h2>
        </div>

        <div className="overflow-x-auto border border-[#1f2536] rounded-2xl bg-[#0e1119]">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#1f2536] bg-[#121622] text-slate-300">
                <th className="p-4 font-bold text-slate-200">Perks & Amenities</th>
                <th className="p-4 font-bold text-[#ff3278] font-display text-sm">
                  Cult Elite
                </th>
                <th className="p-4 font-bold text-slate-200">Cult Pro</th>
                <th className="p-4 font-bold text-slate-200">Cult Play</th>
                <th className="p-4 font-bold text-slate-200">Cult At-Home</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b202e] text-slate-300">
              {comparisonRows.map((row, index) => (
                <tr key={index} className="hover:bg-[#131724] transition-colors">
                  <td className="p-4 font-medium text-white">{row.feature}</td>
                  {/* Elite */}
                  <td className="p-4">
                    {typeof row.elite === 'boolean' ? (
                      row.elite ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <X className="w-4 h-4 text-slate-600" />
                      )
                    ) : (
                      <span className="font-semibold text-white">{row.elite}</span>
                    )}
                  </td>
                  {/* Pro */}
                  <td className="p-4">
                    {typeof row.pro === 'boolean' ? (
                      row.pro ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <X className="w-4 h-4 text-slate-600" />
                      )
                    ) : (
                      <span>{row.pro}</span>
                    )}
                  </td>
                  {/* Play */}
                  <td className="p-4">
                    {typeof row.play === 'boolean' ? (
                      row.play ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <X className="w-4 h-4 text-slate-600" />
                      )
                    ) : (
                      <span>{row.play}</span>
                    )}
                  </td>
                  {/* Live */}
                  <td className="p-4">
                    {typeof row.live === 'boolean' ? (
                      row.live ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <X className="w-4 h-4 text-slate-600" />
                      )
                    ) : (
                      <span>{row.live}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Corporate Wellness Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#121622] border border-[#23293a] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#ff3278] uppercase">
              <Building2 className="w-4 h-4" /> Kinetiq for Organizations
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white uppercase">
              Corporate Wellness & Team Passes
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Power your engineering or executive workforce with subsidized fitness passes,
              private company challenges, and dedicated wellness seminars.
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('contact')}
            className="px-6 py-3 bg-[#1b202c] hover:bg-[#ff3278] text-white text-xs font-bold rounded-xl border border-[#273042] transition-colors whitespace-nowrap shrink-0"
          >
            Inquire for Teams
          </button>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="text-xs font-bold text-[#ff3278] uppercase tracking-wider">
            Clear Answers
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white uppercase">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3 pt-2">
          {FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-[#10141f] border border-[#1e2333] rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-sm font-bold text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-[#ff3278]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-[#1a1f2c] pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
