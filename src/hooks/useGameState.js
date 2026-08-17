import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'guess_football_player';

const defaultState = {
  gamesPlayed: 0,
  gamesWon: 0,
  totalScore: 0,
  streak: 0,
  bestStreak: 0,
  achievements: [],
  history: [],
  settings: {
    soundEnabled: true,
    cluesRevealed: 3,
    darkMode: true,
  },
};

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultState;
    const parsed = JSON.parse(saved);
    return {
      ...defaultState,
      ...parsed,
      achievements: parsed.achievements || [],
      history: parsed.history || [],
      settings: { ...defaultState.settings, ...(parsed.settings || {}) },
    };
  } catch {
    return defaultState;
  }
}

export function useGameState() {
  const [state, setState] = useState(loadState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save game state:', error);
    }
  }, [state]);

  const recordGame = useCallback((won, score, cluesUsed, mode = 'classic', playerId = null) => {
    setState((prev) => {
      const newStreak = won ? prev.streak + 1 : 0;
      const entry = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        date: new Date().toISOString(),
        won: Boolean(won),
        score: Number(score) || 0,
        cluesUsed: Number(cluesUsed) || 0,
        mode,
        playerId,
      };
      return {
        ...prev,
        gamesPlayed: prev.gamesPlayed + 1,
        gamesWon: won ? prev.gamesWon + 1 : prev.gamesWon,
        totalScore: prev.totalScore + (Number(score) || 0),
        streak: newStreak,
        bestStreak: Math.max(newStreak, prev.bestStreak),
        history: [entry, ...(prev.history || [])].slice(0, 50),
      };
    });
  }, []);

  const addAchievement = useCallback((achievementId) => {
    setState((prev) => {
      if (prev.achievements.includes(achievementId)) return prev;
      return { ...prev, achievements: [...prev.achievements, achievementId] };
    });
  }, []);

  const updateSettings = useCallback((settings) => {
    setState((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...settings },
    }));
  }, []);

  const resetProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState(defaultState);
  }, []);

  return {
    state,
    recordGame,
    addAchievement,
    updateSettings,
    resetProgress,
  };
}
