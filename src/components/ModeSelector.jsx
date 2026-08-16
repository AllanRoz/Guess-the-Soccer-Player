import { motion } from 'framer-motion';
import { Play, Brain, GitBranch, Calendar, Zap, ArrowRight } from 'lucide-react';

export const GAME_MODES = [
  {
    id: 'classic',
    title: 'Classic Mode',
    description: 'Reveal clues one by one and guess the player. Fewer clues = higher score!',
    icon: <Play size={24} className="text-pitch-400" />,
    page: 'classic',
  },
  {
    id: 'multiple-choice',
    title: 'Multiple Choice',
    description: 'Choose the correct player from 4 options. Quick and fun!',
    icon: <Brain size={24} className="text-electric-cyan" />,
    page: 'multiple-choice',
  },
  {
    id: 'career-path',
    title: 'Career Path',
    description: 'Trace the transfer journey to identify the player.',
    icon: <GitBranch size={24} className="text-gold-400" />,
    page: 'career-path',
  },
  {
    id: 'daily',
    title: 'Daily Challenge',
    description: 'New player every day. Compete with friends!',
    icon: <Calendar size={24} className="text-electric-magenta" />,
    page: 'daily',
    featured: true,
  },
  {
    id: 'speed',
    title: 'Speed Round',
    description: 'Guess as fast as you can. How many can you get right?',
    icon: <Zap size={24} className="text-electric-lime" />,
    page: 'speed',
  },
];

export function ModeSelector({ onModeSelect, className = '' }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {GAME_MODES.map((mode, index) => (
        <motion.button
          key={mode.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onModeSelect(mode)}
          className={`relative p-5 rounded-2xl border text-left transition-all ${
            mode.featured
              ? 'bg-gradient-to-br from-gold-500/20 to-stadium-800 border-gold-500/50'
              : 'glass-card border-stadium-700 hover:border-pitch-500/50'
          }`}
        >
          {mode.featured && (
            <div className="absolute -top-2 -right-2 px-2 py-1 bg-gold-500 text-black text-xs font-bold rounded-full">
              NEW
            </div>
          )}
          
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
            mode.featured ? 'bg-gold-500/20' : 'bg-pitch-500/10'
          }`}>
            {mode.icon}
          </div>
          
          <h3 className="text-lg font-bold text-white mb-1">{mode.title}</h3>
          <p className="text-sm text-stadium-400 mb-3">{mode.description}</p>
          
          <div className="flex items-center text-sm font-medium text-pitch-400">
            <span>Play Now</span>
            <ArrowRight size={14} className="ml-1" />
          </div>
        </motion.button>
      ))}
    </div>
  );
}
