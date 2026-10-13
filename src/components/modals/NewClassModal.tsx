import React, { useState } from 'react';
import { useFitness } from '../../context/FitnessContext';
import { WorkoutFormat } from '../../types';
import { X, Plus, Calendar } from 'lucide-react';

export const NewClassModal: React.FC = () => {
  const { createClass, closeModal, trainers, centers } = useFitness();

  const [title, setTitle] = useState('');
  const [format, setFormat] = useState<WorkoutFormat>('S&C');
  const [trainer, setTrainer] = useState(trainers[0]?.name || 'Marcus Vance');
  const [center, setCenter] = useState(centers[0]?.name || 'Downtown Central Arena');
  const [time, setTime] = useState('07:00 AM');
  const [date, setDate] = useState('Today');
  const [duration, setDuration] = useState(50);
  const [calories, setCalories] = useState(500);
  const [intensity, setIntensity] = useState<'Medium' | 'High' | 'Extreme'>('High');
  const [totalSpots, setTotalSpots] = useState(24);
  const [level, setLevel] = useState('All Levels');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createClass({
      title: title.trim() || `${format}: Master Class with ${trainer}`,
      format,
      trainer,
      center,
      time,
      date,
      duration,
      calories,
      intensity,
      totalSpots,
      level,
      description: `High energy ${format} training coached by ${trainer} at ${center}.`,
    });
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#12151e] border border-[#23293a] rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
        <div className="px-6 py-4 border-b border-[#202636] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#ff3278]" />
            <span className="text-xs font-bold tracking-wider uppercase text-white">
              Schedule New Class Session
            </span>
          </div>
          <button
            onClick={closeModal}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400">Class Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. S&C: Barbell Complex & Core"
              className="w-full bg-[#0b0c10] border border-[#23293a] rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ff3278]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Workout Format</label>
              <select
                value={format}
                onChange={e => setFormat(e.target.value as WorkoutFormat)}
                className="w-full bg-[#0b0c10] border border-[#23293a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff3278]"
              >
                <option value="S&C">S&C</option>
                <option value="Dance">Dance Fitness</option>
                <option value="Boxing">Pro Boxing</option>
                <option value="HRX">HRX Workout</option>
                <option value="Yoga">Yoga & Mobility</option>
                <option value="Pilates">Pilates</option>
                <option value="Cult Play">Cult Play</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Lead Coach</label>
              <select
                value={trainer}
                onChange={e => setTrainer(e.target.value)}
                className="w-full bg-[#0b0c10] border border-[#23293a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff3278]"
              >
                {trainers.map(t => (
                  <option key={t.id} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400">Center Location</label>
            <select
              value={center}
              onChange={e => setCenter(e.target.value)}
              className="w-full bg-[#0b0c10] border border-[#23293a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff3278]"
            >
              {centers.map(c => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Date</label>
              <select
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full bg-[#0b0c10] border border-[#23293a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff3278]"
              >
                <option value="Today">Today</option>
                <option value="Tomorrow">Tomorrow</option>
                <option value="Day After">Day After</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Time Slot</label>
              <input
                type="text"
                value={time}
                onChange={e => setTime(e.target.value)}
                placeholder="06:30 AM"
                className="w-full bg-[#0b0c10] border border-[#23293a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff3278]"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Duration (Mins)</label>
              <input
                type="number"
                value={duration}
                onChange={e => setDuration(Number(e.target.value))}
                className="w-full bg-[#0b0c10] border border-[#23293a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff3278]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Est. Calories</label>
              <input
                type="number"
                value={calories}
                onChange={e => setCalories(Number(e.target.value))}
                className="w-full bg-[#0b0c10] border border-[#23293a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff3278]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Total Spots</label>
              <input
                type="number"
                value={totalSpots}
                onChange={e => setTotalSpots(Number(e.target.value))}
                className="w-full bg-[#0b0c10] border border-[#23293a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff3278]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Intensity</label>
              <select
                value={intensity}
                onChange={e => setIntensity(e.target.value as any)}
                className="w-full bg-[#0b0c10] border border-[#23293a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff3278]"
              >
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Extreme">Extreme</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Level</label>
              <input
                type="text"
                value={level}
                onChange={e => setLevel(e.target.value)}
                placeholder="All Levels"
                className="w-full bg-[#0b0c10] border border-[#23293a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff3278]"
              />
            </div>
          </div>

          <div className="pt-3 flex gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="py-2.5 px-4 bg-[#1b202c] hover:bg-[#232938] text-slate-300 text-xs font-medium rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 bg-gradient-to-r from-[#ff3278] to-[#ff5e3a] hover:from-[#ff226a] hover:to-[#ff4d26] text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Schedule Class
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
