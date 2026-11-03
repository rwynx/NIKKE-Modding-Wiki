import React, { useState } from 'react';
import { GuideSection } from '../types';
import { 
  PlayCircle, 
  ExternalLink, 
  Download, 
  Copy, 
  Check, 
  AlertTriangle, 
  Lightbulb, 
  ChevronRight,
  Code2,
  Zap,
  Wrench,
  Sparkles,
  FolderArchive
} from 'lucide-react';

interface GuideSectionCardProps {
  section: GuideSection;
  onOpenVideo: (video: { embedUrl: string; title: string }) => void;
}

export const GuideSectionCard: React.FC<GuideSectionCardProps> = ({ section, onOpenVideo }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 1800);
  };

  return (
    <article 
      id={section.id} 
      className="cyber-panel cyber-panel-hover rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden"
    >
      {/* Decorative top corner accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-nikke-cyan/10 to-transparent pointer-events-none" />

      {/* Header */}
      <div className="border-b border-nikke-border/80 pb-4 space-y-3">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {section.badge && (
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-nikke-accent/20 text-nikke-accent border border-nikke-accent/40 tracking-wider">
                {section.badge}
              </span>
            )}
            {section.category && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                {section.category}
              </span>
            )}
          </div>

          <h3 className="font-display font-extrabold text-2xl text-white tracking-wide">
            {section.title}
          </h3>
        </div>

        {/* Clean single-sentence automation notice (Row 2) - Only displayed if automationTip is defined */}
        {section.automationTip && (
          <div className="inline-flex items-start gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-xs text-emerald-400 font-sans max-w-2xl">
            <Zap className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span className="whitespace-pre-line leading-relaxed">
              {section.automationTip}
            </span>
          </div>
        )}
      </div>

      {/* Steps List */}
      <div className="space-y-5">
        {section.steps.map((step, idx) => (
          <div key={idx} className="space-y-3">
            <div className="flex items-start gap-3">
              {step.stepNumber !== undefined ? (
                <div className="w-7 h-7 rounded-lg bg-slate-900 border border-nikke-cyan/40 text-nikke-cyan font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-sm shadow-nikke-cyan/20">
                  {step.stepNumber}
                </div>
              ) : (
                <div className="w-2 h-2 rounded-full bg-nikke-accent mt-2 shrink-0 shadow-sm shadow-nikke-accent" />
              )}
              
              <div className="flex-1 space-y-2">
                <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-line">
                  {step.text}
                </p>

                {/* Substeps */}
                {step.substeps && (
                  <ul className="space-y-1.5 pl-2 border-l border-slate-800 my-2">
                    {step.substeps.map((sub, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <ChevronRight className="w-3.5 h-3.5 text-nikke-cyan shrink-0 mt-0.5" />
                        <span className="whitespace-pre-line">{sub}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Code block */}
                {step.code && (
                  <div className="my-2 relative rounded-xl bg-slate-950 p-3 border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto flex items-center justify-between group">
                    <div className="flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-slate-500" />
                      <pre className="font-mono">{step.code}</pre>
                    </div>
                    <button
                      onClick={() => handleCopyCode(step.code!)}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      title="Copy code"
                    >
                      {copiedCode === step.code ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                )}

                {/* Warnings & Tips */}
                {step.warning && (
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span className="whitespace-pre-line">{step.warning}</span>
                  </div>
                )}

                {step.tip && (
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
                    <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="whitespace-pre-line">{step.tip}</span>
                  </div>
                )}

                {/* Screenshots and diagrams */}
                {step.image && (
                  <div className="my-3 space-y-1.5">
                    <div className="rounded-xl overflow-hidden border border-nikke-border bg-slate-950 p-1">
                      <img
                        src={step.image.src}
                        alt={step.image.alt}
                        loading="lazy"
                        className="w-full max-h-[380px] object-contain rounded-lg hover:scale-[1.01] transition-transform duration-200"
                      />
                    </div>
                    {step.image.caption && (
                      <p className="text-[11px] font-mono text-slate-400 text-center">
                        ▲ {step.image.caption}
                      </p>
                    )}
                  </div>
                )}

                {/* Video tutorial launcher */}
                {step.video && (
                  <div className="my-3">
                    <button
                      type="button"
                      onClick={() => onOpenVideo(step.video!)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-nikke-accent/20 to-nikke-accent/10 hover:from-nikke-accent hover:to-rose-600 text-white font-semibold text-xs border border-nikke-accent/40 shadow-lg shadow-nikke-accent/20 transition-all duration-200 cursor-pointer group"
                    >
                      <PlayCircle className="w-4 h-4 text-nikke-accent group-hover:text-white transition-colors" />
                      <span>Watch Tutorial: {step.video.title}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Links & Downloads footer */}
      {section.links && section.links.length > 0 && (
        <div className="pt-4 border-t border-nikke-border/60">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
            Related Resources & Downloads:
          </span>
          <div className="flex flex-wrap gap-2">
            {section.links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                download={link.isDownload}
                target={link.isDownload ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium border border-nikke-border hover:border-nikke-cyan transition-colors"
              >
                {link.isDownload ? (
                  <Download className="w-3.5 h-3.5 text-nikke-cyan" />
                ) : (
                  <ExternalLink className="w-3.5 h-3.5 text-nikke-accent" />
                )}
                <span>{link.text}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};

