import { Link } from 'react-router-dom';
import { Clock, Trophy, XCircle } from 'lucide-react';
import PLAYERS from '../data/players';

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

export function HistoryPage({ state }) {
  const history = state?.history || [];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link
          to="/"
          className="text-stadium-400 hover:text-white transition-colors mb-4 inline-flex items-center gap-2"
        >
          ← Back to Home
        </Link>
        <h1 className="text-3xl font-display font-bold text-white">Game History</h1>
        <p className="text-stadium-400 mt-1">Your recent matches, saved locally on this device.</p>
      </div>

      {history.length === 0 ? (
        <div className="glass-card rounded-xl p-10 text-center border-stadium-700">
          <Clock className="mx-auto mb-3 text-stadium-500" size={32} />
          <p className="text-white font-semibold">No games yet</p>
          <p className="text-stadium-400 text-sm mt-1">Play a mode and your results will show up here.</p>
          <Link
            to="/"
            className="inline-block mt-4 px-5 py-2 bg-pitch-500 text-black font-bold rounded-lg hover:bg-pitch-400 transition-all"
          >
            Play Now
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((entry) => {
            const player = PLAYERS.find((p) => p.id === entry.playerId);
            return (
              <div
                key={entry.id}
                className="glass-card rounded-xl p-4 border-stadium-700 flex flex-col sm:flex-row sm:items-center gap-3"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  entry.won ? 'bg-pitch-500/20 text-pitch-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {entry.won ? <Trophy size={18} /> : <XCircle size={18} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold truncate">
                    {player?.name || entry.playerName || 'Unknown player'}
                  </p>
                  <p className="text-xs text-stadium-400 capitalize">
                    {entry.mode?.replace('-', ' ') || 'classic'} · {entry.cluesUsed || 0} clues · {formatDate(entry.date)}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${entry.won ? 'text-gold-400' : 'text-stadium-500'}`}>
                    {entry.score || 0} pts
                  </p>
                  <p className="text-xs text-stadium-500">{entry.won ? 'Won' : 'Lost'}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
