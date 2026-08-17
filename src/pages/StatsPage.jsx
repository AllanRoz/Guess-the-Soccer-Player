import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, Star, TrendingUp, Clock, Target, Award } from 'lucide-react';
import { StatsCard } from '../components/StatsCard';
import { AchievementsGrid } from '../components/AchievementsGrid';

export function StatsPage({ state }) {
  const winRate = state.gamesPlayed > 0 
    ? Math.round((state.gamesWon / state.gamesPlayed) * 100) 
    : 0;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link
          to="/"
          className="text-stadium-400 hover:text-white transition-colors mb-4 inline-flex items-center gap-2"
        >
          ← Back to Home
        </Link>
        <h1 className="text-3xl font-display font-bold text-white">Your Stats</h1>
      </div>

      <StatsOverview state={state} winRate={winRate} />

      <div className="mt-8">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Award size={20} className="text-gold-400" />
          Achievements
        </h2>
        <AchievementsGrid state={state} />
      </div>
    </div>
  );
}

function StatsOverview({ state, winRate }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
      <StatsCard
        icon={Target}
        label="Games Played"
        value={state.gamesPlayed}
        subtext="Total matches"
      />
      <StatsCard
        icon={Clock}
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
      <div className="glass-card rounded-xl p-4 bg-stadium-900/40">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gold-500/10 text-gold-400">
            <Trophy size={20} />
          </div>
          <div>
            <p className="text-2xl font-display font-bold text-gold-400">
              {state.totalScore?.toLocaleString() || 0}
            </p>
            <p className="text-xs text-stadium-400">Total Score</p>
          </div>
        </div>
      </div>
    </div>
  );
}
