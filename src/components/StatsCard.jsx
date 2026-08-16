import { motion } from 'framer-motion';
import { Target, Activity, TrendingUp } from 'lucide-react';

export function StatsCard({ icon: Icon, label, value, subtext, className = '' }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={`glass-card rounded-xl p-4 ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-pitch-500/10 text-pitch-400">
          <Icon size={20} />
        </div>
        <div>
          <p className="text-2xl font-display font-bold text-white">{value}</p>
          <p className="text-xs text-stadium-400">{label}</p>
          {subtext && <p className="text-xs text-stadium-500 mt-0.5">{subtext}</p>}
        </div>
      </div>
    </motion.div>
  );
}

export function StatsOverview({ state, className = '' }) {
  const winRate = state.gamesPlayed > 0 
    ? Math.round((state.gamesWon / state.gamesPlayed) * 100) 
    : 0;

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 ${className}`}>
      <StatsCard
        icon={Activity}
        label="Games Played"
        value={state.gamesPlayed}
        subtext="Total matches"
      />
      <StatsCard
        icon={Target}
        label="Win Rate"
        value={`${winRate}%`}
        subtext={`${state.gamesWon}W / ${state.gamesPlayed - state.gamesWon}L`}
      />
      <StatsCard
        icon={TrendingUp}
        label="Best Streak"
        value={state.bestStreak}
        subtext="Consecutive wins"
      />
      <div className="glass-card rounded-xl p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gold-500/10 text-gold-400">
            <Trophy size={20} />
          </div>
          <div>
            <p className="text-2xl font-display font-bold text-gold-400">
              {state.totalScore.toLocaleString()}
            </p>
            <p className="text-xs text-stadium-400">Total Score</p>
          </div>
        </div>
      </div>
    </div>
  );
}
