import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ModeInstructions } from '../components/ClueReveal';

const SPEED_STEPS = [
  'Quick-fire 10 questions.',
  'Pick the correct player from 4 options.',
  'Correct = +100 points. Wrong = +0.',
  'No timer — play at your pace.',
];

const QUESTIONS_PER_ROUND = 10;

export function SpeedMode({ players, onResult, onPlayAgain }) {
  const round = useMemo(() => {
    const shuffled = [...players].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(QUESTIONS_PER_ROUND, shuffled.length));
  }, [players]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [selected, setSelected] = useState(null);

  const currentPlayer = round[currentIndex];
  const distractors = currentPlayer?.distractors || [];
  const options = useMemo(
    () =>
      currentPlayer
        ? [currentPlayer.name, ...distractors].filter(Boolean).sort(() => 0.5 - Math.random())
        : [],
    [currentPlayer?.id, distractors.join('|')]
  );

  const cluePreview = useMemo(() => {
    if (!currentPlayer?.clues) return [];
    return currentPlayer.clues.slice(0, 3);
  }, [currentPlayer?.id]);

  const handleGuess = useCallback((option) => {
    if (selected !== null || !currentPlayer) return;

    const isCorrect = option === currentPlayer.name;
    setSelected(option);

    setScore((prev) => (isCorrect ? prev + 100 : prev));
    setCorrect((prev) => (isCorrect ? prev + 1 : prev));
    setWrong((prev) => (isCorrect ? prev : prev + 1));

    setTimeout(() => {
      if (currentIndex < round.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setSelected(null);
      } else {
        setGameOver(true);
        onResult?.(correct + (isCorrect ? 1 : 0), score + (isCorrect ? 100 : 0), 1, currentPlayer.id);
      }
    }, 900);
  }, [selected, currentIndex, currentPlayer, round, score, correct, onResult]);

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setCorrect(0);
    setWrong(0);
    setGameOver(false);
    setSelected(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex gap-8">
        <ModeInstructions title="How to Play" steps={SPEED_STEPS} />

        <div className="flex-1">
          <div className="mb-6">
            <Link
              to="/"
              className="text-stadium-400 hover:text-white transition-colors mb-2 inline-flex items-center gap-2"
            >
              ← Back
            </Link>
            <h1 className="text-2xl font-display font-bold text-white mb-2">Speed Round</h1>
            <p className="text-stadium-400">Race through {round.length} quick-fire questions.</p>
          </div>

          {!gameOver ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <span className="text-stadium-400">Question {currentIndex + 1}/{round.length}</span>
                  <span className="text-gold-400 font-bold">{score} pts</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-pitch-400">{correct}✓</span>
                  <span className="text-red-400">{wrong}✗</span>
                </div>
              </div>

              {currentPlayer && (
                <div className="glass-card rounded-xl p-6 mb-6 border-pitch-500/30">
                  <p className="text-center text-stadium-400 uppercase tracking-wider text-sm mb-4">
                    Who is this player?
                  </p>
                  <p className="text-6xl text-center mb-4 block">{currentPlayer.flag}</p>
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
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {options.map((option) => {
                  const isSelected = selected === option;
                  const isCorrectOption = option === currentPlayer?.name;

                  let className = 'glass-card border-stadium-700 hover:border-pitch-500/50 ';
                  if (selected !== null) {
                    if (isCorrectOption) className = 'bg-pitch-500/20 border-pitch-500 ';
                    else if (isSelected) className = 'bg-red-500/20 border-red-500 ';
                    else className = 'opacity-50 ';
                  }

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleGuess(option)}
                      disabled={selected !== null}
                      className={`${className} p-4 rounded-xl text-white font-medium transition-all text-left`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-3xl font-display font-bold text-white mb-4">Round Complete!</h2>
              <div className="flex justify-center gap-8 mb-6">
                <div>
                  <p className="text-4xl font-bold text-pitch-400">{correct}</p>
                  <p className="text-stadium-400">Correct</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-gold-400">{score}</p>
                  <p className="text-stadium-400">Points</p>
                </div>
              </div>
              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="px-8 py-3 bg-pitch-500 text-black font-bold rounded-xl hover:bg-pitch-400 transition-all"
                >
                  Play Again
                </button>
                <button
                  type="button"
                  onClick={onPlayAgain}
                  className="px-8 py-3 bg-stadium-800 text-white font-bold rounded-xl hover:bg-stadium-700 transition-all"
                >
                  New Round
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
