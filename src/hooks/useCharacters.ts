import { useState, useEffect } from 'react';
import { CharacterItem, CharacterGroup } from '../types';

export interface UseCharactersResult {
  characters: Record<string, string>;
  characterList: CharacterItem[];
  characterGroups: CharacterGroup[];
  npcGroups: CharacterGroup[];
  allGroups: CharacterGroup[];
  loading: boolean;
  isLiveSync: boolean;
  totalCount: number;
  playableCount: number;
  npcCount: number;
}

const NKAS_ENDPOINT = 'https://nkas.pages.dev/nk_data/blablalink/nikke_list.json';
const LOCAL_FALLBACK_ENDPOINT = '/api/characters.json';

interface CachedState {
  characters: Record<string, string>;
  characterList: CharacterItem[];
  characterGroups: CharacterGroup[];
  npcGroups: CharacterGroup[];
  allGroups: CharacterGroup[];
  playableCount: number;
  npcCount: number;
  totalCount: number;
}

let cachedState: CachedState | null = null;
let hasSyncedLive = false;

function buildStateFromData(playable: CharacterGroup[], npcs: CharacterGroup[]): CachedState {
  const characters: Record<string, string> = {};
  let playableCount = 0;

  for (const g of playable) {
    characters[g.id.toLowerCase()] = g.name;
    playableCount++;
    for (const s of g.skins) {
      characters[s.id.toLowerCase()] = `${g.name} - ${s.name}`;
      playableCount++;
    }
  }

  const npcCount = npcs.length;
  for (const n of npcs) {
    characters[n.id.toLowerCase()] = n.name;
  }

  const characterList: CharacterItem[] = Object.entries(characters)
    .map(([id, name]) => ({ id, name }))
    .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: 'base' }));

  return {
    characters,
    characterList,
    characterGroups: playable,
    npcGroups: npcs,
    allGroups: [...playable, ...npcs],
    playableCount,
    npcCount,
    totalCount: playableCount + npcCount,
  };
}

export function useCharacters(): UseCharactersResult {
  const [state, setState] = useState<CachedState>(() => {
    if (cachedState) return cachedState;
    return {
      characters: {},
      characterList: [],
      characterGroups: [],
      npcGroups: [],
      allGroups: [],
      playableCount: 394,
      npcCount: 177,
      totalCount: 571,
    };
  });
  const [loading, setLoading] = useState<boolean>(!cachedState);
  const [isLiveSync, setIsLiveSync] = useState<boolean>(hasSyncedLive);

  useEffect(() => {
    let isMounted = true;

    async function loadCharacters() {
      // 1. Initial local load if memory cache is empty
      if (!cachedState) {
        try {
          const localRes = await fetch(LOCAL_FALLBACK_ENDPOINT);
          if (localRes.ok) {
            const localData = await localRes.json();
            if (localData && localData.playable && localData.npcs) {
              const newState = buildStateFromData(localData.playable, localData.npcs);
              cachedState = newState;
              if (isMounted) {
                setState(newState);
                setLoading(false);
              }
            }
          }
        } catch (err) {
          console.warn('[Characters] Failed to load local characters fallback:', err);
        }
      } else {
        setLoading(false);
      }

      // 2. Asynchronous sync with Skuqre's NKAS live API
      try {
        const liveRes = await fetch(NKAS_ENDPOINT, { cache: 'no-cache' });
        if (liveRes.ok) {
          const liveData = await liveRes.json();
          if (Array.isArray(liveData)) {
            const updatedPlayable: CharacterGroup[] = [];
            for (const item of liveData) {
              if (!item || !item.resource_id) continue;
              const pad = String(item.resource_id).padStart(3, '0');
              const baseCode = `c${pad}_00`;
              const baseName = item.name_localkey?.name || 'Unknown';
              const skins: Array<{ id: string; name: string }> = [];

              if (Array.isArray(item.costumes)) {
                for (const c of item.costumes) {
                  if (!c || c.costume_index == null) continue;
                  const cPad = String(c.costume_index).padStart(2, '0');
                  skins.push({
                    id: `c${pad}_${cPad}`,
                    name: c.costume_name_locale || 'Skin',
                  });
                }
              }

              updatedPlayable.push({
                id: baseCode,
                baseCode: `c${pad}`,
                name: baseName,
                skins,
              });
            }

            updatedPlayable.sort((a, b) => a.baseCode.localeCompare(b.baseCode, undefined, { numeric: true }));

            const currentNpcs = cachedState?.npcGroups || [];
            const newState = buildStateFromData(updatedPlayable, currentNpcs);
            cachedState = newState;
            hasSyncedLive = true;

            if (isMounted) {
              setState(newState);
              setIsLiveSync(true);
              setLoading(false);
            }
          }
        }
      } catch (err) {
        console.info('[Characters] Live NKAS sync fallback to local registry:', err);
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadCharacters();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    characters: state.characters,
    characterList: state.characterList,
    characterGroups: state.characterGroups,
    npcGroups: state.npcGroups,
    allGroups: state.allGroups,
    loading,
    isLiveSync,
    totalCount: state.totalCount,
    playableCount: state.playableCount,
    npcCount: state.npcCount,
  };
}

