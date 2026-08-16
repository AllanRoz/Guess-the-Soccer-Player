import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, TrendingUp, Calendar, Clock, ChevronRight, HelpCircle } from 'lucide-react';

export function Header({ onNavigate, currentPage }) {
  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-stadium-700/50">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 group"
          >
            <span className="text-2xl group-hover:animate-bounce">⚽</span>
            <span className="font-display text-xl font-bold text-white tracking-wider">
              GUESS THE <span className="text-pitch-400">PLAYER</span>
            </span>
          </button>
          
          <nav className="flex items-center gap-1">
            {['home', 'stats', 'encyclopedia'].map((page) => (
              <button
                key={page}
                onClick={() => onNavigate(page)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentPage === page
                    ? 'bg-pitch-500/20 text-pitch-400'
                    : 'text-stadium-400 hover:text-white hover:bg-stadium-800'
                }`}
              >
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

export function ModeCard({ mode, onClick, featured = false, streak = 0 }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative w-full text-left p-5 rounded-2xl border transition-all ${
        featured
          ? 'bg-gradient-to-br from-gold-500/20 to-stadium-800 border-gold-500/50 box-glow-gold'
          : 'glass-card border-stadium-700 hover:border-pitch-500/50'
      }`}
    >
      {featured && (
        <div className="absolute -top-2 -right-2 px-2 py-1 bg-gold-500 text-black text-xs font-bold rounded-full">
          FEATURED
        </div>
      )}
      
      <div className="flex items-start justify-between mb-3">
        <div className={`p-3 rounded-xl ${featured ? 'bg-gold-500/20' : 'bg-pitch-500/10'}`}>
          {mode.icon}
        </div>
        {streak > 0 && (
          <div className="flex items-center gap-1 px-2 py-1 bg-pitch-500/20 rounded-full">
            <TrendingUp size={14} className="text-pitch-400" />
            <span className="text-xs font-bold text-pitch-400">{streak}</span>
          </div>
        )}
      </div>
      
      <h3 className="text-lg font-bold text-white mb-1">{mode.title}</h3>
      <p className="text-sm text-stadium-400 mb-3">{mode.description}</p>
      
      <div className="flex items-center text-pitch-400 text-sm font-medium">
        <span>Play Now</span>
        <ChevronRight size={16} />
      </div>
    </motion.button>
  );
}

export function MiniStats({ state }) {
  const winRate = state.gamesPlayed > 0 
    ? Math.round((state.gamesWon / state.gamesPlayed) * 100) 
    : 0;

  return (
    <div className="flex flex-wrap gap-3">
      <div className="glass-card rounded-xl px-4 py-2 flex items-center gap-2">
        <Trophy size={16} className="text-gold-400" />
        <span className="text-sm text-stadium-300">{state.totalScore} <span className="text-stadium-500">pts</span></span>
      </div>
      <div className="glass-card rounded-xl px-4 py-2 flex items-center gap-2">
        <Star size={16} className="text-pitch-400" />
        <span className="text-sm text-stadium-300">{state.gamesWon}W <span className="text-stadium-500">/</span> {state.gamesPlayed - state.gamesWon}L</span>
      </div>
      <div className="glass-card rounded-xl px-4 py-2 flex items-center gap-2">
        <TrendingUp size={16} className="text-electric-cyan" />
        <span className="text-sm text-stadium-300">Streak: {state.streak}</span>
      </div>
    </div>
  );
}
