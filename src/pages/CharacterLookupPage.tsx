import React, { useState, useMemo } from 'react';
import { Search, Copy, Check, Hash, Shirt, Ghost, Layers, X } from 'lucide-react';
import { CharacterGroup } from '../types';
import { useCharacters } from '../hooks/useCharacters';
import { NikkeIcon } from '../components/NikkeIcon';

type FilterTab = 'playable' | 'costumes' | 'npc' | 'all';

const ALPHABET = ['ALL', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

export const CharacterLookupPage: React.FC = () => {
  const { characterGroups, npcGroups, allGroups, loading, isLiveSync, playableCount, npcCount, totalCount } = useCharacters();
  const [activeTab, setActiveTab] = useState<FilterTab>('playable');
  const [selectedLetter, setSelectedLetter] = useState<string>('ALL');
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const baseList: CharacterGroup[] = useMemo(() => {
    switch (activeTab) {
      case 'playable':
        return characterGroups;
      case 'costumes':
        return characterGroups.filter((g) => g.skins && g.skins.length > 0);
      case 'npc':
        return npcGroups;
      case 'all':
        return allGroups;
      default:
        return characterGroups;
    }
  }, [activeTab, characterGroups, npcGroups, allGroups]);

  const filteredList: CharacterGroup[] = useMemo(() => {
    let list = baseList;

    if (selectedLetter !== 'ALL') {
      list = list.filter((item) => item.name.trim().toUpperCase().startsWith(selectedLetter));
    }

    const q = search.toLowerCase().trim();
    if (q) {
      list = list.filter((item) => {
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesId = item.id.toLowerCase().includes(q);
        const matchesBase = item.baseCode?.toLowerCase().includes(q);
        const matchesSkin = item.skins?.some(
          (s) => s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q)
        );
        return matchesName || matchesId || matchesBase || matchesSkin;
      });
    }

    return list;
  }, [baseList, selectedLetter, search]);

  const letterMatchCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const item of baseList) {
      const first = item.name.trim().charAt(0).toUpperCase();
      counts[first] = (counts[first] || 0) + 1;
    }
    return counts;
  }, [baseList]);

  const costumesNikkeCount = useMemo(() => {
    return characterGroups.filter((g) => g.skins && g.skins.length > 0).length;
  }, [characterGroups]);

  const totalIdsInCurrentView = useMemo(() => {
    return filteredList.reduce((acc, item) => acc + 1 + (item.skins ? item.skins.length : 0), 0);
  }, [filteredList]);

  return (
    <div className="space-y-8 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Banner */}
      <section className="relative rounded-3xl p-8 sm:p-10 border border-nikke-border overflow-hidden bg-gradient-to-r from-[#141b2e] via-[#0d1322] to-[#090d18]">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nikke-gold/10 border border-nikke-gold/30 text-nikke-gold text-xs font-mono">
            <Hash className="w-3.5 h-3.5" />
            <span>CHARACTER &amp; SKIN DATABASE // LIVE ASSET CODES</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            NIKKE <span className="text-glow-gold text-nikke-gold">CHARACTER &amp; SKIN REGISTRY</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            All {playableCount} Goddess of Victory: NIKKE playable characters &amp; costumes (plus {npcCount} story NPCs) with internal bundle identifiers (e.g., <code className="text-nikke-cyan font-mono bg-slate-900 px-1.5 py-0.5 rounded">c010_00</code> Rapi, <code className="text-nikke-cyan font-mono bg-slate-900 px-1.5 py-0.5 rounded">c010_01</code> White Promise, <code className="text-nikke-cyan font-mono bg-slate-900 px-1.5 py-0.5 rounded">c511_00</code> Cinderella). Click any code badge to copy it directly.
          </p>
        </div>
      </section>

      {/* Search Header & Filter Controls */}
      <div className="space-y-3 bg-slate-900/70 p-4 sm:p-5 rounded-2xl border border-nikke-border">
        {/* top search bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by character or skin name (e.g. Modernia, Red Hood, White Promise) or ID (e.g. c010, c511)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 bg-slate-950 border border-slate-700 focus:border-nikke-gold rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-nikke-gold font-sans"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white rounded-md cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 text-xs font-mono text-slate-400 shrink-0">
            <span className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
              Showing <strong className="text-nikke-gold">{filteredList.length}</strong> characters ({totalIdsInCurrentView} IDs)
            </span>
            {isLiveSync && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                NKAS Live
              </span>
            )}
          </div>
        </div>

        {/* tab buttons */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => { setActiveTab('playable'); setSelectedLetter('ALL'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'playable'
                  ? 'bg-nikke-gold/20 text-nikke-gold border border-nikke-gold/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-nikke-gold" />
              <span>Playable Nikkes</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-950 text-slate-300">
                {characterGroups.length}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('costumes'); setSelectedLetter('ALL'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'costumes'
                  ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Shirt className="w-3.5 h-3.5 text-pink-400" />
              <span>Only With Skins</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-950 text-slate-300">
                {costumesNikkeCount}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('npc'); setSelectedLetter('ALL'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'npc'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-slate-400 hover:text-amber-300 hover:bg-slate-800'
              }`}
            >
              <Ghost className="w-3.5 h-3.5 text-amber-400" />
              <span>Story &amp; NPCs</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-950 text-slate-300">
                {npcCount}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('all'); setSelectedLetter('ALL'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'all'
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <NikkeIcon className="w-3.5 h-3.5 text-slate-300" />
              <span>All Records</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-950 text-slate-300">
                {allGroups.length}
              </span>
            </button>
          </div>

          {(selectedLetter !== 'ALL' || search) && (
            <button
              onClick={() => { setSelectedLetter('ALL'); setSearch(''); }}
              className="text-xs text-nikke-gold hover:underline cursor-pointer font-mono"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* A - Z alphabet jump bar */}
        <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none border-t border-slate-800/60">
          {ALPHABET.map((char) => {
            const isSelected = selectedLetter === char;
            const count = char === 'ALL' ? baseList.length : (letterMatchCounts[char] || 0);
            const isDisabled = char !== 'ALL' && count === 0;

            return (
              <button
                key={char}
                disabled={isDisabled}
                onClick={() => setSelectedLetter(char)}
                className={`px-2 py-1 rounded-md text-[11px] font-mono transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-nikke-gold/25 text-nikke-gold font-bold border border-nikke-gold/50 shadow-sm'
                    : isDisabled
                    ? 'text-slate-600 cursor-not-allowed opacity-40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                title={char === 'ALL' ? 'Show all characters' : `${count} character(s) starting with ${char}`}
              >
                {char}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Characters */}
      {loading ? (
        <div className="py-24 text-center font-mono text-slate-400 text-sm animate-pulse">
          INITIALIZING CHARACTER ARCHIVES...
        </div>
      ) : filteredList.length === 0 ? (
        <div className="cyber-panel p-16 text-center text-slate-400 rounded-2xl space-y-3">
          <p>No characters or skins found matching current filters or query "{search}".</p>
          <button
            onClick={() => { setSelectedLetter('ALL'); setSearch(''); setActiveTab('playable'); }}
            className="text-xs text-nikke-gold hover:underline cursor-pointer"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredList.map((nikke) => {
            const isBaseCopied = copiedId === nikke.id;
            const hasSkins = nikke.skins && nikke.skins.length > 0;

            return (
              <div
                key={nikke.id}
                className="cyber-panel p-4 rounded-2xl border border-nikke-border flex flex-col justify-between transition-all duration-150 hover:border-nikke-gold/50 hover:bg-slate-850/80 group space-y-3"
              >
                {/* top row: Name + Base ID button */}
                <div className="flex items-start justify-between gap-3 min-w-0">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-sans font-bold text-base text-slate-100 group-hover:text-nikke-gold transition-colors truncate">
                        {nikke.name}
                      </span>
                      {nikke.isNpc && (
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-300 border border-amber-500/25">
                          NPC
                        </span>
                      )}
                      {hasSkins && (
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-900 text-slate-400 border border-slate-800">
                          {nikke.skins.length} {nikke.skins.length === 1 ? 'costume' : 'costumes'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* base id copy pill */}
                  <button
                    type="button"
                    onClick={(e) => handleCopy(nikke.id, e)}
                    className={`shrink-0 px-2 py-1 rounded-lg font-mono text-xs flex items-center gap-1.5 border transition-all cursor-pointer ${
                      isBaseCopied
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-nikke-gold/50 hover:text-white'
                    }`}
                    title="Click to copy base ID"
                  >
                    <span>{nikke.id}</span>
                    {isBaseCopied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3 opacity-40 group-hover:opacity-100" />
                    )}
                  </button>
                </div>

                {/* skins list (if any) */}
                {hasSkins && (
                  <div className="pt-2.5 border-t border-slate-800/80 space-y-2">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                      <Shirt className="w-3 h-3 text-pink-400/80" />
                      <span>Costumes &amp; Outfits</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {nikke.skins.map((skin) => {
                        const isSkinCopied = copiedId === skin.id;
                        return (
                          <button
                            key={skin.id}
                            type="button"
                            onClick={(e) => handleCopy(skin.id, e)}
                            className={`px-2 py-1 rounded-md text-[11px] font-sans flex items-center gap-1.5 border transition-all cursor-pointer max-w-full ${
                              isSkinCopied
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold'
                                : 'bg-slate-950/80 hover:bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
                            }`}
                            title={`Click to copy: ${skin.id} (${skin.name})`}
                          >
                            <span className="font-mono text-nikke-cyan font-medium">{skin.id}</span>
                            <span className="truncate max-w-[130px] sm:max-w-[160px] text-slate-300">{skin.name}</span>
                            {isSkinCopied ? (
                              <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                            ) : (
                              <Copy className="w-2.5 h-2.5 opacity-40 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
