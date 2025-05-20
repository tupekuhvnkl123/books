import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["logo.svg"],
      manifest: {
        name: "Books",
        short_name: "Books",
        theme_color: "#ffffff",
      },
    }),
  ],
  server: {
    host: true, // Listen on all network interfaces
  },
});
