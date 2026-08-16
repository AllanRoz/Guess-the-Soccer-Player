import { motion } from 'framer-motion';
import { ModeSelector } from '../components/ModeSelector';
import { MiniStats } from '../components/Header';
import PLAYERS from '../data/players';
import { useDailyPlayer } from '../hooks/useLocalStorage';

export function HomePage({ onNavigate, onModeSelect, state }) {
  const dailyPlayerId = useDailyPlayer();
  const dailyPlayer = PLAYERS.find(p => p.id === dailyPlayerId) || PLAYERS[0];

  const handleModeSelect = (mode) => {
    onModeSelect(mode);
    if (mode.page === 'classic') {
      onNavigate('classic', dailyPlayer);
    } else if (mode.page === 'multiple-choice') {
      onNavigate('multiple-choice', dailyPlayer);
    } else if (mode.page === 'career-path') {
      onNavigate('career-path', dailyPlayer);
    } else if (mode.page === 'speed') {
      onNavigate('speed', PLAYERS.slice(0, 5));
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center py-12">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-8xl mb-4"
        >
          ⚽
        </motion.div>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-6xl font-display font-bold text-white mb-4"
        >
          GUESS THE <span className="text-pitch-400">PLAYER</span>
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-stadium-400 max-w-xl mx-auto"
        >
          Test your football knowledge! Guess legendary and modern stars through clues, transfers, and more.
        </motion.p>
      </div>

      <div className="flex justify-center mb-8">
        <MiniStats state={state} />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-gold-400">★</span>
          Daily Challenge
        </h2>
        <div className="glass-card rounded-xl p-4 border-gold-500/30 box-glow-gold">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{dailyPlayer.flag}</span>
            <div className="flex-1">
              <p className="text-stadium-400 text-sm">Today's Player</p>
              <p className="text-white font-bold text-lg">{dailyPlayer.name}</p>
              <p className="text-stadium-500 text-sm">{dailyPlayer.daily_hint}</p>
            </div>
            <button
              onClick={() => handleModeSelect({ page: 'classic' })}
              className="px-4 py-2 bg-gold-500 text-black font-bold rounded-lg hover:bg-gold-400 transition-all"
            >
              Play
            </button>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-white mb-4">Choose Your Mode</h2>
        <ModeSelector onModeSelect={handleModeSelect} />
      </div>
    </div>
  );
}
