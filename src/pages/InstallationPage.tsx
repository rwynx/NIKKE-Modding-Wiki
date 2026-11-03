import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { installationSections } from '../data/installationData';
import { NmmComparisonMatrix } from '../components/NmmComparisonMatrix';
import { GuideSectionCard } from '../components/GuideSectionCard';
import { Shield, Terminal, ArrowDownCircle, CheckCircle2, AlertOctagon } from 'lucide-react';

interface InstallationPageProps {
  onOpenVideo: (video: { embedUrl: string; title: string }) => void;
  onNavigateToWorkshop: () => void;
}

export const InstallationPage: React.FC<InstallationPageProps> = ({ 
  onOpenVideo, 
  onNavigateToWorkshop 
}) => {
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (heroRef.current) {
      anime({
        targets: heroRef.current.querySelectorAll('.hero-fade-in'),
        opacity: [0, 1],
        translateY: [24, 0],
        delay: anime.stagger(120),
        duration: 800,
        easing: 'easeOutCubic'
      });
    }
  }, []);

  return (
    <div className="space-y-16 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <section 
        ref={heroRef}
        className="relative rounded-3xl p-8 sm:p-12 border border-nikke-border overflow-hidden bg-gradient-to-b from-[#111625] via-[#0c101c] to-[#080b13] shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-nikke-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-nikke-cyan/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="hero-fade-in inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nikke-cyan/10 border border-nikke-cyan/30 text-nikke-cyan text-xs font-mono">
            <Terminal className="w-3.5 h-3.5" />
            <span>COMMUNITY INITIATIVE</span>
          </div>

          <h1 className="hero-fade-in font-display font-black text-4xl sm:text-6xl text-white tracking-tight leading-none">
            NIKKE <span className="text-glow-accent text-nikke-accent">MODDING</span> WIKI
          </h1>

          <p className="hero-fade-in text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
            The definitive Goddess of Victory: NIKKE modding guide.
            Characters mods, lobby mods, icon mods... everything.
          </p>

          <div className="hero-fade-in flex flex-wrap gap-3 pt-2">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700 text-xs text-slate-300 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Fully Client-Side
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700 text-xs text-slate-300 font-medium">
              <Shield className="w-3.5 h-3.5 text-nikke-cyan" />
              Modding on PC
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700 text-xs text-slate-300 font-medium">
              <AlertOctagon className="w-3.5 h-3.5 text-amber-400" />
              Zero Stat Alterations
            </span>
          </div>

          <div className="hero-fade-in flex flex-wrap gap-4 pt-4">
            <a
              href="#installing-mod"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-nikke-accent to-rose-600 hover:from-rose-500 hover:to-nikke-accent text-white font-semibold text-sm shadow-lg shadow-nikke-accent/25 transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <ArrowDownCircle className="w-4 h-4" />
              <span>Step-by-Step Installation</span>
            </a>

            <button
              onClick={onNavigateToWorkshop}
              className="px-6 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700 hover:border-nikke-cyan transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Mod Workshop</span>
            </button>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <NmmComparisonMatrix />
      </section>

      <div className="sticky top-20 z-30 bg-[#0c101c]/90 backdrop-blur-md p-3 rounded-xl border border-nikke-border flex flex-wrap items-center gap-2 text-xs font-mono shadow-lg">
        <span className="text-slate-400 uppercase tracking-wider mr-2">Quick Jump:</span>
        {installationSections.map((sec) => (
          <a
            key={sec.id}
            href={`#${sec.id}`}
            className="px-2.5 py-1 rounded-md bg-slate-900 text-slate-300 hover:text-nikke-cyan hover:bg-slate-800 border border-slate-800 transition-colors"
          >
            {sec.title}
          </a>
        ))}
      </div>

      <section className="space-y-8">
        {installationSections.map((section) => (
          <GuideSectionCard 
            key={section.id} 
            section={section} 
            onOpenVideo={onOpenVideo} 
          />
        ))}
      </section>
    </div>
  );
};

