import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Trophy, Star, TrendingUp } from 'lucide-react';

export function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="sticky top-0 z-40 bg-stadium-900/85 backdrop-blur-md border-b border-stadium-700/50">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 group"
          >
            <span className="text-2xl group-hover:animate-bounce">⚽</span>
            <span className="font-display text-xl font-bold text-white tracking-wider">
              GUESS THE <span className="text-pitch-400">PLAYER</span>
            </span>
          </Link>
          
          <nav className="flex items-center gap-1">
            {[
              { path: '/', label: 'Home' },
              { path: '/stats', label: 'Stats' },
              { path: '/history', label: 'History' },
              { path: '/encyclopedia', label: 'Encyclopedia' },
              { path: '/settings', label: 'Settings' }
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentPath === link.path
                    ? 'bg-pitch-500/20 text-pitch-400'
                    : 'text-stadium-400 hover:text-white hover:bg-stadium-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
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
        <span className="text-sm text-stadium-300">
          {state.totalScore?.toLocaleString() || 0} <span className="text-stadium-500">pts</span>
        </span>
      </div>
      <div className="glass-card rounded-xl px-4 py-2 flex items-center gap-2">
        <Star size={16} className="text-pitch-400" />
        <span className="text-sm text-stadium-300">
          {state.gamesWon}W <span className="text-stadium-500">/</span> {state.gamesPlayed - state.gamesWon}L
        </span>
      </div>
      <div className="glass-card rounded-xl px-4 py-2 flex items-center gap-2">
        <TrendingUp size={16} className="text-electric-cyan" />
        <span className="text-sm text-stadium-300">Streak: {state.streak}</span>
      </div>
    </div>
  );
}
