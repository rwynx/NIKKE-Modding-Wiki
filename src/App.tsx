import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroCinematic } from './components/HeroCinematic';
import { NmmSuiteSelector } from './components/NmmSuiteSelector';
import { InstallingModsSection } from './components/InstallingModsSection';
import { ModernModMakingSection } from './components/ModernModMakingSection';
import { WorkshopMasterclasses } from './components/WorkshopMasterclasses';
import { AgentRegistrySection } from './components/AgentRegistrySection';
import { DiagnosticsFAQ } from './components/DiagnosticsFAQ';
import { ContributorsSection } from './components/ContributorsSection';
import { VideoModal } from './components/VideoModal';
import { CharacterLookupModal } from './components/CharacterLookupModal';
import { DoroCompanion } from './components/DoroCompanion';
import { TutorialWorkbench } from './components/TutorialWorkbench';
import { SectionNavRail } from './components/SectionNavRail';
import { LegalNoticePage } from './pages/LegalNoticePage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { ShieldCheck, ShieldAlert, Mail } from 'lucide-react';

export const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'workbench' | 'notice' | 'privacy'>('home');
  const [workbenchVideoId, setWorkbenchVideoId] = useState<string | undefined>(undefined);
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [characterModalOpen, setCharacterModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<{
    embedUrl: string;
    title: string;
  } | null>(null);

  // track active section
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = [
        'credits', 
        'diagnostics', 
        'agents', 
        'legacy-guides', 
        'mod-making', 
        'installing-mods', 
        'nmm-suite', 
        'overview'
      ];
      const triggerThreshold = window.innerHeight * 0.45;

      for (const id of sectionIds) {
        if (id === 'overview') {
          setActiveSection('overview');
          return;
        }
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerThreshold) {
            setActiveSection(id);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // hash routing
  useEffect(() => {
    const handleHashRouting = () => {
      const raw = window.location.hash.replace('#', '').trim().toLowerCase();
      if (!raw) return;

      if (raw === 'workbench' || raw === 'video-lab' || raw === 'seireiko') {
        setView('workbench');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (raw === 'notice' || raw === 'disclaimer' || raw === 'legal' || raw === 'terms') {
        setView('notice');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (raw === 'privacy' || raw === 'privacy-policy') {
        setView('privacy');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const aliasMap: Record<string, string> = {
        'nmm': 'nmm-suite',
        'nmm-tools': 'nmm-suite',
        'nmm-suite': 'nmm-suite',
        'mod-managers': 'nmm-suite',
        'install': 'installing-mods',
        'installing': 'installing-mods',
        'installing-mods': 'installing-mods',
        'installation': 'installing-mods',
        'mod-making': 'mod-making',
        'creation': 'mod-making',
        'make-mods': 'mod-making',
        'guides': 'legacy-guides',
        'guide': 'legacy-guides',
        'workshop': 'legacy-guides',
        'legacy': 'legacy-guides',
        'legacy-guides': 'legacy-guides',
        'masterclasses': 'legacy-guides',
        'nikke-db': 'agents',
        'agents': 'agents',
        'characters': 'agents',
        'codes': 'agents',
        'troubleshooting': 'diagnostics',
        'faq': 'diagnostics',
        'diagnostics': 'diagnostics',
        'credits': 'credits',
        'contributors': 'credits',
        'engine': 'engine',
        'feature-matrix': 'engine',
        'overview': 'overview',
        'home': 'overview',
        'tools': 'recommended-tools',
        'recommended-tools': 'recommended-tools',
        'required-tools': 'recommended-tools',
        'mod-tools': 'recommended-tools',
      };

      const targetId = aliasMap[raw] || raw;

      setView('home');
      setTimeout(() => {
        if (targetId === 'overview') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 100);
    };

    handleHashRouting();
    window.addEventListener('hashchange', handleHashRouting);
    return () => window.removeEventListener('hashchange', handleHashRouting);
  }, []);

  const handleNavigateSection = (sectionId: string) => {
    window.history.pushState(null, '', `#${sectionId}`);
    if (view !== 'home') {
      setView('home');
      // wait for DOM to mount home sections
      setTimeout(() => {
        if (sectionId === 'overview') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 60);
    } else {
      if (sectionId === 'overview') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const openWorkbench = (videoId?: string) => {
    setWorkbenchVideoId(videoId);
    setView('workbench');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openNotice = () => {
    window.history.pushState(null, '', '#notice');
    setView('notice');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openPrivacy = () => {
    window.history.pushState(null, '', '#privacy');
    setView('privacy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-[#e1e4ea] selection:bg-white selection:text-black relative overflow-x-hidden">
      
      {/* bg ambient glow */}
      <div 
        className="fixed inset-0 pointer-events-none transition-all duration-1000 ease-in-out z-0 opacity-70"
        style={{
          background: 
            activeSection === 'engine'
              ? 'radial-gradient(ellipse 70% 50% at 80% 30%, rgba(160,225,255,0.065) 0%, transparent 70%)'
              : activeSection === 'nmm-suite'
              ? 'radial-gradient(ellipse 70% 50% at 20% 40%, rgba(95,227,103,0.065) 0%, transparent 70%)'
              : activeSection === 'installing-mods'
              ? 'radial-gradient(ellipse 70% 50% at 30% 45%, rgba(95,227,103,0.06) 0%, transparent 70%)'
              : activeSection === 'mod-making'
              ? 'radial-gradient(ellipse 70% 50% at 70% 50%, rgba(160,225,255,0.065) 0%, transparent 70%)'
              : activeSection === 'legacy-guides' || activeSection === 'workshop'
              ? 'radial-gradient(ellipse 75% 55% at 40% 55%, rgba(255,180,50,0.05) 0%, rgba(160,225,255,0.03) 50%, transparent 75%)'
              : activeSection === 'agents'
              ? 'radial-gradient(ellipse 70% 50% at 30% 60%, rgba(139,92,246,0.065) 0%, transparent 70%)'
              : activeSection === 'diagnostics'
              ? 'radial-gradient(ellipse 70% 50% at 70% 70%, rgba(255,0,128,0.07) 0%, transparent 70%)'
              : activeSection === 'credits'
              ? 'radial-gradient(ellipse 70% 50% at 50% 85%, rgba(245,158,11,0.06) 0%, transparent 70%)'
              : 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(160,225,255,0.075) 0%, transparent 70%)'
        }}
      />
      
      {/* editor sticky navbar */}
      <Navbar
        onOpenSearch={() => setCharacterModalOpen(true)}
        onOpenWorkbench={openWorkbench}
        onNavigateSection={handleNavigateSection}
      />

      {view === 'workbench' ? (
        <main className="pt-20">
          <TutorialWorkbench 
            initialVideoId={workbenchVideoId}
            onBack={() => { setView('home'); window.history.pushState(null, '', '#'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
          />
        </main>
      ) : view === 'notice' ? (
        <main className="pt-20">
          <LegalNoticePage onBack={() => { setView('home'); window.history.pushState(null, '', '#'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
        </main>
      ) : view === 'privacy' ? (
        <main className="pt-20">
          <PrivacyPolicyPage onBack={() => { setView('home'); window.history.pushState(null, '', '#'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
        </main>
      ) : (
        <>
          {/* side nav rail */}
          <SectionNavRail onNavigateSection={handleNavigateSection} />

          {/* hero */}
          <HeroCinematic onExploreWorkshop={() => handleNavigateSection('installing-mods')} />

          <main className="relative z-10">
            {/* nmm matrix */}
            <NmmSuiteSelector />

            {/* install mods */}
            <InstallingModsSection />

            {/* make mods */}
            <ModernModMakingSection onOpenWorkbench={openWorkbench} />

            {/* legacy archive */}
            <WorkshopMasterclasses
              onOpenVideo={(video) => setActiveVideo(video)}
              onOpenWorkbench={openWorkbench}
            />

            {/* nikke db */}
            <AgentRegistrySection />

            {/* diagnostics */}
            <DiagnosticsFAQ />

            {/* credits */}
            <ContributorsSection />
          </main>
        </>
      )}

      {/* footer */}
      <footer className="border-t border-white/[0.08] bg-[#07080c] py-16 text-xs text-neutral-400 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-8">
            <div className="flex items-center gap-3 shrink-0">
              <img src="/DoroMini.webp" alt="Doro" className="w-7 h-7 object-contain opacity-80" />
              <div>
                <p className="font-bold text-white tracking-tight text-sm">
                  NIKKE MODDING WIKI
                </p>
                <p className="text-[11px] text-neutral-400">
                  An independent, non-commercial community wiki for NIKKE Modding.
                </p>
              </div>
            </div>

            {/* vertical separator */}
            <div className="hidden lg:block h-12 w-px bg-gradient-to-b from-transparent via-white/[0.22] to-transparent shrink-0" />

            <div className="flex flex-col items-start gap-2.5 text-xs font-sans">
              {/* upper nav links: ending at Credits */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-neutral-400">
                <button onClick={() => handleNavigateSection('overview')} className="hover:text-white transition-colors cursor-pointer">
                  Homepage
                </button>
                <button onClick={() => handleNavigateSection('nmm-suite')} className="hover:text-white transition-colors cursor-pointer">
                  NMM Tools
                </button>
                <button onClick={() => handleNavigateSection('installing-mods')} className="hover:text-white transition-colors cursor-pointer">
                  Install Mods
                </button>
                <button onClick={() => handleNavigateSection('mod-making')} className="hover:text-white transition-colors cursor-pointer">
                  Make Mods
                </button>
                <button onClick={() => handleNavigateSection('legacy-guides')} className="hover:text-white transition-colors cursor-pointer">
                  Legacy Archive
                </button>
                <button onClick={() => openWorkbench()} className="text-[rgb(160,225,255)] hover:underline cursor-pointer">
                  Video Lab
                </button>
                <button onClick={() => handleNavigateSection('agents')} className="hover:text-white transition-colors cursor-pointer">
                  Nikke DB
                </button>
                <button onClick={() => handleNavigateSection('diagnostics')} className="hover:text-white transition-colors cursor-pointer">
                  Troubleshooting
                </button>
                <button onClick={() => handleNavigateSection('credits')} className="hover:text-white transition-colors cursor-pointer">
                  Credits
                </button>
              </div>

              {/* lower row: Nikke Discord Link - Legal Notice - Privacy */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-3.5 text-xs">
                <a
                  href="https://discord.gg/nikke"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#5865F2]/[0.15] hover:bg-[#5865F2]/[0.3] border border-[#5865F2]/[0.4] text-white text-xs font-medium transition-all shadow-[0_0_12px_rgba(88,101,242,0.2)]"
                >
                  <svg
                    className="w-3.5 h-3.5 fill-current text-[#8495f5] group-hover:text-white group-hover:scale-110 group-hover:-rotate-6 transition-transform"
                    viewBox="0 0 127.14 96.36"
                    aria-hidden="true"
                  >
                    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,45.91,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,45.91,96.12,53,91.08,65.69,84.69,65.69Z" />
                  </svg>
                  <span>Nikke Community</span>
                  <span className="text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[11px]">↗</span>
                </a>

                <span className="text-white/[0.1]">•</span>

                <button onClick={openNotice} className="text-neutral-400 hover:text-white font-medium transition-colors cursor-pointer">
                  Legal Notice
                </button>

                <span className="text-white/[0.1]">•</span>

                <button onClick={openPrivacy} className="text-neutral-400 hover:text-white font-medium transition-colors cursor-pointer">
                  Privacy Policy
                </button>
              </div>
            </div>
          </div>

          {/* legal notice summary */}
          <div className="border border-white/[0.08] bg-[#0c0e15] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-neutral-400">
            <div className="space-y-1 max-w-3xl">
              <div className="flex items-center gap-2 text-white font-mono text-[11px] font-bold tracking-wider uppercase">
                <ShieldAlert className="w-3.5 h-3.5 text-neutral-400" />
                <span>LEGAL COMPLIANCE & ASSET DISCLAIMER</span>
              </div>
              <p className="text-[11px] leading-relaxed font-sans text-neutral-400">
                Non-commercial educational community archive. Under no circumstances does this website host, mirror, or distribute official game assets. All registered trademarks, character likenesses, and intellectual property remain the exclusive property of SHIFT UP and Level Infinite.
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 text-[11px] font-mono flex-wrap">
              <a 
                href="mailto:support@rwyn.app"
                className="px-2.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.09] text-neutral-300 hover:text-white border border-white/[0.08] transition-colors cursor-pointer flex items-center gap-1.5"
                title="Contact Support"
              >
                <Mail className="w-3.5 h-3.5 text-neutral-400" />
                <span>support@rwyn.app</span>
              </a>
              <button 
                onClick={openNotice} 
                className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/[0.1] transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Read Full Notice</span>
                <span>→</span>
              </button>
              <button 
                onClick={openPrivacy} 
                className="px-2.5 py-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                Privacy
              </button>
            </div>
          </div>

          {/* credits bar */}
          <div className="border-t border-white/[0.06] pt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-neutral-400 font-sans">
            <div className="space-y-0.5">
              <p className="text-neutral-300 font-medium font-mono text-[11px]">
              <strong className="text-white">Goddess of Victory: NIKKE · Fair-Use Community Wiki</strong>
              </p>
              <p className="text-neutral-400 text-[11.5px]">
                Built, verified, and maintained by <a href="https://github.com/rwynx" target="_blank" rel="noopener noreferrer" className="text-white hover:text-indigo-300 underline underline-offset-2 decoration-white/30 hover:decoration-indigo-300 transition-colors font-semibold">Rwyn</a>. Gemini assisted in UI layout and React & Vite optimizations.
              <br />As of Beta 1.2, Gemini DeepMind's total contributions:
              <strong className="text-white"> 861 lines - around %8 </strong> of the current codebase.
              </p>
            </div>

            <div className="text-neutral-400 font-mono text-[10.5px]">
              <span>Beta-1.2 · 2026</span>
            </div>
          </div>

        </div>
      </footer>

      {/* modals */}
      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
      <CharacterLookupModal
        isOpen={characterModalOpen}
        onClose={() => setCharacterModalOpen(false)}
      />
      <DoroCompanion />

    </div>
  );
};

export default App;
