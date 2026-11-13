import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';

const punchQuotes = [
  "DORO PUNCH!! 💥",
  "RAAH LET ME SOLO THE QUEEN! 💢",
  "IMMA JUMP THAT QUEEN!! 💥",
  "ORA ORA ORA ORA!!",
  "COMMANDER! HANDS OFF!! 💢"
];

const walkQuotesRTL = [
  "*humming* ...on starry night, I'll be your twinkle star! 🎵",
  "Count on me like 123, spell on you like ABC! 🎵 Twinkle twinkle...",
  "A real one would never speak ill of Chizuru!",
  "Twins banner when...?",
  "*Hypnotizes you* You want to MLB the new Dorothy~!",
  "Thank you everyone for supporting the modding community!",
  "Want to contribute? Hit the Github link and submit a PR!",
  "I'll admit, I might be an Anis fan...",
];

const walkQuotesLTR = [
  "I would choose Chizuru NMM!",
  "A real one would never speak ill of Chizuru!",
  "Dorothy approves this modding wiki!",
  "I'll admit, I might be an Anis fan...",
  "Thank you everyone for supporting the modding community!",
  "*humming* ...on starry night, I'll be your twinkle star! 🎵",
  "Count on me like 123, spell on you like ABC! Twinkle twinkle... 🎵",
  "Want to contribute? Hit the Github link and submit a PR!",
];

const getRandomQuote = (pool: string[], lastQuote?: string) => {
  const choices = pool.filter(q => q !== lastQuote);
  const target = choices.length > 0 ? choices : pool;
  return target[Math.floor(Math.random() * target.length)];
};

export const DoroCompanion: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('doro_companion_enabled');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  const [isWalking, setIsWalking] = useState<boolean>(false);
  const [direction, setDirection] = useState<'rtl' | 'ltr'>('rtl');
  const [walkX, setWalkX] = useState<number>(0);
  const [isPunching, setIsPunching] = useState<boolean>(false);
  const [speech, setSpeech] = useState<string | null>(null);
  const [toast, setToast] = useState<'On...' | 'Off...' | null>(null);

  // animation & timing refs
  const walkAnimRef = useRef<{
    startX: number;
    endX: number;
    currentX: number;
    dir: 'rtl' | 'ltr';
    speed: number; // px per millisecond (~95 px/s)
    rafId: number | null;
    lastTimestamp: number | null;
    isPaused: boolean;
  }>({
    startX: 0,
    endX: 0,
    currentX: 0,
    dir: 'rtl',
    speed: 0.095,
    rafId: null,
    lastTimestamp: null,
    isPaused: false,
  });

  const nextWalkTimeoutRef = useRef<number | null>(null);
  const punchTimeoutRef = useRef<number | null>(null);
  const speechTimeoutRef = useRef<number | null>(null);
  const chatterIntervalRef = useRef<number | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);
  const lastSpeechRef = useRef<string>('');

  // clean animation frame & chatter
  const cancelWalkRaf = () => {
    if (walkAnimRef.current.rafId !== null) {
      cancelAnimationFrame(walkAnimRef.current.rafId);
      walkAnimRef.current.rafId = null;
    }
    if (chatterIntervalRef.current) {
      clearInterval(chatterIntervalRef.current);
      chatterIntervalRef.current = null;
    }
  };

  // call when Doro reaches the edge and exits the screen
  const handleWalkComplete = useCallback((finishedDir: 'rtl' | 'ltr') => {
    cancelWalkRaf();
    setIsWalking(false);
    setIsPunching(false);
    setSpeech(null);

    // switch direction for the next run (RTL -> LTR -> RTL)
    const nextDir = finishedDir === 'rtl' ? 'ltr' : 'rtl';

    // 14 seconds before the next wave
    if (nextWalkTimeoutRef.current) clearTimeout(nextWalkTimeoutRef.current);
    nextWalkTimeoutRef.current = window.setTimeout(() => {
      startWalk(nextDir);
    }, 14000);
  }, []);

  const walkStep = useCallback((timestamp: number) => {
    const anim = walkAnimRef.current;
    if (anim.isPaused) return;

    if (anim.lastTimestamp === null) {
      anim.lastTimestamp = timestamp;
    }

    const dt = Math.min(timestamp - anim.lastTimestamp, 64);
    anim.lastTimestamp = timestamp;

    const deltaX = anim.speed * dt;

    if (anim.dir === 'rtl') {
      anim.currentX -= deltaX;
      if (anim.currentX <= anim.endX) {
        handleWalkComplete('rtl');
        return;
      }
    } else {
      anim.currentX += deltaX;
      if (anim.currentX >= anim.endX) {
        handleWalkComplete('ltr');
        return;
      }
    }

    setWalkX(anim.currentX);
    anim.rafId = requestAnimationFrame(walkStep);
  }, [handleWalkComplete]);

  const startWalk = useCallback((dir: 'rtl' | 'ltr') => {
    cancelWalkRaf();
    if (nextWalkTimeoutRef.current) clearTimeout(nextWalkTimeoutRef.current);

    const screenW = window.innerWidth;
    let startX: number;
    let endX: number;

    if (dir === 'rtl') {
      // starts right near the right screen edge so it becomes visible within ~0.3s
      startX = screenW + 10;
      endX = -180;
    } else {
      // starts right near the left screen edge
      startX = -140;
      endX = screenW + 180;
    }

    walkAnimRef.current = {
      startX,
      endX,
      currentX: startX,
      dir,
      speed: 0.095,
      rafId: null,
      lastTimestamp: null,
      isPaused: false,
    };

    setDirection(dir);
    setWalkX(startX);
    setIsPunching(false);
    setIsWalking(true);

    // frequent walk chatter (speaks on start, then periodically during the walk)
    const quotes = dir === 'rtl' ? walkQuotesRTL : walkQuotesLTR;
    const triggerChatter = () => {
      const quote = getRandomQuote(quotes, lastSpeechRef.current);
      lastSpeechRef.current = quote;
      setSpeech(quote);
      if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
      speechTimeoutRef.current = window.setTimeout(() => setSpeech(null), 3600);
    };

    triggerChatter();

    if (chatterIntervalRef.current) clearInterval(chatterIntervalRef.current);
    chatterIntervalRef.current = window.setInterval(() => {
      if (!walkAnimRef.current.isPaused) {
        triggerChatter();
      }
    }, 6000);

    walkAnimRef.current.rafId = requestAnimationFrame(walkStep);
  }, [walkStep]);

  // cleanup toast timer on unmount
  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  // initial trigger after 2 sec on mount if enabled
  useEffect(() => {
    if (!isEnabled) return;
    const initialTimer = window.setTimeout(() => {
      startWalk('rtl');
    }, 2000);

    return () => {
      clearTimeout(initialTimer);
      if (nextWalkTimeoutRef.current) clearTimeout(nextWalkTimeoutRef.current);
      if (punchTimeoutRef.current) clearTimeout(punchTimeoutRef.current);
      if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
      cancelWalkRaf();
    };
  }, [startWalk, isEnabled]);

  // toggle Doro 
  const toggleDoro = () => {
    const nextState = !isEnabled;
    setIsEnabled(nextState);
    setToast(nextState ? 'On...' : 'Off...');
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = window.setTimeout(() => setToast(null), 850);

    try {
      localStorage.setItem('doro_companion_enabled', String(nextState));
    } catch {
      // ignore
    }

    if (!nextState) {
      cancelWalkRaf();
      if (nextWalkTimeoutRef.current) clearTimeout(nextWalkTimeoutRef.current);
      if (punchTimeoutRef.current) clearTimeout(punchTimeoutRef.current);
      if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
      setIsWalking(false);
      setIsPunching(false);
      setSpeech(null);
    } else {
      if (nextWalkTimeoutRef.current) clearTimeout(nextWalkTimeoutRef.current);
      nextWalkTimeoutRef.current = window.setTimeout(() => {
        startWalk('rtl');
      }, 1200);
    }
  };

  const handleClickDoro = (e: React.MouseEvent) => {
    e.stopPropagation();

    confetti({
      particleCount: 35,
      spread: 70,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      },
      colors: ['#ff3b30', '#ffcc00', '#ffffff', '#5865f2'],
    });

    const quote = getRandomQuote(punchQuotes, lastSpeechRef.current);
    lastSpeechRef.current = quote;
    setSpeech(quote);

    // if already punching, extend duration
    if (punchTimeoutRef.current) clearTimeout(punchTimeoutRef.current);

    // pause 
    walkAnimRef.current.isPaused = true;
    cancelWalkRaf();
    setIsPunching(true);

    // play punch (2000ms), then resume 
    punchTimeoutRef.current = window.setTimeout(() => {
      setIsPunching(false);
      setSpeech(null);

      // resume 
      walkAnimRef.current.isPaused = false;
      walkAnimRef.current.lastTimestamp = null;
      walkAnimRef.current.rafId = requestAnimationFrame(walkStep);
    }, 2000);
  };

  return (
    <>
      {/* doro toggle */}
      <div className="fixed bottom-4 sm:bottom-12 sm:bottom-13 left-4 z-40 flex items-center gap-2.5 select-none pointer-events-auto">
        <button
          onClick={toggleDoro}
          className="relative cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-90 focus:outline-none p-0.5"
          title={isEnabled ? 'Hide Doro Companion' : 'Show Doro Companion'}
          aria-label="Toggle Doro Companion"
        >
          {/* status led dot on the left */}
          <span
            className={`absolute top-0.5 -left-1 w-2 h-2 rounded-full border border-[#090a0f] transition-all duration-300 ${
              isEnabled
                ? 'bg-[rgb(95,227,103)] shadow-[0_0_8px_rgba(95,227,103,0.9)] animate-pulse'
                : 'bg-neutral-600 opacity-60'
            }`}
          />
          <img
            src="/DoroHug.webp"
            alt="Toggle Doro"
            className={`w-7 h-7 sm:w-8 sm:h-8 object-contain transition-all duration-300 ${
              isEnabled
                ? 'opacity-90 hover:opacity-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]'
                : 'grayscale brightness-50 opacity-40 hover:opacity-75'
            }`}
          />
        </button>

        {/* fast fade in/out On... Off... status toast */}
        {toast && (
          <span className="text-[11px] font-mono font-bold tracking-wider text-neutral-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)] [text-shadow:_0_1px_3px_black,_0_0_2px_black] animate-fade-in pointer-events-none select-none">
            {toast}
          </span>
        )}
      </div>

      {/* walking doro */}
      {isEnabled && isWalking && (
        <div
          style={{
            transform: `translateX(${walkX}px)`,
            willChange: 'transform',
          }}
          className="fixed bottom-2 z-40 flex flex-col items-center pointer-events-auto select-none transition-none"
        >
          {/* Speech / Comic Bubble */}
          {speech && (
            <div
              className={`mb-2 max-w-[230px] p-2.5 rounded-xl border text-white text-xs font-sans shadow-2xl relative text-center pointer-events-none transition-all duration-150 ${
                isPunching
                  ? 'bg-[#2a0808]/95 border-red-500/60 shadow-red-500/25 scale-110'
                  : 'bg-[#11131a]/90 border-white/[0.15] shadow-black/50'
              }`}
            >
              <div
                className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 transform rotate-45 border-r border-b ${
                  isPunching
                    ? 'bg-[#2a0808] border-red-500/60'
                    : 'bg-[#11131a] border-white/[0.15]'
                }`}
              />
              <span
                className={`font-mono text-[10px] font-bold block mb-0.5 tracking-wider ${
                  isPunching ? 'text-red-400 animate-pulse' : 'text-[rgb(160,225,255)]'
                }`}
              >
                {isPunching ? '💢 DORO:' : 'DORO:'}
              </span>
              <p className="text-neutral-100 text-[11px] font-medium leading-tight">{speech}</p>
            </div>
          )}

          {/* Doro Character (Walking or Punching) */}
          <div
            onClick={handleClickDoro}
            className={`cursor-pointer transition-transform duration-200 select-none ${
              isPunching
                ? 'scale-[1.5] drop-shadow-[0_0_24px_rgba(255,59,48,0.7)]'
                : 'hover:scale-110 active:scale-95'
            }`}
            style={{
              // When walking Left to Right, mirror horizontally. When punching, keep upright or punch forward
              transform: !isPunching && direction === 'ltr' ? 'scaleX(-1)' : undefined,
            }}
            title="Click Doro!"
          >
            {isPunching ? (
              <img
                src="/DoroPunch.gif"
                alt="Doro Punching"
                className="w-28 h-28 sm:w-36 sm:h-36 object-contain pointer-events-auto"
              />
            ) : (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-36 h-36 sm:w-40 sm:h-40 object-contain pointer-events-auto"
                style={{ mixBlendMode: 'screen' }}
              >
                <source src="/DoroWalkingWithBags.webm" type="video/webm" />
                <source src="/DoroWalkingWithBags.mp4" type="video/mp4" />
              </video>
            )}
          </div>
        </div>
      )}
    </>
  );
};
