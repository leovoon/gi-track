import MillionLint from '@million/lint';
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [MillionLint.vite({
    auto: true
  }), react()],
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