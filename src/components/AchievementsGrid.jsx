import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Award, Crown } from 'lucide-react';

const ACHIEVEMENTS = [
  { id: 'first_win', name: 'First Victory', description: 'Win your first game', icon: Trophy, condition: (s) => s.gamesWon >= 1 },
  { id: 'streak_3', name: 'On Fire', description: 'Get a 3-game win streak', icon: Star, condition: (s) => s.bestStreak >= 3 },
  { id: 'streak_5', name: 'Unstoppable', description: 'Get a 5-game win streak', icon: Crown, condition: (s) => s.bestStreak >= 5 },
  { id: 'score_1000', name: 'Century', description: 'Score 1000 points total', icon: Award, condition: (s) => s.totalScore >= 1000 },
  { id: 'score_5000', name: 'Legend', description: 'Score 5000 points total', icon: Trophy, condition: (s) => s.totalScore >= 5000 },
  { id: 'games_10', name: 'Dedicated', description: 'Play 10 games', icon: Star, condition: (s) => s.gamesPlayed >= 10 },
  { id: 'games_50', name: 'Addicted', description: 'Play 50 games', icon: Crown, condition: (s) => s.gamesPlayed >= 50 },
  { id: 'perfect_guess', name: 'Perfect Guess', description: 'Guess correctly on first clue', icon: Award, condition: () => false },
];

export function AchievementCard({ achievement, unlocked, className = '' }) {
  const Icon = achievement.icon;
  
  return (
    <motion.div
      whileHover={{ scale: unlocked ? 1.02 : 1 }}
      className={`relative p-4 rounded-xl border ${
        unlocked 
          ? 'bg-gradient-to-br from-stadium-800 to-stadium-900 border-gold-500/50 box-glow-gold' 
          : 'bg-stadium-900/50 border-stadium-700 opacity-60'
      } ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${unlocked ? 'bg-gold-500/20 text-gold-400' : 'bg-stadium-700 text-stadium-600'}`}>
          <Icon size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className={`font-semibold text-sm ${unlocked ? 'text-gold-400' : 'text-stadium-500'}`}>
            {achievement.name}
          </h4>
          <p className="text-xs text-stadium-400 mt-0.5">{achievement.description}</p>
        </div>
        {unlocked && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-2 right-2 w-2 h-2 bg-gold-400 rounded-full"
          />
        )}
      </div>
    </motion.div>
  );
}

export function AchievementsGrid({ state, className = '' }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 ${className}`}>
      {ACHIEVEMENTS.map((achievement) => (
        <AchievementCard
          key={achievement.id}
          achievement={achievement}
          unlocked={achievement.condition(state)}
        />
      ))}
    </div>
  );
}
