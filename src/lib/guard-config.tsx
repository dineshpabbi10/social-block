"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

export interface GuardConfig {
  version: 1;
  instagram: boolean;
  youtube: boolean;
  facebook: boolean;
  tiktok: boolean;
  redirects: boolean;
  hideShelves: boolean;
  showNotice: boolean;
}

export type GuardSiteKey = "instagram" | "youtube" | "facebook" | "tiktok";

export const DEFAULT_CONFIG: GuardConfig = {
  version: 1,
  instagram: true,
  youtube: true,
  facebook: true,
  tiktok: false,
  redirects: true,
  hideShelves: true,
  showNotice: true,
};

export const GUARD_SITES: Array<{
  key: GuardSiteKey;
  name: string;
  shortForm: string;
  summary: string;
}> = [
  {
    key: "instagram",
    name: "Instagram",
    shortForm: "Reels",
    summary: "Explore Reels and suggested feed cards. Followed accounts' Reels stay visible.",
  },
  {
    key: "youtube",
    name: "YouTube",
    shortForm: "Shorts",
    summary: "Shorts tab, shelves, search results and channel tabs.",
  },
  {
    key: "facebook",
    name: "Facebook",
    shortForm: "Reels",
    summary: "Reels discovery and suggested feed cards. Followed accounts' Reels stay visible.",
  },
  {
    key: "tiktok",
    name: "TikTok",
    shortForm: "everything",
    summary: "Blocks the entire site. It is short-form by design.",
  },
];

const STORAGE_KEY = "reelbrake:guard-config:v1";
const CHANGE_EVENT = "reelbrake:config-change";

function normalize(raw: unknown): GuardConfig {
  if (!raw || typeof raw !== "object") return { ...DEFAULT_CONFIG };
  const input = raw as Partial<GuardConfig>;
  return {
    version: 1,
    instagram: typeof input.instagram === "boolean" ? input.instagram : DEFAULT_CONFIG.instagram,
    youtube: typeof input.youtube === "boolean" ? input.youtube : DEFAULT_CONFIG.youtube,
    facebook: typeof input.facebook === "boolean" ? input.facebook : DEFAULT_CONFIG.facebook,
    tiktok: typeof input.tiktok === "boolean" ? input.tiktok : DEFAULT_CONFIG.tiktok,
    redirects: typeof input.redirects === "boolean" ? input.redirects : DEFAULT_CONFIG.redirects,
    hideShelves:
      typeof input.hideShelves === "boolean" ? input.hideShelves : DEFAULT_CONFIG.hideShelves,
    showNotice:
      typeof input.showNotice === "boolean" ? input.showNotice : DEFAULT_CONFIG.showNotice,
  };
}

function readRaw(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

/**
 * useSyncExternalStore needs a stable snapshot reference. The snapshot is cached
 * by its raw storage value so React only re-renders when the data really changes.
 */
let cachedRaw: string | null | undefined;
let cachedConfig: GuardConfig = DEFAULT_CONFIG;
let memoryConfig: GuardConfig | null = null;

function getSnapshot(): GuardConfig {
  const raw = readRaw();

  if (raw === null) {
    return memoryConfig ?? DEFAULT_CONFIG;
  }

  if (raw === cachedRaw && cachedConfig) return cachedConfig;

  try {
    cachedConfig = normalize(JSON.parse(raw));
  } catch {
    cachedConfig = DEFAULT_CONFIG;
  }
  cachedRaw = raw;
  return cachedConfig;
}

function getServerSnapshot(): GuardConfig {
  return DEFAULT_CONFIG;
}

function subscribe(onChange: () => void): () => void {
  function onStorage(event: StorageEvent) {
    if (event.key !== STORAGE_KEY) return;
    if (event.newValue === null) {
      memoryConfig = null;
      cachedRaw = undefined;
      cachedConfig = DEFAULT_CONFIG;
    }
    onChange();
  }

  function onLocalChange() {
    onChange();
  }

  window.addEventListener("storage", onStorage);
  window.addEventListener(CHANGE_EVENT, onLocalChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(CHANGE_EVENT, onLocalChange);
  };
}

function writeConfig(next: GuardConfig) {
  const raw = JSON.stringify(next);
  memoryConfig = next;
  cachedRaw = raw;
  cachedConfig = next;

  try {
    window.localStorage.setItem(STORAGE_KEY, raw);
  } catch {
    // Private browsing can block writes. The in-memory value still works.
  }

  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribeHydration() {
  return () => undefined;
}

function getHydrated() {
  return true;
}

function getHydratedOnServer() {
  return false;
}

export function useGuardConfig() {
  const config = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const hydrated = useSyncExternalStore(
    subscribeHydration,
    getHydrated,
    getHydratedOnServer,
  );

  const update = useCallback((patch: Partial<GuardConfig>) => {
    writeConfig(normalize({ ...getSnapshot(), ...patch, version: 1 }));
  }, []);

  const reset = useCallback(() => {
    writeConfig({ ...DEFAULT_CONFIG });
  }, []);

  const enabledCount = useMemo(
    () =>
      Number(config.instagram) +
      Number(config.youtube) +
      Number(config.facebook) +
      Number(config.tiktok),
    [config],
  );

  return { config, hydrated, update, reset, enabledCount };
}

export { STORAGE_KEY };
