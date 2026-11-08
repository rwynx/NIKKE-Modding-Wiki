import React, { useState, useMemo } from 'react';
import { Search, Copy, Check, Hash } from 'lucide-react';
import { CharacterItem } from '../types';
import { useCharacters } from '../hooks/useCharacters';

export const CharacterLookupPage: React.FC = () => {
  const { characterList, loading, isLiveSync, totalCount } = useCharacters();
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredList: CharacterItem[] = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return characterList;
    return characterList.filter((item) => (
      item.id.toLowerCase().includes(q) ||
      item.name.toLowerCase().includes(q)
    ));
  }, [characterList, search]);

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div className="space-y-10 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Banner */}
      <section className="relative rounded-3xl p-8 sm:p-10 border border-nikke-border overflow-hidden bg-gradient-to-r from-[#141b2e] via-[#0d1322] to-[#090d18]">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nikke-gold/10 border border-nikke-gold/30 text-nikke-gold text-xs font-mono">
            <Hash className="w-3.5 h-3.5" />
            <span>CHARACTER DATABASE // LIVE ASSET CODES</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            NIKKE <span className="text-glow-gold text-nikke-gold">CHARACTER REGISTRY</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            All {totalCount || 206} Goddess of Victory: NIKKE characters and their internal bundle identifiers (e.g., <code className="text-nikke-cyan font-mono bg-slate-900 px-1.5 py-0.5 rounded">c010</code> Dorothy, <code className="text-nikke-cyan font-mono bg-slate-900 px-1.5 py-0.5 rounded">c220</code> Modernia, <code className="text-nikke-cyan font-mono bg-slate-900 px-1.5 py-0.5 rounded">c511</code> Cinderella). Use these codes to target character models for asset extraction, spine modifications, and model swappers.
          </p>
        </div>
      </section>

      {/* Search Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-900/70 p-4 rounded-2xl border border-nikke-border">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by character name (e.g. Modernia, Red Hood, Cinderella, Grave) or ID (e.g. c010, c220, c511)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 focus:border-nikke-gold rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-nikke-gold font-sans"
          />
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs font-mono text-slate-400">
          <span className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
            Total: <strong className="text-nikke-gold">{filteredList.length}</strong> of {totalCount} Nikkes
          </span>
          {isLiveSync && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              NKAS Live
            </span>
          )}
          {search && (
            <button
              onClick={() => setSearch('')}
              className="text-slate-400 hover:text-white underline cursor-pointer"
            >
              Reset Search
            </button>
          )}
        </div>
      </div>

      {/* Grid of Characters */}
      {loading ? (
        <div className="py-24 text-center font-mono text-slate-400 text-sm animate-pulse">
          INITIALIZING CHARACTER ARCHIVES...
        </div>
      ) : filteredList.length === 0 ? (
        <div className="cyber-panel p-16 text-center text-slate-400 rounded-2xl">
          <p>No characters found matching "{search}".</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredList.map((c) => {
            const isCopied = copiedId === c.id;
            return (
              <div
                key={c.id}
                onClick={() => handleCopy(c.id)}
                className={`cyber-panel p-3.5 rounded-xl border flex items-center justify-between transition-all duration-150 cursor-pointer group ${
                  isCopied
                    ? 'border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/10'
                    : 'border-nikke-border hover:border-nikke-gold/60 hover:bg-slate-850'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="px-2 py-1 rounded bg-slate-950 font-mono font-bold text-xs text-nikke-gold border border-slate-800 group-hover:border-nikke-gold/40">
                    {c.id}
                  </span>
                  <span className="text-sm font-semibold text-slate-200 group-hover:text-white truncate">
                    {c.name}
                  </span>
                </div>

                <button
                  type="button"
                  className={`p-1.5 rounded-lg text-xs font-mono transition-colors ${
                    isCopied ? 'text-emerald-400' : 'text-slate-400 group-hover:text-nikke-gold'
                  }`}
                  title="Copy character ID"
                >
                  {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
