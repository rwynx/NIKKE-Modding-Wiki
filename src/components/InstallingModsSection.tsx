import React, { useState } from 'react';
import { SectionAnchor } from './SectionAnchor';
import { BlurRevealTitle } from './BlurRevealTitle';
import { 
  Play, 
  RefreshCw, 
  FolderPlus, 
  ToggleRight, 
  CheckCircle2, 
  ShieldCheck, 
  Smartphone, 
  Monitor, 
  AlertTriangle, 
  Terminal, 
  Wrench,
  HelpCircle,
  ExternalLink,
  ArrowRight
} from 'lucide-react';

export const InstallingModsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chizuru' | 'danieru' | 'skinnyman'>('chizuru');

  const chizuruSteps = [
    {
      step: '01',
      title: 'Launch NikkeModManager.exe',
      desc: 'Run NikkeModManager.exe. Ensure the manager folder is on the same NTFS drive partition as your Goddess of Victory: NIKKE game directory. Run as Administrator if prompted.',
      icon: Play,
      badge: 'FIRST BOOT',
      codeSnippet: 'NikkeModManager.exe'
    },
    {
      step: '02',
      title: 'Sync game assets',
      desc: 'If the app prompts you to download and sync assets on first launch, click "Yes". Let it synchronize the asset index so it can correctly recognize all files.',
      icon: RefreshCw,
      badge: 'AUTO-SYNC'
    },
    {
      step: '03',
      title: 'Drop mods into "mods" folder',
      desc: 'Place your downloaded mod folders directly into the mods directory inside Chizuru NMM. They will automatically show up in the manager interface.',
      icon: FolderPlus,
      badge: 'DRAG & DROP',
      codeSnippet: 'NikkeModManager/mods/<ModName>/'
    },
    {
      step: '04',
      title: 'Toggle mods enable / disable',
      desc: 'Browse your mod list in the manager. Simply tick or untick any file: character, skin, burst cutscene, portrait, or lobby wallpaper to enable or disable it.',
      icon: ToggleRight,
      badge: 'ONE-CLICK'
    },
    {
      step: '05',
      title: 'Click "Apply" & Play',
      desc: 'Click the "Apply" button, launch the game and it\'s done.',
      icon: CheckCircle2,
      badge: 'READY TO GO'
    }
  ];

  const danieruSteps = [
    {
      step: '01',
      title: 'Close Nikke & Delete Crash Handler',
      desc: 'Close the game completely. Ensure the NIKKE Launcher/icon is closed in the system tray, and kill `UnityCrashHandler64.exe` in Task Manager.',
      icon: AlertTriangle,
      badge: 'PROCESS KILL'
    },
    {
      step: '02',
      title: 'Place on same storage drive',
      desc: 'Extract Danieru NMM onto the exact same drive partition as your NIKKE installation (e.g., both on C: drive or both on D: drive) to allow symbolic link creation.',
      icon: Wrench,
      badge: 'SAME DRIVE'
    },
    {
      step: '03',
      title: 'Run as Administrator',
      desc: 'Right-click `NMM.exe` and select "Run as Administrator". Windows requires elevated privileges to create symlinks and hook game paths.',
      icon: Play,
      badge: 'ADMIN RIGHTS'
    },
    {
      step: '04',
      title: 'Patch game executable',
      desc: 'Click the "Patch Game" button in Danieru NMM and locate your `nikke.exe` executable inside your game directory. Choose your region (Global, HMT, or CN).',
      icon: Terminal,
      badge: 'EXE PATCH'
    },
    {
      step: '05',
      title: 'Place mods & Apply',
      desc: 'Drop mod folders into Danieru\'s "mods" folder. Click "Refresh Mod List" in the manager, check the mods you want to activate, and click "Apply Mods". Launch NIKKE!',
      icon: CheckCircle2,
      badge: 'APPLY'
    }
  ];

  const skinnymanSteps = [
    {
      step: '01',
      title: 'Install Shizuku on Android',
      desc: 'Download and install the Shizuku app. Shizuku allows Mod Dock to access Android game directories without root.',
      icon: Smartphone,
      badge: 'PREREQUISITE'
    },
    {
      step: '02',
      title: 'Setup Wireless ADB in Shizuku',
      desc: 'Open Shizuku and follow the built-in guide to pair and start the Shizuku service using Wireless Debugging (found in Android Developer Options) or remote ADB.',
      icon: Terminal,
      badge: 'WIRELESS ADB'
    },
    {
      step: '03',
      title: 'Install SkinnyMan Mod Dock APK',
      desc: 'Download and install the Mod Dock APK on your Android phone from the download mirrors.',
      icon: FolderPlus,
      badge: 'APK INSTALL'
    },
    {
      step: '04',
      title: 'Link Shizuku with Mod Dock',
      desc: 'Launch SkinnyMan Mod Dock and accept the Shizuku authorization dialog to grant permission to NIKKE\'s application data folder.',
      icon: CheckCircle2,
      badge: 'SHIZUKU LINK'
    },
    {
      step: '05',
      title: 'Follow In-App Guide & Apply',
      desc: 'SkinnyMan Mod Dock includes a complete guide inside the app. Drop supported mods and toggle them.',
      icon: HelpCircle,
      badge: 'IN-APP GUIDE'
    }
  ];

  return (
    <section id="installing-mods" className="max-w-[1060px] mx-auto px-4 sm:px-6 py-16 sm:py-24 scroll-mt-8 space-y-10 sm:space-y-12">
      
      {/* header */}
      <div className="space-y-4">
        <p className="text-xs font-sans font-medium tracking-wider text-neutral-400 uppercase flex items-center gap-2">
          <span className="text-white font-bold">[ 02 ]</span>
          <span>Mod Installation</span>
          <SectionAnchor id="installing-mods" label="installing-mods" />
        </p>

        <BlurRevealTitle
          as="h2"
          className="font-sans font-bold text-3xl sm:text-5xl text-white tracking-tight leading-[1.1]"
        >
          Installing Mods. <br />
          <span className="text-neutral-400">Step-by-step guides for each.</span>
        </BlurRevealTitle>

        <p className="text-sm sm:text-base text-neutral-400 max-w-3xl leading-relaxed font-sans">
          Click on a mod manager below to see its guide. We recommend <strong>Chizuru NMM</strong> for PC players due to its automated setup, hot-reloading feature and generally faster updates.
        </p>
      </div>

      {/* tabs */}
      <div className="flex flex-wrap gap-2.5 border-b border-white/[0.08] pb-4">
        <button
          onClick={() => setActiveTab('chizuru')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-sans font-medium transition-all cursor-pointer ${
            activeTab === 'chizuru'
              ? 'bg-white text-black font-semibold shadow-md'
              : 'bg-white/[0.04] hover:bg-white/[0.08] text-neutral-400 hover:text-white border border-white/[0.06]'
          }`}
        >
          <Monitor className="w-4 h-4" />
          <span>Chizuru NMM</span>
          <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${activeTab === 'chizuru' ? 'bg-black/10 text-black' : 'bg-[rgb(95,227,103)]/20 text-[rgb(95,227,103)]'}`}>
            Recommended
          </span>
        </button>

        <button
          onClick={() => setActiveTab('danieru')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-sans font-medium transition-all cursor-pointer ${
            activeTab === 'danieru'
              ? 'bg-white text-black font-semibold shadow-md'
              : 'bg-white/[0.04] hover:bg-white/[0.08] text-neutral-400 hover:text-white border border-white/[0.06]'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>Danieru NMM</span>
          <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${activeTab === 'danieru' ? 'bg-black/10 text-black' : 'bg-neutral-800 text-neutral-400'}`}>
            Original
          </span>
        </button>

        <button
          onClick={() => setActiveTab('skinnyman')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-sans font-medium transition-all cursor-pointer ${
            activeTab === 'skinnyman'
              ? 'bg-white text-black font-semibold shadow-md'
              : 'bg-white/[0.04] hover:bg-white/[0.08] text-neutral-400 hover:text-white border border-white/[0.06]'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>SkinnyMan Mod Dock</span>
          <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${activeTab === 'skinnyman' ? 'bg-black/10 text-black' : 'bg-amber-500/20 text-amber-300'}`}>
            Mobile / Android
          </span>
        </button>
      </div>

      {/* chizuru */}
      {activeTab === 'chizuru' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div>
              <span className="text-white font-bold text-sm block">Chizuru NMM Workflow</span>
              <p className="text-xs text-neutral-400 mt-0.5">
                Easy, install and ready to go without hassle, comes with built-in tutorials. Even has Event Calendar, Maintenance Reminder, and a live Spine viewer.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-[11px] font-mono text-[rgb(95,227,103)] bg-[rgb(95,227,103)]/10 px-2.5 py-1 rounded-full border border-[rgb(95,227,103)]/20">
                ✓ Auto Asset Sync & Faster Updates
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {chizuruSteps.map((item, idx) => {
              const Icon = item.icon;
              const isFinal = idx === chizuruSteps.length - 1;
              return (
                <div
                  key={item.step}
                  className={`epic-card p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group hover:border-white/[0.2] ${
                    isFinal ? 'md:col-span-2 lg:col-span-2 bg-gradient-to-br from-white/[0.04] to-transparent border-white/[0.15]' : ''
                  }`}
                >
                  <div className="absolute top-2 right-4 text-5xl font-mono font-bold text-white/[0.03] pointer-events-none group-hover:text-white/[0.06] transition-colors">
                    {item.step}
                  </div>

                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-[10px] font-mono tracking-wider text-neutral-400 bg-white/[0.04] px-2 py-0.5 rounded-full border border-white/[0.06]">
                        {item.badge}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="font-sans font-bold text-base text-white tracking-tight flex items-center gap-2">
                        <span className="text-neutral-500 font-mono text-xs font-normal">{item.step}.</span>
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-neutral-400 leading-relaxed font-sans">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {item.codeSnippet && (
                    <div className="mt-4 pt-3 border-t border-white/[0.06] relative z-10">
                      <code className="text-[11px] font-mono text-neutral-300 bg-black/40 px-2 py-1 rounded border border-white/[0.06] block truncate">
                        {item.codeSnippet}
                      </code>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* updates & troubleshooting banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-0 items-center text-xs font-sans">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 lg:pr-6">
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="font-bold text-white block">Having sync issues or updating versions?</span>
                  <p className="text-neutral-400 leading-relaxed">
                    Solutions for <code className="text-neutral-300 font-mono bg-white/[0.06] px-1 py-0.2 rounded">game_addressables_dir_missing</code> & version migration.
                  </p>
                </div>
              </div>

              <a
                href="#diagnostics"
                className="shrink-0 self-start sm:self-auto px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-white font-medium hover:text-[rgb(160,225,255)] transition-all flex items-center gap-1.5 cursor-pointer text-xs"
              >
                <span>Solutions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="flex items-start sm:items-center gap-3.5 pt-3 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/[0.08] lg:pl-6">
              <div className="p-2 rounded-xl bg-white/[0.06] border border-white/[0.1] shrink-0">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
              <div className="space-y-0.5">
                <span className="font-bold text-white block">After Game Updates:</span>
                <p className="text-neutral-400 leading-relaxed text-[11px] sm:text-xs">
                  Simply open NMM and click <strong className="text-neutral-200">"Apply"</strong> again to refresh symlinks. No reinstall needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* danieru */}
      {activeTab === 'danieru' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-amber-500/[0.05] border border-amber-500/20 text-xs text-amber-300 font-sans flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
            <div className="space-y-1">
              <span className="font-bold block">NOTE:</span>
              <p className="text-amber-300/80 leading-relaxed">
                Downloads are currently paused, pending future updates. Danieru NMM is the original
                community mod manager. It works, but does not support newer features like full-screen burst cutscenes and/or live-reloading. 
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {danieruSteps.map((item, idx) => {
              const Icon = item.icon;
              const isFinal = idx === danieruSteps.length - 1;
              return (
                <div
                  key={item.step}
                  className={`epic-card p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group hover:border-white/[0.2] ${
                    isFinal ? 'md:col-span-2 lg:col-span-2 bg-gradient-to-br from-white/[0.04] to-transparent border-white/[0.15]' : ''
                  }`}
                >
                  <div className="absolute top-2 right-4 text-5xl font-mono font-bold text-white/[0.03] pointer-events-none group-hover:text-white/[0.06] transition-colors">
                    {item.step}
                  </div>

                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-[10px] font-mono tracking-wider text-neutral-400 bg-white/[0.04] px-2 py-0.5 rounded-full border border-white/[0.06]">
                        {item.badge}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="font-sans font-bold text-base text-white tracking-tight flex items-center gap-2">
                        <span className="text-neutral-500 font-mono text-xs font-normal">{item.step}.</span>
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-neutral-400 leading-relaxed font-sans">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* moddock */}
      {activeTab === 'skinnyman' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-sky-500/[0.05] border border-sky-500/20 text-xs text-sky-200 font-sans flex items-start gap-3">
            <Smartphone className="w-4 h-4 shrink-0 mt-0.5 text-sky-400" />
            <div className="space-y-1">
              <span className="font-bold block">Android / Mobile Modding:</span>
              <p className="text-sky-200/80 leading-relaxed">
                SkinnyMan Mod Dock allows modding NIKKE directly on Android without requiring root access. It uses Shizuku to hook into Android data storage via wireless ADB.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {skinnymanSteps.map((item, idx) => {
              const Icon = item.icon;
              const isFinal = idx === skinnymanSteps.length - 1;
              return (
                <div
                  key={item.step}
                  className={`epic-card p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group hover:border-white/[0.2] ${
                    isFinal ? 'md:col-span-2 lg:col-span-2 bg-gradient-to-br from-white/[0.04] to-transparent border-white/[0.15]' : ''
                  }`}
                >
                  <div className="absolute top-2 right-4 text-5xl font-mono font-bold text-white/[0.03] pointer-events-none group-hover:text-white/[0.06] transition-colors">
                    {item.step}
                  </div>

                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-[10px] font-mono tracking-wider text-neutral-400 bg-white/[0.04] px-2 py-0.5 rounded-full border border-white/[0.06]">
                        {item.badge}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="font-sans font-bold text-base text-white tracking-tight flex items-center gap-2">
                        <span className="text-neutral-500 font-mono text-xs font-normal">{item.step}.</span>
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-neutral-400 leading-relaxed font-sans">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex items-start sm:items-center gap-3.5 text-xs text-neutral-300 font-sans">
            <div className="p-2 rounded-xl bg-white/[0.06] border border-white/[0.1] shrink-0">
              <HelpCircle className="w-4 h-4 text-white" />
            </div>
            <div className="space-y-0.5">
              <span className="font-bold text-white block">Complete In-App Help Guide:</span>
              <p className="text-neutral-400 leading-relaxed">
                As MrSkinnyMan notes: <em>"It's all in the app, there is an entire interactive help section inside Mod Dock."</em> Once Shizuku is connected, the app guides you through every step.
              </p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
