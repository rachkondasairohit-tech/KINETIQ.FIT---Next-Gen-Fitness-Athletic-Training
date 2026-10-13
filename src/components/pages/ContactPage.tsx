import React, { useState } from 'react';
import { useFitness } from '../../context/FitnessContext';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Send,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { sendInquiry, centers } = useFitness();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState(centers[0]?.city || 'Downtown Hub');
  const [interest, setInterest] = useState('Membership Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsSubmitting(true);
    const ok = await sendInquiry({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      city,
      interest,
      message: message.trim(),
    });
    setIsSubmitting(false);

    if (ok) {
      setIsSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }
  };

  return (
    <div className="space-y-20 pb-20 pt-6 sm:pt-10">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="text-xs font-bold text-[#ff3278] tracking-wider uppercase">
          Member Concierge & Partnerships
        </div>
        <h1 className="text-4xl sm:text-5xl font-black font-display tracking-tight text-white uppercase max-w-3xl">
          Get in Touch With Kinetiq HQ
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
          Whether you need support with an active Cult Pass, corporate membership pricing
          for your company, or a private facility tour, our team is at your service.
        </p>
      </section>

      {/* Main Grid: Form + Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Form Column */}
          <div className="lg:col-span-7 bg-[#10141f] border border-[#1f2536] rounded-3xl p-6 sm:p-10 space-y-6">
            <div>
              <h2 className="text-2xl font-black font-display text-white uppercase">
                Send a Message or Inquiry
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Guaranteed response from a fitness director within 2 business hours.
              </p>
            </div>

            {isSuccess ? (
              <div className="p-8 text-center bg-[#0a0d14] border border-emerald-500/30 rounded-2xl space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold font-display text-white">
                  Inquiry Dispatched Successfully!
                </h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Thank you! Your message has been routed to our regional management team.
                  A fitness concierge will contact you via phone/email shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="py-2.5 px-5 bg-[#1b202c] hover:bg-[#252b3a] text-slate-200 text-xs font-semibold rounded-xl"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Jordan Smith"
                      className="w-full bg-[#0a0d14] border border-[#23293a] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff3278]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="jordan@company.com"
                      className="w-full bg-[#0a0d14] border border-[#23293a] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff3278]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-[#0a0d14] border border-[#23293a] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff3278]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400">
                      Nearest Center City
                    </label>
                    <select
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      className="w-full bg-[#0a0d14] border border-[#23293a] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff3278]"
                    >
                      {centers.map(c => (
                        <option key={c.id} value={c.city}>
                          {c.city} ({c.name})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400">
                    Topic of Interest
                  </label>
                  <select
                    value={interest}
                    onChange={e => setInterest(e.target.value)}
                    className="w-full bg-[#0a0d14] border border-[#23293a] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff3278]"
                  >
                    <option value="Membership Inquiry">Cult Pass Membership Details</option>
                    <option value="Corporate Wellness Pass">Corporate / Group Employee Passes</option>
                    <option value="Personal Coaching Booking">Master 1-on-1 Personal Training</option>
                    <option value="Trainer Auditions">Trainer Auditions & Careers</option>
                    <option value="Facility Franchise">Franchise & Arena Expansion</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400">
                    Message or Details
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Tell us what you are looking for..."
                    className="w-full bg-[#0a0d14] border border-[#23293a] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff3278]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-[#ff3278] to-[#ff5e3a] hover:from-[#ff226a] hover:to-[#ff4d26] text-white text-xs font-bold rounded-xl shadow-lg shadow-[#ff3278]/25 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? 'Sending Inquiry...' : 'Submit Inquiry'}
                </button>
              </form>
            )}
          </div>

          {/* Quick Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#10141f] border border-[#1f2536] rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-bold font-display text-white uppercase">
                Direct Contact Channels
              </h3>

              <div className="space-y-3.5 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#ff3278] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Member Concierge Hotline</strong>
                    <span>+1 (800) 456-KNTQ (Mon–Sun 05:30 to 22:00)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#ff5e3a] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">General Email</strong>
                    <span>concierge@kinetiq.fit</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Building2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Corporate Wellness Inquiries</strong>
                    <span>enterprise@kinetiq.fit</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Flagship Central Arena</strong>
                    <span>450 Grand Avenue, Central Metro Hub</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#0c0e14] border border-[#1c2232] rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase">
                <ShieldCheck className="w-4 h-4" /> Response Commitment
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                All class refund inquiries, membership freeze requests, and corporate pass
                quotes are serviced with a strict 2-hour business day SLA.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
