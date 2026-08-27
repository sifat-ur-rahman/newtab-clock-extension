import { useCallback, useEffect, useState } from "react";
import { DEFAULT_THEME, type ThemeSettings } from "../types";

const STORAGE_KEY = "aurora-clock-settings";

function hasChromeStorage(): boolean {
  return typeof chrome !== "undefined" && !!chrome.storage && !!chrome.storage.local;
}

async function loadSettings(): Promise<ThemeSettings> {
  if (hasChromeStorage()) {
    return new Promise((resolve) => {
      chrome.storage.local.get([STORAGE_KEY], (result) => {
        resolve({ ...DEFAULT_THEME, ...(result[STORAGE_KEY] || {}) });
      });
    });
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULT_THEME, ...JSON.parse(raw) } : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

function persistSettings(settings: ThemeSettings) {
  if (hasChromeStorage()) {
    chrome.storage.local.set({ [STORAGE_KEY]: settings });
    return;
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    /* ignore quota / privacy-mode errors */
  }
}

/**
 * Loads customizable theme settings on mount, persists changes, and
 * writes the current colors onto CSS custom properties so every
 * Tailwind `primary`/`accent` class picks them up live.
 */
export function useSettings() {
  const [settings, setSettings] = useState<ThemeSettings>(DEFAULT_THEME);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadSettings().then((loaded) => {
      setSettings(loaded);
      setReady(true);
    });
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--color-primary", settings.primary);
    root.style.setProperty("--color-accent", settings.accent);
    root.style.setProperty("--color-primary-light", lighten(settings.primary, 18));
    root.style.setProperty("--color-primary-dark", lighten(settings.primary, -12));
  }, [settings.primary, settings.accent]);

  const update = useCallback((patch: Partial<ThemeSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      persistSettings(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setSettings(DEFAULT_THEME);
    persistSettings(DEFAULT_THEME);
  }, []);

  return { settings, update, reset, ready };
}

/** Lightens (positive) or darkens (negative) a hex color by a percent amount. */
function lighten(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  let r = (num >> 16) + Math.round((percent / 100) * 255);
  let g = ((num >> 8) & 0x00ff) + Math.round((percent / 100) * 255);
  let b = (num & 0x0000ff) + Math.round((percent / 100) * 255);
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}
