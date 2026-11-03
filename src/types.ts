export interface NmmToolDownload {
  label: string;
  href: string;
  download?: boolean;
}

export interface NmmTool {
  name: string;
  maintainer: string;
  version?: string;
  note?: string;
  disclaimer?: string;
  unsupportedText?: string;
  features: string[];
  downloads: NmmToolDownload[];
}

export interface CharacterItem {
  id: string;
  name: string;
}

export type PageId = 'installation' | 'creation' | 'characters' | 'suggestions' | 'credits';

export interface GuideStep {
  stepNumber?: number;
  text: string;
  substeps?: string[];
  code?: string;
  image?: {
    src: string;
    alt: string;
    caption?: string;
  };
  video?: {
    embedUrl: string;
    title: string;
  };
  warning?: string;
  tip?: string;
}

export interface GuideSection {
  id: string;
  title: string;
  category?: string;
  badge?: string;
  description?: string;
  steps: GuideStep[];
  links?: Array<{ text: string; url: string; isDownload?: boolean }>;
  automationTip?: string;
}

