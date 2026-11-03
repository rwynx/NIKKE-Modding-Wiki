import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

const doroQuotes = [
  "These bags are full of 4K Spine textures!",
  "Heading to the Outpost with fresh mods!",
  "Commander! Don't look at my shopping receipt!",
  "Carrying all 199 Nikke asset bundles!",
  "Off to patch the game on high graphics!",
  "NMM is running, let me through!",
  "Just secured the limited-edition Dorothy skin!"
];

export const DoroWalker: React.FC = () => {
  const [posX, setPosX] = useState<number>(-200);
  const [direction, setDirection] = useState<'right' | 'left'>('right');
  const [speech, setSpeech] = useState<string | null>(null);
  const [isJumping, setIsJumping] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const pauseUntilRef = useRef<number>(0);

  useEffect(() => {
    // Walking speed: ~90 pixels per second
    const speed = 85; 

    const step = (time: number) => {
      const dt = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      const screenWidth = window.innerWidth;
      const margin = 220; // off-screen margin

      if (time > pauseUntilRef.current) {
        setIsPaused(false);
        setPosX((prev) => {
          let next = prev;
          if (direction === 'right') {
            next = prev + speed * dt;
            if (next > screenWidth + margin) {
              // Pause at off-screen edge, then turn around
              pauseUntilRef.current = time + 4000;
              setDirection('left');
              return screenWidth + margin;
            }
          } else {
            next = prev - speed * dt;
            if (next < -margin) {
              // Pause at off-screen edge, then turn around
              pauseUntilRef.current = time + 4000;
              setDirection('right');
              return -margin;
            }
          }
          return next;
        });
      } else {
        setIsPaused(true);
      }

      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [direction]);

  const handleClick = (e: React.MouseEvent) => {
    // Fire confetti at click location
    confetti({
      particleCount: 30,
      spread: 55,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      },
      colors: ['#a0e1ff', '#5fe367', '#ffd233', '#ffffff']
    });

    // Random quote
    const random = doroQuotes[Math.floor(Math.random() * doroQuotes.length)];
    setSpeech(random);

    // Temporarily trigger jumping animation
    setIsJumping(true);

    // Pause walking for 3.5 seconds
    pauseUntilRef.current = performance.now() + 3500;

    setTimeout(() => {
      setIsJumping(false);
    }, 2500);

    setTimeout(() => {
      setSpeech(null);
    }, 4500);
  };

  return (
    <div
      style={{
        transform: `translateX(${posX}px)`,
        willChange: 'transform',
      }}
      className="fixed bottom-2 z-40 flex flex-col items-center pointer-events-auto select-none transition-none"
    >
      {/* Speech Bubble */}
      {speech && (
        <div className="mb-2 max-w-[220px] p-2.5 rounded-xl bg-[#11131a] border border-white/[0.15] text-white text-xs font-sans shadow-2xl relative text-center animate-fade-in pointer-events-none">
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#11131a] border-r border-b border-white/[0.15] transform rotate-45" />
          <span className="font-mono text-[10px] text-[rgb(160,225,255)] font-bold block mb-0.5">
            DORO SHOPPING SPREE:
          </span>
          <p className="text-neutral-200 text-[11px] leading-tight">{speech}</p>
        </div>
      )}

      {/* Doro Video Actor */}
      <div
        onClick={handleClick}
        className={`cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95 ${
          direction === 'left' ? 'scale-x-[-1]' : 'scale-x-1'
        }`}
        title="Click Doro!"
      >
        {!isJumping ? (
          // Walking with Bags Loop
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-28 h-28 sm:w-32 sm:h-32 object-contain pointer-events-auto"
            style={{ mixBlendMode: 'screen' }}
          >
            <source src="/DoroWalkingWithBags.webm" type="video/webm" />
            <source src="/DoroWalkingWithBags.mp4" type="video/mp4" />
          </video>
        ) : (
          // Jumping Excitement Loop
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-32 h-32 sm:w-40 sm:h-40 object-contain pointer-events-auto"
            style={{ mixBlendMode: 'screen' }}
          >
            <source src="/DoroJumping.webm" type="video/webm" />
            <source src="/DoroJumping.mp4" type="video/mp4" />
          </video>
        )}
      </div>
    </div>
  );
};

