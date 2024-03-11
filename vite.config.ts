import MillionLint from '@million/lint';
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [MillionLint.vite(), react()],
  server: {
    host: true
  },
  define: {
    global: "globalThis"
  },
  resolve: {
    alias: [{
      find: "@/",
      replacement: "/src/"
    }]
  }
});