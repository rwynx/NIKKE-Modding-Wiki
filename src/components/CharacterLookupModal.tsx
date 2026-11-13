import React, { useState, useEffect, useMemo } from 'react';
import { CharacterItem } from '../types';
import { Search, Copy, Check, X, User } from 'lucide-react';
import { NikkeIcon } from './NikkeIcon';
import { useCharacters } from '../hooks/useCharacters';

interface CharacterLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CharacterLookupModal: React.FC<CharacterLookupModalProps> = ({ isOpen, onClose }) => {
  const { characterList, loading, isLiveSync, totalCount } = useCharacters();
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // keyboard shortcut listener for ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredList: CharacterItem[] = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return characterList;
    return characterList.filter((item) => (
      item.id.toLowerCase().includes(query) ||
      item.name.toLowerCase().includes(query)
    ));
  }, [characterList, search]);

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 1800);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-[#090b11] border border-white/[0.12] rounded-2xl shadow-[0_24px_70px_rgba(0,0,0,0.85)] flex flex-col max-h-[85vh] overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* top ambient glow line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgb(160,225,255)]/50 to-transparent pointer-events-none" />

        {/* top bar */}
        <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center justify-between bg-[#0e111a]/80 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.1] flex items-center justify-center text-[rgb(160,225,255)] shadow-inner">
              <User className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-sans font-bold text-white text-sm sm:text-base tracking-tight">
                  Nikke Character &amp; Skin IDs
                </h3>
                <span className="text-[11px] px-2 py-0.5 rounded-md font-mono bg-white/[0.06] text-neutral-300 border border-white/[0.08]">
                  {totalCount || 394} IDs
                </span>
                {isLiveSync && (
                  <span className="text-[10px] px-2 py-0.5 rounded-md font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Live Synced</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-400 mt-0.5 font-sans">
                Click any character or skin card to copy its code.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] text-neutral-400 hover:text-white transition-colors cursor-pointer"
            title="Close (ESC)"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* search input bar */}
        <div className="p-3.5 sm:p-4 border-b border-white/[0.06] bg-[#0c0e15]">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              autoFocus
              placeholder="Search by name (Dorothy, Red Hood, Summer...) or code (c010, c010_01)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-20 py-2.5 bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.06] border border-white/[0.1] focus:border-[rgb(160,225,255)]/50 rounded-xl text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-[rgb(160,225,255)]/30 font-sans transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="pointer-events-auto text-[11px] text-neutral-400 hover:text-white bg-white/[0.08] hover:bg-white/[0.15] px-1.5 py-0.5 rounded cursor-pointer transition-colors"
                >
                  Clear
                </button>
              )}
              <kbd className="hidden sm:inline text-[10px] font-mono text-neutral-500 bg-white/[0.05] px-1.5 py-0.5 rounded border border-white/[0.08]">
                ESC
              </kbd>
            </div>
          </div>
        </div>

        {/* results list */}
        <div className="p-3 sm:p-4 overflow-y-auto flex-1 space-y-2">
          {loading ? (
            <div className="py-16 text-center text-xs font-mono text-neutral-400 animate-pulse tracking-wider">
              SYNCING CHARACTER REGISTRY...
            </div>
          ) : filteredList.length === 0 ? (
            <div className="py-16 text-center text-neutral-400 text-xs sm:text-sm">
              No character or skin matched your query <span className="text-white font-mono">"{search}"</span>.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filteredList.map((item) => {
                const isCopied = copiedId === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleCopy(item.id)}
                    className={`group flex items-center justify-between p-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                      isCopied
                        ? 'bg-emerald-500/[0.12] border-emerald-500/50 shadow-[0_0_16px_rgba(16,185,129,0.2)] scale-[1.01]'
                        : 'bg-white/[0.025] hover:bg-white/[0.06] border-white/[0.07] hover:border-white/[0.2] shadow-sm hover:shadow-[0_4px_16px_rgba(0,0,0,0.4)] hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`font-mono font-bold text-[11px] px-2 py-0.5 rounded-md border transition-all ${
                          isCopied
                            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
                            : 'bg-black/60 text-[rgb(160,225,255)] border-white/[0.08] group-hover:border-[rgb(160,225,255)]/40 group-hover:shadow-[0_0_8px_rgba(160,225,255,0.2)]'
                        }`}
                      >
                        {item.id}
                      </span>
                      <span className="text-xs font-medium text-neutral-200 group-hover:text-white truncate">
                        {item.name}
                      </span>
                    </div>

                    <div
                      className={`px-2 py-1 rounded-md text-[11px] font-mono flex items-center gap-1 transition-all ${
                        isCopied
                          ? 'bg-emerald-500/20 text-emerald-300 font-bold'
                          : 'text-neutral-500 group-hover:text-neutral-300 group-hover:bg-white/[0.04]'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>COPIED</span>
                        </>
                      ) : (
                        <Copy className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* status footer */}
        <div className="p-3 sm:px-4 bg-[#07090e] border-t border-white/[0.06] flex items-center justify-between text-[11px] text-neutral-400 font-mono">
          <span>Found {filteredList.length} ID(s)</span>
          <span className="flex items-center gap-1.5 text-neutral-400">
            <NikkeIcon className="w-3 h-3 text-[rgb(160,225,255)]" />
            <span>{isLiveSync ? 'via NKAS' : 'Bundled Registry'}</span>
          </span>
        </div>
      </div>
    </div>
  );
};