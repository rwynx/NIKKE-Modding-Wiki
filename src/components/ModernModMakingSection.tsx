import React, { useState } from 'react';
import { SectionAnchor } from './SectionAnchor';
import { BlurRevealTitle } from './BlurRevealTitle';
import { 
  FolderDown, 
  Layers, 
  Binary, 
  ExternalLink, 
  Sparkles, 
  AlertCircle, 
  Palette, 
  CheckCircle2,
  FileCode2,
  DollarSign,
  Download,
  Eye,
  PlayCircle,
  FileEdit,
  PackageCheck,
  Archive,
  ArrowRight,
  Sliders,
  Wrench,
  HelpCircle
} from 'lucide-react';

interface ModernModMakingSectionProps {
  onOpenWorkbench: (videoId?: string) => void;
}

export const ModernModMakingSection: React.FC<ModernModMakingSectionProps> = ({ onOpenWorkbench }) => {
  const [activeTab, setActiveTab] = useState<'manual' | 'auto'>('manual');

  const tools = [
    {
      id: 'tool-spine-pro',
      name: 'Spine Pro',
      category: '2D SKELETAL ANIMATION',
      priceTag: '$369 Paid Tool',
      isPaid: true,
      description: 'The official 2D skeletal animation software by Esoteric Software used by Shift Up. Required for modifying bone hierarchies, rigging new meshes, and making "custom" combat/lobby animations, like changing the movement or adding a new element.',
      url: 'http://esotericsoftware.com/',
      buttonLabel: 'Visit Spine Website'
    },
    {
      id: 'tool-photoshop',
      name: 'Adobe Photoshop',
      category: 'IMAGE & TEXTURE EDITING',
      priceTag: 'Paid Subscription',
      isPaid: true,
      description: 'Industry-standard raster graphics editor. Used by modders for complex layered sprite preparation, PSD export scripts for Spine Pro, and advanced texture masks.',
      url: 'https://www.adobe.com/products/photoshop.html',
      buttonLabel: 'Visit Adobe Website'
    },
    {
      id: 'tool-photocraft',
      name: 'PhotoCraft',
      category: 'OPEN-SOURCE PS CLONE',
      priceTag: 'Free & Open Source',
      isPaid: false,
      description: 'Modern open-source raster graphics editor inspired by Photoshop. Familiar canvas layout, layer manipulation, and zero-subscription offline workflow.',
      url: 'https://github.com/storytold/photocraft',
      buttonLabel: 'Visit GitHub Repo'
    },
    {
      id: 'tool-photopea',
      name: 'Photopea',
      category: 'FREE WEB PHOTOSHOP',
      priceTag: 'Free / Web App',
      isPaid: false,
      description: 'Zero-install, browser-based Photoshop alternative supporting layered .psd files, smart masks, pen tools, and identical hotkeys right in your browser.',
      url: 'https://www.photopea.com/',
      buttonLabel: 'Launch Photopea (Web)'
    },
    {
      id: 'tool-paint-net',
      name: 'Paint.NET',
      category: 'PNG & TEXTURE EDITING',
      priceTag: '100% Free',
      isPaid: false,
      description: 'Lightweight, ultra-fast Windows image editor. Ideal for Nikke texture edits, skin recolors, and resizing texture maps while preserving clean alpha transparency channels.',
      url: 'https://www.getpaint.net/',
      buttonLabel: 'Download Paint.NET'
    },
    {
      id: 'tool-gimp',
      name: 'GIMP',
      category: 'PNG & TEXTURE EDITING',
      priceTag: 'Free & Open Source',
      isPaid: false,
      description: 'Full-featured free GNU image manipulation program. Great alternative to Photoshop for layered texture editing, mask generation, and custom asset art.',
      url: 'https://www.gimp.org/',
      buttonLabel: 'Download GIMP'
    },
    {
      id: 'tool-asset-studio',
      name: 'Asset Studio (Aelurum Fork)',
      category: 'ASSET EXPLORER & EXTRACTOR',
      priceTag: 'Free Utility',
      isPaid: false,
      description: 'Essential tool for viewing and extracting TextAsset (Spine .skel, .atlas) and Texture2D (.png) files from raw Unity bundles with zero decryption steps required.',
      url: 'https://github.com/aelurum/AssetStudio/releases',
      buttonLabel: 'Get Asset Studio'
    },
    {
      id: 'tool-uabea',
      name: 'UABEA Modded',
      category: 'CONTAINER & HEX INJECTION',
      priceTag: 'Free Utility',
      isPaid: false,
      description: 'Unity Asset Bundle Extractor with Avalonia UI. Used to inject edited textures/spine text files back into bundle containers, perform hex edits, and LZ4 compression.',
      url: '/downloads/UABEA-Modded.7z',
      buttonLabel: 'Download UABEA (7z)',
      isDownload: true
    },
    {
      id: 'tool-nma',
      name: 'Nikke Modding Assistant (NMA)',
      category: '1-CLICK AUTOMATION SUITE',
      priceTag: 'Free / MEGA',
      isPaid: false,
      description: 'Formerly known as Nix Multitool. Automates bundle extraction, skin swapping, texture replacement, and repackaging without touching UABEA manually.',
      url: 'https://mega.nz/folder/KsdjEB4Q#HG-5KEPIOO6MeL33N_BlhQ/folder/q4snTJCT',
      buttonLabel: 'Download NMA (MEGA)'
    }
  ];

  const manualSteps = [
    {
      step: '01',
      title: 'Download Target Vanilla File',
      tag: 'SOURCE RETRIEVAL',
      icon: FolderDown,
      color: 'from-blue-500/20 to-cyan-500/20 border-cyan-500/30 text-cyan-400',
      description: (
        <div className="space-y-2 text-xs sm:text-[13px] text-neutral-300 leading-relaxed font-sans">
          <p>
            Download the vanilla game file/bundle you want to edit. Currently, the most convenient and reliable method is using <a href="#nmm-suite" className="text-white hover:text-cyan-300 underline underline-offset-2 decoration-white/30 hover:decoration-cyan-300 transition-colors font-semibold">Chizuru NMM</a>.
          </p>
          <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-neutral-400 space-y-1">
            <div className="text-neutral-200 font-semibold text-xs flex items-center gap-1.5">
              <span>Quick Path in Chizuru NMM:</span>
            </div>
            <p className="text-[12px]">
              Navigate to the <span className="text-cyan-300 font-medium">Resource Extraction</span> tab → search and select the character or UI asset you need → click <span className="text-cyan-300 font-medium">Download</span>.
            </p>
          </div>
          <p className="text-[11px] text-neutral-400">
            ✓ No manual game directory searches or legacy decryption keys needed.
          </p>
        </div>
      )
    },
    {
      step: '02',
      title: 'Extract Assets with Asset Studio',
      tag: 'BUNDLE DEPACKING',
      icon: Layers,
      color: 'from-purple-500/20 to-indigo-500/20 border-indigo-500/30 text-indigo-400',
      description: (
        <div className="space-y-2 text-xs sm:text-[13px] text-neutral-300 leading-relaxed font-sans">
          <p>
            Launch <a href="#tool-asset-studio" className="text-white hover:text-indigo-300 underline underline-offset-2 decoration-white/30 hover:decoration-indigo-300 transition-colors font-semibold">Asset Studio</a> (Aelurum Fork recommended) and drag the downloaded vanilla bundle into the program window.
          </p>
          <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-neutral-400 space-y-1">
            <div className="text-neutral-200 font-semibold text-xs flex items-center gap-1.5">
              <span>Export Command:</span>
            </div>
            <p className="text-[12px]">
              In the top menu bar, select <code className="text-indigo-300 font-mono">Export &gt; All assets</code>, then choose the folder destination where you want to unpack them.
            </p>
          </div>
          <p className="text-[11px] text-neutral-400">
            ✓ Exports textures (<code className="text-neutral-300">.png</code>) and Spine data (<code className="text-neutral-300">.atlas</code>, <code className="text-neutral-300">.skel</code>).
          </p>
        </div>
      )
    },
    {
      step: '03',
      title: 'Edit Textures & Spine Data',
      tag: 'CONTENT MODIFICATION',
      icon: FileEdit,
      color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400',
      description: (
        <div className="space-y-2.5 text-xs sm:text-[13px] text-neutral-300 leading-relaxed font-sans">
          <p>
            Depending on what you want to modify, use the appropriate editor:
          </p>
          <ul className="space-y-1.5 text-neutral-400 text-xs">
            <li className="flex items-start gap-1.5">
              <span className="text-amber-400 font-bold">•</span>
              <span><strong className="text-white">Textures (.png):</strong> Edit in any image software like <a href="#tool-photoshop" className="text-neutral-200 hover:text-amber-300 underline underline-offset-2 decoration-white/30 hover:decoration-amber-300 transition-colors">Adobe Photoshop</a>, or free PS alternatives such as <a href="#tool-photopea" className="text-neutral-200 hover:text-amber-300 underline underline-offset-2 decoration-white/30 hover:decoration-amber-300 transition-colors">Photopea</a> / <a href="#tool-paint-net" className="text-neutral-200 hover:text-amber-300 underline underline-offset-2 decoration-white/30 hover:decoration-amber-300 transition-colors">Paint.NET</a> / <a href="#tool-photocraft" className="text-neutral-200 hover:text-amber-300 underline underline-offset-2 decoration-white/30 hover:decoration-amber-300 transition-colors">PhotoCraft</a> / <a href="#tool-gimp" className="text-neutral-200 hover:text-amber-300 underline underline-offset-2 decoration-white/30 hover:decoration-amber-300 transition-colors">GIMP</a>). Retain alpha transparency.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-amber-400 font-bold">•</span>
              <span><strong className="text-white">Atlas (.atlas):</strong> Text file describing sprite coordinates. Can be opened and modified directly in <strong className="text-neutral-200">Notepad</strong> or VS Code.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-amber-400 font-bold">•</span>
              <span><strong className="text-white">Skel (.skel):</strong> Binary spine skeleton. Needs to be converted to <code className="text-neutral-300">.json</code> if you plan to edit it manually in a text editor.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-amber-400 font-bold">•</span>
              <span><strong className="text-white">Spine Pro Alternative:</strong> You can import the entire unpacked folder directly into <a href="#tool-spine-pro" className="text-neutral-200 hover:text-amber-300 underline underline-offset-2 decoration-white/30 hover:decoration-amber-300 transition-colors">Spine Pro</a> for visual bone, mesh, and animation adjustments.</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      step: '04',
      title: 'Packing the Files (UABEA)',
      tag: 'CONTAINER INJECTION',
      icon: PackageCheck,
      color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400',
      description: (
        <div className="space-y-2 text-xs sm:text-[13px] text-neutral-300 leading-relaxed font-sans">
          <p>
            Locate the vanilla bundle file you downloaded in Step 1 (the container you want to inject your mod into) and open it in <a href="#tool-uabea" className="text-white hover:text-emerald-300 underline underline-offset-2 decoration-white/30 hover:decoration-emerald-300 transition-colors font-semibold">UABEA Modded</a>.
          </p>
          <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-neutral-400 space-y-1.5">
            <p className="text-[12px]">
              Find the target <span className="text-emerald-300 font-medium">Texture2D</span> or <span className="text-emerald-300 font-medium">TextAsset</span> entries and click <span className="text-white font-semibold">Plugins</span>:
            </p>
            <ul className="text-[11px] space-y-1 pl-2 border-l border-emerald-500/30">
              <li>• For texture files: Choose <code className="text-emerald-300">Edit texture &gt; Load</code> and pick your edited PNG.</li>
              <li>• For text/atlas files: Choose <code className="text-emerald-300">Import</code> and select your edited file.</li>
            </ul>
          </div>
          <p className="text-[11px] text-neutral-400">
            ✓ Optional: Perform manual HEX edits or adjustments to <code className="text-neutral-300">Sprite</code> / <code className="text-neutral-300">SoundEffects</code> if needed. Save changes in UABEA.
          </p>
        </div>
      )
    },
    {
      step: '05',
      title: 'Compressing with LZ4',
      tag: 'MANDATORY COMPRESSION',
      icon: Archive,
      color: 'from-rose-500/20 to-pink-500/20 border-rose-500/30 text-rose-400',
      description: (
        <div className="space-y-2 text-xs sm:text-[13px] text-neutral-300 leading-relaxed font-sans">
          <p>
            Drag the modified bundle file back into <a href="#tool-uabea" className="text-white hover:text-rose-300 underline underline-offset-2 decoration-white/30 hover:decoration-rose-300 transition-colors font-semibold">UABEA</a> to apply proper Unity compression.
          </p>
          <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-neutral-400 space-y-1">
            <div className="text-neutral-200 font-semibold text-xs flex items-center gap-1.5">
              <span>Compression Setting:</span>
            </div>
            <p className="text-[12px]">
              Select <span className="text-white font-semibold">File &gt; Compress</span> (or use the Compression prompt), choose <span className="text-rose-400 font-bold font-mono">LZ4</span>, and save your final bundle.
            </p>
          </div>
          <p className="text-[11px] text-rose-300/80">
            ⚠️ <strong>Important:</strong> Nikke requires LZ4. Uncompressed or LZMA bundles will cause black screens or infinite loading.
          </p>
        </div>
      )
    },
    {
      step: '06',
      title: 'Deploy & Enjoy!',
      tag: 'GAME READY',
      icon: CheckCircle2,
      color: 'from-[rgb(95,227,103)]/20 to-emerald-500/20 border-[rgb(95,227,103)]/30 text-[rgb(95,227,103)]',
      description: (
        <div className="space-y-2 text-xs sm:text-[13px] text-neutral-300 leading-relaxed font-sans">
          <p>
            Your mod is ready. Load it directly using <a href="#nmm-suite" className="text-white hover:text-[rgb(95,227,103)] underline underline-offset-2 decoration-white/30 hover:decoration-[rgb(95,227,103)] transition-colors font-semibold">Chizuru NMM</a> or place it in your mod repository folder.
          </p>
          <div className="p-2.5 rounded-lg bg-[rgb(95,227,103)]/[0.05] border border-[rgb(95,227,103)]/[0.2] text-neutral-300 space-y-1">
            <p className="text-[12px]">
              Launch NIKKE or check how it looks in Chizuru's built-in <strong className="text-white">Spine Viewer</strong> first.
            </p>
          </div>
          <p className="text-[11px] text-neutral-400">
            🎉  Congrats, you just made your first mod.
          </p>
        </div>
      )
    }
  ];

  return (
    <section id="mod-making" className="max-w-[1060px] mx-auto px-4 sm:px-6 py-16 sm:py-24 space-y-12 sm:space-y-14">
      
      {/* header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-sans font-bold px-2.5 py-0.5 rounded-full bg-white/[0.08] text-white border border-white/[0.12] tracking-wider uppercase">
            [ 03 ] MOD CREATION
          </span>
          <SectionAnchor id="mod-making" label="mod-making" />
        </div>

        <BlurRevealTitle
          as="h2"
          className="font-sans font-bold text-3xl sm:text-5xl text-white tracking-tight leading-[1.1]"
        >
          Making Your Own Mods. <br />
          <span className="text-neutral-400">Modern creation flows & toolset.</span>
        </BlurRevealTitle>

        <p className="text-sm sm:text-base text-neutral-400 max-w-3xl leading-relaxed font-sans">
          Modern NIKKE modding is significantly simpler than in previous years. Because game bundles are no longer encrypted in recent patches, legacy tools like NAU are obsolete. Choose between the step-by-step manual flow or faster & automated modding below.
        </p>
      </div>

      {/* mode toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] w-fit">
          <button
            onClick={() => setActiveTab('manual')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'manual'
                ? 'bg-white text-black shadow-md'
                : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Fully Manual (6 Steps)</span>
          </button>

          <button
            onClick={() => setActiveTab('auto')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'auto'
                ? 'bg-gradient-to-r from-[rgb(95,227,103)] to-emerald-400 text-black shadow-md'
                : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>With NMA</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-black/20 font-bold uppercase">Fast</span>
          </button>
        </div>

        <a
          href="#recommended-tools"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono text-neutral-400 hover:text-white bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.08] transition-all cursor-pointer"
        >
          <Wrench className="w-3.5 h-3.5 text-[rgb(160,225,255)]" />
          <span>Jump to Required Tools ↓</span>
        </a>
      </div>

      {/* manual pipeline */}
      {activeTab === 'manual' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div>
              <h3 className="font-sans font-bold text-lg text-white tracking-tight flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>6-Step Manual Modding Process</span>
              </h3>
              <p className="text-xs text-neutral-400 font-sans mt-0.5">
                Compiled by <span className="text-white px-0.5">Nix.</span> Complete walkthrough from raw bundle extraction to UABEA repack and LZ4 compression. 
              </p>
            </div>
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08]">
              Standard Unity Workflow
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {manualSteps.map((item) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={item.step}
                  className="epic-card p-6 flex flex-col justify-between space-y-4 border-white/[0.1] hover:border-white/[0.2] transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} border flex items-center justify-center shrink-0`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="text-xl font-mono font-extrabold text-neutral-300 group-hover:text-white transition-colors">
                        {item.step}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono tracking-wider text-neutral-400 uppercase">
                        {item.tag}
                      </span>
                      <h4 className="font-sans font-bold text-base text-white tracking-tight">
                        {item.title}
                      </h4>
                    </div>

                    {item.description}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* nma pipeline */}
      {activeTab === 'auto' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div>
              <h3 className="font-sans font-bold text-lg text-white tracking-tight flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[rgb(95,227,103)]" />
                <span>Faster - Automated Process</span>
              </h3>
              <p className="text-xs text-neutral-400 font-sans mt-0.5">
                Nikke Modding Assistant (NMA / former Nix Multitool) quick swap and repacker.
              </p>
            </div>
            <span className="text-[10px] font-mono text-[rgb(95,227,103)] uppercase tracking-wider px-2 py-0.5 rounded bg-[rgb(95,227,103)]/10 border border-[rgb(95,227,103)]/25">
              Automated Workflow
            </span>
          </div>

          <div className="epic-card p-6 sm:p-8 border-white/[0.1] bg-white/[0.02] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
              <div className="space-y-1">
                <h4 className="font-sans font-bold text-xl text-white tracking-tight">
                  Nikke Modding Assistant (NMA)
                </h4>
                <p className="text-xs sm:text-[13px] text-neutral-300 font-sans leading-relaxed max-w-2xl">
                  Eliminates manual repacking & asset extraction, and LZ4 compression. Perfect for swift skin swaps and quick packaging.
                </p>
              </div>

              <a
                href="https://mega.nz/folder/KsdjEB4Q#HG-5KEPIOO6MeL33N_BlhQ/folder/q4snTJCT"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-semibold text-xs sm:text-sm tracking-tight transition-all shadow-md flex items-center gap-2 shrink-0 self-start sm:self-center cursor-pointer"
              >
                <Download className="w-4 h-4 text-black" />
                <span>Download NMA (MEGA) →</span>
              </a>
            </div>

            {/* NMA 3-Step Flow */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Step 01</span>
                  <Download className="w-4 h-4 text-cyan-400" />
                </div>
                <h4 className="font-sans font-bold text-sm text-white">Download NMA</h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  Download the latest version of NMA (Nikke Modding Assistant) from the MEGA and extract it to a dedicated modding directory.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2.5 flex flex-col justify-between group/step2 hover:border-amber-500/30 transition-all">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Step 02</span>
                    <FileCode2 className="w-4 h-4 text-amber-400" />
                  </div>
                  <h4 className="font-sans font-bold text-sm text-white">Read Instructions / Watch Video</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                    Read the built-in quickstart guide or watch <strong className="text-neutral-200">Nix's official NMA tutorial video</strong> explaining NMA's interface, automatic swapper, and repacker tabs.
                  </p>
                </div>
                <button
                  onClick={() => onOpenWorkbench('nma-tutorial')}
                  className="w-full py-1.5 px-3 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/25 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <PlayCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Watch Nix's Video in Video Lab →</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Step 03</span>
                  <CheckCircle2 className="w-4 h-4 text-[rgb(95,227,103)]" />
                </div>
                <h4 className="font-sans font-bold text-sm text-white">Quick Swap & Repack</h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  Select your source and target characters or load modified textures. NMA handles all Unity bundle compilation, header updates, and LZ4 compression automatically.
                </p>
              </div>
            </div>

             {/* footer section of NMA guide, not really needed(?) i might activate it back latwr
            
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-neutral-400 border-t border-white/[0.06]">
              <span>💡 Need automated texture pink glitch fixes? NMA rebuilds broken mods against updated game catalogs.</span>
              <button
                onClick={() => onOpenWorkbench()}
                className="text-white hover:text-[rgb(160,225,255)] font-semibold inline-flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Browse Video Lab Guides</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div> */}
          </div>
        </div>
      )}

      {/* seireiko spine */}
      <div className="relative rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-[#171b29] via-[#12141f] to-[#0f1118] border border-[rgb(160,225,255)]/[0.25] shadow-xl overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[rgb(160,225,255)]/[0.1] text-[rgb(160,225,255)] text-[11px] font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FEATURED • SPINE VIDEO GUIDE</span>
          </div>
          <h3 className="font-sans font-extrabold text-2xl text-white tracking-tight">
            3-Part Spine Video Guide by Seireiko (Requires Spine)
          </h3>
          <p className="text-sm text-neutral-300 font-sans leading-relaxed">
            This is Seireiko's cat girl mod for Rapi: Red Hood. Hands-on Spine walkthrough across 3 parts: Part 1 covers asset importing, body part generation, and Photoshop prep; Part 2 covers cat ears bone/mesh edits; Part 3 covers tail rigging and animation checks.
          </p>
        </div>

        <button
          onClick={() => onOpenWorkbench('seireiko-part1')}
          className="px-5 py-3 rounded-xl bg-white hover:bg-neutral-200 text-black font-semibold text-xs sm:text-sm tracking-tight transition-all shadow-md flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <PlayCircle className="w-4 h-4 text-black" />
          <span>Launch Video Lab →</span>
        </button>
      </div>

      {/* tools */}
      <div id="recommended-tools" className="space-y-6 scroll-mt-24">
        <div className="border-b border-white/[0.08] pb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="font-sans font-bold text-lg text-white tracking-tight flex items-center gap-2">
              <Palette className="w-4 h-4 text-white" />
              Recommended Tools for Mod Making
            </h3>
            <p className="text-xs text-neutral-400 font-sans mt-0.5">
              The essential software suite for 2D character rigging and PNG texture modifications.
            </p>
          </div>
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08]">
            Software Suite
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <div 
              key={tool.name} 
              id={tool.id}
              className={`epic-card p-5 flex flex-col justify-between space-y-4 transition-all duration-200 group hover:border-white/[0.2] scroll-mt-24 ${
                tool.isPaid ? 'border-amber-500/20 bg-amber-500/[0.02]' : ''
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono tracking-wider text-neutral-400 uppercase">
                    {tool.category}
                  </span>
                  <span className={`text-[10px] font-sans font-bold px-2 py-0.5 rounded-full border ${
                    tool.isPaid 
                      ? 'bg-amber-500/10 text-amber-300 border-amber-500/30' 
                      : 'bg-white/[0.06] text-neutral-300 border-white/[0.1]'
                  }`}>
                    {tool.priceTag}
                  </span>
                </div>

                <h4 className="font-sans font-bold text-base text-white tracking-tight flex items-center gap-1.5">
                  {tool.name}
                  {tool.isPaid && <DollarSign className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                </h4>

                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  {tool.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.06]">
                <a
                  href={tool.url}
                  target={tool.isDownload ? undefined : '_blank'}
                  rel={tool.isDownload ? undefined : 'noopener noreferrer'}
                  download={tool.isDownload}
                  className="btn-liquid-chroma w-full text-center"
                >
                  <span className="btn-liquid-chroma-inner w-full py-1.5 px-3 flex items-center justify-center gap-1.5 text-xs">
                    {tool.isDownload ? <Download className="w-3 h-3 text-white" /> : <ExternalLink className="w-3 h-3 text-white" />}
                    <span>{tool.buttonLabel}</span>
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* pma tip */}
      <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex items-start gap-3.5 text-xs text-neutral-300 font-sans">
        <div className="p-2 rounded-xl bg-white/[0.06] border border-white/[0.1] shrink-0 text-white">
          <AlertCircle className="w-4 h-4 text-white" />
        </div>
        <div className="space-y-1">
          <span className="font-bold text-white block">Important Note on Premultiplied Alpha (PMA):</span>
          <p className="text-neutral-400 leading-relaxed">
            Spine in Unity uses Premultiplied Alpha blending. When saving modified character PNG textures in Photoshop, GIMP, or Paint.NET, ensure your canvas doesn't introduce un-premultiplied dark or white fringes around transparent borders.
          </p>
        </div>
      </div>

    </section>
  );
};
