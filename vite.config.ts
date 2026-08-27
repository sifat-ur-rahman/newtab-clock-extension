import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Chrome extensions load index.html directly (no dev server), so we
// use relative asset paths and emit everything into dist/.
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // Keep filenames stable/simple for the extension bundle
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]"
      }
    }
  }
});
