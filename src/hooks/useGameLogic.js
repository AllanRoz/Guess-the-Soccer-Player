import { useState, useCallback, useMemo, useEffect } from 'react';
import { soundEffects } from '../utils/audio';

function normalizeName(value = '') {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .trim();
}

function isMatchingGuess(guess, player) {
  const normalizedGuess = normalizeName(guess);
  if (!normalizedGuess || !player) return false;

  const candidates = [player.name, player.full_name, player.id]
    .filter(Boolean)
    .map(normalizeName);

  return candidates.some((name) => {
    if (name === normalizedGuess) return true;
    const parts = name.split(/\s+/);
    return parts.includes(normalizedGuess) || name.includes(normalizedGuess);
  });
}

export function useGameLogic(player, onResult) {
  const [currentClueIndex, setCurrentClueIndex] = useState(0);
  const [guesses, setGuesses] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameState, setGameState] = useState('playing');
  const [score, setScore] = useState(0);

  useEffect(() => {
    setCurrentClueIndex(0);
    setGuesses([]);
    setIsCorrect(false);
    setGameState('playing');
    setScore(0);
  }, [player?.id]);

  const currentClue = useMemo(() => {
    return player?.clues?.[currentClueIndex] || null;
  }, [player, currentClueIndex]);

  const revealedClues = useMemo(() => {
    return player?.clues?.slice(0, currentClueIndex + 1) || [];
  }, [player, currentClueIndex]);

  const nextClue = useCallback(() => {
    if (currentClueIndex < (player?.clues?.length || 0) - 1) {
      setCurrentClueIndex((prev) => prev + 1);
      soundEffects.playClueReveal();
    }
  }, [currentClueIndex, player]);

  const makeGuess = useCallback((guess) => {
    const trimmed = guess.trim();
    if (!trimmed || gameState !== 'playing') return false;

    const alreadyGuessed = guesses.some((g) => normalizeName(g) === normalizeName(trimmed));
    if (alreadyGuessed) return false;

    const guessCorrect = isMatchingGuess(trimmed, player);
    setGuesses((prev) => [...prev, trimmed]);

    if (guessCorrect) {
      const points = Math.max(100, 500 - currentClueIndex * 40);
      setIsCorrect(true);
      setGameState('won');
      setScore(points);
      soundEffects.playCorrect();
      onResult?.(true, points, currentClueIndex + 1);
      return true;
    }

    soundEffects.playWrong();
    if (currentClueIndex >= (player?.clues?.length || 0) - 1) {
      setGameState('lost');
      soundEffects.playWhistle();
      onResult?.(false, 0, currentClueIndex + 1);
    }
    return false;
  }, [player, currentClueIndex, onResult, gameState, guesses]);

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
