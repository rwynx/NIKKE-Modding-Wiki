import React, { useState, useEffect } from 'react';

export interface SectionItem {
  id: string;
  number: number;
  label: string;
}

interface SectionNavRailProps {
  onNavigateSection: (sectionId: string) => void;
}

const sections: SectionItem[] = [
  { id: 'overview', number: 1, label: 'Homepage' },
  { id: 'nmm-suite', number: 2, label: 'NMM Tools' },
  { id: 'installing-mods', number: 3, label: 'Install Mods' },
  { id: 'mod-making', number: 4, label: 'Make Mods' },
  { id: 'legacy-guides', number: 5, label: 'Legacy Archive' },
  { id: 'agents', number: 6, label: 'Nikke DB' },
  { id: 'diagnostics', number: 7, label: 'Troubleshooting' },
  { id: 'credits', number: 8, label: 'Credits' },
];

export const SectionNavRail: React.FC<SectionNavRailProps> = ({ onNavigateSection }) => {
  const [activeId, setActiveId] = useState<string>('overview');
  const [visible, setVisible] = useState<boolean>(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Reveal panel once user scrolls past initial hero banner (~200px)
      setVisible(scrollY > 200);

      // Check if user reached near the very bottom of the document
      const isAtBottom =
        window.innerHeight + scrollY >= document.documentElement.scrollHeight - 60;
      if (isAtBottom) {
        setActiveId(sections[sections.length - 1].id);
        return;
      }

      // Check sections from bottom to top using viewport bounding rects
      const triggerThreshold = window.innerHeight * 0.38;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerThreshold) {
            setActiveId(sections[i].id);
            return;
          }
        }
      }

      setActiveId('overview');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (id: string) => {
    setActiveId(id);
    onNavigateSection(id);
  };

  return (
    <aside
      aria-label="Section Quick Jump Navigation"
      className={`fixed left-4 xl:left-7 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-start transition-all duration-500 ease-out select-none ${
        visible
          ? 'opacity-100 translate-x-0 pointer-events-auto'
          : 'opacity-0 -translate-x-6 pointer-events-none'
      }`}
    >
      {/* Completely Transparent Free-Floating Navigation Rail */}
      <div className="flex flex-col gap-3 py-2">
        {sections.map((sec) => {
          const isActive = activeId === sec.id;
          const isHovered = hoveredId === sec.id;
          const showLabel = isActive || isHovered;

          return (
            <button
              key={sec.id}
              onClick={() => handleClick(sec.id)}
              onMouseEnter={() => setHoveredId(sec.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group flex items-center gap-2.5 py-1 text-left cursor-pointer transition-all duration-200 outline-none"
              title={`Jump to ${sec.label}`}
            >
              {/* Section Number (1, 2, 3...) */}
              <span
                className={`w-3.5 text-xs font-sans transition-all duration-200 text-right tabular-nums drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] ${
                  isActive
                    ? 'text-white font-bold scale-110'
                    : 'text-neutral-500 group-hover:text-neutral-200 font-medium'
                }`}
              >
                {sec.number}
              </span>

              {/* Horizontal Dash Indicator */}
              <div
                className={`h-[5px] rounded-full transition-all duration-300 ease-out ${
                  isActive
                    ? 'w-9 h-[3.5px] bg-gradient-to-r from-[rgb(160,225,255)] to-[rgb(95,227,103)] shadow-[0_0_12px_rgba(95,227,103,0.8)]'
                    : 'w-3.5 bg-white/25 group-hover:w-6 group-hover:bg-white/70 shadow-[0_1px_3px_rgba(0,0,0,0.6)]'
                }`}
              />

              {/* Section Label (Active is always displayed; Inactive animates in smoothly on hover) */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-out flex items-center ${
                  showLabel
                    ? 'max-w-[200px] opacity-100 pl-1'
                    : 'max-w-0 opacity-0 pl-0'
                }`}
              >
                <span
                  className={`text-xs whitespace-nowrap font-sans tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] transition-colors duration-200 ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-neutral-300 font-medium group-hover:text-white'
                  }`}
                >
                  {sec.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
