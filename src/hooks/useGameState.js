import { useState, useCallback } from 'react';

const STORAGE_KEY = 'guess_football_player';

const defaultState = {
  gamesPlayed: 0,
  gamesWon: 0,
  totalScore: 0,
  streak: 0,
  bestStreak: 0,
  achievements: [],
  settings: {
    soundEnabled: true,
    cluesRevealed: 3,
    darkMode: true,
  },
};

export function useGameState() {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...defaultState, ...JSON.parse(saved) } : defaultState;
    } catch {
      return defaultState;
    }
  });

  const save = useCallback((newState) => {
    const toSave = {
      ...newState,
      achievements: newState.achievements || [],
      settings: newState.settings || defaultState.settings,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    setState(toSave);
  }, []);

  const recordGame = useCallback((won, score, cluesUsed) => {
    setState(prev => {
      const newStreak = won ? prev.streak + 1 : 0;
      const newBestStreak = Math.max(newStreak, prev.bestStreak);
      const newGamesPlayed = prev.gamesPlayed + 1;
      const newGamesWon = won ? prev.gamesWon + 1 : prev.gamesWon;
      const newTotalScore = prev.totalScore + score;
      return {
        ...prev,
        gamesPlayed: newGamesPlayed,
        gamesWon: newGamesWon,
        totalScore: newTotalScore,
        streak: newStreak,
        bestStreak: newBestStreak,
      };
    });
  }, []);

  const addAchievement = useCallback((achievementId) => {
    setState(prev => {
      if (prev.achievements.includes(achievementId)) return prev;
      return { ...prev, achievements: [...prev.achievements, achievementId] };
    });
  }, []);

  const updateSettings = useCallback((settings) => {
    setState(prev => ({
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
