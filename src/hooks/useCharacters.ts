import { useState, useEffect } from 'react';
import { CharacterItem } from '../types';

export interface UseCharactersResult {
  characters: Record<string, string>;
  characterList: CharacterItem[];
  loading: boolean;
  isLiveSync: boolean;
  totalCount: number;
}

const NKAS_ENDPOINT = 'https://nkas.pages.dev/nk_data/nikkegg/characters.json';
const LOCAL_FALLBACK_ENDPOINT = '/api/characters.json';

// In-memory cache so re-renders or page navigations stay instant
let cachedCharacters: Record<string, string> | null = null;
let hasSyncedLive = false;

export function useCharacters(): UseCharactersResult {
  const [characters, setCharacters] = useState<Record<string, string>>(cachedCharacters || {});
  const [loading, setLoading] = useState<boolean>(!cachedCharacters);
  const [isLiveSync, setIsLiveSync] = useState<boolean>(hasSyncedLive);

  useEffect(() => {
    let isMounted = true;

    async function loadCharacters() {
      // 1. Initial local load if memory cache is empty
      if (!cachedCharacters) {
        try {
          const localRes = await fetch(LOCAL_FALLBACK_ENDPOINT);
          if (localRes.ok) {
            const localData: Record<string, string> = await localRes.json();
            if (isMounted) {
              cachedCharacters = { ...localData };
              setCharacters({ ...localData });
              setLoading(false);
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
            const merged: Record<string, string> = { ...(cachedCharacters || {}) };

            for (const item of liveData) {
              if (!item || !item.img || !item.name) continue;
              const match = item.img.match(/(c\d+)/i);
              if (match) {
                const code = match[1].toLowerCase();
                merged[code] = item.name.trim();
              }
            }

            cachedCharacters = merged;
            hasSyncedLive = true;
            if (isMounted) {
              setCharacters({ ...merged });
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

  const characterList: CharacterItem[] = Object.entries(characters)
    .map(([id, name]) => ({ id, name }))
    .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: 'base' }));

  return {
    characters,
    characterList,
    loading,
    isLiveSync,
    totalCount: characterList.length || 206,
  };
}

