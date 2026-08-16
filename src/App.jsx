import { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { StatsPage } from './pages/StatsPage';
import { EncyclopediaPage } from './pages/EncyclopediaPage';
import { ClassicMode } from './pages/ClassicMode';
import { MultipleChoiceMode } from './pages/MultipleChoiceMode';
import { CareerPathMode } from './pages/CareerPathMode';
import { SpeedMode } from './pages/SpeedMode';
import { useGameState } from './hooks/useGameState';
import PLAYERS from './data/players';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentMode, setCurrentMode] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const { state, recordGame } = useGameState();

  const handleNavigate = useCallback((page, player = null) => {
    setCurrentPage(page);
    if (player) setCurrentPlayer(player);
  }, []);

  const handleModeSelect = useCallback((mode) => {
    setCurrentMode(mode);
  }, []);

  const handleResult = useCallback((won, score, cluesUsed) => {
    recordGame(won, score, cluesUsed);
  }, [recordGame]);

  const handlePlayAgain = useCallback(() => {
    const randomPlayer = PLAYERS[Math.floor(Math.random() * PLAYERS.length)];
    setCurrentPlayer(randomPlayer);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-stadium-950 text-white">
        <div className="fixed inset-0 pitch-grid pointer-events-none" />
        
        <div className="relative z-10">
          <Header onNavigate={handleNavigate} currentPage={currentPage} />
          
          <main className="max-w-6xl mx-auto px-4 py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentPage}-${currentMode?.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {currentPage === 'home' && (
                  <HomePage
                    onNavigate={handleNavigate}
                    onModeSelect={handleModeSelect}
                    state={state}
                  />
                )}
                
                {currentPage === 'stats' && (
                  <StatsPage state={state} onNavigate={handleNavigate} />
                )}
                
                {currentPage === 'encyclopedia' && (
                  <EncyclopediaPage onNavigate={handleNavigate} />
                )}
                
                {currentPage === 'classic' && currentPlayer && (
                  <ClassicMode
                    player={currentPlayer}
                    onResult={handleResult}
                    onPlayAgain={handlePlayAgain}
                  />
                )}
                
                {currentPage === 'multiple-choice' && currentPlayer && (
                  <MultipleChoiceMode
                    player={currentPlayer}
                    onResult={handleResult}
                    onPlayAgain={handlePlayAgain}
                  />
                )}
                
                {currentPage === 'career-path' && currentPlayer && (
                  <CareerPathMode
                    player={currentPlayer}
                    onResult={handleResult}
                    onPlayAgain={handlePlayAgain}
                  />
                )}
                
                {currentPage === 'speed' && currentMode && (
                  <SpeedMode
                    players={PLAYERS.slice(0, 5)}
                    onResult={handleResult}
                    onPlayAgain={handlePlayAgain}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
