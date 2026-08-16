import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, TrendingUp, Calendar, Clock } from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';

export function ResultModal({ player, gameState, score, guesses, onPlayAgain, revealedClues, className = '' }) {
  const isWin = gameState === 'won';
  
  return (
    <AnimatePresence>
      {gameState !== 'playing' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm ${className}`}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            className="glass-panel rounded-2xl p-6 max-w-md w-full border border-pitch-500/30"
          >
            <div className="text-center mb-6">
              {isWin ? (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 12 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold-500/20 text-gold-400 mb-4"
                  >
                    <Trophy size={32} />
                  </motion.div>
                  <h2 className="text-2xl font-display font-bold text-gold-400">CORRECT!</h2>
                  <p className="text-stadium-300 mt-1">You guessed it!</p>
                </>
              ) : (
                <>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 text-red-400 mb-4">
                    <Clock size={32} />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-red-400">OUT OF CLUES!</h2>
                  <p className="text-stadium-300 mt-1">Better luck next time</p>
                </>
              )}
            </div>

            {player && (
              <div className="bg-stadium-900/50 rounded-xl p-4 mb-4 border border-stadium-700">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">{player.flag}</span>
                  <div>
                    <h3 className="text-xl font-bold text-white">{player.name}</h3>
                    <p className="text-sm text-stadium-400">{player.current_club}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-stadium-800 rounded-lg p-2">
                    <p className="text-xs text-stadium-500">Position</p>
                    <p className="font-semibold text-pitch-400">{player.position}</p>
                  </div>
                  <div className="bg-stadium-800 rounded-lg p-2">
                    <p className="text-xs text-stadium-500">Goals</p>
                    <p className="font-semibold text-pitch-400">{player.goals_scored}</p>
                  </div>
                  <div className="bg-stadium-800 rounded-lg p-2">
                    <p className="text-xs text-stadium-500">Trophies</p>
                    <p className="font-semibold text-pitch-400">{player.trophies_count}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-stadium-400">Score</span>
                <span className="font-bold text-gold-400">{score} pts</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stadium-400">Clues Used</span>
                <span className="font-bold text-white">{guesses.length > 0 ? guesses.length : 'All'}</span>
              </div>
              {isWin && (
                <div className="flex justify-between text-sm">
                  <span className="text-stadium-400">Bonus</span>
                  <span className="font-bold text-pitch-400">+100</span>
                </div>
              )}
            </div>

            {isWin && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  triggerConfetti('gold');
                  onPlayAgain();
                }}
                className="w-full py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-black font-bold rounded-xl hover:from-gold-400 hover:to-gold-500 transition-all"
              >
                Play Again
              </motion.button>
            )}
            
            {!isWin && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onPlayAgain}
                className="w-full py-3 bg-pitch-500 text-black font-bold rounded-xl hover:bg-pitch-400 transition-all"
              >
                Try Next Player
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
