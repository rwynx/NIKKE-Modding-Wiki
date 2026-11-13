import React, { useState, useMemo } from 'react';
import { Search, Copy, Check } from 'lucide-react';
import { CharacterItem } from '../types';
import { useCharacters } from '../hooks/useCharacters';
import { SectionAnchor } from './SectionAnchor';
import { BlurRevealTitle } from './BlurRevealTitle';

export const AgentRegistrySection: React.FC = () => {
  const { characterList, loading, isLiveSync, totalCount } = useCharacters();
  const [query, setQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredList: CharacterItem[] = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return characterList;
    return characterList.filter((item) => (
      item.id.toLowerCase().includes(q) ||
      item.name.toLowerCase().includes(q)
    ));
  }, [characterList, query]);

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <section id="characters" className="py-24 border-t border-white/[0.08] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-3">
            <p className="text-xs font-mono font-medium tracking-wider text-neutral-400 uppercase flex items-center gap-2">
              <span className="text-white font-bold">[ 05 ]</span>
              <span>Registry · {totalCount || 570} Nikkes &amp; Skins</span>
              <SectionAnchor id="characters" label="characters" />
            </p>
            {isLiveSync && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[rgb(95,227,103)]/[0.1] text-[rgb(95,227,103)] border border-[rgb(95,227,103)]/[0.25]">
                <span className="w-1.5 h-1.5 rounded-full bg-[rgb(95,227,103)] animate-pulse" />
                via NKAS
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
            Every character and costume variant has an internal identifier (like <code className="text-white bg-white/[0.08] px-1.5 py-0.5 rounded text-xs">c010_00</code> for Rapi or <code className="text-white bg-white/[0.08] px-1.5 py-0.5 rounded text-xs">c010_01</code> for White Promise).
            <br></br>Look up and copy any code for model swapping, costume mods, and Spine asset modding.
          </p>
        </div>

        {/* search */}
        <div className="relative min-w-[280px] sm:min-w-[340px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search by Nikke name, skin or ID (e.g. Rapi, c010, Red Hood)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#12141c] border border-white/[0.08] rounded-xl text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white/[0.2] font-sans"
          />
        </div>
      </div>

      {/* cards */}
      {loading ? (
        <div className="py-16 text-center font-mono text-xs text-neutral-500 animate-pulse">
          NIKKE ARCHIVE...
        </div>
      ) : filteredList.length === 0 ? (
        <div className="epic-card p-12 text-center text-neutral-400 text-sm">
          No Nikke or skin found matching "{query}".
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredList.map((nikke) => {
            const isCopied = copiedId === nikke.id;
            return (
              <div
                key={nikke.id}
                onClick={() => handleCopy(nikke.id)}
                className={`epic-card p-3 rounded-xl flex items-center justify-between cursor-pointer group select-none transition-all ${
                  isCopied
                    ? 'border-[rgb(95,227,103)]/[0.6] bg-[rgb(95,227,103)]/[0.06]'
                    : ''
                }`}
                title="Click to copy ID"
              >
                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-neutral-300 group-hover:text-white">
                      {nikke.id}
                    </span>
                    <span className="text-xs font-medium text-neutral-400 group-hover:text-neutral-200 truncate">
                      {nikke.name}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className={`p-1 rounded text-neutral-400 group-hover:text-white transition-colors shrink-0 ${
                    isCopied ? 'text-[rgb(95,227,103)]' : ''
                  }`}
                >
                  {isCopied ? (
                    <Check className="w-3.5 h-3.5 text-[rgb(95,227,103)]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* status bar */}
      <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pt-2 border-t border-white/[0.04]">
        <span>
          Showing {filteredList.length} of {totalCount} characters &amp; skins
          {isLiveSync && ' · Synced with Skuqre NKAS'}
        </span>
        <span>Click any card to copy code to clipboard</span>
      </div>

    </section>
  );
};
