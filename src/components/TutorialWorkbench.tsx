import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, 
  Play, 
  Clock, 
  User, 
  Download, 
  ExternalLink, 
  Film, 
  CheckCircle2, 
  Sparkles, 
  Code2, 
  Wrench, 
  FolderArchive, 
  Layers,
  Wand2,
  Tv,
  ListVideo,
  PlayCircle,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { SectionAnchor } from './SectionAnchor';

export interface TutorialVideo {
  id: string;
  seriesId: 'nma' | 'spine' | 'diagnostics';
  seriesName: string;
  badge: string;
  title: string;
  duration: string;
  instructor: string;
  instructorRole: string;
  videoSrc: string;
  isEmbed?: boolean;
  embedType?: 'mega' | 'youtube';
  description: string;
  chapters?: Array<{ time: number; label: string }>;
  downloads?: Array<{ label: string; url: string; isDownload?: boolean }>;
}

export const tutorialVideos: TutorialVideo[] = [
  {
    id: 'nma-tutorial',
    seriesId: 'nma',
    seriesName: 'Nikke Modding Assistant',
    badge: 'NMA GUIDE',
    title: 'NMA Walkthrough & Automated Swapper Guide',
    duration: '27 MB',
    instructor: 'Nix',
    instructorRole: 'Creator of NMA',
    videoSrc: '/videos/nma-tutorial.mp4',
    isEmbed: false,
    description:
      'Official walkthrough compiled by Nix demonstrating the complete Nikke Modding Assistant (NMA) workflow.',
    downloads: [
      { label: 'Download NMA (MEGA)', url: 'https://mega.nz/folder/KsdjEB4Q#HG-5KEPIOO6MeL33N_BlhQ/folder/q4snTJCT' },
      { label: 'Support Nix on Ko-fi', url: 'https://ko-fi.com/silritinix' },
      { label: 'Chizuru NMM', url: '#nmm-suite' }
    ]
  },
  {
    id: 'seireiko-part1',
    seriesId: 'spine',
    seriesName: 'Spine Pro 2D Rigging',
    badge: 'PART 01',
    title: 'Asset Import, Body Parts & Photoshop Prep',
    duration: '36 MB',
    instructor: 'Seireiko',
    instructorRole: 'Spine Modder',
    videoSrc: 'https://files.catbox.moe/q40x02.mp4',
    isEmbed: false,
    description:
      'Part 1 of Seireiko’s Rapi: Red Hood Cat Girl mod masterclass: extracting and importing raw assets into Spine Pro, generating new body parts, and preparing layered textures in Photoshop.',
    chapters: [
      { time: 0, label: '00:00 - Importing the asset into Spine' },
      { time: 180, label: '03:00 - Generating body parts' },
      { time: 420, label: '07:00 - Photoshopping the parts' },
    ],
    downloads: [
      { label: 'Spine Pro ($369)', url: 'http://esotericsoftware.com/' },
      { label: 'Adobe Photoshop', url: 'https://www.adobe.com/products/photoshop.html' }
    ]
  },
  {
    id: 'seireiko-part2',
    seriesId: 'spine',
    seriesName: 'Spine Pro 2D Rigging',
    badge: 'PART 02',
    title: 'Cat Ears Bone & Mesh Edits',
    duration: '40 MB',
    instructor: 'Seireiko',
    instructorRole: 'Spine Modder',
    videoSrc: 'https://files.catbox.moe/2ix5rx.mp4',
    isEmbed: false,
    description:
      'Part 2: Rigging cat ears in Spine Pro. Creating custom bone structures, mesh vertices, skin envelope weighting, and deformation controls.',
    chapters: [
      { time: 0, label: '00:00 - Cat ears bone structure' },
      { time: 240, label: '04:00 - Mesh vertices & edits' },
    ],
    downloads: [
      { label: 'Spine Pro ($369)', url: 'http://esotericsoftware.com/' },
      { label: 'Adobe Photoshop', url: 'https://www.adobe.com/products/photoshop.html' }
    ]
  },
  {
    id: 'seireiko-part3',
    seriesId: 'spine',
    seriesName: 'Spine Pro 2D Rigging',
    badge: 'PART 03',
    title: 'Tail Bone/Mesh Edits & Animation Checks',
    duration: '55 MB',
    instructor: 'Seireiko',
    instructorRole: 'Spine Modder',
    videoSrc: 'https://files.catbox.moe/55gqv7.mp4',
    isEmbed: false,
    description:
      'Part 3: Tail bone hierarchy attachment, mesh weighting, running animation timeline playback, and verifying client-side combat and lobby stances.',
    chapters: [
      { time: 0, label: '00:00 - Tail bone & mesh rigging' },
      { time: 300, label: '05:00 - Animation checks & playback' },
    ],
    downloads: [
      { label: 'Spine Pro ($369)', url: 'http://esotericsoftware.com/' },
      { label: 'Adobe Photoshop', url: 'https://www.adobe.com/products/photoshop.html' }
    ]
  },
  {
    id: 'lady-pink-fix',
    seriesId: 'diagnostics',
    seriesName: 'Diagnostics & Troubleshooting',
    badge: 'REPACK GUIDE',
    title: 'Fixing Pink Texture Glitch & Outdated Mods',
    duration: 'Repack Guide',
    instructor: 'Lady',
    instructorRole: 'Original Wiki Author',
    videoSrc: 'https://www.youtube-nocookie.com/embed/eE85rD1ulfM',
    isEmbed: true,
    embedType: 'youtube',
    description:
      'Step-by-step video guide by Lady explaining why characters turn bright neon pink in-game after major Nikke updates (due to shader unlinking or outdated bundle structures), and demonstrating how to export textures and repack them into clean game containers.',
    downloads: [
      { label: 'UABEA Modded (42 MB)', url: '/downloads/UABEA-Modded.7z', isDownload: true },
      { label: 'Chizuru NMM Auto-Repacker', url: '#nmm-suite' },
      { label: 'Download NMA (MEGA)', url: 'https://mega.nz/folder/KsdjEB4Q#HG-5KEPIOO6MeL33N_BlhQ/folder/q4snTJCT' }
    ]
  }
];

interface TutorialWorkbenchProps {
  initialVideoId?: string;
  onBack: () => void;
}

export const TutorialWorkbench: React.FC<TutorialWorkbenchProps> = ({ initialVideoId, onBack }) => {
  const [selectedId, setSelectedId] = useState<string>(initialVideoId || 'nma-tutorial');
  const [activeSeriesFilter, setActiveSeriesFilter] = useState<'all' | 'nma' | 'spine' | 'diagnostics'>('all');
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Sync when initialVideoId changes from external trigger
  useEffect(() => {
    if (initialVideoId) {
      setSelectedId(initialVideoId);
      const target = tutorialVideos.find(t => t.id === initialVideoId);
      if (target) {
        setActiveSeriesFilter(target.seriesId);
      }
    }
  }, [initialVideoId]);

  const currentVideo = tutorialVideos.find((t) => t.id === selectedId) || tutorialVideos[0];

  // Video reloading when switching non-embed videos
  useEffect(() => {
    if (!currentVideo.isEmbed && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [selectedId, currentVideo.isEmbed]);

  const handleSeek = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleFilterSelect = (filter: 'all' | 'nma' | 'spine' | 'diagnostics') => {
    setActiveSeriesFilter(filter);
    if (filter !== 'all') {
      const firstVideo = tutorialVideos.find(v => v.seriesId === filter);
      if (firstVideo) {
        setSelectedId(firstVideo.id);
      }
    }
  };

  const filteredPlaylist = activeSeriesFilter === 'all'
    ? tutorialVideos
    : tutorialVideos.filter(v => v.seriesId === activeSeriesFilter);

  return (
    <div className="min-h-screen bg-[#090a0f] text-[#e1e4ea] py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fade-in font-sans">
      
      {/* top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white text-xs font-mono transition-all border border-white/[0.08] cursor-pointer w-fit"
        >
          <ArrowLeft className="w-4 h-4 text-neutral-400" />
          <span>Back to Wiki Overview</span>
        </button>
      </div>

      {/* header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] text-neutral-300 text-xs font-mono">
            <Film className="w-3.5 h-3.5 text-[rgb(160,225,255)]" />
            <span>VIDEO LAB · WORKSHOP</span>
          </div>
          <SectionAnchor id="video-lab" label="video-lab" />
        </div>

        <h1 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span>Video Lab • Compiled by the community</span>
        </h1>

        <p className="text-sm sm:text-base text-neutral-400 font-sans max-w-3xl leading-relaxed">
          Curated community video walkthroughs, tool guides and Spine tutorials. 
          Click to filter by series below.
        </p>
      </div>

      {/* tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] w-fit">
        <button
          onClick={() => handleFilterSelect('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeSeriesFilter === 'all'
              ? 'bg-white text-black shadow-md'
              : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          All Guides ({tutorialVideos.length})
        </button>

        <button
          onClick={() => handleFilterSelect('nma')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeSeriesFilter === 'nma'
              ? 'bg-gradient-to-r from-[rgb(95,227,103)] to-emerald-400 text-black shadow-md'
              : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>NMA Guide (by Nix)</span>
        </button>

        <button
          onClick={() => handleFilterSelect('spine')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeSeriesFilter === 'spine'
              ? 'bg-gradient-to-r from-[rgb(160,225,255)] to-cyan-400 text-black shadow-md'
              : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          <Wand2 className="w-3.5 h-3.5" />
          <span>Spine Pro Guide (by Seireiko)</span>
        </button>

        <button
          onClick={() => handleFilterSelect('diagnostics')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeSeriesFilter === 'diagnostics'
              ? 'bg-gradient-to-r from-pink-400 to-rose-400 text-black shadow-md'
              : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Troubleshooting (by Lady)</span>
        </button>
      </div>

      {/* studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* player */}
        <div className="lg:col-span-8 space-y-6">
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-white/[0.1] shadow-2xl group">
            
            {/* Active Video HUD Badge */}
            <div className="absolute top-4 left-4 z-20 pointer-events-none flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/[0.12] text-xs font-mono shadow-md">
              <span className="w-2 h-2 rounded-full bg-[rgb(95,227,103)] animate-pulse" />
              <span className="text-[rgb(160,225,255)] font-bold">{currentVideo.badge}:</span>
              <span className="text-white truncate max-w-[220px] sm:max-w-[340px]">{currentVideo.title}</span>
            </div>

            {/* Video Player: Iframe for Embeds (MEGA / YouTube) or HTML5 Video for Direct MP4s */}
            {currentVideo.isEmbed ? (
              <iframe
                key={currentVideo.id}
                src={currentVideo.videoSrc}
                title={currentVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                allowFullScreen
                className="w-full h-full border-0 bg-black"
              />
            ) : (
              <video
                key={currentVideo.id}
                ref={videoRef}
                src={currentVideo.videoSrc}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain bg-black"
              />
            )}
          </div>

          {/* Current Video Metadata & Chapters */}
          <div className="epic-card p-6 sm:p-7 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-[rgb(160,225,255)] font-bold uppercase">{currentVideo.seriesName}</span>
                  <span className="text-neutral-500">•</span>
                  <span className="text-neutral-400">{currentVideo.badge}</span>
                </div>
                <h2 className="font-sans font-bold text-xl sm:text-2xl text-white tracking-tight mt-1">
                  {currentVideo.title}
                </h2>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-neutral-300 bg-white/[0.04] px-3 py-1.5 rounded-xl border border-white/[0.08] shrink-0 self-start sm:self-center">
                <User className="w-3.5 h-3.5 text-[rgb(160,225,255)]" />
                <span>By <strong className="text-white">{currentVideo.instructor}</strong> ({currentVideo.instructorRole})</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
              {currentVideo.description}
            </p>

            {/* Interactive Chapters (for Seireiko spine videos) */}
            {currentVideo.chapters && currentVideo.chapters.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                <span className="text-[11px] font-mono uppercase text-neutral-400 tracking-wider block">
                  Jump to Chapter:
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentVideo.chapters.map((ch, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSeek(ch.time)}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-xs font-mono text-neutral-300 hover:text-white border border-white/[0.06] transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Play className="w-2.5 h-2.5 text-[rgb(160,225,255)]" />
                      <span>{ch.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* tool downloads */}
            {currentVideo.downloads && currentVideo.downloads.length > 0 && (
              <div className="pt-2 border-t border-white/[0.06] space-y-2">
                <span className="text-[11px] font-mono uppercase text-neutral-400 tracking-wider block">
                  Relevant Tools for this Guide:
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentVideo.downloads.map((dl, idx) => (
                    <a
                      key={idx}
                      href={dl.url}
                      target={dl.isDownload || dl.url.startsWith('#') ? undefined : '_blank'}
                      rel={dl.isDownload || dl.url.startsWith('#') ? undefined : 'noopener noreferrer'}
                      download={dl.isDownload}
                      className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-xs font-mono text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <Download className="w-3 h-3 text-neutral-400" />
                      <span>{dl.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* source info */}
            <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] text-xs font-mono text-neutral-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 truncate">
                <Code2 className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span className="text-neutral-500">Source:</span>
                <code className="text-neutral-300 truncate">{currentVideo.videoSrc}</code>
              </span>
              <span className="text-[11px] text-[rgb(95,227,103)] font-medium shrink-0 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[rgb(95,227,103)] animate-pulse" />
                <span>{currentVideo.isEmbed ? (currentVideo.embedType === 'mega' ? 'Live Stream (MEGA)' : 'Live Stream (YouTube)') : (currentVideo.videoSrc.startsWith('/') ? 'Direct Stream (Wiki CDN)' : 'Live Direct Stream (Catbox CDN)')}</span>
              </span>
            </div>
          </div>
        </div>

        {/* playlist queue */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="epic-card p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2">
                <ListVideo className="w-4 h-4 text-[rgb(160,225,255)]" />
                <h3 className="font-sans font-bold text-base text-white tracking-tight">
                  Studio Playlist ({filteredPlaylist.length})
                </h3>
              </div>
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08]">
                {activeSeriesFilter === 'all' ? 'All Tracks' : activeSeriesFilter.toUpperCase()}
              </span>
            </div>

            <div className="space-y-2.5">
              {filteredPlaylist.map((video) => {
                const isSelected = video.id === currentVideo.id;
                return (
                  <button
                    key={video.id}
                    onClick={() => setSelectedId(video.id)}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-2 ${
                      isSelected
                        ? 'bg-[#151926] border-white text-white shadow-lg'
                        : 'bg-[#11131a] border-white/[0.08] text-neutral-400 hover:text-white hover:border-white/[0.16]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10.5px] font-mono mb-1">
                        <span className={`font-bold ${isSelected ? 'text-[rgb(160,225,255)]' : 'text-neutral-500'}`}>
                          {video.badge}
                        </span>
                        <span className="flex items-center gap-1 text-neutral-400">
                          <Clock className="w-3 h-3" />
                          <span>{video.duration}</span>
                        </span>
                      </div>
                      <h4 className="font-sans font-bold text-xs sm:text-[13px] line-clamp-2 tracking-tight text-neutral-200">
                        {video.title}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 pt-2 border-t border-white/[0.04]">
                      <span>By {video.instructor}</span>
                      {isSelected ? (
                        <span className="text-[rgb(95,227,103)] font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[rgb(95,227,103)] animate-pulse" />
                          NOW PLAYING
                        </span>
                      ) : (
                        <span className="text-neutral-500 group-hover:text-white flex items-center gap-1">
                          <Play className="w-2.5 h-2.5" />
                          Play
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* tools */}
          <div className="epic-card p-5 space-y-3">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-neutral-400" />
              <span>Recommended Modding Tools</span>
            </h4>
            <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
              Fast download links for essential software needed across these tutorials:
            </p>
            <div className="space-y-1.5 text-xs font-mono">
              <a
                href="#nmm-suite"
                onClick={onBack}
                className="flex items-center justify-between p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white transition-colors"
              >
                <span>Chizuru NMM (v1.2.1)</span>
                <ExternalLink className="w-3 h-3 text-neutral-400" />
              </a>
              <a
                href="https://mega.nz/folder/KsdjEB4Q#HG-5KEPIOO6MeL33N_BlhQ/folder/q4snTJCT"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white transition-colors"
              >
                <span>NMA (MEGA)</span>
                <ExternalLink className="w-3 h-3 text-neutral-400" />
              </a>
              <a
                href="/downloads/UABEA-Modded.7z"
                download
                className="flex items-center justify-between p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white transition-colors"
              >
                <span>UABEA Modded (42 MB)</span>
                <Download className="w-3 h-3 text-neutral-400" />
              </a>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
