import React, { useState } from 'react';
import { ShieldAlert, Bell, Sparkles, Info, ExternalLink, X } from 'lucide-react';

export const SecurityAlertBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="w-full max-w-3xl mb-6 sm:mb-8 transition-all duration-300">

      {/* ========================================================================= */}
      {/* 🔴 RED VARIANT — URGENT SECURITY THREAT                                 */}
      {/* PLEASE dont remove this if you forked the repo and adding or              */}
      {/* editing something. this (🔴) section is for quick SECURITY ALERTS        */}
      {/* ========================================================================= */}
      {/*
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-950/95 via-[#22090d]/95 to-neutral-950/95 border-2 border-red-500/50 shadow-[0_12px_45px_rgba(239,68,68,0.3)] backdrop-blur-xl p-4 sm:p-5 text-neutral-200">
        
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-95" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 min-w-0">
            <div className="relative p-2.5 sm:p-3 rounded-2xl bg-red-500/15 border border-red-500/40 text-red-400 shrink-0 mt-0.5 sm:mt-0 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
              <ShieldAlert className="w-6 h-6 sm:w-7 sm:h-7 text-red-400 animate-pulse" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            </div>

            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="font-mono text-[10px] sm:text-xs uppercase font-extrabold px-2.5 py-0.5 rounded-full bg-red-500/25 text-red-300 border border-red-500/50 tracking-wider">
                  Security Breach
                </span>
                <h4 className="font-sans font-extrabold text-white text-sm sm:text-base tracking-tight">
                  NIKKE PC Client Compromise Reported!
                </h4>
              </div>
              <p className="text-xs sm:text-[13px] text-neutral-300 font-sans leading-relaxed">
                Community reports confirm the official PC launcher was hijacked via a supply-chain attack. We strongly advise holding off on launching the game until SHIFT UP confirms it is safe.
              </p>
              
              <div className="pt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-mono text-neutral-400">
                <a 
                  href="https://gist.github.com/MotherSphere/d6c049a09ba8ac3085c51ee9df24a4e5"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-red-300 hover:text-white underline underline-offset-2 flex items-center gap-1"
                >
                  <span>Technical Breakdown & Scanner Tool</span>
                  <ExternalLink className="w-3 h-3 text-red-400" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto pt-1 sm:pt-0">
            <a
              href="https://x.com/NIKKE_en/status/2117817602659770434"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-neutral-200 hover:text-white border border-white/[0.12] text-xs font-mono font-medium transition-all duration-200 whitespace-nowrap active:scale-95"
              title="Official NIKKE X Statement"
            >
              <span>Official Note</span>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
            </a>

            <a
              href="https://www.reddit.com/r/NikkeMobile/comments/1xmx0d3/nikke_pc_client_has_apparently_been_compromised/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-500/25 hover:bg-red-500/40 text-red-100 hover:text-white border border-red-500/50 text-xs font-mono font-semibold transition-all duration-200 shadow-[0_0_15px_rgba(239,68,68,0.25)] hover:shadow-[0_0_22px_rgba(239,68,68,0.4)] whitespace-nowrap active:scale-95"
            >
              <span>Reddit Thread</span>
              <ExternalLink className="w-3.5 h-3.5 text-red-300" />
            </a>

            <button
              onClick={() => setDismissed(true)}
              className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] text-neutral-400 hover:text-white border border-white/[0.1] transition-colors"
              title="Dismiss advisory"
              aria-label="Dismiss advisory"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
      */}


      {/* ========================================================================= */}
      {/* 🔵 LIGHT BLUE / NEUTRAL (ACTIVE)                                          */}
      {/* PLEASE dont remove this if you forked the repo and adding or              */}
      {/* editing something. this (🔵) section is for PENDING/NEUTRAL updates       */}
      {/* ========================================================================= */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-950/95 via-[#0b1c2d]/95 to-neutral-950/95 border-2 border-indigo-400/50 shadow-[0_12px_45px_rgba(56,189,248,0.25)] backdrop-blur-xl p-4 sm:p-5 text-neutral-200">
        
        {/* glowing top edge line */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-25" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* left: icon & content */}
          <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 min-w-0">
            <div className="relative p-2.5 sm:p-3 rounded-2xl bg-indigo-500/15 border border-indigo-400/40 text-indigo-400 shrink-0 mt-0.5 sm:mt-0 shadow-[0_0_20px_rgba(56,189,248,0.3)]">
              <Info className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-400" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-400"></span>
              </span>
            </div>

            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="font-mono text-[10px] sm:text-xs uppercase font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-500/25 text-indigo-300 border border-indigo-400/50 tracking-wider">
                  Monitoring...
                </span>
                <h4 className="font-sans font-extrabold text-white text-sm sm:text-base tracking-tight">
                  Awaiting Clarification from SHIFTUP.
                </h4>
              </div>
              <p className="text-xs sm:text-[13px] text-neutral-300 font-sans leading-relaxed">
                The situation appears stable for now while developers are actively investigating. You can see the tweet from NIKKE on the right side and the community scanner tool to scan your system for an active/ongoing threat. And in the meantime, if you haven't already, change all your passwords from a different, clean device.
              </p>
            </div>
          </div>

          {/* right: actions */}
          <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-auto pt-1 sm:pt-0">
            <div className="flex flex-col gap-1.5 w-full sm:w-auto">
              <a
                href="https://x.com/NIKKE_en/status/2117817602659770434"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/25 hover:bg-indigo-500/40 text-indigo-100 hover:text-white border border-indigo-400/50 text-xs font-mono font-semibold transition-all duration-200 shadow-[0_0_12px_rgba(56,189,248,0.2)] hover:shadow-[0_0_18px_rgba(56,189,248,0.35)] whitespace-nowrap active:scale-95"
              >
                <span>NIKKE EN - Official Statement</span>
                <ExternalLink className="w-3 h-3 text-indigo-300 shrink-0" />
              </a>

              <a
                href="https://gist.github.com/MotherSphere/d6c049a09ba8ac3085c51ee9df24a4e5"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-neutral-200 hover:text-white border border-white/[0.12] text-xs font-mono font-medium transition-all duration-200 whitespace-nowrap active:scale-95"
              >
                <span>Community PC Scanner</span>
                <ExternalLink className="w-3 h-3 text-neutral-400 shrink-0" />
              </a>
            </div>

            <button
              onClick={() => setDismissed(true)}
              className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] text-neutral-400 hover:text-white border border-white/[0.1] transition-colors self-center"
              title="Dismiss notice"
              aria-label="Dismiss notice"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>


      {/* ========================================================================= */}
      {/* 🟢 GREEN VARIANT — COMMUNITY ANNOUNCEMENT / RESOLVED NOTICE              */}
      {/* PLEASE dont remove this if you forked the repo and adding or              */}
      {/* editing something. this (🟢) section is for quick POSITIVE announcements */}
      {/* ========================================================================= */}
      {/*
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-950/95 via-[#062419]/95 to-neutral-950/95 border-2 border-emerald-500/50 shadow-[0_12px_45px_rgba(16,185,129,0.25)] backdrop-blur-xl p-4 sm:p-5 text-neutral-200">
        
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-95" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 min-w-0">
            <div className="relative p-2.5 sm:p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 shrink-0 mt-0.5 sm:mt-0 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-400 animate-pulse" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>

            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="font-mono text-[10px] sm:text-xs uppercase font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/25 text-emerald-300 border border-emerald-500/50 tracking-wider">
                  Community Notice
                </span>
                <h4 className="font-sans font-extrabold text-white text-sm sm:text-base tracking-tight">
                  Test Announcement Header
                </h4>
              </div>
              <p className="text-xs sm:text-[13px] text-neutral-300 font-sans leading-relaxed">
                Test announcement body text goes here. Describe maintenance status, new tool releases, or community milestones.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-auto pt-1 sm:pt-0">
            <a
              href="https://nikkemodding.rwyn.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/25 hover:bg-emerald-500/40 text-emerald-100 hover:text-white border border-emerald-500/50 text-xs sm:text-[13px] font-mono font-semibold transition-all duration-200 shadow-[0_0_15px_rgba(16,185,129,0.25)] hover:shadow-[0_0_22px_rgba(16,185,129,0.4)] whitespace-nowrap active:scale-95"
            >
              <span>Test Button</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-300" />
            </a>

            <button
              onClick={() => setDismissed(true)}
              className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] text-neutral-400 hover:text-white border border-white/[0.1] transition-colors"
              title="Dismiss notice"
              aria-label="Dismiss notice"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
      */}

    </div>
  );
};
