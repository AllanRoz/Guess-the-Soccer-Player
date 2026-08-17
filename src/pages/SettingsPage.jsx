import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Settings, Volume2, VolumeX, Moon, Sun } from 'lucide-react';
import { useGameState } from '../hooks/useGameState';

export function SettingsPage() {
  const navigate = useNavigate();
  const { state, updateSettings, resetProgress } = useGameState();
  const [soundEnabled, setSoundEnabled] = useState(state.settings?.soundEnabled ?? true);
  const [darkMode, setDarkMode] = useState(state.settings?.darkMode ?? true);

  const handleSoundToggle = () => {
    const newValue = !soundEnabled;
    setSoundEnabled(newValue);
    updateSettings({ soundEnabled: newValue });
  };

  const handleDarkModeToggle = () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    updateSettings({ darkMode: newValue });
    document.documentElement.classList.toggle('dark', newValue);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      resetProgress();
      navigate('/');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <Link
          to="/"
          className="text-stadium-400 hover:text-white transition-colors mb-4 inline-flex items-center gap-2"
        >
          ← Back to Home
        </Link>
        <h1 className="text-3xl font-display font-bold text-white">Settings</h1>
      </div>

      <div className="space-y-4">
        <div className="glass-card rounded-xl p-4">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Settings size={20} />
            General
          </h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {soundEnabled ? <Volume2 size={20} className="text-pitch-400" /> : <VolumeX size={20} className="text-stadium-500" />}
                <span className="text-white">Sound Effects</span>
              </div>
              <button
                type="button"
                onClick={handleSoundToggle}
                className={`w-12 h-6 rounded-full transition-all ${soundEnabled ? 'bg-pitch-500' : 'bg-stadium-700'}`}
                aria-label="Toggle sound effects"
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-all ${soundEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {darkMode ? <Moon size={20} className="text-gold-400" /> : <Sun size={20} className="text-stadium-400" />}
                <span className="text-white">Dark Mode</span>
              </div>
              <button
                type="button"
                onClick={handleDarkModeToggle}
                className={`w-12 h-6 rounded-full transition-all ${darkMode ? 'bg-pitch-500' : 'bg-stadium-700'}`}
                aria-label="Toggle dark mode"
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-all ${darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-xl p-4 border-red-500/30">
          <h2 className="text-lg font-bold text-red-400 mb-2">Danger Zone</h2>
          <p className="text-sm text-stadium-400 mb-4">Reset all progress and statistics</p>
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
          >
            Reset Progress
          </button>
        </div>

        <div className="glass-card rounded-xl p-4">
          <h2 className="text-lg font-bold text-white mb-2">About</h2>
          <p className="text-sm text-stadium-400">
            Guess the Soccer Player v1.0.0<br />
            A soccer guessing game built with React & Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
}
