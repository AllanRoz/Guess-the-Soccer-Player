import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Building2 } from 'lucide-react';
import { useState } from 'react';
import { ResultModal } from '../components/ResultModal';
import { useGameLogic } from '../hooks/useGameLogic';

export function CareerPathMode({ player, onResult, onPlayAgain }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [guesses, setGuesses] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [gameState, setGameState] = useState('playing');
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);

  const careerStages = player?.career_path || [];
  const totalSteps = careerStages.length;

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const guess = inputValue.trim().toLowerCase();
    const playerName = player?.name?.toLowerCase();
    const correct = guess === playerName;

    setGuesses(prev => [...prev, inputValue]);
    
    if (correct) {
      setIsCorrect(true);
      setGameState('won');
      const points = Math.max(100, 500 - (currentStep * 50));
      setScore(points);
      onResult(true, points, currentStep + 1);
    } else {
      setGameState('lost');
      onResult(false, 0, currentStep + 1);
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
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-white mb-2">Career Path</h1>
        <p className="text-stadium-400">Follow the transfer journey to identify the player.</p>
      </div>

      <div className="glass-card rounded-xl p-6 mb-6">
        <div className="space-y-4">
          {careerStages.map((stage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: index <= currentStep ? 1 : 0.3, x: index <= currentStep ? 0 : 20 }}
              className="flex items-center gap-4"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                index <= currentStep ? 'bg-pitch-500 text-black' : 'bg-stadium-800 text-stadium-500'
              }`}>
                {index < currentStep ? '✓' : index + 1}
              </div>
              <div className="flex-1">
                <div className={`px-4 py-3 rounded-lg ${
                  index <= currentStep 
                    ? 'bg-stadium-800 text-white' 
                    : 'bg-stadium-900 text-stadium-600'
                }`}>
                  {index <= currentStep ? stage : '?????'}
                </div>
              </div>
              {index < currentStep && (
                <ArrowDown className="text-pitch-500" size={20} />
              )}
            </motion.div>
          ))}
        </div>

        {currentStep < totalSteps - 1 && (
          <motion.button
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
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Who is this player?"
              className="flex-1 bg-stadium-900 border border-stadium-700 rounded-lg px-4 py-3 text-white placeholder-stadium-500 focus:outline-none focus:border-pitch-500"
              autoFocus
            />
            <button
              type="submit"
              className="px-6 bg-pitch-500 text-black font-bold rounded-lg hover:bg-pitch-400 transition-all"
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
  );
}
