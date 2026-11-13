import React, { useState, useMemo } from 'react';
import { Search, Copy, Check, Shirt, Ghost, Layers, X } from 'lucide-react';
import { CharacterGroup } from '../types';
import { useCharacters } from '../hooks/useCharacters';
import { SectionAnchor } from './SectionAnchor';
import { BlurRevealTitle } from './BlurRevealTitle';
import { NikkeIcon } from './NikkeIcon';

type FilterTab = 'playable' | 'costumes' | 'npc' | 'all';

const ALPHABET = ['ALL', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

export const AgentRegistrySection: React.FC = () => {
  const { characterGroups, npcGroups, allGroups, loading, isLiveSync, playableCount, npcCount, totalCount } = useCharacters();
  const [activeTab, setActiveTab] = useState<FilterTab>('playable');
  const [selectedLetter, setSelectedLetter] = useState<string>('ALL');
  const [query, setQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  // Base list depending on active tab
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

  // Filter by search query and letter
  const filteredList: CharacterGroup[] = useMemo(() => {
    let list = baseList;

    if (selectedLetter !== 'ALL') {
      list = list.filter((item) => item.name.trim().toUpperCase().startsWith(selectedLetter));
    }

    const q = query.toLowerCase().trim();
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
  }, [baseList, selectedLetter, query]);

  // Count matches per letter for the active base list
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
    <section id="characters" className="py-24 scroll-mt-16 border-t border-white/[0.08] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-3">
            <p className="text-xs font-mono font-medium tracking-wider text-neutral-400 uppercase flex items-center gap-2">
              <span className="text-white font-bold">[ 05 ]</span>
              <span>Registry · {playableCount} Nikkes &amp; Skins ({totalCount} with NPCs)</span>
              <SectionAnchor id="characters" label="characters" />
            </p>
            {isLiveSync && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[rgb(95,227,103)]/[0.1] text-[rgb(95,227,103)] border border-[rgb(95,227,103)]/[0.25]">
                <span className="w-1.5 h-1.5 rounded-full bg-[rgb(95,227,103)] animate-pulse" />
                via Skuqre NKAS
              </span>
            )}
          </div>

          <BlurRevealTitle
            as="h2"
            className="font-sans font-bold text-3xl sm:text-5xl text-white tracking-tight leading-[1.1]"
          >
            Nikke &amp; Skin ID codes. <br />
            <span className="text-neutral-400">Quick model lookup.</span>
          </BlurRevealTitle>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-sans">
            Every playable Nikke, their skins and story NPCs has internal identifiers (like <code className="text-white bg-white/[0.08] px-1.5 py-0.5 rounded text-xs">c018_00</code> for Neon: Vision Eye, <code className="text-white bg-white/[0.08] px-1.5 py-0.5 rounded text-xs">c018_01</code> for Dear Grace skin, or <code className="text-white bg-white/[0.08] px-1.5 py-0.5 rounded text-xs">c227_00</code> for NPC Pinocchio). Click any code pill to copy it to your clipboard.
          </p>
        </div>

        {/* search input */}
        <div className="relative min-w-[280px] sm:min-w-[340px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 bg-[#12141c] border border-white/[0.08] rounded-xl text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white/[0.2] font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-white rounded-md cursor-pointer"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* filter tabs & controls */}
      <div className="space-y-3 pt-2">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-3">
          {/* segmented tab buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/[0.03] rounded-xl border border-white/[0.06]">
            <button
              onClick={() => { setActiveTab('playable'); setSelectedLetter('ALL'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'playable'
                  ? 'bg-white/[0.12] text-white shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.04]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>Playable Nikkes</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/[0.08] text-neutral-300">
                {characterGroups.length}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('costumes'); setSelectedLetter('ALL'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'costumes'
                  ? 'bg-white/[0.12] text-white shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.04]'
              }`}
            >
              <Shirt className="w-3.5 h-3.5 text-pink-400" />
              <span>Only With Skins</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/[0.08] text-neutral-300">
                {costumesNikkeCount}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('npc'); setSelectedLetter('ALL'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'npc'
                  ? 'bg-amber-500/[0.18] text-amber-300 border border-amber-500/30'
                  : 'text-neutral-400 hover:text-amber-300 hover:bg-white/[0.04]'
              }`}
            >
              <Ghost className="w-3.5 h-3.5 text-amber-400" />
              <span>Story &amp; NPCs</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/[0.08] text-neutral-300">
                {npcCount}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('all'); setSelectedLetter('ALL'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'all'
                  ? 'bg-white/[0.12] text-white shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.04]'
              }`}
            >
              <NikkeIcon className="w-3.5 h-3.5 text-neutral-300" />
              <span>All Records</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/[0.08] text-neutral-300">
                {allGroups.length}
              </span>
            </button>
          </div>

          {/* quick summary info */}
          <div className="text-xs font-mono text-neutral-400 flex items-center gap-2">
            <span>Showing <strong className="text-white">{filteredList.length}</strong> characters ({totalIdsInCurrentView} IDs)</span>
            {(selectedLetter !== 'ALL' || query) && (
              <button
                onClick={() => { setSelectedLetter('ALL'); setQuery(''); }}
                className="text-[11px] text-cyan-400 hover:underline cursor-pointer ml-1"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>

        {/* A - Z alphabet jump bar */}
        <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
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
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-sm'
                    : isDisabled
                    ? 'text-neutral-600 cursor-not-allowed opacity-40'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.06]'
                }`}
                title={char === 'ALL' ? 'Show all characters' : `${count} character(s) starting with ${char}`}
              >
                {char}
              </button>
            );
          })}
        </div>
      </div>

      {/* cards list */}
      {loading ? (
        <div className="py-20 text-center font-mono text-xs text-neutral-500 animate-pulse tracking-wider">
          LOADING CHARACTER &amp; SKIN REGISTRY...
        </div>
      ) : filteredList.length === 0 ? (
        <div className="epic-card p-12 text-center text-neutral-400 text-sm space-y-2">
          <p>No characters found matching the current filter or query "{query}".</p>
          <button
            onClick={() => { setSelectedLetter('ALL'); setQuery(''); setActiveTab('playable'); }}
            className="text-xs text-cyan-400 hover:underline cursor-pointer"
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
                className="epic-card p-3.5 rounded-2xl flex flex-col justify-between transition-all border border-white/[0.08] hover:border-white/[0.18] bg-[#0c0e16]/80 group space-y-2.5"
              >
                {/* top row: Name + Base ID button */}
                <div className="flex items-start justify-between gap-3 min-w-0">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-sans font-bold text-sm text-white group-hover:text-cyan-100 transition-colors truncate">
                        {nikke.name}
                      </span>
                      {nikke.isNpc && (
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-300 border border-amber-500/25">
                          NPC
                        </span>
                      )}
                      {hasSkins && (
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/[0.05] text-neutral-400 border border-white/[0.06]">
                          {nikke.skins.length} {nikke.skins.length === 1 ? 'skin' : 'skins'}
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
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                        : 'bg-black/50 text-neutral-300 border-white/[0.08] hover:border-cyan-500/40 hover:text-white'
                    }`}
                    title="Click to copy base ID"
                  >
                    <span>{nikke.id}</span>
                    {isBaseCopied ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3 opacity-40 group-hover:opacity-100" />
                    )}
                  </button>
                </div>

                {/* skins list (if any) */}
                {hasSkins && (
                  <div className="pt-2 border-t border-white/[0.04] space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
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
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                                : 'bg-white/[0.03] hover:bg-white/[0.08] border-white/[0.06] hover:border-white/[0.18] text-neutral-300 hover:text-white'
                            }`}
                            title={`Click to copy: ${skin.id} (${skin.name})`}
                          >
                            <span className="font-mono text-cyan-400 font-medium">{skin.id}</span>
                            <span className="truncate max-w-[130px] sm:max-w-[160px] text-neutral-300">{skin.name}</span>
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

      {/* status bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-neutral-400 pt-2 border-t border-white/[0.04] gap-2">
        <span>
          Showing {filteredList.length} character cards ({totalIdsInCurrentView} IDs in view)
          {isLiveSync && ' · Synced with Skuqre NKAS'}
        </span>
        <span>Click any code pill to copy to clipboard</span>
      </div>

    </section>
  );
};
