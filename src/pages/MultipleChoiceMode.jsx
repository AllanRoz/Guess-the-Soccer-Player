import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { triggerConfetti } from '../utils/confetti';
import { soundEffects } from '../utils/audio';
import { ModeInstructions } from '../components/ClueReveal';
import { buildMultipleChoiceOptions } from '../utils/distractors';
import PLAYERS from '../data/players';

const MULTIPLE_CHOICE_STEPS = [
  'Read the clues on the player card.',
  'Pick the matching player from 4 options.',
  'Correct = +500 points. Wrong = +0.',
  'One shot per round — choose wisely!',
];

const LETTERS = ['A', 'B', 'C', 'D'];

export function MultipleChoiceMode({ player, onResult, onPlayAgain }) {
  const [selectedId, setSelectedId] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const options = useMemo(() => {
    if (!player) return [];
    return buildMultipleChoiceOptions(player, PLAYERS, 4);
  }, [player?.id]);

  const cluePreview = useMemo(() => player?.clues?.slice(0, 3) || [], [player?.id]);

  const handleSelect = useCallback(
    (chosen) => {
      if (!chosen || revealed || !player) return;
      const correct = chosen.id === player.id;
      setSelectedId(chosen.id);
      setRevealed(true);

      if (correct) {
        soundEffects.playCorrect();
        triggerConfetti('gold');
        onResult?.(true, 500, 1);
      } else {
        soundEffects.playWrong();
        onResult?.(false, 0, 1);
      }
    },
    [revealed, player, onResult]
  );

  const handlePlayAgain = () => {
    setSelectedId(null);
    setRevealed(false);
    onPlayAgain();
  };

  if (!player) {
    return (
      <div className="max-w-2xl mx-auto text-center text-stadium-400">
        Loading player…
      </div>
    );
  }

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
            <p className="text-stadium-400">Match the clues to the correct player.</p>
          </div>

          {/* Clue card */}
          <div className="glass-card rounded-xl p-6 mb-6 border-pitch-500/30">
            <p className="text-center text-stadium-400 uppercase tracking-wider text-sm mb-4">
              Who is this player?
            </p>
            <div className="flex flex-col items-center mb-5">
              <span className="text-6xl mb-3" aria-hidden="true">{player.flag}</span>
              <p className="text-stadium-300 text-sm">
                {player.nationality} · {player.position}
              </p>
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              {cluePreview.map((clue) => (
                <div
                  key={clue.id}
                  className="flex items-center gap-3 bg-stadium-900/40 rounded-lg p-3 border border-stadium-700"
                >
                  <span className="text-2xl">{clue.icon}</span>
                  <span className="text-white flex-1">{clue.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Options */}
          <div
            className="grid grid-cols-1 gap-3"
            role="radiogroup"
            aria-label="Choose the matching player"
          >
            {options.map((option, index) => {
              const isSelected = selectedId === option.id;
              const isCorrectOption = option.id === player.id;
              const letter = LETTERS[index] || '';

              let buttonClass = 'glass-card border-stadium-700 hover:border-pitch-500/50 ';
              if (revealed) {
                if (isCorrectOption) {
                  buttonClass = 'bg-pitch-500/20 border-pitch-500 box-glow-green ';
                } else if (isSelected) {
                  buttonClass = 'bg-red-500/20 border-red-500 ';
                } else {
                  buttonClass = 'opacity-50 border-stadium-700 ';
                }
              }

              return (
                <motion.button
                  key={option.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  aria-disabled={revealed}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={!revealed ? { scale: 1.02 } : {}}
                  whileTap={!revealed ? { scale: 0.98 } : {}}
                  onClick={() => handleSelect(option)}
                  disabled={revealed}
                  className={`${buttonClass} p-4 rounded-xl text-left transition-all flex items-center gap-3`}
                >
                  <span
                    className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center font-bold ${
                      revealed && isCorrectOption
                        ? 'bg-pitch-500 text-black'
                        : revealed && isSelected
                        ? 'bg-red-500 text-white'
                        : 'bg-stadium-800 text-stadium-400'
                    }`}
                  >
                    {revealed && isCorrectOption ? (
                      <Check size={16} />
                    ) : revealed && isSelected ? (
                      <X size={16} />
                    ) : (
                      letter
                    )}
                  </span>
                  <span className="text-white font-medium flex-1 truncate">
                    {option.name}
                  </span>
                  <span className="text-xs text-stadium-400 hidden sm:inline">
                    {option.position}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {revealed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-6 text-center p-4 rounded-xl ${
                selectedId === player.id
                  ? 'bg-pitch-500/20 border border-pitch-500/50'
                  : 'bg-red-500/20 border border-red-500/50'
              }`}
              role="status"
            >
              <p
                className={`text-lg font-bold ${
                  selectedId === player.id ? 'text-pitch-400' : 'text-red-400'
                }`}
              >
                {selectedId === player.id ? 'Correct!' : 'Wrong!'}
              </p>
              <p className="text-stadium-400 mt-1">
                {selectedId === player.id
                  ? '+500 points'
                  : `The answer was ${player.name}`}
              </p>
              <motion.button
                type="button"
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
