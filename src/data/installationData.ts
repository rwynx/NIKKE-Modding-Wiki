import { GuideSection } from '../types';

export const installationSections: GuideSection[] = [
  {
    id: 'prerequisites',
    title: 'Before We Start',
    badge: 'MUST READ',
    description: 'Fundamental safety, anti-cheat distinction, and requirements for Nikke modding.',
    steps: [
      {
        text: 'Visual & Aesthetic Only: Modding in Nikke is purely cosmetic. It changes character models, outfits, physics, title screens, and install screens without granting unfair gameplay advantages.',
        tip: 'Any modification to character stats or unfair advantages is strictly considered a "Cheat" and will result in an account ban.'
      },
      {
        text: 'Risk Advisory: Modding is community-driven and not officially supported by Shift Up or Level Infinite. While ban reports for cosmetic mods are nonexistent, always proceed at your own discretion.',
        warning: 'Use mods at your own risk. Never share screenshots showing your in-game UID with mods active.'
      },
      {
        text: 'PC Client Exclusive: Nikke Mod Manager (NMM) and mod injectors ONLY work on the official PC version of Nikke. Modding is not supported on Android, iOS, or iPadOS.'
      },
      {
        text: 'Full Game Termination Requirement: Never install or patch mods while Nikke is running. Always close the game, exit system tray, and ensure processes like unitycrashhandler64.exe and tbs_browser.exe are stopped in Task Manager.'
      }
    ]
  },
  {
    id: 'tools-overview',
    title: 'Essential Tools & Community Repos',
    badge: 'CORE TOOLS',
    description: 'Everything you need to download, manage, and install mods automatically.',
    steps: [
      {
        text: 'Download a Nikke Mod Manager (NMM): Choose between Danieru (Official Standard), Chizuru (Full-featured with Live-modding), or Na0h manager depending on your workflow.',
        tip: 'Use the interactive comparison matrix above to view feature differences and direct download links.'
      },
      {
        text: 'Community Mod Repositories: Browse hundreds of community-made mods across character overhauls, uncensored outfits, and dynamic animations.'
      }
    ],
    links: [
      { text: 'Discord Community Server', url: 'https://discord.gg/nikke' },
      { text: 'Free Community Mod Archive (MEGA)', url: 'https://mega.nz/folder/KsdjEB4Q#HG-5KEPIOO6MeL33N_BlhQ' },
      { text: 'Download Official NMM (v1.x)', url: '/downloads/NMM.zip', isDownload: true }
    ]
  },
  {
    id: 'installing-mod',
    title: 'How to Install Mods with NMM',
    badge: 'INSTALL GUIDE',
    description: 'Follow this exact sequence to ensure your mods hook into the game files seamlessly.',
    steps: [
      {
        stepNumber: 1,
        text: 'Close Nikke completely. Verify that the Nikke icon does not exist in the system tray and UnityCrashHandler64 is not running.'
      },
      {
        stepNumber: 2,
        text: 'Crucial: Place your NMM folder on the exact SAME storage drive as your Nikke installation (e.g., both on C: drive or both on D: drive) to allow symbolic links.',
        image: {
          src: '/ModInstallation/DownloadNMM.webp',
          alt: 'NMM placed in same drive as Nikke',
          caption: 'NMM and NIKKE game folder on the same partition'
        }
      },
      {
        stepNumber: 3,
        text: 'Launch nmm.exe. If running for the first time, grant Administrator privileges if prompted.'
      },
      {
        stepNumber: 4,
        text: 'Region Selection & Patch Path Configuration:',
        substeps: [
          'GLOBAL Region (Global, Japan, Korea, NA, SEA): Default path auto-detected.',
          'HMT Region (Hong Kong, Macau, Taiwan): Go to Settings and set Patch Path to: C:/NIKKE/Unity/comgamamobi勝利女神：妮姬/com.shiftup.patch/',
          'CN Region (China server): DO NOT click "Patch Game". CN client uses a different asset pipeline.'
        ],
        code: 'C:/NIKKE/Unity/comgamamobi勝利女神：妮姬/com.shiftup.patch/'
      },
      {
        stepNumber: 5,
        text: 'If this is your first time launching NMM or the game received an update, click "Patch Game" button in NMM.'
      },
      {
        stepNumber: 6,
        text: 'Extract and paste your downloaded mod folders into the "mods" directory inside your NMM folder.'
      },
      {
        stepNumber: 7,
        text: 'Click "Refresh Mod List" in NMM. Check the boxes next to the mods you wish to enable (ensure no conflicting mods for the same character).'
      },
      {
        stepNumber: 8,
        text: 'Click "Apply Mods" and wait 5~10 seconds until the configuration completes. Close NMM and launch Nikke!',
        tip: 'Make sure your in-game Graphics setting is set to HIGH. Spine texture layers for mods only render on High settings.'
      }
    ]
  },
  {
    id: 'uninstalling-mod',
    title: 'Uninstalling or Swapping Mods',
    badge: 'UNINSTALL',
    description: 'Safely reverting your characters and game files back to vanilla.',
    steps: [
      {
        stepNumber: 1,
        text: 'Ensure the Nikke game is closed.'
      },
      {
        stepNumber: 2,
        text: 'Open NMM and simply uncheck the checkboxes beside the mods you want to remove.'
      },
      {
        stepNumber: 3,
        text: 'Click "Apply Mods". NMM will delete the symlinks and restore default game links in seconds.'
      }
    ]
  },
  {
    id: 'troubleshooting',
    title: 'General Troubleshooting & Common Fixes',
    badge: 'DIAGNOSTICS',
    description: 'Resolve missing textures, invisible characters, crashes, or symlink errors.',
    steps: [
      {
        text: 'High Graphics Requirement: Always verify that Graphics Quality in Nikke in-game settings is set to "High". Mods will not display or will glitch on Medium or Low settings.',
        warning: 'Graphics must be set to High for Spine models to load custom texture maps.'
      },
      {
        text: 'Same Drive & NTFS Format: NMM relies on Windows NTFS symbolic links. If you run Nikke or NMM from an external USB drive, ensure it is formatted as NTFS, NOT FAT32 or exFAT.'
      },
      {
        text: 'NMM Clean Re-apply Cycle: If a mod fails to show up after an update:',
        substeps: [
          '1. Uncheck and disable the mod in NMM, then click Apply.',
          '2. Open Nikke Official Launcher, click Game Settings (gear icon) -> Repair.',
          '3. Launch the game once, let it reach the lobby, then exit.',
          '4. Re-open NMM, enable your mod, and click Apply Mods.',
          '5. If it still crashes or turns invisible, the mod is outdated and needs repacking.'
        ]
      },
      {
        text: 'Aim/Cover Freezing & Physics Mod Outdated: If your character freezes or fails to open aim/cover stance, check if you have spinephysicssettings_assets_all installed. Outdated physics files must be repacked with the latest game patch keys.'
      }
    ]
  },
  {
    id: 'loading-screen-stuck',
    title: 'Loading Screen Stuck at 43% (4/7) Fix',
    badge: 'CRITICAL FIX',
    description: 'The definitive solution for corrupted addressable bundles and infinite loading screens.',
    steps: [
      {
        stepNumber: 1,
        text: 'Close Nikke and terminate any background game processes in Task Manager.'
      },
      {
        stepNumber: 2,
        text: 'Press Win + R, paste the following path, and press Enter:',
        code: '%USERPROFILE%\\AppData\\LocalLow\\com_proximabeta\\NIKKE\\com.shiftup.addressables'
      },
      {
        stepNumber: 3,
        text: 'Delete everything inside the com.shiftup.addressables folder. This forces the launcher to re-verify clean manifests.'
      },
      {
        stepNumber: 4,
        text: 'Open the Nikke Launcher, click the Gear icon, and click "Repair". Allow it to download missing files.'
      },
      {
        stepNumber: 5,
        text: 'Launch Nikke. When you reach "Tap to Continue" / "Enter to Continue" on the title screen, close both the game and launcher.'
      },
      {
        stepNumber: 6,
        text: 'Navigate to your Nikke game install folder and delete UnityCrashHandler64.exe.'
      },
      {
        stepNumber: 7,
        text: 'Open NMM as Administrator, verify the game path points to your nikke.exe, re-apply your mods, and launch the game!'
      }
    ]
  }
];

