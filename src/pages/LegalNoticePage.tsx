import React from 'react';
import { ArrowLeft, ShieldCheck, ShieldAlert, FileText, ExternalLink, HardDrive, AlertTriangle, Scale } from 'lucide-react';

interface LegalNoticePageProps {
  onBack: () => void;
}

export const LegalNoticePage: React.FC<LegalNoticePageProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-10 font-sans">
      
      {/* top nav */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-neutral-300 hover:text-white text-xs font-mono transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Wiki</span>
        </button>

        <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
          Legal Compliance · Build 2026.10
        </span>
      </div>

      {/* header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-xs font-mono text-neutral-300">
          <Scale className="w-3.5 h-3.5 text-[rgb(160,225,255)]" />
          <span>LEGAL NOTICE & DISCLAIMER</span>
        </div>

        <h1 className="font-sans font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
          Terms, Fair-Use & <br />
          <span className="text-neutral-400">Asset Distribution Notice.</span>
        </h1>

        <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-2xl">
          Comprehensive legal statement regarding non-affiliation, asset hosting policy, fair-use educational technical documentation, and external multimedia content.
        </p>
      </div>

      {/* sections */}
      <div className="space-y-8 text-neutral-300 text-sm leading-relaxed">
        
        <section className="epic-card p-6 sm:p-8 space-y-3 border-white/[0.1]">
          <div className="flex items-center gap-2.5 text-white font-bold text-base sm:text-lg">
            <ShieldCheck className="w-5 h-5 text-[rgb(95,227,103)] shrink-0" />
            <h2>1. Independent Community Project & Non-Affiliation</h2>
          </div>
          <p className="text-neutral-400">
            <strong>Goddess of Victory: NIKKE</strong>, including all its visual assets, characters, character designs, logos, artwork, audio recordings, soundtracks, animations, story elements, and software code, is the exclusive intellectual property and trademark of <strong>SHIFT UP Corporation</strong> and <strong>Level Infinite (Proxima Beta Pte. Ltd. / Tencent Games)</strong>.
          </p>
          <p className="text-neutral-400">
            This website (<code className="text-neutral-200 bg-white/[0.06] px-1.5 py-0.5 rounded text-xs font-mono">Nikke Modding Wiki</code>) is an entirely independent, non-profit, non-commercial community documentation and research archive. It is <strong>not endorsed by, affiliated with, sponsored by, or associated in any official capacity</strong> with SHIFT UP Corporation, Level Infinite, Proxima Beta Pte. Ltd., or any of their parent companies, subsidiaries, or affiliates.
          </p>
        </section>

        <section className="epic-card p-6 sm:p-8 space-y-4 border-amber-500/20 bg-amber-500/[0.02]">
          <div className="flex items-center gap-2.5 text-white font-bold text-base sm:text-lg">
            <HardDrive className="w-5 h-5 text-amber-400 shrink-0" />
            <h2>2. Strict Zero Asset Hosting & Distribution Policy</h2>
          </div>
          <p className="text-neutral-300">
            <strong>This website does NOT host, mirror, store, redistribute, or monetize any official proprietary game client packages, raw encrypted addressables, game executables, or original assets.</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 text-neutral-400 pl-1">
            <li>
              <strong className="text-neutral-200">Pure Static Index:</strong> The wiki operates strictly as a static documentation and tutorial repository. All documentation, instructions, and code snippets describe procedural methods for personal educational purposes.
            </li>
            <li>
              <strong className="text-neutral-200">No Decryption Keys:</strong> This platform does not generate, crack, or bypass digital rights management, network access controls, or proprietary encryption algorithms.
            </li>
            <li>
              <strong className="text-neutral-200">Third-Party External Links:</strong> Any community utilities (such as open-source asset unpackers, GUI tools, or community mod managers like Chizuru NMM or Danieru NMM) are developed and maintained independently by third-party community creators. This website neither owns nor hosts these applications.
            </li>
          </ul>
        </section>

        <section className="epic-card p-6 sm:p-8 space-y-3 border-white/[0.1]">
          <div className="flex items-center gap-2.5 text-white font-bold text-base sm:text-lg">
            <FileText className="w-5 h-5 text-[rgb(160,225,255)] shrink-0" />
            <h2>3. Educational Walkthroughs & External Media Hosting</h2>
          </div>
          <p className="text-neutral-400">
            Educational video guides referenced across the wiki (such as the Seireiko Spine 2D rigging series, texture painting demos, and repacking tutorials) are hosted on external third-party content delivery networks (e.g., Catbox, YouTube, Google Drive).
          </p>
          <p className="text-neutral-400">
            These multimedia assets are user-created transformative screencasts documenting software workflows (Spine, Photoshop, Paint.NET) for educational and commentary purposes under <strong>Fair Use</strong> principles. Under no legal doctrine does embedding or referencing an externally hosted community tutorial video constitute asset theft or copyright infringement, as no raw proprietary game data is stored or transferred by this server.
          </p>
        </section>

        <section className="epic-card p-6 sm:p-8 space-y-3 border-white/[0.1]">
          <div className="flex items-center gap-2.5 text-white font-bold text-base sm:text-lg">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
            <h2>4. Strictly Client-Side Cosmetic Customization</h2>
          </div>
          <p className="text-neutral-400">
            Cosmetic modding in Goddess of Victory: NIKKE operates exclusively through local filesystem redirection (NTFS symbolic links). These procedures:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-neutral-400 pl-1">
            <li>Do not modify game binaries, memory values, or packet transmissions.</li>
            <li>Do not unlock unearned gameplay currencies, gacha pulls, battle rewards, or account unlocks.</li>
            <li>Do not modify character battle parameters, damage formulas, cooldowns, or combat balance.</li>
          </ul>
          <p className="text-neutral-400 pt-1">
            We maintain a strict zero-tolerance policy against game cheating, memory manipulation, and unfair competitive advantages. Any user attempting to utilize modding tools for exploitative purposes does so in direct violation of our community principles and the game publisher's Terms of Service.
          </p>
        </section>

        <section className="epic-card p-6 sm:p-8 space-y-3 border-white/[0.1]">
          <div className="flex items-center gap-2.5 text-white font-bold text-base sm:text-lg">
            <Scale className="w-5 h-5 text-neutral-300 shrink-0" />
            <h2>5. Copyright Inquiries & Takedown Requests</h2>
          </div>
          <p className="text-neutral-400">
            We respect the intellectual property rights of all copyright holders and creators. If you are an intellectual property owner or an authorized agent thereof and believe that any content, link, or reference on this documentation site infringes upon your copyright, please reach out via our community contact channels with:
          </p>
          <ol className="list-decimal list-inside space-y-1 text-neutral-400 pl-1 text-xs sm:text-sm">
            <li>Identification of the copyrighted work claimed to have been infringed.</li>
            <li>Specific URL or location on this wiki where the referenced material is located.</li>
            <li>Sufficient contact information to enable communication with the claimant.</li>
          </ol>
          <p className="text-neutral-400 pt-1">
            Legitimate takedown inquiries will be addressed and processed in full compliance with applicable international digital copyright regulations.
          </p>
        </section>

      </div>

      {/* footer */}
      <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between">
        <button
          onClick={onBack}
          className="btn-liquid-chroma"
        >
          <span className="btn-liquid-chroma-inner px-4 py-2 text-xs">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </span>
        </button>

        <p className="text-xs font-mono text-neutral-500">
          Last Updated: October 2026
        </p>
      </div>

    </div>
  );
};

