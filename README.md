# Aurora Clock — New Tab Extension
### Setup & Installation Guide

A full-screen New Tab replacement built with **React + TypeScript + Tailwind CSS**, featuring an animated analog + digital clock, live geolocation, UTC time, and full color customization — default theme color `#29173F`.

---

## 🚀 Quick Install (no coding required)

You don't need Node.js or to build anything to use this extension. Just grab the pre-built version:

1. Go to the **[Releases](../../releases)** page of this repo.
2. Under the latest release, download **`aurora-clock-extension.zip`**.
3. Unzip it — you'll get a folder (e.g. `aurora-clock-extension`).
4. Open Chrome and go to `chrome://extensions`.
5. Turn on **Developer mode** (top-right toggle).
6. Click **Load unpacked** and select the unzipped folder.
7. Open a new tab — enjoy your clock! 🎉

> This isn't published on the Chrome Web Store (that requires a one-time $5 developer fee and a review process). Loading it as an "unpacked" extension this way is completely free and works exactly the same — Chrome just shows a small "Developer mode extensions" notice in the toolbar, which is normal.

If you'd rather build it from source yourself, or want to modify the code, see the **Developer Setup** below.

---

## 👩‍💻 Developer Setup

## 1. What's in this folder

```
newtab-clock-extension/
├── public/
│   ├── manifest.json        ← Chrome extension manifest (MV3)
│   └── icons/                ← Extension icons (16/48/128px)
├── src/
│   ├── components/           ← AnalogClock, DigitalClock, LocationBadge,
│   │                            UTCClock, SettingsPanel, BackgroundOrbs
│   ├── hooks/                ← useClock, useLocation, useSettings
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css             ← Tailwind + theme CSS variables
│   └── types.ts
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 2. Prerequisites

- **Node.js 18+** and **npm** installed → check with:
  ```bash
  node -v
  npm -v
  ```
  If you don't have Node, download it from https://nodejs.org

- **Google Chrome** (or any Chromium browser: Edge, Brave, Arc, etc.)

---

## 3. Install dependencies

Open a terminal in the `newtab-clock-extension` folder and run:

```bash
npm install
```

This installs React, TypeScript, Tailwind CSS, and Vite (the build tool).

---

## 4. Build the extension

```bash
npm run build
```

This compiles the React/TypeScript/Tailwind code and outputs a ready-to-load extension into the **`dist/`** folder (this includes `manifest.json`, the icons, and the compiled JS/CSS — everything Chrome needs).

> Re-run `npm run build` any time you change the code, then hit the refresh icon on the extension card in `chrome://extensions` to see updates.

---

## 5. Load the extension into Chrome

1. Open Chrome and go to `chrome://extensions`
2. Turn on **Developer mode** (top-right toggle)
3. Click **Load unpacked**
4. Select the **`dist`** folder (not the project root — the built one)
5. Open a **new tab** — you should see your full-screen clock 🎉

---

## 6. Using the extension

| Feature | How |
|---|---|
| **Live analog + digital clock** | Shown automatically, updates every second with smooth animated hands |
| **Live location** | On first run, Chrome will ask for location permission — click **Allow** to show your city (e.g. "Dhaka, Bangladesh"). If you deny it, it falls back to your system timezone. |
| **UTC time** | Always shown in the pill badge under your local time |
| **Color customization** | Click the ⚙️ gear icon (top-right) to open the theme panel: pick a preset, or use the color pickers to set any **Primary** / **Accent** color. Choices are saved automatically (via `chrome.storage`) and persist across sessions. |
| **Show/hide seconds** | Toggle in the settings panel |
| **Clock style** | Choose **Analog**, **Digital**, or **Both** in the settings panel |
| **Responsive layout** | Resize the window / use on any screen size — the layout reflows from a stacked mobile layout to a side-by-side desktop layout |

---

## 7. Development mode (optional, for making changes)

If you want to edit the design/code and preview changes instantly in a normal browser tab (not as an installed extension) while working:

```bash
npm run dev
```

This starts a local dev server (usually `http://localhost:5173`) with hot-reload. Note: `chrome.storage` isn't available outside the extension context, so in dev mode settings automatically fall back to `localStorage` — this is handled for you already.

When you're happy with your changes, run `npm run build` again and reload the extension in `chrome://extensions`.

---

## 8. Customizing the default theme in code

The default primary/accent colors and presets live in `src/types.ts`:

```ts
export const DEFAULT_THEME: ThemeSettings = {
  primary: "#29173F",
  accent: "#8B5CF6",
  showSeconds: true,
  clockStyle: "both",
};
```

Add or edit swatches in the `PRESET_THEMES` array in the same file.

---

## 9. Notes on permissions & privacy

- The manifest only requests the **`storage`** permission (to save your color/theme choices locally on your device).
- **Geolocation** uses the standard browser Geolocation API — Chrome shows its own native permission prompt; nothing is requested in the manifest for this.
- Location coordinates are sent to `api.bigdatacloud.net`'s free, key-less reverse-geocoding endpoint only to resolve a city name — no data is stored remotely or by this extension.
- If you'd rather not allow location access at all, just click **Block** on the browser prompt — the extension will show your timezone-based offset instead of a city name.

---

## 10. Troubleshooting

- **"Manifest file is missing or unreadable"** → Make sure you selected the `dist` folder, not the project root, in `chrome://extensions`.
- **Blank new tab / white screen** → Open `chrome://extensions`, click **Errors** on the extension card, and check the console. Usually fixed by re-running `npm run build`.
- **Colors not saving** → Confirm the extension has the `storage` permission (it's in `manifest.json` by default) and that you loaded it as an unpacked extension (not just previewed via `npm run dev`).
- **Location says "Couldn't resolve city name"** → This means geolocation succeeded but the network request to the reverse-geocoding API failed (e.g. offline). Time and UTC will still work fine.

---

## 11. Publishing this repo & releases (maintainer notes)

This repo includes a GitHub Actions workflow (`.github/workflows/release.yml`) that automatically builds the extension and attaches a ready-to-install `aurora-clock-extension.zip` to a GitHub Release, every time you push a version tag. This is what powers the **Quick Install** section above — completely free, no Chrome Web Store account needed.

To publish a new version:

```bash
git add .
git commit -m "Release v1.0.0"
git tag v1.0.0
git push origin main --tags
```

Pushing the tag triggers the workflow, which builds the project and creates a Release with the zip attached automatically. Repeat with `v1.0.1`, `v1.1.0`, etc. for future updates.

If you'd rather create the first release by hand instead of waiting on Actions:
1. Run `npm run build` locally, then zip the contents of `dist/` into `aurora-clock-extension.zip`.
2. On GitHub, go to **Releases → Draft a new release**.
3. Enter a tag (e.g. `v1.0.0`), a title, and attach the zip.
4. Click **Publish release**.

---

Enjoy your new tab! ✨
