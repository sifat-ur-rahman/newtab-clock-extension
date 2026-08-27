import { useEffect, useRef, useState } from "react";
import type { ThemeSettings } from "../types";
import { PRESET_THEMES } from "../types";

interface SettingsPanelProps {
  settings: ThemeSettings;
  onChange: (patch: Partial<ThemeSettings>) => void;
  onReset: () => void;
}

export default function SettingsPanel({ settings, onChange, onReset }: SettingsPanelProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close the panel when clicking/tapping anywhere outside it
  useEffect(() => {
    if (!open) return;

    function handleOutside(e: MouseEvent | TouchEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="fixed top-4 right-4 sm:top-6 sm:right-6 z-20">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Customize theme"
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:text-white hover:rotate-45 active:scale-90"
      >
        <GearIcon />
      </button>

      <div
        className={`absolute right-0 mt-3 w-72 origin-top-right rounded-2xl border border-white/10 bg-primary-dark/90 p-4 shadow-2xl backdrop-blur-xl transition-all duration-200 ${
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/50">
          Theme
        </p>

        <div className="mb-4 grid grid-cols-3 gap-2">
          {PRESET_THEMES.map((preset) => (
            <button
              key={preset.name}
              onClick={() => onChange({ primary: preset.primary, accent: preset.accent })}
              className={`group flex flex-col items-center gap-1 rounded-lg border p-2 transition hover:border-white/40 ${
                settings.primary.toLowerCase() === preset.primary.toLowerCase()
                  ? "border-white/60"
                  : "border-white/10"
              }`}
              title={preset.name}
            >
              <span
                className="h-6 w-6 rounded-full border border-white/20"
                style={{
                  background: `linear-gradient(135deg, ${preset.primary}, ${preset.accent})`,
                }}
              />
              <span className="text-[10px] text-white/60 group-hover:text-white">
                {preset.name}
              </span>
            </button>
          ))}
        </div>

        <div className="mb-4 flex items-center justify-between gap-3">
          <label className="flex-1 text-xs text-white/70">
            Primary
            <div className="mt-1 flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2 py-1.5">
              <input
                type="color"
                value={settings.primary}
                onChange={(e) => onChange({ primary: e.target.value })}
                className="h-6 w-6 cursor-pointer rounded bg-transparent"
              />
              <span className="text-[11px] uppercase text-white/60">{settings.primary}</span>
            </div>
          </label>

          <label className="flex-1 text-xs text-white/70">
            Accent
            <div className="mt-1 flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2 py-1.5">
              <input
                type="color"
                value={settings.accent}
                onChange={(e) => onChange({ accent: e.target.value })}
                className="h-6 w-6 cursor-pointer rounded bg-transparent"
              />
              <span className="text-[11px] uppercase text-white/60">{settings.accent}</span>
            </div>
          </label>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs text-white/70">Show seconds</span>
          <button
            onClick={() => onChange({ showSeconds: !settings.showSeconds })}
            className={`relative h-6 w-11 rounded-full transition-colors ${
              settings.showSeconds ? "bg-accent" : "bg-white/15"
            }`}
            aria-pressed={settings.showSeconds}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                settings.showSeconds ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>

        <div className="mb-4">
          <p className="mb-1.5 text-xs text-white/70">Clock style</p>
          <div className="grid grid-cols-3 gap-1.5">
            {(["analog", "digital", "both"] as const).map((style) => (
              <button
                key={style}
                onClick={() => onChange({ clockStyle: style })}
                className={`rounded-lg border py-1.5 text-[11px] capitalize transition ${
                  settings.clockStyle === style
                    ? "border-accent bg-accent/20 text-white"
                    : "border-white/10 text-white/60 hover:border-white/30"
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onReset}
          className="w-full rounded-lg border border-white/10 py-2 text-xs text-white/60 transition hover:border-white/30 hover:text-white"
        >
          Reset to default
        </button>
      </div>
    </div>
  );
}

function GearIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 15a3 3 0 100-6 3 3 0 000 6z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09a1.65 1.65 0 00-1.08-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09a1.65 1.65 0 001.51-1.08 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
