import React from 'react';
import { suggestionsSections } from '../data/suggestionsData';
import { GuideSectionCard } from '../components/GuideSectionCard';
import { Layers, Image as ImageIcon } from 'lucide-react';
import { NikkeIcon } from '../components/NikkeIcon';

interface SuggestionsPageProps {
  onOpenVideo: (video: { embedUrl: string; title: string }) => void;
}

export const SuggestionsPage: React.FC<SuggestionsPageProps> = ({ onOpenVideo }) => {
  return (
    <div className="space-y-12 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Banner */}
      <section className="relative rounded-3xl p-8 sm:p-10 border border-nikke-border overflow-hidden bg-gradient-to-r from-[#17132a] via-[#110f20] to-[#0a0914]">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nikke-accent/10 border border-nikke-accent/30 text-nikke-accent text-xs font-mono">
            <NikkeIcon className="w-3.5 h-3.5" />
            <span>TEXTURE QUALITY & PROFESSIONAL STANDARDS</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            PRO TIPS & <span className="text-glow-accent text-nikke-accent">TEXTURE TECHNIQUES</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Essential knowledge to prevent blurry alpha outlines, black fringe halos, texture bleeding between limbs, and how to make obscuring weapons transparent.
          </p>
        </div>
      </section>

      {/* Guide Cards */}
      <div className="space-y-8">
        {suggestionsSections.map((sec) => (
          <GuideSectionCard key={sec.id} section={sec} onOpenVideo={onOpenVideo} />
        ))}
      </div>
    </div>
  );
};

