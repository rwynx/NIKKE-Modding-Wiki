import React, { useState, useRef } from 'react';
import anime from 'animejs';
import confetti from 'canvas-confetti';

const doroQuotes = [
  "Doro says: Mod responsibly, Commander!",
  "Make sure Graphics is set to HIGH, or I'll be invisible!",
  "43% Loading screen stuck? Clear AppData addressables!",
  "Always terminate UnityCrashHandler64!",
  "Spine physics not jiggling? Repack spinephysicssettings!",
  "Straight Alpha vs PMA: Don't let my halo turn black!",
  "Looking for 1-click extraction? Try Chizuru NMM or Nikke Modding Assistant (NMA)!",
];

export const DoroEasterEgg: React.FC = () => {
  const [sus, setSus] = useState(false);
  const [quote, setQuote] = useState<string | null>(null);
  const doroRef = useRef<HTMLImageElement | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    // Confetti effect
    confetti({
      particleCount: 35,
      spread: 60,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      },
      colors: ['#ff2a5f', '#00f0ff', '#ffd700']
    });

    // Squish animation via anime.js
    if (doroRef.current) {
      anime({
        targets: doroRef.current,
        scaleY: [
          { value: 0.65, duration: 120, easing: 'easeOutQuad' },
          { value: 1.15, duration: 180, easing: 'easeOutElastic(1, .5)' },
          { value: 1, duration: 140, easing: 'easeInOutQuad' }
        ],
        scaleX: [
          { value: 1.25, duration: 120, easing: 'easeOutQuad' },
          { value: 0.9, duration: 180, easing: 'easeOutElastic(1, .5)' },
          { value: 1, duration: 140, easing: 'easeInOutQuad' }
        ],
        rotate: [
          { value: (Math.random() - 0.5) * 20, duration: 100 },
          { value: 0, duration: 200 }
        ]
      });
    }

    setSus(true);
    const randomQuote = doroQuotes[Math.floor(Math.random() * doroQuotes.length)];
    setQuote(randomQuote);

    setTimeout(() => {
      setSus(false);
    }, 1500);

    setTimeout(() => {
      setQuote(null);
    }, 4500);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end pointer-events-none select-none">
      {/* Speech bubble */}
      {quote && (
        <div className="pointer-events-auto mb-2 max-w-xs p-3 rounded-2xl bg-[#111827] border border-nikke-cyan text-white text-xs font-sans shadow-xl animate-fade-in relative">
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[#111827] border-r border-b border-nikke-cyan transform rotate-45"></div>
          <span className="font-bold text-nikke-cyan block mb-0.5">DORO PROTOCOL:</span>
          {quote}
        </div>
      )}

      {/* Interactive Mascot */}
      <div 
        onClick={handleClick}
        className="pointer-events-auto cursor-pointer group relative transition-transform hover:scale-105 active:scale-95"
        title="Click Doro for wisdom and confetti!"
      >
        <span className="absolute -top-1 -left-1 px-1.5 py-0.5 rounded-full bg-nikke-accent text-[9px] font-mono font-bold text-white shadow-md animate-pulse">
          CLICK ME
        </span>
        <img
          ref={doroRef}
          src={sus ? '/DoroSus.webp' : '/Doro.webp'}
          alt="Doro Nikke Mascot"
          className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
        />
      </div>
    </div>
  );
};

