import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ResultModal } from '../components/ResultModal';
import { ModeInstructions } from '../components/ClueReveal';

const CAREER_STEPS = [
  "Reveal each club in the player's career path.",
  'Type the player name to guess.',
  'Fewer clubs revealed = higher score.',
  'One wrong guess ends the round.',
];

function normalize(value = '') {
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s]/g, '').trim();
}

export function CareerPathMode({ player, onResult, onPlayAgain }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [guesses, setGuesses] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [gameState, setGameState] = useState('playing');
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    setCurrentStep(0);
    setGuesses([]);
    setInputValue('');
    setGameState('playing');
    setScore(0);
    setIsCorrect(false);
  }, [player?.id]);

  const careerStages = player?.career_path || [];
  const totalSteps = careerStages.length;

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const guess = inputValue.trim();
    if (!guess || gameState !== 'playing') return;

    const candidates = [player?.name, player?.full_name, player?.id]
      .filter(Boolean)
      .map(normalize);
    const normalizedGuess = normalize(guess);
    const correct = candidates.some(
      (name) => name === normalizedGuess || name.includes(normalizedGuess)
    );

    setGuesses((prev) => [...prev, guess]);
    setInputValue('');

    if (correct) {
      const points = Math.max(100, 500 - currentStep * 50);
      setIsCorrect(true);
      setGameState('won');
      setScore(points);
      onResult?.(true, points, currentStep + 1);
    } else {
      setGameState('lost');
      onResult?.(false, 0, currentStep + 1);
    }
  };

  const handlePlayAgain = () => {
    setCurrentStep(0);
    setGuesses([]);
    setInputValue('');
    setGameState('playing');
    setScore(0);
    setIsCorrect(false);
    onPlayAgain();
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex gap-8">
        <ModeInstructions title="How to Play" steps={CAREER_STEPS} />

        <div className="flex-1">
          <div className="mb-6">
            <Link
              to="/"
              className="text-stadium-400 hover:text-white transition-colors mb-2 inline-flex items-center gap-2"
            >
              ← Back
            </Link>
            <h1 className="text-2xl font-display font-bold text-white mb-2">Career Path</h1>
            <p className="text-stadium-400">Follow the transfer journey to identify the player.</p>
          </div>

          <div className="glass-card rounded-xl p-6 mb-6">
            <div className="space-y-4">
              {careerStages.map((stage, index) => (
                <motion.div
                  key={`${player?.id}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: index <= currentStep ? 1 : 0.3,
                    x: index <= currentStep ? 0 : 20,
                  }}
                  className="flex items-center gap-4"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      index <= currentStep
                        ? 'bg-pitch-500 text-black'
                        : 'bg-stadium-800 text-stadium-500'
                    }`}
                  >
                    {index < currentStep ? '✓' : index + 1}
                  </div>
                  <div className="flex-1">
                    <div
                      className={`px-4 py-3 rounded-lg ${
                        index <= currentStep
                          ? 'bg-stadium-800 text-white'
                          : 'bg-stadium-900 text-stadium-600'
                      }`}
                    >
                      {index <= currentStep ? stage : '?????'}
                    </div>
                  </div>
                  {index < currentStep && (
                    <ArrowDown className="text-pitch-500" size={20} />
                  )}
                </motion.div>
              ))}
            </div>

            {currentStep < totalSteps - 1 && gameState === 'playing' && (
              <motion.button
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={nextStep}
                className="mt-6 w-full py-3 bg-pitch-500/20 border border-pitch-500/50 text-pitch-400 font-medium rounded-xl hover:bg-pitch-500/30 transition-all"
              >
                Reveal Next Club
              </motion.button>
            )}
          </div>

          {gameState === 'playing' && (
            <form onSubmit={handleSubmit} className="glass-card rounded-xl p-4">
              <label htmlFor="career-guess" className="sr-only">Player name</label>
              <div className="flex gap-2">
                <input
                  id="career-guess"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Who is this player?"
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
            </form>
          )}

          <ResultModal
            player={player}
            gameState={gameState}
            score={score}
            guesses={guesses}
            onPlayAgain={handlePlayAgain}
            revealedClues={[]}
          />
        </div>
      </div>
    </div>
  );
}
