import React, { useState } from 'react';
import { useFitness } from '../../context/FitnessContext';
import { MembershipPlan } from '../../types';
import { X, Check, ShieldCheck, Zap, CreditCard, Sparkles } from 'lucide-react';

interface Props {
  initialPlan?: MembershipPlan;
}

export const CheckoutModal: React.FC<Props> = ({ initialPlan }) => {
  const { membershipPlans, closeModal, activatePlan } = useFitness();
  const [selectedPlanId, setSelectedPlanId] = useState<string>(
    initialPlan?.id || 'cult-elite'
  );
  const [term, setTerm] = useState<'monthly' | 'quarterly' | 'annual'>('quarterly');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedPlan =
    membershipPlans.find(p => p.id === selectedPlanId) || membershipPlans[0];

  const basePrice = selectedPlan.pricing[term];
  const discountRate = promoApplied ? 0.15 : 0;
  const finalPrice = Math.round(basePrice * (1 - discountRate));

  const termLabels = {
    monthly: '1 Month',
    quarterly: '3 Months (Save 15%)',
    annual: '12 Months (Save 30%)',
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'CULT2026' || promoCode.trim().length > 3) {
      setPromoApplied(true);
    }
  };

  const handleActivate = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      activatePlan(selectedPlan.name);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#12151e] border border-[#23293a] rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#202636] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#ff3278]" />
            <span className="text-xs font-bold tracking-wider uppercase text-white">
              Activate Cult Pass Membership
            </span>
          </div>
          <button
            onClick={closeModal}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Plan Selector tabs */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Select Membership Tier
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {membershipPlans.map(plan => {
                const isSelected = plan.id === selectedPlanId;
                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-[#ff3278] bg-[#ff3278]/10 text-white shadow-sm'
                        : 'border-[#22283a] bg-[#0c0e14] text-slate-400 hover:border-slate-600 hover:text-slate-200'
                    }`}
                  >
                    <div className="text-xs font-bold truncate">{plan.name}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      ${plan.pricing.monthly}/mo
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Duration Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Billing Duration
            </label>
            <div className="grid grid-cols-3 gap-2 p-1 bg-[#0b0c10] border border-[#202636] rounded-xl text-xs">
              {(['monthly', 'quarterly', 'annual'] as const).map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTerm(t)}
                  className={`py-2 px-2 rounded-lg font-medium transition-all ${
                    term === t
                      ? 'bg-[#1e2434] text-white shadow-sm font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {termLabels[t]}
                </button>
              ))}
            </div>
          </div>

          {/* Plan Highlights */}
          <div className="p-4 bg-[#0a0c10] border border-[#1e2333] rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold text-white font-display">
                  {selectedPlan.name} Pass
                </h4>
                <p className="text-xs text-slate-400">{selectedPlan.tagline}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-white font-mono tabular-nums">
                  ${finalPrice}
                </div>
                <div className="text-[11px] text-slate-500">
                  {term === 'monthly' ? '/ month' : `total for ${term === 'quarterly' ? '3 months' : '1 year'}`}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#1c2130] grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              {selectedPlan.features.slice(0, 4).map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-tight">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Promo code */}
          <form onSubmit={handleApplyPromo} className="flex gap-2">
            <input
              type="text"
              value={promoCode}
              onChange={e => setPromoCode(e.target.value)}
              placeholder="Promo Code (try: CULT2026)"
              className="flex-1 bg-[#0b0c10] border border-[#23293a] rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ff3278]"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#1b202c] hover:bg-[#252c3c] text-slate-200 text-xs font-semibold rounded-xl transition-colors"
            >
              Apply
            </button>
          </form>
          {promoApplied && (
            <div className="text-xs text-emerald-400 flex items-center gap-1.5 -mt-3">
              <Sparkles className="w-3.5 h-3.5" /> Extra 15% VIP discount applied!
            </div>
          )}

          {/* Instant Activation Guarantee */}
          <div className="p-3 bg-[#131722] border border-[#202636] rounded-xl flex items-center gap-3 text-xs text-slate-400">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <strong className="text-slate-200">Instant Access:</strong> Your digital pass code
              will be immediately available. Free freeze anytime.
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-6 border-t border-[#202636] bg-[#0d0f15] flex gap-3 shrink-0">
          <button
            type="button"
            onClick={closeModal}
            className="py-3 px-4 bg-[#1a1f2c] hover:bg-[#22283a] text-slate-300 text-sm font-medium rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleActivate}
            disabled={isProcessing}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-[#ff3278] to-[#ff5e3a] hover:from-[#ff226a] hover:to-[#ff4d26] text-white text-sm font-bold rounded-xl shadow-lg shadow-[#ff3278]/25 transition-all flex items-center justify-center gap-2"
          >
            <CreditCard className="w-4 h-4" />
            {isProcessing ? 'Activating Pass...' : `Activate Pass · $${finalPrice}`}
          </button>
        </div>
      </div>
    </div>
  );
};
