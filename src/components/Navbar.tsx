import React, { useState, useEffect } from 'react';
import { Search, Download, Menu, X, Film, Github } from 'lucide-react';
import { useCharacters } from '../hooks/useCharacters';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenWorkbench: (videoId?: string) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenSearch, 
  onOpenWorkbench,
  onNavigateSection 
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalCount } = useCharacters();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Homepage', target: 'home' },
    { label: 'NMM Tools', target: 'nmm-suite' },
    { label: 'Install Mods', target: 'installing-mods' },
    { label: 'Make Mods', target: 'mod-making' },
    { label: 'Legacy Archive', target: 'legacy-guides' },
    { label: 'Nikke IDs', target: 'characters' },
    { label: 'Troubleshooting', target: 'diagnostics' },
    { label: 'Credits', target: 'credits' },
  ];

  const handleLinkClick = (target: string) => {
    onNavigateSection(target);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#090a0f]/90 backdrop-blur-md border-b border-white/[0.08] py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 lg:gap-6">
        
        {/* brand & nav */}
        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
          
          <button 
            onClick={() => handleLinkClick('home')} 
            className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer text-left shrink-0"
            title="Nikke Modding Wiki Home"
          >
            <img
              src="/DoroMini.webp"
              alt="Doro"
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all"
            />
            <div className="flex flex-col items-start justify-center">
              <img
                src="/nikke-logo.png"
                alt="GODDESS OF VICTORY: NIKKE"
                className="h-8 sm:h-8 w-auto object-contain filter brightness-105"
              />
              <span className="text-[10.3px] tracking-wider uppercase font-mono text-neutral-400 group-hover:text-neutral-200 font-semibold leading-tight mt-0.5">
                Modding Wiki
              </span>
            </div>
          </button>

          <div className="hidden lg:block h-7 w-px bg-gradient-to-b from-transparent via-white/[0.22] to-transparent shrink-0 mx-1 xl:mx-2" />

          {/* nav links */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-3 2xl:gap-4 text-xs xl:text-[13px] font-medium text-neutral-400">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.target)}
                className="hover:text-white transition-colors tracking-tight cursor-pointer whitespace-nowrap py-1"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        {/* right actions */}
        <div className="hidden sm:flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* separator between page navigation and actions */}
          <div className="hidden lg:block h-7 w-px bg-gradient-to-b from-transparent via-white/[0.22] to-transparent shrink-0 mr-1 xl:mr-1.5" />

          <button
            onClick={() => onOpenWorkbench()}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-neutral-300 hover:text-white text-xs font-mono transition-all cursor-pointer"
            title="Open Tutorial Theater & Video Lab"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[rgb(160,225,255)] animate-pulse" />
            <span className="hidden xl:inline">Video Lab</span>
          </button>

          <button
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-neutral-300 hover:text-white text-xs font-mono transition-all cursor-pointer"
            title="Search for a Nikke"
          >
            <Search className="w-3.5 h-3.5 text-neutral-400" />
            <span className="hidden 2xl:inline">Find a Nikke...</span>
            <span className="2xl:hidden">Search</span>
            <kbd className="bg-white/[0.08] px-1 py-0.2 rounded text-[10px] text-neutral-400">⌘K</kbd>
          </button>

          <button
            onClick={() => handleLinkClick('nmm-suite')}
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] hover:border-white/25 text-neutral-200 hover:text-white text-xs font-medium tracking-tight transition-all cursor-pointer whitespace-nowrap active:scale-95"
            title="Download NMM"
          >
            <Download className="w-3.5 h-3.5 text-[rgb(160,225,255)] group-hover:scale-110 transition-transform duration-200" />
            <span>Get NMM</span>
          </button>

          <a
            href="https://github.com/rwynx/nikke-modding-wiki"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] hover:border-white/25 text-neutral-300 hover:text-white transition-all cursor-pointer flex items-center justify-center active:scale-95"
            title="GitHub Repository"
            aria-label="GitHub Repository"
          >
            <Github className="w-4 h-4 text-neutral-300 group-hover:text-white group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300" />
          </a>
        </div>

        {/* mobile toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-neutral-400 hover:text-white cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#090a0f] border-b border-white/[0.08] px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.target)}
              className="block w-full text-left text-sm text-neutral-300 hover:text-white py-1.5 font-medium cursor-pointer"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-white/[0.08] flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenWorkbench();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 text-center bg-[rgb(160,225,255)]/[0.1] hover:bg-[rgb(160,225,255)]/[0.15] text-[rgb(160,225,255)] rounded-lg text-xs font-mono border border-[rgb(160,225,255)]/[0.3] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Film className="w-3.5 h-3.5" />
              <span>Launch Video Lab Theater</span>
            </button>
            <button
              onClick={() => {
                onOpenSearch();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 text-center bg-white/[0.05] rounded-lg text-xs font-mono text-white border border-white/[0.08] cursor-pointer"
            >
              Find a Nikke ({totalCount || 206}) (⌘K)
            </button>
            <a
              href="https://github.com/rwynx/nikke-modding-wiki"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 text-center bg-white/[0.05] hover:bg-white/[0.1] rounded-lg text-xs font-mono text-neutral-300 hover:text-white border border-white/[0.08] flex items-center justify-center gap-2 transition-all"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Repository</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
