import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Trophy, Star } from 'lucide-react';
import PLAYERS from '../data/players';

export function EncyclopediaPage() {
  const [search, setSearch] = useState('');

  const filteredPlayers = PLAYERS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.nationality.toLowerCase().includes(search.toLowerCase()) ||
    p.current_club.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link
          to="/"
          className="text-stadium-400 hover:text-white transition-colors mb-4 inline-flex items-center gap-2"
        >
          ← Back to Home
        </Link>
        <h1 className="text-3xl font-display font-bold text-white mb-4">Player Encyclopedia</h1>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stadium-500" size={20} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, nationality, or club..."
            className="w-full bg-stadium-900 border border-stadium-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-stadium-500 focus:outline-none focus:border-pitch-500 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPlayers.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>

      {filteredPlayers.length === 0 && (
        <div className="text-center py-12 text-stadium-500">
          No players found matching "{search}"
        </div>
      )}
    </div>
  );
}

function PlayerCard({ player }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="glass-card rounded-xl p-4 border-stadium-700 hover:border-pitch-500/50 transition-all bg-stadium-900/40"
    >
      <div className="flex items-start gap-3">
        <span className="text-4xl">{player.flag}</span>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-white">{player.name}</h3>
            {player.is_legend && (
              <Star size={14} className="text-gold-400 fill-gold-400" />
            )}
          </div>
          <p className="text-sm text-stadium-400">{player.current_club}</p>
          <p className="text-xs text-stadium-500 mt-1">{player.position} · {player.nationality}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 mt-4">
        <div className="bg-stadium-900/50 rounded-lg p-2 text-center">
          <p className="text-xs text-stadium-500">Goals</p>
          <p className="font-bold text-pitch-400">{player.goals_scored}</p>
        </div>
        <div className="bg-stadium-900/50 rounded-lg p-2 text-center">
          <p className="text-xs text-stadium-500">Assists</p>
          <p className="font-bold text-electric-cyan">{player.assists_provided}</p>
        </div>
        <div className="bg-stadium-900/50 rounded-lg p-2 text-center">
          <p className="text-xs text-stadium-500">Trophies</p>
          <p className="font-bold text-gold-400">{player.trophies_count}</p>
        </div>
      </div>
    </motion.div>
  );
}