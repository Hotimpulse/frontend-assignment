import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
/// <reference types="vitest" />

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@src": path.resolve("src/"),
    },
  },
});
