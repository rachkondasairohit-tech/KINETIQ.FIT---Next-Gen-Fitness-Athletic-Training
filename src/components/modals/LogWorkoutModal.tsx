import React, { useState } from 'react';
import { useFitness } from '../../context/FitnessContext';
import { WorkoutFormat } from '../../types';
import { X, Flame, Dumbbell } from 'lucide-react';

export const LogWorkoutModal: React.FC = () => {
  const { logWorkout, closeModal } = useFitness();
  const [format, setFormat] = useState<WorkoutFormat>('S&C');
  const [duration, setDuration] = useState(50);
  const [calories, setCalories] = useState(480);
  const [notes, setNotes] = useState('');

  const formats: WorkoutFormat[] = [
    'S&C',
    'Dance',
    'Boxing',
    'HRX',
    'Yoga',
    'Pilates',
    'Cult Play',
  ];

  const handleFormatChange = (f: WorkoutFormat) => {
    setFormat(f);
    // Auto-calculate suggested calories based on format & duration
    const burnRate: Record<WorkoutFormat, number> = {
      'S&C': 10.2,
      'Dance': 9.2,
      'Boxing': 10.8,
      'HRX': 11.5,
      'Yoga': 5.2,
      'Pilates': 6.8,
      'Cult Play': 8.5,
    };
    setCalories(Math.round(duration * (burnRate[f] || 9)));
  };

  const handleDurationChange = (d: number) => {
    setDuration(d);
    const burnRate: Record<WorkoutFormat, number> = {
      'S&C': 10.2,
      'Dance': 9.2,
      'Boxing': 10.8,
      'HRX': 11.5,
      'Yoga': 5.2,
      'Pilates': 6.8,
      'Cult Play': 8.5,
    };
    setCalories(Math.round(d * (burnRate[format] || 9)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    logWorkout(calories);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#12151e] border border-[#23293a] rounded-2xl max-w-md w-full overflow-hidden shadow-2xl">
        <div className="px-6 py-4 border-b border-[#202636] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-[#ff5e3a]" />
            <span className="text-xs font-bold tracking-wider uppercase text-white">
              Log Completed Workout
            </span>
          </div>
          <button
            onClick={closeModal}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Format selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Workout Format
            </label>
            <div className="flex flex-wrap gap-1.5">
              {formats.map(f => (
                <button
                  key={f}
                  type="button"
                  onClick={() => handleFormatChange(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    format === f
                      ? 'bg-[#ff3278] text-white font-bold'
                      : 'bg-[#1b202c] text-slate-300 hover:bg-[#252b3a]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Duration slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Duration</span>
              <span className="font-mono text-white font-bold">{duration} Minutes</span>
            </div>
            <input
              type="range"
              min="20"
              max="90"
              step="5"
              value={duration}
              onChange={e => handleDurationChange(Number(e.target.value))}
              className="w-full accent-[#ff3278] cursor-pointer"
            />
          </div>

          {/* Calories Burned */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Calories Burned (kcal)
            </label>
            <div className="relative">
              <input
                type="number"
                value={calories}
                onChange={e => setCalories(Number(e.target.value))}
                min="50"
                max="2000"
                className="w-full bg-[#0b0c10] border border-[#23293a] rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-[#ff3278]"
              />
              <span className="absolute right-3.5 top-2.5 text-xs text-slate-500">
                kcal
              </span>
            </div>
          </div>

          {/* Optional notes */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Workout Notes (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="e.g., Felt strong on squats, 5x5 at 100kg"
              className="w-full bg-[#0b0c10] border border-[#23293a] rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ff3278]"
            />
          </div>

          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={closeModal}
              className="py-2.5 px-4 bg-[#1b202c] hover:bg-[#232938] text-slate-300 text-xs font-medium rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 bg-gradient-to-r from-[#ff3278] to-[#ff5e3a] hover:from-[#ff226a] hover:to-[#ff4d26] text-white text-xs font-bold rounded-xl shadow-lg transition-all"
            >
              Log Workout & Update Streak
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
