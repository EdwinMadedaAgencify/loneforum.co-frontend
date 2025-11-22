import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"), // Optional additional aliases
      "@assets": path.resolve(__dirname, "./src/assets"), // For images and static files
    },
  },
});
