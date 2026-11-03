import { GuideSection } from '../types';

export const suggestionsSections: GuideSection[] = [
  {
    id: 'texture-boundary',
    title: 'Atlas Texture Boundaries & Bleed',
    badge: 'TEXTURING',
    description: 'Understanding UV coordinates and boundary bleeding between mesh pieces.',
    steps: [
      {
        text: 'Atlas Partitioning: In 2D Spine models, multiple character parts (arms, thighs, weapons, hair strands) are packed into a single texture atlas.',
        warning: 'Always respect the texture boundaries. If you paint an outfit or skin outside the designated polygon UV boundary, it will bleed onto another part of the character (e.g. hair or weapon).'
      },
      {
        text: 'Use SpineViewer or Nikke-DB 2D visualizer to preview your modified atlas in real-time before repacking into UABEA.'
      }
    ]
  },
  {
    id: 'pma-vs-sta',
    title: 'PMA vs Straight Alpha & Halo Fix',
    badge: 'ALPHA BLENDING',
    description: 'The definitive guide to eliminating black outlines, white halos, and messy alpha edges.',
    steps: [
      {
        stepNumber: 1,
        text: 'Pre-Multiplied Alpha (PMA) in Unity: Game bundles store textures in PMA format (RGB values are multiplied by the alpha channel). If you paint directly on a PMA texture, semi-transparent pixels will produce distorted black outlines in-game.'
      },
      {
        stepNumber: 2,
        text: 'Solution - Convert to STA (Straight Alpha): Before editing, convert the texture to Straight Alpha via WWE or Nikke-DB. Edit comfortably with soft brushes and transparency, then convert back to PMA upon export.'
      },
      {
        stepNumber: 3,
        text: 'Paint.NET Transparency Ribbon Settings:',
        image: {
          src: '/Troubleshooting/PaintNetTransparency.webp',
          alt: 'Paint.NET transparency settings',
          caption: 'Recommended selection and antialiasing options in Paint.NET'
        },
        tip: 'Disable "Antialiasing" and "Selection Grow" when making selections to avoid bleeding alpha fringe.'
      },
      {
        stepNumber: 4,
        text: 'Photoshop Workflow without Paint.NET: In Photoshop, deselect Anti-aliasing on the tool options bar whenever using Magic Wand or Lasso tool.'
      }
    ]
  },
  {
    id: 'weapon-transparency',
    title: 'Weapon & Object Transparency Reduction',
    badge: 'OBJECT VISIBILITY',
    description: 'Make obstructive weapons or backpacks semi-transparent so you can see more character detail.',
    steps: [
      {
        stepNumber: 1,
        text: 'Paint.NET Method: Select the weapon or obstructive object on the canvas -> Cut and Paste onto a New Layer -> Go to Adjustments -> Hue/Saturation -> Lightness = -50 -> Double click layer -> Opacity = 100 -> Merge Layer Down and Save.'
      },
      {
        stepNumber: 2,
        text: 'Photoshop Method: Isolate weapon on a new layer -> Create Hue/Saturation adjustment clipped to weapon (Alt + Click between layers) -> Saturation = 50, Lightness = -80 -> Reduce weapon layer opacity to 10%~25% -> Quick Export as PNG.'
      }
    ]
  },
  {
    id: 'pro-examples',
    title: 'Professional Modder Walkthroughs',
    badge: 'PRO VIDEOS',
    description: 'Watch experienced community creators craft custom Nikkes from scratch.',
    steps: [
      {
        text: 'Demonstration 1: Full character overhaul WITHOUT Spine (pure atlas repainting & UV alignment):',
        video: {
          embedUrl: 'https://www.youtube-nocookie.com/embed/Zv6pV50zsiE?rel=0',
          title: 'Modding Without Spine by Na0h'
        }
      },
      {
        text: 'Demonstration 2: Full character overhaul WITH Spine software (advanced bone rigging and custom attachments):',
        video: {
          embedUrl: 'https://www.youtube-nocookie.com/embed/NSyUZOxKDXg?rel=0',
          title: 'Advanced Modding With Spine'
        }
      }
    ]
  }
];

