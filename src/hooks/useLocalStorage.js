import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }, [key, value]);

  return [value, setValue];
}

export function useDailyPlayer() {
  const [dailyPlayerId, setDailyPlayerId] = useState(() => {
    const today = new Date().toDateString();
    const stored = localStorage.getItem('daily_player_date');
    const playerId = localStorage.getItem('daily_player_id');
    
    if (stored === today && playerId) {
      return playerId;
    }
    
    // Generate consistent daily player based on date
    const seed = today.charCodeAt(0) + today.charCodeAt(1) + today.charCodeAt(2);
    const players = ['messi', 'ronaldo', 'mbappe', 'haaland', 'neymar', 'pedri', 'gavi', 'vinicius', 'bellingham', 'salah'];
    const index = seed % players.length;
    localStorage.setItem('daily_player_date', today);
    localStorage.setItem('daily_player_id', players[index]);
    return players[index];
  });

  return dailyPlayerId;
}
