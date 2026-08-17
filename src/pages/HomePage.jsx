import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ModeSelector } from '../components/ModeSelector';
import { MiniStats } from '../components/Header';
import PLAYERS from '../data/players';
import { useDailyPlayer } from '../hooks/useLocalStorage';

export function HomePage({ state }) {
  const navigate = useNavigate();
  const dailyPlayerId = useDailyPlayer();
  const dailyPlayer = PLAYERS.find(p => p.id === dailyPlayerId) || PLAYERS[0];

  const handleModeSelect = (mode) => {
    if (mode.page === 'daily') {
      navigate('/play/classic'); // Daily plays classic with the daily player
    } else {
      navigate(`/play/${mode.page}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center py-12">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-8xl mb-4 animate-float"
        >
          ⚽
        </motion.div>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-6xl font-display font-bold text-white mb-4 tracking-tight"
        >
          GUESS THE <span className="text-pitch-400">PLAYER</span>
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-stadium-400 max-w-xl mx-auto"
        >
          Test your football knowledge! Guess legendary and modern stars through clues, transfers, and career paths.
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
        <div className="glass-card rounded-xl p-6 border-gold-500/30 box-glow-gold bg-stadium-900/40">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span className="text-5xl">{dailyPlayer.flag}</span>
            <div className="flex-1 text-center sm:text-left">
              <p className="text-stadium-400 text-sm">Today's Player Clue</p>
              <p className="text-white font-bold text-lg mt-1">{dailyPlayer.daily_hint}</p>
            </div>
            <button
              onClick={() => handleModeSelect({ page: 'daily' })}
              className="px-6 py-3 bg-gold-500 text-black font-bold rounded-xl hover:bg-gold-400 transition-all shadow-lg hover:shadow-gold-500/20"
            >
              Play Daily Challenge
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
