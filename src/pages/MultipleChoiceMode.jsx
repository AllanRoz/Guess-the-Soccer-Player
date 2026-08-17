import { motion } from 'framer-motion';
import { Check, X, HelpCircle } from 'lucide-react';
import { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { triggerConfetti } from '../utils/confetti';
import { soundEffects } from '../utils/audio';
import { ModeInstructions } from '../components/ClueReveal';

const MULTIPLE_CHOICE_STEPS = [
  'Read the clues carefully.',
  'Pick the correct player from 4 options.',
  'Correct = +500 points. Wrong = +0.',
  'No second chances — choose wisely!',
];

export function MultipleChoiceMode({ player, onResult, onPlayAgain }) {
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);

  const distractors = player?.distractors || [];
  const options = useMemo(
    () => [player?.name, ...distractors].filter(Boolean).sort(() => Math.random() - 0.5),
    [player?.name, distractors.join('|')]
  );

  const handleSelect = useCallback((option) => {
    if (selected !== null) return;
    
    const correct = option === player?.name;
    setSelected(option);
    setIsCorrect(correct);
    
    if (correct) {
      setScore(500);
      soundEffects.playCorrect();
      triggerConfetti('gold');
      onResult(true, 500, 1);
    } else {
      soundEffects.playWrong();
      onResult(false, 0, 1);
    }
  }, [selected, player, onResult]);

  const handlePlayAgain = () => {
    setSelected(null);
    setIsCorrect(null);
    setScore(0);
    onPlayAgain();
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex gap-8">
        <ModeInstructions title="How to Play" steps={MULTIPLE_CHOICE_STEPS} />

        <div className="flex-1">
          <div className="mb-6">
            <Link
              to="/"
              className="text-stadium-400 hover:text-white transition-colors mb-2 inline-flex items-center gap-2"
            >
              ← Back
            </Link>
            <h1 className="text-2xl font-display font-bold text-white mb-2">Multiple Choice</h1>
            <p className="text-stadium-400">Select the correct player!</p>
          </div>

          <div className="glass-card rounded-xl p-6 mb-6 border-pitch-500/30">
        <div className="text-center mb-4">
          <span className="text-6xl mb-4 block">{player?.flag}</span>
          <h2 className="text-xl font-bold text-white">Who is this player?</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {options.map((option, index) => {
            const letters = ['A', 'B', 'C', 'D'];
            const isSelected = selected === option;
            const isCorrectOption = option === player?.name;
            const showResult = selected !== null;
            
            let buttonClass = 'glass-card border-stadium-700 hover:border-pitch-500/50 ';
            
            if (showResult) {
              if (isCorrectOption) {
                buttonClass = 'bg-pitch-500/20 border-pitch-500 box-glow-green ';
              } else if (isSelected && !isCorrectOption) {
                buttonClass = 'bg-red-500/20 border-red-500 ';
              } else {
                buttonClass = 'opacity-50 border-stadium-700 ';
              }
            }

            return (
              <motion.button
                key={option}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={!showResult ? { scale: 1.02 } : {}}
                whileTap={!showResult ? { scale: 0.98 } : {}}
                onClick={() => handleSelect(option)}
                className={`${buttonClass} p-4 rounded-xl text-left transition-all flex items-center gap-3`}
                disabled={showResult}
              >
                <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  showResult && isCorrectOption
                    ? 'bg-pitch-500 text-black'
                    : showResult && isSelected
                    ? 'bg-red-500 text-white'
                    : 'bg-stadium-800 text-stadium-400'
                }`}>
                  {showResult && isCorrectOption ? <Check size={16} /> : showResult && isSelected ? <X size={16} /> : letters[index]}
                </span>
                <span className="text-white font-medium">{option}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {selected !== null && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center p-4 rounded-xl ${isCorrect ? 'bg-pitch-500/20 border border-pitch-500/50' : 'bg-red-500/20 border border-red-500/50'}`}
        >
          <p className={`text-lg font-bold ${isCorrect ? 'text-pitch-400' : 'text-red-400'}`}>
            {isCorrect ? 'Correct!' : 'Wrong!'}
          </p>
          <p className="text-stadium-400 mt-1">
            {isCorrect ? `+${score} points` : `The answer was ${player?.name}`}
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePlayAgain}
            className="mt-4 px-6 py-2 bg-pitch-500 text-black font-bold rounded-lg hover:bg-pitch-400 transition-all"
          >
            Play Again
          </motion.button>
        </motion.div>
      )}
        </div>
      </div>
    </div>
  );
}
