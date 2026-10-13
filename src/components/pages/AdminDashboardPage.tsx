import React, { useState } from 'react';
import { useFitness } from '../../context/FitnessContext';
import {
  ShieldCheck,
  Calendar,
  Users,
  Flame,
  Plus,
  Trash2,
  TrendingUp,
  Mail,
  CheckCircle,
  Clock,
  MapPin,
  QrCode,
  DollarSign,
  Dumbbell,
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const {
    adminStats,
    classes,
    bookings,
    inquiries,
    trainers,
    removeClass,
    updateInquiryStatus,
    openModal,
    showToast,
  } = useFitness();

  const [activeTab, setActiveTab] = useState<'classes' | 'bookings' | 'inquiries' | 'trainers'>('classes');

  return (
    <div className="space-y-10 pb-20 pt-6 sm:pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#10141f] border border-[#1f2536] rounded-3xl p-6 sm:p-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" /> Kinetiq Operations Console
            </div>
            <h1 className="text-3xl sm:text-4xl font-black font-display text-white uppercase tracking-tight">
              Center Management & Schedules
            </h1>
            <p className="text-xs text-slate-400">
              Live capacity monitoring, master trainer assignments, and member bookings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => openModal('newClass')}
              className="py-3 px-5 bg-gradient-to-r from-[#ff3278] to-[#ff5e3a] hover:from-[#ff226a] hover:to-[#ff4d26] text-white text-xs font-bold rounded-xl shadow-lg shadow-[#ff3278]/25 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Schedule New Class
            </button>
          </div>
        </div>

        {/* 4 Operations KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#0f121b] border border-[#1e2333] rounded-2xl p-5 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Active Members</span>
              <Users className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black font-mono text-white tabular-nums">
              {adminStats.activeMembersCount.toLocaleString()}
            </div>
            <div className="text-[11px] text-emerald-400 font-medium">
              +420 new this week
            </div>
          </div>

          <div className="bg-[#0f121b] border border-[#1e2333] rounded-2xl p-5 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Today's Workouts Booked</span>
              <Flame className="w-4 h-4 text-[#ff5e3a]" />
            </div>
            <div className="text-3xl font-black font-mono text-white tabular-nums">
              {adminStats.todayWorkoutsBooked}
            </div>
            <div className="text-[11px] text-slate-400">
              Across 12 Metro Arenas
            </div>
          </div>

          <div className="bg-[#0f121b] border border-[#1e2333] rounded-2xl p-5 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Overall Slot Occupancy</span>
              <TrendingUp className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl font-black font-mono text-white tabular-nums">
              {adminStats.occupancyRate}%
            </div>
            <div className="text-[11px] text-slate-400">
              High demand in S&C and Boxing
            </div>
          </div>

          <div className="bg-[#0f121b] border border-[#1e2333] rounded-2xl p-5 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Monthly Run-Rate (MRR)</span>
              <DollarSign className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-black font-mono text-white tabular-nums">
              {adminStats.monthlyRevenue}
            </div>
            <div className="text-[11px] text-emerald-400 font-medium">
              +18.4% YoY Growth
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-[#1f2536] pb-3 text-xs overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('classes')}
            className={`py-2 px-4 rounded-xl font-bold transition-colors whitespace-nowrap ${
              activeTab === 'classes'
                ? 'bg-[#1e2434] text-white border border-[#2d354a]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Class Schedule & Slots ({classes.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('bookings')}
            className={`py-2 px-4 rounded-xl font-bold transition-colors whitespace-nowrap ${
              activeTab === 'bookings'
                ? 'bg-[#1e2434] text-white border border-[#2d354a]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Recent Member Bookings ({bookings.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('inquiries')}
            className={`py-2 px-4 rounded-xl font-bold transition-colors whitespace-nowrap ${
              activeTab === 'inquiries'
                ? 'bg-[#1e2434] text-white border border-[#2d354a]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Inquiries & Leads ({inquiries.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('trainers')}
            className={`py-2 px-4 rounded-xl font-bold transition-colors whitespace-nowrap ${
              activeTab === 'trainers'
                ? 'bg-[#1e2434] text-white border border-[#2d354a]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Master Coaches ({trainers.length})
          </button>
        </div>

        {/* Tab 1: Classes Schedule */}
        {activeTab === 'classes' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold font-display text-white uppercase">
                Active Workout Sessions
              </h3>
              <span className="text-xs text-slate-400">
                Click trash to cancel class session
              </span>
            </div>

            <div className="overflow-x-auto border border-[#1f2536] rounded-2xl bg-[#0f121b]">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#1f2536] bg-[#141824] text-slate-300">
                    <th className="p-4 font-bold">Class Details</th>
                    <th className="p-4 font-bold">Discipline</th>
                    <th className="p-4 font-bold">Lead Coach</th>
                    <th className="p-4 font-bold">Facility</th>
                    <th className="p-4 font-bold">Schedule</th>
                    <th className="p-4 font-bold">Occupancy</th>
                    <th className="p-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1a202e] text-slate-300">
                  {classes.map(c => {
                    const pct = Math.round((c.bookedSpots / c.totalSpots) * 100);
                    return (
                      <tr key={c.id} className="hover:bg-[#121622] transition-colors">
                        <td className="p-4">
                          <strong className="text-white block">{c.title}</strong>
                          <span className="text-[11px] text-slate-500">
                            {c.duration} mins · ~{c.calories} kcal
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-xs font-bold text-[#ff3278]">
                            {c.format}
                          </span>
                        </td>
                        <td className="p-4 text-white font-medium">{c.trainer}</td>
                        <td className="p-4 text-slate-300 max-w-[160px] truncate">
                          {c.center}
                        </td>
                        <td className="p-4 font-mono">
                          {c.date} · {c.time}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-white">
                              {c.bookedSpots}/{c.totalSpots} ({pct}%)
                            </span>
                          </div>
                          <div className="w-24 h-1.5 bg-[#202738] rounded-full overflow-hidden mt-1">
                            <div
                              className="h-full bg-[#ff3278]"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            type="button"
                            onClick={() => removeClass(c.id)}
                            className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors"
                            title="Cancel Class"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Member Bookings */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold font-display text-white uppercase">
              Recent Member Reservations
            </h3>

            {bookings.length === 0 ? (
              <div className="p-8 text-center bg-[#0f121b] border border-[#1f2536] rounded-2xl text-slate-400 text-xs">
                No active bookings in queue.
              </div>
            ) : (
              <div className="overflow-x-auto border border-[#1f2536] rounded-2xl bg-[#0f121b]">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#1f2536] bg-[#141824] text-slate-300">
                      <th className="p-4 font-bold">Pass Code</th>
                      <th className="p-4 font-bold">Class</th>
                      <th className="p-4 font-bold">Discipline</th>
                      <th className="p-4 font-bold">Facility</th>
                      <th className="p-4 font-bold">Timing</th>
                      <th className="p-4 font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1a202e] text-slate-300">
                    {bookings.map(b => (
                      <tr key={b.id} className="hover:bg-[#121622] transition-colors">
                        <td className="p-4 font-mono font-bold text-[#ff3278]">
                          {b.passCode}
                        </td>
                        <td className="p-4 text-white font-medium">{b.classTitle}</td>
                        <td className="p-4 text-slate-400">{b.format}</td>
                        <td className="p-4 text-slate-300">{b.center}</td>
                        <td className="p-4 font-mono">
                          {b.date} · {b.time}
                        </td>
                        <td className="p-4">
                          <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                            {b.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Inquiries & Leads */}
        {activeTab === 'inquiries' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold font-display text-white uppercase">
              Customer Leads & Corporate Inquiries
            </h3>

            {inquiries.length === 0 ? (
              <div className="p-8 text-center bg-[#0f121b] border border-[#1f2536] rounded-2xl text-slate-400 text-xs">
                No customer inquiries logged yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {inquiries.map(inq => (
                  <div
                    key={inq.id}
                    className="bg-[#121622] border border-[#202738] rounded-xl p-5 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{inq.name}</span>
                      <select
                        value={inq.status}
                        onChange={e => updateInquiryStatus(inq.id, e.target.value as any)}
                        className={`text-[11px] font-bold px-2 py-0.5 rounded border focus:outline-none ${
                          inq.status === 'resolved'
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                            : inq.status === 'contacted'
                            ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                            : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                        }`}
                      >
                        <option value="new" className="bg-[#10141f]">NEW</option>
                        <option value="contacted" className="bg-[#10141f]">CONTACTED</option>
                        <option value="resolved" className="bg-[#10141f]">RESOLVED</option>
                      </select>
                    </div>

                    <div className="text-xs text-slate-400 space-y-0.5">
                      <div>Email: <strong className="text-slate-200">{inq.email}</strong></div>
                      <div>Phone: <strong className="text-slate-200">{inq.phone || 'N/A'}</strong></div>
                      <div>City: {inq.city} · Interest: <span className="text-[#ff5e3a] font-semibold">{inq.interest}</span></div>
                    </div>

                    {inq.message && (
                      <p className="text-xs text-slate-300 bg-[#0a0d14] p-3 rounded-lg border border-[#1b202e] italic">
                        "{inq.message}"
                      </p>
                    )}

                    <div className="text-[10px] text-slate-500">
                      Received: {new Date(inq.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Master Coaches */}
        {activeTab === 'trainers' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold font-display text-white uppercase">
              Master Trainers Roster
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trainers.map(tr => (
                <div
                  key={tr.id}
                  className="bg-[#121622] border border-[#202738] rounded-xl p-5 space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={tr.imageUrl}
                      alt={tr.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-xl object-cover border border-[#273042]"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white">{tr.name}</h4>
                      <div className="text-xs text-[#ff5e3a]">{tr.role}</div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-400 space-y-1">
                    <div>Specialty: <span className="text-slate-200">{tr.specialty}</span></div>
                    <div>Sessions Led: <span className="text-slate-200 font-mono">{tr.sessionsLed.toLocaleString()}</span></div>
                    <div>Rating: <span className="text-amber-400 font-mono font-bold">★ {tr.rating}</span></div>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {tr.formats.map(f => (
                      <span key={f} className="text-[10px] bg-[#1a202e] px-2 py-0.5 rounded text-slate-300">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
