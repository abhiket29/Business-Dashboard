import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),tailwindcss(),
],
  server: {
    hmr: {
      overlay: true, // you can also set to false to hide overlay
    },
    fs: {
      strict: true, // restrict to project root
    },
  },
});
