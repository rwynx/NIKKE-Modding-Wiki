import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '..', 'dist');
const publicDir = path.resolve(__dirname, '..', 'public');

if (!fs.existsSync(distDir)) {
  console.error('Dist directory does not exist. Run "vite build" first.');
  process.exit(1);
}

const templatePath = path.join(distDir, 'index.html');
const baseHtml = fs.readFileSync(templatePath, 'utf-8');

const BASE_URL = 'https://nikkemodding.rwyn.app';

// date
const today = new Date().toISOString().split('T')[0];

const routes = [
  {
    slug: '',
    title: 'NIKKE Modding Wiki • Community Guides, Tools & Database',
    description: 'The primary community hub for Goddess of Victory: NIKKE modding. Modern PC managers (Chizuru NMM, Danieru NMM, Na0h NMM), Android SkinnyMan ModDock, installation guides, and error fixes.',
    canonical: `${BASE_URL}/`,
    priority: '1.0',
    changefreq: 'daily',
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": `${BASE_URL}/#website`,
          "url": `${BASE_URL}/`,
          "name": "NIKKE Modding Wiki",
          "alternateName": ["NIKKE Modding", "RWX NIKKE Modding Wiki"],
          "description": "Primary community hub hosting up-to-date NIKKE mod managers, guides, and tutorials for Goddess of Victory: NIKKE.",
          "inLanguage": "en"
        },
        {
          "@type": "CollectionPage",
          "@id": `${BASE_URL}/#webpage`,
          "url": `${BASE_URL}/`,
          "name": "NIKKE Modding Wiki • Community Guides & Tutorials",
          "isPartOf": { "@id": `${BASE_URL}/#website` },
          "description": "The primary community hub hosting up-to-date NIKKE mod managers (PC: Chizuru NMM, Danieru NMM, na0h NMM; Mobile: SkinnyMan ModDock), guides, character c-codes, and troubleshooting fixes, backed by the largest NIKKE community (discord.gg/nikke).",
          "inLanguage": "en"
        }
      ]
    },
    prerenderHtml: `
      <div class="ssg-content max-w-5xl mx-auto px-4 py-16 space-y-12">
        <header class="space-y-4">
          <div class="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-semibold tracking-wide">
            COMMUNITY WIKI • DISCORD.GG/NIKKE (110K+ MEMBERS)
          </div>
          <h1 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">NIKKE Modding Wiki</h1>
          <p class="text-base sm:text-lg text-neutral-300">The primary, independent community hub for Goddess of Victory: NIKKE mod managers, step-by-step installation guides, mod creation tutorials, character database, and error troubleshooting.</p>
        </header>

        <!-- Direct Answers & High-Intent Featured Snippet Box -->
        <section class="p-6 sm:p-8 rounded-2xl bg-[#12141e] border border-blue-500/30 shadow-2xl space-y-6">
          <h2 class="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span class="text-blue-400">⚡</span> Quick Answers: What You Need to Know First
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div class="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1.5">
              <h3 class="font-bold text-emerald-300">Is NIKKE modding safe? Will I get banned?</h3>
              <p class="text-neutral-300 text-xs sm:text-sm">NIKKE mods documented here are strictly <strong>client-side cosmetic skin replacements</strong> (character models, costumes, audio). They do not hook into memory, alter game stats, or affect network packets. To date, cosmetic skin modding with NMM has zero reported bans.</p>
            </div>
            <div class="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1.5">
              <h3 class="font-bold text-amber-300">Looking for GameBanana Mod Manager v0.21?</h3>
              <p class="text-neutral-300 text-xs sm:text-sm">The ancient v0.21 release on GameBanana is <strong>permanently obsolete and unmaintained</strong>. It cannot read modern Unity Addressables and will crash your game. Always use modern community tools like Chizuru NMM or SkinnyMan ModDock.</p>
            </div>
            <div class="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1.5">
              <h3 class="font-bold text-cyan-300">Can I mod NIKKE on Android / Mobile?</h3>
              <p class="text-neutral-300 text-xs sm:text-sm"><strong>Yes!</strong> Android modding is powered by <strong>SkinnyMan ModDock</strong>. Using Shizuku via wireless ADB, ModDock injects mods directly on your device <strong>without requiring root access</strong>.</p>
            </div>
            <div class="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1.5">
              <h3 class="font-bold text-pink-300">Stuck on 43% (4/7) Loading Screen?</h3>
              <p class="text-neutral-300 text-xs sm:text-sm">Delete cached files in <code>%USERPROFILE%\\AppData\\LocalLow\\com_proximabeta\\NIKKE\\com.shiftup.addressables</code>, run "Repair" in the launcher, and delete <code>UnityCrashHandler64.exe</code> in the game folder.</p>
            </div>
          </div>
        </section>

        <section class="space-y-4">
          <h2 class="text-2xl font-bold text-white">NMM Tools (Mod Managers)</h2>
          <p class="text-neutral-300">Compare community mod managers built for modern Unity addressables: Chizuru NMM (automated repacking, asset hash sync, GUI), Danieru NMM, na0h NMM, and SkinnyMan ModDock (dedicated Android mod dock via Shizuku).</p>
          <a href="/nmm-suite/" class="inline-block text-blue-400 hover:underline font-semibold">Explore NMM Tools &rarr;</a>
        </section>

        <section class="space-y-4">
          <h2 class="text-2xl font-bold text-white">How to Install Mods (PC &amp; Android)</h2>
          <p class="text-neutral-300">Complete step-by-step tutorial on installing character skins, burst cutscenes, and costume mods safely on both PC and mobile devices.</p>
          <a href="/installing-mods/" class="inline-block text-blue-400 hover:underline font-semibold">Read Installation Guide &rarr;</a>
        </section>

        <section class="space-y-4">
          <h2 class="text-2xl font-bold text-white">Mod Creation &amp; Workflows</h2>
          <p class="text-neutral-300">Modern asset swapping with Nikke Modding Assistant (NMA) and manual toolchains: AssetStudio, UABEA, Spine Pro 4.1, Pre-Multiplied Alpha (PMA) texture pipelines.</p>
          <a href="/mod-making/" class="inline-block text-blue-400 hover:underline font-semibold">Learn Mod Creation &rarr;</a>
        </section>

        <section class="space-y-4">
          <h2 class="text-2xl font-bold text-white">Character Database &amp; c-codes</h2>
          <p class="text-neutral-300">Registry of NIKKE character internal asset identifiers (c-codes like c010 Rapi, c070 Modernia, c100 Dorothy), costumes, and weapon categories.</p>
          <a href="/characters/" class="inline-block text-blue-400 hover:underline font-semibold">Search Character &amp; Skin IDs &rarr;</a>
        </section>

        <section class="space-y-4">
          <h2 class="text-2xl font-bold text-white">Troubleshooting &amp; Fixes</h2>
          <p class="text-neutral-300">Fix the 43% (4/7) loading screen stuck bug, pink/magenta textures with automated repacking, game_addressables_dir_missing, and black outline PMA halos.</p>
          <a href="/diagnostics/" class="inline-block text-blue-400 hover:underline font-semibold">View Troubleshooting Solutions &rarr;</a>
        </section>
      </div>
    `
  },
  {
    slug: 'nmm-suite',
    title: 'NIKKE Mod Managers: Chizuru, Danieru, na0h & SkinnyMan ModDock • NIKKE Modding Wiki',
    description: 'Compare and download working NIKKE Mod Managers: Chizuru NMM (auto-repack), Danieru, na0h for PC, and SkinnyMan ModDock for Android. Beware: obsolete GameBanana v0.21 builds no longer function.',
    canonical: `${BASE_URL}/nmm-suite/`,
    priority: '0.95',
    changefreq: 'weekly',
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${BASE_URL}/nmm-suite/#webpage`,
          "url": `${BASE_URL}/nmm-suite/`,
          "name": "NIKKE Mod Managers: Chizuru NMM, Danieru NMM, na0h NMM & SkinnyMan ModDock",
          "description": "Comparison and download hub for community NIKKE mod managers built for modern Unity addressables.",
          "isPartOf": { "@id": `${BASE_URL}/#website` }
        },
        {
          "@type": "ItemList",
          "@id": `${BASE_URL}/nmm-suite/#tools`,
          "name": "NIKKE Mod Managers & Docks",
          "itemListElement": [
            {
              "@type": "SoftwareApplication",
              "position": 1,
              "name": "Chizuru NMM",
              "operatingSystem": "Windows 10, Windows 11",
              "applicationCategory": "GameModTool",
              "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
              "description": "Recommended feature-rich PC NIKKE Mod Manager with automated repacking, hash sync, and Live2D preview."
            },
            {
              "@type": "SoftwareApplication",
              "position": 2,
              "name": "SkinnyMan ModDock",
              "operatingSystem": "Android",
              "applicationCategory": "GameModTool",
              "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
              "description": "Dedicated Android/mobile NIKKE mod dock enabling mods on mobile without root access using Shizuku."
            },
            {
              "@type": "SoftwareApplication",
              "position": 3,
              "name": "Danieru NMM",
              "operatingSystem": "Windows",
              "applicationCategory": "GameModTool",
              "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
              "description": "Alternative community Nikke mod manager for PC by Danieru."
            },
            {
              "@type": "SoftwareApplication",
              "position": 4,
              "name": "na0h NMM",
              "operatingSystem": "Windows",
              "applicationCategory": "GameModTool",
              "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
              "description": "Classic community Nikke mod manager for PC by na0h."
            }
          ]
        }
      ]
    },
    prerenderHtml: `
      <article class="ssg-content max-w-5xl mx-auto px-4 py-16 space-y-10">
        <header class="space-y-3">
          <span class="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold">[01] MOD MANAGERS &amp; DOCKS</span>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">NIKKE Mod Managers &amp; Docks: Complete Comparison</h1>
          <p class="text-neutral-300">Modern Goddess of Victory: NIKKE mod managers designed for automated addressables catalog synchronization, symlink mod swapping, and seamless updates.</p>
        </header>

        <!-- Tool Selection Matrix Box -->
        <div class="p-6 rounded-2xl bg-[#12141e] border border-blue-500/30 space-y-4">
          <h2 class="text-lg font-bold text-white flex items-center gap-2">
            <span class="text-blue-400">🎯</span> Which Tool Should You Choose?
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div class="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <div class="text-emerald-400 font-bold mb-1">🖥️ PC Players: Chizuru NMM (Recommended)</div>
              <p class="text-neutral-300">Best for 95% of PC players. Includes <strong>Automated Repacking</strong> (rebuilds broken mods after game patches in 1 click), asset hash verification, and Live2D spine preview.</p>
            </div>
            <div class="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <div class="text-amber-400 font-bold mb-1">📱 Android Players: SkinnyMan ModDock</div>
              <p class="text-neutral-300">The premier mobile solution. Enables full character and costume modding on Android devices <strong>without root</strong> by leveraging Shizuku and wireless ADB.</p>
            </div>
          </div>
        </div>

        <section class="space-y-4">
          <h2 class="text-2xl font-bold text-white">Chizuru NMM (PC • Recommended)</h2>
          <p class="text-neutral-300">The most widely used and actively maintained mod manager in the community. Features include:</p>
          <ul class="list-disc list-inside space-y-1.5 text-neutral-400 pl-2">
            <li><strong>Automated repacker:</strong> Rebuilds broken mods after game patches in one click</li>
            <li><strong>Addressable catalog hash sync:</strong> Prevents 43% loading screen errors</li>
            <li><strong>Live2D preview:</strong> Test animations and character motions before launching</li>
            <li><strong>Non-destructive symlinks:</strong> Keeps vanilla game files intact</li>
          </ul>
        </section>

        <section class="space-y-4">
          <h2 class="text-2xl font-bold text-white">SkinnyMan ModDock (Android / Mobile)</h2>
          <p class="text-neutral-300">SkinnyMan ModDock is the dedicated mobile runtime dock for NIKKE modding. Unlike PC managers that use Windows symlinks, ModDock operates inside Android's sandboxed storage environment:</p>
          <ul class="list-disc list-inside space-y-1.5 text-neutral-400 pl-2">
            <li><strong>No Root Required:</strong> Connects via Shizuku (wireless ADB) with full Knox &amp; Play Protect compatibility</li>
            <li><strong>Built-in Guide:</strong> Complete interactive walkthrough integrated directly into the APK</li>
            <li><strong>Phone Runtime Docking:</strong> Directly swaps costumes and cutscenes on mobile</li>
          </ul>
        </section>

        <section class="space-y-4">
          <h2 class="text-2xl font-bold text-white">Danieru NMM &amp; na0h NMM (PC Alternatives)</h2>
          <p class="text-neutral-300">Classic community alternatives for players who prefer lightweight command-driven tools or specific directory setups.</p>
        </section>

        <section class="p-6 rounded-2xl bg-red-500/10 border border-red-500/30 space-y-2">
          <h2 class="text-lg font-bold text-red-300">⚠️ Obsolete Notice: GameBanana NIKKE Mod Manager v0.21</h2>
          <p class="text-neutral-300 text-sm">Do not download the legacy v0.21 manager from GameBanana or outdated YouTube links. That software was abandoned in 2023, cannot communicate with current Shift Up catalog versions, and will cause critical loading crashes. Only use the tools hosted on NIKKE Modding Wiki.</p>
        </section>
      </article>
    `
  },
  {
    slug: 'installing-mods',
    title: 'How to Install NIKKE Mods (PC & Android) • Step-by-Step Guide • NIKKE Modding Wiki',
    description: 'Complete step-by-step guide to installing NIKKE character skins, cutscenes, and costume mods on PC (Chizuru NMM) and Android (SkinnyMan ModDock + Shizuku).',
    canonical: `${BASE_URL}/installing-mods/`,
    priority: '0.95',
    changefreq: 'weekly',
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${BASE_URL}/installing-mods/#webpage`,
          "url": `${BASE_URL}/installing-mods/`,
          "name": "How to Install NIKKE Mods (PC & Android)",
          "description": "Step-by-step tutorial on installing mods in Goddess of Victory: NIKKE.",
          "isPartOf": { "@id": `${BASE_URL}/#website` }
        },
        {
          "@type": "HowTo",
          "@id": `${BASE_URL}/installing-mods/#howto`,
          "name": "How to Install NIKKE Mods on PC with Chizuru NMM",
          "description": "5-step guide to installing character skins, burst cutscenes, and costume mods on PC.",
          "totalTime": "PT3M",
          "step": [
            {
              "@type": "HowToStep",
              "position": 1,
              "name": "Download and run Chizuru NMM",
              "text": "Download the latest Nikke Mod Manager and run NikkeModManager.exe as Administrator."
            },
            {
              "@type": "HowToStep",
              "position": 2,
              "name": "Sync game assets",
              "text": "If prompted to download and sync assets on first launch, click Yes to synchronize the catalog index."
            },
            {
              "@type": "HowToStep",
              "position": 3,
              "name": "Drop mods into mods folder",
              "text": "Place your downloaded mod folders directly into the NikkeModManager/mods/<ModName>/ directory."
            },
            {
              "@type": "HowToStep",
              "position": 4,
              "name": "Toggle mods enable / disable",
              "text": "Browse your mod list in the manager interface and tick the characters, skins, or cutscenes you want."
            },
            {
              "@type": "HowToStep",
              "position": 5,
              "name": "Click Apply & Play",
              "text": "Click the Apply button, launch Goddess of Victory: NIKKE through the official launcher, and enjoy."
            }
          ]
        }
      ]
    },
    prerenderHtml: `
      <article class="ssg-content max-w-5xl mx-auto px-4 py-16 space-y-10">
        <header class="space-y-3">
          <span class="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">[02] INSTALLATION TUTORIAL</span>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">How to Install NIKKE Mods: PC &amp; Android Walkthrough</h1>
          <p class="text-neutral-300">Step-by-step walkthrough for installing character models, costumes, audio replacements, and cutscene mods safely.</p>
        </header>

        <!-- Fast Steps Summary Banner -->
        <div class="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-blue-950/30 to-purple-950/40 border border-emerald-500/30 space-y-4">
          <h2 class="text-lg font-bold text-white flex items-center gap-2">
            <span class="text-emerald-400">⚡</span> Quick Summary: PC vs Android Installation
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div class="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1">
              <strong class="text-emerald-300 block">PC (3 Minutes):</strong>
              <p class="text-neutral-300">Run Chizuru NMM as Admin &rarr; Sync assets &rarr; Place mod in <code>mods/&lt;ModName&gt;/</code> &rarr; Check box &rarr; Click Apply &rarr; Set in-game Graphics to HIGH.</p>
            </div>
            <div class="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1">
              <strong class="text-amber-300 block">Android (No Root):</strong>
              <p class="text-neutral-300">Install Shizuku &rarr; Pair wireless debugging &rarr; Install SkinnyMan ModDock APK &rarr; Authorize Shizuku &rarr; Follow the in-app guide to inject mods.</p>
            </div>
          </div>
        </div>

        <section class="space-y-6">
          <h2 class="text-2xl font-bold text-white">PC Installation (Detailed Walkthrough)</h2>
          <div class="space-y-4">
            <div class="p-5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1.5">
              <h3 class="text-lg font-bold text-white">Step 1: Download &amp; Extract Chizuru NMM</h3>
              <p class="text-neutral-300 text-sm">Extract into a dedicated folder like <code>C:\\Games\\NikkeModManager</code>. Always launch <code>NikkeModManager.exe</code> as Administrator.</p>
            </div>
            <div class="p-5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1.5">
              <h3 class="text-lg font-bold text-white">Step 2: Sync Game Catalogs</h3>
              <p class="text-neutral-300 text-sm">Click <strong>Yes</strong> when prompted on first startup to sync asset manifests. This prevents 43% loading screen errors.</p>
            </div>
            <div class="p-5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1.5">
              <h3 class="text-lg font-bold text-white">Step 3: Drop Mod Folder into "mods" Directory</h3>
              <p class="text-neutral-300 text-sm">Extract your mod zip directly into:
              <code class="block mt-1 bg-black/50 p-2 rounded text-xs font-mono text-emerald-300">NikkeModManager\\mods\\&lt;ModName&gt;\\</code></p>
            </div>
            <div class="p-5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1.5">
              <h3 class="text-lg font-bold text-white">Step 4: Enable Mods &amp; Click Apply</h3>
              <p class="text-neutral-300 text-sm">Select the checkbox next to your mod in the manager and click <strong>Apply</strong>.</p>
            </div>
          </div>
        </section>

        <section class="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3">
          <h2 class="text-lg font-bold text-amber-300">⚠️ Critical Requirement: Set In-Game Graphics to HIGH</h2>
          <p class="text-neutral-300 text-sm">If your in-game Graphics Quality is set to Medium or Low, the game engine bypasses custom Spine mesh passes and loads fallback low-resolution LODs, making mods appear <strong>completely invisible</strong>. Always play on <strong>High</strong>.</p>
        </section>
      </article>
    `
  },
  {
    slug: 'mod-making',
    title: 'NIKKE Mod Creation Guide • AssetStudio, UABEA & Spine • NIKKE Modding Wiki',
    description: 'Learn how to make Goddess of Victory: NIKKE mods. Comprehensive workflows for Nikke Modding Assistant (NMA), AssetStudio, UABEA bundle extraction, Spine 4.1 rigging, and texture editing.',
    canonical: `${BASE_URL}/mod-making/`,
    priority: '0.9',
    changefreq: 'monthly',
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${BASE_URL}/mod-making/#webpage`,
          "url": `${BASE_URL}/mod-making/`,
          "name": "NIKKE Mod Creation Guide",
          "description": "Guides and workflows for creating NIKKE mods with NMA, AssetStudio, UABEA, and Spine Pro.",
          "isPartOf": { "@id": `${BASE_URL}/#website` }
        },
        {
          "@type": "TechArticle",
          "@id": `${BASE_URL}/mod-making/#article`,
          "headline": "Modern NIKKE Mod Creation Workflows",
          "description": "In-depth guide to extracting assets, modifying Spine 2D skeletons, texture editing in Pre-Multiplied Alpha (PMA), and bundle repacking."
        }
      ]
    },
    prerenderHtml: `
      <article class="ssg-content max-w-5xl mx-auto px-4 py-16 space-y-10">
        <header class="space-y-3">
          <span class="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold">[03] CREATION WORKFLOWS</span>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">NIKKE Mod Creation: Tools, Textures &amp; Skeletons</h1>
          <p class="text-neutral-300">Master the mod creation toolchain from beginner automated swaps with NMA to advanced Spine 4.1 2D rigging and shader reconstruction.</p>
        </header>

        <!-- Fast Pipeline Overview Box -->
        <div class="p-6 rounded-2xl bg-[#12141e] border border-purple-500/30 space-y-4">
          <h2 class="text-lg font-bold text-white flex items-center gap-2">
            <span class="text-purple-400">🛠️</span> Choosing Your Creation Path
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div class="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1">
              <strong class="text-purple-300 block">Beginner: Nikke Modding Assistant (NMA)</strong>
              <p class="text-neutral-300">Formerly Nix Multitool. Automates character skin swaps, Live2D animations, and bundle updates in 1 click without hex editing.</p>
            </div>
            <div class="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1">
              <strong class="text-cyan-300 block">Advanced: AssetStudio + UABEA + Spine 4.1</strong>
              <p class="text-neutral-300">Extract vanilla character bundles, rig custom bones &amp; meshes in Spine Pro, paint in PMA format, and inject via UABEA.</p>
            </div>
          </div>
        </div>

        <section class="space-y-4">
          <h2 class="text-2xl font-bold text-white">1. Automated Workflow: Nikke Modding Assistant (NMA)</h2>
          <p class="text-neutral-300">NMA handles container repacking automatically. Point it to your character folder and game install to replace skins with one click.</p>
        </section>

        <section class="space-y-4">
          <h2 class="text-2xl font-bold text-white">2. Manual Toolchain: AssetStudio &amp; UABEA</h2>
          <p class="text-neutral-300">Extract vanilla character bundles using AssetStudio to locate <code>.png</code> textures, <code>.skel</code> skeleton binaries, and <code>.atlas</code> files. Use UABEA (Unity Assets Bundle Extractor Avalonia) to re-inject modified assets into fresh game containers.</p>
        </section>

        <section class="space-y-4">
          <h2 class="text-2xl font-bold text-white">3. Texture Pipelines: Pre-Multiplied Alpha (PMA)</h2>
          <p class="text-neutral-300">NIKKE uses Pre-Multiplied Alpha for all 2D textures. Editing in standard Straight Alpha without proper conversion creates dark black outline fringes around alpha borders. Convert to Straight Alpha before painting, and export back to PMA.</p>
        </section>

        <section class="space-y-4">
          <h2 class="text-2xl font-bold text-white">4. Spine 4.1 Animation &amp; Mesh Rigging</h2>
          <p class="text-neutral-300">Re-rig character body parts, clothing meshes, and aiming poses using Spine 4.1. Export with matching bone hierarchies to avoid engine desync.</p>
        </section>
      </article>
    `
  },
  {
    slug: 'legacy-guides',
    title: 'NIKKE Legacy Archive & Video Masterclasses • NIKKE Modding Wiki',
    description: 'Archive of advanced NIKKE modding masterclasses, video tutorials, Live2D asset extraction, Spine animation rigging, sound replacement, and community guides.',
    canonical: `${BASE_URL}/legacy-guides/`,
    priority: '0.85',
    changefreq: 'monthly',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${BASE_URL}/legacy-guides/#webpage`,
      "url": `${BASE_URL}/legacy-guides/`,
      "name": "NIKKE Legacy Archive & Video Masterclasses",
      "description": "Video tutorials and masterclasses for advanced NIKKE modders."
    },
    prerenderHtml: `
      <article class="ssg-content max-w-5xl mx-auto px-4 py-16 space-y-10">
        <header class="space-y-3">
          <span class="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">[04] ARCHIVE &amp; MASTERCLASSES</span>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Legacy Modding Archive &amp; Video Masterclasses</h1>
          <p class="text-neutral-300">Curated collection of in-depth video masterclasses by community creators including Lady and Seireiko.</p>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="p-6 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
            <h2 class="text-lg font-bold text-white">Character Texture Editing Masterclass</h2>
            <p class="text-neutral-400 text-sm">Step-by-step video guide covering asset extraction, Photoshop layers, and bundle repacking.</p>
          </div>
          <div class="p-6 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
            <h2 class="text-lg font-bold text-white">Spine Mesh Rigging &amp; Animation</h2>
            <p class="text-neutral-400 text-sm">Working with bone hierarchies, custom meshes, and weights in Spine 4.1.</p>
          </div>
          <div class="p-6 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
            <h2 class="text-lg font-bold text-white">Audio &amp; BGM Replacement</h2>
            <p class="text-neutral-400 text-sm">How to replace in-game battle music, lobby themes, and voice lines.</p>
          </div>
          <div class="p-6 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
            <h2 class="text-lg font-bold text-white">UI Modification &amp; Extraction</h2>
            <p class="text-neutral-400 text-sm">Customizing HUD elements, burst backgrounds, and combat indicators.</p>
          </div>
        </div>
      </article>
    `
  },
  {
    slug: 'characters',
    title: 'NIKKE Character & Skin IDs • Asset Codes (c-codes) & Outfits • NIKKE Modding Wiki',
    description: 'Searchable NIKKE character & skin IDs directory. Look up internal character asset codes (c-codes), costume identifiers, skins, and Live2D asset names.',
    canonical: `${BASE_URL}/characters/`,
    priority: '0.9',
    changefreq: 'weekly',
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${BASE_URL}/characters/#webpage`,
          "url": `${BASE_URL}/characters/`,
          "name": "NIKKE Character & Skin IDs Registry",
          "description": "Internal asset code (c-code) directory for Goddess of Victory: NIKKE characters and skins.",
          "isPartOf": { "@id": `${BASE_URL}/#website` }
        },
        {
          "@type": "CollectionPage",
          "@id": `${BASE_URL}/characters/#database`,
          "name": "NIKKE Character & Skin Directory",
          "description": "Directory of internal character IDs, c-codes, costumes, and skins."
        }
      ]
    },
    prerenderHtml: `
      <article class="ssg-content max-w-5xl mx-auto px-4 py-16 space-y-10">
        <header class="space-y-3">
          <span class="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">[05] CHARACTER &amp; SKIN REGISTRY</span>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">NIKKE Character &amp; Skin IDs (c-codes)</h1>
          <p class="text-neutral-300">Look up internal character IDs, costume variant codes, weapon classes, and manufacturers required for modding asset naming.</p>
        </header>

        <!-- Fast c-code explanation box -->
        <div class="p-6 rounded-2xl bg-[#12141e] border border-cyan-500/30 space-y-4">
          <h2 class="text-lg font-bold text-white flex items-center gap-2">
            <span class="text-cyan-400">💡</span> Why Do c-codes Matter for Modding?
          </h2>
          <p class="text-neutral-300 text-sm">Every character in NIKKE's game files uses an internal identifier called a <strong>c-code</strong>. To replace a character model, your mod files (textures, skeletons, and atlas) must match this exact prefix. For example: <code>c010</code> replaces Rapi, <code>c070</code> replaces Modernia, and <code>c100_01</code> replaces Dorothy's Nostalgia costume.</p>
        </div>

        <section class="space-y-4">
          <h2 class="text-2xl font-bold text-white">Common Character c-codes Quick Reference</h2>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm font-mono">
            <div class="p-3 rounded-lg bg-white/[0.04] border border-white/10"><span class="text-cyan-400 font-bold">c010</span> &mdash; Rapi</div>
            <div class="p-3 rounded-lg bg-white/[0.04] border border-white/10"><span class="text-cyan-400 font-bold">c011</span> &mdash; Anis</div>
            <div class="p-3 rounded-lg bg-white/[0.04] border border-white/10"><span class="text-cyan-400 font-bold">c012</span> &mdash; Neon</div>
            <div class="p-3 rounded-lg bg-white/[0.04] border border-white/10"><span class="text-cyan-400 font-bold">c070</span> &mdash; Modernia</div>
            <div class="p-3 rounded-lg bg-white/[0.04] border border-white/10"><span class="text-cyan-400 font-bold">c100</span> &mdash; Dorothy</div>
            <div class="p-3 rounded-lg bg-white/[0.04] border border-white/10"><span class="text-cyan-400 font-bold">c100_01</span> &mdash; Dorothy (Nostalgia)</div>
            <div class="p-3 rounded-lg bg-white/[0.04] border border-white/10"><span class="text-cyan-400 font-bold">c101</span> &mdash; Red Hood</div>
            <div class="p-3 rounded-lg bg-white/[0.04] border border-white/10"><span class="text-cyan-400 font-bold">c220</span> &mdash; Scarlet</div>
            <div class="p-3 rounded-lg bg-white/[0.04] border border-white/10"><span class="text-cyan-400 font-bold">c221</span> &mdash; Scarlet: Black Shadow</div>
          </div>
        </section>

        <section class="space-y-4">
          <h2 class="text-2xl font-bold text-white">Live Search &amp; Filtering</h2>
          <p class="text-neutral-300">Use our interactive lookup modal on the wiki to instantly filter 140+ characters by manufacturer (Elysion, Missilis, Tetra, Pilgrim, Abnormal), weapon type, burst stage, and element.</p>
        </section>
      </article>
    `
  },
  {
    slug: 'diagnostics',
    title: 'Fix NIKKE 43% Loading Screen & Pink Textures – Troubleshooting • NIKKE Modding Wiki',
    description: 'Fix common Goddess of Victory: NIKKE modding errors: 43% loading screen stuck bug, pink/magenta character textures repacking fix, game_addressables_dir_missing, and missing mods.',
    canonical: `${BASE_URL}/diagnostics/`,
    priority: '0.95',
    changefreq: 'weekly',
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${BASE_URL}/diagnostics/#webpage`,
          "url": `${BASE_URL}/diagnostics/`,
          "name": "Fix NIKKE 43% Loading Screen & Pink Textures – Troubleshooting Guide",
          "description": "Fixes and solutions for common NIKKE modding issues including the 43% stuck error and pink models.",
          "isPartOf": { "@id": `${BASE_URL}/#website` }
        },
        {
          "@type": "FAQPage",
          "@id": `${BASE_URL}/diagnostics/#faq`,
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Which NIKKE Mod Manager should I use? Are old GameBanana tools working?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "NIKKE Modding Wiki (nikkemodding.rwyn.app) is the only primary hub hosting up-to-date, community-maintained NIKKE mod managers, backed and supported directly within the largest NIKKE community (discord.gg/nikke with 110k+ members). Ancient external releases (like the legacy v0.21 build on GameBanana) are completely obsolete, unmaintained, and broken with modern game catalogs. The community exclusively uses modern tools: Chizuru NMM, Danieru NMM, na0h NMM for PC, and SkinnyMan ModDock for Android."
              }
            },
            {
              "@type": "Question",
              "name": "Loading Screen Stuck at 43% or 4/7: How do I fix it?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "This occurs when Unity addressable catalog manifests become mismatched. Close Nikke completely, delete cached files inside %USERPROFILE%\\AppData\\LocalLow\\com_proximabeta\\NIKKE\\com.shiftup.addressables, use the Repair function in the official launcher, launch the game until Tap to Continue, delete UnityCrashHandler64.exe, and re-apply mods as Admin."
              }
            },
            {
              "@type": "Question",
              "name": "Why are my character textures completely pink / magenta in-game?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "When a character model turns bright neon pink in-game, it means Unity cannot link the texture shader or the mod was built for an older game version. Use Chizuru NMM's automated repacker, Nikke Modding Assistant (NMA), or Doro Repacker to automatically rebuild the broken mods against fresh game catalogs."
              }
            },
            {
              "@type": "Question",
              "name": "Sync did not complete: game_addressables_dir_missing",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "This error pops up during resource sync when NMM cannot locate your game addressable catalog path automatically. Open manager_config.json in your NMM folder, locate CATALOG_PATH, and manually set it to point to ...\\NIKKE\\Unity\\com_proximabeta_NIKKE\\com.shiftup.patch, then save and restart NMM."
              }
            },
            {
              "@type": "Question",
              "name": "How to move to a new NMM version without losing my settings?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Upgrading Chizuru NMM is completely lossless. Simply move or copy manager_config.json, mod_state.json, and your mods folder into the new version's folder."
              }
            },
            {
              "@type": "Question",
              "name": "Why are mods invisible in-game or characters missing?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Always verify that in-game Graphics Quality is set to HIGH. On Medium or Low, the game engine bypasses custom Spine mesh texture passes and defaults to fallback low-res LODs, causing mods to become invisible."
              }
            },
            {
              "@type": "Question",
              "name": "PMA vs Straight Alpha: Why does my mod have black outline halos?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Nikke Unity textures are stored in Pre-Multiplied Alpha (PMA) format. If you paint soft edges with an editor configured for Straight Alpha, the semi-transparent pixels turn into dark black fringes in the game. Convert textures to Straight Alpha before editing, and back to PMA when finished."
              }
            }
          ]
        }
      ]
    },
    prerenderHtml: `
      <article class="ssg-content max-w-5xl mx-auto px-4 py-16 space-y-10">
        <header class="space-y-3">
          <span class="text-xs font-mono uppercase tracking-widest text-pink-400 font-semibold">[06] TROUBLESHOOTING &amp; FAQS</span>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Fix NIKKE 43% Loading Bug, Pink Textures &amp; Errors</h1>
          <p class="text-neutral-300">Detailed diagnostic solutions for Goddess of Victory: NIKKE modding errors, crash handler conflicts, addressable catalog desyncs, and shader issues.</p>
        </header>

        <!-- Fast Troubleshooting Cheat-Sheet Banner -->
        <div class="p-6 rounded-2xl bg-[#12141e] border border-pink-500/30 space-y-4">
          <h2 class="text-lg font-bold text-white flex items-center gap-2">
            <span class="text-pink-400">⚡</span> Quick Fix Cheat-Sheet (Most Common Issues)
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div class="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1">
              <strong class="text-pink-300 block">Stuck at 43% (4/7) on loading?</strong>
              <p class="text-neutral-300">Delete addressables cache &rarr; Launcher Repair &rarr; Delete <code>UnityCrashHandler64.exe</code> &rarr; Re-apply mods as Admin.</p>
            </div>
            <div class="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1">
              <strong class="text-purple-300 block">Neon Pink / Magenta Characters?</strong>
              <p class="text-neutral-300">Mod is outdated! Click <strong>Automated Repack</strong> in Chizuru NMM or use NMA to rebuild the mod against the new patch.</p>
            </div>
            <div class="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1">
              <strong class="text-amber-300 block">Mods not showing up in game?</strong>
              <p class="text-neutral-300">Set in-game <strong>Graphics to HIGH</strong>. Low/Medium settings bypass custom Spine meshes.</p>
            </div>
            <div class="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1">
              <strong class="text-cyan-300 block">Dark black outlines on skin?</strong>
              <p class="text-neutral-300">Texture is in Straight Alpha. Convert to Pre-Multiplied Alpha (PMA) format before saving.</p>
            </div>
          </div>
        </div>

        <div class="space-y-8">
          <section class="p-6 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3">
            <h2 class="text-xl font-bold text-white">Loading Screen Stuck at 43% or 4/7: Proven Fix</h2>
            <p class="text-neutral-300">This happens when Unity addressable catalog manifests become corrupted or out of sync. Follow these steps:</p>
            <ol class="list-decimal list-inside space-y-2 text-neutral-400 pl-1">
              <li>Close NIKKE and kill background crash handlers in Task Manager.</li>
              <li>Press <kbd class="px-1.5 py-0.5 bg-white/10 rounded">Win + R</kbd> and go to:
                <code class="block mt-1 bg-black/50 p-2 rounded text-xs font-mono text-emerald-300 break-all">%USERPROFILE%\\AppData\\LocalLow\\com_proximabeta\\NIKKE\\com.shiftup.addressables</code>
              </li>
              <li>Delete all cached files inside that folder so the client pulls fresh manifests.</li>
              <li>Open the official PC Launcher, click the Gear icon, and run <strong>Repair</strong>.</li>
              <li>Launch the game once until "Tap to Continue", then exit.</li>
              <li>Delete <code>UnityCrashHandler64.exe</code> in the game install folder.</li>
              <li>Open NMM as Admin and re-apply your mods.</li>
            </ol>
          </section>

          <section class="p-6 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3">
            <h2 class="text-xl font-bold text-white">Why Character Textures Turn Bright Pink / Magenta</h2>
            <p class="text-neutral-300">When character models render as bright neon pink in-game, Unity cannot link the texture shader because the mod bundle is outdated after a game patch.</p>
            <p class="text-neutral-300"><strong>Automatic Fix:</strong> Use Chizuru NMM's built-in Automated Repacker, Nikke Modding Assistant (NMA), or Doro Repacker to automatically rebuild your broken mods against the fresh game catalogs in one click.</p>
          </section>

          <section class="p-6 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3">
            <h2 class="text-xl font-bold text-white">Sync Did Not Complete: game_addressables_dir_missing</h2>
            <p class="text-neutral-300">Open <code>manager_config.json</code> in your NMM directory. Locate <code>CATALOG_PATH</code> and manually set it to point to your game's addressables patch directory:
            <code class="block mt-1 bg-black/50 p-2 rounded text-xs font-mono text-cyan-300 break-all">...\\NIKKE\\Unity\\com_proximabeta_NIKKE\\com.shiftup.patch</code></p>
          </section>

          <section class="p-6 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3">
            <h2 class="text-xl font-bold text-white">Black Outline Halos: Pre-Multiplied Alpha (PMA) Fix</h2>
            <p class="text-neutral-300">Nikke textures are stored in Pre-Multiplied Alpha format. Painting soft edges in Straight Alpha causes dark black outline fringes. Convert textures to Straight Alpha before painting, turn off selection antialiasing in your graphics editor, and convert back to PMA before export.</p>
          </section>
        </div>
      </article>
    `
  },
  {
    slug: 'workbench',
    title: 'Video Lab & Interactive Workbench • NIKKE Modding Wiki',
    description: 'Interactive video learning lab and modding workbench. Watch step-by-step video tutorials alongside interactive code snippets and tool references.',
    canonical: `${BASE_URL}/workbench/`,
    priority: '0.8',
    changefreq: 'monthly',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${BASE_URL}/workbench/#webpage`,
      "url": `${BASE_URL}/workbench/`,
      "name": "Video Lab & Interactive Workbench",
      "description": "Interactive video learning lab for NIKKE modders."
    },
    prerenderHtml: `
      <article class="ssg-content max-w-5xl mx-auto px-4 py-16 space-y-8">
        <header class="space-y-3">
          <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Video Lab &amp; Interactive Workbench</h1>
          <p class="text-neutral-300">Follow interactive video tutorials with real-time timestamps, code references, and tool downloads.</p>
        </header>
        <p class="text-neutral-400">Launch the interactive workbench on the wiki homepage to access synchronized video players, tool documentation, and step-by-step notes.</p>
      </article>
    `
  },
  {
    slug: 'credits',
    title: 'Credits & Community Contributors • NIKKE Modding Wiki',
    description: 'Special thanks and credits to the creators, developers, researchers, and contributors behind NIKKE Modding tools, guides, and community infrastructure.',
    canonical: `${BASE_URL}/credits/`,
    priority: '0.7',
    changefreq: 'monthly',
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "AboutPage",
          "@id": `${BASE_URL}/credits/#webpage`,
          "url": `${BASE_URL}/credits/`,
          "name": "Credits & Contributors • NIKKE Modding Wiki",
          "description": "Hall of fame and credits for Goddess of Victory: NIKKE modding creators, tool developers, and community maintainers.",
          "isPartOf": { "@id": `${BASE_URL}/#website` }
        }
      ]
    },
    prerenderHtml: `
      <article class="ssg-content max-w-5xl mx-auto px-4 py-16 space-y-10">
        <header class="space-y-3">
          <span class="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">[07] CREDITS &amp; CONTRIBUTORS</span>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Community Contributors &amp; Tool Creators</h1>
          <p class="text-neutral-300">NIKKE Modding Wiki exists thanks to the dedicated reverse engineers, mod developers, guide authors, and archivists who built this ecosystem from scratch.</p>
        </header>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div class="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
            <div class="flex items-center justify-between">
              <strong class="text-white">Danieru</strong>
              <span class="text-[10px] font-mono text-blue-300 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">PIONEER</span>
            </div>
            <p class="text-neutral-400 text-xs">Created the original Nikke Mod Manager (NMM), Nikke Asset Downloader, and discovered face expression swap workflows.</p>
          </div>

          <div class="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
            <div class="flex items-center justify-between">
              <strong class="text-white">Chizuru</strong>
              <span class="text-[10px] font-mono text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">NMM DEVELOPER</span>
            </div>
            <p class="text-neutral-400 text-xs">Developed Chizuru NMM with automated repacking, Live2D motion preview, voiceover injection, and hash synchronization.</p>
          </div>

          <div class="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
            <div class="flex items-center justify-between">
              <strong class="text-white">SkinnyMan</strong>
              <span class="text-[10px] font-mono text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">MOBILE DEVELOPER</span>
            </div>
            <p class="text-neutral-400 text-xs">Created SkinnyMan ModDock (sneedv1.4), enabling Android mobile modding via Shizuku without root access.</p>
          </div>

          <div class="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
            <div class="flex items-center justify-between">
              <strong class="text-white">Bingle</strong>
              <span class="text-[10px] font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">CORE RE</span>
            </div>
            <p class="text-neutral-400 text-xs">Created Nikke Asset Unpacker (NAU), modded UABEA, NAU Key generator, and decrypted initial game catalog files.</p>
          </div>

          <div class="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
            <div class="flex items-center justify-between">
              <strong class="text-white">Lady</strong>
              <span class="text-[10px] font-mono text-pink-300 bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20">WIKI AUTHOR</span>
            </div>
            <p class="text-neutral-400 text-xs">Authored foundational step-by-step modding tutorials, pink texture video masterclasses, and served as previous wiki maintainer.</p>
          </div>

          <div class="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
            <div class="flex items-center justify-between">
              <strong class="text-white">Rwyn</strong>
              <span class="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">MODDER / WIKI MAINTAINER</span>
            </div>
            <p class="text-neutral-400 text-xs">Maintains this NIKKE Modding Wiki, contributed to Nikke Modding Assistant (NMA), and created numerous community mods.</p>
          </div>

          <div class="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
            <div class="flex items-center justify-between">
              <strong class="text-white">Nix</strong>
              <span class="text-[10px] font-mono text-rose-300 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">ARCHIVIST &amp; NMA CREATOR</span>
            </div>
            <p class="text-neutral-400 text-xs">Creator of Nikke Modding Assistant (NMA / formerly Nix Multitool) and maintains the primary public MEGA Nikke Mod Archive.</p>
          </div>

          <div class="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
            <div class="flex items-center justify-between">
              <strong class="text-white">Na0h</strong>
              <span class="text-[10px] font-mono text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">CREATOR &amp; NMM DEV</span>
            </div>
            <p class="text-neutral-400 text-xs">Authored foundational video tutorials for Spine &amp; non-Spine modding, and maintained Na0h NMM.</p>
          </div>
        </div>
      </article>
    `
  },
  {
    slug: 'notice',
    title: 'Legal Disclaimer & Community Notice • NIKKE Modding Wiki',
    description: 'Non-commercial community wiki disclaimer for Goddess of Victory: NIKKE. Modding policies, cosmetic guidelines, anti-cheat rules, and copyright notices.',
    canonical: `${BASE_URL}/notice/`,
    priority: '0.5',
    changefreq: 'monthly',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${BASE_URL}/notice/#webpage`,
      "url": `${BASE_URL}/notice/`,
      "name": "Legal Disclaimer & Community Notice",
      "description": "Legal disclaimer, cosmetic modding policies, and copyright information."
    },
    prerenderHtml: `
      <article class="ssg-content max-w-5xl mx-auto px-4 py-16 space-y-8">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Legal Notice &amp; Community Disclaimer</h1>
        <div class="space-y-4 text-neutral-300 leading-relaxed">
          <p>NIKKE Modding Wiki is an independent, non-commercial community project created by and for players of Goddess of Victory: NIKKE. This site is not affiliated with, endorsed by, or sponsored by SHIFT UP Corporation, Level Infinite, or Proxima Beta Pte. Ltd.</p>
          <p>All game assets, characters, artwork, audio, and trademarks are the intellectual property of their respective owners. Modding content hosted and documented here is strictly for non-commercial educational and cosmetic customization purposes.</p>
          <p><strong>Anti-Cheat &amp; Cheating Policy:</strong> We strictly oppose cheating, automated bots, stat modification, and unauthorized game tampering. The tools and guides here cover client-side cosmetic character skins only.</p>
        </div>
      </article>
    `
  },
  {
    slug: 'privacy',
    title: 'Privacy Policy • NIKKE Modding Wiki',
    description: 'Privacy policy for NIKKE Modding Wiki. Zero tracking, client-side only local storage, privacy-respecting community platform.',
    canonical: `${BASE_URL}/privacy/`,
    priority: '0.5',
    changefreq: 'monthly',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${BASE_URL}/privacy/#webpage`,
      "url": `${BASE_URL}/privacy/`,
      "name": "Privacy Policy",
      "description": "Privacy policy for NIKKE Modding Wiki."
    },
    prerenderHtml: `
      <article class="ssg-content max-w-5xl mx-auto px-4 py-16 space-y-8">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Privacy Policy</h1>
        <div class="space-y-4 text-neutral-300 leading-relaxed">
          <p>We respect your privacy. NIKKE Modding Wiki does not collect personal identifiers, sell user data, or run invasive tracking scripts.</p>
          <p><strong>Local Storage:</strong> Your preferences (such as audio volume, theme toggles, and character favorites) are stored locally on your device via standard browser LocalStorage and never sent to external servers.</p>
          <p><strong>External Content:</strong> YouTube video embeds and audio streams load through privacy-enhanced modes when interacting with the Jukebox player or video tutorials.</p>
        </div>
      </article>
    `
  }
];

// aliases
const aliases = [
  { from: 'tools', to: 'nmm-suite' },
  { from: 'install', to: 'installing-mods' },
  { from: 'make-mods', to: 'mod-making' },
  { from: 'workshop', to: 'legacy-guides' },
  { from: 'nikke-db', to: 'characters' },
  { from: 'nikke-ids', to: 'characters' },
  { from: 'nikke-id', to: 'characters' },
  { from: 'troubleshooting', to: 'diagnostics' },
  { from: 'contributors', to: 'credits' },
];

function buildPageHtml(route) {
  let html = baseHtml;

  html = html.replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(route.title)}</title>`);

  html = html.replace(
    /<meta name="description" content=".*?" \/>/s,
    `<meta name="description" content="${escapeHtml(route.description)}" />`
  );

  html = html.replace(
    /<link rel="canonical" href=".*?" \/>/s,
    `<link rel="canonical" href="${route.canonical}" />`
  );

  html = html.replace(
    /<meta property="og:title" content=".*?" \/>/s,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`
  );
  html = html.replace(
    /<meta property="og:description" content=".*?" \/>/s,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`
  );
  html = html.replace(
    /<meta property="og:url" content=".*?" \/>/s,
    `<meta property="og:url" content="${route.canonical}" />`
  );
  html = html.replace(
    /<meta name="twitter:title" content=".*?" \/>/s,
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content=".*?" \/>/s,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`
  );
  html = html.replace(
    /<meta name="twitter:url" content=".*?" \/>/s,
    `<meta name="twitter:url" content="${route.canonical}" />`
  );

  const jsonLdString = JSON.stringify(route.structuredData, null, 2);
  const jsonLdTag = `<script type="application/ld+json">\n${jsonLdString}\n    </script>`;
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, jsonLdTag);

  const rootReplacement = `<div id="root">${route.prerenderHtml}</div>`;
  html = html.replace('<div id="root"></div>', rootReplacement);

  return html;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

console.log('Generating pre-rendered static HTML routes for SEO & AI Overviews...');

// routes
for (const route of routes) {
  const pageHtml = buildPageHtml(route);
  if (!route.slug) {
    fs.writeFileSync(path.join(distDir, 'index.html'), pageHtml, 'utf-8');
    console.log('  [OK] / (dist/index.html)');
  } else {
    const routeFolder = path.join(distDir, route.slug);
    if (!fs.existsSync(routeFolder)) {
      fs.mkdirSync(routeFolder, { recursive: true });
    }
    fs.writeFileSync(path.join(routeFolder, 'index.html'), pageHtml, 'utf-8');
    console.log(`  [OK] /${route.slug}/ (dist/${route.slug}/index.html)`);
  }
}

// aliases
for (const alias of aliases) {
  const targetRoute = routes.find(r => r.slug === alias.to);
  if (targetRoute) {
    const aliasFolder = path.join(distDir, alias.from);
    if (!fs.existsSync(aliasFolder)) {
      fs.mkdirSync(aliasFolder, { recursive: true });
    }
    let aliasHtml = buildPageHtml({
      ...targetRoute,
      canonical: `${BASE_URL}/${targetRoute.slug}/`,
    });
    const redirectScript = `<script>if(window.location.pathname.startsWith('/${alias.from}')){window.history.replaceState(null,'','/${targetRoute.slug}/'+window.location.search+window.location.hash);}</script>`;
    aliasHtml = aliasHtml.replace('</head>', `${redirectScript}</head>`);
    fs.writeFileSync(path.join(aliasFolder, 'index.html'), aliasHtml, 'utf-8');
    console.log(`  [OK] Alias /${alias.from}/ -> /${alias.to}/ (dist/${alias.from}/index.html)`);
  }
}

// 404 fallback
fs.copyFileSync(path.join(distDir, 'index.html'), path.join(distDir, '404.html'));
console.log('  [OK] 404 SPA fallback (dist/404.html)');

// sitemap
const sitemapEntries = routes.map(r => {
  const loc = r.slug ? `${BASE_URL}/${r.slug}/` : `${BASE_URL}/`;
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`;
}).join('\n');

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>
`;

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapContent, 'utf-8');
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent, 'utf-8');
console.log('  [OK] sitemap.xml generated in dist/ and public/ (10 canonical routes)');

console.log('Static Site Generation (SSG) completed successfully!');
