import { useState, useCallback, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { StatsPage } from './pages/StatsPage';
import { EncyclopediaPage } from './pages/EncyclopediaPage';
import { SettingsPage } from './pages/SettingsPage';
import { HistoryPage } from './pages/HistoryPage';
import { ClassicMode } from './pages/ClassicMode';
import { MultipleChoiceMode } from './pages/MultipleChoiceMode';
import { CareerPathMode } from './pages/CareerPathMode';
import { useGameState } from './hooks/useGameState';
import PLAYERS from './data/players';

// Wrapper to handle navigation and state passing
function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, recordGame } = useGameState();
  const [currentPlayer, setCurrentPlayer] = useState(null);

  // Initialize a player if needed for modes
  useEffect(() => {
    if (!currentPlayer && (location.pathname.includes('/play/') || location.pathname === '/play')) {
      const randomPlayer = PLAYERS[Math.floor(Math.random() * PLAYERS.length)];
      setCurrentPlayer(randomPlayer);
    }
  }, [location.pathname, currentPlayer]);

  const handleResult = useCallback((won, score, cluesUsed, mode) => {
    recordGame(won, score, cluesUsed, mode, currentPlayer?.id);
  }, [recordGame, currentPlayer]);

  const handlePlayAgain = useCallback(() => {
    const randomPlayer = PLAYERS[Math.floor(Math.random() * PLAYERS.length)];
    setCurrentPlayer(randomPlayer);
  }, []);

  return (
    <div className="min-h-screen bg-stadium-950 text-white">
      <div className="fixed inset-0 pitch-grid pointer-events-none opacity-20" />
      
      <div className="relative z-10">
        <Header />
        
        <main className="max-w-6xl mx-auto px-4 py-8">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage state={state} />} />
              <Route path="/stats" element={<StatsPage state={state} />} />
              <Route path="/history" element={<HistoryPage state={state} />} />
              <Route path="/encyclopedia" element={<EncyclopediaPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              
              <Route path="/play/classic" element={
                currentPlayer && <ClassicMode 
                  player={currentPlayer} 
                  onResult={(won, s, c) => handleResult(won, s, c, 'classic')} 
                  onPlayAgain={handlePlayAgain} 
                />
              } />
              
              <Route path="/play/multiple-choice" element={
                currentPlayer && <MultipleChoiceMode 
                  player={currentPlayer} 
                  onResult={(won, s, c) => handleResult(won, s, c, 'multiple-choice')} 
                  onPlayAgain={handlePlayAgain} 
                />
              } />
              
              <Route path="/play/career-path" element={
                currentPlayer && <CareerPathMode 
                  player={currentPlayer} 
                  onResult={(won, s, c) => handleResult(won, s, c, 'career-path')} 
                  onPlayAgain={handlePlayAgain} 
                />
              } />

              <Route path="*" element={<HomePage state={state} />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
