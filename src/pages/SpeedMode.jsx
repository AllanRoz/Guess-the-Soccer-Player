import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';
import { X, Info } from 'lucide-react';

export function SpeedMode({ players, onResult, onPlayAgain }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [selected, setSelected] = useState(null);

  const currentPlayer = players[currentIndex];
  const distractors = currentPlayer?.distractors || [];
  const options = currentPlayer ? [currentPlayer.name, ...distractors].sort(() => Math.random() - 0.5) : [];

  const handleGuess = useCallback((option) => {
    if (selected !== null) return;
    
    const isCorrect = option === currentPlayer?.name;
    setSelected(option);
    
    if (isCorrect) {
      setScore(prev => prev + 100);
      setCorrect(prev => prev + 1);
    } else {
      setWrong(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentIndex < players.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setSelected(null);
      } else {
        setGameOver(true);
        onResult(correct + (selected === currentPlayer?.name ? 1 : 0), score);
      }
    }, 1000);
  }, [selected, currentIndex, currentPlayer, players, score, correct]);

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setCorrect(0);
    setWrong(0);
    setGameOver(false);
    setSelected(null);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {!gameOver ? (
        <>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <span className="text-stadium-400">Question {currentIndex + 1}/{players.length}</span>
              <span className="text-gold-400 font-bold">{score} pts</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-pitch-400">{correct}✓</span>
              <span className="text-red-400">{wrong}✗</span>
            </div>
          </div>

          {currentPlayer && (
            <div className="glass-card rounded-xl p-6 mb-6 text-center border-pitch-500/30">
              <span className="text-6xl mb-4 block">{currentPlayer.flag}</span>
              <h2 className="text-2xl font-bold text-white mb-2">{currentPlayer.name}</h2>
              <p className="text-stadium-400">{currentPlayer.current_club}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
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
                  onClick={() => handleGuess(option)}
                  disabled={selected !== null}
                  className={`${className} p-4 rounded-xl text-white font-medium transition-all`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-3xl font-display font-bold text-white mb-4">Game Over!</h2>
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
          <button
            onClick={handleRestart}
            className="px-8 py-3 bg-pitch-500 text-black font-bold rounded-xl hover:bg-pitch-400 transition-all"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
