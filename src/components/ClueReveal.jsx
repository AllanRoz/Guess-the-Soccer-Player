import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, HelpCircle } from 'lucide-react';

export function ClueCard({ clue, index, isRevealed, isLatest }) {
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

  const labelMap = {
    nationality: 'Nationality',
    position: 'Position',
    current_club: 'Current Club',
    former_club: 'Former Club',
    trophy: 'Trophy',
    stat: 'Statistics',
    awards: 'Awards',
    unique: 'Unique Fact',
    age: 'Age',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`glass-card rounded-xl p-4 border-pitch-500/30 ${
        isLatest ? 'box-glow-green' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`text-2xl ${isLatest ? 'animate-pulse-slow' : ''}`}>{clue.icon}</div>
        <div className="flex-1">
          <p className="text-xs text-stadium-500 uppercase tracking-wider mb-1">
            {labelMap[clue.type] || 'Clue'}
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

export function ClueReveal({ revealedClues, onRevealNext, totalClues, className = '' }) {
  const allRevealed = revealedClues.length >= totalClues;

  return (
    <div className={`space-y-3 ${className}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        {revealedClues.map((clue, index) => (
          <ClueCard
            key={clue.id}
            clue={clue}
            index={index}
            isRevealed
            isLatest={index === revealedClues.length - 1}
          />
        ))}
      </AnimatePresence>

      {!allRevealed && (
        <motion.button
          type="button"
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

export function ModeInstructions({ title, steps, className = '' }) {
  return (
    <aside
      className={`hidden lg:flex flex-col gap-3 sticky top-24 self-start ${className}`}
      aria-label="How to play"
    >
      <div className="glass-card rounded-xl p-4 border-pitch-500/30 bg-stadium-900/40">
        <h3 className="text-sm font-display font-bold text-pitch-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <HelpCircle size={16} />
          {title}
        </h3>
        <ol className="space-y-2">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-2 text-sm text-stadium-300">
              <span className="shrink-0 w-5 h-5 rounded-full bg-pitch-500/20 text-pitch-400 flex items-center justify-center text-xs font-bold">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
}
