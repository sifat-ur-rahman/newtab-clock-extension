export interface ThemeSettings {
  primary: string;
  accent: string;
  showSeconds: boolean;
  clockStyle: "analog" | "digital" | "both";
}

export const DEFAULT_THEME: ThemeSettings = {
  primary: "#29173F",
  accent: "#8B5CF6",
  showSeconds: true,
  clockStyle: "both",
};

export interface LocationInfo {
  city: string;
  region: string;
  country: string;
  timezone: string;
  utcOffsetHours: number;
  loading: boolean;
  error: string | null;
}

export const PRESET_THEMES: { name: string; primary: string; accent: string }[] = [
  { name: "Aurora", primary: "#29173F", accent: "#8B5CF6" },
  { name: "Midnight", primary: "#0F172A", accent: "#38BDF8" },
  { name: "Ember", primary: "#2A1215", accent: "#F97316" },
  { name: "Forest", primary: "#0F2318", accent: "#34D399" },
  { name: "Rosewood", primary: "#2B1220", accent: "#FB7185" },
  { name: "Slate", primary: "#1C1C24", accent: "#A3A3A3" },
];
