import React, { useState, useEffect } from 'react';
import { NmmTool } from '../types';
import { Download, Check, Sparkles, AlertTriangle, ShieldCheck, HardDrive } from 'lucide-react';

export const NmmComparisonMatrix: React.FC = () => {
  const [tools, setTools] = useState<NmmTool[]>([]);
  const [mode, setMode] = useState<'all' | 'unique'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/nmmCompare.json')
      .then((res) => res.json())
      .then((data: NmmTool[]) => {
        // Sort order: 1. Chizuru, 2. SkinnyMan (Mobile), 3. Danieru, 4. Na0h
        const order = ['chizuru', 'skinnyman', 'danieru', 'na0h'];
        const sorted = [...data].sort((a, b) => {
          const aIdx = order.findIndex((k) => a.name.toLowerCase().includes(k));
          const bIdx = order.findIndex((k) => b.name.toLowerCase().includes(k));
          return (aIdx === -1 ? 99 : aIdx) - (bIdx === -1 ? 99 : bIdx);
        });
        setTools(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load nmmCompare.json', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="cyber-panel p-8 rounded-2xl flex items-center justify-center">
        <div className="flex items-center gap-3 text-nikke-cyan font-mono animate-pulse">
          <HardDrive className="w-5 h-5 animate-spin" />
          <span>LOADING NMM PROTOCOLS...</span>
        </div>
      </div>
    );
  }

  // Calculate common features vs unique features
  const allFeaturesList = Array.from(
    new Set(tools.flatMap((t) => t.features.map((f) => f.replace(' ($)', ''))))
  );

  const commonFeatures = allFeaturesList.filter((f) =>
    tools.every((t) => t.features.some((tf) => tf.replace(' ($)', '') === f))
  );

  return (
    <div className="w-full space-y-6">
      {/* Header controls & Mode Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-xl border border-nikke-border">
        <div>
          <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-nikke-cyan" />
            NMM Manager Selection Matrix
          </h3>
          <p className="text-xs text-slate-400 font-sans">
            Choose the mod manager variant tailored for your operating system and mod workflow.
          </p>
        </div>

        {/* Tab pill toggle */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setMode('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
              mode === 'all'
                ? 'bg-nikke-cyan text-slate-950 shadow-md shadow-nikke-cyan/30 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Features
          </button>
          <button
            onClick={() => setMode('unique')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
              mode === 'unique'
                ? 'bg-nikke-accent text-white shadow-md shadow-nikke-accent/30 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Unique Features Only
          </button>
        </div>
      </div>

      {/* Tool Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tools.map((tool, idx) => {
          const isChizuru = tool.name.toLowerCase().includes('chizuru');
          const isDanieru = tool.name.toLowerCase().includes('danieru');
          const isSkinnyMan = tool.name.toLowerCase().includes('skinnyman') || tool.name.toLowerCase().includes('mobile');

          const filteredFeatures = tool.features.filter((f) => {
            if (mode === 'all') return true;
            const clean = f.replace(' ($)', '');
            return !commonFeatures.includes(clean);
          });

          return (
            <div
              key={tool.name}
              className={`cyber-panel rounded-2xl p-6 flex flex-col justify-between relative transition-all duration-300 hover:border-slate-500 ${
                isChizuru
                  ? 'border-nikke-cyan/40 bg-gradient-to-b from-nikke-cyan/5 to-transparent'
                  : isSkinnyMan
                  ? 'border-white/30 bg-gradient-to-b from-white/5 to-transparent'
                  : isDanieru
                  ? 'border-nikke-accent/40 bg-gradient-to-b from-nikke-accent/5 to-transparent'
                  : 'border-nikke-border'
              }`}
            >
              {/* Highlight ribbon */}
              {isChizuru && (
                <div className="absolute -top-3 right-4 bg-nikke-cyan text-slate-950 px-3 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider shadow-lg">
                  HOT-RELOAD & ADVANCED
                </div>
              )}
              {isSkinnyMan && (
                <div className="absolute -top-3 right-4 bg-white text-slate-950 px-3 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider shadow-lg">
                  MOBILE / ANDROID
                </div>
              )}
              {isDanieru && (
                <div className="absolute -top-3 right-4 bg-nikke-accent text-white px-3 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider shadow-lg">
                  ORIGINAL & STABLE
                </div>
              )}

              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-display font-bold text-xl text-white">
                      {tool.name}
                    </h4>
                    <p className="text-xs font-mono text-slate-400 mt-0.5">
                      Maintainer: <span className="text-slate-200 font-semibold">{tool.maintainer}</span>
                    </p>
                  </div>
                </div>

                {tool.note && !isSkinnyMan && (
                  <div className="mt-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>{tool.note}</span>
                  </div>
                )}

                {tool.disclaimer && (
                  <div className="mt-2.5 flex items-start gap-1.5 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs font-mono leading-relaxed">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-400 mt-0.5" />
                    <span>{tool.disclaimer}</span>
                  </div>
                )}

                {/* Features List */}
                <div className="mt-5">
                  <div className="text-[11px] font-mono uppercase text-slate-400 tracking-wider mb-2 flex items-center justify-between">
                    <span>{mode === 'all' ? 'Capabilities' : 'Exclusive Features'}</span>
                    <span className="text-slate-500 font-bold">{filteredFeatures.length} item(s)</span>
                  </div>

                  <ul className="space-y-2 text-sm max-h-[320px] overflow-y-auto pr-1">
                    {filteredFeatures.map((f, i) => {
                      const isPaid = f.includes('($)');
                      const featureLabel = f.replace(' ($)', '');

                      return (
                        <li key={i} className="flex items-center gap-2 text-slate-300 text-xs">
                          <span className="p-0.5 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0">
                            <Check className="w-3 h-3" />
                          </span>
                          <span className="flex-1">{featureLabel}</span>
                          {isPaid && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                              PAID
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>

                  {tool.unsupportedText && (
                    <div className="mt-3 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 font-sans leading-relaxed">
                      <span className="text-slate-300 font-semibold block mb-0.5">Not working yet:</span>
                      <span>{tool.unsupportedText.replace('Currently not working: ', '')}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Download Buttons Section */}
              <div className="mt-6 pt-4 border-t border-nikke-border/80">
                <span className="text-[11px] font-mono text-slate-400 block mb-2">DOWNLOAD MIRRORS:</span>
                <div className="flex flex-wrap gap-2">
                  {tool.downloads.map((dl, i) => (
                    <a
                      key={i}
                      href={dl.href}
                      download={dl.download}
                      target={dl.download ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="flex-1 min-w-[70px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 text-white text-xs font-semibold border border-slate-700 hover:border-nikke-cyan transition-all duration-150"
                    >
                      <Download className="w-3.5 h-3.5 text-nikke-cyan" />
                      <span>{dl.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

