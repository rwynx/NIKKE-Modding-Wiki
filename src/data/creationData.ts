import { GuideSection } from '../types';

export const creationSections: GuideSection[] = [
  {
    id: 'creation-tools',
    title: 'Modding Toolkits',
    badge: 'TOOLKIT',
    category: 'Fundamentals',
    description: 'The standard utilities required to unpack, decrypt, modify, and repack Nikke Unity bundles.',
    steps: [
      {
        text: 'Download and set up the fundamental modding & asset extraction tools below.'
      },
      {
        text: 'Keep all modding tools in a dedicated "Nikke Modding" folder on the same partition/drive as your game installation.'
      }
    ],
    links: [
      { text: 'UABEA Modded (Unity Asset Bundle Extractor)', url: '/downloads/UABEA-Modded.7z', isDownload: true },
      { text: 'Nikke Modding Assistant - NMA (former Nix Multitool)', url: 'https://mega.nz/folder/KsdjEB4Q#HG-5KEPIOO6MeL33N_BlhQ/folder/q4snTJCT' },
      { text: 'Adobe Photoshop (Official)', url: 'https://www.adobe.com/products/photoshop.html' },
      { text: 'Photopea (Free Web Photoshop)', url: 'https://www.photopea.com/' },
      { text: 'PhotoCraft (Open-Source PS Clone)', url: 'https://github.com/storytold/photocraft' },
      { text: 'Spine Pro (Esoteric Software)', url: 'http://esotericsoftware.com/' },
      { text: 'Asset Studio (Aelurum Fork)', url: 'https://github.com/aelurum/AssetStudio/releases' },
      { text: 'Asset Studio (Perfare Fork)', url: 'https://github.com/Perfare/AssetStudio/releases' },
      { text: 'Nikke File Finder (by a1teri)', url: 'https://a1ter00.github.io/nikke-file-finder/' },
      { text: 'Nikke-DB Spine Visualizer', url: 'https://nikke-db.pages.dev/visualiser' },
      { text: 'NKAS Web Viewer', url: 'https://nkas.pages.dev/viewer/' },
      { text: 'HexEd.it Web Editor', url: 'https://hexed.it/' },
      { text: 'Notepad++', url: 'https://notepad-plus-plus.org/downloads/' },
      { text: 'JSON Viewer Plugin for Notepad++', url: 'https://sourceforge.net/projects/nppjsonviewer/' },
      { text: 'Everything Search', url: 'https://www.voidtools.com/downloads/' },
      { text: 'SpineViewerWPF', url: 'https://github.com/kiletw/SpineViewerWPF' },
      { text: 'Waifu Wallpaper Engine (WWE)', url: 'https://mega.nz/folder/Yi8h1DwD#1ZXXHblizPtK3rrKCoUiRg' }
    ]
  },
  {
    id: 'installing-modding-tools',
    title: 'Installing the Modding Tools',
    badge: 'SETUP',
    category: 'Fundamentals',
    description: 'Proper directory layout for NAU, UABEA, and AssetStudio.',
    steps: [
      {
        stepNumber: 1,
        text: 'Download your chosen modding tools into the same drive partition where Goddess of Victory: NIKKE is installed.',
        image: {
          src: '/ModdingToolInstallation/DownloadModdingTools.webp',
          alt: 'Tools on the same drive',
          caption: 'Download all packages to the same drive partition'
        }
      },
      {
        stepNumber: 2,
        text: 'Extract each modding tool into its own separate subfolder for a clean workspace.',
        image: {
          src: '/ModdingToolInstallation/ExtractModdingTools.webp',
          alt: 'Extract tools into clean folders',
          caption: 'Extracted directories: NAU, UABEA, AssetStudio'
        }
      }
    ]
  },
  {
    id: 'extracting-assets',
    title: 'Extracting & Decrypting Game Assets',
    badge: 'EXTRACTION',
    category: 'Fundamentals',
    description: 'How to acquire raw 2D and Spine assets from Nikke addressables.',
    automationTip: "Chizuru NMM and Nikke Modding Assistant (NMA) have automated extraction tools.\n You can fetch and decrypt assets directly in the manager without using manual scripts.",
    steps: [
      {
        stepNumber: 1,
        text: 'Automated Method (Chizuru NMM / Nikke Modding Assistant - NMA):\nOpen your mod manager, navigate to the Download/Assets tab, search for the Nikke character or bundle, and click "Download". The manager fetches, decrypts, and organizes bundle files automatically.'
      },
      {
        stepNumber: 2,
        text: 'Manual Method (Nikke Asset Downloader CLI / NAU):\nIf extracting assets manually without a mod manager, install Python dependencies and run the downloader CLI against game catalogs:',
        code: 'pip install zstandard pycryptodome\npython index.py manifest\npython index.py ls <project> <regex>\npython index.py get <project> <regex> <out-dir>'
      },
      {
        stepNumber: 3,
        text: 'Game Cache & Addressable Directory Paths:\nRaw game bundles and addressable catalogs are located at:',
        substeps: [
          'Addressables: %USERPROFILE%\\Appdata\\LocalLow\\com_proximabeta\\NIKKE\\com.shiftup.addressables',
          'Voice Audio: \\NIKKE\\Unity\\com_proximabeta_NIKKE\\saus\\ja\\ab',
          'StreamingAssets: \\NIKKE\\NIKKE\\game\\nikke_Data\\StreamingAssets'
        ]
      }
    ]
  },
  {
    id: 'character-mod',
    title: 'Character Skins (Aim, Cover, Standing)',
    badge: 'CHARACTER MOD',
    category: 'Character Modding',
    description: 'Modifying character 2D Spine meshes, costumes, textures, and stances.',
    automationTip: "Chizuru NMM and Nikke Modding Assistant (NMA) have integrated Skin Swappers.\n",
    steps: [
      {
        stepNumber: 1,
        text: 'Locate Character Code & Bundle:\nFind the target character code (e.g. c010 for Dorothy, c810 for 2B, c100 for Rapi) using Nikke File Finder or our Character ID database tab. Find the corresponding bundle in your addressables or download via CLI.'
      },
      {
        stepNumber: 2,
        text: 'Legacy Decryption (NAU):\nDrag the raw bundle file onto "NikkeAssetUnpacker.exe". This generates a decrypted "[character].bundle" file.\nNote: Most modern Nikke assets are already decrypted in recent patches, meaning you can open them directly in AssetStudio without NAU.'
      },
      {
        stepNumber: 3,
        text: 'Export Assets with AssetStudio:\nOpen "AssetStudioGUI.exe" and drag the decrypted "[character].bundle" into the window. Switch to the "Asset List" tab and filter by:\n• TextAsset (cxxx_nn.atlas and cxxx_nn.skel)\n• Texture2D (.png textures)\nSelect them all, right click → "Export selected assets", and save them to a project folder.'
      },
      {
        stepNumber: 4,
        text: 'Rename Skeleton & Atlas Files:\nRename the exported Spine files by appending .txt:\n• cxxx_nn.skel → cxxx_nn.skel.txt\n• cxxx_nn.atlas → cxxx_nn.atlas.txt\nThis allows UABEA to import them as valid text assets.'
      },
      {
        stepNumber: 5,
        text: 'Multi-texture Atlas Notice:\nSome Nikkes contain multiple texture atlas pages (MultipleTexture1, MultipleTexture2). Check all pages before repacking.',
        image: {
          src: '/CharacterMod/MultipleTexture1.webp',
          alt: 'Multiple texture atlas 1',
          caption: 'Page 1 atlas map'
        }
      },
      {
        stepNumber: 6,
        text: 'Edit Textures in Image Editor:\nImport the Texture2D (.png) files into Photoshop, Paint.NET, or GIMP. Modify the textures as desired.\nTip: Follow PMA (Premultiplied Alpha) guidelines to avoid white or dark halo borders along texture outlines.',
        image: {
          src: '/CharacterMod/MultipleTexture2.webp',
          alt: 'Multiple texture atlas 2',
          caption: 'Page 2 atlas map'
        }
      },
      {
        stepNumber: 7,
        text: 'Open Base Bundle in UABEA:\nOpen "UABEAvalonia.exe" from your UABEA folder. Drag your base [character].bundle onto "UABEAvalonia.exe". Click on the "Memory" button on the popup window, then click on the "Info" button to open the Asset Info window.'
      },
      {
        stepNumber: 8,
        text: 'Import Modified Texture2D:\n• Look for the Texture2D file type, check the filename, select it, and click "Plugins" on the right side.\n• Select "Edit Texture" and click "Ok".\n• At the bottom of the popup window, click "Load" beside Texture.\n• Select the edited .png file matching the asset name, and click "Save".\n• If there are multiple texture pages (e.g. cxxx_nn.png and cxxx_nn_2.png), select each Texture2D entry and load its matching .png.'
      },
      {
        stepNumber: 9,
        text: 'Import Modified Atlas:\nSelect the .atlas TextAsset entry in the Asset Info list. Click "Plugins" → "Import .txt" → "Ok". Select your renamed cxxx_nn.atlas.txt and click "Open".'
      },
      {
        stepNumber: 10,
        text: 'Import Modified Skeleton:\nSelect the .skel TextAsset entry in the list. Click "Plugins" → "Import .txt" → "Ok". Select your renamed cxxx_nn.skel.txt and click "Open".'
      },
      {
        stepNumber: 11,
        text: 'Save Bundle Container:\n• In the Asset Info window, click File → Save → Ok, then close the Asset Info window.\n• On the main UABEA window, click File → Save → Ok. This writes all modifications into the [character].bundle file.'
      },
      {
        stepNumber: 12,
        text: 'Compress with LZ4 & NMM Naming Convention:\n• Drag the updated .bundle onto "UABEAvalonia.exe" again.\n• Click File → Compress.\n• Set the filename following NMM standard: [cxxx]_[nn]_[pose]_[authorname]_[modname]\nExample: c810_00_aim_author_2B\n• Choose "LZ4" compression and wait for it to complete. Your character mod is ready!'
      }
    ]
  },
  {
    id: 'repacking-mod',
    title: 'Repacking Old Character Mods',
    badge: 'REPACK',
    category: 'Character Modding',
    description: 'Injecting legacy mod assets into fresh vanilla containers after game updates.',
    automationTip: "Chizuru NMM includes a built-in automated Repacker and live hot-reloader.\nConsider using it to skip manual UABEA file rebuilding.",
    steps: [
      {
        stepNumber: 1,
        text: 'Decrypt / Prepare Legacy Mod:\nIf the old mod file is encrypted or does not follow NMM standard, drag it onto "NikkeAssetUnpacker.exe" to decrypt. Skip if already an unencrypted bundle.'
      },
      {
        stepNumber: 2,
        text: 'Extract Assets with AssetStudio:\n• Open "AssetStudioGUI.exe" and drag the old mod .bundle into it.\n• Go to the "Asset List" tab, select all TextAsset (.atlas, .skel) and Texture2D (.png) files.\n• Right click → "Export selected assets" into a project directory.'
      },
      {
        stepNumber: 3,
        text: 'Rename Extensions:\nRename the exported .skel and .atlas files to .skel.txt and .atlas.txt (e.g. cxxx_nn.skel.txt and cxxx_nn.atlas.txt).'
      },
      {
        stepNumber: 4,
        text: 'Obtain Clean Vanilla Bundle:\nDownload or extract a fresh, updated vanilla bundle file of the character from the game cache or via NMM Download.'
      },
      {
        stepNumber: 5,
        text: 'Inject Assets into Fresh Bundle via UABEA:\n• Open fresh vanilla bundle in UABEAvalonia → click "Memory" → click "Info".\n• Import Texture2D: Select Texture2D → Plugins → Edit Texture → Load old mod PNG → Save.\n• Import Atlas: Select .atlas TextAsset → Plugins → Import .txt → choose old mod .atlas.txt.\n• Import Skeleton: Select .skel TextAsset → Plugins → Import .txt → choose old mod .skel.txt.'
      },
      {
        stepNumber: 6,
        text: 'Save & Compress:\n• On Asset Info window, click File → Save → Ok, then close Asset Info.\n• On UABEA main window, click File → Save → Ok.\n• Drag the updated bundle back into UABEA → File → Compress → choose "LZ4".\n• Name following NMM standard: [cxxx]_[nn]_[pose]_[author]_[modname].'
      },
      {
        stepNumber: 7,
        text: 'Follow the comprehensive video walkthrough below for a visual step-by-step tutorial:',
        video: {
          embedUrl: 'https://www.youtube-nocookie.com/embed/eE85rD1ulfM?rel=0',
          title: 'Repacking Nikke Mods Tutorial'
        }
      }
    ]
  },
  {
    id: 'physics-fix',
    title: 'Physics Fix Mod (Breasts & Hair Motion)',
    badge: 'PHYSICS',
    category: 'Character Modding',
    description: 'Unlocking or tweaking dynamic Spine physics settings and transferring jiggle physics between characters.',
    steps: [
      {
        stepNumber: 1,
        text: 'Locate Physics Settings Bundle:\nIn the catalog or Nikke File Finder, filter by character ID (e.g. c810) to identify the character\'s physics files and the master "spinephysicssettings_assets_all" container.',
        image: {
          src: '/PhysicsFix/PhysicsSettingsBundle.png',
          alt: 'Physics settings bundle file',
          caption: 'spinephysicssettings bundle in UABEA'
        }
      },
      {
        stepNumber: 2,
        text: 'Extract Master Physics Bundle:\nLocate "spinephysicssettings_assets_all" in your addressables ("naps" folder). Copy it to your workspace and decrypt with NAU if required.'
      },
      {
        stepNumber: 3,
        text: 'Open in UABEA & Sort Containers:\nDrag the decrypted bundle onto UABEAvalonia.exe → click "Memory" → click "Info". Click the "Container" column header to sort all entries alphabetically by container path.'
      },
      {
        stepNumber: 4,
        text: 'Export Donor Physics (Export Raw):\nFind the container path for the donor character with bouncy physics. Select the entry, click "Export Raw", and save the raw physics binary file.'
      },
      {
        stepNumber: 5,
        text: 'Inject Target Physics (Import Raw):\nFind the container path of the target character you want to fix. Select the entry, click "Import Raw", and select the raw file exported from step 4.'
      },
      {
        stepNumber: 6,
        text: 'Save & Compress with LZ4:\n• In Asset Info, click File → Save → Ok, then close Asset Info.\n• On UABEA main window, click File → Save, then File → Close.\n• Drag updated bundle back into UABEA → File → Compress → choose "LZ4".\n• Rename compressed output to "spinephysicssettings_assets_all" and install via NMM or game folder.'
      }
    ]
  },
  {
    id: 'effect-remove',
    title: 'Effect Removal (Muzzle Flash, Hit FX & Skills)',
    badge: 'EFFECT REMOVE',
    category: 'Audio & FX',
    description: 'Remove blinding weapon muzzle flashes, smoke puffs, and screen-cluttering particle effects.',
    steps: [
      {
        stepNumber: 1,
        text: 'Identify Effect Bundle in Catalog:\nOpen core-catalog.json (or decrypted addressable catalog) in Notepad++ with JSON Viewer plugin. Search for:\n• effect-spot-player_skill_library_assets_fx\n• or character-specific FX such as effect-spot-player_skill_library_assets_fx_c810\nCopy the hash string bundle name (e.g. [hash].bundle) found at the end of the line.'
      },
      {
        stepNumber: 2,
        text: 'Locate & Open in UABEA:\nLocate the hash in your addressables ("naps" folder) or using Everything search. Drag the bundle into UABEAvalonia → Memory → Info.'
      },
      {
        stepNumber: 3,
        text: 'Export Effect Texture2D:\nIn the Asset Info window, sort by "Type". Find the Texture2D assets representing the muzzle flash or particle sprites. Select the texture, click "Plugins" → "Export Texture" → "Ok", and strip any -CAB suffix from the exported PNG.'
      },
      {
        stepNumber: 4,
        text: 'Blank Out Particles in Image Editor:\nOpen the PNG in Paint.NET, Photoshop, or GIMP. Select all and delete contents to make the entire canvas completely transparent (alpha 0). Save as PNG.'
      },
      {
        stepNumber: 5,
        text: 'Re-import Transparent Texture:\nIn UABEA Asset Info, select the same Texture2D entry → click "Plugins" → "Edit Texture" → click "Load" beside Texture → select your transparent PNG → click "Save".'
      },
      {
        stepNumber: 6,
        text: 'Save & Compress with LZ4:\n• Click File → Save in Asset Info, then File → Save in UABEA main window.\n• Drag the file back into UABEA → File → Compress → choose "LZ4" → Save.\n• Place the compressed bundle into your mod directory or addressables folder to eliminate unwanted visual effects in combat.'
      }
    ]
  },
  {
    id: 'voice-swap',
    title: 'Voiceover & Dialogue Swap',
    badge: 'AUDIO',
    category: 'Audio & FX',
    description: 'Replacing character combat lines, lobby greetings, and burst shoutouts.',
    automationTip: "Chizuru NMM natively automates Voiceover and Subtitle replacement without navigating obscure directory trees.",
    steps: [
      {
        stepNumber: 1,
        text: 'Locate Character Voice Bundles:\nNavigate to your Nikke voice addressables folder:\n%USERPROFILE%\\Appdata\\LocalLow\\com_proximabeta\\NIKKE\\saus\\ja\\ab (or your voice language locale).\nSort files by size, open the 4~5MB catalog .json in Notepad++ (Plugins → JSON Viewer → JSON Format), and search for "voice_required_pc_cxxx". Copy the hash from voice_required_pc_cxxx_assets_all_[hash].bundle.'
      },
      {
        stepNumber: 2,
        text: 'Locate __data File:\nNavigate to:\n%USERPROFILE%\\AppData\\LocalLow\\Unity\\com_proximabeta_NIKKE\\[hash]\nLocate the "__data" bundle inside.'
      },
      {
        stepNumber: 3,
        text: 'Export Resource & AudioClips from Donor Character:\n• Open donor character\'s __data in UABEA → click Memory.\n• Select "CAB-xxx.resource" (not serialized) and click "Export" to save the audio resource container.\n• Next, select "CAB-xxx" → click Info → sort by Type.\n• Select every "AudioClip" asset and click "Export Raw" into a designated folder.\n• Close Asset Info and click File → Close.'
      },
      {
        stepNumber: 4,
        text: 'Inject into Target Character __data:\n• Open target character\'s __data in UABEA → Memory.\n• Import the .resource file saved from the donor (click "No" when asked "Is this asset serialized?").\n• Select "CAB-xxx" → Info → sort by Type.\n• Select an AudioClip → click "Edit Data". Copy the first part of "string m_Source" (e.g. archive:/CAB-target/). Close Edit Data.\n• Click "Import Raw" and select the replacement raw audio clip from the donor.\n• Click "Edit Data" again: update "string m_Source" and adjust "string m_Name" to match the target character code and line number (e.g. c032_Kill_Monster_1). Click Ok.\n• Repeat this procedure for all remaining AudioClips.'
      },
      {
        stepNumber: 5,
        text: 'Save, Compress & Reinstall:\n• In Asset Info, File → Save. On UABEA main window, click File → Save as "data".\n• Close and reopen "data" in UABEA → File → Compress → LZ4 → Name as "__data".\n• Replace the original __data in the target character\'s folder.'
      },
      {
        stepNumber: 6,
        text: 'Watch the complete audio replacement walkthrough:',
        video: {
          embedUrl: 'https://www.youtube-nocookie.com/embed/s0dssl2854I?rel=0',
          title: 'Voice Swap Video Guide'
        }
      }
    ]
  },
  {
    id: 'burst-swap',
    title: 'Burst Animation Swap',
    badge: 'BURST FX',
    category: 'Animation',
    description: 'Replace character ultimate burst cutscenes with any custom video or animation.',
    automationTip: "Chizuru NMM supports full-screen lobby and burst cutscene swapping.",
    steps: [
      {
        stepNumber: 1,
        text: 'Locate Burst Cutscene Bundles:\nOpen Nikke File Finder, select "Burst(Battle)" from the filter dropdown, and locate both the donor and target character cutscene bundles.'
      },
      {
        stepNumber: 2,
        text: 'Extract Target Character Identifier:\nOpen target character\'s burst bundle in UABEA → Memory → Info. Search for .bundle entry, click "Edit Data", press Ctrl+H, find "First", and copy the hash string beside "1 string First =".'
      },
      {
        stepNumber: 3,
        text: 'Inject into Donor Burst Cutscene:\n• Open replacement donor cutscene bundle in UABEA → Memory → Info.\n• Find .bundle → Edit Data → replace "First" string with target\'s hash string.\n• Find "GameObject EventScene_[cxxx]_cutscene" → Edit Data → update "string m_Name" to match target character code.\n• File → Save in Asset Info, File → Save in main window.'
      },
      {
        stepNumber: 4,
        text: 'Compress with LZ4 & NMM Convention:\n• Drag saved bundle into UABEA → File → Compress → LZ4.\n• Rename output as: spotskillcutscene_assets_[cxxx]_[nn]_cut_scene\nExample: spotskillcutscene_assets_c821_00_cut_scene'
      },
      {
        stepNumber: 5,
        text: 'Watch the comprehensive burst animation replacement video:',
        video: {
          embedUrl: 'https://www.youtube-nocookie.com/embed/RpgUo0Eoggw?rel=0',
          title: 'Burst Animation Swap Guide'
        }
      }
    ]
  },
  {
    id: 'portrait-swap',
    title: 'Character Portrait Swap (Medium Portrait)',
    badge: 'PORTRAIT',
    category: 'UI & Cosmetics',
    description: 'Modifying or swapping squad selection medium portraits (character card visuals).',
    automationTip: "Chizuru NMM includes built-in Portrait and Icon Swappers.",
    steps: [
      {
        stepNumber: 1,
        text: 'Locate Medium Portrait Bundles:\nIn Nikke File Finder, select "Portrait(Medium)" from the dropdown menu to find the bundle hash for both donor and target characters. Decrypt both bundles with NAU if needed.',
        image: {
          src: '/PortraitMod/PortraitSwap.webp',
          alt: 'Portrait swap demonstration',
          caption: 'Replacing squad portrait UI asset'
        }
      },
      {
        stepNumber: 2,
        text: 'Export Donor Sprite & Texture:\n• Open donor decrypted portrait bundle in UABEA → Memory → Info.\n• Find "Sprite" in Type column → click "Edit Data" → Select All (Ctrl+A) and Copy (Ctrl+C). Close Edit Data.\n• Find "Texture2D" in Type column → click "Plugins" → "Export Texture" → "Ok" to save the donor PNG.\n• In UABEA main window, click File → Close.'
      },
      {
        stepNumber: 3,
        text: 'Inject into Target Character Portrait:\n• Open target character\'s decrypted portrait bundle in UABEA → Memory → Info.\n• Find "Sprite" in Type column → click "Edit Data" → Paste the copied sprite parameters from donor → click "Ok".\n• Find "Texture2D" in Type column → click "Plugins" → "Edit Texture" → click "Load" next to Texture → select the exported donor PNG → click "Save".'
      },
      {
        stepNumber: 4,
        text: 'Save & Compress with LZ4:\n• In Asset Info, click File → Save → Ok, then close Asset Info.\n• On main UABEA window, click File → Save, then File → Close.\n• Drag updated bundle into UABEA → File → Compress → choose "LZ4".\n• Rename output file following NMM format:\nicons-char-mi(hd)_assets_mi_[cxxx]_[nn]_s\nExample: icons-char-mi(hd)_assets_mi_c810_01_s'
      }
    ]
  },
  {
    id: 'icon-swap',
    title: 'Character Squad Icon Swap (Small Icon)',
    badge: 'ICON MOD',
    category: 'UI & Cosmetics',
    description: 'Customizing the small round/square squad battle icons and avatars.',
    automationTip: "Chizuru NMM includes built-in Squad Icon Swappers.",
    steps: [
      {
        stepNumber: 1,
        text: 'Locate icons-char-si(hd)_assets_all:\nIn Nikke File Finder, copy the name from "Portrait(Small)" text field. Locate the file in your addressables ("naps" folder) and decrypt with NAU if required.',
        image: {
          src: '/IconMod/IconBundle.webp',
          alt: 'Icon bundle search',
          caption: 'Locating icons-char-si(hd)_assets_all'
        }
      },
      {
        stepNumber: 2,
        text: 'Inspect in UABEA:\nDrag decrypted icons-char-si(hd)_assets_all bundle into UABEA → click Memory → Info.'
      },
      {
        stepNumber: 3,
        text: 'Transfer Sprite Data:\n• Find the donor character and skin in the list. Select the unit icon entry and click "Edit Data". Copy the highlighted text and close Edit Data.\n• Find the target character and skin you wish to replace. Select its icon entry, click "Edit Data", replace the highlighted text with the copied donor text, and click "Ok".',
        image: {
          src: '/IconMod/IconSwap.webp',
          alt: 'Icon swap in UABEA',
          caption: 'Replacing icon sprite definition'
        }
      },
      {
        stepNumber: 4,
        text: 'Save & Compress:\n• In Asset Info, File → Save. In main window, File → Save.\n• Drag updated bundle back into UABEA → File → Compress → choose "LZ4".\n• Name the compressed file: icons-char-si(hd)_assets_all\n• Place into your mod directory or addressables folder.'
      }
    ]
  },
  {
    id: 'face-expression-swap',
    title: 'Face Expression Hex Editing',
    badge: 'EXPRESSIONS',
    category: 'Character Modding',
    description: 'Alter default character expressions (blushing, smiling, wink, yandere) in combat/lobby using HexEd.it.',
    steps: [
      {
        stepNumber: 1,
        text: 'Extract Character Skeleton (.skel):\nLocate character bundle in "naps" folder, copy and decrypt with NAU if needed. Open in UABEA → Memory → Info. Select .skel TextAsset → Plugins → Export → name as cxxx_nn.skel.txt.',
        image: {
          src: '/FaceMod/HexIdle.png',
          alt: 'HexEd.it Idle expression search',
          caption: 'Locating idle facial bone attachments in hex view'
        }
      },
      {
        stepNumber: 2,
        text: 'Check Available Expressions:\nOpen Nikke-DB Spine Visualizer for your character and inspect animation names (e.g. idle, smile, angry, pain, shock).'
      },
      {
        stepNumber: 3,
        text: 'Open Skeleton in HexEd.it:\nVisit HexEd.it and open your exported cxxx_nn.skel.txt file.'
      },
      {
        stepNumber: 4,
        text: 'Search Target Expression:\nIn HexEd.it search bar, type "idle" and press Enter until you locate "idle" without any underscores. Note the single hex byte preceding "i": you will see "05" (4 letters for i-d-l-e plus 1 length byte).'
      },
      {
        stepNumber: 5,
        text: 'Calculate & Insert Byte Differences:\nIf replacing with "smile" (5 letters + 1 = 6 bytes / "06"):\n• Right-click "05", click "Insert bytes here...", add difference of 1, and apply.\n• Double-click the inserted byte and set value to "06".\n• Overwrite ASCII text: change each consecutive byte to match "s m i l e".'
      },
      {
        stepNumber: 6,
        text: 'Balance File Length (Crucial):\nSearch for "smile" elsewhere in the skeleton to replace it with "idle" so total file size remains identical:\n• Right-click the last letter "e" of "smile" and select "Delete this byte".\n• Change the preceding length byte from "06" to "05".\n• Change "s m i l" to "i d l e".\nTip: Preserving the exact file length avoids skeleton deserialization crashes.'
      },
      {
        stepNumber: 7,
        text: 'Export & Re-import into UABEA:\n• Export modified file from HexEd.it.\n• In UABEA Asset Info, select .skel TextAsset → Plugins → Import .txt → select modified file.\n• File → Save in Asset Info, File → Save in main window.\n• Compress with LZ4 in UABEA and rename as [cxxx]_[nn]_[pose]_[author]_[modname].'
      },
      {
        stepNumber: 8,
        text: 'Video Guide for Face Expression Swapping:',
        video: {
          embedUrl: 'https://www.youtube-nocookie.com/embed/p5f5enbJpRE?rel=0',
          title: 'Face Expression Swap Guide'
        }
      }
    ]
  },
  {
    id: 'sd-model-swap',
    title: 'SD Chibi Model Swap',
    badge: 'SD CHIBI',
    category: 'Animation',
    description: 'Modify or swap the 3D/Spine chibi character running in exploration, outpost, and mini-games.',
    steps: [
      {
        stepNumber: 1,
        text: 'Locate SD Chibi Bundles:\nIn Nikke File Finder, select "SD-Model" from dropdown and retrieve bundle files for both donor and target chibi characters. Decrypt both with NAU if needed.'
      },
      {
        stepNumber: 2,
        text: 'Extract Target Identifier in UABEA:\nOpen target chibi bundle in UABEA → Memory → Info. Search for .bundle entry, click "Edit Data", press Ctrl+H, find "First", and copy the hash string beside "1 string First =".'
      },
      {
        stepNumber: 3,
        text: 'Inject into Replacement SD Bundle:\nOpen donor SD chibi bundle in UABEA → Memory → Info. Find .bundle → Edit Data → paste the target "First" hash string. Save Asset Info, then Save main window.'
      },
      {
        stepNumber: 4,
        text: 'Compress with LZ4 & Rename:\nReopen saved bundle in UABEA → File → Compress → LZ4. Rename output as:\nsdcharacters_assets_[cxxx]_[nn]_var\nExample: sdcharacters_assets_c810_00_var'
      },
      {
        stepNumber: 5,
        text: 'Watch the complete SD chibi model replacement walkthrough:',
        video: {
          embedUrl: 'https://www.youtube-nocookie.com/embed/JFR-73aLjxA?rel=0',
          title: 'SD Model Swap Tutorial'
        }
      }
    ]
  },
  {
    id: 'lobby-animation-swap',
    title: 'Lobby Animation Swap (Burst & Wallpaper Scenes)',
    badge: 'LOBBY SCENE',
    category: 'Animation',
    description: 'Swap full-motion lobby burst scenes and event cutscenes with any character wallpaper.',
    steps: [
      {
        stepNumber: 1,
        text: 'Locate Wallpaper Scene Bundle:\nOpen decrypted catalog in Notepad++ with JSON Viewer. Search for character code to find:\nlivewallpaperprefabs_assets_livewallpaper/eventscene_[cxxx]_[nn]_cutscene_[hash].bundle\nCopy the hash string and locate the file in "naps" addressables. Decrypt with NAU if needed.'
      },
      {
        stepNumber: 2,
        text: 'Extract Target Scene Identifiers:\nOpen target character\'s cutscene bundle in UABEA → Memory → Info:\n• Sort by Type, select "AssetBundle" → click "Edit Data" → Ctrl+H search "First" and copy string.\n• Find "GameObject EventScene_[cxxx]_cutscene" → Edit Data → copy string beside "1 string m_Name =". Close UABEA.'
      },
      {
        stepNumber: 3,
        text: 'Inject into Donor Scene Bundle:\nOpen donor wallpaper bundle in UABEA → Memory → Info:\n• Find "AssetBundle" → Edit Data → paste target "First" string.\n• Find "GameObject EventScene_[cxxx]_cutscene" → Edit Data → paste target "m_Name" string.\n• File → Save in Asset Info, then File → Save in main window.'
      },
      {
        stepNumber: 4,
        text: 'Compress with LZ4 & Apply NMM Naming:\n• Click File → Compress → choose LZ4.\n• Rename output as: eventscene_[cxxx]_[nn]_cutscene\nExample: eventscene_c810_cutscene\n• Copy into your NMM mod directory.'
      }
    ]
  },
  {
    id: 'lobby-background-mod',
    title: 'Lobby Background Customization',
    badge: 'LOBBY',
    category: 'UI & Cosmetics',
    description: 'Put custom high-resolution wallpapers or animated backdrops behind your squad.',
    automationTip: "Chizuru NMM supports lobby background making/swaps without manual bundle hex editing.",
    steps: [
      {
        stepNumber: 1,
        text: 'Original vs Stretched Aspect Ratio:\nIn-game lobby backgrounds are square textures stretched across widescreen monitors. Align your subject inside the focal guide template to avoid distortion or clipping on ultrawide displays.',
        image: {
          src: '/LobbyBackgroundMod/LobbyBackgroundStretched.webp',
          alt: 'Lobby background stretched comparison',
          caption: 'Stretched vs 16:9 canvas fitting'
        }
      },
      {
        stepNumber: 2,
        text: 'Focal Safe-Zone Template:\nFit your artwork inside the black focal zone of the guide template below before saving.',
        image: {
          src: '/LobbyBackgroundMod/FitWithinBlack.png',
          alt: 'Fit within black guide template',
          caption: 'Fit custom art within the active safe-zone'
        }
      },
      {
        stepNumber: 3,
        text: 'Locate & Extract icons-lobby_bg(hd)_assets_all:\nOpen decrypted catalog in Notepad++, search for "icons-lobby_bg(hd)_assets_all", and copy the hash from the bundle name. Find the bundle in "naps" addressables and decrypt with NAU.'
      },
      {
        stepNumber: 4,
        text: 'Inject Wallpaper in UABEA:\n• Open decrypted bundle in UABEA → Memory → Info.\n• Find Texture2D named "lbg_lobby" → click Plugins → Edit Texture → Load (beside Texture) → choose custom wallpaper PNG → click Save.\n• File → Save in Asset Info, File → Save as "icons-lobby_bg(hd)_assets_all" in main window.'
      },
      {
        stepNumber: 5,
        text: 'Compress with LZ4:\nReopen in UABEA → File → Compress → choose "LZ4" → Save as icons-lobby_bg(hd)_assets_all.'
      },
      {
        stepNumber: 6,
        text: 'Full video guide on converting and injecting high-definition custom backgrounds:',
        video: {
          embedUrl: 'https://www.youtube-nocookie.com/embed/oEjY6mPXTzk?rel=0',
          title: 'Lobby Background Modding Guide'
        }
      }
    ]
  },
  {
    id: 'title-install-screens',
    title: 'Title & Installation Screen Mods',
    badge: 'TITLE SCREEN',
    category: 'UI & Cosmetics',
    description: 'Change the opening splash screen and installer art without needing NMM.',
    steps: [
      {
        stepNumber: 1,
        text: 'Standalone Video Replacements in StreamingAssets:\nTitle and installation screens are standalone MP4 videos located directly in game folders without hook injectors.',
        image: {
          src: '/TitleScreenMod/TitleScreen1.webp',
          alt: 'Custom Title Screen Sample',
          caption: 'Custom opening visual replace'
        }
      },
      {
        stepNumber: 2,
        text: 'Replacing Title Screen Video (mov_title.mp4):\n• Navigate to: \\NIKKE\\NIKKE\\game\\nikke_Data\\StreamingAssets\n• Back up existing "mov_title.mp4" to a safe folder.\n• Place your custom video here and rename it to "mov_title.mp4".\n• Video must be encoded in MP4 (MPEG-4 / H.264). Note that square cropping applies on PC.',
        image: {
          src: '/TitleScreenMod/TitleScreen2.webp',
          alt: 'Title Screen Aspect Cropping',
          caption: 'Video aspect ratio cropping preview'
        }
      },
      {
        stepNumber: 3,
        text: 'Replacing Installation Screen Video (install_mov.mp4):\n• In the same StreamingAssets folder, back up "install_mov.mp4".\n• Place your custom video and rename it to "install_mov.mp4" (MPEG-4 codec).'
      },
      {
        stepNumber: 4,
        text: 'Title Screen Mod Video Walkthrough:',
        video: {
          embedUrl: 'https://www.youtube-nocookie.com/embed/wS83dEHLkZ8?rel=0',
          title: 'Title Screen Modding Walkthrough'
        }
      },
      {
        stepNumber: 5,
        text: 'Installation Screen Mod Video Walkthrough:',
        video: {
          embedUrl: 'https://www.youtube-nocookie.com/embed/7bdbXXHKnUo?rel=0',
          title: 'Installation Screen Modding Walkthrough'
        }
      }
    ]
  },
  {
    id: 'key-bindings',
    title: 'Custom PC Key Binding Mod',
    badge: 'CONTROLS',
    category: 'Advanced',
    description: 'Rebind manual aim, burst keys, and cover shortcuts beyond default PC settings.',
    steps: [
      {
        stepNumber: 1,
        text: 'Locate DefaultKeySetting.json:\nNavigate to your Nikke installation path:\n\\NIKKE\\NIKKE\\game\\nikke_Data\\StreamingAssets\\Settings\\KeyMap\\DefaultKeySetting.json'
      },
      {
        stepNumber: 2,
        text: 'Edit Key Mappings:\nOpen DefaultKeySetting.json in Notepad++ or VS Code and edit key codes according to the schematic below:',
        image: {
          src: '/KeyBindingMod/KeyBindings.png',
          alt: 'Key binding configuration mapping',
          caption: 'Key bindings internal mapping schematic'
        }
      }
    ]
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting & Common Fixes',
    badge: 'DIAGNOSTICS',
    category: 'Advanced',
    description: 'Solutions for pink textures, misaligned Spine meshes, and transparency halo artifacts.',
    steps: [
      {
        stepNumber: 1,
        text: 'Pink / Missing Textures Fix:\nIf your modded character displays solid magenta/pink, open the character\'s atlas.txt file in a text editor. Ensure line 1 matches the exact character skin code being replaced (e.g. c810_00). A mismatched atlas header prevents Unity from binding textures to Spine bones.'
      },
      {
        stepNumber: 2,
        text: 'Spine Mesh Misalignment & Broken UVs:\nIf swapped character textures appear distorted, fragmented, or misaligned, the texture resolution does not match the dimensions specified in the atlas header.',
        image: {
          src: '/Troubleshooting/TextureResize1.webp',
          alt: 'Texture resize misalignment issue',
          caption: 'Texture dimensions mismatch vs atlas declaration'
        }
      },
      {
        stepNumber: 3,
        text: 'Texture Resizing Procedure (Paint.NET):\n• Open the .atlas.txt file and note the width and height on line 2 (e.g., size: 2048, 2048).\n• Open the mod PNG in Paint.NET.\n• Press Ctrl + R to open Canvas/Image Resize.\n• Uncheck "Maintain aspect ratio" and enter the exact dimensions specified in the atlas.\n• Press Ctrl + S to save as PNG with 32-bit depth.',
        image: {
          src: '/Troubleshooting/TextureResize2.png',
          alt: 'Paint.NET image resize dialog',
          caption: 'Adjusting image dimensions to match atlas size'
        }
      },
      {
        stepNumber: 4,
        text: 'Premultiplied Alpha (PMA) Transparency Halos:\nTo eliminate white or dark outlines around Spine character edges, ensure your image editing software exports transparency using Premultiplied Alpha.',
        image: {
          src: '/Troubleshooting/PaintNetTransparency.webp',
          alt: 'Paint.NET transparency settings',
          caption: 'Preserving clean alpha edges in Paint.NET'
        }
      }
    ],
    links: [
      { text: 'Paint.NET Official Download', url: 'https://www.getpaint.net/download.html' }
    ]
  }
];
