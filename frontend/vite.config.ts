import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@model": path.resolve(__dirname, "./src/app/shell/workspace/model"),
      "@tree": path.resolve(__dirname, "./src/app/shell/workspace/engine/tree"),
    },
  },
});