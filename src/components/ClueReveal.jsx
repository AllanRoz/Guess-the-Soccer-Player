import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Info, HelpCircle } from 'lucide-react';
import { useState } from 'react';

export function ClueCard({ clue, index, isRevealed, onClick }) {
  if (!isRevealed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card rounded-xl p-4 border-stadium-700"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-stadium-800 flex items-center justify-center text-sm font-bold text-stadium-500">
            {index + 1}
          </div>
          <div className="flex-1 h-2 bg-stadium-700 rounded-full overflow-hidden">
            <div className="h-full bg-stadium-600 w-full" />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-card rounded-xl p-4 border-pitch-500/30 box-glow-green"
    >
      <div className="flex items-start gap-3">
        <div className="text-2xl">{clue.icon}</div>
        <div className="flex-1">
          <p className="text-xs text-stadium-500 uppercase tracking-wider mb-1">
            {clue.type === 'nationality' && 'Nationality'}
            {clue.type === 'position' && 'Position'}
            {clue.type === 'current_club' && 'Current Club'}
            {clue.type === 'former_club' && 'Former Club'}
            {clue.type === 'trophy' && 'Trophy'}
            {clue.type === 'stat' && 'Statistics'}
            {clue.type === 'awards' && 'Awards'}
            {clue.type === 'unique' && 'Unique Fact'}
            {clue.type === 'age' && 'Age'}
          </p>
          <p className="text-white font-medium">{clue.value}</p>
        </div>
        {clue.points && (
          <div className="px-2 py-1 bg-gold-500/20 rounded-lg">
            <span className="text-xs font-bold text-gold-400">+{clue.points}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function ClueReveal({ revealedClues, currentClue, onRevealNext, totalClues, className = '' }) {
  return (
    <div className={`space-y-3 ${className}`}>
      <AnimatePresence mode="popLayout">
        {revealedClues.map((clue, index) => (
          <ClueCard
            key={clue.id}
            clue={clue}
            index={index}
            isRevealed={true}
          />
        ))}
      </AnimatePresence>
      
      {currentClue && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-xl p-4 border-pitch-500/30 box-glow-green"
        >
          <div className="flex items-start gap-3">
            <div className="text-2xl animate-pulse-slow">{currentClue.icon}</div>
            <div className="flex-1">
              <p className="text-xs text-stadium-500 uppercase tracking-wider mb-1">
                New Clue #{revealedClues.length + 1}
              </p>
              <p className="text-white font-medium">{currentClue.value}</p>
            </div>
          </div>
        </motion.div>
      )}
      
      {currentClue && revealedClues.length < totalClues && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onRevealNext}
          className="w-full py-3 bg-pitch-500/20 border border-pitch-500/50 text-pitch-400 font-medium rounded-xl hover:bg-pitch-500/30 transition-all"
        >
          Reveal Next Clue
        </motion.button>
      )}
    </div>
  );
}
