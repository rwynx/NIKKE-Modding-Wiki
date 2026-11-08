import React, { useState, useEffect, useRef } from 'react';
import { SectionAnchor } from './SectionAnchor';
import { BlurRevealTitle } from './BlurRevealTitle';

interface ManagerFeatureStat {
  name: string;
  tag?: string;
  count: number;
  total: number;
  percent: number;
  color: string;
  barClass: string;
  note: string;
}

const managerStats: ManagerFeatureStat[] = [
  {
    name: 'Chizuru NMM',
    tag: 'Community Standard',
    count: 21,
    total: 21,
    percent: 100,
    color: 'text-[rgb(95,227,103)]',
    barClass: 'bg-gradient-to-r from-[rgb(160,225,255)] to-[rgb(95,227,103)]',
    note: 'All features free · Live hot-reload',
  },
  {
    name: 'Danieru NMM',
    tag: 'Lightweight',
    count: 10,
    total: 21,
    percent: 48,
    color: 'text-[rgb(160,225,255)]',
    barClass: 'bg-[rgb(160,225,255)]',
    note: 'Essential slots · Asset downloader',
  },
  {
    name: 'Na0h NMM (Free Version)',
    tag: 'Outdated',
    count: 6,
    total: 21,
    percent: 29,
    color: 'text-amber-400',
    barClass: 'bg-amber-500/80',
    note: 'Core only · 15 features behind paywall',
  },
  {
    name: 'Manual Modding',
    tag: 'Tedious',
    count: 2,
    total: 21,
    percent: 10,
    color: 'text-neutral-400',
    barClass: 'bg-neutral-600',
    note: 'Static overwrite · No live swap',
  },
];

export const BenchmarkSpeedBar: React.FC = () => {
  const [inView, setInView] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Trigger smooth water fill animation on scroll view
  useEffect(() => {
    const cardEl = cardRef.current;
    if (!cardEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(cardEl);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="engine" className="py-24 border-t border-white/[0.08] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 font-sans">
      
      {/* header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <div className="lg:col-span-6 space-y-5">
          <p className="text-xs font-semibold tracking-wider text-neutral-400 uppercase flex items-center gap-2">
            <span className="text-white font-bold">[ 01 ]</span>
            <span>Feature Coverage</span>
            <SectionAnchor id="engine" label="feature-matrix" />
          </p>

          <BlurRevealTitle
            as="h2"
            className="font-sans font-bold text-3xl sm:text-5xl text-white tracking-tight leading-[1.1]"
          >
            How modern modding works. <br />
            <span className="text-neutral-400">What each tool can do.</span>
          </BlurRevealTitle>

          <p className="text-neutral-400 text-base sm:text-lg leading-relaxed font-sans max-w-xl">
            Modding Nikke is now very straightforward. Tools like Chizuru NMM use symbolic links to swap character costumes, burst cutscenes, and lobby wallpapers in real-time without risking original game files. Modding is strictly aesthetic and client-side only — the Nikke community does not tolerate cheaters, and gameplay exploits are strictly forbidden.
          </p>
        </div>

        {/* benchmark card */}
        <div 
          ref={cardRef}
          className="lg:col-span-6 bg-[#12141c] border border-white/[0.08] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden font-sans"
        >
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[rgb(95,227,103)] animate-pulse" />
              <span className="text-xs uppercase text-neutral-300 font-bold tracking-wider">
                Manager Capability Matrix
              </span>
            </div>
            <span className="text-[10px] font-mono text-neutral-400">18 STANDARD FEATURES</span>
          </div>

          <div className="space-y-4">
            {managerStats.map((stat, idx) => (
              <div key={stat.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-white font-bold tracking-tight truncate">
                      {stat.name}
                    </span>
                    {stat.tag && (
                      <span className="hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded bg-white/[0.05] text-neutral-400 border border-white/[0.05] font-medium">
                        {stat.tag}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2.5 text-right shrink-0">
                    <span className="text-neutral-400 text-xs hidden xs:inline">
                      {stat.note}
                    </span>
                    <span className={`font-bold tracking-tight text-xs sm:text-sm ${stat.color}`}>
                      {stat.count}/{stat.total} ({stat.percent}%)
                    </span>
                  </div>
                </div>

                <div className="w-full bg-white/[0.05] rounded-full h-3 overflow-hidden p-0.5 relative">
                  <div 
                    className={`h-full rounded-full relative overflow-hidden ${stat.barClass}`} 
                    style={{ 
                      width: inView ? `${stat.percent}%` : '0%',
                      transition: 'width 1.8s cubic-bezier(0.22, 1, 0.36, 1)',
                      transitionDelay: `${idx * 140}ms`
                    }} 
                  >
                    {inView && (
                      <div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-water-sheen pointer-events-none" 
                        style={{ animationDelay: `${idx * 140}ms` }}
                      />
                    )}
                    <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-transparent to-white/70 rounded-full blur-[0.5px] pointer-events-none" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-neutral-400 pt-3 border-t border-white/[0.05]">
            <span>Evaluated across 21 standard modding features</span>
            <a href="#nmm-suite" className="text-white hover:text-[rgb(95,227,103)] font-medium transition-colors">Compare Tools →</a>
          </div>
        </div>

      </div>

    </section>
  );
};
