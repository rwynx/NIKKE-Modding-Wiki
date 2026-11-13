import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Shuffle, 
  Repeat, 
  Volume2, 
  VolumeX, 
  ChevronUp, 
  ChevronDown, 
  Disc, 
  ExternalLink,
  Music2,
  ListMusic
} from 'lucide-react';

export const PLAYLIST_ID = 'PLMxxEsMsXkfg';

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
  }
}

export const JukeboxPlayer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(10);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoop, setIsLoop] = useState(true);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isReady, setIsReady] = useState(false);
  
  const [playlistIndex, setPlaylistIndex] = useState(0);
  const [playlistTotal, setPlaylistTotal] = useState(1);

  // meta
  const [trackMeta, setTrackMeta] = useState({
    title: 'RWX Jukebox',
    artist: 'Cosmograph & NIKKE Artists',
    album: 'GODDESS OF VICTORY: NIKKE OST',
    badge: 'RWX Jukebox',
    coverImage: 'https://img.youtube.com/vi/6ZurVZcVU-U/maxresdefault.jpg',
    videoId: '6ZurVZcVU-U',
  });

  const playerRef = useRef<any>(null);
  const timeUpdateInterval = useRef<number | null>(null);

  const updateTrackData = (target: any) => {
    try {
      if (!target || typeof target.getVideoData !== 'function') return;
      const data = target.getVideoData();
      if (data && data.video_id) {
        const rawTitle: string = data.title || 'RWX Jukebox';
        let cleanTitle = rawTitle;
        let album = 'GODDESS OF VICTORY: NIKKE OST';
        let badge = 'RWX Jukebox';

        if (rawTitle.includes('|')) {
          const parts = rawTitle.split('|');
          cleanTitle = parts[0].trim();
          const right = parts[1].trim();
          if (right) album = right;
        } else if (rawTitle.includes(' - ')) {
          const parts = rawTitle.split(' - ');
          cleanTitle = parts.slice(1).join(' - ').trim();
        }

        setTrackMeta({
          title: cleanTitle,
          artist: data.author || 'Cosmograph',
          album: album,
          badge: data.author || badge,
          coverImage: `https://img.youtube.com/vi/${data.video_id}/maxresdefault.jpg`,
          videoId: data.video_id,
        });

        const dur = target.getDuration?.();
        if (dur) setDuration(dur);

        const idx = target.getPlaylistIndex?.();
        if (typeof idx === 'number') setPlaylistIndex(idx);

        const list = target.getPlaylist?.();
        if (Array.isArray(list) && list.length > 0) setPlaylistTotal(list.length);
      }
    } catch (err) {
      console.warn('Error reading video data', err);
    }
  };

  useEffect(() => {
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.async = true;
      document.head.appendChild(tag);
    }

    let container = document.getElementById('jukebox-yt-host');
    if (!container) {
      container = document.createElement('div');
      container.id = 'jukebox-yt-host';
      container.style.position = 'fixed';
      container.style.top = '-9999px';
      container.style.left = '-9999px';
      container.style.width = '1px';
      container.style.height = '1px';
      container.style.opacity = '0';
      container.style.pointerEvents = 'none';
      document.body.appendChild(container);
    }

    let target = document.getElementById('jukebox-yt-player-target');
    if (!target) {
      target = document.createElement('div');
      target.id = 'jukebox-yt-player-target';
      container.appendChild(target);
    }

    const initPlayer = () => {
      if (window.YT && window.YT.Player && !playerRef.current) {
        playerRef.current = new window.YT.Player('jukebox-yt-player-target', {
          height: '100',
          width: '100',
          playerVars: {
            listType: 'playlist',
            list: PLAYLIST_ID,
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: (event: any) => {
              setIsReady(true);
              try {
                event.target.setVolume(10);
                event.target.setLoop(isLoop);
                updateTrackData(event.target);
                // autoplay
                event.target.playVideo();
              } catch (e) {
                console.warn('YT ready error', e);
              }
            },
            onStateChange: (event: any) => {
              if (event.data === 1) {
                setIsPlaying(true);
                updateTrackData(event.target);
              } else if (event.data === 2) {
                setIsPlaying(false);
              } else if (event.data === 0) {
                updateTrackData(event.target);
              } else if (event.data === 5 || event.data === -1) {
                updateTrackData(event.target);
              }
            },
          },
        });

        // gesture fallback
        const tryPlayOnGesture = () => {
          if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
            playerRef.current.setVolume(10);
            playerRef.current.playVideo();
          }
        };
        window.addEventListener('click', tryPlayOnGesture, { once: true });
        window.addEventListener('scroll', tryPlayOnGesture, { once: true });
        window.addEventListener('touchstart', tryPlayOnGesture, { once: true });
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (timeUpdateInterval.current) {
        clearInterval(timeUpdateInterval.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      timeUpdateInterval.current = window.setInterval(() => {
        if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
          const cur = playerRef.current.getCurrentTime();
          setCurrentTime(cur);
          const dur = playerRef.current.getDuration();
          if (dur && dur !== duration) setDuration(dur);
        }
      }, 400);
    } else {
      if (timeUpdateInterval.current) {
        clearInterval(timeUpdateInterval.current);
      }
    }

    return () => {
      if (timeUpdateInterval.current) {
        clearInterval(timeUpdateInterval.current);
      }
    };
  }, [isPlaying, duration]);

  const togglePlay = () => {
    if (!playerRef.current || !isReady) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const nextTrack = () => {
    if (!playerRef.current) return;
    playerRef.current.nextVideo();
    setTimeout(() => updateTrackData(playerRef.current), 300);
  };

  const prevTrack = () => {
    if (!playerRef.current) return;
    playerRef.current.previousVideo();
    setTimeout(() => updateTrackData(playerRef.current), 300);
  };

  const toggleShuffle = () => {
    if (!playerRef.current) return;
    const nextVal = !isShuffle;
    setIsShuffle(nextVal);
    playerRef.current.setShuffle(nextVal);
  };

  const toggleLoop = () => {
    if (!playerRef.current) return;
    const nextVal = !isLoop;
    setIsLoop(nextVal);
    playerRef.current.setLoop(nextVal);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
      playerRef.current.seekTo(newTime, true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setVolume(val);
    if (isMuted && val > 0) setIsMuted(false);
    if (playerRef.current && typeof playerRef.current.setVolume === 'function') {
      playerRef.current.unMute();
      playerRef.current.setVolume(val);
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
      playerRef.current.setVolume(volume);
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      {/* jukebox */}
      <div className={`fixed z-40 select-none font-sans transition-all duration-300 ${
        isOpen 
          ? 'bottom-12 left-4 sm:left-6' 
          : 'bottom-3 left-4'
      }`}>
        
        {isOpen ? (
          <div className="w-[310px] sm:w-[350px] bg-[#0c0e16]/95 backdrop-blur-2xl border border-white/[0.12] rounded-3xl p-5 shadow-[0_24px_70px_rgba(0,0,0,0.85)] animate-in fade-in zoom-in-95 duration-200 relative overflow-hidden text-white">
            
            {/* glow */}
            <div 
              className="absolute -top-20 -left-20 w-52 h-52 rounded-full opacity-25 blur-3xl pointer-events-none transition-all duration-700"
              style={{
                background: isPlaying 
                  ? 'radial-gradient(circle, rgba(160,225,255,0.8) 0%, rgba(139,92,246,0.3) 100%)' 
                  : 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 100%)'
              }}
            />

            {/* header */}
            <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-white/[0.08] relative z-10">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-md bg-white/[0.08] text-[rgb(160,225,255)]">
                  <Music2 className="w-3.5 h-3.5" />
                </span>
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-neutral-300">
                  RWX Jukebox
                </span>
                {playlistTotal > 1 && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/[0.06] text-neutral-300 border border-white/[0.1]">
                    {playlistIndex + 1} / {playlistTotal}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1">
                <a
                  href={`https://www.youtube.com/playlist?list=${PLAYLIST_ID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-full hover:bg-white/[0.1] text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  title="View playlist on YouTube"
                >
                  <ListMusic className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/[0.1] text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  title="Minimize player"
                  type="button"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="relative mb-4 group">
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/[0.1] shadow-lg bg-black">
                <img
                  src={trackMeta.coverImage}
                  alt={trackMeta.title}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('hqdefault')) {
                      target.src = `https://img.youtube.com/vi/${trackMeta.videoId}/hqdefault.jpg`;
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {isPlaying && (
                  <div className="absolute bottom-2.5 left-2.5 flex items-end gap-1 px-2 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/[0.1]">
                    <span className="w-1 bg-[rgb(95,227,103)] animate-[bounce_0.8s_infinite] h-3 rounded-full" />
                    <span className="w-1 bg-[rgb(160,225,255)] animate-[bounce_0.6s_infinite_0.2s] h-4 rounded-full" />
                    <span className="w-1 bg-[rgb(139,92,246)] animate-[bounce_0.7s_infinite_0.4s] h-2.5 rounded-full" />
                    <span className="text-[10px] font-mono text-neutral-300 ml-1">PLAYING</span>
                  </div>
                )}

                <a
                  href={`https://www.youtube.com/watch?v=${trackMeta.videoId}&list=${PLAYLIST_ID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-neutral-300 hover:text-white border border-white/[0.1] transition-all cursor-pointer"
                  title="Open music video on YouTube"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="space-y-1 mb-4 text-left">
              <h4 className="font-bold text-white text-base tracking-tight truncate leading-tight">
                {trackMeta.title}
              </h4>
              <p className="text-xs text-neutral-400 truncate">
                {trackMeta.artist}
              </p>
              <p className="text-[11px] font-mono text-neutral-500 truncate">
                {trackMeta.album}
              </p>
            </div>

            <div className="space-y-1 mb-4">
              <div className="relative flex items-center group">
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-white/[0.1] rounded-lg appearance-none cursor-pointer accent-[rgb(160,225,255)] hover:bg-white/[0.2] transition-colors"
                  style={{
                    background: `linear-gradient(to right, rgb(160,225,255) 0%, rgb(160,225,255) ${progressPercent}%, rgba(255,255,255,0.1) ${progressPercent}%, rgba(255,255,255,0.1) 100%)`
                  }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 mb-4">
              <button
                onClick={toggleShuffle}
                className={`p-2 rounded-full transition-colors cursor-pointer ${
                  isShuffle 
                    ? 'text-[rgb(160,225,255)] bg-[rgb(160,225,255)]/[0.12]' 
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
                title={isShuffle ? 'Shuffle On' : 'Shuffle Off'}
                type="button"
              >
                <Shuffle className="w-4 h-4" />
              </button>

              <button
                onClick={prevTrack}
                disabled={!isReady}
                className="p-2 rounded-full text-neutral-300 hover:text-white transition-colors cursor-pointer disabled:opacity-40"
                title="Previous Track"
                type="button"
              >
                <SkipBack className="w-5 h-5 fill-current" />
              </button>

              <button
                onClick={togglePlay}
                disabled={!isReady}
                className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-[0_0_25px_rgba(255,255,255,0.35)] disabled:opacity-50"
                type="button"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-current" />
                ) : (
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                )}
              </button>

              <button
                onClick={nextTrack}
                disabled={!isReady}
                className="p-2 rounded-full text-neutral-300 hover:text-white transition-colors cursor-pointer disabled:opacity-40"
                title="Next Track"
                type="button"
              >
                <SkipForward className="w-5 h-5 fill-current" />
              </button>

              <button
                onClick={toggleLoop}
                className={`p-2 rounded-full transition-colors cursor-pointer ${
                  isLoop 
                    ? 'text-[rgb(160,225,255)] bg-[rgb(160,225,255)]/[0.12]' 
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
                title={isLoop ? 'Loop Enabled' : 'Loop Disabled'}
                type="button"
              >
                <Repeat className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2.5 pt-2 border-t border-white/[0.06] px-1">
              <button
                onClick={toggleMute}
                className="text-neutral-400 hover:text-white transition-colors cursor-pointer p-0.5"
                type="button"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-3.5 h-3.5 text-red-400" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5" />
                )}
              </button>
              <input
                type="range"
                min={0}
                max={100}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-full h-1 bg-white/[0.1] rounded-lg appearance-none cursor-pointer accent-[rgb(160,225,255)]"
              />
              <span className="text-[10px] font-mono text-neutral-400 w-7 text-right">
                {isMuted ? '0%' : `${volume}%`}
              </span>
            </div>

          </div>
        ) : (

          <div 
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-2 px-2.5 py-1.5 bg-[#0c0e16]/90 hover:bg-[#0c0e16] backdrop-blur-xl border border-white/[0.12] hover:border-white/[0.25] rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.6)] transition-all duration-300 cursor-pointer max-w-[190px] sm:max-w-[215px]"
            title="Click to expand RWX Jukebox"
          >
            <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0 border border-white/[0.2]">
              <img
                src={trackMeta.coverImage}
                alt={trackMeta.title}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('hqdefault')) {
                    target.src = `https://img.youtube.com/vi/${trackMeta.videoId}/hqdefault.jpg`;
                  }
                }}
                className={`w-full h-full object-cover ${isPlaying ? 'animate-[spin_6s_linear_infinite]' : ''}`}
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-[#0c0e16] border border-white/50" />
            </div>

            <div className="flex-1 min-w-0 pr-0.5 text-left">
              <span className="block text-[11px] font-medium text-white tracking-tight truncate leading-tight group-hover:text-[rgb(160,225,255)] transition-colors">
                {trackMeta.title}
              </span>
              <div className="flex items-center gap-1 mt-0.5">
                {isPlaying ? (
                  <div className="flex items-end gap-0.5 h-1.5 shrink-0">
                    <span className="w-0.5 bg-[rgb(95,227,103)] animate-[bounce_0.6s_infinite] h-1.5 rounded-full" />
                    <span className="w-0.5 bg-[rgb(160,225,255)] animate-[bounce_0.5s_infinite_0.15s] h-2 rounded-full" />
                    <span className="w-0.5 bg-[rgb(139,92,246)] animate-[bounce_0.7s_infinite_0.3s] h-1.5 rounded-full" />
                  </div>
                ) : (
                  <Disc className="w-2 h-2 text-neutral-500 shrink-0" />
                )}
                <span className="text-[9.5px] text-neutral-400 font-sans truncate">
                  {trackMeta.artist}
                </span>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              disabled={!isReady}
              className="p-1 rounded-full bg-white/[0.08] hover:bg-white/[0.2] text-white transition-all cursor-pointer shrink-0 disabled:opacity-50"
              type="button"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-3 h-3 fill-current" />
              ) : (
                <Play className="w-3 h-3 fill-current ml-0.5" />
              )}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(true);
              }}
              className="p-0.5 rounded-full text-neutral-500 group-hover:text-neutral-300 transition-colors shrink-0"
              type="button"
              title="Expand player"
            >
              <ChevronUp className="w-3 h-3" />
            </button>
          </div>
        )}

      </div>
    </>
  );
};
