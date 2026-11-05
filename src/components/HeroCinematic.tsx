import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Download, ChevronRight, Terminal, ArrowUpRight, Github } from 'lucide-react';
import { SecurityAlertBanner } from './SecurityAlertBanner';

interface HeroCinematicProps {
  onExploreWorkshop: () => void;
}

export const HeroCinematic: React.FC<HeroCinematicProps> = ({ onExploreWorkshop }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoError, setVideoError] = useState(false);

  // mobile check
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  // mobile slides
  const mobileBackgrounds = [
    { id: 1, name: 'Anis', src: '/mobile-backgrounds/mbg-nikke-anis1.jpg' },
    { id: 2, name: 'Modernia', src: '/mobile-backgrounds/mbg-nikke-modernia2.png' },
    { id: 3, name: 'Behemoth', src: '/mobile-backgrounds/mbg-nikke-behemoth3.png' },
    { id: 4, name: 'Indivilia', src: '/mobile-backgrounds/mbg-nikke-indivilia4.jpg' },
    { id: 5, name: 'Rapi', src: '/mobile-backgrounds/mbg-nikke-rapi5.png' },
    { id: 6, name: 'Chatterbox', src: '/mobile-backgrounds/mbg-nikke-yapperbox6.png' },
    { id: 7, name: 'Raptures', src: '/mobile-backgrounds/mbg-nikke-raptures7.jpg' },
  ];

  // random start
  const [activeMobileIdx, setActiveMobileIdx] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    try {
      const last = sessionStorage.getItem('nikke_last_mbg');
      const lastIdx = last !== null ? parseInt(last, 10) : -1;
      let nextIdx = Math.floor(Math.random() * 7);
      if (nextIdx === lastIdx) {
        nextIdx = (nextIdx + 1) % 7;
      }
      sessionStorage.setItem('nikke_last_mbg', nextIdx.toString());
      return nextIdx;
    } catch {
      return Math.floor(Math.random() * 7);
    }
  });

  const [isHeroInView, setIsHeroInView] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // slide loop
  useEffect(() => {
    if (!isMobile || !isHeroInView) return;

    const timer = setInterval(() => {
      setActiveMobileIdx((prev) => {
        const next = (prev + 1) % mobileBackgrounds.length;
        try {
          sessionStorage.setItem('nikke_last_mbg', next.toString());
        } catch {
          // ignore
        }
        return next;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [isMobile, isHeroInView, mobileBackgrounds.length]);

  // default volume
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.5;
    }
  }, []);

  // pause on scroll
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsHeroInView(entry.isIntersecting);

        if (video) {
          if (!entry.isIntersecting) {
            if (!video.paused) {
              video.pause();
              setIsPlaying(false);
            }
          } else {
            // scrolled back into view
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise
                .then(() => setIsPlaying(true))
                .catch(() => {});
            }
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [videoError]);

  const toggleMute = () => {
    if (videoRef.current) {
      const next = !isMuted;
      videoRef.current.muted = next;
      setIsMuted(next);
      if (!next && volume === 0) {
        setVolume(0.5);
        videoRef.current.volume = 0.5;
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      if (val === 0) {
        videoRef.current.muted = true;
        setIsMuted(true);
      } else if (isMuted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <section
      id="overview"
      ref={containerRef}
      className="relative w-full min-h-[90vh] flex items-end justify-start overflow-hidden bg-[#090a0f] pt-24 sm:pt-32 pb-16 sm:pb-20"
    >
      {/* bg media */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {isMobile ? (
          <div className="relative w-full h-full">
            {mobileBackgrounds.map((bg, idx) => (
              <img
                key={bg.src}
                src={bg.src}
                alt={bg.name}
                className={`absolute inset-0 w-full h-full object-cover object-center scale-[1.02] transition-opacity duration-1000 ease-in-out ${
                  idx === activeMobileIdx ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              />
            ))}
            {/* dark gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-[#090a0f]/45 to-transparent opacity-95 pointer-events-none" />
          </div>
        ) : !videoError ? (
          <video
            ref={videoRef}
            src="/videos/nikke-opening-new.webm"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onError={() => {
              setVideoError(true);
            }}
            className="w-full h-full object-cover object-center scale-[1.02]"
          />
        ) : (
          <div className="relative w-full h-full">
            <img
              src="/LobbyBackgroundMod/LobbyBackgroundOG.webp"
              alt="Nikke Cinematic Scene"
              className="w-full h-full object-cover object-center scale-[1.02] filter brightness-[0.6] contrast-[1.1]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-transparent to-transparent opacity-80" />
          </div>
        )}

        {/* overlay slot */}
        <div className="absolute inset-0 w-full h-full video-overlay-slot pointer-events-none z-[1]" />

        {/* bottom fade */}
        <div className="hero-video-fade z-[2]" />
      </div>

      {/* content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="max-w-3xl space-y-6">
          
          <SecurityAlertBanner />

          <h1 className="font-sans font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tighter leading-[1.04]">
            Faster modding.<br />
            <span className="text-neutral-400 font-bold">A cleaner framework. </span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 font-sans leading-relaxed max-w-2xl font-normal">
            This community wiki is for anyone who wants to start modding, doesn't matter if you want to make mods or just want to use them.
            Modding has never been easier; with the latest tools you can automate most, if not all asset extractions and swaps.
            Legacy modding guides are also available for those interested. 
          </p>

          {/* buttons */}
          <div className="pt-2">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#nmm-suite"
                className="group relative px-6 py-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.16] border border-white/[0.2] hover:border-white/50 text-white font-semibold text-sm tracking-tight transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.08)] hover:shadow-[0_0_26px_rgba(255,255,255,0.22)] flex items-center gap-2.5 cursor-pointer backdrop-blur-md active:scale-95"
              >
                <Download className="w-4 h-4 text-white group-hover:scale-110 group-hover:-translate-y-0.5 transition-all duration-200" />
                <span>Download NMM</span>
              </a>

              <button
                onClick={onExploreWorkshop}
                className="group relative px-6 py-3 rounded-xl bg-white/[0.07] hover:bg-white/[0.14] border border-white/[0.18] hover:border-white/40 text-neutral-100 hover:text-white font-medium text-sm tracking-tight transition-all duration-300 flex items-center gap-2.5 cursor-pointer backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.06)] hover:shadow-[0_0_24px_rgba(255,255,255,0.16)] active:scale-95"
              >
                <span>Explore 21 Guides</span>
                <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
              </button>

              <a
                href="https://discord.gg/nikke"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-5 py-3 rounded-xl bg-[#5865F2]/[0.12] hover:bg-[#5865F2]/[0.24] border border-[#5865F2]/[0.35] hover:border-[#5865F2]/[0.75] text-white font-medium text-sm tracking-tight transition-all duration-300 flex items-center gap-2.5 cursor-pointer backdrop-blur-md shadow-[0_0_20px_rgba(88,101,242,0.12)] hover:shadow-[0_0_28px_rgba(88,101,242,0.38)]"
                title="Join Nikke Community Discord Server"
              >
                <span className="text-[#8495f5] group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6 inline-flex items-center justify-center shrink-0">
                  <svg
                    className="w-4 h-4 fill-current drop-shadow-[0_0_6px_rgba(88,101,242,0.5)]"
                    viewBox="0 0 127.14 96.36"
                    aria-hidden="true"
                  >
                    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,45.91,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,45.91,96.12,53,91.08,65.69,84.69,65.69Z" />
                  </svg>
                </span>

                <span className="font-semibold text-neutral-100 group-hover:text-white transition-colors">
                  Nikke Community
                </span>

                <ArrowUpRight className="w-4 h-4 text-[#8495f5] group-hover:text-white transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </a>
            </div>

            {/* sub-meta notes */}
            <div className="pt-3.5 space-y-1.5 text-xs font-sans text-neutral-400">
              <div className="flex flex-wrap items-center">
                <span>• Cosmetics only, we hate cheaters. Don't even bother asking.</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span>• Wanna contribute? Join us, send a PR:</span>
                {/* clean neutral style */}
                <a
                  href="https://github.com/rwynx/nikke-modding-wiki"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] hover:border-white/20 text-neutral-200 hover:text-white transition-all group font-mono text-[11px] leading-none"
                >
                  <Github className="w-3.5 h-3.5 text-white shrink-0 group-hover:scale-110 group-hover:-rotate-6 transition-transform" />
                  <span className="leading-none relative top-[0.5px]">NIKKE Modding Wiki on Github</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover:text-white transition-colors shrink-0" />
                </a>

                {/* alternate glowing colored badge style (kept for quick swap)
                <a
                  href="https://github.com/rwynx/nikke-modding-wiki"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#5865F2]/[0.12] hover:bg-[#5865F2]/[0.24] border border-[#5865F2]/[0.35] hover:border-[#5865F2]/[0.75] text-neutral-100 hover:text-white transition-all duration-300 font-mono text-[11px] leading-none shadow-[0_0_16px_rgba(88,101,242,0.12)] hover:shadow-[0_0_24px_rgba(88,101,242,0.38)] backdrop-blur-md"
                >
                  <Github className="w-3.5 h-3.5 text-[#8495f5] group-hover:text-white group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 shrink-0 drop-shadow-[0_0_6px_rgba(88,101,242,0.5)]" />
                  <span className="leading-none relative top-[0.5px] font-semibold text-neutral-200 group-hover:text-white transition-colors">NIKKE Modding Wiki on Github</span>
                  <ArrowUpRight className="w-3 h-3 text-[#8495f5] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0" />
                </a>
                */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* controls */}
      {isMobile ? (
        <div className="absolute bottom-5 right-5 z-20 flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/[0.1] shadow-lg">
          {mobileBackgrounds.map((bg, idx) => (
            <button
              key={bg.id}
              onClick={() => setActiveMobileIdx(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeMobileIdx === idx
                  ? 'w-4 bg-white'
                  : 'w-1.5 bg-white/30 hover:bg-white/60'
              }`}
              title={`${idx + 1}/${mobileBackgrounds.length}: ${bg.name}`}
              aria-label={`Switch to ${bg.name}`}
            />
          ))}
        </div>
      ) : (
        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/[0.1] text-xs font-mono text-neutral-300">
          {!videoError ? (
            <>
              <button
                onClick={togglePlay}
                className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                title={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>

              <span className="text-neutral-600">|</span>

              <div className="flex items-center group/vol">
                <button
                  onClick={toggleMute}
                  className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                  title={isMuted ? 'Unmute video' : 'Mute video'}
                >
                  {isMuted || volume === 0 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span>{isMuted ? 'Unmute' : 'Mute'}</span>
                </button>

                {/* volume slider on hover */}
                <div className="max-w-0 overflow-hidden opacity-0 group-hover/vol:max-w-[120px] group-hover/vol:opacity-100 group-hover/vol:ml-2.5 transition-all duration-300 ease-out flex items-center gap-1.5">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-14 h-1 bg-white/20 hover:bg-white/30 rounded-lg appearance-none cursor-pointer accent-[rgb(160,225,255)]"
                    title={`Volume: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
                  />
                  <span className="text-[10px] text-neutral-400 font-mono w-6 text-right">
                    {Math.round((isMuted ? 0 : volume) * 100)}%
                  </span>
                </div>
              </div>
            </>
          ) : (
            <span className="flex items-center gap-1.5 text-[11px] text-neutral-400">
              <Terminal className="w-3 h-3 text-neutral-400" />
              <span>Drop video in /public/videos/nikke-opening-new.webm</span>
            </span>
          )}
        </div>
      )}
    </section>
  );
};

