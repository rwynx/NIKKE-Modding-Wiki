import React, { useState, useEffect } from 'react';
import { NmmTool } from '../types';
import { Download, Check, Sparkles, AlertCircle, DollarSign, Smartphone } from 'lucide-react';
import { SectionAnchor } from './SectionAnchor';
import { BlurRevealTitle } from './BlurRevealTitle';

export const NmmSuiteSelector: React.FC = () => {
  const [tools, setTools] = useState<NmmTool[]>([]);
  const [mode, setMode] = useState<'all' | 'unique'>('all');
  const [showPaid, setShowPaid] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/nmmCompare.json')
      .then((res) => res.json())
      .then((data: NmmTool[]) => {
        // sort order
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

  const allFeaturesList = Array.from(
    new Set(tools.flatMap((t) => t.features.map((f) => f.replace(' ($)', ''))))
  );

  const commonFeatures = allFeaturesList.filter((f) =>
    tools.every((t) => t.features.some((tf) => tf.replace(' ($)', '') === f))
  );

  return (
    <section id="nmm-suite" className="py-20 border-t border-white/[0.08] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 font-sans">
      
      {/* header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <p className="text-xs font-sans font-medium tracking-wider text-neutral-400 uppercase flex items-center gap-2">
            <span className="text-white font-bold">[ 01 ]</span>
            <span>Mod Managers</span>
            <SectionAnchor id="nmm-tools" label="nmm-tools" />
          </p>
          <BlurRevealTitle
            as="h2"
            className="font-sans font-bold text-3xl sm:text-4xl text-white tracking-tight"
          >
            Pick a mod manager.
          </BlurRevealTitle>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-sans">
            The only hub hosting up-to-date, community-maintained NIKKE mod managers, backed directly by one of the largest NIKKE communities (<a href="https://discord.gg/nikke" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 underline font-medium transition-colors">discord.gg/nikke</a>, 110k+ members).
            Legacy releases on third-party sites (like ancient v0.21 builds on GameBanana) are completely broken with modern game catalogs. Pick whatever modern manager fits you best.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          
          {/* paid toggle */}
          <div className="flex items-center gap-2 bg-[#12141c] px-3 py-1.5 rounded-xl border border-white/[0.08]">
            <span className="text-xs font-sans text-neutral-400 flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-amber-400" />
              <span>Paid features:</span>
            </span>
            <button
              onClick={() => setShowPaid(!showPaid)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                showPaid ? 'bg-amber-400' : 'bg-neutral-800'
              }`}
              role="switch"
              aria-checked={showPaid}
              title={showPaid ? 'Hide paid features' : 'Show paid features ($)'}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-black shadow ring-0 transition duration-200 ease-in-out ${
                  showPaid ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-[10px] font-sans font-bold ${showPaid ? 'text-amber-400' : 'text-neutral-500'}`}>
              {showPaid ? 'ON' : 'OFF'}
            </span>
          </div>

          {/* filter */}
          <div className="flex items-center bg-[#12141c] p-1 rounded-xl border border-white/[0.08]">
            <button
              onClick={() => setMode('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-tight transition-all cursor-pointer ${
                mode === 'all'
                  ? 'bg-white text-black font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              All Features
            </button>
            <button
              onClick={() => setMode('unique')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-tight transition-all cursor-pointer flex items-center gap-1.5 ${
                mode === 'unique'
                  ? 'bg-white text-black font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3 h-3 text-neutral-400" />
              <span>Unique Only</span>
            </button>
          </div>
        </div>
      </div>

      {/* managers */}
      {loading ? (
        <div className="py-24 text-center font-sans text-xs text-neutral-500 animate-pulse">
          LOADING TOOL COMPARISON...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
          {tools.map((tool) => {
            const isChizuru = tool.name.toLowerCase().includes('chizuru');
            const isDanieru = tool.name.toLowerCase().includes('danieru');
            const isNa0h = tool.name.toLowerCase().includes('na0h');
            const isSkinnyMan = tool.name.toLowerCase().includes('skinnyman') || tool.name.toLowerCase().includes('mobile') || tool.name.toLowerCase().includes('dock');

            const filteredFeatures = tool.features.filter((f) => {
              if (!showPaid && f.includes('($)')) return false;
              if (mode === 'all') return true;
              const clean = f.replace(' ($)', '');
              return !commonFeatures.includes(clean);
            });

            const paidCount = tool.features.filter((f) => f.includes('($)')).length;

            return (
              <div
                key={tool.name}
                className={`epic-card p-6 flex flex-col justify-between relative transition-all duration-300 ${
                  isChizuru
                    ? 'border-[rgb(160,225,255)]/[0.3] bg-[#141724] shadow-xl shadow-[rgb(160,225,255)]/[0.04]'
                    : isSkinnyMan
                    ? 'border-white/[0.2] bg-[#141724] shadow-xl shadow-white/[0.03]'
                    : isDanieru
                    ? 'border-white/[0.12] bg-[#12141c]'
                    : 'border-white/[0.06] bg-[#0f1118] opacity-90 hover:opacity-100'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-end h-6">
                    {isChizuru && (
                      <div className="bg-white text-black px-2.5 py-0.5 rounded text-[10px] font-sans font-bold tracking-tight shadow-md flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[rgb(95,227,103)] animate-pulse" />
                        <span>RECOMMENDED · 100% FREE</span>
                      </div>
                    )}
                    {isSkinnyMan && (
                      <div className="bg-white text-black px-2.5 py-0.5 rounded text-[10px] font-sans font-bold tracking-tight shadow-md flex items-center gap-1">
                        <Smartphone className="w-3 h-3 text-black" />
                        <span>MOBILE / ANDROID</span>
                      </div>
                    )}
                    {isDanieru && (
                      <div className="bg-neutral-800 text-neutral-300 px-2.5 py-0.5 rounded text-[10px] font-sans font-semibold">
                        ORIGINAL
                      </div>
                    )}
                    {isNa0h && (
                      <div className="bg-neutral-900 text-neutral-500 border border-neutral-800 px-2 py-0.5 rounded text-[10px] font-sans">
                        PARTIAL PAYWALL
                      </div>
                    )}
                  </div>

                  <div className="h-14 flex flex-col justify-start">
                    <div className="flex items-center gap-2.5 h-8">
                      <h3 className="font-sans font-semibold text-xl text-white tracking-tight truncate flex items-center gap-2">
                        <span>{tool.name}</span>
                      </h3>
                      {isChizuru && (
                        <img
                          src="/DoroNice.gif"
                          alt="Doro Approved"
                          className="w-8 h-8 object-contain rounded-md shrink-0"
                          title="Doro Approved! Best Free & Full-Featured NMM"
                        />
                      )}
                    </div>

                    <p className="text-xs font-sans text-neutral-400 mt-1">
                      Maintainer: <span className="text-neutral-200">{tool.maintainer}</span>
                    </p>
                  </div>

                  {tool.note && !isSkinnyMan && (
                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-amber-500/[0.08] border border-amber-500/20 text-amber-300 text-xs font-sans">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span className="whitespace-pre-line">{tool.note}</span>
                    </div>
                  )}

                  {tool.disclaimer && (
                    <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-500/[0.08] border border-amber-500/25 text-amber-200 text-xs font-sans leading-relaxed">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span className="whitespace-pre-line">{tool.disclaimer}</span>
                    </div>
                  )}

                  {isDanieru && (
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-neutral-800/60 border border-neutral-700/60 text-neutral-400 text-[11px] font-sans">
                      <span className="whitespace-pre-line">Legacy tool · Downloads temporarily paused</span>
                    </div>
                  )}

                  {/* capabilities */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-sans uppercase text-neutral-400 font-medium">
                        {mode === 'all' ? 'Capabilities' : 'Exclusive Additions'} ({filteredFeatures.length})
                      </span>
                      {!showPaid && paidCount > 0 && (
                        <span className="text-[10px] font-sans text-neutral-500">
                          ({paidCount} paid hidden)
                        </span>
                      )}
                    </div>

                    <ul className="space-y-1.5 text-xs max-h-[290px] overflow-y-auto pr-1 font-harmony">
                      {filteredFeatures.map((feat, i) => {
                        const isPaid = feat.includes('($)');
                        const label = feat.replace(' ($)', '');

                        return (
                          <li key={i} className="flex items-center gap-2 text-neutral-300 font-normal">
                            <Check className="w-3.5 h-3.5 text-[rgb(95,227,103)] shrink-0" />
                            <span className="truncate whitespace-pre-line">{label}</span>
                            {isPaid && (
                              <span className="text-[9px] px-1 py-0.2 rounded font-sans bg-amber-500/20 text-amber-300 ml-auto shrink-0 border border-amber-500/30">
                                $ PAID
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>

                    {tool.unsupportedText && (
                      <div className="mt-3 p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[11px] leading-relaxed text-neutral-400 font-sans">
                        <span className="text-neutral-300 font-medium block mb-0.5">Not working yet:</span>
                        <span className="whitespace-pre-line">{tool.unsupportedText.replace('Currently not working: ', '')}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* downloads */}
                <div className="pt-6 mt-6 border-t border-white/[0.08] space-y-2.5">
                  {isChizuru && (
                    <a
                      href="https://discord.com/invite/DzGXMQf85h"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 rounded-lg bg-[#5865F2]/10 hover:bg-[#5865F2]/20 border border-[#5865F2]/30 text-white transition-all group/disc"
                      title="Join Chizuru Discord for community support, updates & troubleshooting"
                    >
                      <div className="flex items-center gap-2 leading-none">
                        <svg className="w-3.5 h-3.5 fill-[#5865F2] shrink-0" viewBox="0 0 24 24">
                          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                        </svg>
                        <span className="text-[11px] font-medium text-neutral-200 group-hover/disc:text-white leading-none relative top-[0.5px]">
                          Chizuru Discord (Support)
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[#5865F2] font-semibold leading-none relative top-[0.5px]">Join →</span>
                    </a>
                  )}

                  {isSkinnyMan && (
                    <a
                      href="https://discord.gg/sH8trEUzMu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 rounded-lg bg-[#5865F2]/10 hover:bg-[#5865F2]/20 border border-[#5865F2]/30 text-white transition-all group/disc"
                      title="Join ModDock Discord for community support, updates & troubleshooting"
                    >
                      <div className="flex items-center gap-2 leading-none">
                        <svg className="w-3.5 h-3.5 fill-[#5865F2] shrink-0" viewBox="0 0 24 24">
                          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                        </svg>
                        <span className="text-[11px] font-medium text-neutral-200 group-hover/disc:text-white leading-none relative top-[0.5px]">
                          SkinnyMan Discord (Support)
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[#5865F2] font-semibold leading-none relative top-[0.5px]">Join →</span>
                    </a>
                  )}

                  <span className="text-[10px] font-sans uppercase text-neutral-400 font-medium block">
                    Download Mirrors
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {tool.downloads.map((dl, i) => {
                      const isDisabled = isDanieru;
                      return (
                        <a
                          key={i}
                          href={isDisabled ? undefined : dl.href}
                          download={isDisabled ? undefined : dl.download}
                          target={dl.download || isDisabled ? undefined : '_blank'}
                          rel={isDisabled ? undefined : 'noopener noreferrer'}
                          className={`flex-1 min-w-[90px] min-h-[38px] transition-all text-center ${
                            isDisabled
                              ? 'opacity-40 cursor-not-allowed bg-neutral-800/50 text-neutral-400 border border-neutral-700/50 rounded-full px-2.5 py-1.5 flex items-center justify-center gap-1.5 text-xs font-harmony'
                              : 'btn-liquid-chroma'
                          }`}
                          title={isDisabled ? 'Downloads paused pending update' : undefined}
                        >
                          {isDisabled ? (
                            <div className="flex items-center justify-center gap-1.5 w-full text-center">
                              <Download className="w-3 h-3 shrink-0 text-neutral-400" />
                              <span className="text-center leading-tight text-[11.5px] font-medium">{dl.label}</span>
                            </div>
                          ) : (
                            <span className="btn-liquid-chroma-inner min-h-[35px] px-3 py-1.5">
                              <Download className="w-3 h-3 shrink-0 text-white" />
                              <span className="text-center leading-tight text-[11.5px] font-medium">{dl.label}</span>
                            </span>
                          )}
                        </a>
                      );
                    })}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </section>
  );
};
