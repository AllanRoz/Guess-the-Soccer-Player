import { useState, useCallback, useMemo } from 'react';
import { soundEffects } from '../utils/audio';

export function useGameLogic(player, onResult) {
  const [currentClueIndex, setCurrentClueIndex] = useState(0);
  const [guesses, setGuesses] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameState, setGameState] = useState('playing');
  const [score, setScore] = useState(0);

  const currentClue = useMemo(() => {
    return player?.clues?.[currentClueIndex] || null;
  }, [player, currentClueIndex]);

  const revealedClues = useMemo(() => {
    return player?.clues?.slice(0, currentClueIndex + 1) || [];
  }, [player, currentClueIndex]);

  const nextClue = useCallback(() => {
    if (currentClueIndex < (player?.clues?.length || 0) - 1) {
      setCurrentClueIndex(prev => prev + 1);
      soundEffects.playClueReveal();
    }
  }, [currentClueIndex, player]);

  const makeGuess = useCallback((guess) => {
    const normalizedGuess = guess.toLowerCase().trim();
    const playerName = player?.name?.toLowerCase();
    const isGuessCorrect = normalizedGuess === playerName;

    setGuesses(prev => [...prev, guess]);
    
    if (isGuessCorrect) {
      setIsCorrect(true);
      setGameState('won');
      const points = Math.max(100, 500 - (currentClueIndex * 40));
      setScore(points);
      soundEffects.playCorrect();
      onResult(true, points, currentClueIndex + 1);
    } else {
      soundEffects.playWrong();
      if (currentClueIndex >= (player?.clues?.length || 0) - 1) {
        setGameState('lost');
        soundEffects.playWhistle();
        onResult(false, 0, currentClueIndex + 1);
      }
    }
  }, [player, currentClueIndex, onResult]);

  const startNewGame = useCallback(() => {
    setCurrentClueIndex(0);
    setGuesses([]);
    setIsCorrect(false);
    setGameState('playing');
    setScore(0);
  }, []);

  return {
    gameState,
    currentClue,
    revealedClues,
    guesses,
    isCorrect,
    score,
    currentClueIndex,
    nextClue,
    makeGuess,
    startNewGame,
  };
}
