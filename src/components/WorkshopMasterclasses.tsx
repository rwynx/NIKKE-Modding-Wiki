import React, { useState, useMemo } from 'react';
import { creationSections } from '../data/creationData';
import { GuideSection } from '../types';
import { SectionAnchor } from './SectionAnchor';
import { BlurRevealTitle } from './BlurRevealTitle';
import { 
  PlayCircle, 
  ExternalLink, 
  Download, 
  Copy, 
  Check, 
  AlertTriangle, 
  Lightbulb, 
  Search, 
  Filter,
  Wrench,
  Code2,
  Sparkles,
  Zap,
  FolderArchive
} from 'lucide-react';

interface WorkshopMasterclassesProps {
  onOpenVideo: (video: { embedUrl: string; title: string }) => void;
  onOpenWorkbench: (videoId?: string) => void;
}

export const WorkshopMasterclasses: React.FC<WorkshopMasterclassesProps> = ({ 
  onOpenVideo, 
  onOpenWorkbench 
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [search, setSearch] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    creationSections.forEach((s) => {
      if (s.category) set.add(s.category);
    });
    return ['All', ...Array.from(set)];
  }, []);

  const filteredSections = useMemo(() => {
    return creationSections.filter((sec) => {
      const matchCat = activeCategory === 'All' || sec.category === activeCategory;
      const matchSearch =
        !search ||
        sec.title.toLowerCase().includes(search.toLowerCase()) ||
        sec.description?.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 1800);
  };

  return (
    <section id="legacy-guides" className="py-24 border-t border-white/[0.08] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* legacy #workshop alias */}
      <span id="workshop" className="sr-only" />
      
      {/* header */}
      <div className="space-y-4 max-w-3xl">
        <p className="text-xs font-sans font-medium tracking-wider text-neutral-400 uppercase flex items-center gap-2">
          <span className="text-white font-bold">[ 04 ]</span>
          <span>Legacy Modding Archive</span>
          <SectionAnchor id="legacy-guides" label="legacy-guides" />
        </p>

        <BlurRevealTitle
          as="h2"
          className="font-sans font-bold text-3xl sm:text-5xl text-white tracking-tight leading-[1.1]"
        >
          Legacy Modding Guides.<br />
          <span className="text-neutral-400">Compiled by Lady.</span>
        </BlurRevealTitle>

        <p className="text-neutral-400 text-base sm:text-lg leading-relaxed font-sans">
          Historical step-by-step procedures covering manual UABEA container unpacking, raw audio swaps, and hex calculations from previous eras of NIKKE modding.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* sidebar */}
        <div className="lg:col-span-3 space-y-4 lg:sticky lg:top-24">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search 21 guides..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#12141c] border border-white/[0.08] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/[0.2] font-sans"
            />
          </div>

          {/* Category List */}
          <div className="epic-card p-2 space-y-1">
            <span className="text-[10px] font-mono text-neutral-500 uppercase px-3 py-1.5 block">
              Categories
            </span>
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium tracking-tight transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-white text-black font-semibold'
                      : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <span>{cat}</span>
                  {cat === 'All' && (
                    <span className={`text-[10px] font-mono ${isSelected ? 'text-neutral-700' : 'text-neutral-500'}`}>
                      {creationSections.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Tools Download Hub */}
          <div className="epic-card p-4 space-y-2.5">
            <span className="text-[10px] font-mono text-neutral-500 uppercase block">
              Toolkits / Packages
            </span>
            <div className="space-y-1.5 text-xs">
              <div
                className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/[0.04] text-neutral-500 text-xs cursor-default select-none"
                title="This legacy tool is not hosted on this wiki"
              >
                <span>Nikke Asset Unpacker (NAU)</span>
                <span className="text-[10px] font-mono text-neutral-500">Not Hosted</span>
              </div>
              <a
                href="/downloads/UABEA-Modded.7z"
                download
                className="flex items-center justify-between p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white transition-colors"
              >
                <span>UABEA Modded (42 MB)</span>
                <Download className="w-3.5 h-3.5 text-neutral-400" />
              </a>
              <a
                href="https://ko-fi.com/silritinix"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white transition-colors"
              >
                <span>Nikke Modding Assistant - NMA</span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
              </a>
              <a
                href="https://github.com/aelurum/AssetStudio/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white transition-colors"
              >
                <span>AssetStudio (Aelurum)</span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
              </a>
            </div>
          </div>
        </div>

        {/* guides feed */}
        <div className="lg:col-span-9 space-y-6">

          {/* tools overview */}
          <div className="epic-card p-6 sm:p-7 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/[0.08] pb-3 gap-2">
              <div>
                <h3 className="font-sans font-bold text-lg text-white tracking-tight flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-[rgb(160,225,255)]" />
                  <span>Required Legacy Tools</span>
                </h3>
                <p className="text-xs text-neutral-400 font-sans mt-0.5">
                  Standalone utilities required for manual bundle extraction, hex editing, and container repacking.
                </p>
              </div>
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] w-fit">
                Manual Toolset
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {/* UABEA Modded */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] flex flex-col justify-between gap-3 hover:border-white/[0.15] transition-colors">
                <div className="space-y-1">
                  <div className="font-semibold text-white text-xs flex items-center gap-1.5">
                    <FolderArchive className="w-3.5 h-3.5 text-neutral-400" />
                    <span>UABEA Modded</span>
                  </div>
                  <p className="text-neutral-400 text-[11px] leading-relaxed">
                    Custom bundle editor for opening, dumping, and hex editing Unity asset containers.
                  </p>
                </div>
                <a
                  href="/downloads/UABEA-Modded.7z"
                  download
                  className="inline-flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-neutral-200 hover:text-white text-[11px] font-mono transition-colors border border-white/[0.06]"
                >
                  <span>Download (42 MB)</span>
                  <Download className="w-3 h-3 text-[rgb(160,225,255)]" />
                </a>
              </div>

              {/* NAU */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] flex flex-col justify-between gap-3 opacity-80 transition-colors">
                <div className="space-y-1">
                  <div className="font-semibold text-neutral-300 text-xs flex items-center gap-1.5">
                    <FolderArchive className="w-3.5 h-3.5 text-neutral-400" />
                    <span>NAU (Asset Unpacker)</span>
                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-neutral-800 text-neutral-400 border border-white/[0.05]">
                      Obsolete
                    </span>
                  </div>
                  <p className="text-neutral-400 text-[11px] leading-relaxed">
                    Legacy decryption tool. Obsolete, added here as historical reference & for archival purposes.
                  </p>
                </div>
                <div
                  className="inline-flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.05] text-neutral-500 text-[11px] font-mono select-none"
                  title="This legacy tool is not hosted on this wiki"
                >
                  <span>Not Hosted on Wiki</span>
                  <span className="text-[10px] text-neutral-500 font-sans">Ref. Only</span>
                </div>
              </div>

              {/* AssetStudio */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] flex flex-col justify-between gap-3 hover:border-white/[0.15] transition-colors">
                <div className="space-y-1">
                  <div className="font-semibold text-white text-xs flex items-center gap-1.5">
                    <FolderArchive className="w-3.5 h-3.5 text-neutral-400" />
                    <span>AssetStudio</span>
                  </div>
                  <p className="text-neutral-400 text-[11px] leading-relaxed">
                    Standalone asset viewer and extractor by Aelurum. Previews sprites, textures, and audio.
                  </p>
                </div>
                <a
                  href="https://github.com/aelurum/AssetStudio/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-neutral-200 hover:text-white text-[11px] font-mono transition-colors border border-white/[0.06]"
                >
                  <span>GitHub Releases</span>
                  <ExternalLink className="w-3 h-3 text-neutral-400" />
                </a>
              </div>
            </div>
          </div>

          {filteredSections.length === 0 ? (
            <div className="epic-card p-12 text-center text-neutral-400 text-sm">
              No masterclasses found matching "{search}".
            </div>
          ) : (
            filteredSections.map((sec, idx) => (
              <article key={sec.id} id={sec.id} className="epic-card p-6 sm:p-8 space-y-6">
                
                {/* Header */}
                <div className="border-b border-white/[0.08] pb-4 space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-mono text-neutral-400 font-bold px-2 py-0.5 rounded bg-white/[0.06] border border-white/[0.08]">
                        [ 02.{idx + 1} ]
                      </span>
                      {sec.category && (
                        <span className="text-[10px] font-mono text-neutral-400">
                          {sec.category}
                        </span>
                      )}
                    </div>
                    <h3 className="font-sans font-bold text-2xl text-white tracking-tight">
                      {sec.title}
                    </h3>
                  </div>

                  {/* Clean single-sentence automation notice (Row 2) - Only displayed if automationTip is defined */}
                  {sec.automationTip && (
                    <div className="inline-flex items-start gap-1.5 px-3 py-1.5 rounded-lg bg-[rgb(95,227,103)]/[0.08] border border-[rgb(95,227,103)]/[0.2] text-xs text-[rgb(95,227,103)] font-sans max-w-2xl">
                      <Zap className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span className="whitespace-pre-line leading-relaxed">
                        {sec.automationTip}
                      </span>
                    </div>
                  )}
                </div>

                {/* Steps */}
                <div className="space-y-4">
                  {sec.steps.map((step, sIdx) => (
                    <div key={sIdx} className="space-y-2">
                      <div className="flex items-start gap-3">
                        {step.stepNumber ? (
                          <span className="font-mono text-xs font-bold text-neutral-400 bg-white/[0.06] px-2 py-0.5 rounded shrink-0 mt-0.5">
                            {step.stepNumber < 10 ? `0${step.stepNumber}` : step.stepNumber}
                          </span>
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 shrink-0" />
                        )}
                        <p className="text-sm text-neutral-300 leading-relaxed font-sans whitespace-pre-line">
                          {step.text}
                        </p>
                      </div>

                      {/* Code Snippet */}
                      {step.code && (
                        <div className="ml-8 my-2 p-3 rounded-xl bg-black/60 border border-white/[0.08] flex items-center justify-between font-mono text-xs text-[rgb(160,225,255)] overflow-x-auto">
                          <pre>{step.code}</pre>
                          <button
                            onClick={() => handleCopy(step.code!)}
                            className="p-1.5 rounded hover:bg-white/[0.1] text-neutral-400 hover:text-white transition-colors shrink-0 ml-3 cursor-pointer"
                            title="Copy snippet"
                          >
                            {copiedCode === step.code ? (
                              <Check className="w-3.5 h-3.5 text-[rgb(95,227,103)]" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      )}

                      {/* Warnings / Tips */}
                      {step.tip && (
                        <div className="ml-8 p-3 rounded-xl bg-[rgb(160,225,255)]/[0.08] border border-[rgb(160,225,255)]/20 text-[rgb(160,225,255)] text-xs font-sans flex items-start gap-2">
                          <Lightbulb className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                          <span className="whitespace-pre-line">{step.tip}</span>
                        </div>
                      )}

                      {step.warning && (
                        <div className="ml-8 p-3 rounded-xl bg-rose-500/[0.08] border border-rose-500/20 text-rose-300 text-xs font-mono flex items-start gap-2">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                          <span className="whitespace-pre-line">{step.warning}</span>
                        </div>
                      )}

                      {/* Image Preview */}
                      {step.image && (
                        <div className="ml-8 my-3 rounded-xl overflow-hidden border border-white/[0.08] bg-black/40 p-1 max-w-2xl">
                          <img
                            src={step.image.src}
                            alt={step.image.alt}
                            loading="lazy"
                            className="w-full max-h-[320px] object-contain rounded-lg"
                          />
                          {step.image.caption && (
                            <p className="text-[11px] font-mono text-neutral-400 text-center py-1">
                              ▲ {step.image.caption}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Video Launcher */}
                      {step.video && (
                        <div className="ml-8 my-3">
                          <button
                            onClick={() => onOpenVideo(step.video!)}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white text-xs font-medium border border-white/[0.1] transition-all cursor-pointer"
                          >
                            <PlayCircle className="w-4 h-4 text-white" />
                            <span>Watch Video Lesson: {step.video.title}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Section Links */}
                {sec.links && sec.links.length > 0 && (
                  <div className="pt-4 border-t border-white/[0.06] flex flex-wrap gap-2">
                    {sec.links.map((link, lIdx) => (
                      <a
                        key={lIdx}
                        href={link.url}
                        download={link.isDownload}
                        target={link.isDownload ? undefined : '_blank'}
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white text-xs font-medium border border-white/[0.06] transition-colors"
                      >
                        {link.isDownload ? (
                          <Download className="w-3 h-3 text-neutral-400" />
                        ) : (
                          <ExternalLink className="w-3 h-3 text-neutral-400" />
                        )}
                        <span>{link.text}</span>
                      </a>
                    ))}
                  </div>
                )}
              </article>
            ))
          )}
        </div>

      </div>

    </section>
  );
};

