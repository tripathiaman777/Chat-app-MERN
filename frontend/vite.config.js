import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
    proxy: {
      "/api": {
        target: "https://chat-app-mern-1-941d.onrender.com/",
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "build", // Specify the output directory
  },
});
