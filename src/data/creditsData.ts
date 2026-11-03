export interface Contributor {
  name: string;
  role: string;
  contribution: string;
  link?: string;
  kofiLink?: string;
  avatar?: string;
  badge?: string;
}

export const contributorsList: Contributor[] = [
  {
    name: 'Danieru',
    role: 'Pioneer',
    contribution: 'Created Nikke Mod Manager (NMM), Nikke Asset Downloader, and discovered the Face expression swap method.',
    link: 'https://discord.com/users/125013872074686464',
    badge: 'NMM TOOLS'
  },
  {
    name: 'Chizuru',
    role: 'NMM Developer',
    contribution: 'Developed Chizuru NMM with in-game hot-reload, voiceover, and custom auto-sorting features.',
    link: 'https://discord.com/users/1119420141936062466',
    badge: 'NMM TOOLS'
  },
  {
    name: 'Bingle',
    role: 'Core R. Engineer',
    contribution: 'Created Nikke Asset Unpacker (NAU), modded UABEA, created the NAU Key generator, and decrypted initial game catalog files.',
    link: 'https://discord.com/users/225480632866701312',
    badge: 'CORE RE'
  },
  {
    name: 'Lady',
    role: 'Original Wiki Maintainer & Author',
    contribution: 'Authored foundational step-by-step modding guides and documentation tutorials. Previous wiki maintainer.',
    link: 'https://discord.com/users/293918832760717313',
    badge: 'WIKI AUTHOR'
  },
  {
    name: 'a1teri',
    role: 'Tool Developer',
    contribution: 'Created the indispensable Nikke File Finder, authored instructions for portrait and icon swap mod pipelines.',
    link: 'https://github.com/A1ter00',
    badge: 'TOOLS'
  },
  {
    name: 'Na0h',
    role: 'Creator & NMM Dev',
    contribution: 'Authored foundational video tutorials for Spine & non-Spine modding, and maintained Na0h NMM variant.',
    link: 'https://www.patreon.com/c/Na0hMod',
    badge: 'NMM TOOLS'
  },
    {
    name: 'Rwyn',
    role: 'Modder & Wiki Maintainer',
    contribution: 'Made free mods, contributed in Nikke Modding Assistant (NMA / Nix Multitool) development, and currently maintains this Nikke Modding Wiki.',
    link: 'https://github.com/rwynx',
    badge: 'MODDER / WIKI'
  },
  {
    name: 'SkinnyMan',
    role: 'Mobile Modding Developer',
    contribution: 'Developed SkinnyMan Mod Dock (sneedv1.4), enabling PC-to-Mobile mod conversion and phone runtime docking.',
    link: 'https://discord.com/users/1486455485090500790',
    badge: 'MOBILE'
  },
  {
    name: 'KxdewxrdF2P',
    role: 'Master Tutorial Creator',
    contribution: 'Produced video guides for repacking, voice swaps, lobby animations, facial swaps, and discovered title/lobby mod processes.',
    link: 'http://discordapp.com/users/839970657357398048',
    badge: 'TUTORIALS'
  },
  {
    name: 'Koshirei',
    role: 'Web & Visualizer Dev',
    contribution: 'Built Nikke-DB visualizer, rewrote the NAU key generator in JavaScript, and engineered the naps-splitter tool.',
    link: 'https://github.com/Koshirei',
    badge: 'WEB APPS'
  },
  {
    name: 'Skuqre',
    role: 'Tool Developer',
    contribution: 'Created NKAS web viewer for exploring Nikke live spine animations in browser.',
    link: 'https://skuqre.github.io',
    badge: 'TOOLS'
  },
  {
    name: 'Nix',
    role: 'Archivist & Community Curator',
    contribution: 'Creator of the Nikke Modding Assistant - NMA (formerly Nix Multitool). Also created and still maintains the public free MEGA Nikke Mod Archive repository.',
    link: 'https://mega.nz/folder/KsdjEB4Q#HG-5KEPIOO6MeL33N_BlhQ/folder/q4snTJCT',
    kofiLink: 'https://ko-fi.com/silritinix',
    badge: 'ARCHIVE'
  },
  {
    name: 'Rockfield',
    role: 'Modder & Creator',
    contribution: 'Modder and also contributed in Nikke Modding Assistant (NMA) development.',
    link: 'https://discordapp.com/users/380444912291676160',
    badge: 'MODDER'
  },
  {
    name: 'Lorax',
    role: 'R. Engineer',
    contribution: 'Decrypted game catalog files and figured out the PC custom Key Binding mod architecture.',
    link: 'http://discordapp.com/users/520226693403770911',
    badge: 'RESEARCH'
  },
  {
    name: 'uShiro',
    role: 'Researcher & Guide Author',
    contribution: 'Figured out the voice swap process and produced video guides for burst animations and SD chibi models.',
    link: 'http://discordapp.com/users/269835113955721216',
    badge: 'GUIDES'
  },
  {
    name: 'Aelurum',
    role: 'Engine Tools Dev',
    contribution: 'Maintains the custom AssetStudio fork tailored for Unity games and mobile assets.',
    link: 'https://github.com/aelurum',
    badge: 'ASSET STUDIO'
  },
  {
    name: 'nesrak1',
    role: 'Engine Tools Dev',
    contribution: 'Created Unity Asset Bundle Extractor Avalonia (UABEA), the cornerstone of Unity asset modding.',
    link: 'https://github.com/nesrak1',
    badge: 'UABEA'
  },
  {
    name: 'Perfare',
    role: 'Engine Tools Dev',
    contribution: 'Original creator and architect of AssetStudio.',
    link: 'https://github.com/Perfare',
    badge: 'ASSET STUDIO'
  },
  {
    name: 'Sei Reiko',
    role: 'Patron & Supporter',
    contribution: 'Provided essential funding for the initial development of Nikke Mod Manager.',
    link: 'https://x.com/sei_reiko',
    badge: 'SPONSOR'
  },
  {
    name: 'Falzar',
    role: 'Co-Creator',
    contribution: 'Assisted in the design and engineering of early Nikke Mod Manager builds.',
    link: 'http://discordapp.com/users/119097537570406401',
    badge: 'CONTRIBUTOR'
  }
];

