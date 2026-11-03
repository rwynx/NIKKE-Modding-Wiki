import React from 'react';
import { contributorsList } from '../data/creditsData';
import { Users, ExternalLink, Heart, Shield, Award } from 'lucide-react';

export const CreditsPage: React.FC = () => {
  return (
    <div className="space-y-12 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Banner */}
      <section className="relative rounded-3xl p-8 sm:p-10 border border-nikke-border overflow-hidden bg-gradient-to-r from-[#171c2b] via-[#0f1422] to-[#090d16]">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nikke-cyan/10 border border-nikke-cyan/30 text-nikke-cyan text-xs font-mono">
            <Award className="w-3.5 h-3.5" />
            <span>COMMUNITY HALL OF FAME</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            CONTRIBUTORS & <span className="text-glow-cyan text-nikke-cyan">PIONEERS</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Honoring the brilliant tool creators, mod managers, tutorial authors, and community members who built the Goddess of Victory: NIKKE modding ecosystem from the ground up.
          </p>
        </div>
      </section>

      {/* Grid of Contributors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contributorsList.map((contributor) => (
          <div
            key={contributor.name}
            className="cyber-panel cyber-panel-hover p-6 rounded-2xl border border-nikke-border flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-display font-bold text-xl text-white">
                    {contributor.name}
                  </h4>
                  <p className="text-xs font-mono text-nikke-cyan mt-0.5">
                    {contributor.role}
                  </p>
                </div>

                {contributor.badge && (
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {contributor.badge}
                  </span>
                )}
              </div>

              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {contributor.contribution}
              </p>
            </div>

            {(contributor.link || contributor.kofiLink) && (
              <div className="pt-3 border-t border-nikke-border/60 flex items-center justify-between gap-2">
                {contributor.link && (
                  <a
                    href={contributor.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-nikke-cyan transition-colors"
                  >
                    <span>{contributor.name === 'Nix' ? 'MEGA Archive' : 'Connect / Profile'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {contributor.kofiLink && (
                  <a
                    href={contributor.kofiLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-[#FF5E5B]/10 hover:bg-[#FF5E5B]/20 text-[#FF5E5B] border border-[#FF5E5B]/25 transition-all shrink-0 cursor-pointer"
                    title="Support Nix on Ko-fi"
                  >
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                      <path d="M23.881 8.948c-.02-.27-.14-.52-.34-.7-.2-.18-.46-.28-.73-.28H18.9c-.1-.7-.35-1.37-.73-1.97-.61-.95-1.51-1.66-2.58-2.02-.9-.3-1.87-.45-2.84-.45H3.75C2.79 3.53 1.86 3.91 1.18 4.6.5 5.28.11 6.21.11 7.18v6.78c0 .97.39 1.9 1.07 2.58.68.69 1.61 1.07 2.57 1.07h.78c.37 1.48 1.25 2.77 2.49 3.65 1.25.88 2.76 1.35 4.3 1.33 2.12 0 4.13-.88 5.56-2.42 1.04-1.12 1.69-2.54 1.87-4.07h4.06c.55 0 1.08-.22 1.47-.61.39-.39.61-.92.61-1.47V9.21c0-.09-.01-.18-.04-.26zM17.47 16.5c-.15 1.23-.68 2.37-1.52 3.27-1.15 1.24-2.77 1.94-4.47 1.94-1.24.01-2.46-.37-3.46-1.08s-1.71-1.75-2.01-2.94l-.13-.53H3.75c-.58 0-1.14-.23-1.55-.64-.41-.41-.64-.97-.64-1.55V7.18c0-.58.23-1.14.64-1.55.41-.41.97-.64 1.55-.64h8.97c.78 0 1.55.12 2.27.36.86.29 1.58.86 2.07 1.62.3.48.5 1.01.58 1.57l.08.57h-.01v7.39zm4.72-3.43c0 .13-.05.26-.14.35-.09.09-.22.14-.35.14h-4.22V9.5h4.22c.13 0 .26.05.35.14.09.09.14.22.14.35v3.08z"/>
                    </svg>
                    <span>Ko-fi</span>
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Special Thanks Callout */}
      <div className="cyber-panel p-8 rounded-2xl border border-nikke-border/80 text-center max-w-2xl mx-auto space-y-3">
        <Heart className="w-8 h-8 text-nikke-accent mx-auto animate-pulse" />
        <h4 className="font-display font-bold text-lg text-white">
          A Massive Thank You to the Whole Nikke Modding Community
        </h4>
        <p className="text-sm text-slate-400 font-sans">
          And thanks to all commanders, modders, and artists who continuously share their insights, bug fixes, and stunning creations!
        </p>
      </div>
    </div>
  );
};

