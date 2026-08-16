import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ClueReveal } from '../components/ClueReveal';
import { ResultModal } from '../components/ResultModal';
import { useGameLogic } from '../hooks/useGameLogic';

export function ClassicMode({ player, onResult, onPlayAgain }) {
  const {
    gameState,
    currentClue,
    revealedClues,
    guesses,
    isCorrect,
    score,
    nextClue,
    makeGuess,
    startNewGame,
  } = useGameLogic(player, onResult);

  const [inputValue, setInputValue] = useState('');
  const [hasGuessed, setHasGuessed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || hasGuessed) return;
    
    makeGuess(inputValue.trim());
    setHasGuessed(true);
  };

  const handlePlayAgain = () => {
    setInputValue('');
    setHasGuessed(false);
    startNewGame();
    onPlayAgain();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <button
          onClick={onPlayAgain}
          className="text-stadium-400 hover:text-white transition-colors mb-2 flex items-center gap-2"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-display font-bold text-white mb-2">Classic Mode</h1>
        <p className="text-stadium-400">Guess the player! Reveal clues or guess at any time.</p>
      </div>

      <ClueReveal
        revealedClues={revealedClues}
        currentClue={currentClue}
        onRevealNext={nextClue}
        totalClues={player?.clues?.length || 10}
        className="mb-6"
      />

      <AnimatePresence>
        {gameState === 'playing' && (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmit}
            className="glass-card rounded-xl p-4"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter player name..."
                className="flex-1 bg-stadium-900 border border-stadium-700 rounded-lg px-4 py-3 text-white placeholder-stadium-500 focus:outline-none focus:border-pitch-500"
                autoFocus
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="px-6 bg-pitch-500 text-black font-bold rounded-lg hover:bg-pitch-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Guess
              </button>
            </div>
            
            {guesses.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {guesses.map((guess, i) => (
                  <span key={i} className="px-2 py-1 bg-stadium-800 rounded text-xs text-stadium-400">
                    {guess}
                  </span>
                ))}
              </div>
            )}
          </motion.form>
        )}
      </AnimatePresence>

      <ResultModal
        player={player}
        gameState={gameState}
        score={score}
        guesses={guesses}
        onPlayAgain={handlePlayAgain}
        revealedClues={revealedClues}
      />
    </div>
  );
}
