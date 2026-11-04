import React, { useState, useMemo } from 'react';
import { creationSections } from '../data/creationData';
import { GuideSectionCard } from '../components/GuideSectionCard';
import { Wrench, Search, Filter, Sparkles, BookOpen } from 'lucide-react';

interface CreationPageProps {
  onOpenVideo: (video: { embedUrl: string; title: string }) => void;
  onOpenCharacterModal: () => void;
}

export const CreationPage: React.FC<CreationPageProps> = ({ 
  onOpenVideo, 
  onOpenCharacterModal 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(() => {
    const set = new Set<string>();
    creationSections.forEach((s) => {
      if (s.category) set.add(s.category);
    });
    return ['All', ...Array.from(set)];
  }, []);

  const filteredSections = useMemo(() => {
    return creationSections.filter((section) => {
      const matchesCategory =
        selectedCategory === 'All' || section.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        section.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-12 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <section className="relative rounded-3xl p-8 sm:p-10 border border-nikke-border overflow-hidden bg-gradient-to-r from-[#121727] via-[#0d121f] to-[#0a0e19]">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nikke-accent/10 border border-nikke-accent/30 text-nikke-accent text-xs font-mono">
            <Wrench className="w-3.5 h-3.5" />
            <span>MOD CREATION WORKSHOP & PIPELINE</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            CREATE YOUR OWN <span className="text-nikke-cyan text-glow-cyan">NIKKE MODS</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Step-by-step guides on extracting game bundles, editing 2D Spine atlases, swapping character models, and repacking using modded UABEA.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={onOpenCharacterModal}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-nikke-cyan font-mono text-xs border border-nikke-border hover:border-nikke-cyan transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-nikke-cyan" />
              <span>Browse All NIKKE Character Codes</span>
            </button>
          </div>
        </div>
      </section>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-nikke-border">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-4 h-4 text-slate-400 mr-1 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-nikke-cyan text-slate-950 font-bold shadow-md shadow-nikke-cyan/30'
                  : 'text-slate-400 hover:text-white bg-slate-950/60 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Filter creation topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 focus:border-nikke-cyan rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-8">
        {filteredSections.length === 0 ? (
          <div className="cyber-panel p-12 text-center text-slate-400 rounded-2xl space-y-2">
            <BookOpen className="w-8 h-8 mx-auto text-slate-500" />
            <p>No creation guides matched your filters.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="text-xs text-nikke-cyan underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          filteredSections.map((section) => (
            <GuideSectionCard
              key={section.id}
              section={section}
              onOpenVideo={onOpenVideo}
            />
          ))
        )}
      </div>
    </div>
  );
};

