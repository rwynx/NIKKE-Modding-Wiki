import React, { useState } from 'react';
import { ChevronDown, AlertTriangle, CheckCircle, Terminal, HelpCircle, Folder, FileText, ArrowRight } from 'lucide-react';
import { SectionAnchor } from './SectionAnchor';
import { BlurRevealTitle } from './BlurRevealTitle';

export const DiagnosticsFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Which NIKKE Mod Manager should I use? Are old GameBanana tools working?',
      a: (
        <div className="space-y-3 text-xs sm:text-sm text-neutral-300">
          <p>
            <strong className="text-white">NIKKE Modding Wiki (nikkemodding.rwyn.app)</strong> is the only primary hub hosting up-to-date, community-maintained NIKKE mod managers and tool suites, built and supported directly within the largest NIKKE community (<a href="https://discord.gg/nikke" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline font-semibold">discord.gg/nikke</a> with 110k+ members).
          </p>
          <p className="text-neutral-400">
            Ancient tools found on third-party sites (such as the legacy v0.21 manager on GameBanana) are completely obsolete, discontinued, and will crash or fail to inject assets with modern Unity addressables.
          </p>
          <p className="text-neutral-300">
            For current gameplay, always use the active tools hosted here in the <a href="/nmm-suite/" className="text-blue-400 hover:underline font-semibold">NMM Tools</a> section (Chizuru NMM, Danieru NMM, na0h NMM for PC, or SkinnyMan ModDock for Android). Chizuru NMM is recommended for most PC players.
          </p>
        </div>
      )
    },
    {
      q: 'Loading Screen Stuck at 43% or 4/7: How do I fix it?',
      a: (
        <div className="space-y-3 text-xs sm:text-sm text-neutral-300">
          <p>This occurs when Unity addressable catalog manifests become mismatched. Follow this proven sequence:</p>
          <ol className="list-decimal list-inside space-y-1.5 pl-1 text-neutral-400">
            <li>Close Nikke completely and terminate background crash handlers in Task Manager.</li>
            <li>Press Win + R and navigate to: <code className="text-white bg-white/[0.08] px-1.5 py-0.5 rounded font-mono text-xs">%USERPROFILE%\AppData\LocalLow\com_proximabeta\NIKKE\com.shiftup.addressables</code></li>
            <li>Delete all cached files inside that folder so the client pulls fresh manifests.</li>
            <li>Open the official Nikke Launcher, click the Gear icon, and choose "Repair".</li>
            <li>Launch the game once until "Tap to Continue", then exit game & launcher.</li>
            <li>Delete <code className="text-white bg-white/[0.08] px-1.5 py-0.5 rounded font-mono text-xs">UnityCrashHandler64.exe</code> in the game folder.</li>
            <li>Open NMM as Admin and re-apply your mods.</li>
          </ol>
        </div>
      )
    },
    {
      q: 'Why are my character textures completely pink / magenta in-game?',
      a: (
        <div className="space-y-3 text-xs sm:text-sm text-neutral-300">
          <p>
            When a character model turns bright neon pink in-game, it means Unity cannot link the texture shader or the mod was built for an older game version with an outdated bundle structure.
          </p>

          {/* pink glitch notice */}
          <div className="space-y-2 text-neutral-400">
            <p>
              <strong className="text-white">Fix 1 (Automatic via Chizuru NMM):</strong> Chizuru NMM includes an automated repacker that takes your outdated mod textures and repacks them against the fresh game catalogs in one click.
              <br></br>Or you can use Nikke Modding Assistant (NMA / formerly Nix Multitool) or Doro Repacker. Those also automatically rebuild the broken mods.
            </p>
            <p>
              <strong className="text-white">Fix 2 (Manual via UABEA):</strong> Open the outdated mod bundle in UABEA, export the raw texture PNGs, grab the fresh vanilla character bundle from the game's addressables directory, import the modded PNGs back into the clean container, and save/repack.
            </p>
          </div>

          {/* video guide */}
          <div className="pt-3 space-y-2">
            <p className="text-xs text-neutral-300 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              <span>Video guide by <strong>Lady</strong>, explaining the pink texture error & step-by-step repack fix:</span>
            </p>
            <div className="relative aspect-video w-full max-w-2xl rounded-xl overflow-hidden border border-white/[0.1] bg-black shadow-lg">
              <iframe
                src="https://www.youtube-nocookie.com/embed/eE85rD1ulfM"
                title="Fixing Pink Mod / Repack Error by Lady"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )
    },
    {
      q: 'Sync did not complete: game_addressables_dir_missing',
      a: (
        <div className="space-y-4 text-xs sm:text-sm text-neutral-300">
          <p>
            This error pops up during resource sync when NMM cannot locate your game's addressable catalog path automatically, leaving the <code className="text-white bg-white/[0.08] px-1.5 py-0.5 rounded font-mono text-xs">CATALOG_PATH</code> field empty.
          </p>

          {/* error dialog preview */}
          <div className="w-full max-w-md rounded-xl bg-[#1b1c24] border border-white/[0.12] shadow-2xl overflow-hidden font-sans">
            <div className="flex items-center justify-between px-3.5 py-2 bg-[#14151c] border-b border-white/[0.06] text-neutral-300">
              <span className="font-medium text-[11px] text-neutral-200">Resource sync failed</span>
              <div className="flex items-center gap-2.5 text-neutral-500 text-[10px] font-mono">
                <span>—</span>
                <span>□</span>
                <span>✕</span>
              </div>
            </div>
            <div className="p-4 flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
              </div>
              <div className="space-y-1">
                <p className="text-neutral-200 font-semibold text-xs">Sync did not complete:</p>
                <code className="text-amber-300 font-mono text-[11px] block bg-black/40 px-2 py-1 rounded border border-amber-500/20">
                  game_addressables_dir_missing
                </code>
              </div>
            </div>
            <div className="px-4 pb-3 flex justify-end">
              <span className="px-5 py-1 rounded-lg bg-[#3b82f6] text-white font-medium text-xs shadow-sm">
                OK
              </span>
            </div>
          </div>

          <div className="space-y-2 pt-1">
            <strong className="text-white block">Step-by-step Fix:</strong>
            <ol className="list-decimal list-inside space-y-1.5 pl-1 text-neutral-400">
              <li>Open your NMM folder and find <code className="text-white bg-white/[0.08] px-1.5 py-0.5 rounded font-mono text-xs">manager_config.json</code>.</li>
              <li>Open the file in Notepad or your preferred text editor.</li>
              <li>Check if the <code className="text-white bg-white/[0.08] px-1.5 py-0.5 rounded font-mono text-xs">CATALOG_PATH</code> entry is empty (<code className="text-neutral-400 font-mono">""</code>).</li>
              <li>If empty, manually set it to point to wherever your game is installed:
                <div className="mt-1.5 pl-4">
                  <code className="text-neutral-200 bg-white/[0.06] px-2 py-1 rounded font-mono text-[11px] sm:text-xs block break-all border border-white/[0.08]">
                    ...\NIKKE\Unity\com_proximabeta_NIKKE\com.shiftup.patch
                  </code>
                </div>
              </li>
              <li>Save the file and restart NMM. The sync error will be resolved.</li>
            </ol>
          </div>

          {/* config editor preview */}
          <div className="pt-2">
            <span className="text-[11px] font-mono uppercase text-neutral-400 tracking-wider block mb-2">
              Preview: manager_config.json
            </span>
            <div className="w-full max-w-xl rounded-xl bg-[#0e1017] border border-white/[0.1] overflow-hidden text-xs font-mono shadow-xl">
              <div className="flex items-center justify-between px-3.5 py-1.5 bg-white/[0.03] border-b border-white/[0.06]">
                <div className="flex items-center gap-2 text-neutral-400 text-[11px]">
                  <FileText className="w-3.5 h-3.5 text-blue-400" />
                  <span>manager_config.json</span>
                </div>
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider">JSON</span>
              </div>
              <div className="p-3.5 text-neutral-300 space-y-1 text-[11px] sm:text-xs overflow-x-auto leading-relaxed">
                <div className="text-neutral-400">
                  <span className="text-neutral-200">"GAME_PATH"</span>: <span className="text-neutral-300">"E:\\NIKKE\\NIKKE"</span>,
                </div>
                <div className="text-neutral-400">
                  <span className="text-neutral-200">"VERSION"</span>: <span className="text-neutral-300">"com.proximabeta"</span>,
                </div>
                <div className="py-1 px-2 -mx-1 rounded bg-blue-500/20 border-l-2 border-blue-400 text-white font-semibold">
                  <span className="text-blue-300">"CATALOG_PATH"</span>: <span className="text-neutral-100">"E:\\NIKKE\\Unity\\com_proximabeta_NIKKE\\com.shiftup.patch"</span>,
                </div>
                <div className="text-neutral-400">
                  <span className="text-neutral-200">"LSS_PATH"</span>: <span className="text-neutral-300">"E:\\NIKKE\\Unity\\com_proximabeta_NIKKE\\com.shiftup.patch"</span>,
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      q: 'How to move to a new NMM version without losing my settings?',
      a: (
        <div className="space-y-4 text-xs sm:text-sm text-neutral-300">
          <p>
            Upgrading Chizuru NMM is completely lossless. You don't need to reconfigure your game paths or redownload your mods.
          </p>

          <p className="text-neutral-400">
            Simply move or copy <strong className="text-white">manager_config.json</strong>, <strong className="text-white">mod_state.json</strong>, and your <strong className="text-white">mods</strong> folder into the new version's folder. Ready to go.
          </p>

          {/* folder transfer preview */}
          <div className="pt-1">
            <span className="text-[11px] font-mono uppercase text-neutral-400 tracking-wider block mb-2">
              Transfer Checklist (NMM Directory)
            </span>
            <div className="w-full max-w-md rounded-xl bg-[#13151f] border border-white/[0.1] overflow-hidden text-xs font-sans shadow-xl">
              <div className="flex items-center justify-between px-3.5 py-2 bg-white/[0.03] border-b border-white/[0.06] text-neutral-400 text-[11px]">
                <span className="font-mono">NikkeModManager /</span>
                <span className="text-[10px] text-[rgb(95,227,103)] bg-[rgb(95,227,103)]/10 px-2 py-0.5 rounded-full border border-[rgb(95,227,103)]/20 font-mono">
                  3 Items to Transfer
                </span>
              </div>
              <div className="p-3 space-y-1 font-mono text-[11px]">
                <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded text-neutral-500 opacity-60">
                  <Folder className="w-3.5 h-3.5 text-neutral-400" />
                  <span>libs/</span>
                </div>
                <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-emerald-500/[0.12] border border-emerald-500/30 text-white font-medium">
                  <div className="flex items-center gap-2.5">
                    <Folder className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-200 font-bold">mods/</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-sans uppercase tracking-wider font-bold">COPY / KEEP</span>
                </div>
                <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-emerald-500/[0.12] border border-emerald-500/30 text-white font-medium">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-200 font-bold">manager_config.json</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-sans uppercase tracking-wider font-bold">COPY / KEEP</span>
                </div>
                <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-emerald-500/[0.12] border border-emerald-500/30 text-white font-medium">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-200 font-bold">mod_state.json</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-sans uppercase tracking-wider font-bold">COPY / KEEP</span>
                </div>
                <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded text-neutral-500 opacity-60">
                  <Terminal className="w-3.5 h-3.5 text-neutral-400" />
                  <span>NMMv1.1.x.exe</span>
                </div>
                <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded text-neutral-500 opacity-60">
                  <FileText className="w-3.5 h-3.5 text-neutral-400" />
                  <span>run.log</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      q: 'Why are mods invisible in-game or characters missing?',
      a: (
        <div className="space-y-2 text-xs sm:text-sm text-neutral-300">
          <p>
            Always verify that in-game <strong>Graphics Quality is set to HIGH</strong>. On Medium or Low, the game engine bypasses custom Spine mesh texture passes and defaults to fallback low-res LODs, causing mods to become invisible or glitch out.
          </p>
        </div>
      )
    },
    {
      q: 'PMA vs Straight Alpha: Why does my mod have black outline halos?',
      a: (
        <div className="space-y-3 text-xs sm:text-sm text-neutral-300">
          <p>
            Nikke Unity textures are stored in <strong>Pre-Multiplied Alpha (PMA)</strong> format. If you paint soft edges with an editor configured for Straight Alpha, the semi-transparent pixels turn into dark black fringes in the game.
          </p>
          <p className="text-neutral-400">
            <strong>Solution:</strong> Convert textures to Straight Alpha via WWE or Nikke-DB before editing. Turn OFF "Antialiasing" and "Selection Grow" in Paint.NET or Photoshop. When finished, convert back to PMA or flatten over original layer.
          </p>
        </div>
      )
    },
    {
      q: 'Can I install Nikke and NMM on an external USB drive?',
      a: (
        <div className="space-y-2 text-xs sm:text-sm text-neutral-300">
          <p>
            Yes, but <strong>the USB drive must be formatted as NTFS</strong>. Windows FAT32 and exFAT file systems do not support symbolic links (symlinks), which NMM requires to hook mod files without overwriting the original client.
          </p>
        </div>
      )
    },
    {
      q: 'How do I make obstructive weapons or backpacks semi-transparent?',
      a: (
        <div className="space-y-2 text-xs sm:text-sm text-neutral-300">
          <p>
            Isolate the weapon object onto its own layer in Photoshop or Paint.NET. Add a Hue/Saturation adjustment with Saturation = 50 and Lightness = -80 clipped to the weapon layer, then lower the layer opacity to 10%~25% and flatten before repacking.
          </p>
        </div>
      )
    }
  ];

  return (
    <section id="diagnostics" className="py-24 border-t border-white/[0.08] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* header */}
      <div className="space-y-4 max-w-3xl">
        <p className="text-xs font-sans font-medium tracking-wider text-neutral-400 uppercase flex items-center gap-2">
          <span className="text-white font-bold">[ 06 ]</span>
          <span>Troubleshooting & FAQ</span>
          <SectionAnchor id="diagnostics" label="troubleshooting" />
        </p>

        <BlurRevealTitle
          as="h2"
          className="font-sans font-bold text-3xl sm:text-5xl text-white tracking-tight leading-[1.1]"
        >
          Straight fixes.<br />
          <span className="text-neutral-400">Common problems.</span>
        </BlurRevealTitle>

        <p className="text-neutral-400 text-base sm:text-lg leading-relaxed font-sans">
          Quick solutions for pink missing textures (repack),<br></br> 43% loading screen freezes, black borders, and drive setup errors.
        </p>
      </div>

      {/* faq list */}
      <div className="epic-card p-4 sm:p-6 divide-y divide-white/[0.06]">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="py-5 first:pt-2 last:pb-2">
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between text-left gap-4 group cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-neutral-500 font-mono text-xs sm:text-sm font-semibold shrink-0">
                    {idx + 1}.
                  </span>
                  <span className="font-sans font-bold text-base sm:text-lg text-white group-hover:text-neutral-200 tracking-tight">
                    {faq.q}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-neutral-400 group-hover:text-white transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 text-white' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="pt-4 pr-6 sm:pl-7 animate-fade-in font-sans">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
};

