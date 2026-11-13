import React from 'react';
import { contributorsList } from '../data/creditsData';
import { Users, ExternalLink, Heart } from 'lucide-react';
import { SectionAnchor } from './SectionAnchor';
import { BlurRevealTitle } from './BlurRevealTitle';

export const ContributorsSection: React.FC = () => {
  return (
    <section id="credits" className="py-24 scroll-mt-16 border-t border-white/[0.08] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* header */}
      <div className="space-y-4 max-w-3xl">
        <p className="text-xs font-sans font-medium tracking-wider text-neutral-400 uppercase flex items-center gap-2">
          <span className="text-white font-bold">[ 07 ]</span>
          <span>Credits & Community</span>
          <SectionAnchor id="credits" label="credits" />
        </p>

        <BlurRevealTitle
          as="h2"
          className="font-sans font-bold text-3xl sm:text-5xl text-white tracking-tight leading-[1.1]"
        >
          Credits & contributors. <br />
          <span className="text-neutral-400">People behind the scene.</span>
        </BlurRevealTitle>

        <p className="text-neutral-400 text-base sm:text-lg leading-relaxed font-sans">
          The developers, guide authors, wiki maintainers, modders and archivers who built <br></br>the tools, wrote the original guides, and keep the NIKKE modding community active.
        </p>
      </div>

      {/* contributors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contributorsList.map((c) => (
          <div key={c.name} className="epic-card p-5 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-sans font-bold text-base text-white tracking-tight">
                  {c.name}
                </h3>
                {c.badge && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-neutral-300 border border-white/[0.08]">
                    {c.badge}
                  </span>
                )}
              </div>
              <p className="text-xs font-mono text-[rgb(160,225,255)] mt-0.5">
                {c.role}
              </p>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed mt-2 whitespace-pre-line">
                {c.contribution}
              </p>
            </div>

            {(c.link || c.kofiLink) && (
              <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between gap-2">
                {c.link && (
                  <a
                    href={c.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-mono text-neutral-400 hover:text-white transition-colors"
                  >
                    <span>{c.name === 'Nix' ? 'MEGA Archive' : 'Profile Link'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {c.kofiLink && (
                  <a
                    href={c.kofiLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#FF5E5B]/10 hover:bg-[#FF5E5B]/20 text-[#FF5E5B] border border-[#FF5E5B]/25 transition-all shrink-0 cursor-pointer"
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

      {/* footer banner */}
      <div className="epic-card p-8 text-center max-w-xl mx-auto space-y-2">
        <Heart className="w-5 h-5 text-neutral-400 mx-auto" />
        <h4 className="font-bold text-white text-base tracking-tight">
          Thank you to the entire NIKKE modding community
        </h4>
        <p className="text-xs text-neutral-400 leading-relaxed font-sans">
          To all artists, engineers, and commanders creating and sharing mods freely across the globe.
        </p>
      </div>

    </section>
  );
};

