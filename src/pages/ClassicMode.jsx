import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ClueReveal, ModeInstructions } from '../components/ClueReveal';
import { ResultModal } from '../components/ResultModal';
import { useGameLogic } from '../hooks/useGameLogic';

const CLASSIC_STEPS = [
  'Type the player name you think matches the clues.',
  'Guess at any time — fewer clues = higher score.',
  'Wrong guesses just cost you clues, not the game.',
  'Out of clues? The answer is revealed.',
];

export function ClassicMode({ player, onResult, onPlayAgain }) {
  const {
    gameState,
    revealedClues,
    guesses,
    score,
    nextClue,
    makeGuess,
    startNewGame,
  } = useGameLogic(player, onResult);

  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const guess = inputValue.trim();
    if (!guess || gameState !== 'playing') return;

    const accepted = makeGuess(guess);
    setInputValue('');
    setFeedback(accepted ? '' : 'Not quite. Try another name or reveal another clue.');
  };

  const handlePlayAgain = () => {
    setInputValue('');
    setFeedback('');
    startNewGame();
    onPlayAgain();
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex gap-8">
        <ModeInstructions title="How to Play" steps={CLASSIC_STEPS} />

        <div className="flex-1">
          <div className="mb-6">
            <Link
              to="/"
              className="text-stadium-400 hover:text-white transition-colors mb-2 inline-flex items-center gap-2"
            >
              ← Back
            </Link>
            <h1 className="text-2xl font-display font-bold text-white mb-2">Classic Mode</h1>
            <p className="text-stadium-400">Guess the player. Reveal clues or guess at any time.</p>
          </div>

          <ClueReveal
            revealedClues={revealedClues}
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
            <label htmlFor="player-guess" className="sr-only">Player name</label>
            <div className="flex gap-2">
              <input
                id="player-guess"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter player name..."
                className="flex-1 bg-stadium-900 border border-stadium-700 rounded-lg px-4 py-3 text-white placeholder-stadium-500 focus:outline-none focus:border-pitch-500"
                autoFocus
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="px-6 bg-pitch-500 text-black font-bold rounded-lg hover:bg-pitch-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Guess
              </button>
            </div>

            {feedback && (
              <p className="mt-3 text-sm text-red-400" role="status">{feedback}</p>
            )}

            {guesses.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {guesses.map((guess, i) => (
                  <span key={`${guess}-${i}`} className="px-2 py-1 bg-stadium-800 rounded text-xs text-stadium-400">
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
      </div>
    </div>
  );
}
